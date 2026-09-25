import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_LO_HAGAS_VIRAL_DATA, ViralMission, ViralChoice, ViralChatMessage } from '../../core/data/no-lo-hagas-viral.data';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-no-lo-hagas-viral',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './no-lo-hagas-viral.html',
  styleUrl: './no-lo-hagas-viral.css',
})
export class NoLoHagasViralComponent {
  readonly data = NO_LO_HAGAS_VIRAL_DATA;
  readonly missions = this.data.missions;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);
  readonly muted = signal(false);

  // Profile selector inside phone screen state
  readonly profileSelectionActive = signal(false);
  readonly selectedProfile = signal({ name: 'Tú', avatar: 'T' });

  // Store selected option for each mission
  readonly answers = signal<Record<string, ViralChoice>>({});

  // Scrambled options for the current mission
  readonly currentOptions = signal<ViralChoice[]>([]);

  // Feedback and typing simulation states
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<ViralChoice | null>(null);

  // Active chat feed messages
  readonly activeFeed = signal<ViralChatMessage[]>([]);

  readonly showScrollIndicator = signal(false);

  // Audio Context for beeps
  private audioCtx: AudioContext | null = null;

  // Computations
  readonly currentMoment = computed<ViralMission>(() => {
    return this.missions[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.missions.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.points, 0);
  });

  // Calculate scores for each dimension (Max: freno=9, apoyo=7, evidencia=5, criterio=7)
  readonly dimensionScores = computed(() => {
    let freno = 0;
    let apoyo = 0;
    let evidencia = 0;
    let criterio = 0;

    for (const ans of Object.values(this.answers())) {
      freno += ans.dims.freno;
      apoyo += ans.dims.apoyo;
      evidencia += ans.dims.evidencia;
      criterio += ans.dims.criterio;
    }

    return {
      freno: Math.min(100, Math.round((freno / 9) * 100)),
      apoyo: Math.min(100, Math.round((apoyo / 7) * 100)),
      evidencia: Math.min(100, Math.round((evidencia / 5) * 100)),
      criterio: Math.min(100, Math.round((criterio / 7) * 100)),
    };
  });

  // Final diagnostic computed
  readonly finalDiagnostic = computed(() => {
    const score = this.totalScore();
    const result = this.data.results.find(r => score >= r.min && score <= r.max);

    let colorClass = "border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200";
    if (score >= 21) {
      colorClass = "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200";
    } else if (score >= 15) {
      colorClass = "border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-950/20 text-sky-800 dark:text-sky-200";
    } else if (score >= 9) {
      colorClass = "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200";
    }

    const base = result || this.data.results[3];
    return { ...base, colorClass };
  });

  // List of unlocked signal items
  readonly unlockedSignals = computed(() => {
    const list: string[] = [];
    this.missions.forEach((m) => {
      const choice = this.answers()[m.id];
      if (choice && choice.level === 'best') {
        list.push(m.signal_revealed);
      } else {
        list.push(m.signal_locked);
      }
    });
    return list;
  });

  constructor() {
    // Sync option shuffling and active feed when switching moments
    effect(() => {
      if (this.started() && !this.finished()) {
        const moment = this.currentMoment();
        this.currentOptions.set(shuffleArray(moment.choices));
        this.activeFeed.set([...moment.feed]);

        // Scroll the chat feed to the top
        setTimeout(() => {
          const feedEl = document.querySelector('.wa-chat') as HTMLElement;
          if (feedEl) {
            feedEl.scrollTop = 0;
            const hasScroll = feedEl.scrollHeight > feedEl.clientHeight;
            this.showScrollIndicator.set(hasScroll);
          }
        }, 50);
      }
    });
  }

  onChatScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const hasScrollbar = el.scrollHeight > el.clientHeight;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    this.showScrollIndicator.set(hasScrollbar && !isNearBottom);
  }

  beep(type: 'click' | 'good' | 'bad' | 'signal' = 'click'): void {
    if (this.muted()) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      o.connect(g);
      g.connect(this.audioCtx.destination);
      o.type = 'sine';
      o.frequency.value = type === 'good' ? 660 : type === 'bad' ? 220 : type === 'signal' ? 520 : 360;

      g.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.28, this.audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.25);

      o.start();
      o.stop(this.audioCtx.currentTime + 0.25);
    } catch {
      // fail silently
    }
  }

  start(): void {
    this.profileSelectionActive.set(true);
  }

  confirmProfile(name: string, avatar: string): void {
    this.selectedProfile.set({ name, avatar });
    this.profileSelectionActive.set(false);
    this.started.set(true);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
    this.beep('click');
  }

  restart(): void {
    this.started.set(false);
    this.profileSelectionActive.set(false);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
  }

  choose(choice: ViralChoice): void {
    if (this.finished() || this.isTyping() || this.activeFeedbackChoice()) return;

    this.beep('click');

    // Append the user's choice to the active feed
    const lastMsg = this.activeFeed()[this.activeFeed().length - 1];
    const time = lastMsg ? lastMsg.time : '18:02';
    const myMsg: ViralChatMessage = {
      from: 'me',
      name: this.selectedProfile().name,
      role: '',
      letter: this.selectedProfile().avatar,
      avatarClass: 'av-green',
      text: choice.sentText || choice.text,
      time: time,
      isMe: true
    };
    this.activeFeed.update(feed => [...feed, myMsg]);

    // Scroll to bottom after sending
    setTimeout(() => {
      const feedEl = document.querySelector('.wa-chat');
      if (feedEl) {
        feedEl.scrollTop = feedEl.scrollHeight;
      }
    }, 20);

    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);

      this.answers.update((curr) => ({
        ...curr,
        [this.currentMoment().id]: choice
      }));

      // Play sound depending on correctness
      setTimeout(() => {
        this.beep(choice.level === 'best' || choice.level === 'good' ? 'good' : 'bad');
        // Play signal unlock sound
        setTimeout(() => this.beep('signal'), 300);
      }, 50);

      // Scroll to bottom after mobile panel open
      setTimeout(() => {
        const feedEl = document.querySelector('.wa-chat');
        if (feedEl) {
          feedEl.scrollTop = feedEl.scrollHeight;
        }
      }, 100);

    }, 1200);
  }

  continueFlow(): void {
    const active = this.activeFeedbackChoice();
    if (!active) return;

    this.beep('click');

    if (this.currentMomentIndex() === this.missions.length - 1) {
      this.finished.set(true);
      return;
    }

    this.currentMomentIndex.update((idx) => idx + 1);
    this.activeFeedbackChoice.set(null);
  }

  toggleMute(): void {
    this.muted.update(val => !val);
    if (!this.muted()) {
      this.beep('click');
    }
  }

  async copyQuickRules(): Promise<void> {
    const text = `Ciudadanía Digital Jalisco · CDJ-GAME-P04 · No lo hagas viral
Guía breve de reflexión y recomendaciones para estudiantes de bachillerato

1. Antes de reenviar:
- ¿El contenido informa algo necesario o solo expone a alguien?
- ¿La persona que aparece pidió que no se compartiera?
- ¿El clip salió del contexto original?
- ¿Reenviarlo ayuda a resolver o solo le da más público?

2. Cuando alguien queda expuesto:
- No conviertas su incomodidad en debate público.
- Pregunta qué necesita antes de actuar en su nombre.
- Si decides intervenir, usa frases breves: “no lo movamos más”, “una cosa es comentar la jugada y otra atacar a la persona”.
- Si hay amenazas, extorsión, datos personales o contenido íntimo, busca apoyo adulto o institucional.

3. Evidencia sin viralizar:
- Guardar lo mínimo necesario para reportar. No mandar capturas a todos “para que vean”.
- Explicar qué pasó, dónde y qué se pide. No armar encuestas públicas sobre si fue grave.
- Usar canales de moderación o apoyo. No convertir el reporte en espectáculo.

4. Cuatro reglas para comunidades gamer:
1. No repostear clips para humillar.
2. Si alguien pide que no se comparta, pausar la difusión.
3. Reportar con evidencia mínima y sin reexponer.
4. Separar crítica de juego de ataque personal.

Frase final: si el clip necesita que alguien quede humillado para ser gracioso, quizá no es contenido: es presión de grupo con botón de compartir.`;

    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Ignore
    }
  }
}
