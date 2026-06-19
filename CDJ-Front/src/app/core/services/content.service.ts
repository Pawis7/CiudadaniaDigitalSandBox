import { Injectable, inject, signal, computed } from '@angular/core';
import { ContentEditService } from './content-edit.service';
import {
  Banner,
  Category,
  FeatureCard,
  FooterColumn,
  Hero,
  NavSection,
  Pillar,
  SiteBranding,
  SocialLink,
  VideoSeries,
} from '../models/content.models';
import {
  BRANDING,
  CATEGORIES,
  FEATURE_CARDS,
  FOOTER_COLUMNS,
  HERO,
  NAV_SECTIONS,
  PILLARS,
  SECONDARY_BANNER,
  SOCIAL_LINKS,
  VIDEO_SERIES,
} from '../data/site-content';
import { ImageEditService } from './image-edit.service';

/**
 * Fuente única para todo el contenido estático y local del portal.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private contentEdit = inject(ContentEditService);

  readonly branding = signal<SiteBranding>(BRANDING);
  readonly hero = signal<Hero>(HERO);
  private _categoriesRaw = signal<Category[]>(CATEGORIES);

  /**
   * Categorías con parches locales aplicados.
   */
  readonly categories = computed(() => {
    const raw = this._categoriesRaw();
    const patches = this.contentEdit.seriesPatches();
    return raw.map((cat) => {
      const p = patches[cat.id];
      return p
        ? {
            ...cat,
            name:        p.title ?? cat.name,
            description: p.description ?? cat.description,
            imageUrl:    p.coverImageUrl ?? cat.imageUrl,
          }
        : cat;
    });
  });

  readonly pillars = signal<Pillar[]>(PILLARS);
  readonly secondaryBanner = signal<Banner>(SECONDARY_BANNER);
  readonly navSections = signal<NavSection[]>(NAV_SECTIONS);
  readonly socialLinks = signal<SocialLink[]>(SOCIAL_LINKS);
  readonly footerColumns = signal<FooterColumn[]>(FOOTER_COLUMNS);

  /**
   * Datos crudos: base estática o payload del backend.
   * Solo se usan dentro del computed — nunca los consumen los componentes directamente.
   */
  private _featureCardsRaw = signal<FeatureCard[]>(FEATURE_CARDS);
  private _videoSeriesRaw  = signal<VideoSeries[]>(VIDEO_SERIES);

  /**
   * VideoSeries con parches locales aplicados.
   * Es la ÚNICA fuente de verdad para título, descripción e imagen de cualquier
   * contenido que también se muestra como FeatureCard.
   */
  readonly videoSeries = computed(() =>
    this.contentEdit.applySeriesPatches(this._videoSeriesRaw())
  );

  /**
   * FeatureCards derivadas automáticamente.
   *
   * Regla: si una FeatureCard tiene el mismo ID que una VideoSeries, HEREDA
   * título, descripción e imagen de esa serie — nunca duplica la data.
   * FEATURE_CARDS solo aporta config de display: badge, href, icon, iconBgClass.
   *
   * → Editar "Edutips" en el catálogo de series actualiza su Feature Card
   *   en inicio, audiencias y cualquier otro lugar automáticamente.
   * → Las cards sin serie (ej. "ayuda") siguen usando su propia data.
   */
  readonly featureCards = computed((): FeatureCard[] => {
    const rawCards = this._featureCardsRaw();
    // videoSeries ya tiene los parches de series aplicados
    const seriesMap = new Map(this.videoSeries().map((s) => [s.id, s]));
    // Parches de card para campos exclusivos de FeatureCard (badge, href)
    const cardPatches = this.contentEdit.cardPatches();

    return rawCards.map((card) => {
      const serie = seriesMap.get(card.id);
      const base: FeatureCard = serie
        ? {
            ...card,
            // Hereda los campos de contenido de la serie (fuente de verdad)
            title:       serie.title,
            description: serie.description,
            imageUrl:    serie.coverImageUrl,
            icon:        serie.icon,
            iconBgClass: serie.iconBgClass,
            href:        serie.slug === 'edutips' ? '/edutips' : `/series/${serie.slug}`,
          }
        : {
            ...card,
            href: card.destination === 'series' && card.id !== 'series'
              ? `/series/${card.id}`
              : card.href,
          }; // Card standalone (ayuda): usa su propia data

      // Parches de card solo para campos que no existen en VideoSeries (badge, href)
      const cp = cardPatches[card.id];
      return cp ? { ...base, ...cp } : base;
    });
  });

  readonly homeFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('inicio')).slice(0, 3)
  );

  readonly kidsFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('kids')).slice(0, 3)
  );

  readonly teensFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('teens')).slice(0, 3)
  );

  readonly familiesFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('families')).slice(0, 3)
  );

  readonly teachersFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('teachers')).slice(0, 3)
  );

  readonly seriesFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('series'))
  );

  readonly recursosFeatureCards = computed(() =>
    this.featureCards().filter((c) => c.sections?.includes('recursos')).slice(0, 3)
  );



  getSeriesBySlug(slug: string): VideoSeries | undefined {
    const found = this.videoSeries().find((s) => s.slug === slug);
    if (found) return found;

    // Fallback: look up in featureCards if destination is series
    const card = this.featureCards().find((c) => c.id === slug && c.destination === 'series');
    if (card) {
      return {
        id: card.id,
        slug: card.id,
        title: card.title,
        tagline: card.description || '',
        description: card.description || '',
        coverImageUrl: card.imageUrl || '',
        accentClass: 'from-slate-800 to-slate-900', // default neutral dark gradient
        iconBgClass: card.iconBgClass || 'bg-slate-650',
        icon: card.icon || 'play_circle',
        episodeCount: 0,
        audience: card.audience || 'kids',
        illoScene: card.illoScene || undefined,
        videos: [],
      };
    }
    return undefined;
  }

  /**
   * Convierte una VideoSeries al shape FeatureCard para poder usar
   * <app-feature-card> en cualquier página (audiencia, series-list, series-detail).
   * Usar el array ya reactivo (videoSeries()) garantiza que los parches
   * de ContentEditService ya están aplicados.
   */
  seriesAsCard(serie: VideoSeries): FeatureCard {
    return {
      id:             serie.id,
      title:          serie.title,
      description:    serie.description,
      icon:           serie.icon,
      iconBgClass:    serie.iconBgClass,
      iconShadowClass: '',
      imageUrl:       serie.coverImageUrl,
      href:           serie.slug === 'edutips' ? '/edutips' : `/series/${serie.slug}`,
      audience:       serie.audience,
      illoScene:      serie.illoScene,
      badge:          `${serie.episodeCount} episodios`,
    };
  }

  /**
   * Convierte una Category al shape FeatureCard para poder usar
   * <app-feature-card> en la página de inicio u otras listas.
   */
  categoryAsCard(cat: Category): FeatureCard {
    const iconMap: Record<string, string> = {
      kids: 'face',
      teens: 'forum',
      families: 'groups',
      teachers: 'school',
    };
    const bgMap: Record<string, string> = {
      kids: 'bg-rose-600',
      teens: 'bg-violet-600',
      families: 'bg-orange-600',
      teachers: 'bg-rose-600',
    };
    const destMap: Record<string, string> = {
      kids: 'ninas_y_ninos',
      teens: 'adolescentes',
      families: 'familias',
      teachers: 'docentes',
    };
    return {
      id:             cat.id,
      title:          cat.name,
      description:    cat.description ?? '',
      icon:           iconMap[cat.audience] ?? 'person',
      iconBgClass:    bgMap[cat.audience] ?? 'bg-slate-600',
      iconShadowClass: '',
      imageUrl:       cat.imageUrl,
      destination:    destMap[cat.audience] ?? 'inicio',
      href:           `/p/${cat.slug}`,
      audience:       cat.audience,
      illoScene:      cat.illoScene,
      badge:          cat.ageRange,
    };
  }

}
