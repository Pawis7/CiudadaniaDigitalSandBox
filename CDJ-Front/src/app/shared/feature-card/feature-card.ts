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
import { FeatureCard } from '../../core/models/content.models';
import { ImageEditService } from '../../core/services/image-edit.service';
import { ContentEditService } from '../../core/services/content-edit.service';
import { EditableImageComponent } from '../editable-image/editable-image';
import { RevealDirective } from '../scroll-reveal/scroll-reveal.directive';

/**
 * Tarjeta de contenido destacado — completamente reutilizable.
 *
 * Los cambios de título, descripción e imagen van a ContentEditService.patchSeries()
 * para que la VideoSeries sea la ÚNICA fuente de verdad. Así, editar "Edutips"
 * aquí actualiza automáticamente todas las demás instancias (catálogo de series,
 * audiencias, detail) sin código extra.
 *
 * Badge y href son campos exclusivos de FeatureCard y van a patchCard().
 *
 * Uso:
 *   <app-feature-card [card]="myCard" [delay]="80" />
 */
@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, RouterLink, EditableImageComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-card.html',
})
export class FeatureCardComponent {
  private imgEdit     = inject(ImageEditService);
  private contentEdit = inject(ContentEditService);

  @Input({ required: true }) card!: FeatureCard;
  @Input() delay = 0;
  @Input() showDescription = true;

  editMode = this.imgEdit.editMode;

  panelOpen       = signal(false);
  editTitle       = signal('');
  editDescription = signal('');
  editBadge       = signal('');
  editHref        = signal('');

  /**
   * ¿Hay algún parche local para esta card? Revisa tanto seriesPatches
   * (título, descripción, imagen) como cardPatches (badge, href).
   */
  hasTextEdits = computed(() => {
    const sp = this.contentEdit.seriesPatches()[this.card?.id];
    const cp = this.contentEdit.cardPatches()[this.card?.id];
    const hasSeriesEdit = !!(sp && Object.keys(sp).length);
    const hasCardEdit   = !!(cp && Object.keys(cp).filter(k => k !== 'imageUrl').length);
    return hasSeriesEdit || hasCardEdit;
  });

  openPanel() {
    this.editTitle.set(this.card.title);
    this.editDescription.set(this.card.description);
    this.editBadge.set(this.card.badge ?? '');
    this.editHref.set(this.card.href);
    this.panelOpen.set(true);
  }

  closePanel() { this.panelOpen.set(false); }

  savePanel() {
    // Título y descripción → patchSeries (fuente de verdad compartida con el catálogo)
    this.contentEdit.patchSeries(this.card.id, {
      title:       this.editTitle(),
      description: this.editDescription(),
    });
    // Badge y href → patchCard (campos exclusivos de FeatureCard)
    this.contentEdit.patchCard(this.card.id, {
      badge: this.editBadge() || undefined,
      href:  this.editHref(),
    });
    this.panelOpen.set(false);
  }

  resetCard() {
    // Limpiar tanto series patches como card patches y la imagen
    this.contentEdit.resetSeries(this.card.id);
    this.contentEdit.resetCard(this.card.id);
    this.imgEdit.clearOverride(this.card.id);
  }

  hasImageOverride(): boolean {
    return !!this.imgEdit.getOverride(this.card.id);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      // Imagen → ImageEditService (render inmediato) + patchSeries (fuente de verdad)
      this.imgEdit.setOverride(this.card.id, dataUrl);
      this.contentEdit.patchSeries(this.card.id, { coverImageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
    input.value = '';
  }
}
