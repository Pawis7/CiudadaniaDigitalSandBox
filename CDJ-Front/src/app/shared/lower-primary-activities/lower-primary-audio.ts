type AudioCue = 'pick' | 'success' | 'retry' | 'complete';

interface VoiceClip {
  src: string;
  text: string;
}

/** Existing ElevenLabs recordings, recovered from the project's own history. */
export const LOWER_PRIMARY_VOICE_CLIPS: Readonly<Record<string, VoiceClip>> = {
  success: { src: '/audio/primaria-baja/marlene-muy-bien.mp3', text: '¡Muy bien!' },
  retry: {
    src: '/audio/primaria-baja/marlene-intentalo-otra-vez.mp3',
    text: 'Inténtalo otra vez.',
  },
  help: {
    src: '/audio/primaria-baja/marlene-pide-ayuda.mp3',
    text: 'Pide ayuda a una persona adulta de confianza.',
  },
};

/**
 * One audio owner per board. Audio is optional and never advances game state.
 * Recorded feedback uses ElevenLabs; instructions, object labels and specific
 * explanations use the browser's Spanish speech voice. Nothing autoplays.
 */
export class LowerPrimaryAudio {
  private readonly storageKey = 'cdj.lower-primary.sound-muted';
  private soundMuted = false;
  private destroyed = false;
  private generation = 0;
  private media: HTMLAudioElement | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private context: AudioContext | null = null;
  private readonly oscillators = new Set<OscillatorNode>();
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();
  private readonly failedClips = new Set<string>();

  constructor() {
    try {
      this.soundMuted = typeof window !== 'undefined' && window.localStorage.getItem(this.storageKey) === 'true';
    } catch {
      // Private browsing may disallow storage; the in-memory setting still works.
    }
  }

  get muted(): boolean {
    return this.soundMuted;
  }

  toggleMute(): boolean {
    this.soundMuted = !this.soundMuted;
    this.stop();
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(this.storageKey, String(this.soundMuted));
      }
    } catch {
      // Storage must never block play.
    }
    return this.soundMuted;
  }

  /** Replaces previous narration. An absent recording falls back to Spanish TTS. */
  read(text: string, audioKey?: string): void {
    this.stop();
    if (!this.canPlay()) return;
    const clip = audioKey ? LOWER_PRIMARY_VOICE_CLIPS[audioKey] : undefined;
    const token = this.generation;
    if (clip) {
      this.playClip(clip, token, () => {
        if (text.trim() && text.trim() !== clip.text) this.speak(text, token);
      });
    } else {
      this.speak(text, token);
    }
  }

  /** A short recorded response, followed by the explanation for this exact move. */
  feedback(success: boolean, explanation: string): void {
    this.stop();
    if (!this.canPlay()) return;
    const token = this.generation;
    this.cue(success ? 'success' : 'retry');
    const clip = LOWER_PRIMARY_VOICE_CLIPS[success ? 'success' : 'retry'];
    // Start inside the child's gesture so Safari can authorize the media element.
    this.playClip(clip, token, () => this.speak(explanation, token));
  }

  /** Gentle, brief effects; optional Web Audio support is detected at runtime. */
  cue(kind: AudioCue): void {
    if (!this.canPlay() || typeof window === 'undefined') return;
    try {
      const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
      const AudioContextClass = window.AudioContext ?? audioWindow.webkitAudioContext;
      if (!AudioContextClass) return;
      this.context ??= new AudioContextClass();
      const context = this.context;
      const token = this.generation;
      const notes: Record<AudioCue, number[]> = {
        pick: [480], success: [560, 740], retry: [330, 300], complete: [520, 660, 790],
      };
      const play = () => {
        if (!this.isCurrent(token) || context.state !== 'running') return;
        notes[kind].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = context.currentTime + index * 0.075;
          oscillator.type = 'sine';
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.035, start + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
          oscillator.connect(gain);
          gain.connect(context.destination);
          this.oscillators.add(oscillator);
          oscillator.onended = () => {
            this.oscillators.delete(oscillator);
            oscillator.disconnect();
            gain.disconnect();
          };
          oscillator.start(start);
          oscillator.stop(start + 0.1);
        });
      };
      if (context.state === 'suspended') {
        void context.resume().then(play).catch(() => undefined);
      } else {
        play();
      }
    } catch {
      // A missing or locked audio device never prevents a child completing a move.
    }
  }

  /** Invalidates pending callbacks as well as stopping currently audible media. */
  stop(): void {
    this.generation += 1;
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    if (this.media) {
      const media = this.media;
      this.media = null;
      media.onended = null;
      media.onerror = null;
      try {
        media.pause();
        media.currentTime = 0;
      } catch {
        // An unloaded source may not allow seeking.
      }
    }
    if (this.utterance) {
      this.utterance.onend = null;
      this.utterance.onerror = null;
      this.utterance = null;
      try {
        if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
      } catch {
        // Speech synthesis is not implemented by every browser.
      }
    }
    this.oscillators.forEach((oscillator) => {
      try { oscillator.stop(); } catch { /* Already ended. */ }
    });
    this.oscillators.clear();
  }

  destroy(): void {
    this.stop();
    this.destroyed = true;
    if (this.context) {
      try { void this.context.close().catch(() => undefined); } catch { /* Already closed. */ }
      this.context = null;
    }
  }

  private canPlay(): boolean {
    return !this.destroyed && !this.soundMuted;
  }

  private isCurrent(token: number): boolean {
    return this.canPlay() && token === this.generation;
  }

  private later(callback: () => void, milliseconds: number, token: number): void {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      if (this.isCurrent(token)) callback();
    }, milliseconds);
    this.timers.add(timer);
  }

  private playClip(clip: VoiceClip, token: number, onDone: () => void): void {
    if (!this.isCurrent(token)) return;
    if (typeof Audio === 'undefined' || this.failedClips.has(clip.src)) {
      this.speak(clip.text, token, onDone);
      return;
    }
    let settled = false;
    let media: HTMLAudioElement;
    try {
      media = new Audio(clip.src);
    } catch {
      this.speak(clip.text, token, onDone);
      return;
    }
    this.media = media;
    media.preload = 'auto';
    media.volume = 0.85;
    const settle = (failed: boolean) => {
      if (settled) return;
      settled = true;
      media.onended = null;
      media.onerror = null;
      if (this.media === media) this.media = null;
      if (!this.isCurrent(token)) return;
      if (failed) {
        try { media.pause(); } catch { /* Failed media device. */ }
        this.failedClips.add(clip.src);
        this.speak(clip.text, token, onDone);
      } else {
        onDone();
      }
    };
    media.onended = () => settle(false);
    media.onerror = () => settle(true);
    this.later(() => settle(true), 12000, token);
    try {
      const playResult = media.play();
      if (playResult) void playResult.catch(() => settle(true));
    } catch {
      settle(true);
    }
  }

  private speak(text: string, token: number, onDone?: () => void): void {
    if (!this.isCurrent(token)) return;
    const narration = text.replace(/\s+/g, ' ').trim();
    if (!narration || typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      onDone?.();
      return;
    }
    try {
      const speech = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(narration);
      this.utterance = utterance;
      utterance.lang = 'es-MX';
      utterance.rate = 0.94;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      const voices = speech.getVoices();
      const voice = voices.find((candidate) => /^es[-_]MX$/i.test(candidate.lang))
        ?? voices.find((candidate) => /^es[-_]419$/i.test(candidate.lang))
        ?? voices.find((candidate) => /^es(?:[-_]|$)/i.test(candidate.lang));
      if (voice) utterance.voice = voice;
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (this.utterance === utterance) this.utterance = null;
        if (this.isCurrent(token)) onDone?.();
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      speech.speak(utterance);
    } catch {
      this.utterance = null;
      if (this.isCurrent(token)) onDone?.();
    }
  }
}
