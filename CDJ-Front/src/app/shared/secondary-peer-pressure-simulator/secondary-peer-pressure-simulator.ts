import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PEER_PRESSURE_SIMULATOR_DATA,
  PeerPressureNode,
  PeerPressureChoice,
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
  readonly nodes = this.data.nodes;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentNodeId = signal<string>('N1');
  readonly copied = signal(false);
  
  // Track selected choices by Node ID
  readonly answers = signal<Record<string, PeerPressureChoice>>({});
  
  // Track temporary clicked state for visual feedback
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<PeerPressureChoice | null>(null);

  // Computations
  readonly currentNodeIndex = computed(() => {
    const idx = this.nodes.findIndex((n) => n.node_id === this.currentNodeId());
    return idx >= 0 ? idx : 0;
  });

  readonly currentNode = computed(() => {
    return this.nodes[this.currentNodeIndex()];
  });

  readonly progressPercent = computed(() => {
    const completed = Object.keys(this.answers()).length;
    return Math.round((completed / this.nodes.length) * 100);
  });

  readonly totalSafeScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.safe, 0);
  });

  readonly totalRiskScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.risk, 0);
  });

  // Dynamic status messages in the simulated dynamic island
  readonly activeStatus = computed<'idle' | 'typing' | 'success' | 'alert'>(() => {
    if (this.isTyping()) return 'typing';
    const active = this.activeFeedbackChoice();
    if (active) {
      return active.safe > active.risk ? 'success' : 'alert';
    }
    return 'idle';
  });

  readonly result = computed<PeerPressureResult>(() => {
    const safe = this.totalSafeScore();
    const possibleResults = this.data.results;
    
    // Find matching result by range
    const matched = possibleResults.find(
      (r) => safe >= r.range.min && safe <= r.range.max
    );
    
    return matched || possibleResults[1]; // fallback to middle one
  });

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentNodeId.set('N1');
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
  }

  restart(): void {
    this.start();
  }

  choose(choice: PeerPressureChoice): void {
    if (this.finished() || this.isTyping()) return;

    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);
      
      this.answers.update((curr) => ({
        ...curr,
        [this.currentNodeId()]: choice
      }));
    }, 1000);
  }

  continueFlow(): void {
    const active = this.activeFeedbackChoice();
    if (!active) return;

    if (active.next_node === 'RESULT') {
      this.finished.set(true);
      return;
    }

    this.currentNodeId.set(active.next_node);
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
}
