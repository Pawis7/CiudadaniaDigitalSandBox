import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CHAT_EN_LLAMAS_DATA,
  ChatMoment,
  ChatOption,
  ChatMessage
} from '../../core/data/chat-en-llamas.data';

import { CdjLogoComponent } from '../cdj-logo/cdj-logo';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-chat-en-llamas',
  standalone: true,
  imports: [CommonModule, CdjLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-en-llamas.html',
  styleUrl: './chat-en-llamas.css',
})
export class ChatEnLlamasComponent {
  readonly data = CHAT_EN_LLAMAS_DATA;
  readonly moments = this.data.moments;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);

  // Store selected option for each moment
  readonly answers = signal<Record<string, ChatOption>>({});

  // Scrambled options for the current moment
  readonly currentOptions = signal<ChatOption[]>([]);

  // Feedback and typing simulation states
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<ChatOption | null>(null);

  // Computations
  readonly currentMoment = computed<ChatMoment>(() => {
    return this.moments[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.moments.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.points, 0);
  });

  // Final diagnostic message based on points (max 18)
  readonly finalDiagnostic = computed(() => {
    const score = this.totalScore();

    if (score >= 15) {
      return {
        titulo: "Ruta muy sólida",
        mensaje: "Tus decisiones priorizan pausar, entender contexto, detener difusión y reparar sin convertir el chat en tribunal público. ¡Excelente criterio digital!",
        claseColor: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
      };
    } else if (score >= 10) {
      return {
        titulo: "Ruta en proceso",
        mensaje: "Tus decisiones tienen intención de ayudar, pero todavía puedes cuidar mejor la evidencia, el tono y la reparación. ¡Sigue afinando tu detector!",
        claseColor: "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
      };
    } else {
      return {
        titulo: "Ruta por fortalecer",
        mensaje: "Conviene practicar cómo pausar antes de opinar, no usar capturas incompletas como prueba total y pedir apoyo cuando el conflicto escala.",
        claseColor: "border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200"
      };
    }
  });

  // Calculated widths for final radar bars
  readonly radarWidths = computed(() => {
    const score = this.totalScore();
    const max = 18; // 6 moments * 3 points
    const pct = Math.round((score / max) * 100);
    return [
      Math.min(100, Math.max(25, pct)),       // Pausa
      Math.min(100, Math.max(25, pct - 4)),   // Contexto
      Math.min(100, Math.max(25, pct + 2)),   // Reparación
      Math.min(100, Math.max(25, pct - 8))    // Autocontrol
    ];
  });

  readonly activeContactName = computed(() => {
    return 'Grupo 3.º B';
  });

  readonly avatarLetter = computed(() => {
    return '3B';
  });

  constructor() {
    // Sync option shuffling when switching moments
    effect(() => {
      if (this.started() && !this.finished()) {
        const moment = this.currentMoment();
        this.currentOptions.set(shuffleArray(moment.options));
      }
    });
  }

  start(): void {
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

  choose(choice: ChatOption): void {
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
