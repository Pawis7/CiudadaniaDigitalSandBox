export interface SiteBranding {
  logoText: { line1: string; line2: string };
  logoGradientFrom: string;
  logoGradientVia: string;
  logoGradientTo: string;
  siteName: string;
  tagline: string;
}

export interface Hero {
  eyebrow?: string;
  titleLead: string;
  titleHighlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl: string;
  imageAlt: string;
}

export interface Banner {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
  accentColor?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  accent: string;
  description?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgClass: string;
  shadowClass: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconShadowClass: string;
  imageUrl: string;
  href: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  durationLabel?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface VideoSeries {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  accentClass: string;
  iconBgClass: string;
  icon: string;
  episodeCount: number;
  videos: VideoItem[];
}

export interface NavSection {
  id: string;
  title: string;
  icon: string;
  bgClass: string;
  textClass: string;
  expanded: boolean;
  items: { label: string; href: string }[];
}

export type SocialBrand =
  | 'facebook' | 'instagram' | 'youtube' | 'x' | 'tiktok'
  | 'whatsapp' | 'threads' | 'linkedin' | 'spotify';

export interface SocialLink {
  id: string;
  brand: SocialBrand;
  label: string;
  href: string;
  hoverClass: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
