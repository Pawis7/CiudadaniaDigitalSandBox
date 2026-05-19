import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { SeriesCardComponent } from '../../shared/series-card/series-card';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RevealDirective, SeriesCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-list.html',
})
export class SeriesListComponent {
  private content = inject(ContentService);

  query = signal('');
  series = computed(() => {
    const query = this.query().trim().toLowerCase();
    const allSeries = this.content.videoSeries();

    if (!query) return allSeries;

    return allSeries.filter((series) =>
      series.title.toLowerCase().includes(query) ||
      series.tagline.toLowerCase().includes(query) ||
      series.description.toLowerCase().includes(query) ||
      series.videos.some((video) =>
        video.title.toLowerCase().includes(query) ||
        video.description?.toLowerCase().includes(query) ||
        (video.tags ?? []).some((tag) => tag.toLowerCase().includes(query))
      )
    );
  });
}
