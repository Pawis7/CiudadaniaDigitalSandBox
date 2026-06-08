export interface AdultPresenceOption {
  value: number;
  label: string;
  icon: string;
}

export interface AdultPresenceQuestion {
  id: string;
  block: string;
  text: string;
  hint: string;
  reverse: boolean;
}

export interface AdultPresenceResult {
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

export interface AdultPresenceData {
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
  scale: AdultPresenceOption[];
  questions: AdultPresenceQuestion[];
  results: AdultPresenceResult[];
  tracker_items: string[];
}

export const ADULT_PRESENCE_DATA: AdultPresenceData = {
  metadata: {
    product_id: "PF-04",
    product_title: "¿Tu uso digital en casa te está ayudando o te está quitando presencia?",
    segment: "Familias y cuidadores",
    subsegment: "6–11 · Niñez",
    topic: "Presencia digital adulta en casa",
    main_axis: "Bienestar digital",
    dimension: "D2 – Convivencia y prácticas en el entorno digital",
    guiding_verb: "Reconocer / Ajustar",
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
      block: "Presencia y escucha",
      text: "Cuando mi hija o hijo de 6 a 11 años me habla, me cuenta algo o me pide ayuda, sí dejo el celular para escucharlo de verdad.",
      hint: "Mide si puedes dar atención completa cuando tu hija o hijo te busca.",
      reverse: true
    },
    {
      id: "Q2",
      block: "Rutinas importantes",
      text: "En la comida, mientras hace tarea o antes de dormir, reviso el celular aunque podría estar más presente con mi hija o hijo.",
      hint: "Mide si el teléfono ya se mete en momentos que sí importan para el hogar.",
      reverse: false
    },
    {
      id: "Q3",
      block: "Pantalla para resolver rápido",
      text: "A veces dejo a mi hija o hijo pegado a una pantalla o le doy dispositivo para que yo pueda terminar algo, descansar o evitar conflicto.",
      hint: "Mide si la pantalla se volvió una salida rápida más que una decisión pensada.",
      reverse: false
    },
    {
      id: "Q4",
      block: "Reglas visibles",
      text: "En casa ya tenemos al menos una regla clara sobre momentos sin celular, y las personas adultas también la seguimos.",
      hint: "Mide si existe una regla que no solo se le pide a niñas y niños, sino que también se modela.",
      reverse: true
    },
    {
      id: "Q5",
      block: "Coherencia adulta",
      text: "Aunque le pido a mi hija o hijo que no use pantalla en ciertos momentos, yo sí reviso el celular en esos mismos momentos.",
      hint: "Mide si hay distancia entre la regla que pides y el ejemplo que das.",
      reverse: false
    },
    {
      id: "Q6",
      block: "Uso por reflejo",
      text: "Cuando estoy cansado, aburrido o saturado, agarro el celular por reflejo aunque eso me quite atención con mi hija o hijo.",
      hint: "Mide si el impulso ya está decidiendo más que tú.",
      reverse: false
    },
    {
      id: "Q7",
      block: "Entrada y salida del teléfono",
      text: "Si necesito revisar el celular, procuro hacerlo y volver pronto, sin quedarme enganchado mientras mi hija o hijo espera.",
      hint: "Mide si sabes usar el teléfono sin perderte demasiado tiempo ahí.",
      reverse: true
    },
    {
      id: "Q8",
      block: "Cambio posible",
      text: "Hoy sí podría cambiar una conducta visible de mi uso digital para dar mejor ejemplo en casa durante esta semana.",
      hint: "Mide si hay disposición real para hacer un ajuste pequeño pero concreto.",
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
      summary: "Tu uso digital no parece estar quitando demasiada presencia en momentos importantes de la niñez. No significa que todo esté perfecto, pero sí que ya existe una base valiosa para cuidar mejor ciertas rutinas, reglas y conversaciones.",
      key: "La meta no es vivir sin celular. La meta es que el teléfono no se meta donde tu atención y tu ejemplo sí importan.",
      virtue: {
        name: "Prudencia",
        why: "Porque te conviene decidir mejor cuándo sí revisar el celular y cuándo toca soltarlo para cuidar la convivencia.",
        def: "Prudencia aquí significa saber distinguir entre una revisión necesaria y una distracción que sí quita presencia."
      },
      signals: [
        "Ya hay cierta capacidad para escuchar y atender sin que el celular gane tan fácil.",
        "Parece existir al menos una regla o rutina que protege mejor la convivencia.",
        "El reto no es empezar desde cero, sino sostener lo que ya está funcionando."
      ],
      actions: [
        "Elegir una rutina o momento que quieras proteger todavía mejor durante 7 días.",
        "Revisar si el teléfono se te mete más cuando hay tarea, comida o cansancio.",
        "Hacer visible una regla simple que también sigan las personas adultas."
      ],
      virtueActions: [
        "Voy a revisar el celular en momentos elegidos, no por puro reflejo.",
        "Voy a cuidar un momento del día donde mi hija o hijo necesita más escucha y presencia."
      ]
    },
    {
      min: 9,
      max: 16,
      band: "rb2",
      icon: "🟡",
      label: "Hay que ordenar mejor",
      summary: "Tu uso digital ya parece meterse en algunos momentos del hogar más de lo que conviene. No se ve como un desastre, pero sí como algo que ya puede quitar atención, coherencia o constancia en reglas importantes.",
      key: "No necesitas prometer cambios gigantes. Necesitas uno o dos ajustes visibles que sí puedas sostener esta semana.",
      virtue: {
        name: "Autocontrol",
        why: "Porque el problema no siempre es el celular en sí, sino agarrarlo por impulso cuando estás cansado, distraído o saturado.",
        def: "Autocontrol aquí significa frenar un poco el impulso y elegir mejor dónde poner tu atención."
      },
      signals: [
        "El celular sí parece entrar en momentos donde tu hija o hijo necesita escucha, apoyo o guía.",
        "A veces la pantalla o el teléfono están resolviendo prisa, cansancio o tensión más que una decisión consciente.",
        "Hace falta una regla simple y visible para que la presencia no dependa solo de la buena intención."
      ],
      actions: [
        "Dejar el celular fuera de una rutina sensible, por ejemplo comida, tarea o conversación del día.",
        "Evitar revisar el teléfono mientras tu hija o hijo te habla o te pide ayuda.",
        "Cumplir tú una regla de pantalla que ya le pides a tu hija o hijo."
      ],
      virtueActions: [
        "Voy a notar cuándo agarro el celular por reflejo y voy a probar otra respuesta pequeña antes de desbloquearlo.",
        "Voy a hacer un cambio visible para dar mejor ejemplo en casa."
      ]
    },
    {
      min: 17,
      max: 24,
      band: "rb3",
      icon: "🔴",
      label: "Tu uso ya te está quitando presencia",
      summary: "Tu uso digital ya parece estar afectando varias cosas importantes en casa: atención, coherencia, convivencia y calidad de presencia con tu hija o hijo. Esto no es para culparte; es para ayudarte a recuperar piso con cambios pequeños pero reales.",
      key: "Primero presencia y coherencia. Después lo demás. En esta etapa, tu ejemplo pesa mucho más de lo que parece.",
      virtue: {
        name: "Responsabilidad",
        why: "Porque hace falta hacerte cargo del impacto que tu uso digital ya está teniendo en el clima del hogar y en las reglas que quieres sostener.",
        def: "Responsabilidad aquí significa asumir que tu uso del celular también enseña, y actuar para cuidar mejor la convivencia."
      },
      signals: [
        "Ya hay más desconexión y menos ejemplo del que conviene normalizar.",
        "El celular se está metiendo en rutinas o reglas donde tu presencia adulta sí importa.",
        "Necesitas un plan corto y concreto, no solo decirte que mañana lo harás mejor."
      ],
      actions: [
        "Elegir una rutina o momento del día totalmente fuera del celular.",
        "Dejar de revisar el teléfono mientras tu hija o hijo te habla, come, hace tarea o se prepara para dormir.",
        "Hablar con otra persona adulta del hogar para hacer un acuerdo visible desde hoy."
      ],
      virtueActions: [
        "Voy a asumir una regla clara frente a quienes viven conmigo.",
        "Voy a cambiar una conducta visible para dar mejor ejemplo en casa."
      ]
    }
  ],
  tracker_items: [
    "Dejé el celular fuera de una rutina clave",
    "Escuché sin revisar pantalla",
    "Fui congruente con la regla que pido",
    "Usé menos el celular por reflejo",
    "Noté mejor atención o convivencia"
  ]
};
