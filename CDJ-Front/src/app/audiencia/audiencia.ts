import { ChangeDetectionStrategy, Component, computed, inject, signal, effect, untracked, Type } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AUDIENCE_PAGES } from '../core/data/page-content';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { AudienceSlug } from '../core/models/content.models';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';
import { SectionFeaturedSelectorComponent } from '../shared/section-featured-selector/section-featured-selector';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';
import { AUDIENCE_CONFIG } from './audiencia-config';
import { WIDGET_REGISTRY, WidgetId } from './widget-registry';

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    RouterLink,
    RevealDirective,
    FeatureCardComponent,
    SectionFeaturedSelectorComponent,
    ImageLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
})
export class AudienciaComponent {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);

  slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

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
  activeFilter  = signal<'todos' | 'game' | 'video' | 'guide'>('todos');

  // Widget activo en el nivel (permite cambiar dinámicamente)
  activeWidgetId = signal<WidgetId | null>(null);

  constructor() {
    // Al cambiar de audiencia, resetea el nivel al default de esa audiencia.
    effect(() => {
      const cfg = this.config();
      untracked(() => {
        this.selectedLevel.set(cfg?.defaultLevel ?? '');
        this.searchQuery.set('');
        this.activeFilter.set('todos');
      });
    });

    // Sincronizar widget por defecto cuando cambia el nivel.
    effect(() => {
      const lvl = this.selectedLevel();
      const cfg = this.config();
      untracked(() => {
        const defaultWidget = cfg?.levelWidgets[lvl] ?? null;
        this.activeWidgetId.set(defaultWidget);
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
}
