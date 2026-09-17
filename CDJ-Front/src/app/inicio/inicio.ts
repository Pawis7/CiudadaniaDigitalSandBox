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
    profilesTitle: 'Contenido para cada perfil',
    profilesGuide: 'Elige el perfil que mejor te represente para encontrar contenidos, actividades y orientaciones pensadas para cada etapa y necesidad.',
  };
}
