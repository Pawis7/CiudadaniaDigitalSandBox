import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';
import { ImageLoaderDirective } from '../../shared/image-loader/image-loader.directive';

import { ImageEditService } from '../../core/services/image-edit.service';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RevealDirective, FeatureCardComponent, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-list.html',
})
export class SeriesListComponent {
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);

  query = signal('');
  editMode = this.imgEdit.isEditActive;

  /** Series filtradas que el usuario ha seleccionado para mostrar en el catálogo */
  cards = computed(() => {
    const q = this.query().trim().toLowerCase();
    const all = this.content.seriesFeatureCards();

    if (!q) return all;

    const seriesMap = new Map(this.content.videoSeries().map((s) => [s.id, s]));

    return all.filter((card) => {
      const matchesCard =
        card.title.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q);
      if (matchesCard) return true;

      // Buscar también dentro de los metadatos y videos de la serie sincronizada
      const serie = seriesMap.get(card.id);
      if (serie) {
        return (
          (serie.tagline ?? '').toLowerCase().includes(q) ||
          (serie.description ?? '').toLowerCase().includes(q) ||
          serie.videos.some((v) =>
            v.title.toLowerCase().includes(q) ||
            (v.description ?? '').toLowerCase().includes(q) ||
            (v.tags ?? []).some((t) => t.toLowerCase().includes(q))
          )
        );
      }
      return false;
    });
  });
}
