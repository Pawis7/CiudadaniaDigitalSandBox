export interface PresenciaJovenesOption {
  value: number;
  label: string;
  icon: string;
}

export interface PresenciaJovenesQuestion {
  id: string;
  block: string;
  text: string;
  hint: string;
  reverse: boolean;
}

export interface PresenciaJovenesResult {
  min: number;
  max: number;
  band: 'rb1' | 'rb2' | 'rb3';
  icon: string;
  label: string;
  summary: string;
  key: string;
  virtue: {
    name: string;
    why: string;
    def: string;
  };
  signals: string[];
  actions: string[];
  virtueActions: string[];
}

export interface PresenciaJovenesData {
  metadata: {
    product_id: string;
    product_title: string;
    segment: string;
    subsegment: string;
    topic: string;
    main_axis: string;
    dimension: string;
    guiding_verb: string;
    virtues: string[];
    duration_minutes: number;
  };
  scale: PresenciaJovenesOption[];
  questions: PresenciaJovenesQuestion[];
  results: PresenciaJovenesResult[];
  tracker_items: string[];
}

export const PRESENCIA_JOVENES_DATA: PresenciaJovenesData = {
  metadata: {
    product_id: "PF-04",
    product_title: "¿Tu uso digital en casa te está ayudando o te está quitando presencia?",
    segment: "Familias y cuidadores",
    subsegment: "15–22 · Adolescencia tardía y juventud",
    topic: "Presencia digital adulta en casa",
    main_axis: "Bienestar digital",
    dimension: "D2 – Convivencia y prácticas en el entorno digital",
    guiding_verb: "Reconocer / Actuar",
    virtues: ["Prudencia", "Autocontrol", "Responsabilidad"],
    duration_minutes: 5
  },
  scale: [
    { value: 0, label: "Nada o casi nada", icon: "○" },
    { value: 1, label: "Poco", icon: "◔" },
    { value: 2, label: "Bastante", icon: "◕" },
    { value: 3, label: "Mucho", icon: "●" }
  ],
  questions: [
    {
      id: "Q1",
      block: "Escucha y respeto",
      text: "Cuando mi hija, hijo o joven de 15 a 22 años quiere hablar conmigo de algo importante, sí dejo el celular a un lado para escucharlo de verdad.",
      hint: "Mide si puedes dar atención completa cuando una persona joven te busca para hablar en serio.",
      reverse: true
    },
    {
      id: "Q2",
      block: "Presencia interrumpida",
      text: "A veces respondo mientras sigo viendo el celular, como si escuchara, pero en realidad estoy distraído.",
      hint: "Mide si estás medio presente y medio ausente al mismo tiempo.",
      reverse: false
    },
    {
      id: "Q3",
      block: "Ejemplo adulto",
      text: "La persona joven que acompaño me ve usar el celular en momentos que sí piden presencia, por ejemplo en la comida, en conversaciones, en trayectos o antes de dormir.",
      hint: "Mide qué tanto el teléfono ya se metió en rutinas que también enseñan con el ejemplo.",
      reverse: false
    },
    {
      id: "Q4",
      block: "Reglas visibles",
      text: "En casa sí tenemos al menos un momento del día en el que las personas adultas también dejamos el celular para convivir o conversar mejor.",
      hint: "Mide si existe una regla visible que también siguen los adultos.",
      reverse: true
    },
    {
      id: "Q5",
      block: "Disponibilidad adulta",
      text: "Si la persona joven me habla de algo delicado, por ejemplo relaciones, dinero, trabajo, estudio o internet, mi propio celular a veces me hace reaccionar tarde, con prisa o sin escuchar bien.",
      hint: "Mide si el teléfono ya afecta cómo respondes cuando aparece un tema importante.",
      reverse: false
    },
    {
      id: "Q6",
      block: "Uso por reflejo",
      text: "Cuando estoy cansado, incómodo o no quiero entrar a una conversación difícil, agarro el celular por reflejo aunque podría estar más disponible.",
      hint: "Mide si el impulso o la evasión ya mandan más que tu decisión.",
      reverse: false
    },
    {
      id: "Q7",
      block: "Escuchar antes de cortar",
      text: "Si necesito revisar el celular, procuro hacerlo rápido y regresar a la conversación, en vez de quedarme enganchado o cortar el momento.",
      hint: "Mide si puedes entrar y salir del teléfono sin romper una conversación importante.",
      reverse: true
    },
    {
      id: "Q8",
      block: "Cambio posible",
      text: "Hoy sí podría cambiar una conducta concreta de mi uso digital para estar más presente, respetuoso y disponible en casa durante esta semana.",
      hint: "Mide si existe disposición real para hacer un ajuste pequeño, visible y posible.",
      reverse: true
    }
  ],
  results: [
    {
      min: 0,
      max: 8,
      band: "rb1",
      icon: "🟢",
      label: "Hay buena base",
      summary: "En casa ya existe una base valiosa para cuidar conversaciones y momentos importantes con una persona joven. La meta es sostener mejor esa disponibilidad, sin invadir ni desaparecer.",
      key: "La meta no es usar cero celular. La meta es que el teléfono no le gane a tu presencia cuando una persona joven necesita hablar, pensar o pedir apoyo.",
      virtue: {
        name: "Prudencia",
        why: "Porque te conviene cuidar con intención cuándo sí revisar el celular y cuándo conviene soltarlo para no cortar una conversación importante.",
        def: "Prudencia aquí significa notar cuándo tu teléfono sí cabe, y cuándo lo mejor es darle prioridad a la escucha y al respeto."
      },
      signals: [
        "Ya existe cierta capacidad para escuchar con atención cuando una persona joven te busca.",
        "No todo depende del impulso: sí parece haber algún límite o momento protegido.",
        "El reto no es empezar desde cero, sino sostener mejor lo que ya funciona."
      ],
      actions: [
        "Elegir una conversación o rutina del día para protegerla mejor durante 7 días.",
        "Acordar con otra persona adulta un momento visible sin celular.",
        "Observar en qué situaciones el teléfono se te mete más aunque no haga falta."
      ],
      virtueActions: [
        "Voy a revisar el celular en momentos elegidos, no por puro reflejo.",
        "Voy a cuidar una conversación o espacio del día en el que una persona joven necesita más escucha."
      ]
    },
    {
      min: 9,
      max: 16,
      band: "rb2",
      icon: "🟡",
      label: "Hay que ordenar mejor",
      summary: "Tu uso digital ya parece meterse en algunos momentos del hogar más de lo que conviene. Ya puede estar quitando escucha, paciencia o calidad de reacción frente a una persona joven.",
      key: "No necesitas cambios gigantes. Necesitas uno o dos ajustes concretos para que tu celular no te robe escucha ni disponibilidad esta semana.",
      virtue: {
        name: "Autocontrol",
        why: "Porque el problema no siempre es el celular en sí, sino agarrarlo por impulso cuando estás cansado, incómodo o queriendo evitar una conversación.",
        def: "Autocontrol aquí significa notar el impulso, frenarlo un poco y elegir mejor qué hacer con ese momento."
      },
      signals: [
        "El celular sí parece entrar en conversaciones o rutinas donde hace falta más presencia adulta.",
        "A veces el teléfono está resolviendo incomodidad o cansancio más que una decisión consciente.",
        "Hace falta una regla simple y visible para que la disponibilidad no dependa solo de la buena intención."
      ],
      actions: [
        "Dejar el celular fuera de una conversación, comida o trayecto sensible.",
        "Escuchar primero y reaccionar después cuando aparezca un tema delicado.",
        "Poner un acuerdo visible con otra persona adulta del hogar para cuidarse entre ambos."
      ],
      virtueActions: [
        "Voy a notar cuándo agarro el celular para evitar una conversación y voy a probar otra respuesta pequeña antes de desbloquearlo.",
        "Voy a hacer un cambio visible para estar más disponible cuando una persona joven necesite hablar."
      ]
    },
    {
      min: 17,
      max: 24,
      band: "rb3",
      icon: "🔴",
      label: "Tu uso ya te está quitando presencia",
      summary: "Tu uso digital ya parece estar afectando la escucha, la convivencia y la calidad de reacción con una persona joven de 15 a 22 años. Esto no es para culparte; es para ayudarte a recuperar piso con cambios pequeños pero reales.",
      key: "Primero presencia adulta. Después lo demás. En esta etapa, una conversación mal atendida puede cerrar puertas importantes.",
      virtue: {
        name: "Responsabilidad",
        why: "Porque hace falta hacerte cargo del impacto que tu uso digital ya está teniendo en la convivencia, la confianza y el ejemplo que estás dando.",
        def: "Responsabilidad aquí significa asumir que tu uso del celular también afecta el vínculo y actuar para cuidar mejor la presencia en casa."
      },
      signals: [
        "Ya hay más desconexión del hogar de la que conviene normalizar.",
        "El celular se está metiendo en conversaciones o momentos que sí importan para una persona joven.",
        "Necesitas un plan corto y concreto, no solo decirte que mañana lo harás mejor."
      ],
      actions: [
        "Elegir una conversación, rutina o espacio del día totalmente fuera del celular.",
        "Dejar de usar el teléfono por reflejo en un momento crítico, por ejemplo una conversación delicada, comida o trayecto.",
        "Hablar con otra persona adulta del hogar para hacer un acuerdo visible desde hoy."
      ],
      virtueActions: [
        "Voy a asumir un acuerdo claro frente a quienes viven conmigo.",
        "Voy a cambiar una conducta visible para estar más disponible y dar mejor ejemplo en casa."
      ]
    }
  ],
  tracker_items: [
    "Dejé el celular fuera de un momento clave",
    "Escuché antes de reaccionar",
    "Usé menos el celular por reflejo o cansancio",
    "Cuidé una conversación importante sin irme al teléfono",
    "Noté más confianza o mejor convivencia"
  ]
};
