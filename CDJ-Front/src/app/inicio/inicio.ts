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
    featuredResourcesTitle: 'Recursos destacados',
    profilesTitle: 'Contenido por perfil',
    profilesGuide: 'Al elegir tu perfil, accederás a una biblioteca completa diseñada para tu edad y rol. Aquí es donde encontrarás los simuladores interactivos, guías de acción, checklist y materiales específicos para aprender a navegar con seguridad en situaciones reales.',
  };
}
