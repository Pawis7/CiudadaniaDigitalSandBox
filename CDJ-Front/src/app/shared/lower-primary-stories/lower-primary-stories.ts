import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BIT_PUENTE_POR_TERMINAR_BOOK,
  BIT_VENTANA_INESPERADA_BOOK,
  BIT_BOTON_BRILLANTE_BOOK,
  BIT_CARTEL_CLASE_BOOK,
} from '../../core/data/lower-primary-books.data';
import { IllustratedAudiobookComponent } from '../illustrated-audiobook/illustrated-audiobook';

@Component({
  selector: 'app-bit-puente-por-terminar',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitPuentePorTerminarComponent {
  readonly book = BIT_PUENTE_POR_TERMINAR_BOOK;
}

@Component({
  selector: 'app-bit-ventana-inesperada',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitVentanaInesperadaComponent {
  readonly book = BIT_VENTANA_INESPERADA_BOOK;
}

@Component({
  selector: 'app-bit-boton-brillante',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitBotonBrillanteComponent {
  readonly book = BIT_BOTON_BRILLANTE_BOOK;
}

@Component({
  selector: 'app-bit-cartel-clase',
  standalone: true,
  imports: [IllustratedAudiobookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-audiobook [book]="book" />',
})
export class BitCartelClaseComponent {
  readonly book = BIT_CARTEL_CLASE_BOOK;
}
