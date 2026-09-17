import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type DecisionSheet = 'before' | 'after' | null;

@Component({
  selector: 'app-edutip-sample',
  standalone: true,
  templateUrl: './edutip-sample.html',
  styleUrl: './edutip-sample.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdutipSampleComponent {
  activeSheet = signal<DecisionSheet>(null);
  firstChoice = signal<string | null>(null);
  secondChoice = signal<string | null>(null);
  practiceChoice = signal<string | null>(null);

  openDecision(sheet: Exclude<DecisionSheet, null>): void {
    this.activeSheet.set(sheet);
  }

  closeDecision(): void {
    this.activeSheet.set(null);
  }

  chooseFirst(value: string): void {
    this.firstChoice.set(value);
  }

  chooseSecond(value: string): void {
    this.secondChoice.set(value);
  }

  continueFromFirst(): void {
    this.closeDecision();
    setTimeout(() => document.getElementById('video-edutip')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  continueFromSecond(): void {
    this.closeDecision();
    setTimeout(() => document.getElementById('ideas-clave')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  choosePractice(value: string): void {
    this.practiceChoice.set(value);
  }
}
