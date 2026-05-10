import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { EditableImageComponent } from '../shared/editable-image/editable-image';
import { AudIllustrationComponent } from '../shared/aud-illustration/aud-illustration';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, EditableImageComponent, AudIllustrationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {
  private content = inject(ContentService);

  hero = this.content.hero;
  categories = this.content.categories;
  featureCards = this.content.featureCards;
  pillars = this.content.pillars;
  secondaryBanner = this.content.secondaryBanner;
  videoSeries = this.content.videoSeries;

  stats = [
    { value: '120+', label: 'Recursos publicados' },
    { value: '8', label: 'Series animadas' },
    { value: '4', label: 'Audiencias' },
  ];
}
