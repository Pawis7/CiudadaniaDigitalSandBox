/**
 * Configuración por-audiencia que desacopla los datos de identidad y
 * comportamiento del componente y la plantilla.
 *
 * Para cambiar el banner, el nivel por defecto o asignar un widget a un nivel:
 * editar solo este archivo — no hay que tocar audiencia.ts ni audiencia.html.
 *
 * Para agregar una audiencia nueva:
 *  1. Agregar su entrada aquí.
 *  2. Agregar la ruta en app.routes.ts (si se necesita).
 *  3. Agregar su contenido en page-content.ts (AUDIENCE_PAGES).
 */
import { AudienceSlug } from '../core/models/content.models';
import { WidgetId } from './widget-registry';

export interface AudienceConfig {
  theme:        AudienceSlug;
  bannerSrc:    string;
  bannerAlt:    string;
  defaultLevel: string;
  /**
   * Mapa de nivel-id → widget-id.
   * Si un nivel no aparece aquí (o su valor es null/undefined),
   * no se renderiza ningún widget en ese nivel.
   */
  levelWidgets: Partial<Record<string, WidgetId>>;
}

export const AUDIENCE_CONFIG: Record<string, AudienceConfig> = {
  'ninas-y-ninos': {
    theme:        'kids',
    bannerSrc:    '/banners/CIUDADANIA_NINASYNINOS.png',
    bannerAlt:    'Ciudadanía Digital Jalisco — Niñas y Niños',
    defaultLevel: 'primaria-baja',
    levelWidgets: {
      'preescolar': 'reconozco-emociones',
      'primaria-baja': 'quien-entra-mi-mundo',
      'primaria-alta': 'el-mundo-privado',
    },
  },
  'adolescentes': {
    theme:        'teens',
    bannerSrc:    '/banners/CIUDADANIA_Adolescentes.png',
    bannerAlt:    'Ciudadanía Digital Jalisco — Adolescentes',
    defaultLevel: 'secundaria',
    levelWidgets: {
      'secundaria': 'fraud-simulator',
      'preparatoria': 'el-servidor-de-discor',
    },
  },
  'familias': {
    theme:        'families',
    bannerSrc:    '/banners/CIUDADANIA_Familias.png',
    bannerAlt:    'Ciudadanía Digital Jalisco — Familias',
    defaultLevel: 'fam-6-11',
    levelWidgets: {
      'fam-6-11': 'adult-presence',
      'fam-12-14': 'riesgos-reales',
      'fam-15-22': 'presencia-jovenes',
    },
  },
  'docentes': {
    theme:        'teachers',
    bannerSrc:    '/banners/CIUDADANIADOCENTESDIGITAL.png',
    bannerAlt:    'Ciudadanía Digital Jalisco — Docentes',
    defaultLevel: 'doc-pb',
    levelWidgets: {},
  },
  
};
