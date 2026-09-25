import { FEATURED_VIDEOS } from './featured-videos.data';

/**
 * Índice estático de búsqueda del portal Ciudadanía Digital.
 *
 * Cada entrada representa una sección, página, instancia de apoyo, video o recurso
 * al que el usuario puede navegar directamente desde el buscador.
 *
 * Para añadir más entradas: seguir la misma forma y agregar keywords relevantes.
 */
export interface SearchEntry {
  /** Título principal del resultado */
  title: string;
  /** Texto auxiliar / descripción breve */
  description: string;
  /** URL de destino incluyendo fragmento (#ancla) si aplica */
  href: string;
  /** Nombre de la sección o categoría padre */
  section: string;
  /** Material Symbol icon name */
  icon: string;
  /** Tailwind bg color class para el chip de icono */
  color: string;
  /** Palabras clave adicionales para búsqueda full-text (en minúsculas) */
  keywords: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [

  // ── PÁGINAS PRINCIPALES ───────────────────────────────────────────────────

  {
    title: 'Inicio',
    description: 'Página principal del portal',
    href: '/',
    section: 'Navegación',
    icon: 'home',
    color: 'bg-rose-600',
    keywords: ['inicio', 'home', 'principal', 'portal'],
  },
  {
    title: 'Recursos',
    description: 'Biblioteca de actividades, videos, guías y materiales por perfil, nivel y propósito',
    href: '/recursos',
    section: 'Navegación',
    icon: 'library_books',
    color: 'bg-amber-600',
    keywords: ['recursos', 'biblioteca', 'actividades', 'videos', 'guias', 'guías', 'documentos', 'series', 'colecciones'],
  },
  {
    title: 'Edutips',
    description: 'Cápsulas breves para aprender, conversar y actuar mejor',
    href: '/edutips',
    section: 'Colecciones de recursos',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['edutips', 'capsulas', 'cápsulas', 'tips', 'microvideos', 'aprender'],
  },
  {
    title: 'Pequeños Cibernautas',
    description: 'Colección interactiva para iniciar conversaciones sobre cuidado digital en la infancia',
    href: '/series/pequenos-cibernautas',
    section: 'Colecciones de recursos',
    icon: 'smart_toy',
    color: 'bg-pink-600',
    keywords: ['pequeños cibernautas', 'infancia', 'memorama', 'juego', 'actividades', 'seguridad digital'],
  },
  {
    title: 'Pantallas Seguras',
    description: 'La nueva ley para proteger a niñas, niños y adolescentes en entornos digitales',
    href: '/pantallas-seguras',
    section: 'Orientación y más',
    icon: 'screenshot_monitor',
    color: 'bg-violet-700',
    keywords: ['pantallas', 'seguras', 'ley', 'entornos digitales', 'menores', 'proteccion', 'protección', 'restriccion', 'redes sociales', 'jalisco'],
  },
  {
    title: 'Quiénes somos',
    description: 'Conoce al equipo detrás de Ciudadanía Digital Jalisco',
    href: '/quienes-somos',
    section: 'Navegación',
    icon: 'groups',
    color: 'bg-rose-600',
    keywords: ['quienes', 'quiénes', 'somos', 'equipo', 'aliados', 'contacto', 'institucional', 'sep', 'secretaria'],
  },

  // ── AUDIENCIAS / PERFILES ─────────────────────────────────────────────────

  {
    title: 'Niñas y niños',
    description: 'Recursos educativos para la infancia',
    href: '/p/ninas-y-ninos',
    section: 'Perfiles',
    icon: 'child_care',
    color: 'bg-rose-500',
    keywords: ['niñas', 'niños', 'ninos', 'ninas', 'infancia', 'infantil', 'primaria', 'preescolar', 'kids'],
  },
  {
    title: 'Preescolar',
    description: 'Recursos para niñas y niños en etapa preescolar',
    href: '/p/ninas-y-ninos#preescolar',
    section: 'Niñas y niños',
    icon: 'child_care',
    color: 'bg-rose-500',
    keywords: ['preescolar', 'kinder', 'jardin', 'jardín', 'pequeños', 'pequeñas', 'niñas', 'niños', '3', '4', '5', 'años'],
  },
  {
    title: 'Primaria baja',
    description: 'Recursos para 1° a 3° de primaria',
    href: '/p/ninas-y-ninos#primaria-baja',
    section: 'Niñas y niños',
    icon: 'child_care',
    color: 'bg-rose-500',
    keywords: ['primaria', 'baja', 'primero', 'segundo', 'tercero', '1', '2', '3', 'grado', 'niños', '6', '7', '8'],
  },
  {
    title: 'Primaria alta',
    description: 'Recursos para 4° a 6° de primaria',
    href: '/p/ninas-y-ninos#primaria-alta',
    section: 'Niñas y niños',
    icon: 'child_care',
    color: 'bg-rose-500',
    keywords: ['primaria', 'alta', 'cuarto', 'quinto', 'sexto', '4', '5', '6', 'grado', '9', '10', '11'],
  },
  {
    title: 'Adolescentes',
    description: 'Recursos para adolescentes de secundaria y bachillerato',
    href: '/p/adolescentes',
    section: 'Perfiles',
    icon: 'forum',
    color: 'bg-violet-600',
    keywords: ['adolescentes', 'teens', 'jóvenes', 'jovenes', 'secundaria', 'bachillerato', 'preparatoria', 'prepa', 'teens'],
  },
  {
    title: 'Secundaria',
    description: 'Recursos para estudiantes de secundaria',
    href: '/p/adolescentes#secundaria',
    section: 'Adolescentes',
    icon: 'forum',
    color: 'bg-violet-600',
    keywords: ['secundaria', 'secundario', 'primer', 'segundo', 'tercer', 'grado', '12', '13', '14', 'años'],
  },
  {
    title: 'Bachillerato',
    description: 'Recursos para estudiantes de bachillerato',
    href: '/p/adolescentes#preparatoria',
    section: 'Adolescentes',
    icon: 'forum',
    color: 'bg-violet-600',
    keywords: ['preparatoria', 'prepa', 'bachillerato', '15', '16', '17', 'años', 'high school'],
  },
  {
    title: 'Familias',
    description: 'Herramientas para acompañar a niñas, niños y adolescentes en su vida digital',
    href: '/p/familias',
    section: 'Perfiles',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['familias', 'familia', 'padres', 'madres', 'papas', 'mamás', 'tutores', 'crianza', 'hijos'],
  },
  {
    title: 'Primera infancia (0–5 años)',
    description: 'Acompañamiento digital para bebés y niños pequeños',
    href: '/p/familias#fam-0-5',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['bebe', 'bebé', 'primera infancia', 'lactante', '0', '1', '2', '3', '4', '5', 'años'],
  },
  {
    title: 'Niñez (6–11 años)',
    description: 'Acompañamiento digital para niñas y niños en edad escolar',
    href: '/p/familias#fam-6-11',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['niñez', 'escolar', '6', '7', '8', '9', '10', '11', 'años', 'primaria'],
  },
  {
    title: 'Adolescencia temprana (12–14 años)',
    description: 'Acompañamiento digital para adolescentes jóvenes',
    href: '/p/familias#fam-12-14',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['adolescencia', 'temprana', '12', '13', '14', 'años', 'secundaria'],
  },
  {
    title: 'Adolescencia (15–17 años)',
    description: 'Acompañamiento familiar con acuerdos claros, privacidad y una ruta de apoyo',
    href: '/p/familias#fam-15-17',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['adolescencia', '15', '16', '17', 'años', 'prepa', 'privacidad', 'autonomía'],
  },
  {
    title: 'Personas adultas jóvenes (18–22 años)',
    description: 'Apoyo familiar acordado con respeto a la autonomía y el consentimiento',
    href: '/p/familias#fam-18-22',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['personas adultas jóvenes', 'juventud', 'joven', '18', '19', '20', '21', '22', 'años', 'universidad', 'autonomía', 'consentimiento'],
  },
  {
    title: 'Docentes',
    description: 'Recursos y estrategias para trabajar ciudadanía digital en el aula',
    href: '/p/docentes',
    section: 'Perfiles',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'maestros', 'maestras', 'profesores', 'profesoras', 'aula', 'escuela', 'enseñar'],
  },
  {
    title: 'Docentes – Preescolar',
    description: 'Recursos para docentes de nivel preescolar',
    href: '/p/docentes#doc-pre',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'preescolar', 'kinder', 'jardin', 'nivel', 'maestros'],
  },
  {
    title: 'Docentes – Primaria baja',
    description: 'Recursos para docentes de 1° a 3° de primaria',
    href: '/p/docentes#doc-pb',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'primaria', 'baja', 'primer', 'segundo', 'tercero', 'grado'],
  },
  {
    title: 'Docentes – Primaria alta',
    description: 'Recursos para docentes de 4° a 6° de primaria',
    href: '/p/docentes#doc-pa',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'primaria', 'alta', 'cuarto', 'quinto', 'sexto', 'grado'],
  },
  {
    title: 'Docentes – Secundaria',
    description: 'Recursos para docentes de nivel secundaria',
    href: '/p/docentes#doc-sec',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'secundaria', 'secundario', 'nivel', 'maestros'],
  },
  {
    title: 'Docentes – Media superior',
    description: 'Recursos para docentes de bachillerato',
    href: '/p/docentes#doc-prep',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'preparatoria', 'prepa', 'bachillerato', 'nivel', 'maestros'],
  },

  // ── SERIE: EL DÍA QUE CASI ───────────────────────────────────────────────

  {
    title: 'El día que casi (serie)',
    description: 'Serie animada donde personajes evitan riesgos digitales tomando buenas decisiones',
    href: '/series/el-dia-que-casi',
    section: 'Colecciones de recursos',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['el dia que casi', 'el día que casi', 'casi', 'serie', 'animada', 'animacion', 'animación', 'episodios'],
  },
  {
    title: 'El día que casi hago cyberbullying',
    description: 'Sobre el respeto y la empatía en redes sociales',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['cyberbullying', 'ciberbullying', 'acoso', 'bullying', 'respeto', 'empatia', 'empatía', 'meme', 'broma'],
  },
  {
    title: 'El día que casi doy mis datos personales a un extraño',
    description: 'Proteger tu información personal en línea',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['datos personales', 'datos', 'privacidad', 'privado', 'extraño', 'desconocido', 'nombre', 'direccion', 'dirección'],
  },
  {
    title: 'El día que casi creo una historia que no era mía',
    description: 'Verificar la fuente antes de compartir una historia o noticia',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['historia', 'fuente', 'verificar', 'noticia', 'información', 'desinformación', 'compartir'],
  },
  {
    title: 'El día que casi descargo un virus',
    description: 'Reconocer descargas peligrosas y proteger tu dispositivo',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['virus', 'malware', 'descarga', 'app', 'link', 'enlace', 'peligroso', 'dispositivo', 'celular', 'computadora'],
  },
  {
    title: 'El día que casi compro un videojuego',
    description: 'Estafas comunes en compras de videojuegos en línea',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['videojuego', 'juego', 'compra', 'estafa', 'skin', 'monedas', 'falso', 'tienda', 'precio'],
  },

  // ── EDUTIPS ───────────────────────────────────────────────────────────────

  {
    title: 'Edutip: ¿A qué edad usar IA?',
    description: 'Orientación práctica sobre el uso de chats de IA generativa en menores',
    href: '/edutips',
    section: 'Colecciones de recursos',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'menores', 'edad', 'crianza', 'adolescentes'],
  },
  {
    title: 'Edutip: Fomentar la intención, no la evitación',
    description: 'Uso consciente de la tecnología durante vacaciones y tiempo libre',
    href: '/edutips',
    section: 'Colecciones de recursos',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['bienestar', 'pantallas', 'aburrimiento', 'intención', 'autonomía', 'tiempo libre', 'familia'],
  },
  {
    title: 'Edutip: Medios y tecnología para reforzar lazos familiares',
    description: 'Cómo la tecnología puede convertirse en una herramienta de unión y convivencia',
    href: '/edutips',
    section: 'Colecciones de recursos',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['familia', 'convivencia', 'comunicación', 'lazos familiares', 'medios digitales'],
  },
  ...FEATURED_VIDEOS.map((video): SearchEntry => ({
    title: video.title,
    description: video.description,
    href: video.audiences.includes('teens')
      ? '/p/adolescentes#secundaria'
      : video.audiences.includes('families')
        ? '/p/familias#fam-0-5'
        : '/p/docentes#doc-sec',
    section: 'Recursos · En corto',
    icon: 'smart_display',
    color: 'bg-rose-600',
    keywords: [
      video.collection.toLowerCase(),
      video.topic,
      ...video.audiences,
      ...video.stages,
      ...video.title.toLowerCase().split(/\s+/)
    ],
  })),
];

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX')
    .trim();
}

/**
 * Función de búsqueda: filtra el índice con una query en texto libre.
 * Devuelve hasta `limit` resultados relevantes.
 */
export function searchIndex(query: string, limit = 10): SearchEntry[] {
  const q = normalizeSearchText(query);
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of SEARCH_INDEX) {
    let score = 0;
    const titleLower = normalizeSearchText(entry.title);
    const descLower  = normalizeSearchText(entry.description);
    const secLower   = normalizeSearchText(entry.section);

    // Coincidencia exacta en título — máxima prioridad
    if (titleLower === q) score += 100;
    // Título empieza con query
    else if (titleLower.startsWith(q)) score += 60;
    // Título contiene query
    else if (titleLower.includes(q)) score += 40;

    // Coincidencia en descripción
    if (descLower.includes(q)) score += 15;

    // Coincidencia en sección
    if (secLower.includes(q)) score += 10;

    // Coincidencia en keywords
    for (const kw of entry.keywords) {
      const normalizedKeyword = normalizeSearchText(kw);
      if (normalizedKeyword === q)         { score += 50; break; }
      if (normalizedKeyword.startsWith(q)) { score += 30; break; }
      if (normalizedKeyword.includes(q))   { score += 20; break; }
    }

    if (score > 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
