/**
 * Videos oficiales que se muestran dentro de una ruta educativa, no como una
 * lista aislada. Cada actividad indica a quién se dirige, en qué etapa puede
 * utilizarse y qué evidencia deja.
 */

export type FeaturedVideoAudience = 'teens' | 'families' | 'teachers';

export type FeaturedVideoStage =
  | 'secundaria'
  | 'preparatoria'
  | 'fam-0-5'
  | 'fam-12-14'
  | 'fam-15-17'
  | 'fam-18-22'
  | 'doc-pre'
  | 'doc-sec'
  | 'doc-prep';

export type FeaturedVideoTopic = 'wellbeing' | 'critical' | 'relations';

export interface FeaturedVideoHelpRoute {
  label: string;
  href?: '/pantallas-seguras';
  guidance: string;
}

export interface FeaturedVideoActivity {
  id: string;
  audience: FeaturedVideoAudience;
  stages: FeaturedVideoStage[];
  duration: string;
  objective: string;
  before: string[];
  during: string[];
  after: string[];
  evidence: string;
  helpRoute: FeaturedVideoHelpRoute;
}

/**
 * Las guías descargables son únicamente para personas adultas. `planned`
 * permite publicar primero la actividad en pantalla sin ofrecer un archivo
 * inexistente o de prueba.
 */
export interface AdultVideoDownload {
  id: string;
  title: string;
  audience: 'families' | 'teachers';
  stages: FeaturedVideoStage[];
  href: `/documentos/guias/${'familias' | 'docentes'}/${string}.pdf`;
  status: 'planned' | 'available';
}

export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: `https://www.youtube.com/watch?v=${string}`;
  durationSeconds: number;
  durationLabel: string;
  institution: 'Secretaría de Educación Jalisco';
  collection: 'En corto';
  topic: FeaturedVideoTopic;
  audiences: FeaturedVideoAudience[];
  stages: FeaturedVideoStage[];
  placements: Array<'audience' | 'edutips-en-corto' | 'pantallas-seguras'>;
  activities: FeaturedVideoActivity[];
  adultDownloads: AdultVideoDownload[];
}

export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: 'pantallas-primera-infancia',
    title: 'Pantallas en primera infancia',
    description: 'Una guía breve para acompañar el uso de pantallas en los primeros años sin desplazar el juego, el descanso, el movimiento ni la convivencia.',
    youtubeId: 'j2RTbq08xCQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=j2RTbq08xCQ',
    durationSeconds: 299,
    durationLabel: '4:59 min',
    institution: 'Secretaría de Educación Jalisco',
    collection: 'En corto',
    topic: 'wellbeing',
    audiences: ['families', 'teachers'],
    stages: ['fam-0-5', 'doc-pre'],
    placements: ['audience', 'edutips-en-corto', 'pantallas-seguras'],
    activities: [
      {
        id: 'pantallas-primera-infancia-familias',
        audience: 'families',
        stages: ['fam-0-5'],
        duration: '12–15 min',
        objective: 'Reconocer qué experiencias necesita una niña o un niño pequeño y acordar un uso de pantallas breve, acompañado y con un cierre claro.',
        before: [
          'Piensen en un momento cotidiano en el que aparece una pantalla: comida, espera, juego o antes de dormir.',
          'Respondan: ¿qué actividad, interacción o necesidad está sustituyendo en ese momento?'
        ],
        during: [
          'Anoten una idea del video que ya practican en casa.',
          'Identifiquen una situación en la que hace falta mayor acompañamiento adulto.'
        ],
        after: [
          'Completen tres frases: la pantalla acompaña cuando…, desplaza cuando… y termina cuando…',
          'Elijan un solo ajuste posible para esta semana y explíquenlo con palabras sencillas a la niña o el niño.'
        ],
        evidence: 'Acuerdo familiar de una página con momento de uso, acompañamiento adulto, señal de cierre y alternativa sin pantalla.',
        helpRoute: {
          label: 'Consultar orientación sobre Pantallas Seguras',
          href: '/pantallas-seguras',
          guidance: 'Si el uso interfiere de forma persistente con el sueño, la alimentación, el movimiento o la convivencia, conviene solicitar orientación profesional.'
        }
      },
      {
        id: 'pantallas-primera-infancia-docentes',
        audience: 'teachers',
        stages: ['doc-pre'],
        duration: '20 min',
        objective: 'Traducir el video en una recomendación clara para las familias de preescolar, centrada en acompañamiento y desarrollo infantil.',
        before: [
          'Identifiquen en qué momentos se utilizan pantallas dentro de la jornada y con qué propósito pedagógico.',
          'Distingan entre mirar, interactuar, crear y conversar a partir de una experiencia digital.'
        ],
        during: [
          'Registren recomendaciones que pueden modelarse desde el aula.',
          'Marquen cualquier afirmación que requiera contextualizarse para las condiciones de sus familias.'
        ],
        after: [
          'Redacten una recomendación breve que explique qué hacer antes, durante y después de una experiencia con pantalla.',
          'Incluyan una alternativa de juego, movimiento o conversación que no requiera dispositivo.'
        ],
        evidence: 'Mensaje o ficha de orientación para familias, revisada por el colectivo docente y lista para compartirse.',
        helpRoute: {
          label: 'Revisar criterios de Pantallas Seguras',
          href: '/pantallas-seguras',
          guidance: 'Cuando existan señales persistentes que afecten el desarrollo o bienestar, la escuela orienta a la familia sin emitir diagnósticos.'
        }
      }
    ],
    adultDownloads: [
      {
        id: 'guia-familias-pantallas-primera-infancia',
        title: 'Acuerdo familiar para acompañar pantallas en primera infancia',
        audience: 'families',
        stages: ['fam-0-5'],
        href: '/documentos/guias/familias/pantallas-primera-infancia.pdf',
        status: 'available'
      },
      {
        id: 'guia-docentes-pantallas-preescolar',
        title: 'Orientaciones para mediar experiencias con pantallas en preescolar',
        audience: 'teachers',
        stages: ['doc-pre'],
        href: '/documentos/guias/docentes/pantallas-preescolar.pdf',
        status: 'planned'
      }
    ]
  },
  {
    id: 'desinformacion-en-clase',
    title: 'Desinformación en clase',
    description: 'Una secuencia para comprobar una afirmación antes de usarla, creerla o compartirla en una actividad escolar.',
    youtubeId: 'Xg6rS27yENA',
    youtubeUrl: 'https://www.youtube.com/watch?v=Xg6rS27yENA',
    durationSeconds: 154,
    durationLabel: '2:34 min',
    institution: 'Secretaría de Educación Jalisco',
    collection: 'En corto',
    topic: 'critical',
    audiences: ['teachers'],
    stages: ['doc-sec', 'doc-prep'],
    placements: ['audience', 'edutips-en-corto'],
    activities: [
      {
        id: 'desinformacion-en-clase-docentes',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        duration: '20 min',
        objective: 'Aplicar una verificación lateral básica a una publicación relacionada con un contenido curricular.',
        before: [
          'Muestren una publicación llamativa vinculada con la asignatura sin confirmar si es verdadera o falsa.',
          'El grupo registra qué le hace confiar o desconfiar y qué evidencia necesitaría para sostener una conclusión.'
        ],
        during: [
          'Anoten las preguntas de verificación que propone el video.',
          'Identifiquen en qué momento conviene salir de la publicación y buscar información sobre la fuente.'
        ],
        after: [
          'Verifiquen autor o institución, fecha, evidencia y cobertura de al menos dos fuentes independientes y confiables.',
          'Cierren con una decisión justificada: usar, contextualizar o descartar la publicación.'
        ],
        evidence: 'Ficha de verificación con enlaces consultados, hallazgos y una conclusión respaldada por evidencia.',
        helpRoute: {
          label: 'Consultar la ruta de ayuda',
          guidance: 'Si el contenido involucra a integrantes de la comunidad escolar o puede causar daño, no se redistribuye: se conserva la referencia y se informa por la vía institucional.'
        }
      }
    ],
    adultDownloads: [
      {
        id: 'guia-docentes-desinformacion-clase',
        title: 'Secuencia de 20 minutos para verificar información en clase',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        href: '/documentos/guias/docentes/desinformacion-en-clase.pdf',
        status: 'available'
      }
    ]
  },
  {
    id: 'la-captura-no-era-tuya',
    title: 'La captura no era tuya',
    description: 'Una situación para analizar consentimiento, privacidad y responsabilidad cuando una conversación o imagen se convierte en captura.',
    youtubeId: 'xLJTqALgOxg',
    youtubeUrl: 'https://www.youtube.com/watch?v=xLJTqALgOxg',
    durationSeconds: 181,
    durationLabel: '3:01 min',
    institution: 'Secretaría de Educación Jalisco',
    collection: 'En corto',
    topic: 'relations',
    audiences: ['teens', 'families', 'teachers'],
    stages: ['secundaria', 'preparatoria', 'fam-12-14', 'fam-15-17', 'fam-18-22', 'doc-sec', 'doc-prep'],
    placements: ['audience', 'edutips-en-corto'],
    activities: [
      {
        id: 'la-captura-no-era-tuya-adolescentes',
        audience: 'teens',
        stages: ['secundaria', 'preparatoria'],
        duration: '12–15 min',
        objective: 'Distinguir entre recibir, conservar y redistribuir una captura, y elegir una respuesta que proteja a la persona afectada.',
        before: [
          'Respondan de forma anónima: ¿una captura deja de ser privada cuando llega a otro teléfono?',
          'Distingan lo técnicamente posible de lo que es respetuoso y responsable.'
        ],
        during: [
          'Identifiquen el primer momento en que todavía podía detenerse la difusión.',
          'Observen quiénes participan en el daño aunque no hayan creado la captura.'
        ],
        after: [
          'Construyan tres respuestas posibles ante una captura ajena: no reenviar, avisar y pedir apoyo.',
          'Practiquen una frase para negarse a compartir sin exponer nuevamente a la persona afectada.'
        ],
        evidence: 'Tarjeta digital con una decisión, una frase de respuesta y una persona o canal de ayuda.',
        helpRoute: {
          label: 'Pedir ayuda sin redistribuir el contenido',
          guidance: 'Si la captura expone datos, amenazas o contenido íntimo, no la reenvíes; conserva solo la evidencia indispensable y acude de inmediato con una persona adulta de confianza.'
        }
      },
      {
        id: 'la-captura-no-era-tuya-familias',
        audience: 'families',
        stages: ['fam-12-14', 'fam-15-17'],
        duration: '15 min',
        objective: 'Preparar una respuesta familiar que priorice escucha, contención, conservación segura de evidencia y búsqueda de apoyo.',
        before: [
          'Pregunten qué diferencia encuentran entre mostrar una conversación y reenviarla.',
          'Aclaren que pedir ayuda no debe provocar castigo automático ni pérdida inmediata del dispositivo.'
        ],
        during: [
          'Identifiquen qué respuesta adulta facilitaría que una hija o un hijo cuente lo ocurrido.',
          'Registren las acciones que podrían aumentar la exposición, como reenviar la captura para “avisar”.'
        ],
        after: [
          'Ensayen la respuesta: “Gracias por contarlo; no es tu culpa pedir ayuda; vamos a resolverlo contigo”.',
          'Acuerden a quién acudir y cómo guardar únicamente la evidencia necesaria sin seguir difundiendo.'
        ],
        evidence: 'Ruta familiar de respuesta con persona de confianza, canal escolar y pasos para evitar una nueva difusión.',
        helpRoute: {
          label: 'Consultar qué hacer ante una exposición',
          guidance: 'Si existen amenazas, extorsión, datos personales o contenido íntimo, busquen apoyo institucional especializado y eviten confrontar o negociar directamente con quien agrede.'
        }
      },
      {
        id: 'la-captura-no-era-tuya-jovenes-adultos',
        audience: 'families',
        stages: ['fam-18-22'],
        duration: '12–15 min',
        objective: 'Analizar el consentimiento y la responsabilidad entre pares desde la autonomía de las personas jóvenes adultas, sin convertir el acompañamiento familiar en supervisión.',
        before: [
          'Piensa qué cambia —y qué no— cuando una conversación puede capturarse, guardarse y reenviarse.',
          'Distingue entre tener acceso a un contenido y tener consentimiento para compartirlo.'
        ],
        during: [
          'Identifica el primer momento en que todavía podía detenerse la difusión.',
          'Observa cómo puede apoyar una amistad sin pedir ni conservar nuevas copias del contenido.'
        ],
        after: [
          'Formula un límite claro para una relación entre pares: “No compartas conversaciones o imágenes mías sin preguntarme”.',
          'Define qué harías para reparar el daño si ya compartiste y a qué canal acudirías ante amenazas, extorsión o exposición íntima.'
        ],
        evidence: 'Decisión personal de consentimiento digital y ruta de apoyo entre pares e institucional.',
        helpRoute: {
          label: 'Consultar qué hacer ante una exposición',
          guidance: 'Si existen amenazas, extorsión, datos personales o contenido íntimo, evita negociar directamente, conserva solo la evidencia indispensable y solicita apoyo especializado.'
        }
      },
      {
        id: 'la-captura-no-era-tuya-docentes',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        duration: '25 min',
        objective: 'Analizar los roles en la difusión de una captura y activar una respuesta escolar que no revictimice.',
        before: [
          'Presenten un caso ficticio sin nombres, imágenes reales ni detalles que permitan identificar a alguien.',
          'El grupo ubica responsabilidades de quien captura, comparte, comenta, observa y ayuda.'
        ],
        during: [
          'Identifiquen decisiones que frenan o amplifican el daño.',
          'Observen qué información no necesita mostrarse al grupo para comprender la situación.'
        ],
        after: [
          'Construyan una ruta breve: detener difusión, proteger, escuchar, documentar lo indispensable y activar el protocolo correspondiente.',
          'Cierren con un acuerdo de grupo que no culpabilice a quien solicita ayuda.'
        ],
        evidence: 'Protocolo de aula de una página con acciones, responsables y canal de escalamiento escolar.',
        helpRoute: {
          label: 'Activar la ruta institucional de atención',
          guidance: 'El personal docente no investiga por su cuenta ni solicita nuevas copias; informa a la autoridad escolar y aplica el protocolo vigente.'
        }
      }
    ],
    adultDownloads: [
      {
        id: 'guia-familias-capturas-consentimiento',
        title: 'Qué hacer si una captura expone a alguien de la familia',
        audience: 'families',
        stages: ['fam-12-14', 'fam-15-17'],
        href: '/documentos/guias/familias/capturas-y-consentimiento.pdf',
        status: 'available'
      },
      {
        id: 'guia-docentes-capturas-consentimiento',
        title: 'Secuencia y ruta escolar ante capturas compartidas sin consentimiento',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        href: '/documentos/guias/docentes/capturas-consentimiento-aula.pdf',
        status: 'planned'
      }
    ]
  },
  {
    id: 'no-le-sigas-al-grupo',
    title: 'No le sigas al grupo',
    description: 'Una situación para reconocer presión grupal en línea, ensayar una salida y pedir ayuda sin quedarse solo frente al problema.',
    youtubeId: 'n1Ot6o6vRMk',
    youtubeUrl: 'https://www.youtube.com/watch?v=n1Ot6o6vRMk',
    durationSeconds: 200,
    durationLabel: '3:20 min',
    institution: 'Secretaría de Educación Jalisco',
    collection: 'En corto',
    topic: 'relations',
    audiences: ['teens', 'families', 'teachers'],
    stages: ['secundaria', 'preparatoria', 'fam-12-14', 'fam-15-17', 'fam-18-22', 'doc-sec', 'doc-prep'],
    placements: ['audience', 'edutips-en-corto'],
    activities: [
      {
        id: 'no-le-sigas-al-grupo-adolescentes',
        audience: 'teens',
        stages: ['secundaria', 'preparatoria'],
        duration: '12–15 min',
        objective: 'Reconocer tácticas de presión grupal y ensayar respuestas que permitan detenerse, salir y buscar apoyo.',
        before: [
          'Completen la frase: “Es difícil decir que no cuando el grupo…”.',
          'Distingan pertenecer de participar en algo que puede lastimar o poner a alguien en riesgo.'
        ],
        during: [
          'Identifiquen las frases, reacciones o silencios que aumentan la presión.',
          'Localicen el momento en que una persona del grupo podría cambiar el rumbo.'
        ],
        after: [
          'Ensayen tres salidas: negativa directa, propuesta alternativa y búsqueda de apoyo.',
          'Elijan una frase que podrían usar en un chat real sin escalar el conflicto.'
        ],
        evidence: 'Respuesta ensayada y plan personal con una salida del chat, una alternativa y una persona de confianza.',
        helpRoute: {
          label: 'Buscar apoyo ante presión o amenazas',
          guidance: 'Si hay amenazas, humillación, coerción o riesgo físico, sal de la situación, conserva la evidencia indispensable y pide ayuda de inmediato.'
        }
      },
      {
        id: 'no-le-sigas-al-grupo-familias',
        audience: 'families',
        stages: ['fam-12-14', 'fam-15-17'],
        duration: '15 min',
        objective: 'Abrir una conversación sin juicio sobre pertenencia y presión grupal, y acordar una forma discreta de pedir ayuda.',
        before: [
          'Pregunten qué hace difícil salir de un chat o rechazar un reto cuando participan amistades.',
          'Escuchen primero; eviten convertir la conversación en interrogatorio o advertencia general.'
        ],
        during: [
          'Observen qué señales indican que ya no se trata de una broma.',
          'Identifiquen una respuesta adulta que mantenga abierto el diálogo.'
        ],
        after: [
          'Acuerden una palabra o mensaje breve para pedir ayuda sin tener que explicar todo en ese momento.',
          'Practiquen una respuesta para salir de una situación y un paso para informar sin exponer a otras personas.'
        ],
        evidence: 'Acuerdo familiar con señal de ayuda, primera respuesta adulta y dos personas o canales de apoyo.',
        helpRoute: {
          label: 'Consultar la ruta de apoyo',
          guidance: 'Ante amenazas o riesgo inmediato, prioricen la seguridad y activen los canales institucionales correspondientes.'
        }
      },
      {
        id: 'no-le-sigas-al-grupo-jovenes-adultos',
        audience: 'families',
        stages: ['fam-18-22'],
        duration: '12–15 min',
        objective: 'Reconocer presión y coerción entre pares, ejercer autonomía y activar redes de apoyo sin depender de supervisión familiar.',
        before: [
          'Identifica qué hace difícil rechazar una invitación, reto o dinámica cuando viene de amistades, pareja o compañeros.',
          'Distingue una invitación negociable de una presión que utiliza culpa, amenaza o humillación.'
        ],
        during: [
          'Observa qué señales muestran que la decisión dejó de ser libre.',
          'Identifica una acción de apoyo entre pares que no confronte ni exponga a la persona.'
        ],
        after: [
          'Ensaya una negativa clara, una salida segura y una solicitud concreta de apoyo.',
          'Ubica dos personas o servicios a los que acudirías si la presión escala a amenaza, violencia o riesgo físico.'
        ],
        evidence: 'Plan personal de límites, salida segura y red de apoyo entre pares e institucional.',
        helpRoute: {
          label: 'Buscar apoyo ante presión o amenazas',
          guidance: 'Ante coerción, violencia o riesgo inmediato, prioriza tu seguridad, conserva la evidencia indispensable y activa apoyo institucional o especializado.'
        }
      },
      {
        id: 'no-le-sigas-al-grupo-docentes',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        duration: '25 min',
        objective: 'Analizar la presión de pares como dinámica de grupo y practicar intervenciones que no expongan a quien solicita apoyo.',
        before: [
          'Presenten un dilema ficticio sobre un reto o chat sin pedir experiencias personales al alumnado.',
          'El grupo identifica opciones disponibles para quien recibe presión y para quienes observan.'
        ],
        during: [
          'Registren acciones de espectadores que aumentan o disminuyen la presión.',
          'Identifiquen el punto en que corresponde dejar la dinámica grupal y activar apoyo adulto.'
        ],
        after: [
          'Representen respuestas breves: no participar, desviar el reto, apoyar en privado y avisar.',
          'Relacionen las respuestas con la ruta escolar de atención, sin dramatizar casos reales.'
        ],
        evidence: 'Guion de intervención para observadores y una ruta de atención validada por el plantel.',
        helpRoute: {
          label: 'Revisar la ruta institucional de atención',
          guidance: 'Si existe coerción, amenaza, violencia o riesgo para la integridad, se documenta lo indispensable y se activa el protocolo escolar vigente.'
        }
      }
    ],
    adultDownloads: [
      {
        id: 'guia-familias-presion-grupal',
        title: 'Cómo conversar y actuar ante presión grupal en línea',
        audience: 'families',
        stages: ['fam-12-14', 'fam-15-17'],
        href: '/documentos/guias/familias/presion-grupal-en-linea.pdf',
        status: 'planned'
      },
      {
        id: 'guia-docentes-presion-grupal',
        title: 'Actividad de aula y ruta de apoyo ante presión grupal en línea',
        audience: 'teachers',
        stages: ['doc-sec', 'doc-prep'],
        href: '/documentos/guias/docentes/presion-grupal-en-linea.pdf',
        status: 'available'
      }
    ]
  }
];

export function featuredVideosFor(audience: FeaturedVideoAudience, stage: FeaturedVideoStage): FeaturedVideo[] {
  return FEATURED_VIDEOS.filter(video =>
    video.activities.some(activity => activity.audience === audience && activity.stages.includes(stage))
  );
}

export function featuredVideoActivityFor(
  video: FeaturedVideo,
  audience: FeaturedVideoAudience,
  stage: FeaturedVideoStage
): FeaturedVideoActivity | undefined {
  return video.activities.find(activity => activity.audience === audience && activity.stages.includes(stage));
}

export function availableAdultDownloads(video: FeaturedVideo, audience: 'families' | 'teachers'): AdultVideoDownload[] {
  return video.adultDownloads.filter(download => download.audience === audience && download.status === 'available');
}
