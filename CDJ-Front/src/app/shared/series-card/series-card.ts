import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoSeries } from '../../core/models/content.models';
import { ImageEditService } from '../../core/services/image-edit.service';
import { ContentEditService } from '../../core/services/content-edit.service';
import { EditableImageComponent } from '../editable-image/editable-image';
import { RevealDirective } from '../scroll-reveal/scroll-reveal.directive';

/**
 * Tarjeta de Serie de Video — completamente reutilizable.
 *
 * Acepta un VideoSeries vía @Input y gestiona:
 *  - Render de portada, badge de episodios, título y tagline
 *  - Panel de edición inline (texto + imagen) cuando editMode está activo
 *  - Persistencia en localStorage vía ContentEditService + ImageEditService
 *
 * Uso:
 *   <app-series-card [serie]="mySerie" [delay]="80" />
 */
@Component({
  selector: 'app-series-card',
  standalone: true,
  imports: [CommonModule, RouterLink, EditableImageComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-card.html',
})
export class SeriesCardComponent {
  private imgEdit     = inject(ImageEditService);
  private contentEdit = inject(ContentEditService);

  @Input({ required: true }) serie!: VideoSeries;
  @Input() delay = 0;

  editMode = this.imgEdit.editMode;

  /** Controla si el panel de edición de texto está abierto */
  panelOpen = signal(false);

  /** Campos del formulario de edición */
  editTitle       = signal('');
  editTagline     = signal('');
  editDescription = signal('');

  /** ¿Hay parche local para esta serie? */
  hasTextEdits = computed(() => {
    const patches = this.contentEdit.seriesPatches();
    const p = patches[this.serie?.id];
    return !!(p && Object.keys(p).filter(k => k !== 'coverImageUrl').length);
  });

  openPanel() {
    this.editTitle.set(this.serie.title);
    this.editTagline.set(this.serie.tagline);
    this.editDescription.set(this.serie.description);
    this.panelOpen.set(true);
  }

  closePanel() { this.panelOpen.set(false); }

  savePanel() {
    this.contentEdit.patchSeries(this.serie.id, {
      title:       this.editTitle(),
      tagline:     this.editTagline(),
      description: this.editDescription(),
    });
    this.panelOpen.set(false);
  }

  resetSerie() {
    this.contentEdit.resetSeries(this.serie.id);
    this.imgEdit.clearOverride(this.serie.id);
  }

  hasImageOverride(): boolean {
    return !!this.imgEdit.getOverride(this.serie.id);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      this.imgEdit.setOverride(this.serie.id, dataUrl);
      this.contentEdit.patchSeries(this.serie.id, { coverImageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}
