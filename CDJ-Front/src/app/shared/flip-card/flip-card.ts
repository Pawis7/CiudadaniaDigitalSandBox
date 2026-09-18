import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractivePostcard } from '../../core/data/audience-extensions.data';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cdj-flip-container" [class.is-flipped]="isFlipped()">
      <div class="cdj-flip-card">
        <!-- FRENTE -->
        <div class="cdj-flip-face cdj-flip-front">
          <div class="cdj-flip-img-wrap">
            <img [src]="item.frontImgUrl" [alt]="item.title" loading="lazy" class="cdj-flip-img" />
            <span class="cdj-flip-number-badge">#{{ item.id }}</span>
          </div>
          <div class="cdj-flip-footer">
            <h4 class="cdj-flip-title">{{ item.title }}</h4>
            <button
              type="button"
              class="cdj-flip-btn"
              (click)="toggleFlip($event)"
              [attr.aria-label]="'Ver reverso de ' + item.title"
            >
              <span class="material-symbols-rounded text-sm">sync</span>
              <span>Ver consejo</span>
            </button>
          </div>
        </div>

        <!-- REVERSO -->
        <div class="cdj-flip-face cdj-flip-back">
          <div class="cdj-flip-img-wrap cdj-back-wrap">
            <img [src]="item.backImgUrl" [alt]="'Consejo: ' + item.title" loading="lazy" class="cdj-flip-img" />
          </div>
          <div class="cdj-flip-footer cdj-flip-footer-back">
            <p class="cdj-flip-advice">{{ item.shortAdvice }}</p>
            <div class="cdj-flip-actions">
              <button
                type="button"
                class="cdj-flip-btn cdj-flip-btn-secondary"
                (click)="toggleFlip($event)"
                aria-label="Voltear al frente"
              >
                <span class="material-symbols-rounded text-sm">undo</span>
                <span>Frente</span>
              </button>
              <a
                [href]="item.pdfUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="cdj-flip-btn cdj-flip-btn-download"
                [attr.aria-label]="'Descargar PDF de ' + item.title"
              >
                <span class="material-symbols-rounded text-sm">download</span>
                <span>PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './flip-card.css'
})
export class FlipCardComponent {
  @Input({ required: true }) item!: InteractivePostcard;

  isFlipped = signal<boolean>(false);

  toggleFlip(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isFlipped.update(v => !v);
  }
}
