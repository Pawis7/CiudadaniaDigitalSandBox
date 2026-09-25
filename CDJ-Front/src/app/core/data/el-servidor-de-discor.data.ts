// CDJ-GAME-P01 · El servidor de Discor
// Dimensiones: datos, limites, convivencia, ayuda

export interface DiscorOption {
  text:     string;
  points:   number;
  level:    'best' | 'good' | 'partial' | 'risk' | 'danger';
  dims:     { datos: number; limites: number; convivencia: number; ayuda: number };
  plus:     string;     // Lo mejor de tu decisión
  watch:    string;    // Ojo aquí
  next:     string;     // Si te pasa en la vida real
  feedback: string; // Retroalimentación breve
}

export type DiscorFeedItem =
  | { type: 'system'; text: string }
  | { type: 'text'; from: string; role?: string; avatar: string; text: string; me?: boolean }
  | { type: 'image'; from: string; title: string; caption: string; theme: string }
  | { type: 'voice'; from: string; role?: string; avatar: string; duration: string; theme: string; text: string };

export interface DiscorMission {
  id:       string;
  title:    string;
  channel:  string;
  goal:     string;
  signals:  string[];
  posts:    DiscorFeedItem[];
  question: string;
  options:  DiscorOption[];
  badge:    string;
}

export interface DiscorRank {
  min:   number;
  max:   number;
  title: string;
  desc:  string;
}

export interface DiscorGuideSection {
  title:   string;
  bullets: string[];
}

export interface DiscorGuide {
  title:    string;
  subtitle: string;
  sections: DiscorGuideSection[];
}

export interface DiscorMetadata {
  code:           string;
  title:          string;
  subtitle:       string;
  segment:        string;
  subsegment:     string;
  axes:           string[];
  format:         string;
  estimated_time: string;
  version:        string;
}

export interface DiscorGameSchema {
  meta:    DiscorMetadata;
  ui:      {
    result_labels:  Record<'best' | 'good' | 'partial' | 'risk' | 'danger', string>;
    feedback_boxes: string[];
  };
  intro:   {
    hook:    string;
    bullets: [string, string][];
    why:     { title: string; text: string; tone: string }[];
  };
  missions: DiscorMission[];
  results:  {
    ranks: DiscorRank[];
  };
  guide:    DiscorGuide;
}

export const DISCOR_GAME_DATA: DiscorGameSchema = {
  "meta": {
    "code": "CDJ-GAME-P01",
    "title": "El servidor de Discor",
    "subtitle": "Cuando el juego se sale de la partida",
    "segment": "Estudiantes",
    "subsegment": "Bachillerato",
    "axes": [
      "Huella e identidad digital",
      "Participación y ciudadanía en línea",
      "Privacidad y seguridad"
    ],
    "format": "Simulador interactivo gamer",
    "estimated_time": "4 minutos",
    "version": "v5 refinada"
  },
  "ui": {
    "result_labels": {
      "best": "Buena jugada",
      "good": "Vas bien",
      "partial": "Puede servir, pero...",
      "risk": "Ojo",
      "danger": "Ojo"
    },
    "feedback_boxes": [
      "Lo mejor de tu decisión",
      "Ojo aquí",
      "Si te pasa en la vida real"
    ]
  },
  "intro": {
    "hook": "Te invitan a un servidor de clan. Al principio parece una oportunidad. Luego aparecen presión, voz, secreto y un pago raro.",
    "bullets": [
      [
        "Tiempo",
        "4–6 min"
      ],
      [
        "Modo",
        "6 misiones"
      ],
      [
        "Reto",
        "Leer señales"
      ],
      [
        "Final",
        "Guía rápida"
      ]
    ],
    "why": [
      {
        "title": "Los riesgos no siempre pasan en la partida",
        "text": "A veces aparecen en chats, notas de voz, clips, pagos o grupos externos.",
        "tone": "cyan"
      },
      {
        "title": "La presión social también juega",
        "text": "Cuando quieres encajar o no quedar mal, bajas la guardia más fácil.",
        "tone": "orange"
      },
      {
        "title": "Jugar con criterio te protege",
        "text": "No se trata de dejar de jugar. Se trata de no regalar datos, dinero ni reputación.",
        "tone": "pink"
      }
    ]
  },
  "missions": [
    {
      "id": "M1",
      "title": "Drop de invitación",
      "channel": "#lobby-match",
      "goal": "No confundas invitación con confianza.",
      "signals": [
        "Invitación rápida",
        "Promesa de rango",
        "Canales privados"
      ],
      "posts": [
        {
          "type": "system",
          "text": "Partida terminada · Squad Eclipse ganó 5-3"
        },
        {
          "type": "text",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "text": "Juegas bien. Vente al servidor del clan. Hay rol Élite y salas privadas."
        },
        {
          "type": "image",
          "from": "NovaRush",
          "title": "Banner del servidor",
          "caption": "Acceso rápido · retos · voz · clips",
          "theme": "cyan"
        },
        {
          "type": "text",
          "from": "Alex",
          "me": true,
          "avatar": "A",
          "text": "¿Qué onda?"
        }
      ],
      "question": "Te cae la invitación. ¿Cuál sería tu primer movimiento?",
      "options": [
        {
          "text": "Me meto ya. Si me invitaron, por algo será.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Respondes rápido a la invitación.",
          "watch": "Das confianza sin revisar el espacio.",
          "next": "Primero mira reglas, canales y tono del servidor.",
          "feedback": "Entrar sin mirar te deja reaccionando tarde."
        },
        {
          "text": "Reviso reglas, canales y ambiente antes de decidir.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 1,
            "limites": 1,
            "convivencia": 1,
            "ayuda": 0
          },
          "plus": "Pones contexto antes que emoción.",
          "watch": "Si ves secreto, presión o ganchos raros, mejor ni te quedes.",
          "next": "Observar primero también es jugar con criterio.",
          "feedback": "Buena jugada: primero lees el entorno, luego decides."
        },
        {
          "text": "Entro, pero con todo silenciado.",
          "points": 2,
          "level": "partial",
          "dims": {
            "datos": 1,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "No te avientas de lleno.",
          "watch": "Aun así, ya entraste a una comunidad sin evaluarla.",
          "next": "Silenciar ayuda un poco; evaluar ayuda más.",
          "feedback": "Tiene algo de cuidado, pero todavía te falta filtro."
        },
        {
          "text": "Pregunto qué premio dan por entrar.",
          "points": 1,
          "level": "risk",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Buscas entender el gancho.",
          "watch": "Pones el premio por delante de la seguridad.",
          "next": "Cuando el premio es lo central, conviene sospechar más.",
          "feedback": "El gancho te mueve antes que el criterio."
        }
      ],
      "badge": "Filtro activo"
    },
    {
      "id": "M2",
      "title": "La llamada aparte",
      "channel": "🔊 raid-room",
      "goal": "Lo importante no tiene por qué moverse a privado.",
      "signals": [
        "Cambio a privado",
        "Presión de grupo",
        "Piden rapidez"
      ],
      "posts": [
        {
          "type": "text",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "text": "Para entrar al torneo, pásate al canal de voz."
        },
        {
          "type": "voice",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "duration": "0:09",
          "theme": "purple",
          "text": "Éntrale ya. Ahí te explico mejor sin tanto texto."
        },
        {
          "type": "text",
          "from": "ByteWolf",
          "role": "miembro",
          "avatar": "B",
          "text": "Dale, todos entramos por voz."
        }
      ],
      "question": "Quieren sacarte del canal público. ¿Qué haces?",
      "options": [
        {
          "text": "Me paso a voz, pero sin decir nada personal.",
          "points": 2,
          "level": "partial",
          "dims": {
            "datos": 1,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "No sueltas datos enseguida.",
          "watch": "Igual aceptas una presión para irte a un espacio menos visible.",
          "next": "Si algo solo puede hablarse “afuera”, ya hay señal.",
          "feedback": "No es terrible, pero sí te mete a una zona más presionante."
        },
        {
          "text": "Pido que cualquier regla o requisito quede por escrito en público.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 0,
            "limites": 1,
            "convivencia": 1,
            "ayuda": 1
          },
          "plus": "Bajas presión y ganas claridad.",
          "watch": "Si insisten en mover todo a privado, eso ya te informa.",
          "next": "Lo importante debe poder explicarse sin esconderse.",
          "feedback": "Muy buena decisión: pides claridad en un espacio visible."
        },
        {
          "text": "Entro por no quedar mal con el grupo.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Buscas encajar.",
          "watch": "El grupo termina decidiendo por ti.",
          "next": "Quedar bien no debería costarte control.",
          "feedback": "Cuando el miedo a quedar mal manda, tu filtro baja."
        },
        {
          "text": "Le pregunto a alguien de confianza si ese canal se ve confiable.",
          "points": 3,
          "level": "good",
          "dims": {
            "datos": 0,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 1
          },
          "plus": "No te quedas solo con la presión del momento.",
          "watch": "Consultar ayuda, pero no reemplaza verificar cómo se mueve el servidor.",
          "next": "Consulta y verificación funcionan mejor juntas.",
          "feedback": "Bien: te apoyas en alguien más y le bajas prisa al momento."
        }
      ],
      "badge": "Canal seguro"
    },
    {
      "id": "M3",
      "title": "Verificación trucha",
      "channel": "DM · NovaRush",
      "goal": "Tu voz, tu cara y tus datos no son moneda de cambio.",
      "signals": [
        "DM privado",
        "Piden audio/foto",
        "Recompensa a cambio"
      ],
      "posts": [
        {
          "type": "text",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "text": "Para darte rol Élite necesito verificar que sí eres tú."
        },
        {
          "type": "voice",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "duration": "0:07",
          "theme": "orange",
          "text": "Manda un audio y una selfie. Es rapidísimo."
        },
        {
          "type": "text",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "text": "Mejor no lo pongas en el grupo. Es entre nosotros."
        }
      ],
      "question": "Te piden audio y selfie. ¿Cómo respondes?",
      "options": [
        {
          "text": "Mando solo el audio; foto no.",
          "points": 1,
          "level": "risk",
          "dims": {
            "datos": 1,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Intentas exponer menos.",
          "watch": "Sigues aceptando una “verificación” que no tendría por qué existir.",
          "next": "No es solo cuánto compartes, sino por qué te lo piden.",
          "feedback": "Compartir menos no vuelve normal algo que ya era raro."
        },
        {
          "text": "Digo que no comparto voz ni imagen y, si insiste, salgo y reporto.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 1,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 1
          },
          "plus": "Proteges tus datos y pones un límite claro.",
          "watch": "Si ya te incomodó, conviene guardar evidencia antes de cerrar.",
          "next": "Ningún rol, skin o beneficio vale tu voz o tu imagen.",
          "feedback": "Exacto: límite claro y salida limpia."
        },
        {
          "text": "Pregunto qué me darán a cambio.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Intentas medir el “trato”.",
          "watch": "Tratas tu identidad como si fuera parte de una negociación.",
          "next": "Si te piden exposición para “ganar algo”, ya hay mala señal.",
          "feedback": "Tus datos no deberían entrar a ese intercambio."
        },
        {
          "text": "Lo platico con alguien de confianza y comparo si a otros les pasó.",
          "points": 3,
          "level": "good",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 1
          },
          "plus": "Rompes el aislamiento.",
          "watch": "No necesitas seguir contestándole mientras consultas.",
          "next": "Pedir perspectiva ayuda más si ya paraste la conversación.",
          "feedback": "Bien: salir del aislamiento aclara mejor la situación."
        }
      ],
      "badge": "Datos blindados"
    },
    {
      "id": "M4",
      "title": "Regla tóxica",
      "channel": "#reglas-eclipse",
      "goal": "Privacidad no es lo mismo que secreto.",
      "signals": [
        "No hablar con adultos",
        "No capturas",
        "Regla absoluta"
      ],
      "posts": [
        {
          "type": "image",
          "from": "Sistema",
          "title": "Nueva regla",
          "caption": "Lo que pasa en Eclipse se queda en Eclipse. No capturas. No adultos.",
          "theme": "pink"
        },
        {
          "type": "text",
          "from": "ByteWolf",
          "role": "miembro",
          "avatar": "B",
          "text": "Tranqui. Así evitamos dramas."
        }
      ],
      "question": "Lees esa regla del clan. ¿Qué te dice?",
      "options": [
        {
          "text": "La veo normal. Todo clan tiene reglas internas.",
          "points": 1,
          "level": "risk",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Reconoces que las comunidades sí ponen reglas.",
          "watch": "Pero una regla sana no te prohíbe pedir ayuda ni guardar evidencia.",
          "next": "No toda regla merece obediencia automática.",
          "feedback": "Detectas que es una regla, pero no que es una mala regla."
        },
        {
          "text": "La tomo como alerta: si algo incomoda, puedo salir, guardar evidencia y pedir apoyo.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 0,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 1
          },
          "plus": "No dejas que el grupo te quite margen de protección.",
          "watch": "Si hubo amenaza o presión directa, no lo cargues solo.",
          "next": "Ninguna comunidad está por encima de tu seguridad.",
          "feedback": "Correcto: privacidad sana sí, secreto impuesto no."
        },
        {
          "text": "Me quedo, pero sin participar en nada raro.",
          "points": 2,
          "level": "partial",
          "dims": {
            "datos": 0,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Intentas no exponerte.",
          "watch": "Seguir adentro también normaliza la regla.",
          "next": "A veces cuidarte implica salir, no solo observar.",
          "feedback": "Sirve un poco, pero te deja demasiado cerca del problema."
        },
        {
          "text": "Me burlo de la regla en el chat.",
          "points": 1,
          "level": "risk",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 1,
            "ayuda": 0
          },
          "plus": "Notas que algo no está bien.",
          "watch": "La burla puede escalar el conflicto sin protegerte mejor.",
          "next": "Poner límite no exige pelearte con todo el servidor.",
          "feedback": "Detectar bien no siempre significa responder bien."
        }
      ],
      "badge": "Límite claro"
    },
    {
      "id": "M5",
      "title": "Clip para humillar",
      "channel": "#clips",
      "goal": "No frenes el daño haciéndolo más viral.",
      "signals": [
        "Se burlan de alguien",
        "Quieren compartir más",
        "Ataque a la persona"
      ],
      "posts": [
        {
          "type": "image",
          "from": "ClipBot",
          "title": "Clip subido",
          "caption": "Fail en ranked + comentarios sobre su voz",
          "theme": "purple"
        },
        {
          "type": "text",
          "from": "KhanPixel",
          "role": "miembro",
          "avatar": "K",
          "text": "Pásenlo al grupo del salón, está buenísimo."
        },
        {
          "type": "text",
          "from": "ByteWolf",
          "role": "miembro",
          "avatar": "B",
          "text": "También súbanlo al canal de memes."
        }
      ],
      "question": "Aparece un clip para burlarse. ¿Qué harías?",
      "options": [
        {
          "text": "Lo comparto para que todos vean lo mal que están.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Quieres señalar la agresión.",
          "watch": "Pero al reenviarlo haces crecer la exposición.",
          "next": "Denunciar no es lo mismo que viralizar.",
          "feedback": "Buena intención, mala ruta: el daño sigue circulando."
        },
        {
          "text": "Pido que no lo sigan moviendo, reporto y apoyo sin presionar a la persona.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 1,
            "ayuda": 1
          },
          "plus": "Frenas la circulación y abres una vía útil.",
          "watch": "Si nadie modera, toca salir y buscar apoyo fuera del servidor.",
          "next": "Ayudar también es no convertir el daño en espectáculo.",
          "feedback": "Muy buena ruta: cuidas a la persona y al ambiente."
        },
        {
          "text": "No me meto; en gaming siempre pasan estas cosas.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Evitas conflicto directo.",
          "watch": "Eso deja sola a la persona y normaliza el acoso.",
          "next": "Que algo sea frecuente no significa que sea aceptable.",
          "feedback": "La costumbre no es criterio."
        },
        {
          "text": "Defiendo insultando a quienes se burlan.",
          "points": 2,
          "level": "partial",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 1,
            "ayuda": 0
          },
          "plus": "Quieres frenar la agresión.",
          "watch": "La pelea puede crecer y tapar el daño real.",
          "next": "Defender mejor: límite claro, reporte y apoyo.",
          "feedback": "Hay intención de ayudar, pero te falta táctica."
        }
      ],
      "badge": "No dar más vuelo"
    },
    {
      "id": "M6",
      "title": "Torneo con depósito",
      "channel": "#eventos",
      "goal": "Con dinero digital, la prisa casi siempre juega en tu contra.",
      "signals": [
        "Urgencia",
        "Pago externo",
        "Secreto"
      ],
      "posts": [
        {
          "type": "image",
          "from": "NovaRush",
          "title": "Torneo relámpago",
          "caption": "Entrada $80 · premio en skins · cupo limitado",
          "theme": "orange"
        },
        {
          "type": "text",
          "from": "NovaRush",
          "role": "líder",
          "avatar": "N",
          "text": "Transferencia al número del banner. No lo comenten fuera para que no se llene."
        },
        {
          "type": "text",
          "from": "ByteWolf",
          "role": "miembro",
          "avatar": "B",
          "text": "Yo sí le entro."
        }
      ],
      "question": "Sale el torneo con depósito. ¿Qué haces?",
      "options": [
        {
          "text": "Pago rápido; total no es tanto.",
          "points": 0,
          "level": "danger",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "No quieres perder la oportunidad.",
          "watch": "Urgencia + pago externo + secreto es una mezcla muy riesgosa.",
          "next": "No importa si son 80 o 800: primero se verifica.",
          "feedback": "Monto pequeño también puede ser anzuelo."
        },
        {
          "text": "Verifico si el torneo es real, no pago por fuera y consulto antes.",
          "points": 4,
          "level": "best",
          "dims": {
            "datos": 0,
            "limites": 1,
            "convivencia": 0,
            "ayuda": 1
          },
          "plus": "Frenas el impulso y comparas con vías confiables.",
          "watch": "Si huele mal, también conviene avisar para que otros no caigan.",
          "next": "En dinero digital, verificar es parte del juego.",
          "feedback": "Exacto: para, verifica y decide sin presión."
        },
        {
          "text": "Pido descuento o pago la mitad.",
          "points": 1,
          "level": "risk",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "Intentas perder menos.",
          "watch": "Negociar no vuelve seguro un pago dudoso.",
          "next": "La pregunta no es cuánto, sino a quién y por qué vía.",
          "feedback": "Bajar el monto no baja el riesgo principal."
        },
        {
          "text": "Espero a ver si otros pagan y les copio.",
          "points": 2,
          "level": "partial",
          "dims": {
            "datos": 0,
            "limites": 0,
            "convivencia": 0,
            "ayuda": 0
          },
          "plus": "No te lanzas primero.",
          "watch": "La presión de grupo también puede ser parte del truco.",
          "next": "Observar ayuda poco; verificar ayuda más.",
          "feedback": "Parece prudente, pero todavía falta validación real."
        }
      ],
      "badge": "Dinero con radar"
    }
  ],
  "results": {
    "ranks": [
      {
        "min": 0,
        "max": 7,
        "title": "Radar offline",
        "desc": "La prisa, el premio o la presión del grupo te mueven demasiado fácil."
      },
      {
        "min": 8,
        "max": 14,
        "title": "Subiendo nivel",
        "desc": "Ya detectas algunas señales, pero todavía te cuesta sostener el criterio."
      },
      {
        "min": 15,
        "max": 20,
        "title": "Detector gamer",
        "desc": "Lees señales relevantes y casi siempre eliges rutas bastante seguras."
      },
      {
        "min": 21,
        "max": 24,
        "title": "Guardia de servidor",
        "desc": "Juegas con criterio: cuidas datos, límites, convivencia y decisiones con dinero."
      }
    ]
  },
  "guide": {
    "title": "Guía gamer · Muévete con criterio en servidores y clanes",
    "subtitle": "Una guía corta, útil y no rellenable para estudiantes de bachillerato que juegan en línea y conviven en chats, voz y torneos.",
    "sections": [
      {
        "title": "1. Señales rojas",
        "bullets": [
          "Te prometen rango, skins, monedas o acceso especial si das audio, foto, datos o dinero.",
          "Te quieren sacar del canal público para “explicarte mejor” sin razón clara.",
          "Aparecen reglas como “no lo cuentes”, “sin capturas” o “no metas adultos”.",
          "Te presionan para pagar rápido o por fuera de la plataforma.",
          "Se burlan de alguien y quieren mover el clip a más grupos o canales."
        ]
      },
      {
        "title": "2. Qué sí conviene hacer",
        "bullets": [
          "Revisar reglas, canales y ambiente antes de quedarte en un servidor.",
          "Pedir que lo importante quede por escrito en un espacio visible.",
          "Decir que no cuando te pidan voz, foto o datos para darte beneficios.",
          "Guardar evidencia si algo te incomoda, presiona o cruza una línea.",
          "Consultar con alguien de confianza antes de pagar, compartir o seguir."
        ]
      },
      {
        "title": "3. Qué no conviene hacer",
        "bullets": [
          "Confiarte solo porque alguien juega bien, tiene rango o parece popular.",
          "Quedarte por miedo a quedar mal con el grupo.",
          "Normalizar burlas, humillaciones o acoso porque “así es el gaming”.",
          "Reenviar clips o capturas para “defender”, si eso hace más grande el daño.",
          "Pensar que un monto pequeño vuelve seguro un pago dudoso."
        ]
      },
      {
        "title": "4. Si ya pasó algo raro",
        "bullets": [
          "Deja de responder y sal del espacio si lo necesitas.",
          "Guarda capturas o evidencia útil.",
          "No pagues ni compartas más información.",
          "Cuéntaselo a una persona de confianza.",
          "Reporta dentro de la plataforma cuando haya acoso, presión, fraude o exposición."
        ]
      },
      {
        "title": "5. Regla rápida para el squad",
        "bullets": [
          "Si hay prisa, pausa.",
          "Si hay secreto, sospecha.",
          "Si piden datos, voz, foto o pago, verifica.",
          "Si algo te incomoda, sal y busca apoyo."
        ]
      }
    ]
  }
};
