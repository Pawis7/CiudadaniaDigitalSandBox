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

export const BRANDING: SiteBranding = {
  logoText: { line1: 'Ciudadanía', line2: 'Digital' },
  logoGradientFrom: 'from-teal-500',
  logoGradientVia: 'via-emerald-500',
  logoGradientTo: 'to-teal-600',
  siteName: 'Ciudadanía Digital Jalisco',
  tagline:
    'Promovemos el uso ético y responsable de la tecnología para una ciudadanía digital activa y consciente en Jalisco.',
};

export const HERO: Hero = {
  eyebrow: 'Portal público de aprendizaje',
  titleLead: 'Hola, bienvenidas y bienvenidos a',
  titleHighlight: 'Ciudadanía Digital',
  description:
    'Aprendemos, convivimos y participamos en entornos digitales de forma segura, responsable y respetuosa.',
  primaryCta: { label: 'Explorar contenidos', href: '#contenidos' },
  secondaryCta: { label: 'Entrar por perfil', href: '#perfiles' },
  imageUrl:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
  imageAlt: 'Personas colaborando con tecnología',
};

export const CATEGORIES: Category[] = [
  {
    id: 'kids',
    slug: 'ninas-y-ninos',
    name: 'Niñas y niños',
    imageUrl:
      'https://images.unsplash.com/photo-1502086223501-7ea2493954b9?auto=format&fit=crop&q=80&w=600',
    accent: 'from-teal-400/0 via-teal-500/20 to-teal-600/40',
  },
  {
    id: 'teens',
    slug: 'adolescentes',
    name: 'Adolescentes',
    imageUrl:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600',
    accent: 'from-violet-400/0 via-violet-500/20 to-violet-600/40',
  },
  {
    id: 'families',
    slug: 'familias',
    name: 'Familias',
    imageUrl:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600',
    accent: 'from-orange-400/0 via-orange-500/20 to-orange-600/40',
  },
  {
    id: 'teachers',
    slug: 'docentes',
    name: 'Docentes',
    imageUrl:
      'https://images.unsplash.com/photo-1544717297-fa154ddad021?auto=format&fit=crop&q=80&w=600',
    accent: 'from-emerald-400/0 via-emerald-500/20 to-emerald-600/40',
  },
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'edutips',
    title: 'Edutips',
    description: 'Biblioteca de videos sobre muchos temas',
    icon: 'play_arrow',
    iconBgClass: 'bg-blue-600',
    iconShadowClass: 'shadow-blue-200',
    imageUrl:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400',
    href: '/series/edutips',
  },
  {
    id: 'casi',
    title: 'El día que casi',
    description: 'Serie animada para niñas y niños',
    icon: 'star',
    iconBgClass: 'bg-yellow-400',
    iconShadowClass: 'shadow-yellow-100',
    imageUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400',
    href: '/series/el-dia-que-casi',
  },
  {
    id: 'ayuda',
    title: 'Ayuda Digital',
    description: 'Instancias oficiales para riesgos digitales',
    icon: 'shield',
    iconBgClass: 'bg-red-500',
    iconShadowClass: 'shadow-red-100',
    imageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
    href: '#ayuda',
  },
];

export const PILLARS: Pillar[] = [
  {
    id: 'aprender',
    title: 'Aprender',
    description: 'Desarrolla habilidades digitales para la vida.',
    icon: 'school',
    bgClass: 'bg-[#76B9B4]',
    shadowClass: 'shadow-teal-100',
  },
  {
    id: 'convivir',
    title: 'Convivir',
    description: 'Construye relaciones positivas en línea.',
    icon: 'groups',
    bgClass: 'bg-[#8B80C1]',
    shadowClass: 'shadow-violet-100',
  },
  {
    id: 'participar',
    title: 'Participar',
    description: 'Usa la tecnología para crear e informar.',
    icon: 'campaign',
    bgClass: 'bg-[#F2746B]',
    shadowClass: 'shadow-orange-100',
  },
];

export const SECONDARY_BANNER: Banner = {
  id: 'cta-comunidad',
  title: 'La ciudadanía digital nos conecta y nos responsabiliza.',
  description:
    'Cada acción en línea tiene impacto. Elige informarte, respetar y participar para construir una comunidad mejor.',
  imageUrl:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
  ctaLabel: 'Conoce más',
  ctaHref: '#mas',
};

export const VIDEO_SERIES: VideoSeries[] = [
  {
    id: 'edutips',
    slug: 'edutips',
    title: 'Edutips',
    tagline: 'Cápsulas para tu día a día digital',
    description:
      'Microvideos para aprender a moverte en internet con seguridad, criterio y respeto.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1200',
    accentClass: 'from-blue-500 to-cyan-500',
    iconBgClass: 'bg-blue-600',
    icon: 'play_arrow',
    episodeCount: 4,
    videos: [
      {
        id: 'edu-1',
        title: 'Contraseñas que sí protegen',
        description: 'Cómo crear y guardar contraseñas seguras sin enloquecer.',
        youtubeUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
        durationLabel: '3:24',
        tags: ['seguridad', 'cuentas'],
      },
      {
        id: 'edu-2',
        title: 'Reconocer un fraude por mensaje',
        description: 'Señales para detectar phishing y qué hacer si recibes uno.',
        youtubeUrl: 'https://www.youtube.com/watch?v=IHZwWFHWa-w',
        durationLabel: '4:10',
        tags: ['fraude', 'phishing'],
      },
      {
        id: 'edu-3',
        title: 'Tu huella digital, explicada',
        description: 'Lo que dejas en internet y cómo cuidar tu reputación.',
        youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        durationLabel: '5:02',
        tags: ['privacidad'],
      },
      {
        id: 'edu-4',
        title: 'Cómo verificar una noticia',
        description: 'Tres pasos para no compartir información falsa.',
        youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        durationLabel: '4:45',
        tags: ['fake news', 'criterio'],
      },
    ],
  },
  {
    id: 'casi',
    slug: 'el-dia-que-casi',
    title: 'El día que casi',
    tagline: 'Serie animada para niñas y niños',
    description:
      'Historias cortas donde personajes evitan riesgos digitales tomando buenas decisiones.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&q=80&w=1200',
    accentClass: 'from-yellow-400 to-orange-500',
    iconBgClass: 'bg-yellow-400',
    icon: 'star',
    episodeCount: 3,
    videos: [
      {
        id: 'casi-1',
        title: 'El día que casi le doy mis datos',
        description: 'Una historia sobre proteger información personal.',
        youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
        durationLabel: '2:30',
      },
      {
        id: 'casi-2',
        title: 'El día que casi caigo en una trampa',
        description: 'Cómo identificar enlaces sospechosos.',
        youtubeUrl: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
        durationLabel: '2:50',
      },
      {
        id: 'casi-3',
        title: 'El día que casi pierdo a un amigo',
        description: 'Sobre el respeto y la convivencia digital.',
        youtubeUrl: 'https://www.youtube.com/watch?v=fLexgOxsZu0',
        durationLabel: '3:10',
      },
    ],
  },
  {
    id: 'familias',
    slug: 'familias-conectadas',
    title: 'Familias conectadas',
    tagline: 'Conversaciones en casa sobre lo digital',
    description:
      'Guías y diálogos para acompañar a hijas e hijos en su vida en línea.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200',
    accentClass: 'from-orange-400 to-rose-500',
    iconBgClass: 'bg-orange-500',
    icon: 'groups',
    episodeCount: 2,
    videos: [
      {
        id: 'fam-1',
        title: 'Hablar de pantallas sin pelear',
        description: 'Acuerdos familiares sobre tiempo de uso.',
        youtubeUrl: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM',
        durationLabel: '6:15',
      },
      {
        id: 'fam-2',
        title: 'Privacidad en redes para adolescentes',
        description: 'Configuraciones recomendadas y por qué.',
        youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        durationLabel: '5:48',
      },
    ],
  },
];

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'kids',
    title: 'Niñas y niños',
    icon: 'face',
    bgClass: 'bg-teal-500',
    textClass: 'text-teal-600',
    expanded: true,
    items: [
      { label: 'Preescolar', href: '#preescolar' },
      { label: 'Primaria baja', href: '#primaria-baja' },
      { label: 'Primaria alta', href: '#primaria-alta' },
    ],
  },
  {
    id: 'teens',
    title: 'Adolescentes',
    icon: 'smartphone',
    bgClass: 'bg-violet-500',
    textClass: 'text-violet-600',
    expanded: false,
    items: [
      { label: 'Secundaria', href: '#secundaria' },
      { label: 'Preparatoria', href: '#preparatoria' },
    ],
  },
  {
    id: 'families',
    title: 'Familias',
    icon: 'groups',
    bgClass: 'bg-orange-500',
    textClass: 'text-orange-600',
    expanded: false,
    items: [
      { label: '0-5 Primera infancia', href: '#0-5' },
      { label: '6-11 Niñez', href: '#6-11' },
      { label: '12-14 Adolescencia temprana', href: '#12-14' },
      { label: '15-22 Adolescencia tardía y juventud', href: '#15-22' },
    ],
  },
  {
    id: 'teachers',
    title: 'Docentes',
    icon: 'school',
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-600',
    expanded: false,
    items: [
      { label: 'Preescolar', href: '#d-preescolar' },
      { label: 'Primaria baja', href: '#d-primaria-baja' },
      { label: 'Primaria alta', href: '#d-primaria-alta' },
      { label: 'Secundaria', href: '#d-secundaria' },
      { label: 'Preparatoria', href: '#d-preparatoria' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'fb', brand: 'facebook', label: 'Facebook', href: '#', hoverClass: 'hover:bg-[#1877F2]' },
  { id: 'yt', brand: 'youtube',  label: 'YouTube',  href: '#', hoverClass: 'hover:bg-[#FF0000]' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Recursos',
    links: [
      { label: 'Videos animados', href: '#' },
      { label: 'Audiocuentos', href: '#' },
      { label: 'Microlecciones', href: '#' },
      { label: 'Guías y checklist', href: '#' },
    ],
  },
  {
    title: 'Para aprender',
    links: [
      { label: 'Secuencias didácticas', href: '#' },
      { label: 'Proyectos', href: '#' },
      { label: 'Retos', href: '#' },
      { label: 'Tutoriales imprimibles', href: '#' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Quiénes somos', href: '#' },
      { label: 'Alianzas', href: '#' },
      { label: 'Noticias', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
];
