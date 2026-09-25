import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BIT_HOJAS_BOOK,
  BIT_PLAN_CASA_BOOK,
  BIT_ROTONDA_BOOK,
} from '../../core/data/bit-audiobooks.data';
import { IllustratedAudiobookComponent } from '../illustrated-audiobook/illustrated-audiobook';

@Component({
  selector: 'app-bit-hojas-story',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitHojasStoryComponent {
  readonly book = BIT_HOJAS_BOOK;
}

@Component({
  selector: 'app-bit-plan-casa-story',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitPlanCasaStoryComponent {
  readonly book = BIT_PLAN_CASA_BOOK;
}

@Component({
  selector: 'app-bit-rotonda-story',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitRotondaStoryComponent {
  readonly book = BIT_ROTONDA_BOOK;
}
