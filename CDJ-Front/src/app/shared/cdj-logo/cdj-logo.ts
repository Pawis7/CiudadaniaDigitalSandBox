import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cdj-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="grid place-items-center" [class]="containerClass">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-full w-full">
        <!-- conexiones -->
        <path
          d="M14 18 L24 26 L34 16 M24 26 L26 38"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.85" />
        <!-- nodo verde principal -->
        <circle cx="14" cy="18" r="6" fill="#0E9F6E"/>
        <circle cx="14" cy="18" r="2.4" fill="#fff"/>
        <!-- nodo derecho -->
        <circle cx="34" cy="16" r="5" fill="#10B981"/>
        <circle cx="34" cy="16" r="1.8" fill="#fff"/>
        <!-- nodo abajo -->
        <circle cx="26" cy="38" r="4.5" fill="#34D399"/>
        <circle cx="26" cy="38" r="1.6" fill="#fff"/>
        <!-- pista decorativa -->
        <circle cx="24" cy="26" r="2" fill="#F59E0B"/>
      </svg>
    </span>
  `,
})
export class CdjLogoComponent {
  @Input() containerClass: string = 'h-10 w-10 rounded-xl bg-white text-teal-600 shadow-sm';
}
