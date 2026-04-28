import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player';
import { EditableImageComponent } from '../../shared/editable-image/editable-image';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, YoutubePlayerComponent, EditableImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.html',
})
export class SeriesDetailComponent {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  serie = computed(() => this.content.getSeriesBySlug(this.slug()));
  videos = computed(() => this.serie()?.videos ?? []);

  related = computed(() => {
    const current = this.serie();
    if (!current) return [];
    return this.content.videoSeries().filter((s) => s.id !== current.id).slice(0, 3);
  });
}
