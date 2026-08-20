import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_NO_SE_ACABA_DATA, AppNoSeAcabaDetectorItem, AppNoSeAcabaOption, AppNoSeAcabaDilemma } from '../../core/data/app-no-se-acaba.data';
@Component({
  selector: 'app-app-no-se-acaba',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-no-se-acaba.html',
  styleUrl: './app-no-se-acaba.css',
})
export class AppNoSeAcabaComponent {
  readonly data = APP_NO_SE_ACABA_DATA;
  readonly detectorItemsList = this.data.detector_items;
  readonly dilemmasList = this.data.dilemmas;

  // Navigation states
  readonly started = signal(false);
  readonly currentScreen = signal<'intro' | 'caseIntro' | 'detector' | 'micro' | 'decision' | 'final'>('intro');
  
  // Hook Detector states
  readonly shuffledDetectorItems = signal<AppNoSeAcabaDetectorItem[]>([]);
  readonly selectedDetectorIds = signal<Set<string>>(new Set());
  readonly detectorChecked = signal(false);
  readonly detectorFeedbackTitle = signal('');
  readonly detectorFeedbackCopy = signal('');
  readonly detectorScore = signal(0);
  readonly detectorLimitText = signal('Selecciona de 1 a 4 elementos.');

  // Dilemma states
  readonly currentDilemmaIndex = signal(0);
  readonly selectedOption = signal<AppNoSeAcabaOption | null>(null);
  readonly answers = signal<Record<string, AppNoSeAcabaOption>>({});
  
  // General feedback states
  readonly copied = signal(false);

  // Computations
  readonly currentDilemma = computed<AppNoSeAcabaDilemma>(() => {
    return this.dilemmasList[this.currentDilemmaIndex()];
  });

  readonly totalStepsText = computed(() => {
    return `Parte ${this.currentDilemmaIndex() + 2} de ${this.dilemmasList.length + 1}`;
  });

  readonly progressPercent = computed(() => {
    const totalSteps = this.dilemmasList.length + 1;
    const completed = this.currentDilemmaIndex() + 2;
    return Math.round((completed / totalSteps) * 100);
  });

  readonly totalScore = computed(() => {
    let dilemmaScore = Object.values(this.answers()).reduce((sum, ans) => sum + ans.points, 0);
    return this.detectorScore() + dilemmaScore;
  });

  readonly maxScore = computed(() => {
    // 4 points max for detector + 4 points max * 7 dilemmas = 32 points
    return 4 + this.dilemmasList.length * 4;
  });

  readonly resultData = computed(() => {
    const score = this.totalScore();
    const max = this.maxScore();
    const pct = score / max;
    
    let title = 'Ya tienes una ruta para recuperar atención';
    let copy = 'Detectaste algunos mecanismos y elegiste varios frenos posibles. Ahora prueba un ajuste concreto durante 7 días.';
    let band: 'low' | 'mid' | 'high' = 'mid';

    if (pct >= 0.78) {
      title = 'Tienes una estrategia sólida de atención';
      copy = 'Tus decisiones combinan criterio, autocontrol y realismo. No se trata de usar cero tecnología, sino de que la tecnología no decida tu ritmo.';
      band = 'high';
    } else if (pct < 0.45) {
      title = 'Conviene fortalecer tus frenos digitales';
      copy = 'Varias decisiones dejaron que la app marcara el ritmo. Empieza pequeño: una app, una franja, una señal de salida.';
      band = 'low';
    }

    return { title, copy, band };
  });

  readonly selectedDetectorItems = computed<AppNoSeAcabaDetectorItem[]>(() => {
    const selectedIds = this.selectedDetectorIds();
    return this.detectorItemsList.filter(item => selectedIds.has(item.id));
  });

  constructor() {
    this.resetState();
  }

  resetState(): void {
    this.started.set(false);
    this.currentScreen.set('intro');
    this.selectedDetectorIds.set(new Set());
    this.detectorChecked.set(false);
    this.detectorScore.set(0);
    this.detectorFeedbackTitle.set('');
    this.detectorFeedbackCopy.set('');
    this.detectorLimitText.set('Selecciona de 1 a 4 elementos.');
    this.currentDilemmaIndex.set(0);
    this.selectedOption.set(null);
    this.answers.set({});
    this.copied.set(false);
  }

  start(): void {
    this.started.set(true);
    this.currentScreen.set('caseIntro');
  }

  restart(): void {
    this.resetState();
    this.start();
  }

  goToDetector(): void {
    // Shuffle detector items
    const shuffled = [...this.detectorItemsList]
      .map(v => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(o => o.v);
    this.shuffledDetectorItems.set(shuffled);
    this.currentScreen.set('detector');
  }

  toggleDetectorItem(id: string): void {
    if (this.detectorChecked()) return;

    this.selectedDetectorIds.update(current => {
      const updated = new Set(current);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        if (updated.size >= 4) {
          this.detectorLimitText.set('Máximo 4. Quita uno si quieres cambiar tu lectura.');
          return current; // Don't allow adding more than 4
        }
        updated.add(id);
      }
      this.detectorLimitText.set('Selecciona de 1 a 4 elementos.');
      return updated;
    });
  }

  checkDetector(): void {
    const selectedIds = this.selectedDetectorIds();
    if (selectedIds.size === 0) {
      this.detectorLimitText.set('Elige al menos un elemento antes de revisar.');
      return;
    }

    const selectedList = this.selectedDetectorItems();
    const hooksCount = selectedList.filter(item => item.type === 'hook').length;
    
    const score = Math.min(4, hooksCount);
    this.detectorScore.set(score);
    this.detectorChecked.set(true);

    if (hooksCount >= 3) {
      this.detectorFeedbackTitle.set('Buena lectura de los ganchos');
      this.detectorFeedbackCopy.set('Ubicaste varios elementos que compiten por la atención de Leo. La clave ahora es elegir frenos realistas.');
    } else if (hooksCount === 2) {
      this.detectorFeedbackTitle.set('Lectura parcial');
      this.detectorFeedbackCopy.set('Algunos elementos no eran ganchos de la app. Revisa la diferencia entre contexto, gancho y freno.');
    } else {
      this.detectorFeedbackTitle.set('Faltó detectar más mecanismos');
      this.detectorFeedbackCopy.set('Algunos elementos no eran ganchos de la app. Revisa la diferencia entre contexto, gancho y freno.');
    }
  }

  goToMicro(): void {
    this.currentScreen.set('micro');
  }

  goToDecisions(): void {
    this.currentDilemmaIndex.set(0);
    this.selectedOption.set(null);
    this.currentScreen.set('decision');
  }

  selectOption(option: AppNoSeAcabaOption): void {
    this.selectedOption.set(option);
    this.answers.update(curr => ({
      ...curr,
      [this.currentDilemma().id]: option
    }));
  }

  next(): void {
    if (this.currentScreen() === 'decision') {
      if (!this.selectedOption()) return;
      
      const nextIndex = this.currentDilemmaIndex() + 1;
      if (nextIndex < this.dilemmasList.length) {
        this.currentDilemmaIndex.set(nextIndex);
        const nextDilemmaId = this.dilemmasList[nextIndex].id;
        this.selectedOption.set(this.answers()[nextDilemmaId] || null);
      } else {
        this.currentScreen.set('final');
      }
    }
  }

  previous(): void {
    if (this.currentScreen() === 'caseIntro') {
      this.started.set(false);
      this.currentScreen.set('intro');
    } else if (this.currentScreen() === 'detector') {
      this.currentScreen.set('caseIntro');
    } else if (this.currentScreen() === 'micro') {
      this.currentScreen.set('detector');
    } else if (this.currentScreen() === 'decision') {
      const prevIndex = this.currentDilemmaIndex() - 1;
      if (prevIndex >= 0) {
        this.currentDilemmaIndex.set(prevIndex);
        const prevDilemmaId = this.dilemmasList[prevIndex].id;
        this.selectedOption.set(this.answers()[prevDilemmaId] || null);
      } else {
        this.currentScreen.set('micro');
      }
    } else if (this.currentScreen() === 'final') {
      this.currentScreen.set('decision');
      this.currentDilemmaIndex.set(this.dilemmasList.length - 1);
      const lastDilemmaId = this.dilemmasList[this.dilemmasList.length - 1].id;
      this.selectedOption.set(this.answers()[lastDilemmaId] || null);
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
}
