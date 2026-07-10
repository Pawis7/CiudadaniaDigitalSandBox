import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QUIEN_ENTRA_DATA, QuienEntraMission, QuienEntraOption } from '../../core/data/quien-entra-mi-mundo.data';

@Component({
  selector: 'app-quien-entra-mi-mundo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quien-entra-mi-mundo.html',
  styleUrl:    './quien-entra-mi-mundo.css',
})
export class QuienEntraMiMundoComponent {
  readonly missions = QUIEN_ENTRA_DATA;

  // Screens: 'intro' | 'game' | 'result'
  readonly currentScreen    = signal<'intro' | 'game' | 'result'>('intro');
  readonly showProfileModal = signal<boolean>(false);

  // Profile
  readonly profile = signal<{ name: string; avatar: string }>({ name: 'Mini', avatar: 'M' });

  // Game state
  readonly curIndex             = signal<number>(0);
  readonly score                = signal<number>(0);
  readonly answers              = signal<Record<string, QuienEntraOption>>({});
  readonly activeFeedbackOption = signal<QuienEntraOption | null>(null);
  readonly foundSignals         = signal<number[]>([]);
  readonly activeDebriefTab     = signal<number>(0);
  readonly copiedRules          = signal<boolean>(false);
  readonly soundOn              = signal<boolean>(true);

  // Shuffled options for current scene
  private _shuffledOps = signal<QuienEntraOption[]>([]);

  // Toast
  readonly toastText = signal<string>('');
  readonly showToast = signal<boolean>(false);

  // Dimensions
  readonly dimensions = signal({ pausa: 0, limite: 0, datos: 0, ayuda: 0 });

  // Audio
  private actx: AudioContext | null = null;

  // Computed
  readonly currentMission  = computed<QuienEntraMission>(() => this.missions[this.curIndex()]);
  readonly progressPercent = computed(() => Math.round((this.curIndex() / this.missions.length) * 100));

  readonly currentOptions = computed<QuienEntraOption[]>(() => {
    return this._shuffledOps();
  });

  readonly finalRank = computed(() => {
    const s = this.score();
    if (s >= 14) return {
      icon: '🛡️', title: '¡Mundo bien cuidado!',
      desc: 'Reconociste señales, pusiste límites claros y pediste ayuda. ¡Eso es ser muy valiente!',
    };
    if (s >= 9) return {
      icon: '🧭', title: 'Buen radar, sigue practicando',
      desc: 'Tomaste varias decisiones útiles. Recuerda: pausar y preguntar siempre ayuda.',
    };
    if (s >= 5) return {
      icon: '⏸️', title: 'Pausaste, pero puedes hacer más',
      desc: 'Notaste algunas señales. Recuerda: si algo se siente raro, puedes avisar a un adulto.',
    };
    return {
      icon: '⚠️', title: 'Vuelve a intentarlo',
      desc: 'Algunas decisiones dejaron la presión cerca. Recuerda las 3 reglas y practica de nuevo.',
    };
  });

  // ---- Audio ----
  private playBeep(freq: number, dur = 0.08, type: OscillatorType = 'sine', vol = 0.18): void {
    if (!this.soundOn()) return;
    try {
      this.actx = this.actx || new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = this.actx.createOscillator();
      const g = this.actx.createGain();
      o.type = type;
      o.frequency.value = freq;
      o.connect(g);
      g.connect(this.actx.destination);
      g.gain.setValueAtTime(vol, this.actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.actx.currentTime + dur);
      o.start();
      o.stop(this.actx.currentTime + dur);
    } catch { }
  }

  sndGood() { this.playBeep(660, 0.07, 'triangle', 0.14); setTimeout(() => this.playBeep(784, 0.09, 'sine', 0.14), 65); }
  sndBad()  { this.playBeep(200, 0.12, 'square',   0.10); setTimeout(() => this.playBeep(150, 0.14, 'square', 0.10), 90); }
  sndNav()  { this.playBeep(440, 0.06, 'sine',     0.12); }
  sndSig()  { this.playBeep(520, 0.06, 'sine',     0.14); setTimeout(() => this.playBeep(660, 0.08, 'sine', 0.12), 60); }

  toggleSound(): void {
    this.soundOn.set(!this.soundOn());
    if (this.soundOn()) this.sndNav();
  }

  // ---- Profile ----
  openProfileSelection(): void { this.showProfileModal.set(true); }
  selectProfile(name: string, avatar: string): void { this.profile.set({ name, avatar }); }
  confirmProfile(): void {
    this.showProfileModal.set(false);
    this.currentScreen.set('game');
    this.curIndex.set(0);
    this._shuffleOps();
    this.sndNav();
  }

  private _shuffleOps(): void {
    const ops = [...this.currentMission().ops].sort(() => Math.random() - 0.5);
    this._shuffledOps.set(ops);
  }

  // ---- Gameplay ----
  chooseOption(option: QuienEntraOption): void {
    if (this.activeFeedbackOption()) return;
    this.activeFeedbackOption.set(option);
    this.answers.update(curr => ({ ...curr, [this.currentMission().id]: option }));
    this.score.update(s => s + option.points);
    this.dimensions.update(d => ({
      pausa:  d.pausa  + option.dims.pausa,
      limite: d.limite + option.dims.limite,
      datos:  d.datos  + option.dims.datos,
      ayuda:  d.ayuda  + option.dims.ayuda,
    }));
    const idx = this.curIndex();
    if (!this.foundSignals().includes(idx)) {
      this.foundSignals.update(fs => [...fs, idx]);
      this.triggerToast(this.currentMission().sig);
    }
    if (option.level === 'best' || option.level === 'partial') this.sndGood();
    else this.sndBad();
  }

  nextStep(): void {
    const next = this.curIndex() + 1;
    this.activeFeedbackOption.set(null);
    if (next < this.missions.length) {
      this.curIndex.set(next);
      this._shuffleOps();
      this.sndNav();
    } else {
      this.currentScreen.set('result');
      this.activeDebriefTab.set(0);
      this.sndSig();
    }
  }

  restartGame(): void {
    this.score.set(0);
    this.curIndex.set(0);
    this.answers.set({});
    this.activeFeedbackOption.set(null);
    this.dimensions.set({ pausa: 0, limite: 0, datos: 0, ayuda: 0 });
    this.foundSignals.set([]);
    this.copiedRules.set(false);
    this.currentScreen.set('intro');
    this._shuffledOps.set([]);
  }

  copyRulesText(): void {
    const txt =
      '3 reglas para jugar seguro:\n' +
      '1) Si no lo conoces, pausa. Pregunta antes de aceptar.\n' +
      '2) Tus datos son tuyos. No compartas nombre real, escuela, casa o edad.\n' +
      '3) Si algo se siente raro, avisa. Pedir ayuda es buena idea.';
    navigator.clipboard.writeText(txt)
      .then(() => { this.copiedRules.set(true); setTimeout(() => this.copiedRules.set(false), 2000); })
      .catch(() => {});
  }

  private triggerToast(text: string): void {
    this.toastText.set(text);
    this.showToast.set(true);
    this.sndSig();
    setTimeout(() => this.showToast.set(false), 2800);
  }

  // ---- Helpers ----
  getChannelName(i: number): string {
    return ['plaza-central', 'chat-privado', 'perfil-datos', 'menu-ayuda'][i] ?? 'sala';
  }
  getChannelTime(i: number): string {
    return ['11:02', '11:05', '11:08', '11:11'][i] ?? 'ahora';
  }

  getIconForLevel(level: string): string {
    return { best: '✅', partial: '🟡', risk: '🟠', danger: '🔴' }[level] ?? '⬜';
  }
  getLabelForLevel(level: string): string {
    return { best: '¡Bien hecho!', partial: 'Casi, pero...', risk: 'Ojo, pausa', danger: 'Alto, pausa' }[level] ?? '';
  }
  getLevelClass(level: string): string {
    return { best: 'best', partial: 'partial', risk: 'risk', danger: 'danger' }[level] ?? 'danger';
  }
}
