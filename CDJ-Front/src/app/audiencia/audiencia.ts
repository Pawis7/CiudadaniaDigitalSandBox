import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AUDIENCE_PAGES } from '../core/data/page-content';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { EditableImageComponent } from '../shared/editable-image/editable-image';
import { ExploreByTopicComponent } from '../shared/explore-by-topic/explore-by-topic';

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, EditableImageComponent, ExploreByTopicComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
})
export class AudienciaComponent {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  page = computed(() => AUDIENCE_PAGES.find((a) => a.slug === this.slug()));

  recommendedSeries = computed(() => {
    const p = this.page();
    if (!p) return [];
    return this.content
      .videoSeries()
      .filter((s) => p.recommendedSeriesSlugs.includes(s.slug));
  });
}
