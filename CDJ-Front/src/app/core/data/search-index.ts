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
    title: 'Series',
    description: 'Catálogo completo de series y videos educativos',
    href: '/series',
    section: 'Navegación',
    icon: 'movie',
    color: 'bg-amber-600',
    keywords: ['series', 'videos', 'catalogo', 'catálogo', 'animados'],
  },
  {
    title: 'Edutips',
    description: 'Cápsulas breves para aprender, conversar y actuar mejor',
    href: '/edutips',
    section: 'Aprender',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['edutips', 'capsulas', 'cápsulas', 'tips', 'microvideos', 'aprender'],
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
    title: 'Ayuda Digital',
    description: 'Orientación ante riesgos y violencia digital',
    href: '/ayuda',
    section: 'Orientación y más',
    icon: 'shield',
    color: 'bg-violet-600',
    keywords: ['ayuda', 'digital', 'violencia', 'acoso', 'fraude', 'riesgo', 'orientacion', 'orientación', 'apoyo'],
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
    description: 'Recursos para adolescentes de secundaria y preparatoria',
    href: '/p/adolescentes',
    section: 'Perfiles',
    icon: 'forum',
    color: 'bg-violet-600',
    keywords: ['adolescentes', 'teens', 'jóvenes', 'jovenes', 'secundaria', 'preparatoria', 'prepa', 'teens'],
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
    title: 'Preparatoria',
    description: 'Recursos para estudiantes de preparatoria o bachillerato',
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
    title: 'Adolescencia tardía y juventud (15–22 años)',
    description: 'Acompañamiento digital para jóvenes',
    href: '/p/familias#fam-15-22',
    section: 'Familias',
    icon: 'family_restroom',
    color: 'bg-orange-600',
    keywords: ['adolescencia', 'tardía', 'juventud', 'joven', '15', '16', '17', '18', '19', '20', '21', '22', 'años', 'prepa', 'universidad'],
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
    title: 'Docentes – Preparatoria',
    description: 'Recursos para docentes de bachillerato o preparatoria',
    href: '/p/docentes#doc-prep',
    section: 'Docentes',
    icon: 'school',
    color: 'bg-rose-800',
    keywords: ['docentes', 'preparatoria', 'prepa', 'bachillerato', 'nivel', 'maestros'],
  },

  // ── AYUDA DIGITAL — INSTANCIAS / CONTACTOS ───────────────────────────────

  {
    title: '911 – Emergencias',
    description: 'Peligro inmediato, agresión, riesgo físico o extorsión activa',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'emergency',
    color: 'bg-rose-600',
    keywords: ['911', 'emergencia', 'urgente', 'peligro', 'inmediato', 'agresion', 'agresión', 'riesgo', 'físico', 'fisico', 'policia', 'policía', 'llamar', 'numero', 'número'],
  },
  {
    title: 'Código Violeta',
    description: 'Violencia contra mujeres, amenazas o riesgo urgente con componente digital',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'security',
    color: 'bg-purple-700',
    keywords: ['codigo violeta', 'código violeta', 'violeta', 'mujer', 'mujeres', 'violencia', 'agresion', 'amenaza', 'pareja', 'género', 'genero', '911', '33', '14', '15', '10', '02'],
  },
  {
    title: 'Policía Cibernética de Jalisco',
    description: 'Fraudes, suplantación, acoso digital, extorsión, phishing',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'policy',
    color: 'bg-sky-700',
    keywords: ['policia', 'policía', 'cibernética', 'cibernetica', 'ciberacoso', 'fraude', 'suplantacion', 'suplantación', 'phishing', 'extorsion', 'extorsión', 'acoso', 'digital', '3338376000', 'numero', 'número', 'jalisco'],
  },
  {
    title: 'PPNNA – Procuraduría de Protección de NNA',
    description: 'Protección de niñas, niños y adolescentes en situaciones de riesgo digital',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'child_care',
    color: 'bg-violet-700',
    keywords: ['ppnna', 'procuraduria', 'procuraduría', 'proteccion', 'protección', 'niños', 'niñas', 'adolescentes', 'menores', 'derechos', '3330308200', 'numero', 'número'],
  },
  {
    title: 'Centro de Justicia para las Mujeres',
    description: 'Difusión no consentida, acoso, violencia digital contra mujeres',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'female',
    color: 'bg-purple-700',
    keywords: ['centro justicia', 'mujeres', 'difusion no consentida', 'difusión', 'imágenes', 'acoso', 'violencia digital', 'pareja', 'chatbot', 'violeta', 'whatsapp', '3336681880', 'numero', 'número'],
  },
  {
    title: 'Fiscalía del Estado de Jalisco',
    description: 'Denuncia penal por amenazas, fraude, extorsión o delitos digitales',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'gavel',
    color: 'bg-amber-700',
    keywords: ['fiscalia', 'fiscalía', 'ministerio publico', 'ministerio público', 'denuncia', 'penal', 'delito', 'amenaza', 'extorsion', 'extorsión', 'fraude', 'suplantacion', '3338376000', 'numero', 'número', 'jalisco'],
  },
  {
    title: 'Canales de apoyo',
    description: 'Todas las instancias y canales de atención ante situaciones digitales',
    href: '/ayuda#canales',
    section: 'Ayuda Digital',
    icon: 'support_agent',
    color: 'bg-violet-600',
    keywords: ['canales', 'apoyo', 'instancias', 'atencion', 'atención', 'contacto', 'donde acudir', 'numero', 'número', 'llamar', 'reporte'],
  },
  {
    title: 'Pasos ante un riesgo digital',
    description: 'Qué hacer primero si viviste un fraude, acoso o amenaza digital',
    href: '/ayuda#pasos',
    section: 'Ayuda Digital',
    icon: 'checklist',
    color: 'bg-violet-600',
    keywords: ['pasos', 'que hacer', 'primero', 'evidencia', 'captura', 'reporte', 'apoyo', 'riesgo', 'fraude', 'acoso'],
  },

  // ── SERIE: EL DÍA QUE CASI ───────────────────────────────────────────────

  {
    title: 'El día que casi (serie)',
    description: 'Serie animada donde personajes evitan riesgos digitales tomando buenas decisiones',
    href: '/series/el-dia-que-casi',
    section: 'Series',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['el dia que casi', 'el día que casi', 'casi', 'serie', 'animada', 'animacion', 'animación', 'episodios'],
  },
  {
    title: 'El día que casi me hackean',
    description: 'Cómo proteger tus cuentas y reconocer intentos de hackeo',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['hackeo', 'hackear', 'hack', 'contraseñas', 'cuentas', 'seguridad', 'redes sociales', 'proteger'],
  },
  {
    title: 'El día que casi caigo en un reto viral',
    description: 'Por qué los retos virales pueden ser peligrosos y cómo decir "no"',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['reto', 'retos', 'viral', 'presion social', 'presión social', 'tiktok', 'peligroso', 'no'],
  },
  {
    title: 'El día que casi caigo en un video falso',
    description: 'Identificar deepfakes y noticias falsas',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['deepfake', 'video falso', 'fake news', 'noticias falsas', 'desinformacion', 'desinformación', 'ia', 'inteligencia artificial'],
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
    title: 'El día que casi doy mis datos a un extraño',
    description: 'Proteger tu información personal en línea',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['datos personales', 'datos', 'privacidad', 'privado', 'extraño', 'desconocido', 'nombre', 'direccion', 'dirección'],
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
    title: 'El día que casi compro un videojuego (falso)',
    description: 'Estafas comunes en compras de videojuegos en línea',
    href: '/series/el-dia-que-casi',
    section: 'El día que casi',
    icon: 'star',
    color: 'bg-amber-500',
    keywords: ['videojuego', 'juego', 'compra', 'estafa', 'skin', 'monedas', 'falso', 'tienda', 'precio'],
  },

  // ── EDUTIPS ───────────────────────────────────────────────────────────────

  {
    title: 'Edutip: Inteligencia Artificial Generativa',
    description: 'Cómo funcionan ChatGPT y otras IAs que crean texto e imágenes',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'generativa', 'texto', 'imagenes', 'imágenes'],
  },
  {
    title: 'Edutip: Ciberseguridad en familia',
    description: 'Consejos clave para proteger dispositivos, redes Wi-Fi y cuentas en el hogar',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['ciberseguridad', 'seguridad', 'wifi', 'contraseña', 'cuentas', 'hogar', 'dispositivos', 'familia'],
  },
  {
    title: 'Edutip: FOMO – Miedo a perderse algo',
    description: 'Qué es el FOMO y cómo afecta la salud mental de los jóvenes',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['fomo', 'miedo', 'perderse', 'redes sociales', 'salud mental', 'bienestar', 'jovenes', 'jóvenes'],
  },
  {
    title: 'Edutip: Fraudes y estafas en línea',
    description: 'Identificar enlaces sospechosos, mensajes falsos y evitar trampas',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['fraude', 'estafa', 'enlace', 'link', 'mensaje', 'falso', 'trampa', 'phishing', 'scam'],
  },
  {
    title: 'Edutip: Retos virales en redes sociales',
    description: 'Cómo hablar con adolescentes sobre los retos virales y la presión social',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['reto', 'viral', 'presion social', 'presión social', 'peligro', 'adolescentes', 'hablar'],
  },
  {
    title: 'Edutip: Desconéctate de pantallas',
    description: 'Estrategias saludables para equilibrar el tiempo en internet',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['desconectar', 'desconectarse', 'pantallas', 'tiempo', 'equilibrio', 'bienestar', 'salud', 'familia'],
  },
  {
    title: 'Edutip: Contraseñas de Gmail',
    description: 'Pasos para recuperar el acceso a tu cuenta de correo electrónico',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['contraseña', 'gmail', 'correo', 'recuperar', 'cuenta', 'email', 'google'],
  },
  {
    title: 'Edutip: Videollamadas seguras',
    description: 'Recomendaciones para comunicarte de forma confiable y privada',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['videollamada', 'zoom', 'meet', 'privado', 'seguro', 'comunicacion', 'comunicación'],
  },
  {
    title: 'Edutip: ¿A qué edad usar IA?',
    description: 'Orientación práctica para el inicio de los menores en la IA',
    href: '/edutips',
    section: 'Edutips',
    icon: 'auto_awesome',
    color: 'bg-orange-500',
    keywords: ['edad', 'ia', 'inteligencia artificial', 'menores', 'hijos', 'cuando', 'iniciar'],
  },
];

/**
 * Función de búsqueda: filtra el índice con una query en texto libre.
 * Devuelve hasta `limit` resultados relevantes.
 */
export function searchIndex(query: string, limit = 10): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of SEARCH_INDEX) {
    let score = 0;
    const titleLower = entry.title.toLowerCase();
    const descLower  = entry.description.toLowerCase();
    const secLower   = entry.section.toLowerCase();

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
      if (kw === q)           { score += 50; break; }
      if (kw.startsWith(q))   { score += 30; break; }
      if (kw.includes(q))     { score += 20; break; }
    }

    if (score > 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
