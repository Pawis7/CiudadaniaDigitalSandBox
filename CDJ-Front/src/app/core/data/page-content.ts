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
  id: string;
  title: string;
  description: string;
  type: 'game' | 'video' | 'guide' | 'activity';
  typeLabel: string;
  icon: string;
  badge: string;
  duration: string;
  colorClass: string;
  actionLabel: string;
  link: string;
  /** Imagen de portada de la actividad. */
  coverSrc?: string;
  /** story conserva la lectura infantil; editorial superpone el contenido HTML. */
  coverMode?: 'story' | 'editorial';
  /** Conserva completa la composición de las portadas cuadradas. */
  coverAspect?: 'square';
  /** Posición opcional dentro de un sprite 3 x 3. */
  coverPosition?: string;
}

/**
 * Tarjeta de "Próximamente" que se muestra debajo del portal de recursos
 * cuando un sub-nivel tiene contenido en producción.
 */
export interface ComingSoonTeaser {
  badgeIcon: string;
  badgeLabel: string;
  title: string;
  description: string;
  /** Clases de Tailwind completas incluyendo dirección, ej. 'bg-gradient-to-r from-fuchsia-600 to-pink-600' */
  gradientClass: string;
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
  levelResources?: LevelResource[];
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
    eyebrow: 'Ciudadanía digital desde la infancia',
    tagline: 'Aprender a cuidarse, convivir y participar',
    description:
      'Ser ciudadano digital también empieza desde pequeños: aprender a usar la tecnología con cuidado, reconocer lo que sentimos, respetar a otras personas y saber cuándo pedir ayuda.',
    explanatoryText:
      'A medida que creces, también crece tu forma de participar en el mundo digital. Puedes aprender a cuidar tu información, preguntar antes de compartir algo, reconocer situaciones que no se sienten bien, tratar a los demás con respeto y disfrutar la tecnología sin dejar de lado el juego, el descanso y la convivencia.',
    heroImage:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-kids-hero',
    accentClass: 'from-rose-500 via-rose-500 to-cyan-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'face',
    ageRange: '3 a 11 años',
    subLevels: [
      {
        id: 'preescolar',
        title: 'Preescolar',
        subtitle: '3 a 5 años',
        imageUrl: '/ninasyninos/preescolar.webp',
        imageId: 'sub-kids-pre',
        bgClass: 'from-rose-400 to-rose-500',
        icon: 'child_care',
        resourceCount: 6,
        description:
          'Descubre y juega en el mundo digital con actividades sencillas, cuentos y personajes amigables.',
        levelResources: [
          {
            id: 'bit-hojas',
            coverSrc: '/cuentos/carteles/hojas.webp',
            title: 'Bit, Data y el misterio de las hojas',
            description:
              'Descubre por qué en la escuela primero va la pregunta y después se elige la herramienta que ayuda a aprender.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'eco',
            badge: '5 escenas · Preescolar',
            duration: '4 min',
            colorClass: 'from-emerald-400 to-lime-400',
            actionLabel: 'Escuchar cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-plan-casa',
            coverSrc: '/cuentos/carteles/casa.webp',
            title: 'Bit, Data y el plan de casa',
            description:
              'Aprende a acordar para qué usar una pantalla, compartirla en familia y guardarla con una transición amable.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'home',
            badge: '5 escenas · Preescolar',
            duration: '4 min',
            colorClass: 'from-orange-400 to-rose-400',
            actionLabel: 'Escuchar cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-data-mensaje-gris',
            coverSrc: '/cuentos/carteles/pausa.webp',
            title: 'Bit, Data y la pausa que cuida',
            description:
              'Acompaña a Bit y Data para descubrir que guardar, cerrar y cambiar de actividad también cuida el cuerpo y las emociones.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'menu_book',
            badge: '5 escenas · Preescolar',
            duration: '8 min',
            colorClass: 'from-sky-400 to-emerald-400',
            actionLabel: 'Escuchar cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'reconozco-emociones',
            coverSrc: '/cuentos/carteles/emociones.webp',
            title: '¡A jugar! Reconozco mis emociones',
            description:
              'Acompaña a Bit para reconocer las emociones que aparecen al usar pantallas y aprender cuándo es momento de pausar, respirar o pedir ayuda.',
            type: 'activity',
            typeLabel: 'Juego guiado',
            icon: 'sentiment_satisfied',
            badge: '12 escenas · Preescolar',
            duration: '10 min',
            colorClass: 'from-rose-400 to-rose-500',
            actionLabel: 'Jugar',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-rotonda',
            coverSrc: '/cuentos/carteles/plaza.webp',
            title: 'Bit, Data y el juego de la plaza',
            description:
              'Acompaña a Bit a guardar, mirar a su alrededor y unirse al juego de las familias frente a la Rotonda.',
            type: 'activity',
            typeLabel: 'Audiocuento ilustrado',
            icon: 'groups',
            badge: '5 escenas · Preescolar',
            duration: '4 min',
            colorClass: 'from-amber-400 to-sky-400',
            actionLabel: 'Escuchar cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-foto-otra-vez',
            coverSrc: '/cuentos/carteles/foto.webp',
            title: '¡Un, dos, tres… foto otra vez!',
            description:
              'Acompaña a Bit y Data en este cuento interactivo para aprender a usar la voz y preguntar antes de tomar o mostrar una foto.',
            type: 'activity',
            typeLabel: 'Cuento interactivo',
            icon: 'photo_camera',
            badge: '5 escenas · Preescolar',
            duration: '7 min',
            colorClass: 'from-amber-400 to-rose-400',
            actionLabel: 'Escuchar cuento',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'primaria-baja',
        title: 'Primaria baja',
        subtitle: '6 a 8 años',
        imageUrl: '/ninasyninos/primaria-baja.webp',
        imageId: 'sub-kids-pb',
        bgClass: 'from-rose-400 to-cyan-500',
        icon: 'auto_stories',
        resourceCount: 4,
        description:
          'Lecturas con una persona adulta para reconocer emociones, pedir ayuda y usar la tecnología con un propósito.',
        levelResources: [
          {
            id: 'bit-puente-por-terminar',
            title: 'Bit y el puente por terminar',
            coverSrc: '/cuentos/PrimariaBaja/bit-puente-por-terminar/01-portada.webp',
            description: 'Bit quiere terminar su puente. Su papá lo acompaña a reconocer el enojo, guardar el juego y seguir construyendo con bloques.',
            type: 'activity',
            typeLabel: 'Cuento para leer',
            icon: 'auto_stories',
            badge: 'Lectura acompañada · 6 a 8 años',
            duration: '5–7 min',
            colorClass: 'from-orange-400 to-amber-500',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-ventana-inesperada',
            title: 'Bit y la ventana inesperada',
            coverSrc: '/cuentos/PrimariaBaja/bit-ventana-inesperada/01-portada.webp',
            description: 'Bit y su mamá aprenden a doblar un avión de papel. Una ventana tapa el video: Bit se detiene y su mamá revisa qué pasó.',
            type: 'activity',
            typeLabel: 'Cuento para leer',
            icon: 'auto_stories',
            badge: 'Lectura acompañada · 6 a 8 años',
            duration: '5–7 min',
            colorClass: 'from-sky-500 to-blue-600',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-boton-brillante',
            title: 'Bit y el botón brillante',
            coverSrc: '/cuentos/PrimariaBaja/bit-boton-brillante/01-portada.webp',
            description: 'Un botón promete una estrella y pide datos. Bit no lo pulsa: su abuela está a su lado para revisar y ayudarlo.',
            type: 'activity',
            typeLabel: 'Cuento para leer',
            icon: 'auto_stories',
            badge: 'Lectura acompañada · 6 a 8 años',
            duration: '5–7 min',
            colorClass: 'from-violet-500 to-fuchsia-500',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'bit-cartel-clase',
            title: 'Bit y el cartel de la clase',
            coverSrc: '/cuentos/PrimariaBaja/bit-cartel-clase/01-portada.webp',
            description: 'Bit y Data crean un cartel de mariposas con su maestra. Usan la cámara acompañados, piden permiso y reconocen las ideas de cada quien.',
            type: 'activity',
            typeLabel: 'Cuento para leer',
            icon: 'auto_stories',
            badge: 'Lectura acompañada · 6 a 8 años',
            duration: '5–7 min',
            colorClass: 'from-teal-500 to-cyan-500',
            actionLabel: 'Leer cuento',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'primaria-alta',
        title: 'Primaria alta',
        subtitle: '9 a 11 años',
        imageUrl: '/ninasyninos/primaria-alta.webp',
        imageId: 'sub-kids-pa',
        bgClass: 'from-cyan-400 to-blue-500',
        icon: 'auto_stories',
        resourceCount: 7,
        description:
          'Piensa, participa y toma mejores decisiones en línea con retos, historias y recursos interactivos.',
        levelResources: [
          {
            id: 'luna-cajita-importante',
            coverSrc: '/cuentos/primaria/carteles/luna.webp',
            title: 'Luna y la cajita de las cosas importantes',
            description:
              'Ayuda a Luna a decidir qué datos necesita una aplicación, revisar permisos y cuidar lo que una foto, una ubicación o una grabación pueden revelar.',
            type: 'activity',
            typeLabel: 'Cuento interactivo',
            icon: 'menu_book',
            badge: '4 decisiones · 9 a 11 años',
            duration: '8 min',
            colorClass: 'from-sky-400 to-violet-400',
            actionLabel: 'Abrir cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'detectives-pistas',
            coverSrc: '/cuentos/primaria/carteles/detectives.webp',
            title: 'Detectives de las pistas',
            description:
              'Investiga un aviso escolar: compara quién lo publicó, cuándo apareció y qué pruebas lo respaldan antes de compartirlo.',
            type: 'activity',
            typeLabel: 'Misión interactiva',
            icon: 'fact_check',
            badge: '4 retos · 9 a 11 años',
            duration: '6–8 min',
            colorClass: 'from-amber-400 to-sky-500',
            actionLabel: 'Empezar misión',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'mural-buenas-ideas',
            coverSrc: '/cuentos/primaria/carteles/mural.webp',
            title: 'El mural de las buenas ideas',
            description:
              'Crea un mural con tu grupo: acuerda qué incluir, pide permiso, reconoce a quienes aportaron y comenta con respeto.',
            type: 'activity',
            typeLabel: 'Misión interactiva',
            icon: 'palette',
            badge: '4 retos · 9 a 11 años',
            duration: '6–8 min',
            colorClass: 'from-violet-400 to-rose-400',
            actionLabel: 'Empezar misión',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'castillo-cambio',
            coverSrc: '/cuentos/primaria/carteles/castillo.webp',
            title: 'El castillo que cambió',
            description:
              'Mara entra a un castillo que cambia de pronto. Ayúdala a salir, contar lo ocurrido y revisar con su papá qué experiencias son adecuadas para ella.',
            type: 'activity',
            typeLabel: 'Cuento interactivo',
            icon: 'menu_book',
            badge: '4 decisiones · 9 a 11 años',
            duration: '8 min',
            colorClass: 'from-amber-400 to-sky-500',
            actionLabel: 'Abrir cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'mision-puede-esperar',
            coverSrc: '/cuentos/primaria/carteles/mision.webp',
            title: 'La misión puede esperar',
            description:
              'Leo quiere conservar una recompensa diaria, pero llegó la hora de cerrar. Acompáñalo a hablar con su abuela y cuidar el descanso y sus acuerdos.',
            type: 'activity',
            typeLabel: 'Cuento interactivo',
            icon: 'menu_book',
            badge: '4 decisiones · 9 a 11 años',
            duration: '8 min',
            colorClass: 'from-cyan-400 to-amber-400',
            actionLabel: 'Abrir cuento',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'monedas-gratis',
            coverSrc: '/cuentos/primaria/carteles/monedas.webp',
            title: 'Monedas gratis… ¿seguro?',
            description:
              'En un mundo virtual aparecen mensajes y ofertas de monedas o premios. Aprende a pausar cuando algo te pide datos o te presiona.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Primaria alta',
            duration: '5 min',
            colorClass: 'from-cyan-500 to-blue-600',
            actionLabel: 'Iniciar Simulación',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'el-mundo-privado',
            coverSrc: '/cuentos/primaria/carteles/mundo.webp',
            title: 'El mundo privado',
            description:
              'Explora invitaciones, chats y salas privadas en un mundo virtual simulado. Aprende a poner límites y cuándo bloquear, reportar o pedir ayuda.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Primaria alta',
            duration: '5 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Iniciar Simulación',
            link: '#widget-seccion-anchor',
          },
        ],
      },
    ],
    topics: [
      {
        icon: 'shield_person',
        title: 'Cuidado en línea',
        description: 'Saber qué compartir y qué no.',
        bgClass: 'bg-rose-500',
      },
      {
        icon: 'sentiment_calm',
        title: 'Buen trato',
        description: 'Tratar bonito y poner límites.',
        bgClass: 'bg-rose-500',
      },
      {
        icon: 'palette',
        title: 'Crear y descubrir',
        description: 'Hacer arte digital y aprender.',
        bgClass: 'bg-cyan-500',
      },
      {
        icon: 'schedule',
        title: 'Tiempo en pantalla',
        description: 'Equilibrio entre jugar y descansar.',
        bgClass: 'bg-sky-500',
      },
    ],
    recommendedSeriesSlugs: ['edutips', 'el-dia-que-casi'],
    bottomBanner: {
      title: 'Aprender también puede ser divertido.',
      description: 'Actividades, juegos y retos para seguir explorando y aprendiendo cada día.',
      buttonLabel: 'Ver actividades',
      buttonHref: '#portal-recursos-anchor',
    },
  },
  {
    slug: 'adolescentes',
    title: 'Adolescentes',
    eyebrow: 'Tu ciudadanía también es digital',
    tagline: 'Decidir, participar y convivir en línea',
    description:
      'Ser ciudadano digital implica tomar decisiones sobre lo que compartes, cómo te relacionas, qué información consumes y de qué manera participas en los espacios digitales que forman parte de tu vida.',
    explanatoryText:
      'En la adolescencia tienes cada vez más autonomía en línea. Eso también implica aprender a cuidar tu privacidad y tu identidad, reconocer engaños y presiones, verificar información, respetar a otras personas y entender que tus acciones digitales tienen efectos dentro y fuera de la pantalla.',
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
        id: 'secundaria',
        title: 'Secundaria',
        subtitle: '12 a 14 años',
        imageUrl: '/adolescentes/secundaria.webp',
        imageId: 'sub-teens-sec',
        bgClass: 'from-violet-500 to-fuchsia-500',
        icon: 'backpack',
        resourceCount: 8,
        description:
          'Recursos para comprender tu mundo digital, construir relaciones sanas y tomar decisiones informadas.',
        levelResources: [
          {
            id: 'quien-entra-mi-mundo',
            coverSrc: '/adolescentes/cards/quien-entra-mi-mundo.webp',
            coverMode: 'editorial',
            title: '¿Quién entra a mi mundo?',
            description:
              'Ayuda a Mini a decidir qué hacer cuando alguien desconocido quiere entrar a su juego, manda mensajes secretos o pregunta datos personales en MiniMundo.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo · Secundaria',
            duration: '5–7 min',
            colorClass: 'from-teal-500 to-violet-600',
            actionLabel: 'Entrar al mundo',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'app-no-se-acaba',
            title: 'La app que no se acaba',
            description:
              'Ayuda a Leo a descubrir por qué una app puede jalar su atención aunque ya quiera salir. No se trata de odiar la tecnología: se trata de usarla con más control.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'schedule',
            badge: 'Laboratorio de atención',
            duration: '10 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Laboratorio',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'candado-rapido',
            coverSrc: '/adolescentes/cards/candado-rapido.webp',
            coverMode: 'editorial',
            title: 'Candado Rápido',
            description:
              'Audita el perfil ficticio de Ana, detecta la exposición de datos y prioriza 3 candados de privacidad para protegerla.',
            type: 'activity',
            typeLabel: 'Cuestionario',
            icon: 'lock',
            badge: 'Auditoría Visual',
            duration: '8 min',
            colorClass: 'from-violet-600 to-fuchsia-700',
            actionLabel: 'Iniciar Auditoría',
            link: '#simulador-fraudes-anchor',
          },
          {
            id: 'simulador-fraudes',
            coverSrc: '/adolescentes/cards/simulador-fraudes.webp',
            coverMode: 'editorial',
            title: 'Simulador de Fraudes por Chat',
            description:
              'Enfréntate a chats sospechosos simulados en un entorno virtual realista. Aprende a detectar enlaces trampa, cobros falsos y extorsiones de forma segura.',
            type: 'game',
            typeLabel: 'Minijuego',
            icon: 'sports_esports',
            badge: 'Simulación Móvil',
            duration: '5 min',
            colorClass: 'from-violet-600 to-indigo-700',
            actionLabel: 'Iniciar Simulación',
            link: '#simulador-fraudes-anchor',
          },
          {
            id: 'presion-pares',
            coverSrc: '/adolescentes/cards/presion-pares.webp',
            coverMode: 'editorial',
            title: 'Simulador de Presión de Pares',
            description:
              'Entra a una escena de chat y decide cómo responder sin seguir la corriente, sin atacar y sin dejar sola a la persona afectada.',
            type: 'game',
            typeLabel: 'Minijuego',
            icon: 'groups',
            badge: 'Presión Social',
            duration: '8–12 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Simulación',
            link: '#simulador-fraudes-anchor',
          },
          {
            id: 'limites-chats',
            coverSrc: '/adolescentes/cards/limites-chats.webp',
            coverMode: 'editorial',
            title: '¿Cómo pongo límites sin bronca en chats y redes?',
            description:
              'Afronta situaciones reales de presión o burla en chats grupales y privados. Toma decisiones y obtén tu perfil de límites personalizado.',
            type: 'activity',
            typeLabel: 'Cuestionario',
            icon: 'chat',
            badge: 'Dos casos interactivos',
            duration: '12 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar Actividad',
            link: '#simulador-fraudes-anchor',
          },
          {
            id: 'sticker-control',
            coverSrc: '/adolescentes/cards/sticker-control.webp',
            coverMode: 'editorial',
            title: 'El sticker que se salió de control',
            description:
              'Un taller interactivo de reparación digital. Toma decisiones ante la difusión de una foto sin consentimiento y diseña un mapa para frenar el daño.',
            type: 'game',
            typeLabel: 'Simulador interactivo',
            icon: 'safety_check',
            badge: 'Reparación Digital v3',
            duration: '10 a 15 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Iniciar Taller',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'el-carino-no-pide-contrasenas',
            coverSrc: '/adolescentes/cards/el-carino-no-pide-contrasenas.webp',
            coverMode: 'editorial',
            title: 'El cariño no pide contraseñas',
            description:
              'Caso interactivo para reconocer control digital, cuidar tu privacidad y poner límites claros en tus relaciones digitales.',
            type: 'game',
            typeLabel: 'Simulador interactivo',
            icon: 'lock_person',
            badge: 'Límites y Pareja',
            duration: '12 a 18 min',
            colorClass: 'from-orange-500 to-red-600',
            actionLabel: 'Iniciar Caso',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'chat-en-llamas',
            coverSrc: '/adolescentes/cards/chat-en-llamas.webp',
            coverMode: 'editorial',
            title: 'Chat en llamas',
            description:
              'Práctica cómo bajar la tensión cuando una broma, captura o meme empieza a salirse de control en un chat grupal.',
            type: 'game',
            typeLabel: 'Simulador interactivo',
            icon: 'local_fire_department',
            badge: 'Bajar la tensión',
            duration: '15 min',
            colorClass: 'from-orange-600 to-amber-700',
            actionLabel: 'Iniciar Caso',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'preparatoria',
        title: 'Bachillerato',
        subtitle: '15 a 17 años',
        imageUrl: '/adolescentes/preparatoria.webp',
        imageId: 'sub-teens-prep',
        bgClass: 'from-fuchsia-500 to-pink-500',
        icon: 'school',
        resourceCount: 6,
        description:
          'Herramientas para profundizar, participar y prepararte para los retos del mundo digital y real.',
        levelResources: [
          {
            id: 'la-voz-en-el-squad',
            coverSrc: '/adolescentes/cards/la-voz-en-el-squad.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'La voz en el squad',
            description:
              'Audita el ambiente y decide cómo actuar ante sexismo, hostigamiento en voz y clips de burla dentro de un squad competitivo gamer.',
            type: 'game',
            typeLabel: 'Minijuego',
            icon: 'sports_esports',
            badge: 'Simulación Móvil',
            duration: '6–8 min',
            colorClass: 'from-pink-600 to-purple-700',
            actionLabel: 'Entrar al Servidor',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'no-lo-hagas-viral',
            coverSrc: '/adolescentes/cards/no-lo-hagas-viral.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'No lo hagas viral',
            description:
              'Recorre un feed con clips de burla, capturas y reposts de tu servidor gamer y decide cómo actuar para frenar la difusión y el ciberacoso.',
            type: 'game',
            typeLabel: 'Minijuego',
            icon: 'sports_esports',
            badge: 'Simulación Móvil',
            duration: '5–7 min',
            colorClass: 'from-indigo-600 to-pink-700',
            actionLabel: 'Entrar al Feed',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'perfil-fantasma',
            coverSrc: '/adolescentes/cards/perfil-fantasma.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'Perfil fantasma',
            description:
              'Decide cómo presentarte, proteger tu privacidad, responder a presión sobre tu voz y fijar límites claros en tu servidor gamer.',
            type: 'game',
            typeLabel: 'Minijuego',
            icon: 'sports_esports',
            badge: 'Simulación Móvil',
            duration: '5–7 min',
            colorClass: 'from-teal-600 to-indigo-700',
            actionLabel: 'Entrar al Servidor',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'jugada-problema',
            coverSrc: '/adolescentes/cards/jugada-problema.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'La jugada no era el problema',
            description:
              'Entras a Vortex Squad después de una partida intensa. Hay clips, DMs y decisiones de moderación. Elige cómo participar desde dentro de la comunidad.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo',
            duration: '6–8 min',
            colorClass: 'from-amber-500 to-pink-600',
            actionLabel: 'Entrar al Servidor',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'el-servidor-de-discor',
            coverSrc: '/adolescentes/cards/el-servidor-de-discor.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'El servidor de Discor',
            description:
              'Te invitan a un servidor de clan. Al principio parece una oportunidad. Luego aparecen presión, voz, secreto y un pago raro.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo',
            duration: '4 min',
            colorClass: 'from-blue-600 to-indigo-700',
            actionLabel: 'Entrar al Servidor',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'el-mercado-gamer',
            coverSrc: '/adolescentes/cards/el-mercado-gamer.webp',
            coverMode: 'editorial',
            coverAspect: 'square',
            title: 'El mercado fuera de la plataforma',
            description:
              'Skins, cuentas y ofertas tentadoras. Decidirás en contexto si confiar, pagar o reportar ante tratos informales en comunidades gamer.',
            type: 'activity',
            typeLabel: 'Caso interactivo',
            icon: 'sports_esports',
            badge: 'Caso interactivo',
            duration: '4–5 min',
            colorClass: 'from-[#f5b731] to-[#f97316]',
            actionLabel: 'Entrar al Mercado',
            link: '#widget-seccion-anchor',
          },
        ],
      },
    ],
    topics: [
      {
        icon: 'visibility_off',
        title: 'Privacidad real',
        description: 'Configurar bien tus cuentas.',
        bgClass: 'bg-violet-500',
      },
      {
        icon: 'forum',
        title: 'Convivir en redes',
        description: 'Cómo lidiar con el conflicto.',
        bgClass: 'bg-fuchsia-500',
      },
      {
        icon: 'fact_check',
        title: 'Detectar fake news',
        description: 'Verificar antes de compartir.',
        bgClass: 'bg-pink-500',
      },
      {
        icon: 'edit_note',
        title: 'Crear contenido',
        description: 'Pasar de consumir a producir.',
        bgClass: 'bg-purple-500',
      },
    ],
    recommendedSeriesSlugs: ['edutips'],
    bottomBanner: {
      title: 'Tu voz también construye ciudadanía digital.',
      description: 'Comparte ideas, participa y transforma tu comunidad digital.',
      buttonLabel: 'Conoce más',
      buttonHref: '/series',
    },
  },
  {
    slug: 'familias',
    title: 'Familias',
    eyebrow: 'Ciudadanía digital en familia',
    tagline: 'Acompañar también es educar para lo digital',
    description:
      'La ciudadanía digital también se construye en casa. Durante la niñez y la adolescencia, las familias ayudan a formar hábitos, criterios y acuerdos acordes con la edad. Con personas jóvenes de 18 a 22 años, el apoyo se ofrece de común acuerdo y respeta su autonomía.',
    explanatoryText:
      'Acompañar no significa vigilar cada paso ni saber más de tecnología que tus hijas e hijos. Significa estar presente, conversar, poner límites adecuados a la edad, cuidar la privacidad, reconocer riesgos y enseñar con el ejemplo cómo convivir, informarse y actuar responsablemente también en los espacios digitales.',
    heroImage:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-families-hero',
    accentClass: 'from-orange-500 via-rose-500 to-red-500',
    pillBgClass: 'bg-orange-500',
    iconBgClass: 'bg-orange-500',
    icon: 'groups',
    ageRange: 'Todas las edades',
    subLevels: [
      {
        id: 'fam-0-5',
        title: '0 - 5 años',
        subtitle: 'Primera infancia',
        imageUrl: '/familias/0-5.webp',
        imageId: 'sub-fam-05',
        bgClass: 'from-amber-400 to-orange-500',
        icon: 'child_care',
        resourceCount: 0,
        description: 'Primeros pasos en el mundo digital. Hábitos saludables desde pequeños.',
      },
      {
        id: 'fam-6-11',
        title: '6 - 11 años',
        subtitle: 'Niñez',
        imageUrl: '/familias/6-11.webp',
        imageId: 'sub-fam-611',
        bgClass: 'from-orange-500 to-rose-500',
        icon: 'family_restroom',
        resourceCount: 2,
        description: 'Exploran, aprenden y se conectan. Acompáñalos con límites y confianza.',
        levelResources: [
          {
            id: 'presencia-adulta',
            title: 'Autorrevisión: presencia digital adulta en casa',
            description:
              '¿Tu uso del celular te quita atención con tus hijos de 6 a 11 años? Evalúa tus hábitos y obtén tu plan y workbook de seguimiento de 7 días.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'volunteer_activism',
            badge: 'Autorrevisión + cuaderno',
            duration: '5 min',
            colorClass: 'from-orange-500 to-rose-700',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'cuando-hijo-mundo-privado',
            title: 'Guía interactiva: Cuando tu hijo entra a un mundo privado',
            description:
              'Esta guía ayuda a madres, padres y cuidadores a entender juegos en línea aunque no sean usuarios. Aprende a reconocer señales de alerta, conversar con calma y acordar reglas simples.',
            type: 'guide',
            typeLabel: 'Guía interactiva',
            icon: 'family_restroom',
            badge: 'Guía + Acuerdo',
            duration: '8–10 min',
            colorClass: 'from-blue-600 to-teal-500',
            actionLabel: 'Iniciar Guía',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'fam-12-14',
        title: '12 - 14 años',
        subtitle: 'Adolescencia temprana',
        imageUrl: '/familias/12-14.webp',
        imageId: 'sub-fam-1214',
        bgClass: 'from-rose-500 to-pink-600',
        icon: 'forum',
        resourceCount: 1,
        description: 'Más independencia, nuevos retos. Dialogar es la mejor herramienta.',
        levelResources: [
          {
            id: 'riesgos-reales',
            title: 'Autorrevisión: ¿Tu casa está lista para acompañar riesgos reales en línea?',
            description:
              'Autorrevisión breve para familias que acompañan situaciones de presión, ciberacoso y exposición en línea de adolescentes de 12 a 14 años.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'shield',
            badge: 'Autorrevisión + plan',
            duration: '5–6 min',
            colorClass: 'from-rose-500 to-pink-600',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'fam-15-17',
        title: '15 - 17 años',
        subtitle: 'Adolescencia',
        imageUrl: '/familias/15-22.webp',
        imageId: 'sub-fam-1517',
        bgClass: 'from-pink-600 to-red-600',
        icon: 'volunteer_activism',
        resourceCount: 2,
        description:
          'Mayor autonomía con acuerdos claros, privacidad y una ruta de apoyo disponible.',
        levelResources: [
          {
            id: 'presencia-jovenes',
            title:
              'Autorrevisión: ¿Tu uso digital en casa te está ayudando o te está quitando presencia?',
            description:
              'Revisa si tu propio uso del celular afecta la escucha, el respeto y la presencia que necesita una o un adolescente de 15 a 17 años.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'volunteer_activism',
            badge: 'Autorrevisión + cuaderno',
            duration: '5–6 min',
            colorClass: 'from-pink-500 to-red-600',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'privacidad-dinero',
            title:
              'Autorrevisión: ¿Tu casa está lista para acompañar privacidad y dinero en la vida digital?',
            description:
              'Revisa cómo acompañar decisiones sobre privacidad, pagos, fraudes y uso de datos sin invadir su espacio personal.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'shield',
            badge: 'Autorrevisión + herramientas',
            duration: '5–6 min',
            colorClass: 'from-pink-500 to-red-600',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
        ],
      },
      {
        id: 'fam-18-22',
        title: '18 - 22 años',
        subtitle: 'Personas adultas jóvenes',
        imageUrl: '/familias/15-22.webp',
        imageId: 'sub-fam-1822',
        bgClass: 'from-red-600 to-violet-700',
        icon: 'diversity_1',
        resourceCount: 2,
        description:
          'Apoyo acordado entre personas adultas, con respeto a la privacidad, el consentimiento y la autonomía.',
        levelResources: [
          {
            id: 'presencia-jovenes',
            title: 'Autorrevisión: presencia y escucha en casa',
            description:
              'Revisa si el uso del celular está afectando la escucha y los acuerdos con las personas adultas jóvenes del hogar.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'volunteer_activism',
            badge: 'Autorrevisión + cuaderno',
            duration: '5–6 min',
            colorClass: 'from-red-500 to-violet-700',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
          {
            id: 'privacidad-dinero',
            title: 'Autorrevisión: privacidad, pagos y apoyo acordado',
            description:
              'Explora cómo ofrecer apoyo ante fraudes, pagos o uso de datos respetando la autonomía y el consentimiento de la persona adulta.',
            type: 'activity',
            typeLabel: 'Autorrevisión orientativa',
            icon: 'shield',
            badge: 'Autorrevisión + guía',
            duration: '5–6 min',
            colorClass: 'from-red-500 to-violet-700',
            actionLabel: 'Iniciar autorrevisión',
            link: '#widget-seccion-anchor',
          },
        ],
      },
    ],
    topics: [
      {
        icon: 'handshake',
        title: 'Acuerdos en casa',
        description: 'Reglas claras sin pelear.',
        bgClass: 'bg-orange-500',
      },
      {
        icon: 'family_restroom',
        title: 'Conversar por edad',
        description: 'Qué decir según los años.',
        bgClass: 'bg-rose-500',
      },
      {
        icon: 'security',
        title: 'Riesgos comunes',
        description: 'Reconocer y prevenir.',
        bgClass: 'bg-red-500',
      },
      {
        icon: 'volunteer_activism',
        title: 'Cuando algo pasa',
        description: 'Dónde acudir si necesitas ayuda.',
        bgClass: 'bg-amber-500',
      },
    ],
    recommendedSeriesSlugs: ['el-dia-que-casi'],
  },
  {
    slug: 'docentes',
    title: 'Docentes',
    eyebrow: 'Ciudadanía digital en la escuela',
    tagline: 'Formar para participar en un mundo digital',
    description:
      'La ciudadanía digital forma parte de la educación integral: implica desarrollar en el alumnado capacidades para aprender, crear, informarse, convivir y participar responsablemente en entornos mediados por tecnología.',
    explanatoryText:
      'Desde la escuela se pueden construir criterios para proteger datos personales, verificar información, respetar la autoría, prevenir violencias, convivir de manera responsable y comprender las oportunidades y los límites de las tecnologías digitales y la inteligencia artificial. El papel docente es acompañar ese aprendizaje de acuerdo con la edad y el contexto del alumnado.',
    heroImage:
      'https://images.unsplash.com/photo-1544717297-fa154ddad021?auto=format&fit=crop&q=80&w=1600',
    heroImageId: 'aud-teachers-hero',
    accentClass: 'from-rose-500 via-rose-500 to-blue-500',
    pillBgClass: 'bg-rose-500',
    iconBgClass: 'bg-rose-500',
    icon: 'school',
    ageRange: 'Preescolar a bachillerato',
    subLevels: [
      {
        id: 'doc-pre',
        title: 'Preescolar',
        subtitle: '3 a 5 años',
        imageUrl: '/docentes/preescolar.webp',
        imageId: 'sub-doc-pre',
        bgClass: 'from-rose-500 to-rose-500',
        icon: 'child_friendly',
        resourceCount: 0,
        description:
          'Actividades sencillas para iniciar hábitos digitales seguros desde edades tempranas.',
      },
      {
        id: 'doc-pb',
        title: 'Primaria baja',
        subtitle: '6 a 8 años',
        imageUrl: '/docentes/primaria-baja.webp',
        imageId: 'sub-doc-pb',
        bgClass: 'from-rose-500 to-cyan-500',
        icon: 'menu_book',
        resourceCount: 0,
        description: 'Recursos breves para conversar, jugar y aprender sobre cuidado digital.',
      },
      {
        id: 'doc-pa',
        title: 'Primaria alta',
        subtitle: '9 a 11 años',
        imageUrl: '/docentes/primaria-alta.webp',
        imageId: 'sub-doc-pa',
        bgClass: 'from-cyan-500 to-blue-500',
        icon: 'edit_note',
        resourceCount: 0,
        description: 'Materiales para fortalecer decisiones responsables y convivencia en línea.',
      },
      {
        id: 'doc-sec',
        title: 'Secundaria',
        subtitle: '12 a 14 años',
        imageUrl: '/docentes/secundaria.webp',
        imageId: 'sub-doc-sec',
        bgClass: 'from-blue-500 to-indigo-500',
        icon: 'science',
        resourceCount: 0,
        description:
          'Herramientas para dialogar sobre identidad, privacidad, riesgos y participación digital.',
      },
      {
        id: 'doc-prep',
        title: 'Bachillerato',
        subtitle: '15 a 17 años',
        imageUrl: '/docentes/preparatoria.webp',
        imageId: 'sub-doc-prep',
        bgClass: 'from-indigo-500 to-violet-500',
        icon: 'computer',
        resourceCount: 0,
        description:
          'Recursos para analizar, crear, participar y actuar con criterio en entornos digitales.',
      },
    ],
    topics: [
      {
        icon: 'menu_book',
        title: 'Secuencias didácticas',
        description: 'Planeaciones por nivel.',
        bgClass: 'bg-rose-500',
      },
      {
        icon: 'task_alt',
        title: 'Proyectos integradores',
        description: 'Aprendizaje basado en retos.',
        bgClass: 'bg-rose-500',
      },
      {
        icon: 'print',
        title: 'Material imprimible',
        description: 'PDFs listos para imprimir.',
        bgClass: 'bg-blue-500',
      },
      {
        icon: 'auto_stories',
        title: 'Para tu formación',
        description: 'Microcursos y lecturas.',
        bgClass: 'bg-cyan-500',
      },
    ],
    recommendedSeriesSlugs: ['edutips'],
    bottomBanner: {
      title: 'Herramientas listas para usar en el aula.',
      description: 'Materiales prácticos, actualizados y alineados para ahorrar tiempo.',
      buttonLabel: 'Ver secuencias',
      buttonHref: '#portal-recursos-anchor',
    },
  },
];

export const RESOURCES = [
  {
    id: 'r1',
    title: 'Videos animados',
    icon: 'animation',
    bgClass: 'bg-pink-500',
    description: 'Episodios cortos con personajes que enseñan.',
  },
  {
    id: 'r2',
    title: 'Audiocuentos',
    icon: 'graphic_eq',
    bgClass: 'bg-violet-500',
    description: 'Para escuchar en familia o de camino a la escuela.',
  },
  {
    id: 'r3',
    title: 'Microlecciones',
    icon: 'menu_book',
    bgClass: 'bg-blue-500',
    description: 'Lecciones de 3 minutos sobre temas clave.',
  },
  {
    id: 'r4',
    title: 'Guías y checklist',
    icon: 'fact_check',
    bgClass: 'bg-rose-500',
    description: 'Pasos para aplicar lo aprendido.',
  },
  {
    id: 'r5',
    title: 'Secuencias didácticas',
    icon: 'route',
    bgClass: 'bg-rose-500',
    description: 'Planeaciones para llevar al aula.',
  },
  {
    id: 'r6',
    title: 'Proyectos',
    icon: 'extension',
    bgClass: 'bg-orange-500',
    description: 'Retos colaborativos por nivel.',
  },
  {
    id: 'r7',
    title: 'Tutoriales imprimibles',
    icon: 'print',
    bgClass: 'bg-amber-500',
    description: 'PDFs listos para imprimir y trabajar.',
  },
  {
    id: 'r8',
    title: 'Infografías',
    icon: 'insert_chart',
    bgClass: 'bg-cyan-500',
    description: 'Resúmenes visuales para compartir.',
  },
];

export const HELP_SITUATIONS = [
  {
    id: 's1',
    title: 'Ciberacoso y violencia digital',
    icon: 'gavel',
    bgClass: 'bg-rose-500',
    description: 'Hostigamiento, amenazas o discurso de odio en línea.',
  },
  {
    id: 's2',
    title: 'Fraudes y engaños en línea',
    icon: 'credit_card_off',
    bgClass: 'bg-orange-500',
    description: 'Mensajes sospechosos, sitios falsos o cobros indebidos.',
  },
  {
    id: 's3',
    title: 'Robo de identidad',
    icon: 'badge',
    bgClass: 'bg-red-500',
    description: 'Suplantación de cuentas o uso indebido de tus datos.',
  },
  {
    id: 's4',
    title: 'Difusión sin consentimiento',
    icon: 'no_photography',
    bgClass: 'bg-pink-600',
    description: 'Imágenes, videos o info compartidos sin tu permiso.',
  },
  {
    id: 's5',
    title: 'Sexting y grooming',
    icon: 'warning',
    bgClass: 'bg-fuchsia-600',
    description: 'Contacto inapropiado o presión para enviar contenido.',
  },
  {
    id: 's6',
    title: 'Contacto dañino',
    icon: 'person_off',
    bgClass: 'bg-violet-600',
    description: 'Personas que se acercan con malas intenciones.',
  },
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
      { label: 'Línea de la Vida', phone: '800 911 2000' },
      { label: 'SAPTEL', phone: '55 5259 8121' },
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
      { label: 'SIPINNA Jalisco', phone: '33 3030 4500' },
      { label: 'CONDUSEF (fraudes)', phone: '55 5340 0999' },
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
      { label: 'Policía Cibernética', phone: '088' },
      { label: 'Fiscalía Jalisco', phone: '33 3837 6000' },
    ],
  },
];

export const ABOUT_TEAM = [
  {
    id: 't1',
    name: 'Equipo pedagógico',
    role: 'Diseño curricular',
    icon: 'school',
    bgClass: 'bg-rose-500',
  },
  {
    id: 't2',
    name: 'Equipo de contenidos',
    role: 'Producción audiovisual',
    icon: 'movie',
    bgClass: 'bg-pink-500',
  },
  {
    id: 't3',
    name: 'Equipo tecnológico',
    role: 'Plataforma y datos',
    icon: 'memory',
    bgClass: 'bg-blue-500',
  },
  {
    id: 't4',
    name: 'Aliados institucionales',
    role: 'SEP, ONGs y academia',
    icon: 'handshake',
    bgClass: 'bg-orange-500',
  },
];
