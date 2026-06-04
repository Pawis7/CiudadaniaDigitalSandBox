import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelResource } from '../../core/data/page-content';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resource-card.html',
  host: {
    style: 'display: contents'
  }
})
export class ResourceCardComponent {
  @Input({ required: true }) item!: LevelResource;
  @Output() actionClicked = new EventEmitter<LevelResource>();

  isWidgetAction(): boolean {
    return this.item.id === 'simulador-fraudes' || this.item.id === 'candado-rapido';
  }

  onAction(): void {
    this.actionClicked.emit(this.item);
  }
}
