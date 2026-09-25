import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryEndingComponent } from '../story-ending/story-ending';
import {
  AudiobookNarrationSegment,
  IllustratedAudiobookConfig,
} from './illustrated-audiobook.models';

type NarrationState = 'idle' | 'loading' | 'playing' | 'paused' | 'unavailable';

@Component({
  selector: 'app-illustrated-audiobook',
  standalone: true,
  imports: [CommonModule, StoryEndingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './illustrated-audiobook.html',
  styleUrl: './illustrated-audiobook.css',
})
export class IllustratedAudiobookComponent implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly book = input.required<IllustratedAudiobookConfig>();
  readonly closeRequested = output<void>();

  @ViewChild('audioPlayer') private audioPlayer?: ElementRef<HTMLAudioElement>;

  readonly currentIndex = signal(0);
  readonly direction = signal<'next' | 'previous'>('next');
  readonly narrationState = signal<NarrationState>('idle');
  readonly continuousMode = signal(false);
  readonly usingBrowserVoice = signal(false);
  readonly announcement = signal('Narración detenida.');

  readonly atEnding = computed(() => this.currentIndex() === this.book().spreads.length);
  readonly currentSpread = computed(() => this.book().spreads[this.currentIndex()] ?? null);
  readonly totalSteps = computed(() => this.book().spreads.length + 1);
  readonly stepIndexes = computed(() =>
    Array.from({ length: this.totalSteps() }, (_, index) => index),
  );
  readonly currentAudioSrc = computed(() => this.currentSpread()?.narration.audioSrc ?? null);
  readonly currentDuration = computed(() => this.currentSpread()?.narration.durationLabel ?? null);
  readonly currentLabel = computed(() => {
    if (this.atEnding()) return 'Fin';
    return this.currentSpread()?.pageLabel ?? '';
  });
  readonly playLabel = computed(() => {
    if (this.narrationState() === 'playing' || this.narrationState() === 'loading') {
      return 'Pausar narración';
    }
    if (this.narrationState() === 'paused') return 'Continuar narración';
    return 'Escuchar esta página';
  });

  private preferredVoice: SpeechSynthesisVoice | null = null;
  private narrationToken = 0;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.addEventListener('voiceschanged', this.handleVoicesChanged);
    }
  }

  ngOnDestroy(): void {
    this.stopNarration();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.removeEventListener('voiceschanged', this.handleVoicesChanged);
    }
  }

  toggleCurrentNarration(): void {
    if (this.book().readingOnly) return;
    const state = this.narrationState();
    if (state === 'playing' || state === 'loading') {
      this.pauseNarration();
      return;
    }
    if (state === 'paused') {
      this.resumeNarration();
      return;
    }
    this.continuousMode.set(false);
    this.playCurrentNarration();
  }

  listenContinuously(): void {
    if (this.book().readingOnly) return;
    this.stopNarration(false);
    const restartFromBeginning = this.currentIndex() !== 0;
    if (restartFromBeginning) {
      this.direction.set('previous');
      this.currentIndex.set(0);
    }
    this.continuousMode.set(true);
    if (restartFromBeginning) {
      this.later(() => this.playCurrentNarration(), 0);
    } else {
      this.playCurrentNarration();
    }
  }

  previous(): void {
    if (this.currentIndex() === 0) return;
    this.navigateTo(this.currentIndex() - 1);
  }

  next(): void {
    if (this.atEnding()) {
      this.closeBook();
      return;
    }
    this.navigateTo(this.currentIndex() + 1);
  }

  goTo(index: number): void {
    if (index === this.currentIndex() || index < 0 || index >= this.totalSteps()) return;
    this.navigateTo(index);
  }

  restart(): void {
    this.navigateTo(0);
  }

  closeBook(): void {
    this.stopNarration();
    this.closeRequested.emit();

    if (typeof document === 'undefined') return;
    const closeEvent = new CustomEvent('audiobook-close-requested', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.host.nativeElement.dispatchEvent(closeEvent);

    if (closeEvent.defaultPrevented) return;

    // Compatibility with the portal's current dynamic-widget host. Once the host listens to the
    // bubbling event above, this fallback can be removed without touching story components.
    const closeButton = document.querySelector<HTMLElement>(
      '.widget-modal-overlay button[aria-label="Cerrar"]',
    );
    closeButton?.click();
  }

  handleRecordedPlay(): void {
    if (!this.usingBrowserVoice()) {
      this.narrationState.set('playing');
      this.announcement.set(`Reproduciendo ${this.currentLabel()}.`);
    }
  }

  handleRecordedPause(): void {
    if (!this.usingBrowserVoice() && this.narrationState() === 'playing') {
      this.narrationState.set('paused');
      this.announcement.set('Narración en pausa.');
    }
  }

  handleRecordedEnded(): void {
    if (this.usingBrowserVoice()) return;
    this.finishNarration();
  }

  handleRecordedError(): void {
    if (
      this.usingBrowserVoice() ||
      this.narrationState() === 'idle' ||
      this.narrationState() === 'paused'
    )
      return;
    const token = this.narrationToken;
    this.playBrowserVoiceFallback(token);
  }

  private navigateTo(index: number): void {
    this.direction.set(index > this.currentIndex() ? 'next' : 'previous');
    this.stopNarration();
    this.currentIndex.set(index);
    this.announcement.set(
      index === this.book().spreads.length ? 'Fin del cuento.' : this.currentLabel(),
    );
  }

  private playCurrentNarration(): void {
    if (this.book().readingOnly) return;
    const spread = this.currentSpread();
    if (!spread) return;

    this.stopNarration(false);
    const token = this.narrationToken;
    const recordedAudio = spread.narration.audioSrc;

    if (!recordedAudio) {
      this.playBrowserVoiceFallback(token);
      return;
    }

    const player = this.audioPlayer?.nativeElement;
    if (!player) {
      this.playBrowserVoiceFallback(token);
      return;
    }

    this.usingBrowserVoice.set(false);
    this.narrationState.set('loading');
    this.announcement.set(`Cargando narración de ${spread.pageLabel}.`);
    player.currentTime = 0;
    player.play().catch((error: unknown) => {
      if (token !== this.narrationToken || this.narrationState() === 'paused') return;
      if ((error as { name?: string } | null)?.name === 'AbortError') return;
      this.playBrowserVoiceFallback(token);
    });
  }

  private pauseNarration(): void {
    if (this.usingBrowserVoice()) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    } else {
      const player = this.audioPlayer?.nativeElement;
      if (player && !player.paused) player.pause();
    }
    this.narrationState.set('paused');
    this.announcement.set('Narración en pausa.');
  }

  private resumeNarration(): void {
    if (this.usingBrowserVoice()) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
        this.narrationState.set('playing');
        this.announcement.set(`Reproduciendo ${this.currentLabel()} con la voz del dispositivo.`);
      }
      return;
    }

    this.audioPlayer?.nativeElement.play().catch(() => {
      this.playBrowserVoiceFallback(this.narrationToken);
    });
  }

  private stopNarration(disableContinuous = true): void {
    this.narrationToken += 1;
    this.clearTimers();
    if (disableContinuous) this.continuousMode.set(false);

    const player = this.audioPlayer?.nativeElement;
    if (player) {
      if (!player.paused) player.pause();
      player.currentTime = 0;
    }
    if (!this.book().readingOnly && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    this.usingBrowserVoice.set(false);
    this.narrationState.set('idle');
  }

  private playBrowserVoiceFallback(token: number): void {
    if (this.book().readingOnly) return;
    const segments = this.currentSpread()?.narration.fallbackSegments ?? [];
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !segments.length) {
      this.narrationState.set('unavailable');
      this.announcement.set('La narración no está disponible. La historia permanece visible.');
      return;
    }

    const player = this.audioPlayer?.nativeElement;
    if (player) {
      if (!player.paused) player.pause();
      player.currentTime = 0;
    }

    this.loadVoices();
    window.speechSynthesis.cancel();
    this.usingBrowserVoice.set(true);
    this.narrationState.set('playing');
    this.announcement.set(`Usando la voz del dispositivo para ${this.currentLabel()}.`);
    let index = 0;

    const speakNext = () => {
      if (token !== this.narrationToken) return;
      if (index >= segments.length) {
        this.finishNarration();
        return;
      }

      const segment = segments[index++];
      const utterance = this.createUtterance(segment);
      let finished = false;
      const finishSegment = () => {
        if (finished || token !== this.narrationToken) return;
        finished = true;
        this.later(speakNext, segment.pauseMs ?? 420);
      };
      utterance.onend = finishSegment;
      utterance.onerror = finishSegment;
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }

  private finishNarration(): void {
    this.narrationState.set('idle');
    this.usingBrowserVoice.set(false);
    this.announcement.set(`Terminó la narración de ${this.currentLabel()}.`);

    if (!this.continuousMode()) return;
    if (this.currentIndex() < this.book().spreads.length - 1) {
      this.direction.set('next');
      this.currentIndex.update((index) => index + 1);
      this.later(() => this.playCurrentNarration(), 350);
      return;
    }

    this.continuousMode.set(false);
    this.currentIndex.set(this.book().spreads.length);
    this.announcement.set('Terminó el cuento.');
  }

  private createUtterance(segment: AudiobookNarrationSegment): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(this.cleanForSpeech(segment.text));
    utterance.lang = this.preferredVoice?.lang ?? 'es-MX';
    if (this.preferredVoice) utterance.voice = this.preferredVoice;
    utterance.rate = segment.rate ?? 0.82;
    utterance.pitch = segment.pitch ?? 1.04;
    utterance.volume = 1;
    return utterance;
  }

  private readonly handleVoicesChanged = (): void => this.loadVoices();

  private loadVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const spanishVoices = voices.filter(
      (voice) => /^es[-_]/i.test(voice.lang) || /español|spanish|mexico|latino/i.test(voice.name),
    );
    this.preferredVoice =
      spanishVoices.find((voice) => /MX|419/i.test(voice.lang)) ??
      spanishVoices[0] ??
      voices[0] ??
      null;
  }

  private cleanForSpeech(text: string): string {
    return text.replace(/[«»]/g, '').replace(/\s+/g, ' ').trim();
  }

  private later(callback: () => void, delayMs: number): void {
    const timer = setTimeout(() => {
      this.timers = this.timers.filter((item) => item !== timer);
      callback();
    }, delayMs);
    this.timers.push(timer);
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];
  }
}
