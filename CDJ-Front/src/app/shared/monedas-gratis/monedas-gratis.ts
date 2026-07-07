import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MONEDAS_GRATIS_DATA, Mission, MissionOption, MissionFeed } from '../../core/data/monedas-gratis.data';

@Component({
  selector: 'app-monedas-gratis',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './monedas-gratis.html',
  styleUrl: './monedas-gratis.css',
})
export class MonedasGratisComponent {
  readonly missions = MONEDAS_GRATIS_DATA;

  // Sound control
  readonly soundOn = signal<boolean>(true);

  // Screen state: 'intro' | 'game' | 'result'
  readonly currentScreen = signal<'intro' | 'game' | 'result'>('intro');
  readonly showProfileModal = signal<boolean>(false);

  // Profile configuration
  readonly profile = signal<{ name: string; avatar: string }>({ name: 'Tú', avatar: 'T' });

  // Game state
  readonly curIndex = signal<number>(0);
  readonly score = signal<number>(0);
  readonly answers = signal<Record<string, MissionOption>>({});
  readonly activeFeedbackOption = signal<MissionOption | null>(null);
  
  // Dimensions reflexivity metrics
  readonly dimensions = signal({
    pausa: 0,
    cuenta: 0,
    verificacion: 0,
    ayuda: 0
  });

  // Signal radar tracking
  readonly foundSignals = signal<number[]>([]);

  // Toast notifier
  readonly toastText = signal<string>('');
  readonly showToast = signal<boolean>(false);

  // Debriefing navigation
  readonly activeDebriefTab = signal<number>(0);

  // Copied alert
  readonly copiedRules = signal<boolean>(false);

  // Web Audio Context
  private actx: AudioContext | null = null;

  // Compute active mission
  readonly currentMission = computed<Mission>(() => this.missions[this.curIndex()]);

  // Compute progress percent (0 to 100)
  readonly progressPercent = computed(() => {
    return Math.round((this.curIndex() / this.missions.length) * 100);
  });

  // Compute final ranking information
  readonly finalRank = computed(() => {
    const s = this.score();
    if (s >= 18) {
      return {
        title: 'Líder Digital / Experto Seguro 🏆',
        desc: '¡Increíble! Has tomado todas las decisiones de forma segura. Sabes cómo proteger tu cuenta, cuándo desconfiar de ofertas de monedas gratis y a quién recurrir en caso de presión o dudas.',
        icon: '🏆',
        grad: 'linear-gradient(90deg, #10b981, #3b82f6)'
      };
    } else if (s >= 12) {
      return {
        title: 'Explorador Prudente 🧭',
        desc: '¡Buen trabajo! Identificaste la mayoría de los riesgos y protegiste tus accesos. Al pausar y dudar del anuncio o del link evitaste caer en la trampa. ¡Sigue practicando para ser un experto!',
        icon: '🧭',
        grad: 'linear-gradient(90deg, #fbbf24, #10b981)'
      };
    } else if (s >= 6) {
      return {
        title: 'Aprendiz en Alerta ⚠️',
        desc: 'Tienes buenas intenciones, pero a veces te dejas llevar por la curiosidad o la prisa de las monedas gratis. Recuerda que es mejor verificar dentro del menú oficial y no enviar capturas de seguridad.',
        icon: '⚠️',
        grad: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
      };
    } else {
      return {
        title: 'Jugador Expuesto 🚨',
        desc: '¡Cuidado! Caíste en varias trampas al abrir enlaces extraños, entregar códigos o intentar mandar capturas. Recuerda: tu cuenta es tu pertenencia digital. Si te presionan o te sacan del juego, ¡pausa y pide ayuda!',
        icon: '🚨',
        grad: 'linear-gradient(90deg, #ef4444, #f59e0b)'
      };
    }
  });

  // Audio synthesis helper
  private playBeep(freq: number, dur: number = 0.07, type: OscillatorType = "sine", vol: number = 0.20): void {
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
    } catch (e) {}
  }

  sndSend() { this.playBeep(660, 0.06, "triangle", 0.15); }
  sndRecv() { this.playBeep(420, 0.08, "sine", 0.15); }
  sndSafe() {
    this.playBeep(523, 0.08, "sine", 0.18);
    setTimeout(() => this.playBeep(784, 0.1, "sine", 0.18), 70);
  }
  sndBad() {
    this.playBeep(200, 0.12, "square", 0.10);
    setTimeout(() => this.playBeep(150, 0.14, "square", 0.10), 90);
  }

  toggleSound(): void {
    this.soundOn.set(!this.soundOn());
    if (this.soundOn()) {
      this.sndSend();
    }
  }

  // Profile flow
  openProfileSelection(): void {
    this.showProfileModal.set(true);
  }

  selectProfile(name: string, avatar: string): void {
    this.profile.set({ name, avatar });
  }

  confirmProfile(): void {
    this.showProfileModal.set(false);
    this.currentScreen.set('game');
    this.curIndex.set(0);
    this.sndSend();
  }

  // Answer selection
  chooseOption(option: MissionOption): void {
    if (this.activeFeedbackOption()) return;

    this.activeFeedbackOption.set(option);
    this.answers.update(curr => ({
      ...curr,
      [this.currentMission().id]: option
    }));

    // Gained score
    this.score.update(s => s + option.points);

    // Sum dimensions metrics
    this.dimensions.update(d => ({
      pausa: d.pausa + option.dims.pausa,
      cuenta: d.cuenta + option.dims.cuenta,
      verificacion: d.verificacion + option.dims.verificacion,
      ayuda: d.ayuda + option.dims.ayuda
    }));

    // Unlock signal in the radar
    const index = this.curIndex();
    if (!this.foundSignals().includes(index)) {
      this.foundSignals.update(fs => [...fs, index]);
      this.triggerToast(this.currentMission().sig);
    }

    // Play feedback sound
    if (option.level === 'best' || option.level === 'partial') {
      this.sndSafe();
    } else {
      this.sndBad();
    }
  }

  // Next step
  nextStep(): void {
    const nextIdx = this.curIndex() + 1;
    this.activeFeedbackOption.set(null);

    if (nextIdx < this.missions.length) {
      this.curIndex.set(nextIdx);
      this.sndSend();
    } else {
      this.currentScreen.set('result');
      this.activeDebriefTab.set(0);
      this.sndSend();
    }
  }

  // Restart simulation
  restartGame(): void {
    this.score.set(0);
    this.curIndex.set(0);
    this.answers.set({});
    this.activeFeedbackOption.set(null);
    this.dimensions.set({ pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 });
    this.foundSignals.set([]);
    this.currentScreen.set('intro');
    this.copiedRules.set(false);
  }

  // Copy rules to clipboard
  copyRulesText(): void {
    const rules = "3 reglas de seguridad digital en Rubloox:\n" +
      "1) Revisa premios y monedas desde el menú oficial del juego, nunca desde chats o links externos.\n" +
      "2) Tu cuenta es personal: nunca compartas tu contraseña, código de seguridad, correo o capturas de tu pantalla.\n" +
      "3) Si sientes presión, prisa o algo te saca del juego, haz una pausa, cierra el chat y avisa a un adulto de confianza.";
    
    navigator.clipboard.writeText(rules)
      .then(() => {
        this.copiedRules.set(true);
        setTimeout(() => this.copiedRules.set(false), 2000);
      })
      .catch(() => {});
  }

  // Show visual toast notification
  private triggerToast(signalText: string): void {
    this.toastText.set(signalText);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 2800);
  }

  // Styling helper for feedback badges
  getClassForLevel(level: string): string {
    switch (level) {
      case 'best': return 'best';
      case 'partial': return 'partial';
      case 'risk': return 'risk';
      default: return 'danger';
    }
  }

  getLabelForLevel(level: string): string {
    switch (level) {
      case 'best': return 'Buena jugada';
      case 'partial': return 'Puede servir, pero...';
      case 'risk': return 'Ojo, riesgo';
      default: return 'Alto riesgo';
    }
  }

  getIconForLevel(level: string): string {
    switch (level) {
      case 'best': return '✅';
      case 'partial': return '🟡';
      case 'risk': return '🟠';
      default: return '🔴';
    }
  }

  // Channel titles list preview mapping
  getChannelPreview(index: number): string {
    const previews = [
      "CoinMax: te paso el camino rápido.",
      "CoinMax: mb-premio.co/500... entra rápido.",
      "Sistema: formulario abierto.",
      "CoinMax: mándame captura...",
      "CoinMax: última oportunidad o pierdes."
    ];
    return previews[index] || '';
  }

  getChannelTime(index: number): string {
    const times = ["10:24 AM", "10:23 AM", "10:21 AM", "10:19 AM", "10:18 AM"];
    return times[index] || 'ahora';
  }

  getChannelName(index: number): string {
    const names = ["plaza-chat", "link-privado", "login-premio", "captura-seguridad", "cierre-reporte"];
    return names[index] || 'chat';
  }
}
