import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { NavSection } from '../core/models/content.models';
import { CdjLogoComponent } from '../shared/cdj-logo/cdj-logo';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;          // si es link directo
  routerLink?: string[];  // si usa router
  bgClass: string;
  textClass: string;
  audience?: string;
  subItems?: { label: string; href: string; icon: string }[];
}

/**
 * Sidebar "Navigation Rail + Drawer" estilo Vercel/Linear.
 *
 * - Desktop collapsed: 64px de ancho con solo iconos.
 * - Hover sobre el rail: panel de 280px se desliza encima del contenido
 *   (no empuja el layout).
 * - Cada audiencia (kids/teens/families/teachers) muestra sus sub-niveles
 *   cuando el panel está expandido.
 * - Mobile: drawer normal (variant="mobile" — siempre expandido).
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CdjLogoComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Input() variant: 'desktop' | 'mobile' = 'desktop';
  @Output() navigate = new EventEmitter<void>();

  private content = inject(ContentService);
  branding = this.content.branding;

  // Estado del panel: collapsed / expanded (se controla por hover en desktop,
  // por toggle en mobile siempre está abierto)
  expanded = signal(false);
  pinned = signal(false); // si el usuario hizo click para "fijar" expandido

  // Estructura completa de navegación.
  // Audiencias arriba (con sub-niveles) + secciones especiales abajo.
  audiences: SidebarItem[] = [
    {
      id: 'kids',  label: 'Niñas y niños',  icon: 'child_care',
      routerLink: ['/p', 'ninas-y-ninos'],
      bgClass: 'bg-[color:var(--c-kids)]', textClass: 'text-[color:var(--c-kids)]',
      audience: 'kids',
      subItems: [
        { label: 'Preescolar',     href: '/p/ninas-y-ninos#preescolar',    icon: 'crib' },
        { label: 'Primaria baja',  href: '/p/ninas-y-ninos#primaria-baja', icon: 'palette' },
        { label: 'Primaria alta',  href: '/p/ninas-y-ninos#primaria-alta', icon: 'menu_book' },
      ],
    },
    {
      id: 'teens', label: 'Adolescentes', icon: 'smartphone',
      routerLink: ['/p', 'adolescentes'],
      bgClass: 'bg-[color:var(--c-teens)]', textClass: 'text-[color:var(--c-teens)]',
      audience: 'teens',
      subItems: [
        { label: 'Secundaria',  href: '/p/adolescentes#secundaria',  icon: 'backpack' },
        { label: 'Preparatoria', href: '/p/adolescentes#preparatoria', icon: 'school' },
      ],
    },
    {
      id: 'families', label: 'Familias', icon: 'family_restroom',
      routerLink: ['/p', 'familias'],
      bgClass: 'bg-[color:var(--c-families)]', textClass: 'text-[color:var(--c-families)]',
      audience: 'families',
      subItems: [
        { label: '0–5 años',   href: '/p/familias#fam-0-5',   icon: 'child_friendly' },
        { label: '6–11 años',  href: '/p/familias#fam-6-11',  icon: 'face' },
        { label: '12–14 años', href: '/p/familias#fam-12-14', icon: 'group' },
        { label: '15–22 años', href: '/p/familias#fam-15-22', icon: 'diversity_3' },
      ],
    },
    {
      id: 'teachers', label: 'Docentes', icon: 'school',
      routerLink: ['/p', 'docentes'],
      bgClass: 'bg-[color:var(--c-teachers)]', textClass: 'text-[color:var(--c-teachers)]',
      audience: 'teachers',
      subItems: [
        { label: 'Preescolar',    href: '/p/docentes#doc-pre',  icon: 'child_friendly' },
        { label: 'Primaria baja', href: '/p/docentes#doc-pb',   icon: 'menu_book' },
        { label: 'Primaria alta', href: '/p/docentes#doc-pa',   icon: 'edit_note' },
        { label: 'Secundaria',    href: '/p/docentes#doc-sec',  icon: 'science' },
        { label: 'Preparatoria',  href: '/p/docentes#doc-prep', icon: 'computer' },
      ],
    },
  ];

  sections: SidebarItem[] = [
    { id: 'edutips',   label: 'Edutips',         icon: 'play_circle',  routerLink: ['/edutips'],                bgClass: 'bg-[color:var(--c-edutips)]', textClass: 'text-[color:var(--c-edutips)]', audience: 'edutips' },
    { id: 'casi',      label: 'El día que casi', icon: 'star',         routerLink: ['/series', 'el-dia-que-casi'], bgClass: 'bg-[color:var(--c-casi)]',    textClass: 'text-[color:var(--c-casi)]',    audience: 'casi' },
    { id: 'ayuda',     label: 'Ayuda Digital',   icon: 'shield',       routerLink: ['/ayuda'],                  bgClass: 'bg-[color:var(--c-help)]',    textClass: 'text-[color:var(--c-help)]',    audience: 'help' },
    { id: 'cursos',    label: 'Cursos',          icon: 'menu_book',    routerLink: ['/cursos'],                 bgClass: 'bg-[color:var(--c-teachers)]', textClass: 'text-[color:var(--c-teachers)]', audience: 'teachers' },
    { id: 'juegos',    label: 'Juegos',          icon: 'sports_esports', routerLink: ['/juegos'],               bgClass: 'bg-[color:var(--c-families)]', textClass: 'text-[color:var(--c-families)]', audience: 'families' },
    { id: 'notebooks', label: 'Notebooks IA',    icon: 'auto_awesome', routerLink: ['/notebooks-ia'],           bgClass: 'bg-[color:var(--c-teens)]',   textClass: 'text-[color:var(--c-teens)]',   audience: 'teens' },
    { id: 'quienes',   label: 'Quiénes somos',   icon: 'groups',       routerLink: ['/quienes-somos'],          bgClass: 'bg-[color:var(--c-cdj)]',     textClass: 'text-[color:var(--c-cdj)]',     audience: 'cdj' },
  ];

  // Item del que se está mostrando el sub-panel (audiencias) cuando está expandido
  hoveredAudience = signal<string | null>(null);

  onMouseEnter() {
    if (this.variant === 'desktop' && !this.pinned()) this.expanded.set(true);
  }
  onMouseLeave() {
    if (this.variant === 'desktop' && !this.pinned()) {
      this.expanded.set(false);
      this.hoveredAudience.set(null);
    }
  }

  togglePin() {
    this.pinned.update((v) => !v);
    if (this.pinned()) this.expanded.set(true);
  }

  hoverAudience(id: string | null) {
    this.hoveredAudience.set(id);
  }

  onNavigate() {
    this.hoveredAudience.set(null);
    this.navigate.emit();
  }

  // Para variant='mobile' siempre mostrar expanded
  get isOpen(): boolean {
    return this.variant === 'mobile' || this.expanded();
  }
}
