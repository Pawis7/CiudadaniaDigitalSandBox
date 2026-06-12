import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PEER_PRESSURE_SIMULATOR_DATA,
  PeerPressureMoment,
  PeerPressureOption,
  PeerPressureResult
} from '../../core/data/secondary-peer-pressure-simulator.data';

@Component({
  selector: 'app-secondary-peer-pressure-simulator',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './secondary-peer-pressure-simulator.html',
  styleUrl: './secondary-peer-pressure-simulator.css',
})
export class SecondaryPeerPressureSimulatorComponent {
  readonly data = PEER_PRESSURE_SIMULATOR_DATA;
  readonly moments = this.data.momentos_interactivos;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);

  // Track selected choice by Moment ID
  readonly answers = signal<Record<string, PeerPressureOption>>({});

  // Track temporary clicked state for visual feedback
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<PeerPressureOption | null>(null);

  // Computations
  readonly currentMoment = computed(() => {
    return this.moments[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.moments.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.puntos, 0);
  });

  // Dynamic status messages in the simulated dynamic island
  readonly activeStatus = computed<'idle' | 'typing' | 'success' | 'alert'>(() => {
    if (this.isTyping()) return 'typing';
    const active = this.activeFeedbackChoice();
    if (active) {
      return active.puntos >= 3 ? 'success' : 'alert';
    }
    return 'idle';
  });

  readonly result = computed<PeerPressureResult>(() => {
    const scoreVal = this.totalScore();
    const possibleResults = this.data.resultados_finales;

    // Find matching result by range
    const matched = possibleResults.find(
      (r) => scoreVal >= r.min && scoreVal <= r.max
    );

    return matched || possibleResults[1]; // fallback to middle one
  });

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

  choose(choice: PeerPressureOption): void {
    if (this.finished() || this.isTyping()) return;

    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);

      this.answers.update((curr) => ({
        ...curr,
        [this.currentMoment().id]: choice
      }));
    }, 1000);
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

  async copyMessage(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copied.set(false);
    }
  }

  printResults(): void {
    window.print();
  }
}
