export interface AudienceTopic {
  icon: string;
  title: string;
  description: string;
  bgClass: string;
}

/**
 * Recurso interactivo (minijuego, video, guía) asociado a un sub-nivel.
 * Para agregar o editar recursos: busca el subLevel correspondiente
 * en AUDIENCE_PAGES y edita su propiedad `levelResources`.
 */
export interface LevelResource {
  id:          string;
  title:       string;
  description: string;
  type:        'game' | 'video' | 'guide';
  typeLabel:   string;
  icon:        string;
  badge:       string;
  duration:    string;
  colorClass:  string;
  actionLabel: string;
  link:        string;
}

/**
 * Tarjeta de "Próximamente" que se muestra debajo del portal de recursos
 * cuando un sub-nivel tiene contenido en producción.
 */
export interface ComingSoonTeaser {
  badgeIcon:        string;
  badgeLabel:       string;
  title:            string;
  description:      string;
  /** Clases de Tailwind completas incluyendo dirección, ej. 'bg-gradient-to-r from-fuchsia-600 to-pink-600' */
  gradientClass:    string;
  /** Clase de color del texto del botón, ej. 'text-pink-700' */
  buttonColorClass: string;
}

export interface AudienceSubLevel {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageId: string;
  bgClass: string;
  icon: string;
  resourceCount: number;
  /** Recursos interactivos disponibles en este sub-nivel. */
  levelResources?:   LevelResource[];
  /** Si existe, muestra un teaser de contenido próximo debajo del portal. */
  comingSoonTeaser?: ComingSoonTeaser;
}

export interface AudiencePage {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageId: string;
  accentClass: string;
  pillBgClass: string;
  iconBgClass: string;
  icon: string;
  ageRange?: string;
  subLevels: AudienceSubLevel[];
  topics: AudienceTopic[];
  recommendedSeriesSlugs: string[];
}

export const AUDIENCE_PAGES: AudiencePage[] = [
  {
    slug: 'ninas-y-ninos',
    title: 'Niñas y niños',
    eyebrow: 'Para los más pequeños',
    tagline: 'Aprender jugando, con calma y compañía',
    description:
      'Cápsulas, audiocuentos y videos cortos para descubrir el mundo digital con seguridad y curiosidad.',
    heroImage:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-kids-hero',
    accentClass: 'from-rose-500 via-rose-500 to-cyan-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'face',
    ageRange: '5 a 11 años',
    subLevels: [
      { id: 'preescolar',     title: 'Preescolar',    subtitle: '3 a 5 años',  imageUrl: '/ninosyninas_portadas/PREESCOLAR.jpg', imageId: 'sub-kids-pre', bgClass: 'from-rose-400 to-rose-500', icon: 'child_care', resourceCount: 12 },
      { id: 'primaria-baja',  title: 'Primaria baja', subtitle: '6 a 8 años',  imageUrl: '/ninosyninas_portadas/PRIMARIA BAJA.jpg', imageId: 'sub-kids-pb',  bgClass: 'from-rose-400 to-cyan-500', icon: 'auto_stories', resourceCount: 18 },
      { id: 'primaria-alta',  title: 'Primaria alta', subtitle: '9 a 11 años', imageUrl: '/ninosyninas_portadas/PRIMARIA ALTA.jpg', imageId: 'sub-kids-pa',  bgClass: 'from-cyan-400 to-blue-500',    icon: 'auto_stories', resourceCount: 22 },
    ],
    topics: [
      { icon: 'shield_person',  title: 'Cuidado en línea',     description: 'Saber qué compartir y qué no.',    bgClass: 'bg-rose-500' },
      { icon: 'sentiment_calm', title: 'Buen trato',            description: 'Tratar bonito y poner límites.',  bgClass: 'bg-rose-500' },
      { icon: 'palette',        title: 'Crear y descubrir',     description: 'Hacer arte digital y aprender.',  bgClass: 'bg-cyan-500' },
      { icon: 'schedule',       title: 'Tiempo en pantalla',    description: 'Equilibrio entre jugar y descansar.', bgClass: 'bg-sky-500' },
    ],
    recommendedSeriesSlugs: ['edutips', 'el-dia-que-casi'],
  },
  {
    slug: 'adolescentes',
    title: 'Adolescentes',
    eyebrow: 'Para ti que ya andas en redes',
    tagline: 'Información directa, sin sermones',
    description:
      'Privacidad, salud digital, redes sociales, ciberbullying y herramientas para ser creador, no solo consumidor.',
    heroImage:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-teens-hero',
    accentClass: 'from-violet-500 via-fuchsia-500 to-pink-500',
    pillBgClass: 'bg-violet-500',
    iconBgClass: 'bg-violet-500',
    icon: 'forum',
    ageRange: '12 a 17 años',
    subLevels: [
      {
        id: 'secundaria',  title: 'Secundaria',  subtitle: '12 a 14 años',
        imageUrl: '/adolescentes_portadas/SECUNDARIA.jpg', imageId: 'sub-teens-sec',
        bgClass: 'from-violet-500 to-fuchsia-500', icon: 'backpack', resourceCount: 15,
        levelResources: [
          {
            id: 'simulador-fraudes',
            title: 'Simulador de Fraudes por Chat',
            description: 'Enfréntate a chats sospechosos simulados en un entorno virtual realista. Aprende a detectar enlaces trampa, cobros falsos y extorsiones de forma segura.',
            type: 'game', typeLabel: 'Minijuego', icon: 'sports_esports',
            badge: 'Simulación Móvil', duration: '5 min',
            colorClass: 'from-violet-600 to-indigo-700',
            actionLabel: 'Iniciar Simulación', link: '#simulador-fraudes-anchor',
          },
          {
            id: 'detective-fraudes',
            title: 'Detective de Fraudes Digitales',
            description: 'Examina capturas de pantalla de correos, analiza enlaces dudosos y sube de nivel desenmascarando estafadores en la red.',
            type: 'game', typeLabel: 'Quiz Interactivo', icon: 'psychology',
            badge: 'Popular', duration: '8 min',
            colorClass: 'from-fuchsia-500 to-pink-500',
            actionLabel: 'Jugar Ahora', link: 'https://example.com/games/detective',
          },
          {
            id: 'video-huella',
            title: 'Cápsula: La huella digital de Sofía',
            description: 'Video animado que muestra de manera divertida y reflexiva cómo tus publicaciones actuales definen tu reputación digital del mañana.',
            type: 'video', typeLabel: 'Video Animado', icon: 'play_circle',
            badge: 'Multimedia', duration: '3 min',
            colorClass: 'from-sky-400 to-blue-600',
            actionLabel: 'Ver Video', link: '#',
          },
          {
            id: 'guia-seguridad',
            title: 'Guía: Checklist de Privacidad en Redes',
            description: 'Pasos rápidos en formato interactivo para configurar TikTok, Instagram y WhatsApp con máxima privacidad y seguridad.',
            type: 'guide', typeLabel: 'Guía PDF', icon: 'description',
            badge: 'Descargable', duration: '4 páginas',
            colorClass: 'from-rose-400 to-rose-600',
            actionLabel: 'Descargar PDF', link: '#',
          },
        ],
      },
      {
        id: 'preparatoria', title: 'Preparatoria', subtitle: '15 a 17 años',
        imageUrl: '/adolescentes_portadas/PREPARATORIA.jpg', imageId: 'sub-teens-prep',
        bgClass: 'from-fuchsia-500 to-pink-500', icon: 'school', resourceCount: 17,
        comingSoonTeaser: {
          badgeIcon: '3d_rotation',
          badgeLabel: 'Laboratorio de Huella Digital',
          title: 'Próximamente: Simulador de Huella Digital 3D',
          description: 'Un simulador de decisiones avanzadas en la preparatoria para entender cómo tus datos e historial de navegación alimentan los perfiles algorítmicos comerciales.',
          gradientClass: 'bg-gradient-to-r from-fuchsia-600 to-pink-600',
          buttonColorClass: 'text-pink-700',
        },
        levelResources: [
          {
            id: 'simulador-huella-3d',
            title: 'Simulador 3D: Huella Digital Permanente',
            description: 'Toma decisiones cruciales a lo largo de una semana de vida digital y visualiza quién y cómo rastrea tu actividad en internet.',
            type: 'game', typeLabel: 'Simulador 3D', icon: '3d_rotation',
            badge: 'Avanzado', duration: '12 min',
            colorClass: 'from-purple-600 to-pink-600',
            actionLabel: 'Explorar Simulador', link: '#',
          },
          {
            id: 'fake-news-academy',
            title: 'Academia de Desinformación',
            description: 'Juego interactivo para aprender a detectar fake news, imágenes generadas por IA y deepfakes en redes sociales.',
            type: 'game', typeLabel: 'Minijuego', icon: 'fact_check',
            badge: 'Nuevo', duration: '10 min',
            colorClass: 'from-amber-500 to-orange-600',
            actionLabel: 'Comenzar Reto', link: '#',
          },
          {
            id: 'video-algoritmo',
            title: 'Cápsula: La burbuja del filtro y los algoritmos',
            description: 'Descubre cómo las redes sociales seleccionan el contenido que ves y aprende hacks sencillos para salir de su bucle infinito.',
            type: 'video', typeLabel: 'Video Animado', icon: 'smart_screen',
            badge: 'Recomendado', duration: '5 min',
            colorClass: 'from-cyan-400 to-blue-500',
            actionLabel: 'Ver Video', link: '#',
          },
          {
            id: 'guia-bienestar',
            title: 'Guía: Hacks de Desintoxicación Digital',
            description: 'Estrategias y trucos validados por expertos para reducir el uso excesivo de pantallas y mejorar tu sueño sin desconectarte de tus amigos.',
            type: 'guide', typeLabel: 'Guía PDF', icon: 'spa',
            badge: 'Descargable', duration: '6 páginas',
            colorClass: 'from-rose-400 to-rose-500',
            actionLabel: 'Descargar Guía', link: '#',
          },
        ],
      },
    ],
    topics: [
      { icon: 'visibility_off', title: 'Privacidad real',         description: 'Configurar bien tus cuentas.',      bgClass: 'bg-violet-500' },
      { icon: 'forum',          title: 'Convivir en redes',       description: 'Cómo lidiar con el conflicto.',     bgClass: 'bg-fuchsia-500' },
      { icon: 'fact_check',     title: 'Detectar fake news',      description: 'Verificar antes de compartir.',     bgClass: 'bg-pink-500' },
      { icon: 'edit_note',      title: 'Crear contenido',         description: 'Pasar de consumir a producir.',     bgClass: 'bg-purple-500' },
    ],
    recommendedSeriesSlugs: ['edutips'],
  },
  {
    slug: 'familias',
    title: 'Familias',
    eyebrow: 'Para acompañar en casa',
    tagline: 'Conversaciones que sí ayudan',
    description:
      'Guías por edad, acuerdos familiares, y herramientas concretas para entender qué hacen y cómo apoyarles.',
    heroImage:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-families-hero',
    accentClass: 'from-orange-500 via-rose-500 to-red-500',
    pillBgClass: 'bg-orange-500',
    iconBgClass: 'bg-orange-500',
    icon: 'groups',
    ageRange: 'Todas las edades',
    subLevels: [
      { id: 'fam-0-5',   title: '0 - 5 años',   subtitle: 'Primera infancia',           imageUrl: '/familias_portadas/0-5.jpg', imageId: 'sub-fam-05',  bgClass: 'from-amber-400 to-orange-500',  icon: 'child_care',     resourceCount: 9 },
      { id: 'fam-6-11',  title: '6 - 11 años',  subtitle: 'Niñez',                      imageUrl: '/familias_portadas/6-11.jpg', imageId: 'sub-fam-611', bgClass: 'from-orange-500 to-rose-500',   icon: 'family_restroom',resourceCount: 11 },
      { id: 'fam-12-14', title: '12 - 14 años', subtitle: 'Adolescencia temprana',      imageUrl: '/familias_portadas/12-14.jpg', imageId: 'sub-fam-1214',bgClass: 'from-rose-500 to-pink-600',     icon: 'forum',          resourceCount: 14 },
      { id: 'fam-15-22', title: '15 - 22 años', subtitle: 'Adolescencia tardía y juventud', imageUrl: '/familias_portadas/15-22.jpg', imageId: 'sub-fam-1522',bgClass: 'from-pink-600 to-red-600',      icon: 'volunteer_activism', resourceCount: 12 },
    ],
    topics: [
      { icon: 'handshake',       title: 'Acuerdos en casa',     description: 'Reglas claras sin pelear.',         bgClass: 'bg-orange-500' },
      { icon: 'family_restroom', title: 'Conversar por edad',   description: 'Qué decir según los años.',         bgClass: 'bg-rose-500' },
      { icon: 'security',        title: 'Riesgos comunes',      description: 'Reconocer y prevenir.',             bgClass: 'bg-red-500' },
      { icon: 'volunteer_activism', title: 'Cuando algo pasa',  description: 'Dónde acudir si necesitas ayuda.',  bgClass: 'bg-amber-500' },
    ],
    recommendedSeriesSlugs: ['el-dia-que-casi'],
  },
  {
    slug: 'docentes',
    title: 'Docentes',
    eyebrow: 'Para llevar al aula',
    tagline: 'Recursos listos para clase',
    description:
      'Secuencias didácticas, proyectos por nivel y materiales descargables para integrar ciudadanía digital en cualquier asignatura.',
    heroImage:
      'https://images.unsplash.com/photo-1544717297-fa154ddad021?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-teachers-hero',
    accentClass: 'from-rose-500 via-rose-500 to-blue-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'school',
    ageRange: 'Preescolar a preparatoria',
    subLevels: [
      { id: 'doc-pre',  title: 'Preescolar',     subtitle: '3 a 5 años',   imageUrl: '/docentes_portadas/CIUDADANIA DOCENTES DIGITAL-29.jpg', imageId: 'sub-doc-pre', bgClass: 'from-rose-500 to-rose-500', icon: 'child_friendly', resourceCount: 8 },
      { id: 'doc-pb',   title: 'Primaria baja',  subtitle: '6 a 8 años',   imageUrl: '/docentes_portadas/CIUDADANIA DOCENTES DIGITAL-30.jpg', imageId: 'sub-doc-pb',  bgClass: 'from-rose-500 to-cyan-500',    icon: 'menu_book',      resourceCount: 14 },
      { id: 'doc-pa',   title: 'Primaria alta',  subtitle: '9 a 11 años',  imageUrl: '/docentes_portadas/CIUDADANIA DOCENTES DIGITAL-31.jpg', imageId: 'sub-doc-pa',  bgClass: 'from-cyan-500 to-blue-500',    icon: 'edit_note',      resourceCount: 16 },
      { id: 'doc-sec',  title: 'Secundaria',     subtitle: '12 a 14 años', imageUrl: '/docentes_portadas/CIUDADANIA DOCENTES DIGITAL-32.jpg', imageId: 'sub-doc-sec', bgClass: 'from-blue-500 to-indigo-500',  icon: 'science',        resourceCount: 13 },
      { id: 'doc-prep', title: 'Preparatoria',   subtitle: '15 a 17 años', imageUrl: '/docentes_portadas/CIUDADANIA DOCENTES DIGITAL-33.jpg', imageId: 'sub-doc-prep',bgClass: 'from-indigo-500 to-violet-500',icon: 'computer',       resourceCount: 11 },
    ],
    topics: [
      { icon: 'menu_book',  title: 'Secuencias didácticas', description: 'Planeaciones por nivel.',           bgClass: 'bg-rose-500' },
      { icon: 'task_alt',   title: 'Proyectos integradores', description: 'Aprendizaje basado en retos.',     bgClass: 'bg-rose-500' },
      { icon: 'print',      title: 'Material imprimible',    description: 'PDFs listos para imprimir.',       bgClass: 'bg-blue-500' },
      { icon: 'auto_stories', title: 'Para tu formación',    description: 'Microcursos y lecturas.',          bgClass: 'bg-cyan-500' },
    ],
    recommendedSeriesSlugs: ['edutips'],
  },
];

export const RESOURCES = [
  { id: 'r1', title: 'Videos animados', icon: 'animation', bgClass: 'bg-pink-500',    description: 'Episodios cortos con personajes que enseñan.' },
  { id: 'r2', title: 'Audiocuentos',    icon: 'graphic_eq', bgClass: 'bg-violet-500',  description: 'Para escuchar en familia o de camino a la escuela.' },
  { id: 'r3', title: 'Microlecciones',  icon: 'menu_book',  bgClass: 'bg-blue-500',    description: 'Lecciones de 3 minutos sobre temas clave.' },
  { id: 'r4', title: 'Guías y checklist', icon: 'fact_check', bgClass: 'bg-rose-500', description: 'Pasos para aplicar lo aprendido.' },
  { id: 'r5', title: 'Secuencias didácticas', icon: 'route', bgClass: 'bg-rose-500',   description: 'Planeaciones para llevar al aula.' },
  { id: 'r6', title: 'Proyectos',       icon: 'extension',  bgClass: 'bg-orange-500',  description: 'Retos colaborativos por nivel.' },
  { id: 'r7', title: 'Tutoriales imprimibles', icon: 'print', bgClass: 'bg-amber-500', description: 'PDFs listos para imprimir y trabajar.' },
  { id: 'r8', title: 'Infografías',     icon: 'insert_chart', bgClass: 'bg-cyan-500',  description: 'Resúmenes visuales para compartir.' },
];

export const HELP_SITUATIONS = [
  { id: 's1', title: 'Ciberacoso y violencia digital', icon: 'gavel',          bgClass: 'bg-rose-500',   description: 'Hostigamiento, amenazas o discurso de odio en línea.' },
  { id: 's2', title: 'Fraudes y engaños en línea',     icon: 'credit_card_off', bgClass: 'bg-orange-500', description: 'Mensajes sospechosos, sitios falsos o cobros indebidos.' },
  { id: 's3', title: 'Robo de identidad',              icon: 'badge',           bgClass: 'bg-red-500',    description: 'Suplantación de cuentas o uso indebido de tus datos.' },
  { id: 's4', title: 'Difusión sin consentimiento',    icon: 'no_photography',  bgClass: 'bg-pink-600',   description: 'Imágenes, videos o info compartidos sin tu permiso.' },
  { id: 's5', title: 'Sexting y grooming',             icon: 'warning',         bgClass: 'bg-fuchsia-600', description: 'Contacto inapropiado o presión para enviar contenido.' },
  { id: 's6', title: 'Contacto dañino',                icon: 'person_off',      bgClass: 'bg-violet-600', description: 'Personas que se acercan con malas intenciones.' },
];

export const HELP_CHANNELS = [
  {
    id: 'c1',
    title: 'Orientación y acompañamiento',
    icon: 'support_agent',
    bgClass: 'bg-rose-500',
    description: 'Guía emocional y orientación inicial para ti y tu familia.',
    primaryAction: { label: 'Ver opciones', icon: 'arrow_forward' },
    items: [
      { label: 'Línea de la Vida',  phone: '800 911 2000' },
      { label: 'SAPTEL',            phone: '55 5259 8121' },
    ],
  },
  {
    id: 'c2',
    title: 'Atención institucional',
    icon: 'account_balance',
    bgClass: 'bg-blue-600',
    description: 'Instituciones públicas que atienden el caso oficialmente.',
    primaryAction: { label: 'Ver opciones', icon: 'arrow_forward' },
    items: [
      { label: 'SIPINNA Jalisco',         phone: '33 3030 4500' },
      { label: 'CONDUSEF (fraudes)',      phone: '55 5340 0999' },
    ],
  },
  {
    id: 'c3',
    title: 'Denuncia y seguimiento',
    icon: 'shield_lock',
    bgClass: 'bg-violet-600',
    description: 'Para presentar denuncia formal y dar seguimiento legal.',
    primaryAction: { label: 'Ver opciones', icon: 'arrow_forward' },
    items: [
      { label: 'Policía Cibernética',     phone: '088' },
      { label: 'Fiscalía Jalisco',        phone: '33 3837 6000' },
    ],
  },
];

export const ABOUT_TEAM = [
  { id: 't1', name: 'Equipo pedagógico',   role: 'Diseño curricular',     icon: 'school',   bgClass: 'bg-rose-500' },
  { id: 't2', name: 'Equipo de contenidos', role: 'Producción audiovisual', icon: 'movie',    bgClass: 'bg-pink-500' },
  { id: 't3', name: 'Equipo tecnológico',  role: 'Plataforma y datos',    icon: 'memory',   bgClass: 'bg-blue-500' },
  { id: 't4', name: 'Aliados institucionales', role: 'SEP, ONGs y academia', icon: 'handshake', bgClass: 'bg-orange-500' },
];
