import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { extractYouTubeId, youtubeEmbedUrl, youtubeThumbnail } from '../../core/utils/youtube';

export interface VideoModalData {
  youtubeUrl: string;
  title:      string;
  description?: string;
  durationLabel?: string;
  tags?: string[];
  /** Nombre de la colección: serie, edutip, etc. */
  seriesTitle?: string;
}

/**
 * Modal premium global para reproducir videos de YouTube.
 *
 * Uso:
 *   <app-video-modal [video]="activeVideo()" (close)="activeVideo.set(null)" />
 *
 * El host debe controlar la visibilidad mediante un @if(activeVideo()).
 */
@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-modal.html',
  styleUrl: './video-modal.css',
})
export class VideoModalComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private document = inject(DOCUMENT);

  private _video = signal<VideoModalData | null>(null);
  @Input({ required: true }) set video(v: VideoModalData | null) { this._video.set(v); }

  close = output<void>();

  ngOnInit() {
    this.document.body.classList.add('no-scroll');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('no-scroll');
  }

  readonly videoId = computed(() => {
    const url = this._video()?.youtubeUrl ?? '';
    return extractYouTubeId(url);
  });

  readonly thumbnail = computed(() => {
    const id = this.videoId();
    return id ? youtubeThumbnail(id, 'maxres') : '';
  });

  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.videoId();
    if (!id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl(id, true));
  });

  readonly data = computed(() => this._video());

  /** true mientras se reproduce la animación de salida en móvil */
  closing = signal(false);

  onBackdropClick() {
    if (window.innerWidth < 640) {
      // Móvil: animar hacia abajo y luego emitir close
      this.closing.set(true);
      setTimeout(() => {
        this.closing.set(false);
        this.close.emit();
      }, 300);
    } else {
      this.close.emit();
    }
  }

  onPanelClick(e: Event) { e.stopPropagation(); }
}
