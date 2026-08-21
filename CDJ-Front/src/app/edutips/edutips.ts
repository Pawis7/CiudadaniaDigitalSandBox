import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { VideoModalComponent } from '../shared/video-modal/video-modal';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';

@Component({
  selector: 'app-edutips',
  standalone: true,
  imports: [
    CommonModule,
    RevealDirective, VideoModalComponent, ImageLoaderDirective, FeatureCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edutips.html',
})
export class EdutipsComponent {
  private content = inject(ContentService);

  edutipsSeries = computed(() => this.content.getSeriesBySlug('edutips'));
  videos = computed(() => this.edutipsSeries()?.videos ?? []);

  /** Series recomendadas como FeatureCards */
  recommendedSeries = computed(() => {
    return this.content
      .videoSeries()
      .filter((s) => s.slug !== 'edutips')
      .slice(0, 3)
      .map((s) => this.content.seriesAsCard(s));
  });

  activeVideo = signal<any>(null);

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
}
