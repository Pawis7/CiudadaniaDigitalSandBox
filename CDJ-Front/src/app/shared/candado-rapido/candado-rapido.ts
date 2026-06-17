import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CANDADO_RAPIDO_DATA, CandadoElement, CandadoLock, CandadoOption } from '../../core/data/candado-rapido.data';

type GameStep = 'start' | 'read' | 'map' | 'locks' | 'final';

@Component({
  selector: 'app-candado-rapido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './candado-rapido.html',
  styleUrl: './candado-rapido.css',
})
export class CandadoRapidoComponent {
  readonly data = CANDADO_RAPIDO_DATA;
  readonly elements = this.data.elements;
  readonly locks = this.data.locks;

  // Game States
  readonly step = signal<GameStep>('start');
  readonly readings = signal<Record<string, string>>({}); // Maps E01 -> E01_C, etc.
  readonly selectedLocks = signal<string[]>([]); // Array of Lock IDs (max 3)
  readonly justification = signal<string>('');
  readonly activeElementId = signal<string>('E01');
  readonly copied = signal(false);

  // Computeds
  readonly currentElementIndex = computed(() => {
    return this.elements.findIndex(e => e.id === this.activeElementId());
  });

  readonly currentElement = computed<CandadoElement>(() => {
    const idx = this.currentElementIndex();
    return this.elements[idx >= 0 ? idx : 0];
  });

  readonly answeredCount = computed(() => {
    return Object.keys(this.readings()).length;
  });

  readonly isAllAnswered = computed(() => {
    return this.answeredCount() === this.elements.length;
  });

  readonly progressPercent = computed(() => {
    const currentStep = this.step();
    if (currentStep === 'start') return 10;
    if (currentStep === 'read') return Math.round(20 + (this.answeredCount() * 3.8)); // Scale up to 65% during questionnaire
    if (currentStep === 'map') return 65;
    if (currentStep === 'locks') return 85;
    return 100;
  });

  readonly totalScore = computed(() => {
    return this.elements.reduce((score, el) => {
      const selectedOptId = this.readings()[el.id];
      if (!selectedOptId) return score;
      const opt = el.options.find(o => o.id === selectedOptId);
      return score + (opt?.accepted ? 1 : 0);
    }, 0);
  });

  // Calculate tags covered by chosen locks
  readonly lockCoverage = computed<Set<string>>(() => {
    const tags = new Set<string>();
    const selectedLockIds = this.selectedLocks();
    this.locks
      .filter(l => selectedLockIds.includes(l.id))
      .forEach(l => {
        l.covers.forEach(tag => tags.add(tag));
      });
    return tags;
  });

  // Uncovered critical areas
  readonly criticalMissing = computed<string[]>(() => {
    const coverage = this.lockCoverage();
    return this.data.feedback_logic.critical_tags.filter(tag => !coverage.has(tag));
  });

  readonly feedbackBand = computed(() => {
    const score = this.totalScore();
    return this.data.feedback_logic.bands.find(b => score >= b.min && score <= b.max) 
      || this.data.feedback_logic.bands[0];
  });

  // Selected lock objects
  readonly selectedLockObjects = computed<CandadoLock[]>(() => {
    const selIds = this.selectedLocks();
    return this.locks.filter(l => selIds.includes(l.id));
  });

  // Start the audit
  start(): void {
    this.go('read');
  }

  // Go to specific step with smooth container scroll
  go(targetStep: GameStep): void {
    this.step.set(targetStep);
    setTimeout(() => {
      const container = document.getElementById('candado-rapido-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }

  // Save selected option for active element
  chooseOption(elementId: string, optionId: string): void {
    const currentReadings = { ...this.readings() };
    currentReadings[elementId] = optionId;
    this.readings.set(currentReadings);
  }

  // Toggle lock selection
  toggleLock(lockId: string): void {
    const current = [...this.selectedLocks()];
    if (current.includes(lockId)) {
      this.selectedLocks.set(current.filter(id => id !== lockId));
    } else {
      if (current.length < 3) {
        this.selectedLocks.set([...current, lockId]);
      }
    }
  }

  // Next element in read flow
  nextElement(): void {
    const idx = this.currentElementIndex();
    if (idx < this.elements.length - 1) {
      this.activeElementId.set(this.elements[idx + 1].id);
    } else {
      this.go('map');
    }
  }

  // Prev element in read flow
  prevElement(): void {
    const idx = this.currentElementIndex();
    if (idx > 0) {
      this.activeElementId.set(this.elements[idx - 1].id);
    }
  }

  // Restart the whole flow
  restart(): void {
    this.step.set('start');
    this.readings.set({});
    this.selectedLocks.set([]);
    this.justification.set('');
    this.activeElementId.set('E01');
    this.copied.set(false);
    setTimeout(() => {
      const container = document.getElementById('candado-rapido-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }

  // Utility to clean tag names for display
  cleanTag(t: string): string {
    return t.replace(/_/g, ' ');
  }

  // Copy plan message to clipboard
  async copyPlanMessage(): Promise<void> {
    const locksStr = this.selectedLockObjects().map(l => l.label).join(', ');
    const message = `Mi plan de privacidad en 3 pasos:
1. Antes de publicar revisaré si muestro escuela, horarios, lugares frecuentes o personas que no dieron permiso.
2. Cerraré primero: ${locksStr}.
3. Si una cuenta desconocida insiste o menciona mi escuela, horarios o lugares, no daré más datos y pediré apoyo.`;

    try {
      await navigator.clipboard.writeText(message);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }

  // Print results
  printPlan(): void {
    window.print();
  }

  getCategoryHue(zone: string): string {
    switch (zone) {
      case 'Perfil':
      case 'Bio':
        return 'blue';
      case 'Historia':
      case 'Publicación antigua':
        return 'gold';
      case 'Etiqueta':
      case 'Publicación':
        return 'orange';
      case 'Solicitud':
        return 'teal';
      case 'Mensaje':
        return 'purple';
      case 'Ajuste':
      case 'Repost':
        return 'pink';
      default:
        return 'blue';
    }
  }
}
