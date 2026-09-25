import { ChangeDetectionStrategy, Component, EventEmitter, effect, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  routerLink: string[];
  audience: string;
}

const COLLAPSE_KEY = 'cdj_sidebar_collapsed';
const THEME_KEY = 'cdj_theme';
type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  @Input() variant: 'desktop' | 'mobile' = 'desktop';
  @Output() navigate = new EventEmitter<void>();

  collapsed = signal<boolean>(this.readCollapsed());
  theme = signal<ThemeMode>(this.readTheme());

  constructor() {
    effect(() => {
      const value = this.collapsed();
      if (typeof document !== 'undefined' && this.variant === 'desktop') {
        document.body.classList.toggle('sidebar-collapsed', value);
      }
    });
    effect(() => this.applyTheme(this.theme()));
  }

  learnSections: SidebarItem[] = [
    { id: 'home', label: 'Inicio', icon: 'home', routerLink: ['/'], audience: 'cdj' },
    { id: 'resources', label: 'Recursos', icon: 'library_books', routerLink: ['/recursos'], audience: 'cdj' }
  ];

  audiences: SidebarItem[] = [
    { id: 'kids', label: 'Niñas y niños', icon: 'child_care', routerLink: ['/p', 'ninas-y-ninos'], audience: 'kids' },
    { id: 'teens', label: 'Adolescentes', icon: 'forum', routerLink: ['/p', 'adolescentes'], audience: 'teens' },
    { id: 'families', label: 'Familias', icon: 'family_restroom', routerLink: ['/p', 'familias'], audience: 'families' },
    { id: 'teachers', label: 'Docentes', icon: 'school', routerLink: ['/p', 'docentes'], audience: 'teachers' }
  ];

  collections: SidebarItem[] = [
    { id: 'edutips', label: 'Edutips', icon: 'tips_and_updates', routerLink: ['/edutips'], audience: 'edutips' },
    { id: 'casi', label: 'El día que casi', icon: 'theaters', routerLink: ['/series', 'el-dia-que-casi'], audience: 'casi' },
    { id: 'cibernautas', label: 'Pequeños Cibernautas', icon: 'smart_toy', routerLink: ['/series', 'pequenos-cibernautas'], audience: 'kids' }
  ];

  helpSections: SidebarItem[] = [
    { id: 'pantallas-seguras', label: 'Pantallas Seguras', icon: 'screenshot_monitor', routerLink: ['/pantallas-seguras'], audience: 'screens' },
    { id: 'quienes', label: 'Quiénes somos', icon: 'groups', routerLink: ['/quienes-somos'], audience: 'cdj' }
  ];

  toggleCollapse() {
    this.collapsed.update(value => !value);
    this.persistCollapsed();
  }

  toggleTheme() {
    this.theme.update(value => value === 'dark' ? 'light' : 'dark');
    try {
      localStorage.setItem(THEME_KEY, this.theme());
    } catch {}
  }

  onNavigate() {
    this.navigate.emit();
  }

  private applyTheme(mode: ThemeMode) {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }

  private readTheme(): ThemeMode {
    if (typeof localStorage === 'undefined') return 'light';
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  }

  private readCollapsed() {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(COLLAPSE_KEY) === '1';
  }

  private persistCollapsed() {
    try {
      if (this.collapsed()) localStorage.setItem(COLLAPSE_KEY, '1');
      else localStorage.removeItem(COLLAPSE_KEY);
    } catch {}
  }
}
