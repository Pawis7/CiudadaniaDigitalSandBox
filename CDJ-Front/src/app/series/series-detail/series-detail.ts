import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player';
import { EditableImageComponent } from '../../shared/editable-image/editable-image';
import { ImageEditService } from '../../core/services/image-edit.service';
import { AuthService } from '../../core/services/auth.service';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';
import { VideoModalComponent } from '../../shared/video-modal/video-modal';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, YoutubePlayerComponent, EditableImageComponent, FeatureCardComponent, VideoModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.html',
})
export class SeriesDetailComponent {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);
  private auth    = inject(AuthService);

  /** editMode del hero cover también requiere login — isEditActive ya lo garantiza */
  editMode = this.imgEdit.isEditActive;

  hasOverride(id: string): boolean { return !!this.imgEdit.getOverride(id); }
  async resetOverride(id: string) {
    try {
      await this.imgEdit.deleteOverride(id);
      await this.content.refreshFromBackend();
    } catch (err) {
      console.error('Error al restablecer la portada:', err);
    }
  }

  async onFileSelected(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      await this.imgEdit.uploadImage(id, file);
      await this.content.refreshFromBackend();
    } catch (err) {
      console.error('Error al subir la portada:', err);
      alert('Error al subir la imagen.');
    } finally {
      input.value = '';
    }
  }

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
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|\/watch\?v=))([\w-]{11})/);
    const vid = match ? match[1] : '';
    return `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
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
