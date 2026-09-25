export interface LawAnswer {
  title: string;
  answer: string;
  reference: string;
}

export interface RelatedResource {
  title: string;
  description: string;
  label: string;
  route: string;
  fragment?: string;
  queryParams?: { perfil: 'families' | 'teachers'; etapa?: string; contexto?: string };
}

export interface FamilySubStage {
  title: string;
  introduction: string;
  actions: ReadonlyArray<string>;
}

export interface FamilyStage {
  id: string;
  title: string;
  focus: string;
  introduction: string;
  actions: ReadonlyArray<string>;
  subStages?: ReadonlyArray<FamilySubStage>;
  conversationLabel: string;
  conversation: string;
  ageNote?: string;
  resources: ReadonlyArray<RelatedResource>;
}

export interface SchoolGuidance {
  title: string;
  description: string;
  reference: string;
}

export interface IncidentStep {
  title: string;
  description: string;
}

export interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
  reference?: string;
}

export interface ReferenceLink {
  title: string;
  description: string;
  url: string;
  sourceType: string;
}

export const SOCIAL_NETWORKS_NOTE = {
  title: 'Sobre las redes sociales antes de los 14 años',
  text: 'El artículo 37, fracción X, establece que el protocolo de uso responsable y seguro debe incluir la prohibición del uso de redes sociales para personas menores de catorce años.',
  clarification: 'Las recomendaciones educativas de esta página deben leerse junto con esa disposición, no como una autorización para acceder a cualquier plataforma.',
  reference: 'Artículo 37, fracción X',
};

export const LAW_ANSWERS: ReadonlyArray<LawAnswer> = [
  {
    title: 'Acceder y aprender',
    answer: 'Niñas, niños y adolescentes tienen derecho a acceder a internet de manera segura, responsable y acompañada, sin discriminación y de acuerdo con su edad y desarrollo.',
    reference: 'Artículos 2, 7 y 8',
  },
  {
    title: 'Participar y crear',
    answer: 'Pueden expresar sus ideas, participar y crear contenidos digitales conforme a su edad y autonomía progresiva, con el acompañamiento que corresponda.',
    reference: 'Artículo 8',
  },
  {
    title: 'Proteger su privacidad y su dignidad',
    answer: 'Deben recibir orientación para cuidar su información personal. También pueden solicitar el retiro de contenidos que pongan en riesgo su dignidad, seguridad, vida privada u otros derechos.',
    reference: 'Artículo 8',
  },
  {
    title: 'Recibir información y formación',
    answer: 'Tienen derecho a recibir información comprensible y adecuada a su edad, así como a desarrollar habilidades para utilizar la tecnología de manera responsable.',
    reference: 'Artículo 8',
  },
  {
    title: 'Recibir protección y ayuda',
    answer: 'Deben contar con información para reconocer riesgos y con acompañamiento ante situaciones de violencia, abuso o explotación en internet.',
    reference: 'Artículos 8, 38, 39 y 40',
  },
  {
    title: 'Cuidar su bienestar',
    answer: 'Las familias deben informarse y establecer acuerdos para evitar la exposición prolongada a dispositivos e internet. La ley no establece una cantidad única de minutos u horas para todas las edades.',
    reference: 'Artículos 2 y 9',
  },
];

// Los recursos remiten a las experiencias y etapas existentes; no crean un catálogo paralelo.
export const FAMILY_STAGES: ReadonlyArray<FamilyStage> = [
  {
    id: 'family-0-5',
    title: 'Primera infancia · 0 a 5 años',
    focus: 'Presencia antes que autonomía',
    introduction: 'En primera infancia, elegir el contenido, acompañar la experiencia y cerrar juntos corresponde principalmente a la persona adulta. A esta edad, la autonomía digital se construye con presencia, conversación y ejemplo.',
    actions: [
      'Elige y acompaña: revisa los videos, juegos o aplicaciones antes de utilizarlos juntos.',
      'Cuida los momentos cotidianos: procura que las pantallas no desplacen el sueño, el juego, el movimiento ni la convivencia.',
      'Practiquen cómo pedir ayuda: si algo asusta o incomoda, detenerse y avisar a una persona adulta de confianza.',
    ],
    conversationLabel: 'Una frase para practicar juntos',
    conversation: 'Si algo no me gusta o me asusta, me detengo y te aviso.',
    resources: [
      {
        title: 'Acompañar en primera infancia',
        description: 'Orientaciones y videos para acompañar el uso de pantallas y cuidar la privacidad desde los primeros años.',
        label: 'Familias · 0 a 5 años',
        route: '/p/familias',
        fragment: 'fam-0-5',
      },
      {
        title: 'Una pantalla también puede iniciar una conversación',
        description: 'Una experiencia para personas adultas sobre pausar, preguntar y compartir después de ver un cuento.',
        label: 'Video y conversación',
        route: '/actividad/tecnologia-en-familia',
        queryParams: { perfil: 'families' },
      },
    ],
  },
  {
    id: 'family-6-11',
    title: 'Segunda infancia · 6 a 11 años',
    focus: 'Acompañar sus primeras decisiones',
    introduction: 'No se trata de resolver todo por ellas y ellos, sino de enseñarles cuándo detenerse, preguntar y pedir ayuda. El acompañamiento adulto sigue siendo necesario mientras aprenden a tomar decisiones cada vez más conscientes.',
    actions: [],
    subStages: [
      {
        title: 'En primaria baja: acompaña las primeras decisiones',
        introduction: 'Utilicen los entornos digitales con una persona adulta presente, nunca a solas. No se trata de resolver todo por ellos, sino de enseñarles cuándo detenerse, preguntar y pedir ayuda.',
        actions: [
          'Preguntar antes de aceptar algo, instalar una aplicación o hacer una compra.',
          'No compartir información personal y detenerse cuando aparezca algo que no comprendan o les incomode.',
        ],
      },
      {
        title: 'En primaria alta: acompaña sin retirarte de golpe',
        introduction: 'Dales espacio para explicar qué harían, revisen juntos sus decisiones y mantén disponible una ruta clara de ayuda. La autonomía crece sin retirar el acompañamiento.',
        actions: [
          'Pedir permiso antes de tomar o compartir fotografías y videos.',
          'Revisar con una persona adulta los enlaces, mensajes o premios sospechosos y acordar que pedir ayuda no ocasionará un castigo automático.',
        ],
      },
    ],
    conversationLabel: 'Un acuerdo para casa',
    conversation: 'Antes de instalar, comprar, compartir información o aceptar algo que no conocemos, lo revisamos juntos.',
    resources: [
      {
        title: 'Cuentos para leer y conversar en familia',
        description: 'Encuentra historias y orientaciones de acompañamiento para niñas y niños de primaria.',
        label: 'Familias · 6 a 11 años',
        route: '/p/familias',
        fragment: 'fam-6-11',
      },
      {
        title: 'Videojuegos en casa',
        description: 'Una guía para elegir juegos, revisar chats y compras, y construir acuerdos con acompañamiento adulto.',
        label: 'Guía para familias',
        route: '/p/familias/videojuegos',
      },
    ],
  },
  {
    id: 'family-12-14',
    title: 'Adolescencia inicial · 12 a 14 años',
    focus: 'Más privacidad no significa menos acompañamiento',
    introduction: 'En esta etapa crece la participación en las decisiones. Escucha, acuerda límites y mantente disponible sin convertir cada situación en vigilancia o castigo. Tener más autonomía también implica saber cuándo pedir apoyo.',
    actions: [
      'Revisen la privacidad: comprueben juntos la ubicación, los permisos y las opciones de recuperación de las cuentas que corresponda utilizar.',
      'Hablen antes de compartir: conversen sobre fotografías, capturas, reenvíos y consentimiento.',
      'Preparen una ruta de ayuda: acuerden una palabra o señal para pedir apoyo y practiquen cómo bloquear o reportar una interacción.',
    ],
    conversationLabel: 'Un mensaje que conviene repetir',
    conversation: 'Si algo se sale de control, puedes contármelo. Primero vamos a ayudarte.',
    ageNote: 'Para quienes todavía no cumplen catorce años, considera la disposición sobre redes sociales indicada al inicio. Este bloque reúne edades distintas y no constituye una autorización de uso.',
    resources: [
      {
        title: 'Privacidad y acompañamiento en la adolescencia inicial',
        description: 'Orientaciones y recursos para conversar sobre lo que comparten, las relaciones y la búsqueda de apoyo.',
        label: 'Familias · 12 a 14 años',
        route: '/p/familias',
        fragment: 'fam-12-14',
      },
      {
        title: 'Tu cinturón de seguridad digital',
        description: 'Analiza un caso ficticio y practica cómo verificar una solicitud sin entregar datos personales.',
        label: 'Caso preparado y conversación',
        route: '/actividad/ciberseguridad-familiar',
        queryParams: { perfil: 'families', etapa: 'fam-12-14', contexto: 'casa' },
      },
    ],
  },
  {
    id: 'family-15-17',
    title: 'Adolescencia · 15 a 17 años',
    focus: 'La autonomía crece y la red de apoyo permanece',
    introduction: 'En la adolescencia, acompaña sin invadir. Conversen sobre decisiones, consecuencias y situaciones en las que todavía se necesita intervención adulta. La autonomía no significa tener que resolver a solas una situación de presión, amenaza o riesgo.',
    actions: [
      'Anticipen situaciones: hablen sobre consentimiento, suplantación de identidad, fraudes y decisiones tomadas bajo presión.',
      'Distingan lo que ocurre: no es lo mismo un desacuerdo que el acoso, una amenaza o un posible delito.',
      'Definan cómo actuar: identifiquen apoyos, acuerden cuándo debe intervenir una persona adulta y cómo reparar un daño sin exponer a quienes están involucrados.',
    ],
    conversationLabel: 'Para conversar en familia',
    conversation: '¿Qué podrías resolver por tu cuenta y en qué situaciones necesitarías apoyo?',
    resources: [
      {
        title: 'Acompañar decisiones en la adolescencia',
        description: 'Orientaciones y recursos sobre privacidad, convivencia y responsabilidad digital.',
        label: 'Familias · 15 a 17 años',
        route: '/p/familias',
        fragment: 'fam-15-17',
      },
      {
        title: 'Urgente, premio, enlace… ¿seguro?',
        description: 'Una experiencia para reconocer engaños, verificar mensajes y proteger las cuentas.',
        label: 'Video y conversación',
        route: '/actividad/fraudes-estafas',
        queryParams: { perfil: 'families' },
      },
    ],
  },
];

export const SCHOOL_GUIDANCE: ReadonlyArray<SchoolGuidance> = [
  {
    title: 'Acompañar el uso educativo de la tecnología',
    description: 'Aplicar lineamientos pedagógicos para el uso consciente, seguro y creativo de dispositivos y plataformas durante el horario escolar, con participación del alumnado y acompañamiento docente.',
    reference: 'Artículo 27',
  },
  {
    title: 'Proteger los datos y la privacidad del alumnado',
    description: 'Cuidar la información personal, aplicar medidas de seguridad y evitar tanto la exposición de datos sensibles como la vigilancia excesiva.',
    reference: 'Artículo 27',
  },
  {
    title: 'Construir acuerdos de convivencia digital',
    description: 'Definir pautas para el uso responsable de dispositivos con la participación del alumnado, el personal y las familias, respetando la privacidad y la autonomía progresiva.',
    reference: 'Artículos 21 y 27',
  },
  {
    title: 'Contar con una ruta de atención',
    description: 'Recibir los avisos, proteger a quienes están involucrados, acompañar y canalizar conforme al protocolo aplicable. Ante indicios de un posible delito, corresponde dar vista a la autoridad competente.',
    reference: 'Artículos 27, 38, 39 y 40',
  },
  {
    title: 'Trabajar con las familias',
    description: 'Informar sobre el uso de herramientas digitales, ofrecer formación sobre acompañamiento y recabar el consentimiento que corresponda.',
    reference: 'Artículos 21 y 27',
  },
];

export const SCHOOL_RESOURCES: ReadonlyArray<RelatedResource> = [
  {
    title: 'Orientaciones y recursos para docentes',
    description: 'Selecciona el nivel educativo para encontrar historias, actividades y materiales de acompañamiento.',
    label: 'Docentes · Por nivel educativo',
    route: '/p/docentes',
  },
  {
    title: 'Trabajar el uso de la tecnología con intención',
    description: 'Una situación para abrir una conversación con el grupo y cerrar con una acción o acuerdo.',
    label: 'Experiencia para el aula',
    route: '/actividad/uso-con-intencion',
    queryParams: { perfil: 'teachers' },
  },
];

export const INCIDENT_STEPS: ReadonlyArray<IncidentStep> = [
  {
    title: 'Escucha y protege',
    description: 'Mantén la calma y evita culpar o interrogar de manera insistente. Si existe peligro inmediato, interrumpe el contacto y solicita ayuda de emergencia al 911.',
  },
  {
    title: 'Conserva únicamente la información necesaria',
    description: 'Registra fechas, nombres de cuentas, enlaces y capturas indispensables, sin difundirlas entre otras personas. Si hay contenido sexual de una persona menor de edad, no lo descargues ni lo reenvíes.',
  },
  {
    title: 'Protege las cuentas',
    description: 'Cambia las contraseñas comprometidas, cierra sesiones abiertas y activa la verificación en dos pasos. Utiliza las opciones de bloqueo y reporte cuando corresponda.',
  },
  {
    title: 'Solicita el apoyo que corresponda',
    description: 'Si la situación se relaciona con la escuela, informa a la dirección o a la persona responsable de recibir los avisos. Ante amenazas, extorsión, explotación o un posible delito, busca orientación de la autoridad competente.',
  },
  {
    title: 'Da seguimiento sin exponer',
    description: 'Acuerden quién acompañará, qué medidas se tomarán y cuándo se revisará la situación. Comparte la información únicamente con las personas que deban intervenir.',
  },
];

export const FAQS: ReadonlyArray<FrequentlyAskedQuestion> = [
  {
    question: '¿La ley prohíbe todas las pantallas?',
    answer: 'No establece una prohibición general de las pantallas. Reconoce derechos en los entornos digitales y responsabilidades para acompañar su ejercicio de acuerdo con la edad y el desarrollo. Esto debe distinguirse de las disposiciones específicas, como la relativa a redes sociales antes de los catorce años.',
    reference: 'Artículos 2, 8, 9 y 37, fracción X',
  },
  {
    question: '¿La ley fija un tiempo diario de pantalla?',
    answer: 'No establece una cantidad única de minutos u horas. Señala que las familias deben informarse y construir acuerdos para evitar la exposición prolongada. Las recomendaciones educativas sobre horarios y momentos sin pantallas son orientaciones de acompañamiento, no un límite horario establecido por esta ley.',
    reference: 'Artículo 9',
  },
  {
    question: '¿El control parental sustituye la conversación?',
    answer: 'Como orientación educativa, conviene combinar las herramientas de control parental con conversación, acuerdos y presencia adulta. Configurar un dispositivo no sustituye escuchar lo que ocurre, revisar juntos los contenidos y explicar cómo pedir ayuda.',
    reference: 'Orientación educativa de acompañamiento',
  },
  {
    question: '¿Qué dice sobre las redes sociales antes de los 14 años?',
    answer: SOCIAL_NETWORKS_NOTE.text,
    reference: SOCIAL_NETWORKS_NOTE.reference,
  },
  {
    question: '¿La escuela puede revisar un dispositivo personal?',
    answer: 'Los artículos 21 y 27 no establecen una facultad general para revisar contenidos privados de dispositivos personales. Exigen proteger la privacidad y evitar vigilancia excesiva. Cada actuación debe sujetarse al marco jurídico y al protocolo aplicable.',
    reference: 'Artículos 21 y 27',
  },
  {
    question: '¿Desde cuándo está vigente?',
    answer: 'El transitorio primero establece que el decreto entra en vigor al día siguiente de su publicación en el Periódico Oficial El Estado de Jalisco. Para una decisión jurídica u operativa, consulta la publicación oficial y solicita orientación a la autoridad competente.',
    reference: 'Transitorio primero · Consulta la publicación oficial en Documentos y recursos',
  },
];

export const OFFICIAL_LAW_REFERENCE: ReferenceLink = {
  title: 'Texto completo de la ley',
  description: 'Disposiciones sobre derechos, responsabilidades, protección y actuación de las autoridades. Biblioteca Virtual del Congreso del Estado de Jalisco.',
  url: 'https://congresoweb.congresojal.gob.mx/BibliotecaVirtual/legislacion/Leyes/Documentos_PDF-Leyes/Ley%20para%20Garantizar%20los%20Derechos%20de%20Ni%C3%B1as,%20Ni%C3%B1os%20y%20Adolescentes%20en%20Entornos%20Digitales%20del%20Estado%20de%20Jalisco%20y%20sus%20Municipios-050626.pdf',
  sourceType: 'Fuente jurídica primaria',
};

export const JALISCO_REFERENCES: ReadonlyArray<ReferenceLink> = [
  OFFICIAL_LAW_REFERENCE,
  {
    title: 'Periódico Oficial El Estado de Jalisco',
    description: 'Edición en la que se publicó el Decreto 30168/LXIV/26.',
    url: 'https://periodicooficial.jalisco.gob.mx/seccion/periodico/25227',
    sourceType: 'Publicación oficial',
  },
  {
    title: 'Protocolo de actuación escolar de Jalisco',
    description: 'Referencia institucional para la prevención, detección y atención de violencia en el ámbito escolar. No se identifica como el protocolo especializado de la nueva ley.',
    url: 'https://apprende.jalisco.gob.mx/wp-content/uploads/2022/03/ProtocoloActuacionescolarparalaprevenciondeteccionatencion.pdf',
    sourceType: 'Referencia institucional',
  },
];

export const PRACTICAL_REFERENCES: ReadonlyArray<ReferenceLink> = [
  {
    title: 'Cómo acompañar y cuidar a tu hija o hijo en el mundo digital',
    description: 'Infografía sobre acuerdos de uso, privacidad y acompañamiento. Sus recomendaciones deben contextualizarse con las disposiciones aplicables en Jalisco.',
    url: 'https://help.unicef.org/mexico/sites/mexico/files/2026-08/infografia-modulo-7-mundo-digital.pdf.pdf',
    sourceType: 'UNICEF México · PDF',
  },
  {
    title: 'Familias Conectadas',
    description: 'Materiales en español para madres, padres y personas cuidadoras sobre crianza, comunicación y acompañamiento digital.',
    url: 'https://help.unicef.org/mexico/familias-conectadas',
    sourceType: 'UNICEF México',
  },
];
