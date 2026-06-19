import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, untracked, Type, HostListener } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AUDIENCE_PAGES, LevelResource } from '../core/data/page-content';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { AudienceSlug } from '../core/models/content.models';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';
import { AUDIENCE_CONFIG } from './audiencia-config';
import { WIDGET_REGISTRY, WidgetId } from './widget-registry';
import { ResourceCardComponent } from '../shared/resource-card/resource-card';

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    RouterLink,
    RevealDirective,
    FeatureCardComponent,
    ImageLoaderDirective,
    ResourceCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
})
export class AudienciaComponent {
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private content = inject(ContentService);

  slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  fragment = toSignal(this.route.fragment);

  /** Metadatos de la audiencia (títulos, sub-niveles, temas). */
  page = computed(() => AUDIENCE_PAGES.find((a) => a.slug === this.slug()));

  /** Configuración de identidad y widgets para esta audiencia. */
  config = computed(() => AUDIENCE_CONFIG[this.slug()] ?? null);

  /** Tema de la audiencia activa (para CSS vars y tarjetas de contenido). */
  audienceTheme = computed<AudienceSlug>(() => this.config()?.theme ?? 'cdj');

  /** Tarjetas de contenido recomendado para este perfil. */
  recommendedCards = computed(() => {
    const aud = this.audienceTheme();
    if (aud === 'kids')     return this.content.kidsFeatureCards();
    if (aud === 'teens')    return this.content.teensFeatureCards();
    if (aud === 'families') return this.content.familiesFeatureCards();
    if (aud === 'teachers') return this.content.teachersFeatureCards();
    return [];
  });

  // Selección de nivel y filtros del portal de recursos
  selectedLevel = signal<string>('');
  searchQuery   = signal<string>('');
  activeFilter  = signal<'todos' | 'game' | 'activity' | 'video' | 'guide'>('todos');

  // Widget activo en el nivel (permite cambiar dinámicamente)
  activeWidgetId = signal<WidgetId | null>(null);

  constructor() {
    // Al cambiar de audiencia o fragmento, sincroniza el nivel seleccionado (priorizando fragmento si es válido)
    effect(() => {
      const cfg = this.config();
      const frag = this.fragment();
      untracked(() => {
        const p = this.page();
        const hasValidFragment = frag && p && p.subLevels.some((s) => s.id === frag);
        this.selectedLevel.set(hasValidFragment ? frag : (cfg?.defaultLevel ?? ''));
        this.searchQuery.set('');
        this.activeFilter.set('todos');
        if (hasValidFragment) {
          setTimeout(() => {
            this.scrollToAnchor('portal-recursos-anchor');
          }, 150);
        }
      });
    });

    // Al cambiar el nivel, cerramos cualquier widget activo
    effect(() => {
      this.selectedLevel();
      untracked(() => {
        this.closeWidgetModal();
      });
    });
  }

  /** Sub-nivel actualmente seleccionado (fuente de recursos, teaser y widget). */
  activeSubLevel = computed(() => {
    const p = this.page();
    if (!p) return null;
    return p.subLevels.find((s) => s.id === this.selectedLevel()) ?? null;
  });

  /** Nombre legible del nivel activo (para encabezados del portal). */
  getActiveLevelName = computed(() => this.activeSubLevel()?.title ?? '');

  /**
   * Componente Angular a renderizar en la sección de widget del nivel activo.
   * Resuelto desde WIDGET_REGISTRY.
   * null = no hay widget activo.
   */
  activeWidget = computed<Type<unknown> | null>(() => {
    const widgetId = this.activeWidgetId();
    return widgetId ? (WIDGET_REGISTRY[widgetId] ?? null) : null;
  });

  isPhoneWidget = computed(() => {
    const id = this.activeWidgetId();
    return id === 'fraud-simulator' || id === 'peer-pressure' || id === 'sticker-control';
  });

  /** Recursos del nivel activo filtrados por búsqueda y categoría. */
  filteredResources = computed(() => {
    const resources = this.activeSubLevel()?.levelResources ?? [];
    const query     = this.searchQuery().trim().toLowerCase();
    const cat       = this.activeFilter();
    return resources.filter((r) => {
      if (cat !== 'todos' && r.type !== cat) return false;
      if (query) {
        return (
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  });

  updateSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  scrollToAnchor(anchorId: string): void {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onResourceActionClicked(item: LevelResource): void {
    if (
      item.id === 'simulador-fraudes' ||
      item.id === 'candado-rapido' ||
      item.id === 'presion-pares' ||
      item.id === 'limites-chats' ||
      item.id === 'presencia-adulta' ||
      item.id === 'riesgos-reales' ||
      item.id === 'presencia-jovenes' ||
      item.id === 'privacidad-dinero' ||
      item.id === 'sticker-control' ||
      item.id === 'app-no-se-acaba'
    ) {
      this.activeWidgetId.set(
        item.id === 'simulador-fraudes' ? 'fraud-simulator' :
        item.id === 'candado-rapido' ? 'candado-rapido' :
        item.id === 'presion-pares' ? 'peer-pressure' :
        item.id === 'limites-chats' ? 'limites-chats' :
        item.id === 'presencia-adulta' ? 'adult-presence' :
        item.id === 'presencia-jovenes' ? 'presencia-jovenes' :
        item.id === 'privacidad-dinero' ? 'privacidad-dinero' :
        item.id === 'sticker-control' ? 'sticker-control' :
        item.id === 'app-no-se-acaba' ? 'app-no-se-acaba' : 'riesgos-reales'
      );
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    }
  }

  closeWidgetModal(): void {
    this.activeWidgetId.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.activeWidgetId()) {
      this.closeWidgetModal();
    }
  }

  onBannerActionClicked(banner: any, event: Event): void {
    if (banner.buttonHref && banner.buttonHref.startsWith('#')) {
      event.preventDefault();
      this.scrollToAnchor(banner.buttonHref.substring(1));
    }
  }

  selectLevelAndScroll(levelId: string): void {
    if (this.selectedLevel() === levelId) {
      this.scrollToAnchor('portal-recursos-anchor');
    } else {
      this.router.navigate([], {
        fragment: levelId,
        relativeTo: this.route,
        replaceUrl: true
      });
    }
  }
}
