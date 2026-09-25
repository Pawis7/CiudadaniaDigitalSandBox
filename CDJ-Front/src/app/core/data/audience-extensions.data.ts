export interface DigitalMission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  badge: string;
  /** IDs de etapa en los que la misión es pertinente. */
  levels: string[];
}

export interface InterestBook {
  id: string;
  title: string;
  institution: string;
  year?: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  badge: string;
}

export interface InteractivePostcard {
  id: number;
  title: string;
  shortAdvice: string;
  frontImgUrl: string;
  backImgUrl: string;
}


/** Misiones digitales para Familias y Cuidadores */
export const FAMILIES_MISSIONS: DigitalMission[] = [
  {
    id: 'mision-familias-1',
    title: 'Misión digital 1',
    subtitle: 'Familias y cuidadores',
    description: 'Propuesta de conversación familiar sobre información, tecnología y acuerdos en casa. Adapta las actividades a la edad antes de realizarlas.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/mision1.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/Mision-digital-1-Familias-y-cuidadores.pdf',
    badge: 'Misión 1 · PDF',
    levels: ['fam-6-11', 'fam-12-14', 'fam-15-17']
  },
  {
    id: 'mision-familias-2',
    title: 'Misión digital 2',
    subtitle: 'Familias y cuidadores',
    description: 'Propuesta de mediación y diálogo para familias. Revisa sus ejemplos y adapta las actividades a la edad de quienes participan.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/mision2.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/Mision-digital-2-Familias-y-cuidadores.pdf',
    badge: 'Misión 2 · PDF',
    levels: ['fam-6-11', 'fam-12-14', 'fam-15-17']
  }
];

/** Misiones digitales para Docentes */
export const TEACHERS_MISSIONS: DigitalMission[] = [
  {
    id: 'mision-docentes-1',
    title: 'Misión digital 1',
    subtitle: 'Docentes',
    description: 'Estrategias pedagógicas de ciudadanía digital listas para integrar en el aula y desarrollar pensamiento crítico.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/misiondocentes1.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/Mision-digital-1-Docentes.pdf',
    badge: 'Misión 1 · PDF',
    levels: ['doc-pa', 'doc-sec', 'doc-prep']
  },
  {
    id: 'mision-docentes-2',
    title: 'Misión digital 2',
    subtitle: 'Docentes',
    description: 'Actividades y dinámicas grupales para fortalecer la convivencia pacífica y el autocuidado digital escolar.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/misiondocentes2.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/Mision-digital-2-Docentes.pdf',
    badge: 'Misión 2 · PDF',
    levels: ['doc-pa', 'doc-sec', 'doc-prep']
  }
];

/** Libros de interés y marcos de referencia oficiales para Docentes */
export const TEACHERS_BOOKS: InterestBook[] = [
  {
    id: 'unesco-ia-docentes',
    title: 'Marco de competencias para docentes en materia de IA',
    institution: 'UNESCO',
    description: 'Directrices internacionales sobre los conocimientos, valores y competencias necesarias para enseñar con y sobre Inteligencia Artificial.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/IMG2.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/UNESCO_Marco-de-competencias-paradocentes-en-materia-de-IA.pdf',
    badge: 'UNESCO · Marco de IA'
  },
  {
    id: 'unesco-ia-estudiantes',
    title: 'Marco de competencias para estudiantes en materia de IA',
    institution: 'UNESCO',
    description: 'Estructura orientativa para dotar a las y los estudiantes de habilidades para comprender y usar la IA de manera ética y segura.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/IMG3.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/UNESCO_Marco-de-competencias-paraestudiantes-en-materia-de-IA.pdf',
    badge: 'UNESCO · Estudiantes'
  },
  {
    id: 'unesco-ia-generativa',
    title: 'Orientación para la IA Generativa en la educación y la investigación',
    institution: 'UNESCO',
    description: 'Guía para regular, aprovechar y aplicar responsablemente herramientas de IA generativa en centros educativos.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/IMG4.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/UNESCO_Orientacion-para-la-IA-Generativa-en-la-educacion-y-la-investigacion.pdf',
    badge: 'UNESCO · IA Generativa'
  },
  {
    id: 'aprendizaje-invisible',
    title: 'El aprendizaje invisible: hacia una nueva ecología de la educación',
    institution: 'Cristóbal Cobo & John Moravec',
    description: 'Propuesta innovadora sobre cómo aprendemos fuera de las aulas tradicionales y la transformación del conocimiento digital.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/imagen-aprendizaje.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/El-aprendizaje-invisible_Cristobal-Cobo.pdf',
    badge: 'Libro de referencia'
  },
  {
    id: 'digcomp-2-2',
    title: 'DigComp 2.2: Marco de competencias digitales para la ciudadanía',
    institution: 'Comisión Europea',
    description: 'El estándar de referencia con más de 250 nuevos ejemplos de conocimientos, destrezas y actitudes en el entorno digital y de IA.',
    coverUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/IMG1.jpeg',
    pdfUrl: 'https://ciudadaniadigital.jalisco.gob.mx/wp-content/uploads/2025/11/Digcomp2.2_Marco-de-competencias-digitales-para-la-ciudadani.pdf',
    badge: 'Marco DigComp 2.2'
  }
];
/** 11 postales interactivas "El día que casi...". No incluyen descargas infantiles. */
export const CASI_POSTCARDS: InteractivePostcard[] = [
  {
    id: 1,
    title: 'Cuídate al usar la IA',
    shortAdvice: 'No compartas información privada ni datos sensibles con herramientas de Inteligencia Artificial.',
    frontImgUrl: '/postales/img/1.webp',
    backImgUrl: '/postales/img/cuidate-al-usar-la-IA.webp'
  },
  {
    id: 2,
    title: 'Navega seguro y protege tu equipo',
    shortAdvice: 'Verifica los enlaces antes de abrirlos y mantén tus dispositivos protegidos.',
    frontImgUrl: '/postales/img/2.webp',
    backImgUrl: '/postales/img/navegaseguro.webp'
  },
  {
    id: 3,
    title: 'No compartas tus datos con cualquiera',
    shortAdvice: 'Tu nombre, dirección, escuela y fotos familiares son datos valiosos que debes proteger.',
    frontImgUrl: '/postales/img/3.webp',
    backImgUrl: '/postales/img/nocompartastusdatos.webp'
  },
  {
    id: 4,
    title: 'Prevención digital: protege tu acceso',
    shortAdvice: 'Usa contraseñas seguras y nunca las compartas, ni siquiera con tus amigos.',
    frontImgUrl: '/postales/img/4.webp',
    backImgUrl: '/postales/img/prevenciondigital.webp'
  },
  {
    id: 5,
    title: 'Seguridad digital en compras y pagos',
    shortAdvice: 'Nunca hagas compras dentro de juegos o aplicaciones sin el permiso y compañía de una persona adulta.',
    frontImgUrl: '/postales/img/5.webp',
    backImgUrl: '/postales/img/seguridaddigital.webp'
  },
  {
    id: 6,
    title: 'Cuidado con los impostores digitales',
    shortAdvice: 'Desconfía de cuentas o mensajes que se hacen pasar por personas conocidas o marcas famosas.',
    frontImgUrl: '/postales/img/6.webp',
    backImgUrl: '/postales/img/prenvenciondeestafas.webp'
  },
  {
    id: 7,
    title: 'Prevención del acoso digital',
    shortAdvice: 'Si ves o recibes burlas o mensajes hirientes, no te sumes: guarda evidencia y pide ayuda a un adulto.',
    frontImgUrl: '/postales/img/7.webp',
    backImgUrl: '/postales/img/prevenciondeacoso.webp'
  },
  {
    id: 8,
    title: 'Protege tu privacidad en el mundo digital',
    shortAdvice: 'Revisa la configuración de privacidad de tus redes y videojuegos para controlar quién ve tus publicaciones.',
    frontImgUrl: '/postales/img/8.webp',
    backImgUrl: '/postales/img/protegetuprivacidad.webp'
  },
  {
    id: 9,
    title: 'Seguridad en tus cuentas digitales',
    shortAdvice: 'Activa la verificación en dos pasos siempre que sea posible para evitar accesos no autorizados.',
    frontImgUrl: '/postales/img/9.webp',
    backImgUrl: '/postales/img/seguridaentuscuentas.webp'
  },
  {
    id: 10,
    title: 'Prevención de estafas digitales',
    shortAdvice: 'Si te ofrecen premios increíbles, monedas gratis o regalos a cambio de tus datos, es una trampa.',
    frontImgUrl: '/postales/img/10.webp',
    backImgUrl: '/postales/img/prenvenciondeestafas.webp'
  },
  {
    id: 11,
    title: 'Uso responsable de la Inteligencia Artificial',
    shortAdvice: 'Usa la IA como apoyo para aprender e inspirarte, pero sé siempre el autor con tu propio criterio y esfuerzo.',
    frontImgUrl: '/postales/img/11.webp',
    backImgUrl: '/postales/img/usoresponsabledeIA.webp'
  }
];

/** Tarjetas interactivas "Pequeños Cibernautas" (memorama de 20 piezas). */
export const PEQUENOS_CIBERNAUTAS_CARDS: InteractivePostcard[] = [
  {
    id: 1,
    title: 'Tarjeta 1',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-01.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 2,
    title: 'Tarjeta 2',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-02.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 3,
    title: 'Tarjeta 3',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-03.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 4,
    title: 'Tarjeta 4',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-04.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 5,
    title: 'Tarjeta 5',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-05.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 6,
    title: 'Tarjeta 6',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-06.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 7,
    title: 'Tarjeta 7',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-07.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 8,
    title: 'Tarjeta 8',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-08.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 9,
    title: 'Tarjeta 9',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-09.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 10,
    title: 'Tarjeta 10',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-10.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 11,
    title: 'Tarjeta 11',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-11.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 12,
    title: 'Tarjeta 12',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-12.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 13,
    title: 'Tarjeta 13',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-13.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 14,
    title: 'Tarjeta 14',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-14.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 15,
    title: 'Tarjeta 15',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-15.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 16,
    title: 'Tarjeta 16',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-16.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 17,
    title: 'Tarjeta 17',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-17.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 18,
    title: 'Tarjeta 18',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-18.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 19,
    title: 'Tarjeta 19',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-19.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  },
  {
    id: 20,
    title: 'Tarjeta 20',
    shortAdvice: 'Memorama Pequeños Cibernautas · Ciudadanía Digital Jalisco',
    frontImgUrl: '/Cibernautas/memorama-20.webp',
    backImgUrl: '/Cibernautas/caratula.webp'
  }
];
