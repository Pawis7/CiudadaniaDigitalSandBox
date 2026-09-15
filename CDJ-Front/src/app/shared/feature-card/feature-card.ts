import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeatureCard } from '../../core/models/content.models';
import { EditableImageComponent } from '../editable-image/editable-image';
import { RevealDirective } from '../scroll-reveal/scroll-reveal.directive';

/**
 * Tarjeta de contenido destacado — reutilizable en cualquier página.
 *
 * La administración de esta tarjeta se realiza de forma centralizada en el selector de destacados.
 *
 * Uso:
 *   <app-feature-card [card]="myCard" [delay]="80" />
 */
@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, RouterLink, EditableImageComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-card.html',
})
export class FeatureCardComponent {
  @Input({ required: true }) card!: FeatureCard;
  @Input() delay = 0;
  @Input() showDescription = true;
  @Input() disableReveal = false;
  @Input() showIcon = true;
}

