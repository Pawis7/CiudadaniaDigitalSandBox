import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { ImageEditService } from '../../core/services/image-edit.service';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';
import { VideoModalComponent } from '../../shared/video-modal/video-modal';
import { FlipCardComponent } from '../../shared/flip-card/flip-card';
import { PEQUENOS_CIBERNAUTAS_CARDS } from '../../core/data/audience-extensions.data';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, FeatureCardComponent, VideoModalComponent, FlipCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.html',
})
export class SeriesDetailComponent {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);

  isPequenosCibernautas = computed(() => this.slug() === 'pequenos-cibernautas');
  pequenosCards = PEQUENOS_CIBERNAUTAS_CARDS;
  isCardsOpen = signal<boolean>(true);
  isDownloadsOpen = signal<boolean>(false);

  toggleCards() {
    this.isCardsOpen.update((v) => !v);
  }

  toggleDownloads() {
    this.isDownloadsOpen.update((v) => !v);
  }


  resolvedCoverUrl = computed(() => {
    const s = this.serie();
    if (!s) return '';
    return this.imgEdit.getOverride(s.id + '-banner') ?? s.bannerImageUrl ?? '';
  });

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  serie  = computed(() => this.content.getSeriesBySlug(this.slug()));
  videos = computed(() => this.serie()?.videos ?? []);

  /** Video activo para el modal emergente */
  activeVideo = signal<any>(null);

  /** Extrae la URL del thumbnail de alta calidad de YouTube */
  getYoutubeThumb(url: string): string {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.length === 11 && /^[\w-]{11}$/.test(trimmed)) {
      return `https://img.youtube.com/vi/${trimmed}/hqdefault.jpg`;
    }
    let vid = '';
    try {
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (urlObj.hostname.includes('youtube.com')) {
        vid = urlObj.searchParams.get('v') || '';
      }
    } catch (e) {}
    if (!vid) {
      const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|\/watch\?v=))([\w-]{11})/);
      vid = match ? match[1] : '';
    }
    if (!vid) {
      const match = trimmed.match(/(?:\/|vi\/|v=)([\w-]{11})(?:[?&]|$)/);
      vid = match ? match[1] : '';
    }
    return vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : '';
  }

  /** Otras series como FeatureCard para usar app-feature-card */
  relatedCards = computed(() => {
    const current = this.serie();
    if (!current) return [];
    return this.content
      .videoSeries()
      .filter((s) => s.id !== current.id)
      .slice(0, 3)
      .map((s) => this.content.seriesAsCard(s));
  });
}
