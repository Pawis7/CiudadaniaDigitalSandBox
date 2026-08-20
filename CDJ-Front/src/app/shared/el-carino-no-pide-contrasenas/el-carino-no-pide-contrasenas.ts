import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EL_CARINO_DATA,
  CarinoMoment,
  CarinoOption,
  CarinoChatMessage
} from '../../core/data/el-carino-no-pide-contrasenas.data';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-el-carino-no-pide-contrasenas',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './el-carino-no-pide-contrasenas.html',
  styleUrl: './el-carino-no-pide-contrasenas.css',
})
export class ElCarinoNoPideContrasenasComponent {
  readonly data = EL_CARINO_DATA;
  readonly moments = this.data.moments;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);

  // Store selected option for each moment
  readonly answers = signal<Record<string, CarinoOption>>({});

  // Scrambled options for the current moment
  readonly currentOptions = signal<CarinoOption[]>([]);

  // Feedback and typing simulation states
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<CarinoOption | null>(null);

  // Computations
  readonly currentMoment = computed<CarinoMoment>(() => {
    return this.moments[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.moments.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.internal_score, 0);
  });

  // Dynamic Island status
  readonly activeStatus = computed<'idle' | 'typing' | 'success' | 'alert'>(() => {
    if (this.isTyping()) return 'typing';
    const active = this.activeFeedbackChoice();
    if (active) {
      return active.internal_score === 4 ? 'success' : 'alert';
    }
    return 'idle';
  });

  // Final diagnostic message
  readonly finalDiagnostic = computed(() => {
    const score = this.totalScore();
    const max = this.moments.length * 4; // 24
    const pct = Math.round((score / max) * 100);

    if (pct >= 82) {
      return {
        titulo: "Límites sólidos",
        mensaje: "Tu recorrido muestra cómo estás leyendo las señales de control digital y qué tanto proteges tu privacidad, límites, apoyo y convivencia. ¡Excelente criterio digital!",
        claseColor: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
      };
    } else if (pct >= 58) {
      return {
        titulo: "Buen criterio en construcción",
        mensaje: "Muestras un buen entendimiento del autocuidado y los límites, pero en algunas decisiones cediste información o dudaste al actuar. ¡Sigue reforzando tus candados!",
        claseColor: "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
      };
    } else {
      return {
        titulo: "Conviene reforzar tus candados",
        mensaje: "Varias elecciones te exponen a dinámicas de control, revelan ubicación sensible o ceden contraseñas bajo presión. Te invitamos a repasar los límites seguros.",
        claseColor: "border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200"
      };
    }
  });

  // Calculated widths for final radar bars
  readonly radarWidths = computed(() => {
    const score = this.totalScore();
    const max = this.moments.length * 4; // 24
    const pct = Math.round((score / max) * 100);
    return [
      Math.min(100, Math.max(25, pct)),       // Privacidad
      Math.min(100, Math.max(25, pct - 5)),   // Límites
      Math.min(100, Math.max(25, pct + 3)),   // Apoyo
      Math.min(100, Math.max(25, pct - 10))   // Convivencia
    ];
  });

  // Dynamic header contact name based on step
  readonly activeContactName = computed(() => {
    const idx = this.currentMomentIndex();
    if (idx === 3) return 'Dani (Privado)';
    if (idx === 4) return 'Seguridad';
    return 'Mateo';
  });

  readonly avatarLetter = computed(() => {
    const idx = this.currentMomentIndex();
    if (idx === 3) return 'D';
    if (idx === 4) return 'S';
    return 'M';
  });

  constructor() {
    effect(() => {
      this.isTyping();
      this.activeFeedbackChoice();
      if (this.started() && !this.finished()) {
        const moment = this.currentMoment();
        this.currentOptions.set(shuffleArray(moment.options));

        setTimeout(() => {
          const chatEl = document.querySelector('.wa-chat') || document.querySelector('.msgs');
          if (chatEl) {
            chatEl.scrollTop = chatEl.scrollHeight;
          }
        }, 120);
      }
    });
  }

  private actx: AudioContext | null = null;

  private playBeep(freq: number, dur: number = 0.07, type: OscillatorType = "sine", vol: number = 0.20): void {
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

  private playStartSound(): void {
    this.playBeep(523.25, 0.08, "sine", 0.20);
    setTimeout(() => this.playBeep(783.99, 0.08, "sine", 0.20), 70);
    setTimeout(() => this.playBeep(1046.50, 0.15, "sine", 0.25), 140);
  }

  start(): void {
    this.playStartSound();
    this.started.set(true);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
  }

  restart(): void {
    this.start();
  }

  choose(choice: CarinoOption): void {
    if (this.finished() || this.isTyping()) return;

    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);

      this.answers.update((curr) => ({
        ...curr,
        [this.currentMoment().id]: choice
      }));
    }, 900);
  }

  continueFlow(): void {
    const active = this.activeFeedbackChoice();
    if (!active) return;

    if (this.currentMomentIndex() === this.moments.length - 1) {
      this.finished.set(true);
      return;
    }

    this.currentMomentIndex.update((idx) => idx + 1);
    this.activeFeedbackChoice.set(null);
  }

  async copyPhrase(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.data.closing.model_phrase);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copied.set(false);
    }
  }
}
