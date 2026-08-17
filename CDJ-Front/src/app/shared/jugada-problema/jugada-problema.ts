import { ChangeDetectionStrategy, Component, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JUGADA_DATA, JugadaMission, JugadaOption } from '../../core/data/jugada-problema.data';

@Component({
  selector: 'app-jugada-problema',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jugada-problema.html',
  styleUrl:    './jugada-problema.css',
})
export class JugadaProblemaComponent implements OnDestroy {
  readonly missions = JUGADA_DATA;

  // Screens: 'intro' | 'game' | 'result'
  readonly currentScreen   = signal<'intro' | 'game' | 'result'>('intro');
  readonly showProfileModal = signal<boolean>(false);

  // Profile
  readonly profile = signal<{ name: string; avatar: string }>({ name: 'Tú', avatar: 'T' });

  // Game state
  readonly curIndex            = signal<number>(0);
  readonly score               = signal<number>(0);
  readonly answers             = signal<Record<string, JugadaOption>>({});
  readonly activeFeedbackOption = signal<JugadaOption | null>(null);
  readonly foundSignals         = signal<number[]>([]);
  readonly activeDebriefTab     = signal<number>(0);
  readonly copiedRules          = signal<boolean>(false);
  readonly soundOn              = signal<boolean>(true);

  // Typing Simulator Effect
  readonly visiblePostCount = signal<number>(0);
  readonly typedTexts = signal<Record<number, string>>({});
  readonly isTyping = signal<boolean>(false);
  readonly typingUser = signal<string>('');
  readonly typingAvatar = signal<string>('');
  private typingTimer: any = null;
  private typingInterval: any = null;
  private lastTypingMissionId: string = '';

  constructor() {
    effect(() => {
      if (this.currentScreen() === 'game') {
        const mission = this.currentMission();
        if (this.lastTypingMissionId !== mission.id) {
          this.lastTypingMissionId = mission.id;
          setTimeout(() => this.startMissionTypingSequence(), 60);
        }
      }
    });
  }

  // Toast
  readonly toastText  = signal<string>('');
  readonly showToast  = signal<boolean>(false);

  // Dimensions
  readonly dimensions = signal({ criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 });

  // Audio
  private actx: AudioContext | null = null;

  // Computed
  readonly currentMission  = computed<JugadaMission>(() => this.missions[this.curIndex()]);
  readonly progressPercent = computed(() => Math.round((this.curIndex() / this.missions.length) * 100));

  readonly finalRank = computed(() => {
    const s = this.score();
    if (s >= 21) return {
      icon: '🛡️', title: 'Criterio de comunidad',
      desc: 'Distinguiste crítica útil de ataque personal, cuidaste contexto y usaste rutas de apoyo sin hacer espectáculo.',
    };
    if (s >= 15) return {
      icon: '🧭', title: 'Buen criterio, con puntos por ajustar',
      desc: 'Tomaste varias decisiones útiles, aunque a veces faltó sostener mejor el límite o cuidar la evidencia.',
    };
    if (s >= 9) return {
      icon: '💬', title: 'El chat te jaló',
      desc: 'Notaste parte del problema, pero varias rutas dejaron que el tono del grupo definiera la conversación.',
    };
    return {
      icon: '⚠️', title: 'La burla decidió',
      desc: 'El grupo terminó marcando el ritmo con ataques o clips. Puedes corregir con criterios de juego, apoyo y reporte proporcional.',
    };
  });

  ngOnDestroy(): void {
    this.clearTypingTimers();
  }

  // ---- Typing Engine ----
  startMissionTypingSequence(): void {
    this.clearTypingTimers();
    this.visiblePostCount.set(0);
    this.typedTexts.set({});
    this.isTyping.set(false);

    const feed = this.currentMission().feed;
    if (!feed || feed.length === 0) return;

    this.typeNextPost(0);
  }

  private clearTypingTimers(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private typeNextPost(postIndex: number): void {
    const feed = this.currentMission().feed;
    if (postIndex >= feed.length) {
      this.isTyping.set(false);
      return;
    }

    const item = feed[postIndex];

    if (item.type !== 'msg') {
      // Embed types (clip, report, rule, sys)
      this.isTyping.set(false);
      this.visiblePostCount.set(postIndex + 1);
      this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 150);
      return;
    }

    if (item.isMe) {
      // For user's thought/message, type it without showing typing indicator
      this.isTyping.set(false);
      this.visiblePostCount.set(postIndex + 1);
      const fullText = item.text || (this.profile().name + ' decide…');
      let charIdx = 0;
      const speed = 6;

      this.typingInterval = setInterval(() => {
        charIdx++;
        const currentSub = fullText.slice(0, charIdx);
        this.typedTexts.update(map => ({ ...map, [postIndex]: currentSub }));

        if (charIdx % 6 === 0) {
          this.playBeep(380 + (charIdx % 4) * 30, 0.015, 'sine', 0.02);
        }

        if (charIdx >= fullText.length) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 100);
        }
      }, speed);
    } else {
      // Show "User is typing..." indicator
      this.isTyping.set(true);
      this.typingUser.set(item.author || 'Desconocido');
      this.typingAvatar.set(item.avatar || '?');

      this.typingTimer = setTimeout(() => {
        this.isTyping.set(false);
        this.visiblePostCount.set(postIndex + 1);

        const fullText = item.text || '';
        let charIdx = 0;
        const speed = 6;

        this.typingInterval = setInterval(() => {
          charIdx++;
          const currentSub = fullText.slice(0, charIdx);
          this.typedTexts.update(map => ({ ...map, [postIndex]: currentSub }));

          if (charIdx % 6 === 0) {
            this.playBeep(380 + (charIdx % 4) * 30, 0.015, 'sine', 0.02);
          }

          if (charIdx >= fullText.length) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 100);
          }
        }, speed);
      }, 150);
    }
  }

  skipTyping(): void {
    this.clearTypingTimers();
    const feed = this.currentMission().feed;
    if (!feed) return;

    this.isTyping.set(false);
    this.visiblePostCount.set(feed.length);

    const fullMap: Record<number, string> = {};
    feed.forEach((item, idx) => {
      if (item.type === 'msg') {
        fullMap[idx] = item.text || (item.isMe ? this.profile().name + ' decide…' : '');
      } else if ('text' in item && item.text) {
        fullMap[idx] = item.text;
      }
    });
    this.typedTexts.set(fullMap);
  }

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
  sndNav()  { this.playBeep(420, 0.06, 'sine',     0.12); }
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
    this.lastTypingMissionId = '';
    this.currentScreen.set('game');
    this.curIndex.set(0);
    this.sndNav();
  }

  // ---- Gameplay ----
  chooseOption(option: JugadaOption): void {
    if (this.activeFeedbackOption()) return;
    this.activeFeedbackOption.set(option);
    this.answers.update(curr => ({ ...curr, [this.currentMission().id]: option }));
    this.score.update(s => s + option.points);
    this.dimensions.update(d => ({
      criterio:  d.criterio  + option.dims.criterio,
      apoyo:     d.apoyo     + option.dims.apoyo,
      evidencia: d.evidencia + option.dims.evidencia,
      comunidad: d.comunidad + option.dims.comunidad,
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
      this.sndNav();
    } else {
      this.currentScreen.set('result');
      this.activeDebriefTab.set(0);
      this.sndSig();
    }
  }

  restartGame(): void {
    this.clearTypingTimers();
    this.lastTypingMissionId = '';
    this.visiblePostCount.set(0);
    this.typedTexts.set({});
    this.isTyping.set(false);
    this.score.set(0);
    this.curIndex.set(0);
    this.answers.set({});
    this.activeFeedbackOption.set(null);
    this.dimensions.set({ criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 });
    this.foundSignals.set([]);
    this.copiedRules.set(false);
    this.currentScreen.set('intro');
  }

  copyRulesText(): void {
    const txt =
      '4 reglas para tu servidor gamer:\n' +
      '1) Criticar una jugada no autoriza atacar a la persona.\n' +
      '2) Un clip recortado puede parecer prueba, pero también puede distorsionar contexto.\n' +
      '3) Apoyar no es protagonizar: pregunta, acompaña y usa canales de reporte.\n' +
      '4) Una comunidad sana permite desacuerdo sin convertirlo en burla pública.';
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
    return ['chat-partida', 'voz', 'clips', 'dm-apoyo', 'moderacion', 'reglas'][i] ?? 'chat';
  }
  getChannelTime(i: number): string {
    return ['10:41', '10:38', '10:35', '10:29', '10:24', '10:18'][i] ?? 'ahora';
  }

  getIconForLevel(level: string): string {
    return { best: '✅', partial: '🟡', risk: '🟠', danger: '🔴' }[level] ?? '⬜';
  }
  getLabelForLevel(level: string): string {
    return { best: 'Buena jugada', partial: 'Puede servir, pero…', risk: 'Ojo, riesgo', danger: 'Alto riesgo' }[level] ?? '';
  }
  getClassForLevel(level: string): string {
    return level === 'best' ? 'fb-best' : level === 'partial' ? 'fb-partial' : level === 'risk' ? 'fb-risk' : 'fb-danger';
  }
}
