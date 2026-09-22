import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
    style: 'display: contents'
  }
})
export class ResourceCardComponent {
  @Input({ required: true }) item!: LevelResource;
  @Output() actionClicked = new EventEmitter<LevelResource>();

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
