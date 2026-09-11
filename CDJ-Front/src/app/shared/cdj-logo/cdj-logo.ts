import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Logo de Ciudadanía Digital Jalisco.
 *
 * - variant="normal" → logo oficial con texto integrado (sobre fondos claros)
 * - variant="white"  → logo blanco con texto (sobre fondos oscuros / crimson)
 * - variant="icon"   → SOLO el icono crimson, sin texto. Útil cuando el texto
 *                      se pone aparte en HTML (sidebar header).
 * - variant="auto"   → cambia automáticamente entre normal y white con
 *                      [data-theme="dark"] en <html>
 */
@Component({
  selector: 'app-cdj-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="font-display inline-flex flex-col leading-tight select-none" [class]="containerClass">
      <span class="text-[1.05em] font-black tracking-tight text-[color:var(--text-primary)]">Ciudadanía</span>
      <span class="text-[0.8em] font-bold tracking-tight text-[color:var(--text-secondary)] -mt-0.5">
        Digital <span class="text-[color:var(--c-cdj)] font-black">SEJ</span>
      </span>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; }
  `],
})
export class CdjLogoComponent {
  @Input() containerClass: string = 'h-10 w-10';
  @Input() variant: 'auto' | 'normal' | 'white' | 'icon' = 'auto';
}
