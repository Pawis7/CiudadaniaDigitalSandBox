import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar';
import { ContentService } from './core/services/content.service';
import { BrandIconComponent } from './shared/brand-icon/brand-icon';
import { ImageEditService } from './core/services/image-edit.service';
import { UiIconComponent } from './shared/ui-icon/ui-icon';
import { SearchEntry, searchIndex } from './core/data/search-index';
const THEME_KEY  = 'cdj_theme';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent, BrandIconComponent, UiIconComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);

  branding = this.content.branding;
  socialLinks = this.content.socialLinks;
  footerColumns = this.content.footerColumns;
  editMode = this.imgEdit.isEditActive;   // computed: editMode && isLogged
  hasOverrides = computed(() => Object.keys(this.imgEdit.overrides()).length > 0);

  drawerOpen = signal(false);
  scrolled = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');
  selectedIndex = signal(-1);
  theme = signal<ThemeMode>(this.readTheme());
  year = new Date().getFullYear();

  /** Resultados filtrados del índice de búsqueda */
  searchResults = computed<SearchEntry[]>(() => searchIndex(this.searchQuery(), 10));

  /** True cuando hay query pero no hay resultados */
  searchEmpty = computed(() => this.searchQuery().trim().length > 0 && this.searchResults().length === 0);

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('inlineSearch') inlineSearch?: ElementRef<HTMLInputElement>;

  topNav: { label: string; href: string; exact: boolean }[] = [
    { label: 'Inicio',    href: '/',               exact: true },
    { label: 'Series',    href: '/series',         exact: false },
    { label: 'Ayuda',     href: '/ayuda',          exact: false },
  ];

  constructor() {
    this.applyTheme(this.theme());

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.closeDrawer();
        this.searchOpen.set(false);
      });

  }

  ngAfterViewInit() {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearch();
      }
    });

    // Fade out and remove the initial global preloader once bootstrapped
    const preloader = document.getElementById('global-preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
      }, 450); // Matches transition duration
    }
  }

  toggleDrawer() {
    this.drawerOpen.update((v) => !v);
    document.body.style.overflow = this.drawerOpen() ? 'hidden' : '';
  }

  closeDrawer() {
    if (!this.drawerOpen()) return;
    this.drawerOpen.set(false);
    document.body.style.overflow = '';
  }

  openSearch() {
    this.searchOpen.set(true);
    this.selectedIndex.set(-1);
    setTimeout(() => this.searchInput?.nativeElement?.focus(), 60);
  }
  closeSearch() {
    this.searchOpen.set(false);
    this.searchQuery.set('');
    this.selectedIndex.set(-1);
  }

  /** Navega al href de un resultado (soporta fragmentos como /ayuda#canales) */
  navigateToResult(entry: SearchEntry) {
    this.closeSearch();
    const [path, fragment] = entry.href.split('#');
    if (fragment) {
      this.router.navigate([path], { fragment });
    } else {
      this.router.navigate([path]);
    }
  }

  /** Navegación por teclado dentro del panel de resultados */
  onSearchKeydown(event: KeyboardEvent) {
    const results = this.searchResults();
    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update(i => Math.min(i + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update(i => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      const idx = this.selectedIndex();
      const target = idx >= 0 ? results[idx] : results[0];
      if (target) this.navigateToResult(target);
    }
  }

  signLanguage = signal(false);

  toggleSignLanguage() {
    this.signLanguage.update((v) => !v);
  }



  toggleTheme() {
    const next: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  }

  private applyTheme(mode: ThemeMode) {
    if (typeof document === 'undefined') return;
    if (mode === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  private lastScrollY = 0;
  headerHidden = signal(false);
  private scrollThreshold = 60; // Se oculta temprano, poco después de iniciar el scroll
  private scrollDelta = 15; // Exige un movimiento ligeramente más deliberado para evitar nerviosismo

  @HostListener('window:scroll')
  onScroll() {
    const currentScrollY = window.scrollY;
    this.scrolled.set(currentScrollY > 8);

    // Si estamos arriba, siempre visible
    if (currentScrollY <= 20) {
      this.headerHidden.set(false);
      this.lastScrollY = currentScrollY;
      return;
    }

    const diff = currentScrollY - this.lastScrollY;

    // Solo reacciona si el movimiento supera el delta
    if (Math.abs(diff) > this.scrollDelta) {
      if (diff > 0 && currentScrollY > this.scrollThreshold) {
        // Scroll hacia abajo y después del threshold -> ocultar
        this.headerHidden.set(true);
      } else if (diff < 0) {
        // Scroll hacia arriba -> mostrar
        this.headerHidden.set(false);
      }
      this.lastScrollY = currentScrollY;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.searchOpen()) { this.closeSearch(); return; }
    this.closeDrawer();
  }



  private readTheme(): ThemeMode {
    if (typeof localStorage === 'undefined') return 'light';
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
}
