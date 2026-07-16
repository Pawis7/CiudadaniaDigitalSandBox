import { ChangeDetectionStrategy, Component, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NATURAL_NARRATIONS, NarrationSegment } from '../../core/data/bit-data-mensaje-gris.data';

@Component({
  selector: 'app-bit-data-mensaje-gris',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bit-data-mensaje-gris.html',
  styleUrl: './bit-data-mensaje-gris.css',
})
export class BitDataMensajeGrisComponent implements OnDestroy {
  readonly narrations = NATURAL_NARRATIONS;

  readonly cur = signal<number>(0);
  readonly voiceOn = signal<boolean>(true);
  readonly readAllMode = signal<boolean>(false);
  readonly isSpeaking = signal<boolean>(false);

  private preferredVoice: SpeechSynthesisVoice | null = null;
  private narrationToken = 0;
  private autoAdvance = true;
  private timers: any[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }

    // Effect to handle automatic narration trigger on page change
    effect(() => {
      // Register reactivity dependency on current page index
      const curIndex = this.cur();
      
      if (typeof window !== 'undefined') {
        this.stopAudio();
        this.later(() => this.speakCurrentPage(false, true), 250);
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
    
    // Prioritize natural Spanish voices (MX, Latino, ES)
    const spanish = voices.filter(v => /^es[-_]/i.test(v.lang) || /español|spanish|mexico|latino/i.test(v.name));
    const preferred = [
      "Google español de México",
      "Google español latinoamericano",
      "Microsoft Dalia",
      "Microsoft Sabina",
      "Paulina",
      "Mónica",
      "Monica",
      "Luciana",
      "Google español"
    ];
    this.preferredVoice = preferred.map(name => spanish.find(v => v.name.toLowerCase().includes(name.toLowerCase()))).find(Boolean)
      || spanish.find(v => /MX|419|US/i.test(v.lang))
      || spanish[0] 
      || voices[0];
  }

  private clean(t: string): string {
    // Strip emojis for SpeechSynthesis reading
    return String(t || "").replace(/[🤖🐦☁️👧⭐💗💔⚠️✓✕🐾✨🎨💬🛡️]/g, "").replace(/\s+/g, " ").trim();
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
      this.timers = this.timers.filter(x => x !== id);
      fn();
    }, ms);
    this.timers.push(id);
    return id;
  }

  private utter(text: string, rate: number = 0.82, pitch: number = 1.08): SpeechSynthesisUtterance {
    const u = new SpeechSynthesisUtterance(this.clean(text));
    u.lang = (this.preferredVoice && this.preferredVoice.lang) || "es-MX";
    if (this.preferredVoice) {
      u.voice = this.preferredVoice;
    }
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    return u;
  }

  private speakSegments(segs: NarrationSegment[], force: boolean = false, onDone: (() => void) | null = null): void {
    if (!this.voiceOn() && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
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
      const u = this.utter(s.text, s.rate ?? 0.82, s.pitch ?? 1.08);
      let ended = false;
      const finish = () => {
        if (ended) return;
        ended = true;
        if (token !== this.narrationToken) return;
        this.later(next, s.pause ?? 520);
      };
      u.onend = finish;
      u.onerror = finish;
      window.speechSynthesis.speak(u);
    };
    next();
  }

  private pageSegments(): NarrationSegment[] {
    return this.narrations[this.cur()] || this.narrations[0];
  }

  private autoNextAfterNarration(): void {
    if (!this.autoAdvance || !this.voiceOn() || !this.readAllMode()) return;
    if (this.cur() < this.narrations.length - 1) {
      this.cur.update(c => c + 1);
    } else {
      this.readAllMode.set(false);
    }
  }

  speakCurrentPage(force: boolean = false, shouldAdvance: boolean = true): void {
    this.speakSegments(this.pageSegments(), force, () => {
      if (shouldAdvance && this.readAllMode()) {
        this.later(() => this.autoNextAfterNarration(), 900);
      }
    });
  }

  toggleVoice(): void {
    const nextVal = !this.voiceOn();
    this.voiceOn.set(nextVal);
    if (!nextVal) {
      this.readAllMode.set(false);
      this.stopAudio();
    } else {
      this.speakCurrentPage(true, false);
    }
  }

  startBook(): void {
    this.readAllMode.set(true);
    this.cur.set(1);
  }

  prevPage(): void {
    this.readAllMode.set(false);
    if (this.cur() > 0) {
      this.cur.update(c => c - 1);
    }
  }

  nextPage(): void {
    this.readAllMode.set(false);
    if (this.cur() < this.narrations.length - 1) {
      this.cur.update(c => c + 1);
    } else {
      this.closeBook();
    }
  }

  readPageManual(): void {
    this.readAllMode.set(false);
    this.speakCurrentPage(true, false);
  }

  readAllBook(): void {
    this.readAllMode.set(true);
    this.cur.set(1);
  }

  goToPage(index: number): void {
    this.readAllMode.set(false);
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
