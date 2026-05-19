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
import { ApiClient, ApiError } from './api.client';
import { ImageEditService } from './image-edit.service';

/**
 * Fuente única para todo el contenido editable del portal.
 *
 * Estrategia: arranca con data estática (instantánea, sin red), dispara
 * fetch del backend en paralelo y cuando responde, reemplaza los signals.
 * Si el backend cae (timeout/red), el sitio sigue funcionando con la data
 * embebida — útil tanto en dev sin Postgres como en degradación de prod.
 *
 * `loaded` indica que la fuente final es backend (true) o local (false).
 * `loading` está en true mientras corre el primer fetch.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private api = inject(ApiClient);
  private imgEdit = inject(ImageEditService);

  private contentEdit = inject(ContentEditService);

  readonly branding = signal<SiteBranding>(BRANDING);
  readonly hero = signal<Hero>(HERO);
  readonly categories = signal<Category[]>(CATEGORIES);
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
          }
        : card; // Card standalone (ayuda): usa su propia data

      // Parches de card solo para campos que no existen en VideoSeries (badge, href)
      const cp = cardPatches[card.id];
      return cp ? { ...base, ...cp } : base;
    });
  });

  readonly loading = signal(false);
  readonly source = signal<'static' | 'backend'>('static');
  readonly lastError = signal<string | null>(null);

  constructor() {
    // Arranca el fetch sin bloquear el render inicial.
    void this.refreshFromBackend();
  }

  getSeriesBySlug(slug: string): VideoSeries | undefined {
    return this.videoSeries().find((s) => s.slug === slug);
  }

  /**
   * Trae el bundle de contenido del backend y lo aplica a los signals.
   * Llamable a mano (p.ej. después de un cambio en /admin) para refrescar.
   */
  async refreshFromBackend(): Promise<void> {
    this.loading.set(true);
    this.lastError.set(null);
    try {
      const bundle = await this.api.get<BackendBundle>('/content/site');
      this.applyBundle(bundle);
      this.source.set('backend');
    } catch (err) {
      // Backend caído / DB no migrada / CORS / etc. — seguimos con data estática.
      this.source.set('static');
      const msg = err instanceof ApiError ? `${err.status} ${err.message}` : (err as Error)?.message ?? 'Error desconocido';
      this.lastError.set(msg);
      console.info('[ContentService] backend no disponible, usando data estática.', msg);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Mapea la respuesta del backend (formas Prisma con relations) a las
   * formas que esperan los componentes del front. La idea es absorber
   * cambios del backend sin tocar componentes.
   */
  private applyBundle(b: BackendBundle) {
    if (b.branding) {
      this.branding.set({
        logoText: { line1: b.branding.logoLine1, line2: b.branding.logoLine2 },
        logoGradientFrom: 'from-teal-500',
        logoGradientVia: 'via-emerald-500',
        logoGradientTo: 'to-teal-600',
        siteName: b.branding.siteName,
        tagline: b.branding.tagline,
      });
    }

    if (b.hero) {
      this.hero.set({
        eyebrow: b.hero.eyebrow ?? undefined,
        titleLead: b.hero.titleLead,
        titleHighlight: b.hero.titleHighlight,
        description: b.hero.description,
        primaryCta: { label: b.hero.primaryCtaLabel, href: b.hero.primaryCtaHref },
        secondaryCta: b.hero.secondaryCtaLabel && b.hero.secondaryCtaHref
          ? { label: b.hero.secondaryCtaLabel, href: b.hero.secondaryCtaHref }
          : undefined,
        imageUrl: b.hero.imageUrl,
        imageAlt: b.hero.imageAlt,
      });
    }

    if (b.pillars?.length) {
      this.pillars.set(b.pillars.map((p) => ({
        id: p.id, title: p.title, description: p.description,
        icon: p.icon, bgClass: p.bgClass, shadowClass: p.shadowClass,
      })));
    }

    if (b.categories?.length) {
      this.categories.set(b.categories.map((c) => ({
        id: c.audience, slug: c.slug, name: c.name, description: c.description ?? undefined,
        imageUrl: c.imageUrl, accent: c.accentClass,
        audience: c.audience, illoScene: c.illoScene ?? undefined,
        ageRange: c.ageRange ?? undefined,
      })));
    }

    if (b.featureCards?.length) {
      this._featureCardsRaw.set(b.featureCards.map((f) => ({
        id: f.id, title: f.title, description: f.description, icon: f.icon,
        iconBgClass: f.iconBgClass, iconShadowClass: f.iconShadowClass,
        imageUrl: f.imageUrl, href: f.href,
        audience: f.audience, illoScene: f.illoScene ?? undefined, badge: f.badge ?? undefined,
      })));
    }

    if (b.videoSeries?.length) {
      this._videoSeriesRaw.set(b.videoSeries.map((s) => ({
        id: s.id, slug: s.slug, title: s.title, tagline: s.tagline,
        description: s.description, coverImageUrl: s.coverImageUrl,
        accentClass: s.accentClass, iconBgClass: s.iconBgClass, icon: s.icon,
        episodeCount: s.videos?.length ?? 0,
        audience: s.audience, illoScene: s.illoScene ?? undefined,
        videos: (s.videos ?? []).map((v) => ({
          id: v.id, title: v.title, description: v.description ?? undefined,
          youtubeUrl: v.youtubeUrl, durationLabel: v.durationLabel ?? undefined,
          publishedAt: v.publishedAt ?? undefined, tags: v.tags ?? undefined,
        })),
      })));
    }

    if (b.secondaryBanner) {
      this.secondaryBanner.set({
        id: b.secondaryBanner.id,
        title: b.secondaryBanner.title,
        description: b.secondaryBanner.description ?? undefined,
        imageUrl: b.secondaryBanner.imageUrl,
        ctaLabel: b.secondaryBanner.ctaLabel ?? undefined,
        ctaHref: b.secondaryBanner.ctaHref ?? undefined,
        audience: b.secondaryBanner.audience ?? undefined,
      });
    }

    if (b.socialLinks?.length) {
      this.socialLinks.set(b.socialLinks);
    }

    if (b.footerColumns?.length) {
      this.footerColumns.set(b.footerColumns.map((c) => ({
        title: c.title,
        links: c.links.map((l) => ({ label: l.label, href: l.href })),
      })));
    }

    if (b.imageOverrides) {
      this.imgEdit.mergeBackendOverrides(b.imageOverrides);
    }
  }
}

// === Forma del payload que devuelve /api/content/site del backend ===
// Coincide con prisma/schema.prisma + la composición que arma el route handler.
interface BackendBundle {
  branding: BackendBranding | null;
  hero: BackendHero | null;
  pillars: BackendPillar[];
  categories: BackendAudience[];
  featureCards: BackendFeatureCard[];
  videoSeries: BackendSeries[];
  secondaryBanner: BackendBanner | null;
  socialLinks: SocialLink[];
  footerColumns: BackendFooterColumn[];
  imageOverrides: Record<string, string>;
}

interface BackendBranding {
  siteName: string; tagline: string; logoLine1: string; logoLine2: string;
}
interface BackendHero {
  eyebrow: string | null; titleLead: string; titleHighlight: string; description: string;
  primaryCtaLabel: string; primaryCtaHref: string;
  secondaryCtaLabel: string | null; secondaryCtaHref: string | null;
  imageUrl: string; imageAlt: string;
}
interface BackendPillar {
  id: string; title: string; description: string; icon: string; bgClass: string; shadowClass: string;
}
interface BackendAudience {
  slug: string; name: string; description: string | null;
  audience: 'kids'|'teens'|'families'|'teachers'|'help'|'edutips'|'casi'|'cdj';
  illoScene: 'hero'|'study'|'play'|'connect'|'shield'|'spark'|'compass' | null;
  ageRange: string | null; imageUrl: string; accentClass: string;
}
interface BackendFeatureCard {
  id: string; title: string; description: string; icon: string;
  iconBgClass: string; iconShadowClass: string; imageUrl: string; href: string;
  audience: BackendAudience['audience']; illoScene: BackendAudience['illoScene']; badge: string | null;
}
interface BackendSeries {
  id: string; slug: string; title: string; tagline: string; description: string;
  coverImageUrl: string; accentClass: string; iconBgClass: string; icon: string;
  audience: BackendAudience['audience']; illoScene: BackendAudience['illoScene'];
  videos: BackendVideo[];
}
interface BackendVideo {
  id: string; title: string; description: string | null; youtubeUrl: string;
  durationLabel: string | null; publishedAt: string | null; tags: string[];
}
interface BackendBanner {
  id: string; title: string; description: string | null; imageUrl: string;
  ctaLabel: string | null; ctaHref: string | null; audience: BackendAudience['audience'] | null; slot: string;
}
interface BackendFooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
