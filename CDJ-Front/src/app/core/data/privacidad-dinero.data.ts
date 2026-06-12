export interface PrivacidadDineroOption {
  value: number;
  label: string;
  icon: string;
}

export interface PrivacidadDineroQuestion {
  id: string;
  block: string;
  text: string;
  hint: string;
  reverse: boolean;
}

export interface PrivacidadDineroResult {
  min: number;
  max: number;
  band: 'rb1' | 'rb2' | 'rb3';
  icon: string;
  label: string;
  summary: string;
  key: string;
  hojaPersonalizada: {
    title: string;
    resolveFirst: string[];
    sevenDaysPlan: string[];
    errorsToAvoid: string[];
  };
}

export interface PrivacidadDineroData {
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
  scale: PrivacidadDineroOption[];
  questions: PrivacidadDineroQuestion[];
  results: PrivacidadDineroResult[];
  kit: {
    id: string;
    title: string;
    format: string;
    objective: string;
    content: string[];
  }[];
}

export const PRIVACIDAD_DINERO_DATA: PrivacidadDineroData = {
  metadata: {
    product_id: "PF-15",
    product_title: "¿Tu casa está lista para acompañar privacidad y dinero en la vida digital?",
    segment: "Familias y cuidadores",
    subsegment: "15–22 años · Adolescencia tardía y juventud",
    topic: "Privacidad y dinero en la vida digital",
    main_axis: "Privacidad y seguridad",
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
      block: "Privacidad y datos",
      text: "En casa ya hablamos con claridad sobre qué datos, fotos, documentos, contraseñas o accesos no conviene compartir por mensaje, redes o internet.",
      hint: "Mide si existe un acuerdo explícito sobre no compartir información sensible.",
      reverse: true
    },
    {
      id: "Q2",
      block: "Privacidad y datos",
      text: "En casa todavía se comparten contraseñas, códigos, capturas, ubicación o datos personales sin medir bien el riesgo.",
      hint: "Mide si se exponen accesos o datos críticos por descuido.",
      reverse: false
    },
    {
      id: "Q3",
      block: "Compras y pagos",
      text: "En casa ya tenemos reglas básicas para decidir antes de comprar, pagar, depositar, suscribirse o aceptar promociones por internet.",
      hint: "Mide si hay límites establecidos antes de realizar transacciones en línea.",
      reverse: true
    },
    {
      id: "Q4",
      block: "Compras y pagos",
      text: "Todavía se hacen compras, pagos o registros por impulso, por presión o sin leer bien costos, condiciones y renovaciones.",
      hint: "Mide si el gasto o registro digital ocurre de forma impulsiva.",
      reverse: false
    },
    {
      id: "Q5",
      block: "Fraudes y engaños",
      text: "En casa ya hablamos de fraudes comunes: links falsos, premios engañosos, ventas dudosas, depósitos urgentes o mensajes que meten presión.",
      hint: "Mide si conocen y platican sobre las trampas más usuales en internet.",
      reverse: true
    },
    {
      id: "Q6",
      block: "Fraudes y engaños",
      text: "Todavía nos cuesta distinguir cuándo una oferta, vacante, ayuda económica o mensaje urgente puede ser un engaño.",
      hint: "Mide qué tan fácil es dudar de propuestas sospechosas.",
      reverse: false
    },
    {
      id: "Q7",
      block: "Autonomía con criterio",
      text: "En casa acompañamos decisiones de privacidad y dinero sin revisar todo, pero tampoco dejando sola o solo a la persona joven en temas delicados.",
      hint: "Mide el equilibrio entre la confianza y la presencia supervisora.",
      reverse: true
    },
    {
      id: "Q8",
      block: "Autonomía con criterio",
      text: "En casa a veces damos por hecho que, como ya está grande, puede resolver sola o solo cualquier problema de dinero, cuentas o seguridad digital.",
      hint: "Mide si se asume erróneamente que una persona de esta edad no necesita apoyo.",
      reverse: false
    },
    {
      id: "Q9",
      block: "Ruta de acción",
      text: "En casa ya sabemos qué hacer si aparece una compra no reconocida, una cuenta comprometida, un intento de fraude o un depósito sospechoso.",
      hint: "Mide si hay una secuencia clara para contener problemas de seguridad o cobros.",
      reverse: true
    },
    {
      id: "Q10",
      block: "Ruta de acción",
      text: "Si hoy hubiera un fraude, un cargo raro o una filtración de datos, improvisaríamos porque no tenemos clara la ruta para actuar y pedir ayuda.",
      hint: "Mide si la casa carece de un protocolo de emergencia digital.",
      reverse: false
    },
    {
      id: "Q11",
      block: "Coherencia adulta",
      text: "Las personas adultas de la casa también cuidamos cómo compramos, qué links abrimos, qué datos compartimos y cómo reaccionamos ante mensajes sospechosos.",
      hint: "Mide si el modelado digital de los adultos es prudente y responsable.",
      reverse: true
    },
    {
      id: "Q12",
      block: "Coherencia adulta",
      text: "En casa todavía reaccionamos más con regaño, pleito o control que con calma y acompañamiento cuando aparece un problema digital relacionado con dinero o privacidad.",
      hint: "Mide si la reacción ante un error digital bloquea o abre la confianza.",
      reverse: false
    }
  ],
  results: [
    {
      min: 0,
      max: 12,
      band: 'rb1',
      icon: '🟢',
      label: "Base suficiente",
      summary: "En casa ya hay una base bastante buena para acompañar decisiones sobre privacidad y dinero en la vida digital. Hay conversación, cierto criterio y una reacción básica cuando algo se ve raro.",
      key: "La meta no es controlar todo. La meta es cuidar datos, decidir con criterio y reaccionar a tiempo.",
      hojaPersonalizada: {
        title: "Hoja personalizada 1: Fortalecer acuerdos y mantener presencia",
        resolveFirst: [
          "Ya se hablan temas de privacidad y dinero sin evitarlos por completo.",
          "Hay criterios básicos antes de comprar, pagar o compartir datos.",
          "No todo depende de prohibir: también hay acompañamiento."
        ],
        sevenDaysPlan: [
          "Definir una regla simple para no decidir pagos, depósitos o compras bajo presión.",
          "Revisar juntos señales de fraude y de suscripciones engañosas.",
          "Acordar qué hacer si una cuenta, tarjeta o pago presenta algo raro."
        ],
        errorsToAvoid: [
          "Pensar que como ya hay buena base, ya no es necesario seguir conversando.",
          "Relajar los acuerdos sobre contraseñas o datos bancarios.",
          "Esperar a que ocurra un problema para actualizar las reglas."
        ]
      }
    },
    {
      min: 13,
      max: 24,
      band: 'rb2',
      icon: '🟡',
      label: "En preparación",
      summary: "Hay cosas avanzadas, pero todavía faltan acuerdos más claros, conversación más práctica o una ruta mejor definida para acompañar privacidad y dinero en la vida digital.",
      key: "No hace falta vivir con miedo. Hace falta tener criterios compartidos antes de que un error salga caro.",
      hojaPersonalizada: {
        title: "Hoja personalizada 2: Pongamos base antes de que cueste",
        resolveFirst: [
          "Qué datos y accesos no se comparten.",
          "Qué revisamos antes de comprar, pagar o depositar.",
          "Qué señales de fraude o manipulación sí deben tomarse en serio."
        ],
        sevenDaysPlan: [
          "Tener una conversación breve y directa sobre privacidad, cuentas y dinero digital.",
          "Acordar 3 reglas simples para pagos, promociones y mensajes urgentes.",
          "Practicar una ruta básica: parar, verificar, no transferir de inmediato y pedir apoyo."
        ],
        errorsToAvoid: [
          "Pensar que acompañar es invadir.",
          "Reaccionar con regaño y cerrar el canal de confianza.",
          "Confiar en que no pasará nada solo porque ya es mayor."
        ]
      }
    },
    {
      min: 25,
      max: 36,
      band: 'rb3',
      icon: '🔴',
      label: "Todavía falta base",
      summary: "Hoy la casa todavía no tiene una base suficiente para acompañar decisiones de privacidad y dinero en la vida digital. Faltan conversación útil, criterios claros o una ruta mínima de respuesta.",
      key: "Primero alinear criterios en casa. Después dar libertad. Un error digital con cuentas o dinero a esta edad puede evitarse con conversación directa.",
      hojaPersonalizada: {
        title: "Hoja personalizada 3: Establecer bases mínimas con urgencia",
        resolveFirst: [
          "Sin criterios claros, es más fácil caer en fraudes, compras impulsivas o exposición innecesaria.",
          "Sin conversación útil, los errores se esconden hasta que ya costaron.",
          "Sin una ruta de acción, la casa improvisa cuando aparece un problema real."
        ],
        sevenDaysPlan: [
          "Alinear a las personas adultas sobre cómo reaccionar sin humillar ni castigar de entrada.",
          "Definir 3 acuerdos básicos sobre datos, pagos y pedir ayuda.",
          "Practicar una respuesta simple ante fraudes, cargos raros o cuentas comprometidas."
        ],
        errorsToAvoid: [
          "Reaccionar con castigos severos que corten la comunicación futura.",
          "Prohibir el uso de tecnología o dinero digital en lugar de enseñar a usarlo.",
          "Dar por hecho que la persona joven no quiere o no necesita acompañamiento."
        ]
      }
    }
  ],
  kit: [
    {
      id: "K01",
      title: "Acuerdo familiar para privacidad + dinero",
      format: "IMPRIMIBLE LLENABLE",
      objective: "Definan acuerdos claros sobre datos, cuentas, pagos y pedir ayuda.",
      content: [
        "¿Qué no compartimos nunca?",
        "¿Qué verificamos antes de pagar o depositar?",
        "¿Qué señales sí nos deben alertar?",
        "¿Qué hacemos si una cuenta o pago se ve raro?",
        "¿A quién acudimos primero?"
      ]
    },
    {
      id: "K02",
      title: "Checklist de señales de fraude y gasto riesgoso",
      format: "IMPRIMIBLE",
      objective: "Ayuda a identificar presiones, engaños o pagos mal decididos.",
      content: [
        "Piden depósito o pago urgente.",
        "Ofrecen premio, descuento o ganancia demasiado buena.",
        "Piden código, contraseña o datos bancarios por mensaje.",
        "La compra o suscripción no deja claros costos o renovación.",
        "Presionan para decidir sin tiempo de verificar."
      ]
    },
    {
      id: "K03",
      title: "Tarjeta: “Antes de pagar o compartir”",
      format: "TARJETA RECORTABLE",
      objective: "Una ruta clara para decidir mejor bajo presión digital.",
      content: [
        "1. Para.",
        "2. Verifica.",
        "3. No transfieras ni compartas de inmediato.",
        "4. Consulta.",
        "5. Decide con calma."
      ]
    },
    {
      id: "K04",
      title: "Tablero de seguimiento (4 semanas)",
      format: "IMPRIMIBLE",
      objective: "Lleva un registro sencillo de conversación, acuerdos y reacción en casa.",
      content: [
        "Monitoreo semanal del cumplimiento del plan.",
        "Evaluación de la conversación útil sin regaño.",
        "Anotaciones de confianza abierta y cambios necesarios."
      ]
    },
    {
      id: "K05",
      title: "Guía de conversación sin regaño",
      format: "IMPRIMIBLE",
      objective: "Frases que ayudan a hablar de privacidad y dinero sin romper la confianza.",
      content: [
        "“Si algo te salió mal, prefiero enterarme pronto para ayudarte.”",
        "“No todo lo urgente es real ni todo lo barato conviene.”",
        "“Pedir ayuda antes de pagar también es una forma de autonomía.”",
        "“No quiero controlarte por miedo; quiero que tomes decisiones con criterio.”"
      ]
    }
  ]
};
