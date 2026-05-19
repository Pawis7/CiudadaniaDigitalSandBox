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
import { AuthService } from '../../core/services/auth.service';
import { EditableImageComponent } from '../editable-image/editable-image';
import { RevealDirective } from '../scroll-reveal/scroll-reveal.directive';

/**
 * Tarjeta de contenido destacado — reutilizable en cualquier página.
 *
 * Campos editables (solo admin logueado):
 *   · title       → patchSeries (fuente de verdad compartida)
 *   · description → patchSeries
 *   · imageUrl    → patchSeries (como URL de texto; subida de archivo en próxima iteración)
 *
 * href y badge son configuración fija — no se editan desde el front.
 * Si el usuario cierra sesión con el lápiz activo, editMode cae a false automáticamente.
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
  private auth        = inject(AuthService);

  @Input({ required: true }) card!: FeatureCard;
  @Input() delay = 0;
  @Input() showDescription = true;

  /**
   * Editar solo está disponible si el admin está logueado.
   * Si cierra sesión con el lápiz encendido, los controles desaparecen solos.
   */
  editMode = computed(() => this.imgEdit.editMode() && this.auth.isLogged());

  panelOpen       = signal(false);
  editTitle       = signal('');
  editDescription = signal('');
  editImageUrl    = signal('');

  /** ¿Hay parches locales pendientes de sincronizar con el backend? */
  hasEdits = computed(() => {
    const sp = this.contentEdit.seriesPatches()[this.card?.id];
    return !!(sp && Object.keys(sp).length);
  });

  openPanel() {
    this.editTitle.set(this.card.title);
    this.editDescription.set(this.card.description);
    this.editImageUrl.set(this.card.imageUrl);
    this.panelOpen.set(true);
  }

  closePanel() { this.panelOpen.set(false); }

  savePanel() {
    const patch: { title?: string; description?: string; coverImageUrl?: string } = {};
    const t = this.editTitle().trim();
    const d = this.editDescription().trim();
    const u = this.editImageUrl().trim();

    if (t) patch.title = t;
    if (d) patch.description = d;
    if (u) {
      patch.coverImageUrl = u;
      this.imgEdit.setOverride(this.card.id, u); // render inmediato
    }
    this.contentEdit.patchSeries(this.card.id, patch);
    this.panelOpen.set(false);
  }

  resetCard() {
    this.contentEdit.resetSeries(this.card.id);
    this.contentEdit.resetCard(this.card.id);
    this.imgEdit.clearOverride(this.card.id);
  }

  hasImageOverride(): boolean {
    return !!this.imgEdit.getOverride(this.card.id);
  }
}
