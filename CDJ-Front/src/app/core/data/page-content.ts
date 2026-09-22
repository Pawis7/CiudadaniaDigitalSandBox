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
  type:        'game' | 'video' | 'guide' | 'activity';
  typeLabel:   string;
  icon:        string;
  badge:       string;
  duration:    string;
  colorClass:  string;
  actionLabel: string;
  link:        string;
  imageUrl?:   string;
  coverUrl?:   string;
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
  description?: string;
  /** Recursos interactivos disponibles en este sub-nivel. */
  levelResources?:   LevelResource[];
  /** Si existe, muestra un teaser de contenido próximo debajo del portal. */
  comingSoonTeaser?: ComingSoonTeaser;
}

export interface AudienceBottomBanner {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface AudiencePage {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  explanatoryText?: string;
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
  bottomBanner?: AudienceBottomBanner;
}

export const AUDIENCE_PAGES: AudiencePage[] = [
  {
    slug: 'ninas-y-ninos',
    title: 'Niñas y niños',
    eyebrow: 'Para los más pequeños',
    tagline: 'Aprender jugando, con calma y compañía',
    description:
      'Este es un espacio en el que encontrarás la serie animada “El día que casi” (con Lelé, Trapo, Nails, Pixi, Lucho, Bot, Paper, Gary, Bunny y Been), juegos, historias interactivas, postales y recursos para cuidar tu huella digital y navegar seguro.',
    explanatoryText:
      'Internet es un lugar increíble… ¡Pero también hay que saber moverse por ahí! Con el Escuadrón Digital aprenderás a utilizar los superpoderes que todo ciudadano digital necesita para proteger tu privacidad, evitar trampas o engaños y divertirte en un entorno seguro.',
    heroImage:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-kids-hero',
    accentClass: 'from-rose-500 via-rose-500 to-cyan-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'face',
    ageRange: '5 a 11 años',
    subLevels: [
      { 
        id: 'preescolar',     
        title: 'Preescolar',    
        subtitle: '3 a 5 años',  
        imageUrl: '/ninasyninos/preescolar.webp', 
        imageId: 'sub-kids-pre', 
        bgClass: 'from-rose-400 to-rose-500', 
        icon: 'child_care', 
        resourceCount: 12, 
        description: 'Descubre y juega en el mundo digital con actividades sencillas, cuentos y personajes amigables.',
        levelResources: [
          {
            id: 'reconozco-emociones',
            title: '¡A jugar! Reconozco mis emociones',
            description: 'Acompaña a Bit en esta aventura para identificar sus emociones digitales y aprender cuándo es momento de pausar, respirar o pedir ayuda.',
            imageUrl: '/ninasyninos/Portadas_Recursos/ReconozcoEmociones.jpg',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sentiment_satisfied',
            badge: '12 escenas · Preescolar',
            duration: '10 min',
            colorClass: 'from-rose-400 to-rose-500',
            actionLabel: 'Jugar',
            link: '#widget-seccion-anchor'
          },
          {
            id: 'bit-data-mensaje-gris',
            title: 'Bit, Data y el misterio del mensaje gris',
            description: 'Acompaña a Bit y Data en este cuento ilustrado para aprender a cerrar y contar cuando aparece un mensaje gris con palabras rudas.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'menu_book',
            badge: '5 páginas · Preescolar',
            duration: '8 min',
            colorClass: 'from-sky-400 to-emerald-400',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor'
          },
          {
            id: 'bit-foto-otra-vez',
            title: '¡Un, dos, tres… foto otra vez!',
            description: 'Acompaña a Bit y Data en este cuento interactivo para aprender a usar la voz y preguntar antes de tomar o mostrar una foto.',
            imageUrl: '/ninasyninos/Portadas_Recursos/123Cuento.jpg',
            type: 'activity',
            typeLabel: 'Cuento interactivo',
            icon: 'photo_camera',
            badge: '5 escenas · Preescolar',
            duration: '7 min',
            colorClass: 'from-amber-400 to-rose-400',
            actionLabel: 'Abrir cuento',
            link: '#widget-seccion-anchor'
          }
        ]
      },
      {
        id: 'primaria-baja',
        title: 'Primaria baja',
        subtitle: '6 a 8 años',
        imageUrl: '/ninasyninos/primaria-baja.webp',
        imageId: 'sub-kids-pb',
        bgClass: 'from-rose-400 to-cyan-500',
        icon: 'auto_stories',
        resourceCount: 18,
        description: 'Aprende, crea y cuida tu mundo digital con videos, juegos y actividades breves.',
        levelResources: [
          {
            id: 'quien-entra-mi-mundo',
            title: '¿Quién entra a mi mundo?',
            description: 'Ayuda a Mini a decidir qué hacer cuando alguien desconocido quiere entrar a su juego, manda mensajes secretos o pregunta datos personales en MiniMundo.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Primaria baja',
            duration: '5–7 min',
            colorClass: 'from-teal-500 to-violet-600',
            actionLabel: 'Entrar al mundo',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'luna-cajita-importante',
            title: 'Luna y la cajita de las cosas importantes',
            description: 'Acompaña a Luna en este cuento ilustrado para aprender que hay cosas muy valiosas —como tu nombre, tu foto o tu voz— que se cuidan con ayuda de un adulto.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'menu_book',
            badge: '5 páginas · Primaria baja',
            duration: '8 min',
            colorClass: 'from-sky-400 to-violet-400',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor',
          }
        ]
      },
      {
        id: 'primaria-alta',
        title: 'Primaria alta',
        subtitle: '9 a 11 años',
        imageUrl: '/ninasyninos/primaria-alta.webp',
        imageId: 'sub-kids-pa',
        bgClass: 'from-cyan-400 to-blue-500',
        icon: 'auto_stories',
        resourceCount: 22,
        description: 'Piensa, participa y toma mejores decisiones en línea con retos, historias y recursos interactivos.',
        levelResources: [
          {
            id: 'monedas-gratis',
            title: 'Monedas gratis… ¿seguro?',
            description: 'En Rubloox aparecieron mensajes, links, pantallas y solicitudes relacionadas con monedas o premios. Aprende a pausar cuando algo te pide datos o te presiona.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Primaria alta',
            duration: '5 min',
            colorClass: 'from-cyan-500 to-blue-600',
            actionLabel: 'Iniciar Simulación',
            link: '#widget-seccion-anchor'
          },
          {
            id: 'el-mundo-privado',
            title: 'El mundo privado',
            description: 'Invitaciones, chats, salas privadas y límites en un mundo virtual simulado de Rubloox. Aprende cuándo bloquear, reportar y pedir ayuda.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Primaria alta',
            duration: '5 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Iniciar Simulación',
            link: '#widget-seccion-anchor'
          }
        ]
      }

    ],
    topics: [
      { icon: 'shield_person',  title: 'Cuidado en línea',     description: 'Saber qué compartir y qué no.',    bgClass: 'bg-rose-500' },
      { icon: 'sentiment_calm', title: 'Buen trato',            description: 'Tratar bonito y poner límites.',  bgClass: 'bg-rose-500' },
      { icon: 'palette',        title: 'Crear y descubrir',     description: 'Hacer arte digital y aprender.',  bgClass: 'bg-cyan-500' },
      { icon: 'schedule',       title: 'Tiempo en pantalla',    description: 'Equilibrio entre jugar y descansar.', bgClass: 'bg-sky-500' },
    ],
    recommendedSeriesSlugs: ['edutips', 'el-dia-que-casi'],
    bottomBanner: {
      title: 'Aprender también puede ser divertido.',
      description: 'Actividades, juegos y retos para seguir explorando y aprendiendo cada día.',
      buttonLabel: 'Ver actividades',
      buttonHref: '#portal-recursos-anchor'
    }
  },
  {
    slug: 'adolescentes',
    title: 'Adolescentes',
    eyebrow: 'Para ti que ya andas en redes',
    tagline: 'Información directa, sin sermones',
    description:
      'Recursos para explorar tu vida digital con criterio, creatividad y seguridad dirigidos a adolescentes de nivel secundaria y preparatoria.',
    explanatoryText:
      'Tu vida digital también habla de ti: lo que publicas, compartes, consumes, comentas y decides puede abrir oportunidades o generar problemas. Esta sección reúne recursos para pensar antes de publicar, cuidar tu privacidad, convivir mejor, detectar engaños y participar con responsabilidad.',
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
        imageUrl: '/adolescentes/secundaria.webp', imageId: 'sub-teens-sec',
        bgClass: 'from-violet-500 to-fuchsia-500', icon: 'backpack', resourceCount: 18,
        description: 'Recursos para comprender tu mundo digital, construir relaciones sanas y tomar decisiones informadas.',
        levelResources: [
          {
            id: 'app-no-se-acaba',
            title: 'La app que no se acaba',
            description: 'Ayuda a Leo a descubrir por qué una app puede jalar su atención aunque ya quiera salir. No se trata de odiar la tecnología: se trata de usarla con más control.',
            type: 'activity', typeLabel: 'Caso interactivo', icon: 'schedule',
            badge: 'Laboratorio de atención', duration: '10 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Laboratorio', link: '#widget-seccion-anchor',
          },
          {
            id: 'candado-rapido',
            title: 'Candado Rápido',
            description: 'Audita el perfil ficticio de Ana, detecta la exposición de datos y prioriza 3 candados de privacidad para protegerla.',
            type: 'activity', typeLabel: 'Cuestionario', icon: 'lock',
            badge: 'Auditoría Visual', duration: '8 min',
            colorClass: 'from-violet-600 to-fuchsia-700',
            actionLabel: 'Iniciar Auditoría', link: '#simulador-fraudes-anchor',
          },
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
            id: 'presion-pares',
            title: 'Simulador de Presión de Pares',
            description: 'Entra a una escena de chat y decide cómo responder sin seguir la corriente, sin atacar y sin dejar sola a la persona afectada.',
            type: 'game', typeLabel: 'Minijuego', icon: 'groups',
            badge: 'Presión Social', duration: '8–12 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Simulación', link: '#simulador-fraudes-anchor',
          },
          {
            id: 'limites-chats',
            title: '¿Cómo pongo límites sin bronca en chats y redes?',
            description: 'Afronta situaciones reales de presión o burla en chats grupales y privados. Toma decisiones y obtén tu perfil de límites personalizado.',
            type: 'activity', typeLabel: 'Cuestionario', icon: 'chat',
            badge: 'Dos casos interactivos', duration: '12 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Actividad', link: '#simulador-fraudes-anchor',
          },
          {
            id: 'sticker-control',
            title: 'El sticker que se salió de control',
            description: 'Un taller interactivo de reparación digital. Toma decisiones ante la difusión de una foto sin consentimiento y diseña un mapa para frenar el daño.',
            type: 'game', typeLabel: 'Simulador interactivo', icon: 'safety_check',
            badge: 'Reparación Digital v3', duration: '10 a 15 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Iniciar Taller', link: '#widget-seccion-anchor',
          },
          {
            id: 'el-carino-no-pide-contrasenas',
            title: 'El cariño no pide contraseñas',
            description: 'Caso interactivo para reconocer control digital, cuidar tu privacidad y poner límites claros en tus relaciones digitales.',
            type: 'game', typeLabel: 'Simulador interactivo', icon: 'lock_person',
            badge: 'Límites y Pareja', duration: '12 a 18 min',
            colorClass: 'from-orange-500 to-red-600',
            actionLabel: 'Iniciar Caso', link: '#widget-seccion-anchor',
          },
          {
            id: 'chat-en-llamas',
            title: 'Chat en llamas',
            description: 'Práctica cómo bajar la tensión cuando una broma, captura o meme empieza a salirse de control en un chat grupal.',
            type: 'game', typeLabel: 'Simulador interactivo', icon: 'local_fire_department',
            badge: 'Bajar la tensión', duration: '15 min',
            colorClass: 'from-orange-600 to-amber-700',
            actionLabel: 'Iniciar Caso', link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'preparatoria', title: 'Preparatoria', subtitle: '15 a 17 años',
        imageUrl: '/adolescentes/preparatoria.webp', imageId: 'sub-teens-prep',
        bgClass: 'from-fuchsia-500 to-pink-500', icon: 'school', resourceCount: 17,
        description: 'Herramientas para profundizar, participar y prepararte para los retos del mundo digital y real.',
        levelResources: [
          {
            id: 'la-voz-en-el-squad',
            title: 'La voz en el squad',
            description: 'Audita el ambiente y decide cómo actuar ante sexismo, hostigamiento en voz y clips de burla dentro de un squad competitivo gamer.',
            type: 'game', typeLabel: 'Minijuego', icon: 'sports_esports',
            badge: 'Simulación Móvil', duration: '6–8 min',
            colorClass: 'from-pink-600 to-purple-700',
            actionLabel: 'Entrar al Servidor', link: '#widget-seccion-anchor',
          },
          {
            id: 'no-lo-hagas-viral',
            title: 'No lo hagas viral',
            description: 'Recorre un feed con clips de burla, capturas y reposts de tu servidor gamer y decide cómo actuar para frenar la difusión y el ciberacoso.',
            type: 'game', typeLabel: 'Minijuego', icon: 'sports_esports',
            badge: 'Simulación Móvil', duration: '5–7 min',
            colorClass: 'from-indigo-600 to-pink-700',
            actionLabel: 'Entrar al Feed', link: '#widget-seccion-anchor',
          },
          {
            id: 'perfil-fantasma',
            title: 'Perfil fantasma',
            description: 'Decide cómo presentarte, proteger tu privacidad, responder a presión sobre tu voz y fijar límites claros en tu servidor gamer.',
            type: 'game', typeLabel: 'Minijuego', icon: 'sports_esports',
            badge: 'Simulación Móvil', duration: '5–7 min',
            colorClass: 'from-teal-600 to-indigo-700',
            actionLabel: 'Entrar al Servidor', link: '#widget-seccion-anchor',
          },
          {
            id: 'jugada-problema',
            title: 'La jugada no era el problema',
            description: 'Entras a Vortex Squad después de una partida intensa. Hay clips, DMs y decisiones de moderación. Elige cómo participar desde dentro de la comunidad.',
            type: 'activity', typeLabel: 'Caso interactivo', icon: 'sports_esports',
            badge: 'Caso interactivo', duration: '6–8 min',
            colorClass: 'from-amber-500 to-pink-600',
            actionLabel: 'Entrar al Servidor', link: '#widget-seccion-anchor',
          },
          {
            id: 'el-servidor-de-discor',
            title: 'El servidor de Discor',
            description: 'Te invitan a un servidor de clan. Al principio parece una oportunidad. Luego aparecen presión, voz, secreto y un pago raro.',
            type: 'activity', typeLabel: 'Caso interactivo', icon: 'sports_esports',
            badge: 'Caso interactivo', duration: '4 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Entrar al Servidor', link: '#widget-seccion-anchor',
          },
          {
            id: 'el-mercado-gamer',
            title: 'El mercado fuera de la plataforma',
            description: 'Skins, cuentas y ofertas tentadoras. Decidirás en contexto si confiar, pagar o reportar ante tratos informales en comunidades gamer.',
            type: 'activity', typeLabel: 'Caso interactivo', icon: 'sports_esports',
            badge: 'Caso interactivo', duration: '4–5 min',
            colorClass: 'from-[#f5b731] to-[#f97316]',
            actionLabel: 'Entrar al Mercado', link: '#widget-seccion-anchor',
          }
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
    bottomBanner: {
      title: 'Tu voz también construye ciudadanía digital.',
      description: 'Comparte ideas, participa y transforma tu comunidad digital.',
      buttonLabel: 'Conoce más',
      buttonHref: '/series'
    }
  },
  {
    slug: 'familias',
    title: 'Familias',
    eyebrow: 'Para acompañar en casa',
    tagline: 'Conversaciones que sí ayudan',
    description:
      'Sabemos que como padres de familia o cuidadores buscan cómo acompañar a sus hijas e hijos para que sean ciudadanos digitales responsables y se cuiden al utilizar redes sociales o Inteligencia Artificial.',
    explanatoryText:
      'Acompañar la vida digital no significa saberlo todo ni controlar cada paso. Significa abrir conversaciones, construir acuerdos, reconocer riesgos y ayudar a niñas, niños y adolescentes a cuidarse y cuidar a los otros con herramientas concretas y afectivas.',
    heroImage:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-families-hero',
    accentClass: 'from-orange-500 via-rose-500 to-red-500',
    pillBgClass: 'bg-orange-500',
    iconBgClass: 'bg-orange-500',
    icon: 'groups',
    ageRange: 'Todas las edades',
    subLevels: [
      { id: 'fam-0-5',   title: '0 - 5 años',   subtitle: 'Primera infancia',           imageUrl: '/familias/0-5.webp', imageId: 'sub-fam-05',  bgClass: 'from-amber-400 to-orange-500',  icon: 'child_care',     resourceCount: 9, description: 'Primeros pasos en el mundo digital. Hábitos saludables desde pequeños.' },
      {
        id: 'fam-6-11',
        title: '6 - 11 años',
        subtitle: 'Niñez',
        imageUrl: '/familias/6-11.webp',
        imageId: 'sub-fam-611',
        bgClass: 'from-orange-500 to-rose-500',
        icon: 'family_restroom',
        resourceCount: 13,
        description: 'Exploran, aprenden y se conectan. Acompáñalos con límites y confianza.',
        levelResources: [
          {
            id: 'presencia-adulta',
            title: 'Autochequeo: Presencia digital adulta en casa',
            description: '¿Tu uso del celular te quita atención con tus hijos de 6 a 11 años? Evalúa tus hábitos y obtén tu plan y workbook de seguimiento de 7 días.',
            type: 'activity', typeLabel: 'Autochequeo', icon: 'volunteer_activism',
            badge: 'Autochequeo + Workbook', duration: '5 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Autochequeo', link: '#widget-seccion-anchor',
          },
          {
            id: 'cuando-hijo-mundo-privado',
            title: 'Guía interactiva: Cuando tu hijo entra a un mundo privado',
            description: 'Esta guía ayuda a madres, padres y cuidadores a entender juegos en línea aunque no sean usuarios. Aprende a reconocer señales de alerta, conversar con calma y acordar reglas simples.',
            type: 'guide', typeLabel: 'Guía interactiva', icon: 'family_restroom',
            badge: 'Guía + Acuerdo', duration: '8–10 min',
            colorClass: 'from-blue-600 to-teal-500',
            actionLabel: 'Iniciar Guía', link: '#widget-seccion-anchor',
          }
        ]
      },
      {
        id: 'fam-12-14',
        title: '12 - 14 años',
        subtitle: 'Adolescencia temprana',
        imageUrl: '/familias/12-14.webp',
        imageId: 'sub-fam-1214',
        bgClass: 'from-rose-500 to-pink-600',
        icon: 'forum',
        resourceCount: 15,
        description: 'Más independencia, nuevos retos. Dialogar es la mejor herramienta.',
        levelResources: [
          {
            id: 'riesgos-reales',
            title: 'Autochequeo: ¿Tu casa está lista para acompañar riesgos reales en línea?',
            description: 'Chequeo rápido para revisar la preparación familiar ante situaciones de presión, ciberacoso y exposición en línea de adolescentes de 12 a 15 años.',
            type: 'activity', typeLabel: 'Autochequeo', icon: 'shield',
            badge: 'Autochequeo + Planner', duration: '5–6 min',
            colorClass: 'from-rose-500 to-pink-600',
            actionLabel: 'Iniciar Autochequeo', link: '#widget-seccion-anchor',
          }
        ]
      },
      {
        id: 'fam-15-22',
        title: '15 - 22 años',
        subtitle: 'Adolescencia tardía y juventud',
        imageUrl: '/familias/15-22.webp',
        imageId: 'sub-fam-1522',
        bgClass: 'from-pink-600 to-red-600',
        icon: 'volunteer_activism',
        resourceCount: 13,
        description: 'Autonomía digital responsable. Acompáña sin invadir su privacidad.',
        levelResources: [
          {
            id: 'presencia-jovenes',
            title: 'Autochequeo: ¿Tu uso digital en casa te está ayudando o te está quitando presencia?',
            description: 'Revisa si tu propio uso del celular afecta la escucha, el respeto y la calidad de presencia que necesita una persona de 15 a 22 años.',
            type: 'activity',
            typeLabel: 'Autochequeo',
            icon: 'volunteer_activism',
            badge: 'Autochequeo + Workbook',
            duration: '5–6 min',
            colorClass: 'from-pink-500 to-red-600',
            actionLabel: 'Iniciar Autochequeo',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'privacidad-dinero',
            title: 'Autochequeo: ¿Tu casa está lista para acompañar privacidad y dinero en la vida digital?',
            description: 'Ayuda a familias y cuidadores a revisar si en casa existe una base suficiente para acompañar decisiones sobre privacidad, pagos, fraudes y uso de datos en jóvenes de 15 a 22 años.',
            type: 'activity',
            typeLabel: 'Autochequeo',
            icon: 'shield',
            badge: 'Autochequeo + Kit',
            duration: '5–6 min',
            colorClass: 'from-pink-500 to-red-600',
            actionLabel: 'Iniciar Autochequeo',
            link: '#widget-seccion-anchor',
          }
        ]
      },
    ],
    topics: [
      { icon: 'handshake',       title: 'Acuerdos en casa',     description: 'Reglas claras sin pelear.',         bgClass: 'bg-orange-500' },
      { icon: 'family_restroom', title: 'Conversar por edad',   description: 'Qué decir según los años.',         bgClass: 'bg-rose-500' },
      { icon: 'security',        title: 'Riesgos comunes',      description: 'Reconocer y prevenir.',             bgClass: 'bg-red-500' },
      { icon: 'volunteer_activism', title: 'Cuando algo pasa',  description: 'Dónde acudir si necesitas ayuda.',  bgClass: 'bg-amber-500' },
    ],
    recommendedSeriesSlugs: ['el-dia-que-casi'],
    bottomBanner: {
      title: 'Acompañamos a quienes cuidan.',
      description: 'Encuentra apoyo, orientación y recursos para acompañar con confianza.',
      buttonLabel: 'Conoce más',
      buttonHref: '/ayuda'
    }
  },
  {
    slug: 'docentes',
    title: 'Docentes',
    eyebrow: 'Para llevar al aula',
    tagline: 'Recursos listos para clase',
    description:
      'Tu labor docente es muy importante para nosotros: te brindamos herramientas, marcos de referencia y secuencias didácticas para fortalecer tus habilidades y formar a tus alumnos en ciudadanía digital.',
    explanatoryText:
      'La ciudadanía digital también se aprende en la escuela. Esta sección reúne recursos prácticos para el aula, orientaciones de la UNESCO sobre Inteligencia Artificial, marcos de competencias y herramientas para fortalecer la convivencia digital pacífica en la comunidad escolar.',
    heroImage:
      'https://images.unsplash.com/photo-1544717297-fa154ddad021?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-teachers-hero',
    accentClass: 'from-rose-500 via-rose-500 to-blue-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'school',
    ageRange: 'Preescolar a preparatoria',
    subLevels: [
      { id: 'doc-pre',  title: 'Preescolar',     subtitle: '3 a 5 años',   imageUrl: '/docentes/preescolar.webp', imageId: 'sub-doc-pre', bgClass: 'from-rose-500 to-rose-500', icon: 'child_friendly', resourceCount: 8, description: 'Actividades sencillas para iniciar hábitos digitales seguros desde edades tempranas.' },
      { id: 'doc-pb',   title: 'Primaria baja',  subtitle: '6 a 8 años',   imageUrl: '/docentes/primaria-baja.webp', imageId: 'sub-doc-pb',  bgClass: 'from-rose-500 to-cyan-500',    icon: 'menu_book',      resourceCount: 14, description: 'Recursos breves para conversar, jugar y aprender sobre cuidado digital.' },
      { id: 'doc-pa',   title: 'Primaria alta',  subtitle: '9 a 11 años',  imageUrl: '/docentes/primaria-alta.webp', imageId: 'sub-doc-pa',  bgClass: 'from-cyan-500 to-blue-500',    icon: 'edit_note',      resourceCount: 16, description: 'Materiales para fortalecer decisiones responsables y convivencia en línea.' },
      { id: 'doc-sec',  title: 'Secundaria',     subtitle: '12 a 14 años', imageUrl: '/docentes/secundaria.webp', imageId: 'sub-doc-sec', bgClass: 'from-blue-500 to-indigo-500',  icon: 'science',        resourceCount: 13, description: 'Herramientas para dialogar sobre identidad, privacidad, riesgos y participación digital.' },
      { id: 'doc-prep', title: 'Preparatoria',   subtitle: '15 a 17 años', imageUrl: '/docentes/preparatoria.webp', imageId: 'sub-doc-prep',bgClass: 'from-indigo-500 to-violet-500',icon: 'computer',       resourceCount: 11, description: 'Recursos para analizar, crear, participar y actuar con criterio en entornos digitales.' },
    ],
    topics: [
      { icon: 'menu_book',  title: 'Secuencias didácticas', description: 'Planeaciones por nivel.',           bgClass: 'bg-rose-500' },
      { icon: 'task_alt',   title: 'Proyectos integradores', description: 'Aprendizaje basado en retos.',     bgClass: 'bg-rose-500' },
      { icon: 'print',      title: 'Material imprimible',    description: 'PDFs listos para imprimir.',       bgClass: 'bg-blue-500' },
      { icon: 'auto_stories', title: 'Para tu formación',    description: 'Microcursos y lecturas.',          bgClass: 'bg-cyan-500' },
    ],
    recommendedSeriesSlugs: ['edutips'],
    bottomBanner: {
      title: 'Herramientas listas para usar en el aula.',
      description: 'Materiales prácticos, actualizados y alineados para ahorrar tiempo.',
      buttonLabel: 'Ver secuencias',
      buttonHref: '#portal-recursos-anchor'
    }
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
