import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { AuthService } from '../core/services/auth.service';
import { FeatureCard, AudienceSlug } from '../core/models/content.models';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';
import { CARD_DESTINATIONS, resolveDestination, destinationLabel } from '../core/data/card-destinations';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FeatureCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanelComponent {
  private auth = inject(AuthService);
  private content = inject(ContentService);

  // Estado de autenticación y carga
  isAuthenticated = this.auth.isLogged;
  allCards = this.content.featureCards;

  isSavingForm = signal(false);
  isFormOpen = signal(false); // Control de apertura de la modal

  // Opciones estáticas para el dropdown de destinos
  readonly destinations = CARD_DESTINATIONS;

  // Campos de estado del formulario (Edición / Creación)
  editingCardId = signal<string | null>(null);
  formTitle = signal('Nueva Tarjeta Destacada');
  formDescription = signal('Aquí va la descripción descriptiva sobre el recurso.');
  formImageUrl = signal('/banners/CIUDADANIA_DIGITAL_Principal.png');
  formDestination = signal('series');
  formBadge = signal('');

  // El slug de la serie es ineditable y se calcula estrictamente en base al título
  formSeriesSlug = computed(() => slugify(this.formTitle()));

  // Campos internos heredados / por defecto (no expuestos en formulario)
  formIcon = signal('play_arrow');
  formIconBgClass = signal('bg-amber-600');
  formIconShadowClass = signal('shadow-amber-200');
  formAudience = signal<AudienceSlug>('cdj');
  formIlloScene = signal('');

  // ── PREVISUALIZACIÓN EN VIVO (Computed) ─────────────────────────────
  tempPreviewCard = computed((): FeatureCard => {
    const dest = this.formDestination();
    const bgClass = this.formIconBgClass().trim() || 'bg-amber-600';
    
    let href = resolveDestination(dest);
    if (dest === 'series') {
      const slug = this.formSeriesSlug().trim();
      if (slug && slug !== 'series') {
        href = `/series/${slug}`;
      }
    }

    return {
      id: 'temp-preview-card', // Siempre usar id temporal para evitar overrides del ImageEditService en la previsualización
      title: this.formTitle().trim() || 'Título de Tarjeta',
      description: this.formDescription().trim() || 'Descripción de la tarjeta destacada.',
      imageUrl: this.formImageUrl().trim() || '',
      destination: dest,
      href: href,
      audience: this.formAudience(),
      badge: this.formBadge().trim() || undefined,
      icon: this.formIcon().trim() || 'play_arrow',
      iconBgClass: bgClass,
      iconShadowClass: this.formIconShadowClass().trim() || 'shadow-amber-200',
      illoScene: (this.formIlloScene() || undefined) as any,
    };
  });

  getDestinationLabel(dest?: string): string {
    if (!dest) return 'Ninguno';
    return destinationLabel(dest);
  }

  // Abrir la modal en modo creación
  openCreateModal() {
    this.resetForm();
    this.isFormOpen.set(true);
  }

  // Abrir la modal en modo edición
  openEditModal(card: FeatureCard) {
    this.editCardFromCatalog(card);
    this.isFormOpen.set(true);
  }

  // Cerrar la modal y reiniciar formulario
  closeFormModal() {
    this.resetForm();
    this.isFormOpen.set(false);
  }

  // Cerrar la modal haciendo clic en el fondo difuminado (backdrop)
  closeModalOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeFormModal();
    }
  }

  // Editar tarjeta desde el catálogo general
  editCardFromCatalog(card: FeatureCard) {
    this.editingCardId.set(card.id);
    this.formTitle.set(card.title || '');
    this.formDescription.set(card.description || '');
    this.formImageUrl.set(card.imageUrl || '');
    this.formDestination.set(card.destination || 'series');
    this.formBadge.set(card.badge || '');

    // Cargar campos internos para preservar estilo original de la card
    this.formIcon.set(card.icon || 'play_arrow');
    this.formIconBgClass.set(card.iconBgClass || 'bg-amber-600');
    this.formIconShadowClass.set(card.iconShadowClass || 'shadow-amber-200');
    this.formAudience.set(card.audience || 'cdj');
    this.formIlloScene.set(card.illoScene || '');
  }

  // Eliminar tarjeta del catálogo
  async deleteCardFromCatalog(cardId: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarjeta del catálogo? Esta acción no se puede deshacer.')) {
      return;
    }

    this.isSavingForm.set(true);
    try {
      await this.content.deleteCardFromDatabase(cardId);
      // Limpiar formulario si era la tarjeta en edición
      if (this.editingCardId() === cardId) {
        this.resetForm();
      }
      alert('Tarjeta eliminada con éxito.');
    } catch (err) {
      alert('Error al eliminar la tarjeta.');
    } finally {
      this.isSavingForm.set(false);
    }
  }

  // Limpiar / Reiniciar formulario
  resetForm() {
    this.editingCardId.set(null);
    this.formTitle.set('Nueva Tarjeta Destacada');
    this.formDescription.set('Aquí va la descripción descriptiva sobre el recurso.');
    this.formImageUrl.set('/banners/CIUDADANIA_DIGITAL_Principal.png');
    this.formDestination.set('series');
    this.formBadge.set('');

    // Valores por defecto
    this.formIcon.set('play_arrow');
    this.formIconBgClass.set('bg-amber-600');
    this.formIconShadowClass.set('shadow-amber-200');
    this.formAudience.set('cdj');
    this.formIlloScene.set('');
  }

  // Crear o guardar cambios de la tarjeta
  async saveFormCard() {
    const title = this.formTitle().trim();
    const description = this.formDescription().trim();
    if (!title) {
      alert('El título es obligatorio.');
      return;
    }
    if (!description) {
      alert('La descripción es obligatoria.');
      return;
    }

    const dest = this.formDestination();
    let finalId = this.editingCardId();

    if (dest === 'series') {
      const slug = this.formSeriesSlug().trim();
      if (!slug) {
        alert('El slug de la serie es obligatorio cuando el destino es "Catálogo de Series".');
        return;
      }
      finalId = slug;
    } else {
      if (!finalId) {
        finalId = slugify(title);
      }
    }

    const cardData: any = {
      title,
      description,
      imageUrl: this.formImageUrl().trim(),
      destination: dest,
      badge: this.formBadge().trim() || undefined,
      // Enviar campos internos preservados
      icon: this.formIcon(),
      iconBgClass: this.formIconBgClass(),
      iconShadowClass: this.formIconShadowClass(),
      audience: this.formAudience(),
      illoScene: (this.formIlloScene() || undefined) as any,
    };

    if (!this.editingCardId()) {
      cardData.id = finalId;
    } else if (finalId !== this.editingCardId()) {
      cardData.id = finalId;
    }

    this.isSavingForm.set(true);
    try {
      if (this.editingCardId()) {
        await this.content.saveCardToDatabase(this.editingCardId()!, cardData);
        alert('Tarjeta actualizada con éxito.');
        this.closeFormModal();
      } else {
        await this.content.createCardInDatabase(cardData);
        alert('Tarjeta creada con éxito en el catálogo.');
        this.closeFormModal();
      }
    } catch (err: any) {
      const msg = err?.message || 'Error al guardar la tarjeta en la base de datos.';
      alert(msg);
    } finally {
      this.isSavingForm.set(false);
    }
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/[^\w\-]+/g, '')       // remove all non-word chars
    .replace(/\-\-+/g, '-')         // replace multiple - with single -
    .replace(/^-+/, '')             // trim leading -
    .replace(/-+$/, '');            // trim trailing -
}
