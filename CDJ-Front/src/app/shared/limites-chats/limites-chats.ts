import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LIMITES_CHATS_DATA, LimitesOption, LimitesCase, LimitesStep, LimitesClosure } from '../../core/data/limites-chats.data';
@Component({
  selector: 'app-limites-chats',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './limites-chats.html',
  styleUrl: './limites-chats.css',
})
export class LimitesChatsComponent {
  readonly data = LIMITES_CHATS_DATA;
  readonly cases = this.data.casos_cortos;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentCaseIndex = signal(0);
  readonly currentStepIndex = signal(0);
  readonly copied = signal(false);

  // Store selected option for the current step
  readonly selectedOption = signal<LimitesOption | null>(null);

  // Track selected choices by Step ID
  readonly answers = signal<Record<string, LimitesOption>>({});

  // Computations
  readonly currentCase = computed<LimitesCase>(() => {
    return this.cases[this.currentCaseIndex()];
  });

  readonly currentStep = computed<LimitesStep>(() => {
    return this.currentCase().pasos[this.currentStepIndex()];
  });

  readonly progressPercent = computed(() => {
    const totalSteps = 6;
    const completed = Object.keys(this.answers()).length;
    return Math.round((completed / totalSteps) * 100);
  });

  readonly totalStepsText = computed(() => {
    const stepNumber = this.currentCaseIndex() * 3 + this.currentStepIndex() + 1;
    return `Caso ${this.currentCaseIndex() + 1} de 2 · Decisión ${stepNumber} de 6`;
  });

  // Calculate internal score based on formula:
  // sum of (respeto + autocontrol + accion + criterio) for all 6 decisions
  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => {
      const pts = ans.puntos_internos_no_publicar;
      return sum + pts.respeto + pts.autocontrol + pts.accion + pts.criterio;
    }, 0);
  });

  readonly result = computed<LimitesClosure>(() => {
    const score = this.totalScore();
    const possibleResults = this.data.cierres_personalizados;
    const matched = possibleResults.find(
      (r) => score >= r.range.min && score <= r.range.max
    );
    return matched || possibleResults[1]; // fallback to the middle one
  });

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentCaseIndex.set(0);
    this.currentStepIndex.set(0);
    this.answers.set({});
    this.selectedOption.set(null);
    this.copied.set(false);
  }

  restart(): void {
    this.start();
  }

  selectOption(option: LimitesOption): void {
    if (this.finished()) return;

    this.selectedOption.set(option);
    this.answers.update((curr) => ({
      ...curr,
      [this.currentStep().step_id]: option
    }));
  }

  next(): void {
    if (!this.selectedOption()) return;

    const caseIdx = this.currentCaseIndex();
    const stepIdx = this.currentStepIndex();

    // Check if we are at the end of the current case
    if (stepIdx < 2) {
      this.currentStepIndex.set(stepIdx + 1);
      // Load previous answer if it exists
      const nextStepId = this.currentCase().pasos[stepIdx + 1].step_id;
      this.selectedOption.set(this.answers()[nextStepId] || null);
    } else {
      // End of case
      if (caseIdx === 0) {
        // Go to Case 2
        this.currentCaseIndex.set(1);
        this.currentStepIndex.set(0);
        const nextStepId = this.cases[1].pasos[0].step_id;
        this.selectedOption.set(this.answers()[nextStepId] || null);
      } else {
        // End of Case 2, finish and show result
        this.finished.set(true);
      }
    }
  }

  previous(): void {
    const caseIdx = this.currentCaseIndex();
    const stepIdx = this.currentStepIndex();

    if (stepIdx > 0) {
      this.currentStepIndex.set(stepIdx - 1);
      const prevStepId = this.currentCase().pasos[stepIdx - 1].step_id;
      this.selectedOption.set(this.answers()[prevStepId] || null);
    } else {
      if (caseIdx === 1) {
        // Go back to Case 1 last step
        this.currentCaseIndex.set(0);
        this.currentStepIndex.set(2);
        const prevStepId = this.cases[0].pasos[2].step_id;
        this.selectedOption.set(this.answers()[prevStepId] || null);
      } else {
        // Can't go back from first step, go back to start page
        this.started.set(false);
      }
    }
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

  getCategoryHue(): string {
    return this.currentCaseIndex() === 0 ? 'blue' : 'purple';
  }
}
