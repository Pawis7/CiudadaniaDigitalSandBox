import { ChangeDetectionStrategy, Component, effect, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryEndingComponent } from '../story-ending/story-ending';
import { FOTO_OTRA_VEZ_NARRATIONS, NarrationSegment } from '../../core/data/bit-foto-otra-vez.data';

@Component({
  selector: 'app-bit-foto-otra-vez',
  standalone: true,
  imports: [CommonModule, StoryEndingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bit-foto-otra-vez.html',
  styleUrl: './bit-foto-otra-vez.css',
})
export class BitFotoOtraVezComponent implements OnDestroy {
  readonly narrations = FOTO_OTRA_VEZ_NARRATIONS;

  // 0: Portada, 1: El hallazgo, 2: El tropiezo, 3: La reacción, 4: Decisión, 5: Cierre historia, 6: Fin
  readonly cur = signal<number>(0);
  readonly turnDirection = signal<'next' | 'prev'>('next');
  readonly voiceOn = signal<boolean>(true);
  readonly isSpeaking = signal<boolean>(false);
  readonly showFeedback = signal<boolean>(false);

  private preferredVoice: SpeechSynthesisVoice | null = null;
  private narrationToken = 0;
  private timers: any[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }

    effect(() => {
      const pageIndex = this.cur();
      const feedback = this.showFeedback();

      if (typeof window !== 'undefined') {
        this.stopAudio();
        this.later(() => {
          if (feedback) {
            this.speakFeedback();
          } else {
            this.speakCurrentPage(false);
          }
        }, 220);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }

  private loadVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    const spanish = voices.filter(
      (v) => /^es[-_]/i.test(v.lang) || /español|spanish|mexico|latino/i.test(v.name),
    );
    const preferred = [
      'Google español de México',
      'Google español latinoamericano',
      'Microsoft Dalia',
      'Microsoft Sabina',
      'Paulina',
      'Mónica',
      'Monica',
      'Luciana',
      'Google español',
    ];
    this.preferredVoice =
      preferred
        .map((name) => spanish.find((v) => v.name.toLowerCase().includes(name.toLowerCase())))
        .find(Boolean) ||
      spanish.find((v) => /MX|419|US/i.test(v.lang)) ||
      spanish[0] ||
      voices[0];
  }

  private clean(t: string): string {
    return String(t || '')
      .replace(/[🤖🐦📸✨🛑⚠️⭐✓✕🐾🎨💬🛡️«»—]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private stopAudio(): void {
    this.narrationToken++;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking.set(false);
    this.clearTimers();
  }

  private clearTimers(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  private later(fn: () => void, ms: number): any {
    const id = setTimeout(() => {
      this.timers = this.timers.filter((x) => x !== id);
      fn();
    }, ms);
    this.timers.push(id);
    return id;
  }

  private utter(text: string, rate: number = 0.8, pitch: number = 1.08): SpeechSynthesisUtterance {
    const u = new SpeechSynthesisUtterance(this.clean(text));
    u.lang = (this.preferredVoice && this.preferredVoice.lang) || 'es-MX';
    if (this.preferredVoice) {
      u.voice = this.preferredVoice;
    }
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    return u;
  }

  private speakSegments(
    segs: NarrationSegment[],
    force: boolean = false,
    onDone: (() => void) | null = null,
  ): void {
    if (!this.voiceOn() && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.loadVoices();
    this.stopAudio();
    const token = this.narrationToken;
    let i = 0;

    this.isSpeaking.set(true);

    const next = () => {
      if (token !== this.narrationToken) return;
      if (i >= segs.length) {
        this.isSpeaking.set(false);
        if (onDone) onDone();
        return;
      }
      const s = segs[i++];
      const u = this.utter(s.text, s.rate ?? 0.8, s.pitch ?? 1.08);
      let ended = false;
      const finish = () => {
        if (ended) return;
        ended = true;
        if (token !== this.narrationToken) return;
        this.later(next, s.pause ?? 500);
      };
      u.onend = finish;
      u.onerror = finish;
      window.speechSynthesis.speak(u);
    };
    next();
  }

  speakCurrentPage(force: boolean = false): void {
    const segs = this.narrations[this.cur()] || this.narrations[0];
    this.speakSegments(segs, force);
  }

  speakFeedback(): void {
    const segs = this.narrations['feedback'] || [];
    this.speakSegments(segs, true);
  }

  toggleVoice(): void {
    const nextVal = !this.voiceOn();
    this.voiceOn.set(nextVal);
    this.stopAudio();
    if (nextVal) {
      this.later(() => this.speakCurrentPage(true), 150);
    }
  }

  triggerCameraClick(): void {
    this.playShutterSound();
    this.later(() => {
      this.turnDirection.set('next');
      this.cur.set(2);
    }, 280);
  }

  private playShutterSound(): void {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(550, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 0.12);
      gain2.gain.setValueAtTime(0.35, now + 0.04);
      gain2.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.12);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 300);
    } catch {}
  }

  chooseOption(isCorrect: boolean): void {
    if (isCorrect) {
      this.turnDirection.set('next');
      this.showFeedback.set(false);
      this.cur.set(5);
    } else {
      this.showFeedback.set(true);
    }
  }

  retryDecision(): void {
    this.showFeedback.set(false);
    this.cur.set(4);
  }

  startBook(): void {
    this.turnDirection.set('next');
    this.cur.set(1);
  }

  prevPage(): void {
    this.showFeedback.set(false);
    if (this.cur() > 0) {
      this.turnDirection.set('prev');
      this.cur.update((c) => c - 1);
    }
  }

  nextPage(): void {
    this.showFeedback.set(false);
    if (this.cur() < 6) {
      this.turnDirection.set('next');
      this.cur.update((c) => c + 1);
    } else {
      this.closeBook();
    }
  }

  goToPage(index: number): void {
    this.showFeedback.set(false);
    if (index === this.cur()) return;
    this.turnDirection.set(index > this.cur() ? 'next' : 'prev');
    this.cur.set(index);
  }

  closeBook(): void {
    this.stopAudio();
    if (typeof document !== 'undefined') {
      const closeBtn = document.querySelector('.widget-modal-overlay button[aria-label="Cerrar"]');
      if (closeBtn) {
        (closeBtn as HTMLElement).click();
      }
    }
  }
}
