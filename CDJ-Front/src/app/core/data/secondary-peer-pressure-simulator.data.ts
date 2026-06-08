export interface PeerPressureMeta {
  product_id: string;
  project: string;
  segment: string;
  subsegment: string;
  dimension: string;
  verb: string;
  axis: string;
  format: string;
  duration: string;
  virtue: string;
}

export interface PeerPressureIntro {
  title: string;
  subtitle: string;
  support_chips: string[];
  disclaimer_box: {
    title: string;
    text: string;
  };
  cta_button: {
    label_primary: string;
    label_alternative: string;
  };
}

export interface PeerPressureSignalGroup {
  label: string;
  signals: string[];
}

export interface PeerPressureSignals {
  title: string;
  green: PeerPressureSignalGroup;
  yellow: PeerPressureSignalGroup;
  red: PeerPressureSignalGroup;
}

export interface PeerPressureScenario {
  id: string;
  title: string;
  setting: string;
  synopsis: string;
  main_dilemma: string;
  risk_without_action: string[];
}

export interface PeerPressureChatMessage {
  sender: string;
  message: string;
}

export interface PeerPressureChoice {
  choice_id: string;
  label: string;
  safe: number;
  risk: number;
  feedback_title: string;
  feedback: string;
  next_node: string;
}

export interface PeerPressureNode {
  node_id: string;
  order: number;
  title: string;
  context: string;
  question: string;
  signals: string[];
  hint: string;
  chat_messages: PeerPressureChatMessage[];
  choices: PeerPressureChoice[];
}

export interface PeerPressureResult {
  id: string;
  label: string;
  range: {
    min: number;
    max: number;
  };
  message: string;
  virtue_focus: string;
  next_action: string;
}

export interface PeerPressureGuide {
  title: string;
  core_rule: string;
  safe_route: string[];
  copyable_responses: string[];
  do_not_do: string[];
}

export interface PeerPressureSimulatorData {
  meta: PeerPressureMeta;
  intro: PeerPressureIntro;
  signals: PeerPressureSignals;
  scenario: PeerPressureScenario;
  nodes: PeerPressureNode[];
  results: PeerPressureResult[];
  guide: PeerPressureGuide;
}

export const PEER_PRESSURE_SIMULATOR_DATA: PeerPressureSimulatorData = {
  meta: {
    product_id: "CDJ-123",
    project: "Ciudadanía Digital Jalisco",
    segment: "Estudiantes",
    subsegment: "Secundaria",
    dimension: "D2",
    verb: "Reconocer",
    axis: "Relaciones y comunicación",
    format: "Caso + simulador + guía breve",
    duration: "8–12",
    virtue: "Fortaleza"
  },
  intro: {
    title: "¿El grupo te está empujando a escribir algo que no dirías en persona?",
    subtitle: "Entra a una escena de chat y decide cómo responder sin seguir la corriente, sin atacar y sin dejar sola a la persona afectada.",
    support_chips: ["Secundaria", "8–12 minutos", "Caso + simulador", "Relaciones y comunicación"],
    disclaimer_box: {
      title: "Este simulador no busca juzgarte.",
      text: "Sirve para practicar decisiones reales: pausar, poner límite, apoyar y pedir ayuda cuando el chat se sale de control."
    },
    cta_button: {
      label_primary: "Entrar al chat simulado",
      label_alternative: "Practicar qué responder"
    }
  },
  signals: {
    title: "Semáforo rápido del chat",
    green: {
      label: "Verde · convivencia sana",
      signals: [
        "La broma no expone datos, cuerpo, errores o vida privada.",
        "Si alguien dice que pare, el grupo respeta.",
        "Nadie queda presionado a escribir o reenviar."
      ]
    },
    yellow: {
      label: "Amarillo · presión o incomodidad",
      signals: [
        "Te dicen “no seas aguado”, “solo es broma” o “todos le estamos siguiendo”.",
        "Alguien pide que reacciones aunque no quieras.",
        "El grupo insiste en que escribas algo más pesado."
      ]
    },
    red: {
      label: "Rojo · daño o riesgo",
      signals: [
        "Se comparte una foto, captura o meme para humillar.",
        "Hay amenazas de subirlo a historias o mandarlo a otros grupos.",
        "Alguien pide datos, expone secretos o empuja a atacar a una persona.",
        "La persona afectada pide que paren y el grupo sigue."
      ]
    }
  },
  scenario: {
    id: "CASE_01",
    title: "El comentario que se salió del chat",
    setting: "Chat grupal ficticio de secundaria después de una exposición en clase.",
    synopsis: "En el grupo de 2.º B empiezan a burlarse de Leo porque se equivocó al exponer. Alguien convierte el momento en meme y presiona a los demás para escribir comentarios más pesados. Tú decides si sigues la corriente, pones límite, apoyas o pides ayuda.",
    main_dilemma: "¿Qué haces cuando el grupo te empuja a participar en algo que puede dañar a otra persona?",
    risk_without_action: [
      "La burla puede crecer y convertirse en humillación pública.",
      "Una captura puede circular fuera del grupo.",
      "La persona afectada puede sentirse aislada.",
      "Tú puedes quedar asociado a una agresión que no querías apoyar."
    ]
  },
  nodes: [
    {
      node_id: "N1",
      order: 1,
      title: "El grupo empieza a burlarse",
      context: "En el chat de 2.º B, Dani sube un sticker sobre Leo después de que se equivocó en una exposición. Varias personas reaccionan con risa. Luego Dani escribe: “A ver, tú también ponle algo, no te hagas”.",
      question: "¿Qué respondes primero?",
      signals: [
        "Te están pidiendo participar aunque no estés seguro.",
        "La burla se dirige a una persona específica.",
        "El grupo usa la risa como presión."
      ],
      hint: "Antes de escribir, pregúntate: ¿esto ayuda, divierte sin dañar o humilla a alguien?",
      chat_messages: [
        { sender: "Dani", message: "Jajaja, Leo se trabó horrible en la exposición." },
        { sender: "Sofi", message: "No inventes, todos lo vieron." },
        { sender: "Dani", message: "Tú también ponle algo, no te hagas." }
      ],
      choices: [
        {
          choice_id: "N1_A",
          label: "Seguir la corriente y escribir un comentario más pesado.",
          safe: 0,
          risk: 5,
          feedback_title: "Eso aumenta el daño.",
          feedback: "Cuando el grupo presiona, seguirle puede convertir una broma en humillación. Aunque no lo hayas iniciado, participas en el daño.",
          next_node: "N2"
        },
        {
          choice_id: "N1_B",
          label: "No escribir nada, pero reaccionar con risa para no verte mal.",
          safe: 2,
          risk: 2,
          feedback_title: "Evitas escribir, pero sigues empujando la burla.",
          feedback: "Una reacción también comunica apoyo. Si algo incomoda, el silencio con risa puede hacer que la persona afectada se sienta más sola.",
          next_node: "N2"
        },
        {
          choice_id: "N1_C",
          label: "Poner un límite breve: “Ya, no lo hagamos más grande”.",
          safe: 5,
          risk: 0,
          feedback_title: "Buena primera respuesta.",
          feedback: "No atacas a nadie y sí bajas el tono. Un límite corto puede romper la presión del grupo sin escalar el conflicto.",
          next_node: "N2"
        }
      ]
    },
    {
      node_id: "N2",
      order: 2,
      title: "La presión se dirige contra ti",
      context: "Después de que dudas o intentas poner límite, Dani responde: “Ay, qué sensible. Solo es broma. Si no le sigues, mejor ni estés en el grupo”. Algunas personas empiezan a mandar emojis de risa.",
      question: "¿Cómo sostienes tu decisión?",
      signals: [
        "Usan la vergüenza para que participes.",
        "Te amenazan con excluirte del grupo.",
        "La frase “solo es broma” está tapando el daño."
      ],
      hint: "Poner límite no significa pelear. Puedes ser firme sin insultar.",
      chat_messages: [
        { sender: "Dani", message: "Ay, qué sensible." },
        { sender: "Dani", message: "Solo es broma. Si no le sigues, mejor ni estés." },
        { sender: "Grupo", message: "😂😂😂" }
      ],
      choices: [
        {
          choice_id: "N2_A",
          label: "Responder con insultos para que dejen de molestarte.",
          safe: 1,
          risk: 4,
          feedback_title: "Eso sube la temperatura del chat.",
          feedback: "Aunque quieras defenderte, insultar cambia el foco y puede volver el conflicto más grande. El objetivo es bajar el daño, no ganar una pelea.",
          next_node: "N3"
        },
        {
          choice_id: "N2_B",
          label: "Sostener el límite: “No me late burlarme. Mejor cambiemos de tema”.",
          safe: 5,
          risk: 0,
          feedback_title: "Firme y sin agresión.",
          feedback: "Nombras tu límite sin humillar a nadie. Eso practica fortaleza: no hacer algo dañino solo por quedar bien.",
          next_node: "N3"
        },
        {
          choice_id: "N2_C",
          label: "Salirte del grupo sin decir nada.",
          safe: 3,
          risk: 1,
          feedback_title: "Puede protegerte, pero no siempre resuelve.",
          feedback: "Salir puede ser útil si el chat se vuelve inseguro. Pero si hay daño hacia alguien, conviene también guardar evidencia o pedir apoyo.",
          next_node: "N3"
        }
      ]
    },
    {
      node_id: "N3",
      order: 3,
      title: "La persona afectada te escribe",
      context: "Leo te manda mensaje privado: “¿Tú también te estás burlando de mí?”. Se nota que le dolió lo que pasó, aunque en el grupo había mandado un emoji de risa.",
      question: "¿Qué le respondes a Leo?",
      signals: [
        "Una risa no siempre significa que alguien está bien.",
        "La persona afectada busca saber si está sola.",
        "Responder con calma puede reparar parte del daño."
      ],
      hint: "Apoyar no es hablar por la persona. Es escuchar, validar y ofrecer acompañamiento.",
      chat_messages: [
        { sender: "Leo", message: "¿Tú también te estás burlando de mí?" },
        { sender: "Leo", message: "Puse risa para que no se notara, pero sí me dio pena." }
      ],
      choices: [
        {
          choice_id: "N3_A",
          label: "Decirle: “No exageres, era broma”.",
          safe: 0,
          risk: 5,
          feedback_title: "Eso minimiza lo que siente.",
          feedback: "Decir “no exageres” puede hacer que la persona afectada se sienta culpable por sentirse mal. La empatía empieza por tomar en serio lo que dice.",
          next_node: "N4"
        },
        {
          choice_id: "N3_B",
          label: "Responder: “No estoy de acuerdo con la burla. ¿Quieres que lo hablemos o pedimos apoyo?”.",
          safe: 5,
          risk: 0,
          feedback_title: "Apoyo claro y respetuoso.",
          feedback: "Validas a Leo, no expones más la situación y ofreces acompañamiento. Esa es una respuesta de convivencia digital responsable.",
          next_node: "N4"
        },
        {
          choice_id: "N3_C",
          label: "No contestar para no meterte más.",
          safe: 1,
          risk: 2,
          feedback_title: "Evitas conflicto, pero dejas sola a la persona afectada.",
          feedback: "No tienes que resolverlo todo, pero un mensaje breve de apoyo puede cambiar mucho: “No estoy de acuerdo, no estás solo”.",
          next_node: "N4"
        }
      ]
    },
    {
      node_id: "N4",
      order: 4,
      title: "El chat escala",
      context: "Dani escribe en el grupo: “Si Leo se queja, subimos el sticker a historias”. Ahora ya no es solo broma: hay amenaza de exposición pública.",
      question: "¿Qué haces para cerrar de forma segura?",
      signals: [
        "Hay amenaza de difundir contenido.",
        "La situación puede salir del grupo.",
        "Ya conviene pedir apoyo y conservar evidencia."
      ],
      hint: "Cuando hay amenaza o exposición, no intentes resolverlo solo en el chat.",
      chat_messages: [
        { sender: "Dani", message: "Si Leo se queja, subimos el sticker a historias." },
        { sender: "Sofi", message: "Ya bájenle, esto se está pasando." },
        { sender: "Dani", message: "Nadie diga nada afuera." }
      ],
      choices: [
        {
          choice_id: "N4_A",
          label: "Guardar evidencia, no reenviar, reportar y pedir apoyo a una persona adulta de confianza.",
          safe: 5,
          risk: 0,
          feedback_title: "Ruta segura completa.",
          feedback: "No difundes más el daño, conservas evidencia y buscas apoyo. Cuando hay amenaza, pedir ayuda no es exagerar: es cuidar.",
          next_node: "RESULT"
        },
        {
          choice_id: "N4_B",
          label: "Mandar la captura a otro grupo para que vean lo mal que está Dani.",
          safe: 0,
          risk: 5,
          feedback_title: "Eso también puede difundir el daño.",
          feedback: "Aunque tu intención sea denunciar, reenviar la captura puede exponer más a Leo y agrandar el conflicto. Guarda evidencia, pero no la circules.",
          next_node: "RESULT"
        },
        {
          choice_id: "N4_C",
          label: "Escribir “ya paren” en el grupo, pero no hacer nada más.",
          safe: 3,
          risk: 2,
          feedback_title: "Ayuda, pero puede quedarse corto.",
          feedback: "Pedir que paren es bueno. Pero si ya hay amenaza de exposición, también conviene guardar evidencia y pedir apoyo.",
          next_node: "RESULT"
        }
      ]
    }
  ],
  results: [
    {
      id: "RESULT_1",
      label: "Criterio fuerte ante la presión",
      range: { min: 15, max: 20 },
      message: "Supiste pausar, poner límite y cuidar a la persona afectada sin escalar el conflicto.",
      virtue_focus: "Fortaleza",
      next_action: "Comparte una regla útil con tu grupo: si no lo dirías en persona, no lo escribas en el chat."
    },
    {
      id: "RESULT_2",
      label: "Vas en proceso",
      range: { min: 6, max: 14 },
      message: "Reconociste parte del problema, pero hubo momentos donde la presión del grupo pudo empujarte.",
      virtue_focus: "Prudencia",
      next_action: "Practica un mensaje de límite corto para usarlo antes de que el chat suba de tono."
    },
    {
      id: "RESULT_3",
      label: "El grupo te está ganando terreno",
      range: { min: -20, max: 5 },
      message: "La presión del grupo puede llevarte a participar en algo que no querías. Lo importante es reconocerlo y cambiar la siguiente decisión.",
      virtue_focus: "Respeto",
      next_action: "Repite el simulador y busca elegir opciones que no humillen, no reenvíen y sí pidan apoyo."
    }
  ],
  guide: {
    title: "Guía breve: qué hacer cuando el grupo presiona",
    core_rule: "Pausa antes de responder: si no lo dirías en persona, no lo escribas ni lo reenvíes.",
    "safe_route": [
      "Pausa: no respondas por impulso.",
      "Lee la señal: ¿es broma, presión, humillación o amenaza?",
      "Pon límite breve: “No me late seguirle”.",
      "Apoya sin exponer: escribe en privado a quien fue afectado.",
      "Guarda evidencia si hay amenaza, insultos o exposición.",
      "Pide apoyo a una persona adulta de confianza si el conflicto escala."
    ],
    "copyable_responses": [
      "No me late burlarme de alguien. Mejor cambiemos de tema.",
      "Ya estuvo, no lo hagamos más grande.",
      "Eso ya puede lastimar. Yo no le voy a seguir.",
      "Si necesitas apoyo, aquí estoy. No estoy de acuerdo con lo que pasó.",
      "No voy a reenviar eso. Mejor pidamos ayuda."
    ],
    "do_not_do": [
      "No reenvíes capturas para “denunciar” si eso expone más a la persona.",
      "No respondas con insultos para defenderte.",
      "No minimices con frases como “era broma” o “no exageres”.",
      "No entregues el control del chat a la presión del grupo."
    ]
  }
};
