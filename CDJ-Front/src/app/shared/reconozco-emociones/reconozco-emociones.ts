import { ChangeDetectionStrategy, Component, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RECONOZCO_EMOCIONES_DATA, EmotionScene } from '../../core/data/reconozco-emociones.data';

@Component({
  selector: 'app-reconozco-emociones',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reconozco-emociones.html',
  styleUrl: './reconozco-emociones.css',
})
export class ReconozcoEmocionesComponent implements OnDestroy {
  readonly gameData = RECONOZCO_EMOCIONES_DATA;
  readonly scenes = RECONOZCO_EMOCIONES_DATA.escenas;

  // Game States
  readonly currentScreen = signal<'welcome' | 'playing' | 'pedagogic-pause' | 'summary'>('welcome');
  readonly currentSceneIndex = signal<number>(0);
  readonly selectedOptionIndex = signal<number | null>(null);
  readonly isCorrect = signal<boolean | null>(null);
  readonly selectedIncorrectIndices = signal<number[]>([]);
  readonly audioOn = signal<boolean>(true);
  readonly isSpeaking = signal<boolean>(false);

  // Audio Context for sound effects
  private audioCtx: AudioContext | null = null;

  // Computeds
  readonly currentScene = computed<EmotionScene>(() => this.scenes[this.currentSceneIndex()]);

  readonly progressPercent = computed(() => {
    return Math.round((this.currentSceneIndex() / this.scenes.length) * 100);
  });

  // Map emotion to CSS class for Bit's avatar
  readonly emotionClass = computed(() => {
    const s = this.currentScene();
    if (!s) return 'bit-emotion-calma';
    const emo = s.emocion_objetivo.toLowerCase();

    if (emo.includes('alegría') || emo.includes('alegria') || emo.includes('alta')) return 'bit-emotion-alegria';
    if (emo.includes('susto') || emo.includes('miedo') || emo.includes('incomodidad')) return 'bit-emotion-susto';
    if (emo.includes('enojo') || emo.includes('frustración') || emo.includes('frustracion') || emo.includes('molestia')) return 'bit-emotion-enojo';
    if (emo.includes('tristeza') || emo.includes('triste')) return 'bit-emotion-tristeza';
    if (emo.includes('confusión') || emo.includes('confusion') || emo.includes('duda')) return 'bit-emotion-duda';
    if (emo.includes('cansancio') || emo.includes('cansado')) return 'bit-emotion-cansancio';
    if (emo.includes('calma') || emo.includes('autocontrol') || emo.includes('bienestar')) return 'bit-emotion-calma';
    return 'bit-emotion-calma';
  });

  constructor() {
    // Cancel speaking on screen or scene change to prevent overlapping audio
    effect(() => {
      this.currentScreen();
      this.currentSceneIndex();
      
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking.set(false);
    });
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Web Speech API Synthesis voice trigger
  speakText(text: string): void {
    if (!this.audioOn()) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select MX or ES voices if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.includes('es-MX')) || voices.find(v => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }
    
    utterance.lang = 'es-MX';
    utterance.rate = 0.85; // slower speech for preschoolers
    utterance.pitch = 1.1; // slightly higher pitch to feel friendly
    
    utterance.onstart = () => this.isSpeaking.set(true);
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);

    window.speechSynthesis.speak(utterance);
  }

  // Web Audio Synth sounds
  private initAudio(): void {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {}
  }

  private playTone(freq: number, dur: number = 0.15, type: OscillatorType = 'sine', vol: number = 0.15): void {
    if (!this.audioOn()) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + dur);
      osc.start();
      osc.stop(this.audioCtx.currentTime + dur);
    } catch (e) {}
  }

  playSuccess(): void {
    this.playTone(523.25, 0.1, 'sine', 0.15); // C5
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.15), 80); // E5
  }

  playFailure(): void {
    this.playTone(293.66, 0.25, 'triangle', 0.15); // D4
  }

  playWelcome(): void {
    this.playTone(392.00, 0.1, 'sine', 0.15); // G4
    setTimeout(() => this.playTone(523.25, 0.1, 'sine', 0.15), 70); // C5
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.15), 140); // E5
  }

  toggleAudio(): void {
    this.audioOn.set(!this.audioOn());
    if (this.audioOn()) {
      this.playSuccess();
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking.set(false);
    }
  }

  startGame(): void {
    this.playWelcome();
    this.currentSceneIndex.set(0);
    this.selectedOptionIndex.set(null);
    this.isCorrect.set(null);
    this.selectedIncorrectIndices.set([]);
    this.currentScreen.set('playing');
  }

  repeatAudio(): void {
    const screen = this.currentScreen();
    if (screen === 'welcome') {
      this.speakText("¡Hola! Soy Data. Vamos a descubrir cómo se siente Bit cuando usa una pantalla. ¿Me acompañas?");
    } else if (screen === 'pedagogic-pause') {
      this.speakText("¡Es momento de hacer una pausa! Cierra tus ojitos un momento, respira despacio y mueve tus hombros. Cuando estés listo, seguimos jugando.");
    } else if (screen === 'summary') {
      this.speakText("¡Felicidades! Lograste ayudar a Bit.");
    } else {
      const s = this.currentScene();
      if (s) {
        this.speakText(s.voz_situacion + " " + s.voz_reto);
      }
    }
  }

  // Parse option components
  getOptionEmoji(option: string): string {
    const firstChar = option.trim().split(' ')[0];
    return firstChar;
  }

  getOptionText(option: string): string {
    const parts = option.trim().split(' ');
    parts.shift();
    return parts.join(' ');
  }

  selectOption(optIdx: number): void {
    if (this.isCorrect() === true) return; // Prevent selection after success

    const s = this.currentScene();
    this.selectedOptionIndex.set(optIdx);

    if (optIdx === s.correct) {
      this.isCorrect.set(true);
      this.playSuccess();
      this.speakText(s.feedback_positivo + " " + s.refuerzo);
    } else {
      this.isCorrect.set(false);
      this.playFailure();
      this.speakText(s.feedback_reintento);
      
      // Add to incorrect list if not already there
      if (!this.selectedIncorrectIndices().includes(optIdx)) {
        this.selectedIncorrectIndices.set([...this.selectedIncorrectIndices(), optIdx]);
      }
    }
  }

  next(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking.set(false);

    const currentIndex = this.currentSceneIndex();
    
    // Check if we need to display the pedagogic pause (after scene 6, index 5)
    if (currentIndex === 5 && this.currentScreen() === 'playing') {
      this.currentScreen.set('pedagogic-pause');
      return;
    }

    this.advanceNextScene();
  }

  resumeAfterPause(): void {
    this.currentScreen.set('playing');
    this.advanceNextScene();
  }

  private advanceNextScene(): void {
    const nextIdx = this.currentSceneIndex() + 1;
    if (nextIdx < this.scenes.length) {
      this.currentSceneIndex.set(nextIdx);
      this.selectedOptionIndex.set(null);
      this.isCorrect.set(null);
      this.selectedIncorrectIndices.set([]);
    } else {
      this.currentScreen.set('summary');
    }
  }

  restart(): void {
    this.startGame();
  }
}
