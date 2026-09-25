import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BitEmotion } from '../../core/data/reconozco-emociones.data';

export type BitPose = 'idle' | 'saludo' | 'escena' | 'celebracion';

@Component({
  selector: 'app-bit-character',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bit-character.html',
  styleUrl: './bit-character.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class BitCharacterComponent {
  readonly emotion = input<BitEmotion>('calma');
  readonly pose = input<BitPose>('idle');
}
