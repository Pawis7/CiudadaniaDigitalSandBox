import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar';
import { ContentService } from './core/services/content.service';
import { BrandIconComponent } from './shared/brand-icon/brand-icon';
import { ImageEditService } from './core/services/image-edit.service';
import { CdjLogoComponent } from './shared/cdj-logo/cdj-logo';

const ADMIN_FLAG = 'cdj_admin_v1';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent, BrandIconComponent, CdjLogoComponent],
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
  editMode = this.imgEdit.editMode;
  hasOverrides = computed(() => Object.keys(this.imgEdit.overrides()).length > 0);

  drawerOpen = signal(false);
  scrolled = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');
  signLanguage = signal(false);
  isAdmin = signal<boolean>(this.readAdminFlag());
  year = new Date().getFullYear();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  topNav = [
    { label: 'Inicio', href: '/', exact: true },
    { label: 'Series', href: '/series', exact: false },
    { label: 'Recursos', href: '/recursos', exact: false },
    { label: 'Quiénes somos', href: '/quienes-somos', exact: false },
  ];

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.closeDrawer();
        this.searchOpen.set(false);
      });

    // Activar/desactivar modo admin con ?admin=1 / ?admin=0 en la URL
    this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
      const v = params.get('admin');
      if (v === '1') this.setAdminFlag(true);
      else if (v === '0') this.setAdminFlag(false);
    });
  }

  ngAfterViewInit() {
    // Atajos: Cmd/Ctrl + K para abrir buscador
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearch();
      }
    });
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
    setTimeout(() => this.searchInput?.nativeElement?.focus(), 60);
  }
  closeSearch() {
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }
  toggleSearch() {
    if (this.searchOpen()) this.closeSearch();
    else this.openSearch();
  }

  toggleSignLanguage() {
    this.signLanguage.update((v) => !v);
  }

  toggleEdit() { this.imgEdit.toggleEdit(); }
  resetAllImages() {
    if (confirm('¿Restablecer todas las imágenes a la versión original?')) {
      this.imgEdit.clearAll();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.searchOpen()) { this.closeSearch(); return; }
    this.closeDrawer();
  }

  private readAdminFlag(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(ADMIN_FLAG) === '1';
  }
  private setAdminFlag(on: boolean) {
    try {
      if (on) localStorage.setItem(ADMIN_FLAG, '1');
      else localStorage.removeItem(ADMIN_FLAG);
    } catch {}
    this.isAdmin.set(on);
    if (!on && this.editMode()) this.imgEdit.toggleEdit();
  }
}
