import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IllustratedActivityConfig } from './illustrated-activity.models';

@Component({
  selector: 'app-illustrated-activity',
  standalone: true,
  templateUrl: './illustrated-activity.html',
  styleUrl: './illustrated-activity.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustratedActivityComponent implements OnDestroy {
  readonly activity = input.required<IllustratedActivityConfig>();
  readonly closeRequested = output<void>();
  // -1 is the cover; scenes.length is the ending.
  readonly page = signal(-1);
  readonly solvedIds = signal<ReadonlySet<string>>(new Set());
  readonly selections = signal<Record<string, string>>({});
  readonly reviewedEvidence = signal<Record<string, string[]>>({});
  readonly expandedEvidence = signal<Record<string, string[]>>({});
  readonly guidance = signal('');
  readonly isSpeaking = signal(false);
  readonly audioMessage = signal('');
  readonly scene = computed(() => this.activity().scenes[this.page()] ?? null);
  readonly atCover = computed(() => this.page() < 0);
  readonly atEnding = computed(() => this.page() === this.activity().scenes.length);
  readonly solvedCount = computed(() => this.solvedIds().size);
  readonly sceneSolved = computed(() => {
    const scene = this.scene();
    return !!scene && this.solvedIds().has(scene.id);
  });
  readonly selectedChoice = computed(() => {
    const scene = this.scene();
    return scene?.choices.find((choice) => choice.id === this.selections()[scene.id]) ?? null;
  });
  readonly missingEvidenceIds = computed(() => {
    const scene = this.scene();
    if (!scene) return [];
    const reviewed = this.reviewedEvidence()[scene.id] ?? [];
    return (scene.requiredEvidenceIds ?? []).filter((id) => !reviewed.includes(id));
  });
  readonly canChoose = computed(
    () => this.missingEvidenceIds().length === 0 && !this.selectedChoice(),
  );
  readonly narrationAvailable =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  private readonly heading = viewChild<ElementRef<HTMLElement>>('pageHeading');
  private readonly readingPage = viewChild<ElementRef<HTMLElement>>('readingPage');
  private readonly feedbackPanel = viewChild<ElementRef<HTMLElement>>('feedbackPanel');
  private readonly decisionPrompt = viewChild<ElementRef<HTMLElement>>('decisionPrompt');
  private readonly bookSpread = viewChild<ElementRef<HTMLElement>>('bookSpread');
  private focusTimer: ReturnType<typeof setTimeout> | undefined;
  private audioToken = 0;

  constructor() {
    effect(() => {
      this.activity();
      this.resetState();
    });
  }

  private resetState(): void {
    this.stopNarration();
    this.page.set(-1);
    this.solvedIds.set(new Set());
    this.selections.set({});
    this.reviewedEvidence.set({});
    this.expandedEvidence.set({});
    this.guidance.set('');
    this.audioMessage.set('');
  }

  start(): void {
    if (this.activity().scenes.length) this.navigate(0);
  }

  restart(): void {
    this.resetState();
    this.focusNewPage();
  }

  next(): void {
    if (this.atCover()) {
      this.start();
      return;
    }
    if (this.atEnding()) return;
    if (!this.sceneSolved()) {
      this.guidance.set(
        this.missingEvidenceIds().length
          ? 'Abre las pistas que faltan. Te ayudarán a decidir.'
          : 'Elige una respuesta y descubre qué pasa antes de continuar.',
      );
      return;
    }
    this.navigate(this.page() + 1);
  }

  previous(): void {
    if (this.page() > -1) this.navigate(this.page() - 1);
  }

  canVisitScene(index: number): boolean {
    const scenes = this.activity().scenes;
    return (
      index >= 0 &&
      index < scenes.length &&
      scenes.slice(0, index).every((scene) => this.solvedIds().has(scene.id))
    );
  }

  goToScene(index: number): void {
    if (this.canVisitScene(index)) this.navigate(index);
  }

  choose(choiceId: string): void {
    const scene = this.scene();
    if (!scene || this.sceneSolved() || this.selectedChoice()) return;
    if (this.missingEvidenceIds().length) {
      this.guidance.set('Abre las pistas que faltan. Te ayudarán a decidir.');
      return;
    }
    const choice = scene.choices.find((item) => item.id === choiceId);
    if (!choice) return;
    this.stopNarration();
    this.guidance.set('');
    this.selections.update((values) => ({ ...values, [scene.id]: choice.id }));
    if (choice.correct) {
      this.solvedIds.update((ids) => new Set([...ids, scene.id]));
    }
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.feedbackPanel()?.nativeElement.focus(), 0);
  }

  retry(): void {
    const scene = this.scene();
    if (!scene || this.sceneSolved()) return;
    this.stopNarration();
    this.selections.update((values) => {
      const next = { ...values };
      delete next[scene.id];
      return next;
    });
    this.guidance.set('Puedes volver a elegir. Las pistas siguen aquí para ayudarte.');
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.decisionPrompt()?.nativeElement.focus(), 0);
  }

  toggleEvidence(evidenceId: string): void {
    const scene = this.scene();
    if (!scene?.evidence?.some((item) => item.id === evidenceId)) return;
    const expanded = this.expandedEvidence()[scene.id] ?? [];
    const opening = !expanded.includes(evidenceId);
    this.expandedEvidence.update((values) => ({
      ...values,
      [scene.id]: opening ? [...expanded, evidenceId] : expanded.filter((id) => id !== evidenceId),
    }));
    if (opening) {
      this.reviewedEvidence.update((values) => ({
        ...values,
        [scene.id]: [...new Set([...(values[scene.id] ?? []), evidenceId])],
      }));
      this.guidance.set('');
    }
  }

  isEvidenceOpen(evidenceId: string): boolean {
    const scene = this.scene();
    return !!scene && (this.expandedEvidence()[scene.id] ?? []).includes(evidenceId);
  }

  isEvidenceReviewed(evidenceId: string): boolean {
    const scene = this.scene();
    return !!scene && (this.reviewedEvidence()[scene.id] ?? []).includes(evidenceId);
  }

  evidencePanelId(evidenceId: string): string {
    return `${this.activity().id}-${this.scene()?.id}-evidence-${evidenceId}`;
  }

  toggleNarration(): void {
    if (this.isSpeaking()) {
      this.stopNarration();
      return;
    }
    if (!this.narrationAvailable) {
      this.audioMessage.set(
        'Tu navegador no ofrece lectura en voz alta. Puedes leer toda la historia en pantalla.',
      );
      return;
    }
    this.stopNarration();
    this.audioMessage.set('');
    const utterance = new SpeechSynthesisUtterance(this.narrationText());
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((item) => /^es[-_]MX$/i.test(item.lang)) ??
      voices.find((item) => /^es/i.test(item.lang));
    utterance.lang = voice?.lang ?? 'es-MX';
    if (voice) utterance.voice = voice;
    utterance.rate = 0.88;
    const token = this.audioToken;
    utterance.onend = () => {
      if (token === this.audioToken) this.isSpeaking.set(false);
    };
    utterance.onerror = (event) => {
      if (token !== this.audioToken) return;
      this.isSpeaking.set(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        this.audioMessage.set(
          'No se pudo iniciar la voz. Puedes intentarlo otra vez o seguir leyendo.',
        );
      }
    };
    this.isSpeaking.set(true);
    window.speechSynthesis.speak(utterance);
  }

  private narrationText(): string {
    const activity = this.activity();
    if (this.atCover()) return `${activity.title}. ${activity.intro}`;
    if (this.atEnding())
      return `${activity.ending.title}. ${activity.ending.message} ${activity.ending.rule}`;
    const scene = this.scene();
    if (!scene) return '';
    const selected = this.selectedChoice();
    if (selected)
      return `${selected.feedback} ${selected.correct ? scene.takeaway : 'Puedes volver a elegir.'}`;
    const evidence = (scene.evidence ?? [])
      .filter((item) => this.isEvidenceOpen(item.id))
      .map((item) => `${item.label}. ${item.text}`);
    return [
      scene.title,
      ...scene.paragraphs,
      ...evidence,
      scene.prompt,
      ...scene.choices.map((item) => item.label),
    ].join('. ');
  }

  stopNarration(): void {
    this.audioToken += 1;
    if (this.narrationAvailable) window.speechSynthesis.cancel();
    this.isSpeaking.set(false);
  }

  close(): void {
    this.stopNarration();
    this.closeRequested.emit();
  }

  private navigate(page: number): void {
    this.stopNarration();
    this.guidance.set('');
    this.audioMessage.set('');
    this.page.set(page);
    this.focusNewPage();
  }

  private focusNewPage(): void {
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      this.readingPage()?.nativeElement.scrollTo?.({ top: 0 });
      this.bookSpread()?.nativeElement.scrollTo?.({ top: 0 });
      this.heading()?.nativeElement.focus({ preventScroll: true });
    }, 0);
  }

  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
    this.stopNarration();
  }
}
