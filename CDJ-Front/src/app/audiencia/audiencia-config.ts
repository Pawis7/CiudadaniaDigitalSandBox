import { AudienceSlug } from '../core/models/content.models';
import { WidgetId } from './widget-registry';
export interface AudienceConfig {
  theme: AudienceSlug;
  bannerSrc: string;
  bannerAlt: string;
  bannerBg: string;
  bannerTitle: string;
  bannerTagline: string;
  bannerFocus: string;
  defaultLevel: string;
  levelWidgets: Partial<Record<string, WidgetId>>;
}
export const AUDIENCE_CONFIG: Record<string, AudienceConfig> = {
  'ninas-y-ninos': {
    theme: 'kids',
    bannerSrc: '/banners/CD_NinasYNinos.webp',
    bannerAlt: 'Ciudadanía Digital Jalisco — Niñas y niños',
    bannerBg: '#8f489d',
    bannerTitle: 'Niñas y niños',
    bannerTagline: 'Aprende, juega y cuida tu mundo digital.',
    bannerFocus: '74% center',
    defaultLevel: 'preescolar',
    levelWidgets: {
      preescolar: 'reconozco-emociones',
      'primaria-baja': 'bit-puente-por-terminar',
      'primaria-alta': 'detectives-pistas',
    },
  },
  adolescentes: {
    theme: 'teens',
    bannerSrc: '/banners/CD_Adolescentes.webp',
    bannerAlt: 'Ciudadanía Digital Jalisco — Adolescentes',
    bannerBg: '#046938',
    bannerTitle: 'Adolescentes',
    bannerTagline: 'Comprende tu vida digital y toma mejores decisiones.',
    bannerFocus: '72% center',
    defaultLevel: 'secundaria',
    levelWidgets: { secundaria: 'quien-entra-mi-mundo', preparatoria: 'el-servidor-de-discor' },
  },
  familias: {
    theme: 'families',
    bannerSrc: '/banners/CD_Familias.webp',
    bannerAlt: 'Ciudadanía Digital Jalisco — Familias',
    bannerBg: '#e81851',
    bannerTitle: 'Familias',
    bannerTagline: 'Acompaña cada etapa de su vida digital.',
    bannerFocus: '73% center',
    defaultLevel: 'fam-0-5',
    levelWidgets: {
      'fam-6-11': 'adult-presence',
      'fam-12-14': 'riesgos-reales',
      'fam-15-17': 'presencia-jovenes',
      'fam-18-22': 'privacidad-dinero',
    },
  },
  docentes: {
    theme: 'teachers',
    bannerSrc: '/banners/CD_Docentes.webp',
    bannerAlt: 'Ciudadanía Digital Jalisco — Docentes',
    bannerBg: '#f6842b',
    bannerTitle: 'Docentes',
    bannerTagline: 'Forma ciudadanía digital desde la comunidad escolar.',
    bannerFocus: '73% center',
    defaultLevel: 'doc-pre',
    levelWidgets: {},
  },
};
