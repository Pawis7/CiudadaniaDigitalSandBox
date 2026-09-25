export interface RiesgosRealesOption {
  value: number;
  label: string;
  icon: string;
}

export interface RiesgosRealesQuestion {
  id: string;
  block: string;
  text: string;
  hint: string;
  reverse: boolean;
}

export interface RiesgosRealesResult {
  min: number;
  max: number;
  band: 'rb1' | 'rb2' | 'rb3';
  icon: string;
  label: string;
  summary: string;
  key: string;
  nextSteps: string[];
  hojaPersonalizada: {
    title: string;
    resolveFirst: string[];
    sevenDaysPlan: string[];
    errorsToAvoid: string[];
  };
}

export interface RiesgosRealesData {
  metadata: {
    product_id: string;
    product_title: string;
    segment: string;
    subsegment: string;
    topic: string;
    main_axis: string;
    duration_minutes: string;
    verb: string;
    virtues: string[];
  };
  scale: RiesgosRealesOption[];
  questions: RiesgosRealesQuestion[];
  results: RiesgosRealesResult[];
  kit: {
    id: string;
    title: string;
    format: string;
    objective: string;
    content: string[];
  }[];
}

export const RIESGOS_REALES_DATA: RiesgosRealesData = {
  metadata: {
    product_id: "PF-14",
    product_title: "¿Tu casa está lista para acompañar riesgos reales en línea?",
    segment: "Familias y cuidadores",
    subsegment: "12–14 · Adolescencia temprana",
    topic: "Riesgos reales en línea",
    main_axis: "Riesgos y engaños en línea",
    duration_minutes: "5–6",
    verb: "Prevenir / Actuar",
    virtues: ["Prudencia", "Responsabilidad", "Autocontrol"]
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
      block: "Conversación abierta",
      text: "En casa ya hablamos con mi hija o hijo sobre cosas concretas que sí pueden pasar en línea, por ejemplo presión, amenazas, pedido de fotos o contacto con desconocidos, y no solo desde el miedo o el regaño.",
      hint: "Mide si existe un diálogo preventivo realista antes de que ocurra un problema.",
      reverse: true
    },
    {
      id: "Q2",
      block: "Confianza y reacción",
      text: "Si a mi hija o hijo le pasara algo serio en línea, por ejemplo presión, amenazas o pedido de fotos, probablemente lo escondería por miedo a castigos o sermones.",
      hint: "Mide si el temor a la reacción adulta bloquea la posibilidad de pedir ayuda.",
      reverse: false
    },
    {
      id: "Q3",
      block: "Límites de privacidad",
      text: "En casa ya están claros los límites sobre qué datos, fotos, ubicación, contraseñas o cuentas no se deben compartir con otras personas.",
      hint: "Mide si hay reglas explícitas de protección de información crítica.",
      reverse: true
    },
    {
      id: "Q4",
      block: "Exposición a contactos",
      text: "Hoy mi hija o hijo podría aceptar contactos, entrar a grupos o compartir información sin que en casa sepamos bien quiénes son esas personas o qué intención traen.",
      hint: "Mide el nivel de vulnerabilidad en la red de contactos del adolescente.",
      reverse: false
    },
    {
      id: "Q5",
      block: "Hablar de presiones",
      text: "En casa ya hablamos sobre situaciones concretas, por ejemplo cuando alguien mete presión, pide guardar secretos, pide fotos o hace propuestas incómodas en chats, juegos o redes.",
      hint: "Mide si se han anticipado dinámicas de acoso o manipulación.",
      reverse: true
    },
    {
      id: "Q6",
      block: "Detección temprana",
      text: "En casa todavía nos cuesta darnos cuenta a tiempo cuando alguien insiste demasiado, mete presión, amenaza o le pide a mi hija o hijo guardar secretos.",
      hint: "Mide la capacidad de alerta familiar frente a señales de riesgo activas.",
      reverse: false
    },
    {
      id: "Q7",
      block: "Involucramiento adulto",
      text: "Las personas adultas de la casa sabemos qué apps, redes, juegos o grupos usa mi hija o hijo y hablamos de eso con cierta frecuencia.",
      hint: "Mide la sintonía de los cuidadores con los canales digitales del adolescente.",
      reverse: true
    },
    {
      id: "Q8",
      block: "Autonomía supuesta",
      text: "En casa a veces damos por hecho que, como ya está creciendo, mi hija o hijo puede resolver solo o sola un problema digital serio sin pedir ayuda.",
      hint: "Mide la sobreestimación de su madurez frente a incidentes graves.",
      reverse: false
    },
    {
      id: "Q9",
      block: "Plan de acción",
      text: "En casa ya dijimos paso por paso qué haríamos si alguien le pide fotos, le mete presión, lo amenaza o hace sentir incómodo a mi hija o hijo.",
      hint: "Mide si existe un protocolo de emergencia acordado y claro.",
      reverse: true
    },
    {
      id: "Q10",
      block: "Ruta de respuesta",
      text: "Si hoy pasara algo serio, en casa no tendríamos claro a qué persona adulta avisar primero, qué guardar como prueba ni qué pasos seguir.",
      hint: "Mide la preparación técnica e instrumental básica ante una crisis.",
      reverse: false
    },
    {
      id: "Q11",
      block: "Ejemplo adulto",
      text: "Las personas adultas de la casa tratamos de poner el ejemplo con lo que publicamos, compartimos, reenviamos o comentamos en línea.",
      hint: "Mide la coherencia del modelado de conducta que los adolescentes observan.",
      reverse: true
    },
    {
      id: "Q12",
      block: "Gestión de crisis",
      text: "En casa todavía reaccionamos primero con enojo, control o castigo, en vez de reaccionar con calma y acompañamiento, cuando aparece un riesgo digital.",
      hint: "Mide si la impulsividad adulta ahuyenta la transparencia familiar.",
      reverse: false
    }
  ],
  results: [
    {
      min: 0,
      max: 12,
      band: "rb1",
      icon: "🟢",
      label: "Hay buena base",
      summary: "En casa ya existe una base bastante buena para hablar y reaccionar mejor ante riesgos reales en línea. Hay conversación, cierta confianza y una ruta inicial de apoyo.",
      key: "La meta no es vigilar todo. La meta es que tu hija o hijo sepa que puede pedir ayuda y que en casa sabrán qué hacer.",
      nextSteps: [
        "Definir una frase de ayuda secreta entre ustedes.",
        "Repasar juntos cómo tomar capturas de pantalla y guardar evidencias.",
        "Acordar a quién de los adultos se le avisará primero ante una molestia."
      ],
      hojaPersonalizada: {
        title: "Hoja personalizada 1: Mantener y afinar la confianza activa",
        resolveFirst: [
          "Consolidar una frase de ayuda secreta entre ustedes.",
          "Repasar cómo tomar capturas de pantalla y guardar evidencias.",
          "Asegurar que el adolescente sienta que puede hablar de temas incómodos sin juicio."
        ],
        sevenDaysPlan: [
          "Acordar una frase de ayuda o palabra clave secreta familiar.",
          "Practicar juntos capturas de pantalla y guardado de pruebas en su dispositivo.",
          "Dedicar un momento tranquilo a hablar de cómo actuar frente a contactos extraños."
        ],
        errorsToAvoid: [
          "Dar por hecho que como hay buena base, ya no hace falta revisar ni conversar.",
          "Descuidar la sintonía sobre las nuevas redes y juegos que el adolescente empiece a usar.",
          "Minimizar pequeñas incomodidades digitales pensando que 'ellos ya saben cuidarse'."
        ]
      }
    },
    {
      min: 13,
      max: 24,
      band: "rb2",
      icon: "🟡",
      label: "Hay que ordenar mejor",
      summary: "En casa hay cosas valiosas, pero todavía faltan acuerdos más claros, conversación más práctica o una ruta de acción mejor definida para acompañar riesgos reales en línea.",
      key: "No hace falta vivir con paranoia. Hace falta preparación sencilla y concreta.",
      nextSteps: [
        "Tener una conversación breve y directa sobre presiones en chats.",
        "Acordar 3 reglas no negociables de privacidad en casa.",
        "Practicar la ruta básica: 'Parar, no responder, guardar prueba y avisar'."
      ],
      hojaPersonalizada: {
        title: "Hoja personalizada 2: Pongamos base antes de que algo escale",
        resolveFirst: [
          "Qué sí se habla en casa y qué ya no se deja a la adivinanza.",
          "Qué señales de alerta sí se deben tomar en serio.",
          "Qué harían en casa si aparece presión, amenaza o una petición indebida."
        ],
        sevenDaysPlan: [
          "Tener una conversación breve y directa sobre riesgos reales.",
          "Acordar 3 reglas sobre privacidad, contactos y pedir ayuda.",
          "Practicar una ruta simple: parar, no responder, guardar prueba y avisar."
        ],
        errorsToAvoid: [
          "Creer que acompañar es espiar.",
          "Responder con regaño y cerrar la confianza.",
          "Confiar en que, si pasa algo, me lo dirá, aunque nunca hayamos abierto ese canal."
        ]
      }
    },
    {
      min: 25,
      max: 36,
      band: "rb3",
      icon: "🔴",
      label: "Todavía falta piso",
      summary: "Hoy la casa todavía no parece suficientemente preparada para acompañar riesgos reales en línea. Faltan conversación útil, acuerdos claros o una ruta mínima de respuesta.",
      key: "Primero base. Luego más libertad digital.",
      nextSteps: [
        "Alinear criterios entre las personas adultas a cargo.",
        "Definir los 3 acuerdos familiares básicos de convivencia digital.",
        "Dejar en claro al adolescente que pedir ayuda no traerá un castigo automático."
      ],
      hojaPersonalizada: {
        title: "Hoja personalizada 3: Construir piso seguro con urgencia",
        resolveFirst: [
          "Alinear criterios y respuestas comunes entre todas las personas adultas a cargo.",
          "Establecer límites inmediatos y no negociables de privacidad y datos.",
          "Asegurar al adolescente de forma explícita que pedir ayuda nunca vendrá con castigo automático."
        ],
        sevenDaysPlan: [
          "Reunirse entre adultos para unificar la reacción familiar y evitar enojo/control impulsivo.",
          "Hablar de frente y sin alarmismo con el adolescente sobre los 3 límites innegociables de casa.",
          "Dejar claro a quién de los adultos avisar primero ante cualquier situación incómoda."
        ],
        errorsToAvoid: [
          "Intentar vigilar o prohibir todo por miedo, en lugar de pactar acuerdos de confianza.",
          "Castigar quitando el dispositivo, lo que provoca que el adolescente oculte futuros riesgos.",
          "Pensar que la seguridad digital se resuelve con una app de control parental sin diálogo activo."
        ]
      }
    }
  ],
  kit: [
    {
      id: "acuerdo",
      title: "Acuerdo familiar para riesgos reales en línea",
      format: "IMPRIMIBLE LLENABLE",
      objective: "Escriban acuerdos simples sobre privacidad, contactos, exposición y cómo pedir ayuda a tiempo.",
      content: [
        "¿Qué información no compartimos?",
        "¿Qué señales sí nos deben preocupar?",
        "¿Qué hacemos si alguien presiona, amenaza o pide algo indebido?",
        "¿A qué persona adulta avisamos primero?",
        "¿Qué evitaremos hacer por enojo o impulso?",
        "Firma de personas adultas",
        "Firma del adolescente (opcional)"
      ]
    },
    {
      id: "checklist",
      title: "Checklist de señales de alerta",
      format: "IMPRIMIBLE",
      objective: "Úsenlo para detectar señales que no conviene minimizar, justificar ni dejar pasar.",
      content: [
        "Piden secreto total o que no se lo cuente a nadie.",
        "Meten urgencia, presión o miedo para que responda rápido.",
        "Piden fotos, ubicación, contraseñas o datos personales.",
        "Amenazan con exhibir, excluir o difundir algo.",
        "Buscan mover la conversación a otro canal sin razón clara.",
        "Manipulan, aíslan o hacen sentir culpa."
      ]
    },
    {
      id: "tarjeta",
      title: "Tarjeta de acción: Si algo se pone serio",
      format: "TARJETA RECORTABLE",
      objective: "Una ruta corta y fácil de recordar para reaccionar sin pánico ni impulso.",
      content: [
        "1. Para.",
        "2. No respondas de inmediato.",
        "3. Guarda pruebas.",
        "4. Avísame.",
        "5. Lo resolvemos contigo, no contra ti."
      ]
    },
    {
      id: "conversacion",
      title: "Guía de conversación sin pánico",
      format: "IMPRIMIBLE",
      objective: "Frases simples para hablar de riesgos sin cerrar la confianza.",
      content: [
        "Si algo se sale de control, prefiero que me lo digas a tiempo.",
        "No todo lo raro se ve peligroso desde el principio.",
        "Pedir ayuda no te mete en problemas; te ayuda a salir de ellos.",
        "No quiero reaccionar solo por miedo; quiero acompañarte con criterio."
      ]
    },
    {
      id: "ruta",
      title: "Ruta de respuesta en casa",
      format: "IMPRIMIBLE",
      objective: "Definan qué hará cada persona adulta si aparece una situación digital delicada o urgente.",
      content: [
        "Quién escucha primero",
        "Quién ayuda a guardar pruebas",
        "Quién acompaña a reportar, bloquear o pedir apoyo",
        "Qué no vamos a hacer por impulso",
        "Qué seguimiento daremos en las siguientes 24 horas"
      ]
    }
  ]
};
