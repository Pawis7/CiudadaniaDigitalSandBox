import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RevealDirective, FeatureCardComponent, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {
  private content = inject(ContentService);

  categories = this.content.categories;
  profileCards = computed(() => this.categories().map((cat) => this.content.categoryAsCard(cat)));
  featureCards = this.content.homeFeatureCards;

  editorial = {
    featuredResourcesTitle: 'Para comenzar',
    profilesTitle: 'Cada etapa vive lo digital de manera diferente',
    profilesGuide: 'Aprender a cuidarnos, convivir, informarnos, crear y participar en entornos digitales cambia con la edad y con el papel que tenemos. Explora la ciudadanía digital desde la infancia y la adolescencia, o desde el acompañamiento de las familias y la escuela.',
  };
}
