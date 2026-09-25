import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MemoramaCard {
  uid: number;
  id: number;
  pairId: number;
  frontImgUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memorama-game',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memorama-game.html',
  styleUrl: './memorama-game.css'
})
export class MemoramaGameComponent implements OnInit, OnDestroy {
  readonly cards = signal<MemoramaCard[]>([]);
  readonly attempts = signal<number>(0);
  readonly matchedPairs = signal<number>(0);
  readonly isWon = signal<boolean>(false);
  readonly soundEnabled = signal<boolean>(true);

  private firstSelectedCard: MemoramaCard | null = null;
  private isProcessing = false;
  private audioCtx: AudioContext | null = null;

  readonly backImgUrl = '/Cibernautas/caratula.webp';

  ngOnInit(): void {
    this.restartGame();
  }

  ngOnDestroy(): void {
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
    }
  }

  toggleSound(): void {
    this.soundEnabled.update(v => !v);
  }

  restartGame(): void {
    this.firstSelectedCard = null;
    this.isProcessing = false;
    this.attempts.set(0);
    this.matchedPairs.set(0);
    this.isWon.set(false);

    // Build the 20 cards (pairs go in 2s: 1&2, 3&4, 5&6, etc.)
    const newCards: MemoramaCard[] = [];
    for (let i = 1; i <= 20; i++) {
      const pad = String(i).padStart(2, '0');
      newCards.push({
        uid: i,
        id: i,
        pairId: Math.ceil(i / 2),
        frontImgUrl: `/Cibernautas/memorama-${pad}.webp`,
        isFlipped: false,
        isMatched: false
      });
    }

    // Shuffle cards with Fisher-Yates
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    this.cards.set(newCards);
  }

  onCardClick(card: MemoramaCard): void {
    if (this.isProcessing || card.isFlipped || card.isMatched) {
      return;
    }

    // Voltear la carta
    card.isFlipped = true;
    this.playFlipSound();

    if (!this.firstSelectedCard) {
      // Primera carta del intento
      this.firstSelectedCard = card;
      this.cards.update(c => [...c]);
      return;
    }

    // Segunda carta del intento
    this.attempts.update(a => a + 1);
    const first = this.firstSelectedCard;
    this.firstSelectedCard = null;
    this.cards.update(c => [...c]);

    if (first.pairId === card.pairId) {
      // ¡Par encontrado!
      first.isMatched = true;
      card.isMatched = true;
      this.matchedPairs.update(m => m + 1);
      this.playMatchSound();
      this.cards.update(c => [...c]);

      if (this.matchedPairs() === 10) {
        setTimeout(() => {
          this.isWon.set(true);
          this.playVictorySound();
        }, 500);
      }
    } else {
      // No coincide: se ocultan tras una breve pausa
      this.isProcessing = true;
      this.playMismatchSound();
      setTimeout(() => {
        first.isFlipped = false;
        card.isFlipped = false;
        this.isProcessing = false;
        this.cards.update(c => [...c]);
      }, 950);
    }
  }

  // ================= Web Audio Synth Effects =================
  private initAudio(): void {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {}
  }

  private playTone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.12): void {
    if (!this.soundEnabled()) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
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

  private playFlipSound(): void {
    this.playTone(440, 0.08, 'triangle', 0.08);
  }

  private playMatchSound(): void {
    this.playTone(523.25, 0.12, 'sine', 0.15); // C5
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.15), 90); // E5
    setTimeout(() => this.playTone(783.99, 0.22, 'sine', 0.18), 180); // G5
  }

  private playMismatchSound(): void {
    this.playTone(330, 0.12, 'sawtooth', 0.06);
    setTimeout(() => this.playTone(260, 0.16, 'sawtooth', 0.06), 110);
  }

  private playVictorySound(): void {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.28, 'triangle', 0.18), idx * 110);
    });
  }
}
