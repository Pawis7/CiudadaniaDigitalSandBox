import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RIESGOS_REALES_DATA, RiesgosRealesQuestion, RiesgosRealesOption, RiesgosRealesResult } from '../../core/data/riesgos-reales.data';

@Component({
  selector: 'app-riesgos-reales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './riesgos-reales.html',
  styleUrl: './riesgos-reales.css',
})
export class RiesgosRealesComponent {
  readonly data = RIESGOS_REALES_DATA;
  readonly questions = this.data.questions;
  readonly scale = this.data.scale;
  readonly kitTools = this.data.kit;
  
  // Weekly tracker items (5 items)
  readonly trackerItems = [
    "Tuvimos una conversación tranquila y directa",
    "Revisamos qué no se comparte con otras personas",
    "Nombramos al menos una señal que sí preocupa",
    "Repasamos qué hacer si algo se pone serio",
    "Ajustamos una regla o una respuesta de la casa"
  ];

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentQuestionIndex = signal(0);
  readonly answers = signal<(number | null)[]>(new Array(12).fill(null));

  // Planner Form Inputs
  readonly agreement = signal('');
  readonly signalRed = signal('');
  readonly adultResponsible = signal('');

  // Weekly confidence and changes notes (4 weeks)
  readonly weeklyConfidence = signal<string[]>(['', '', '', '']);
  readonly weeklyChanges = signal<string[]>(['', '', '', '']);

  // 4-week tracker checkboxes status: [week_0_to_3][item_0_to_4]
  readonly trackerState = signal<boolean[][]>(this.createEmptyTracker());

  // Computations
  readonly currentQuestion = computed<RiesgosRealesQuestion>(() => {
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

  readonly result = computed<RiesgosRealesResult>(() => {
    const scoreVal = this.score();
    const matches = this.data.results.find(
      (r) => scoreVal >= r.min && scoreVal <= r.max
    );
    return matches || this.data.results[1]; // fallback to medium
  });

  readonly isPlannerComplete = computed(() => {
    return (
      this.agreement().trim().length > 0 &&
      this.signalRed().trim().length > 0 &&
      this.adultResponsible().trim().length > 0
    );
  });

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentQuestionIndex.set(0);
    this.answers.set(new Array(12).fill(null));
    this.trackerState.set(this.createEmptyTracker());

    // Reset Form fields
    this.agreement.set('');
    this.signalRed.set('');
    this.adultResponsible.set('');
    this.weeklyConfidence.set(['', '', '', '']);
    this.weeklyChanges.set(['', '', '', '']);
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
      this.finished.set(true);
    }
  }

  toggleTrackerCheck(weekIdx: number, itemIdx: number): void {
    this.trackerState.update((state) => {
      const next = state.map((week) => [...week]);
      next[weekIdx][itemIdx] = !next[weekIdx][itemIdx];
      return next;
    });
  }

  printWorkbook(): void {
    if (this.isPlannerComplete()) {
      window.print();
    }
  }

  updateWeeklyConfidence(weekIdx: number, value: string): void {
    this.weeklyConfidence.update((arr) => {
      const next = [...arr];
      next[weekIdx] = value;
      return next;
    });
  }

  updateWeeklyChanges(weekIdx: number, value: string): void {
    this.weeklyChanges.update((arr) => {
      const next = [...arr];
      next[weekIdx] = value;
      return next;
    });
  }

  private createEmptyTracker(): boolean[][] {
    return Array.from({ length: 4 }, () => new Array(5).fill(false));
  }
}
