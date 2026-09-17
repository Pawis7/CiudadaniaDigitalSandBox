import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-edutip-sample',
  standalone: true,
  templateUrl: './edutip-sample.html',
  styleUrl: './edutip-sample.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdutipSampleComponent {
  firstChoice = signal<string | null>(null);
  secondChoice = signal<string | null>(null);
  practiceChoice = signal<string | null>(null);

  chooseFirst(value: string): void {
    this.firstChoice.set(value);
  }

  chooseSecond(value: string): void {
    this.secondChoice.set(value);
  }

  choosePractice(value: string): void {
    this.practiceChoice.set(value);
  }
}
