import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelResource } from '../../core/data/page-content';
import { ImageLoaderDirective } from '../image-loader/image-loader.directive';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.css',
  host: {
    style: 'display: contents',
  },
})
export class ResourceCardComponent {
  @Input({ required: true }) item!: LevelResource;
  @Output() actionClicked = new EventEmitter<LevelResource>();
  descriptionOpen = signal(false);
  isButtonPressed = signal(false);
  private coverPointerType = '';

  onPointerEnter(event: PointerEvent): void {
    if (event.pointerType !== 'touch') this.descriptionOpen.set(true);
  }

  onPointerLeave(event: PointerEvent): void {
    // A mouse click can leave focus on the cover; leaving must still hide its panel.
    if (event.pointerType !== 'touch') this.descriptionOpen.set(false);
  }

  onCoverPointerDown(event: PointerEvent): void {
    this.coverPointerType = event.pointerType;
  }

  onCoverClick(event: MouseEvent): void {
    this.coverPointerType = '';
    this.onPosterAction(event);
  }

  onFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target.matches(':focus-visible') && this.coverPointerType !== 'touch') {
      this.descriptionOpen.set(true);
    }
  }

  onFocusOut(event: FocusEvent): void {
    const card = event.currentTarget as HTMLElement;
    if (!card.contains(event.relatedTarget as Node | null)) this.descriptionOpen.set(false);
  }

  onCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      const card = event.currentTarget as HTMLElement;
      if (card.querySelector('.story-card__panel')?.contains(event.target as Node)) {
        card.querySelector<HTMLButtonElement>('.story-card__cover')?.focus({ preventScroll: true });
      }
      this.descriptionOpen.set(false);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  isWidgetAction(): boolean {
    return (
      this.item.link === '#widget-seccion-anchor' ||
      this.item.id === 'bit-foto-otra-vez' ||
      this.item.id === 'simulador-fraudes' ||
      this.item.id === 'candado-rapido' ||
      this.item.id === 'presion-pares' ||
      this.item.id === 'limites-chats' ||
      this.item.id === 'presencia-adulta' ||
      this.item.id === 'riesgos-reales' ||
      this.item.id === 'presencia-jovenes' ||
      this.item.id === 'privacidad-dinero' ||
      this.item.id === 'sticker-control' ||
      this.item.id === 'app-no-se-acaba' ||
      this.item.id === 'el-carino-no-pide-contrasenas' ||
      this.item.id === 'chat-en-llamas' ||
      this.item.id === 'la-voz-en-el-squad' ||
      this.item.id === 'no-lo-hagas-viral' ||
      this.item.id === 'perfil-fantasma' ||
      this.item.id === 'monedas-gratis' ||
      this.item.id === 'jugada-problema' ||
      this.item.id === 'reconozco-emociones' ||
      this.item.id === 'bit-data-mensaje-gris' ||
      this.item.id === 'luna-cajita-importante' ||
      this.item.id === 'el-servidor-de-discor' ||
      this.item.id === 'el-mercado-gamer' ||
      this.item.id === 'el-mundo-privado' ||
      this.item.id === 'cuando-hijo-mundo-privado' ||
      this.item.id === 'quien-entra-mi-mundo'
    );
  }

  onAction(): void {
    this.actionClicked.emit(this.item);
  }

  onPosterAction(event: MouseEvent): void {
    event.stopPropagation();
    this.isButtonPressed.set(true);
    setTimeout(() => this.isButtonPressed.set(false), 200);

    // The reader restores focus to the element active when it opens.
    // Keep that origin on the cover, which remains available with its panel hidden.
    const card = (event.currentTarget as HTMLElement).closest('.story-card');
    card?.querySelector<HTMLButtonElement>('.story-card__cover')?.focus({ preventScroll: true });
    this.descriptionOpen.set(false);
    this.onAction();
  }

  onStoryCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Don't duplicate if clicking directly on the action button
    if (target.closest('.story-card__action-btn')) {
      return;
    }
    this.onPosterAction(event);
  }

  onCardClick(event: Event): void {
    const target = event.target as HTMLElement;
    // Don't intercept clicks that occurred directly on the buttons or links
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    if (this.isWidgetAction()) {
      this.onAction();
    } else if (this.item.link) {
      const element = event.currentTarget as HTMLElement;
      const anchor = element.querySelector('a') as HTMLAnchorElement;
      if (anchor) {
        anchor.click();
      } else if (this.item.link.startsWith('http')) {
        window.open(this.item.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = this.item.link;
      }
    }
  }
}
