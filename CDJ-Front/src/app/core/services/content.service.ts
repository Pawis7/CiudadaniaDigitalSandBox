import { Injectable, signal } from '@angular/core';
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

/**
 * Fuente única para todo el contenido editable del portal.
 * Hoy retorna data local; mañana cambia a HTTP/Supabase
 * sin tocar los componentes que la consumen.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly branding = signal<SiteBranding>(BRANDING);
  readonly hero = signal<Hero>(HERO);
  readonly categories = signal<Category[]>(CATEGORIES);
  readonly featureCards = signal<FeatureCard[]>(FEATURE_CARDS);
  readonly pillars = signal<Pillar[]>(PILLARS);
  readonly secondaryBanner = signal<Banner>(SECONDARY_BANNER);
  readonly videoSeries = signal<VideoSeries[]>(VIDEO_SERIES);
  readonly navSections = signal<NavSection[]>(NAV_SECTIONS);
  readonly socialLinks = signal<SocialLink[]>(SOCIAL_LINKS);
  readonly footerColumns = signal<FooterColumn[]>(FOOTER_COLUMNS);

  getSeriesBySlug(slug: string): VideoSeries | undefined {
    return this.videoSeries().find((s) => s.slug === slug);
  }
}
