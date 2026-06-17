import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRESENCIA_JOVENES_DATA, PresenciaJovenesQuestion, PresenciaJovenesOption, PresenciaJovenesResult } from '../../core/data/presencia-jovenes.data';

@Component({
  selector: 'app-presencia-jovenes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './presencia-jovenes.html',
  styleUrl: './presencia-jovenes.css',
})
export class PresenciaJovenesComponent {
  readonly data = PRESENCIA_JOVENES_DATA;
  readonly questions = this.data.questions;
  readonly scale = this.data.scale;
  readonly trackerItems = this.data.tracker_items;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentQuestionIndex = signal(0);
  readonly answers = signal<(number | null)[]>(new Array(8).fill(null));
  readonly copied = signal(false);

  // Workbook Form Inputs
  readonly routine = signal('');
  readonly trigger = signal('');
  readonly adj1 = signal('');
  readonly adj2 = signal('');
  readonly adj3 = signal('');
  readonly virtuePractice = signal('');
  readonly helped = signal('');
  readonly hard = signal('');
  readonly keep = signal('');

  // 7-day tracker checkboxes status: [day_0_to_6][item_0_to_4]
  readonly trackerState = signal<boolean[][]>(this.createEmptyTracker());

  // Computations
  readonly currentQuestion = computed<PresenciaJovenesQuestion>(() => {
    return this.questions[this.currentQuestionIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round(((this.currentQuestionIndex() + 1) / this.questions.length) * 100);
  });

  readonly selectedAnswer = computed<number | null>(() => {
    return this.answers()[this.currentQuestionIndex()];
  });

  readonly score = computed(() => {
    return this.questions.reduce((sum, q, i) => {
      const val = this.answers()[i];
      if (val === null) return sum;
      return sum + (q.reverse ? 3 - val : val);
    }, 0);
  });

  readonly result = computed<PresenciaJovenesResult>(() => {
    const scoreVal = this.score();
    const matches = this.data.results.find(
      (r) => scoreVal >= r.min && scoreVal <= r.max
    );
    return matches || this.data.results[1]; // fallback to medium band
  });

  readonly isWorkbookComplete = computed(() => {
    return (
      this.routine().trim().length > 0 &&
      this.trigger().trim().length > 0 &&
      this.adj1().trim().length > 0 &&
      this.adj2().trim().length > 0 &&
      this.virtuePractice().trim().length > 0
    );
  });

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentQuestionIndex.set(0);
    this.answers.set(new Array(8).fill(null));
    this.copied.set(false);
    this.trackerState.set(this.createEmptyTracker());

    // Reset Form fields
    this.routine.set('');
    this.trigger.set('');
    this.adj1.set('');
    this.adj2.set('');
    this.adj3.set('');
    this.virtuePractice.set('');
    this.helped.set('');
    this.hard.set('');
    this.keep.set('');
  }

  restart(): void {
    this.start();
  }

  setAnswer(value: number): void {
    this.answers.update((curr) => {
      const next = [...curr];
      next[this.currentQuestionIndex()] = value;
      return next;
    });
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update((idx) => idx - 1);
    }
  }

  nextQuestion(): void {
    const ans = this.answers()[this.currentQuestionIndex()];
    if (ans === null) return;

    if (this.currentQuestionIndex() < this.questions.length - 1) {
      this.currentQuestionIndex.update((idx) => idx + 1);
    } else {
      // End of quiz, load virtue recommendation into input and finish
      this.virtuePractice.set(this.result().virtue.name);
      this.finished.set(true);
    }
  }

  toggleTrackerCheck(dayIdx: number, itemIdx: number): void {
    this.trackerState.update((state) => {
      const next = state.map((day) => [...day]);
      next[dayIdx][itemIdx] = !next[dayIdx][itemIdx];
      return next;
    });
  }

  async copyText(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copied.set(false);
    }
  }

  printWorkbook(): void {
    if (this.isWorkbookComplete()) {
      window.print();
    }
  }

  getCategoryHue(block: string): string {
    switch (block) {
      case 'Escucha y respeto': return 'blue';
      case 'Presencia interrumpida': return 'gold';
      case 'Ejemplo adulto': return 'orange';
      case 'Reglas visibles': return 'teal';
      case 'Disponibilidad adulta': return 'purple';
      case 'Uso por reflejo': return 'pink';
      case 'Escuchar antes de cortar': return 'blue';
      case 'Cambio posible': return 'teal';
      default: return 'blue';
    }
  }

  private createEmptyTracker(): boolean[][] {
    return Array.from({ length: 7 }, () => new Array(5).fill(false));
  }
}
