import { DELIVERY_OPTIONS, DELIVERY_TITLES, DELIVERY_TOPICS, StageProfile, isStageExperience } from '../learning-experience/stage-delivery/stage-experiences.data';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AUDIENCE_PAGES } from '../core/data/page-content';
import { EXTERNAL_RESOURCES, ExternalResourceItem } from '../core/data/external-resources.data';
import { FAMILIES_MISSIONS, TEACHERS_BOOKS, TEACHERS_MISSIONS } from '../core/data/audience-extensions.data';
import { VIDEO_SERIES } from '../core/data/site-content';
import { LEARNING_EXPERIENCES } from '../learning-experience/learning-experience.data';
import { adaptExperience } from '../learning-experience/profile-context.data';
import { PROFILE_LEARNING } from '../audiencia/profile-activities.data';
import { VideoModalComponent, VideoModalData } from '../shared/video-modal/video-modal';

type Audience = 'kids' | 'teens' | 'families' | 'teachers';
type AudienceFilter = 'all' | Audience;
type Topic = 'all' | 'security' | 'relations' | 'wellbeing' | 'critical' | 'ai' | 'create' | 'participation' | 'consumer';
type ResourceFormat = 'all' | 'activity' | 'game' | 'video' | 'story' | 'guide';
type Purpose = 'all' | 'learn' | 'practice' | 'talk' | 'teach' | 'reference';

interface Entry {
  id: string;
  title: string;
  description: string;
  audiences: Audience[];
  levels: string[];
  topic: Exclude<Topic, 'all'>;
  format: Exclude<ResourceFormat, 'all'>;
  purpose: Exclude<Purpose, 'all'>;
  formatLabel: string;
  href: string;
  queryParams?: { perfil: Audience; etapa?: string; contexto?: string; enfoque?: string };
  collection?: string;
  external?: boolean;
  isPdf?: boolean;
  youtubeId?: string;
  institution?: string;
}

const audienceMap: Record<string, Audience> = {
  'ninas-y-ninos': 'kids',
  adolescentes: 'teens',
  familias: 'families',
  docentes: 'teachers'
};

const levelOrder = [
  '0 - 5 años',
  'Preescolar',
  '3 a 11 años',
  '6 - 11 años',
  'Primaria baja',
  'Primaria alta',
  '12 - 14 años',
  'Secundaria',
  '15 - 17 años',
  'Media superior',
  '18 - 22 años',
  'Sin etapa específica',
  'Todas las etapas',
  'Todos los niveles',
  'Todos los niveles y etapas'
];

const stageLabels: Record<string, string> = {
  preescolar: 'Preescolar',
  'primaria-baja': 'Primaria baja',
  'primaria-alta': 'Primaria alta',
  secundaria: 'Secundaria',
  preparatoria: 'Media superior',
  'fam-0-5': '0 - 5 años',
  'fam-6-11': '6 - 11 años',
  'fam-12-14': '12 - 14 años',
  'fam-15-17': '15 - 17 años',
  'fam-18-22': '18 - 22 años',
  'doc-pre': 'Preescolar',
  'doc-pb': 'Primaria baja',
  'doc-pa': 'Primaria alta',
  'doc-sec': 'Secundaria',
  'doc-prep': 'Media superior'
};

const audienceSearchTerms: Record<Audience, string> = {
  kids: 'niñas niños infancia preescolar primaria',
  teens: 'adolescentes jóvenes secundaria media superior',
  families: 'familias madres padres cuidadores acompañamiento',
  teachers: 'docentes maestras maestros aula enseñanza'
};

const topicSearchTerms: Record<Exclude<Topic, 'all'>, string> = {
  security: 'seguridad privacidad',
  relations: 'convivencia relaciones',
  wellbeing: 'bienestar digital',
  critical: 'información pensamiento crítico',
  ai: 'inteligencia artificial IA',
  create: 'crear aprender',
  participation: 'participación ciudadanía',
  consumer: 'consumo compras decisiones'
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX')
    .trim();
}

function topicFor(value: string): Exclude<Topic, 'all'> {
  const text = normalizeText(value);
  if (/\bia\b|inteligencia|deepfake|algorit/.test(text)) return 'ai';
  if (/acoso|presi|respeto|chat|carino|consent|emoci|conviv/.test(text)) return 'relations';
  if (/fomo|pantalla|bienestar|descanso|atenci|equilibrio/.test(text)) return 'wellbeing';
  if (/fraud|contrasena|privacidad|dato|segur|virus|perfil|mundo privado/.test(text)) return 'security';
  if (/compra|moneda|mercado|dinero|pago/.test(text)) return 'consumer';
  if (/fuente|inform|viral|noticia|verific|desinform/.test(text)) return 'critical';
  if (/particip|ciudadan|derecho/.test(text)) return 'participation';
  return 'create';
}

// Keep the learning purpose stable when an activity's description changes.
const lowerPrimaryTopics: Record<string, Exclude<Topic, 'all'>> = {
  'bit-puente-por-terminar': 'wellbeing',
  'bit-ventana-inesperada': 'security',
  'bit-boton-brillante': 'security',
  'bit-cartel-clase': 'create',
};

function formatFor(type: string, label: string): Exclude<ResourceFormat, 'all'> {
  if (type === 'game') return 'game';
  const text = normalizeText(`${type} ${label}`);
  if (/juego|simul/.test(text)) return 'game';
  if (/video|podcast/.test(text)) return 'video';
  if (/historia|cuento/.test(text)) return 'story';
  if (/guia|documento|libro|marco|pdf/.test(text)) return 'guide';
  return 'activity';
}

function purposeFor(audience: Audience, format: Exclude<ResourceFormat, 'all'>): Exclude<Purpose, 'all'> {
  if (format === 'guide') return 'reference';
  if (audience === 'teachers') return 'teach';
  if (audience === 'families') return 'talk';
  if (format === 'activity' || format === 'game') return 'practice';
  return 'learn';
}

function normalizedLevel(title: string): string {
  return /^(?:Bachillerato|Preparatoria)$/.test(title) ? 'Media superior' : title;
}

function levelsFromIds(ids: readonly string[] | undefined): string[] {
  return Array.from(new Set((ids ?? []).map(id => stageLabels[id]).filter((label): label is string => !!label)));
}

function audiencesFromText(value: string): Audience[] {
  const text = normalizeText(value);
  const found: Audience[] = [];
  if (/ninas|ninos|estudiantes|primaria|preescolar/.test(text)) found.push('kids');
  if (/adolescentes|jovenes|estudiantes|secundaria|media superior|bachillerato/.test(text)) found.push('teens');
  if (/familias|madres|padres|cuidadores/.test(text)) found.push('families');
  if (/docentes|maestras|maestros|escuela|aula/.test(text)) found.push('teachers');
  return found.length ? Array.from(new Set(found)) : ['kids', 'teens', 'families', 'teachers'];
}

function levelsFromExperienceAudience(value: string): string[] {
  const text = normalizeText(value);
  const levels: string[] = [];
  if (/preescolar/.test(text)) levels.push('Preescolar');
  if (/primaria alta/.test(text)) levels.push('Primaria alta');
  else if (/primaria/.test(text)) levels.push('Primaria baja', 'Primaria alta');
  if (/secundaria|adolescentes/.test(text)) levels.push('Secundaria');
  if (/media superior|preparatoria|bachillerato|adolescentes/.test(text)) levels.push('Media superior');
  if (/familias/.test(text)) levels.push('Todas las etapas');
  if (/docentes/.test(text)) levels.push('Todos los niveles');
  if (/ninas|ninos/.test(text) && !levels.some(level => ['Preescolar', 'Primaria baja', 'Primaria alta'].includes(level))) {
    levels.push('3 a 11 años');
  }
  return Array.from(new Set(levels.length ? levels : ['Todos los niveles y etapas']));
}

function externalLevels(resource: ExternalResourceItem): string[] {
  const explicit = levelsFromIds(resource.stageIds);
  if (explicit.length) return explicit;
  if (resource.scope === 'cross-stage') return ['Todos los niveles y etapas'];
  const text = normalizeText(resource.stage);
  if (/preescolar/.test(text)) return ['Preescolar'];
  if (/primaria baja/.test(text)) return ['Primaria baja'];
  if (/primaria alta/.test(text)) return ['Primaria alta'];
  if (/primaria/.test(text)) return ['Primaria baja', 'Primaria alta'];
  if (/secundaria/.test(text)) return ['Secundaria'];
  if (/preparatoria|bachillerato|media superior/.test(text)) return ['Media superior'];
  if ((resource.audiences ?? [resource.aud]).includes('families')) return ['Todas las etapas'];
  if ((resource.audiences ?? [resource.aud]).includes('teachers')) return ['Todos los niveles'];
  if ((resource.audiences ?? [resource.aud]).includes('kids')) return ['3 a 11 años'];
  return ['Secundaria', 'Media superior'];
}

const entries: Entry[] = AUDIENCE_PAGES.flatMap(page =>
  page.subLevels.flatMap(level =>
    (level.levelResources ?? []).map((resource): Entry => {
      const audience = audienceMap[page.slug] ?? 'teachers';
      const format = formatFor(resource.type, resource.typeLabel);
      return {
        id: `${page.slug}-${level.id}-${resource.title}`,
        title: resource.title,
        description: resource.description,
        audiences: [audience],
        levels: [normalizedLevel(level.title)],
        topic: lowerPrimaryTopics[resource.id] ?? topicFor(`${resource.title} ${resource.description}`),
        format,
        purpose: purposeFor(audience, format),
        formatLabel: resource.typeLabel || resource.type,
        href: `/p/${page.slug}#${level.id}`
      };
    })
  )
);

entries.push(
  ...VIDEO_SERIES.flatMap(series =>
    series.videos.map((video): Entry => {
      const isCasi = series.slug === 'el-dia-que-casi';
      return {
        id: `series-${series.slug}-${video.id}`,
        title: video.title,
        description: video.description || series.description,
        audiences: isCasi ? ['kids', 'families', 'teachers'] : ['teens', 'families', 'teachers'],
        levels: isCasi ? ['3 a 11 años'] : ['Sin etapa específica'],
        topic: topicFor(`${video.title} ${video.description ?? ''} ${(video.tags ?? []).join(' ')}`),
        format: 'video',
        purpose: 'learn',
        formatLabel: isCasi ? 'Episodio de serie' : 'Edutip en video',
        href: video.youtubeUrl,
        collection: series.title,
        youtubeId: (() => {
          try {
            return new URL(video.youtubeUrl).searchParams.get('v') ?? undefined;
          } catch {
            return undefined;
          }
        })(),
        institution: 'Secretaría de Educación Jalisco'
      };
    })
  ),
  ...LEARNING_EXPERIENCES.filter(experience => !isStageExperience(experience.slug)).map((experience): Entry => ({
    id: `experiencia-${experience.slug}`,
    title: experience.title,
    description: `${experience.subtitle}. Actividad interactiva con decisiones, retroalimentación y una acción para llevar a la práctica.`,
    audiences: audiencesFromText(experience.audience),
    levels: levelsFromExperienceAudience(experience.audience),
    topic: topicFor(`${experience.title} ${experience.subtitle} ${experience.takeaways.join(' ')}`),
    format: 'activity',
    purpose: 'practice',
    formatLabel: 'Experiencia interactiva',
    href: `/actividad/${experience.slug}`,
    collection: 'Experiencias Edutips',
    institution: 'Ciudadanía Digital Jalisco'
  })),
  ...Object.keys(DELIVERY_OPTIONS).map((slug): Entry => ({
    id: `experiencia-${slug}`, title: DELIVERY_TITLES[slug],
    description: 'Caso preparado con decisiones, retroalimentación, condiciones de uso y acompañamientos por etapa. No requiere abrir cuentas ni servicios externos.',
    audiences: [...new Set(DELIVERY_OPTIONS[slug].map(o => o.profile))],
    levels: [...new Set(DELIVERY_OPTIONS[slug].map(o => o.label))],
    topic: DELIVERY_TOPICS[slug], format: 'activity', purpose: 'practice', formatLabel: 'Caso preparado · Sin cuentas',
    href: `/actividad/${slug}`, collection: 'Experiencias por etapa', institution: 'Ciudadanía Digital Jalisco'
  })),
  {
    id: 'guia-videojuegos-en-casa',
    title: 'Videojuegos en casa',
    description: 'Guía para familias sobre elección de juegos, configuración, privacidad, compras, chats, acompañamiento y acuerdos según la edad.',
    audiences: ['families'],
    levels: ['6 - 11 años'],
    topic: 'wellbeing',
    format: 'guide',
    purpose: 'talk',
    formatLabel: 'Guía interactiva',
    href: '/p/familias/videojuegos',
    collection: 'Acompañamiento familiar',
    institution: 'Ciudadanía Digital Jalisco'
  },
  {
    id: 'orientacion-pantallas-seguras',
    title: 'Pantallas Seguras',
    description: 'Orientación para comprender el marco de protección de niñas, niños y adolescentes en entornos digitales y acompañar su aplicación en casa y en la escuela.',
    audiences: ['families', 'teachers'],
    levels: ['Todas las etapas', 'Todos los niveles'],
    topic: 'security',
    format: 'guide',
    purpose: 'reference',
    formatLabel: 'Orientación',
    href: '/pantallas-seguras',
    collection: 'Orientación y ayuda',
    institution: 'Ciudadanía Digital Jalisco'
  },
  {
    id: 'collection-el-dia-que-casi',
    title: 'El día que casi…',
    description: 'Historias breves para analizar decisiones, señales de riesgo y formas de actuar.',
    audiences: ['kids', 'teens', 'families', 'teachers'],
    levels: ['Primaria baja', 'Primaria alta', '6 - 11 años'],
    topic: 'relations',
    format: 'story',
    purpose: 'learn',
    formatLabel: 'Colección de historias',
    href: '/series/el-dia-que-casi',
    collection: 'El día que casi…'
  },
  {
    id: 'collection-edutips',
    title: 'Edutips',
    description: 'Cápsulas breves para aprender, conversar y tomar mejores decisiones digitales.',
    audiences: ['teens', 'families', 'teachers'],
    levels: ['Sin etapa específica'],
    topic: 'critical',
    format: 'video',
    purpose: 'learn',
    formatLabel: 'Colección de videos',
    href: '/edutips',
    collection: 'Edutips'
  },
  {
    id: 'collection-pequenos-cibernautas',
    title: 'Pequeños Cibernautas',
    description: 'Memorama y actividades para iniciar conversaciones sobre el cuidado digital en la infancia.',
    audiences: ['kids', 'families', 'teachers'],
    levels: ['3 a 11 años'],
    topic: 'security',
    format: 'game',
    purpose: 'practice',
    formatLabel: 'Colección interactiva',
    href: '/series/pequenos-cibernautas',
    collection: 'Pequeños Cibernautas'
  },
  ...FAMILIES_MISSIONS.map((mission): Entry => ({
    id: mission.id,
    title: mission.title,
    description: mission.description,
    audiences: ['families'],
    levels: levelsFromIds(mission.levels),
    topic: topicFor(`${mission.title} ${mission.description}`),
    format: 'guide',
    purpose: 'talk',
    formatLabel: 'Actividad descargable',
    href: mission.pdfUrl,
    collection: 'Misiones digitales',
    institution: 'Ciudadanía Digital Jalisco',
    external: true,
    isPdf: true
  })),
  ...TEACHERS_MISSIONS.map((mission): Entry => ({
    id: mission.id,
    title: mission.title,
    description: mission.description,
    audiences: ['teachers'],
    levels: levelsFromIds(mission.levels),
    topic: topicFor(`${mission.title} ${mission.description}`),
    format: 'guide',
    purpose: 'teach',
    formatLabel: 'Secuencia descargable',
    href: mission.pdfUrl,
    collection: 'Misiones digitales',
    institution: 'Ciudadanía Digital Jalisco',
    external: true,
    isPdf: true
  })),
  ...TEACHERS_BOOKS.map((book): Entry => ({
    id: book.id,
    title: book.title,
    description: book.description,
    audiences: ['teachers'],
    levels: ['Todos los niveles'],
    topic: topicFor(`${book.title} ${book.description}`),
    format: 'guide',
    purpose: 'reference',
    formatLabel: 'Documento de referencia',
    href: book.pdfUrl,
    collection: 'Referencias para docentes',
    institution: book.institution,
    external: true,
    isPdf: true
  })),
  ...EXTERNAL_RESOURCES.map((resource): Entry => {
    const format = resource.format;
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      audiences: resource.audiences ?? [resource.aud],
      levels: externalLevels(resource),
      topic: resource.topic,
      format,
      purpose: resource.featuredVideoId
        ? 'practice'
        : resource.scope === 'cross-stage'
          ? 'learn'
          : purposeFor(resource.aud, format),
      formatLabel: resource.formatLabel,
      href: resource.href,
      collection: resource.collection,
      external: resource.external,
      isPdf: resource.isPdf,
      youtubeId: resource.youtubeId,
      institution: resource.institution
    };
  })
);

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, RouterLink, VideoModalComponent],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursosComponent {
  query = signal('');
  audience = signal<AudienceFilter>('all');
  topic = signal<Topic>('all');
  format = signal<ResourceFormat>('all');
  purpose = signal<Purpose>('all');
  level = signal('all');
  collection = signal('all');

  activeVideo = signal<VideoModalData | null>(null);

  private entriesForAudience = computed(() => {
    const scoped = entries.map((entry): Entry => {
      const slug = entry.href.startsWith('/actividad/') ? entry.href.slice('/actividad/'.length) : '';
      if (this.audience() === 'families' && slug && !isStageExperience(slug)) {
        const activity = PROFILE_LEARNING.families?.activities.find(item => item.slug === slug);
        return {
          ...entry,
          audiences: activity ? ['families'] : [],
          levels: activity ? levelsFromIds(activity.levels) : [],
        };
      }
      if (this.audience() === 'families' && entry.id.startsWith('series-el-dia-que-casi-')) {
        return { ...entry, audiences: ['families'], levels: ['6 - 11 años'] };
      }
      if (!isStageExperience(slug) || this.audience() === 'all') return entry;
      const profile = this.audience() as StageProfile;
      const options = DELIVERY_OPTIONS[slug].filter(o => o.profile === profile);
      return { ...entry, audiences: options.length ? [profile] : [], levels: [...new Set(options.map(o => o.label))], purpose: purposeFor(profile, 'activity') };
    });
    if (this.audience() !== 'kids') return scoped;
    const experience = adaptExperience(
      LEARNING_EXPERIENCES.find(item => item.slug === 'uso-con-intencion'),
      'kids',
    );
    return scoped.map((entry): Entry => {
      if (entry.id !== 'experiencia-uso-con-intencion' || !experience) return entry;
      return {
        ...entry,
        title: experience.title,
        description: 'Decide para qué usar la tableta al dibujar o construir y cuándo continuar con otra actividad.',
        audiences: ['kids'],
        levels: ['Primaria baja', 'Primaria alta'],
        topic: 'create',
        queryParams: { perfil: 'kids' },
      };
    });
  });

  audiences = [
    ['all', 'Todos los perfiles'],
    ['kids', 'Niñas y niños'],
    ['teens', 'Adolescentes'],
    ['families', 'Familias'],
    ['teachers', 'Docentes']
  ] as const;

  formats = [
    ['all', 'Todos los formatos'],
    ['activity', 'Actividades'],
    ['game', 'Juegos y simuladores'],
    ['video', 'Videos'],
    ['story', 'Historias'],
    ['guide', 'Guías y documentos']
  ] as const;

  purposes = [
    ['all', 'Todos los propósitos'],
    ['learn', 'Aprender o informarme'],
    ['practice', 'Realizar una actividad'],
    ['talk', 'Conversar y acompañar'],
    ['teach', 'Trabajar en el aula'],
    ['reference', 'Consultar una guía o marco']
  ] as const;

  topics = [
    ['all', 'Todos los temas'],
    ['security', 'Seguridad y privacidad'],
    ['relations', 'Convivencia y relaciones'],
    ['wellbeing', 'Bienestar digital'],
    ['critical', 'Información y pensamiento crítico'],
    ['ai', 'Inteligencia artificial'],
    ['create', 'Crear y aprender'],
    ['participation', 'Participación y ciudadanía'],
    ['consumer', 'Consumo y decisiones']
  ] as const;

  levels = computed(() => {
    const values = this.entriesForAudience()
      .filter(entry => this.audience() === 'all' || entry.audiences.includes(this.audience() as Audience))
      .flatMap(entry => entry.levels);
    return ['all', ...Array.from(new Set(values)).sort((a, b) => {
      const indexA = levelOrder.indexOf(a);
      const indexB = levelOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'es');
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    })];
  });

  collections = computed(() => [
    'all',
    ...Array.from(new Set(entries.map(entry => entry.collection).filter((value): value is string => !!value)))
      .sort((a, b) => a.localeCompare(b, 'es'))
  ]);

  results = computed(() => {
    const query = normalizeText(this.query());
    return this.entriesForAudience().filter(entry => {
      const searchable = normalizeText([
        entry.title,
        entry.description,
        entry.levels.join(' '),
        entry.formatLabel,
        entry.collection ?? '',
        entry.institution ?? '',
        entry.audiences.map(audience => audienceSearchTerms[audience]).join(' '),
        topicSearchTerms[entry.topic]
      ].join(' '));

      const matchesLevel = this.level() === 'all' ||
        entry.levels.includes(this.level()) ||
        entry.levels.includes('Todos los niveles y etapas') ||
        (entry.levels.includes('Todos los niveles') && ['Preescolar', 'Primaria baja', 'Primaria alta', 'Secundaria', 'Media superior'].includes(this.level())) ||
        (entry.levels.includes('Todas las etapas') && ['0 - 5 años', '6 - 11 años', '12 - 14 años', '15 - 17 años', '18 - 22 años'].includes(this.level()));

      return (!query || searchable.includes(query)) &&
        (this.audience() === 'all' || entry.audiences.includes(this.audience() as Audience)) &&
        (this.topic() === 'all' || entry.topic === this.topic()) &&
        (this.format() === 'all' || entry.format === this.format()) &&
        (this.purpose() === 'all' || entry.purpose === this.purpose()) &&
        matchesLevel &&
        (this.collection() === 'all' || entry.collection === this.collection());
    }).sort((a, b) => {
      if (this.audience() !== 'families' || this.level() !== '0 - 5 años') return 0;
      return Number(b.id === 'sej-en-corto-pantallas-primera-infancia') - Number(a.id === 'sej-en-corto-pantallas-primera-infancia');
    });
  });

  resourceParams(entry: Entry) {
    const slug = entry.href.startsWith('/actividad/') ? entry.href.slice('/actividad/'.length) : '';
    if (!slug || this.audience() === 'all') return entry.queryParams;
    if (!isStageExperience(slug)) {
      const familyStage = this.audience() === 'families'
        ? Object.entries(stageLabels).find(([id, label]) => id.startsWith('fam-') && label === this.level())?.[0]
        : undefined;
      return { ...entry.queryParams, perfil: this.audience() as Audience, ...(familyStage ? { etapa: familyStage } : {}) };
    }
    const profile = this.audience() as StageProfile;
    const options = DELIVERY_OPTIONS[slug].filter(o => o.profile === profile && o.label === this.level());
    return { perfil: profile, ...(options.length === 1 ? { etapa: options[0].stage } : {}), contexto: profile === 'teachers' ? 'escuela' : 'casa' };
  }

  audienceLabel(audiences: Audience[]) {
    return audiences
      .map(audience => this.audiences.find(option => option[0] === audience)?.[1] ?? audience)
      .join(', ');
  }

  purposeLabel(purpose: Entry['purpose']) {
    return this.purposes.find(option => option[0] === purpose)?.[1] ?? purpose;
  }

  levelLabel(levels: string[]) {
    return levels.join(', ');
  }

  hasActiveFilters() {
    return !!this.query().trim() || this.audience() !== 'all' || this.topic() !== 'all' ||
      this.format() !== 'all' || this.purpose() !== 'all' || this.level() !== 'all' || this.collection() !== 'all';
  }

  changeAudience(value: AudienceFilter) {
    this.audience.set(value);
    this.level.set('all');
  }

  reset() {
    this.query.set('');
    this.audience.set('all');
    this.topic.set('all');
    this.format.set('all');
    this.purpose.set('all');
    this.level.set('all');
    this.collection.set('all');
  }

  openVideo(entry: Entry) {
    if (!entry.youtubeId) return;
    this.activeVideo.set({
      youtubeUrl: entry.href,
      title: entry.title,
      description: entry.description,
      seriesTitle: entry.collection,
      author: entry.institution
    });
  }
}
