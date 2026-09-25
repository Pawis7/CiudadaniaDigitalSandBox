export interface CarinoChatMessage {
  speaker: string;
  text: string;
}

export interface CarinoOptionFeedback {
  what_it_protects: string;
  what_remains: string;
  reflection: string;
}

export interface CarinoOption {
  id: string;
  text: string;
  internal_score: number;
  feedback: CarinoOptionFeedback;
}

export interface CarinoMoment {
  id: string;
  title: string;
  context: string;
  chat: CarinoChatMessage[];
  neutral_signals: string[];
  question: string;
  options: CarinoOption[];
}

export interface CarinoClosing {
  title: string;
  model_phrase: string;
  limit_checklist: string[];
  final_message: string;
}

export interface CarinoData {
  metadata: {
    project: string;
    product_id: string;
    version: string;
    audience: string;
    subsegment: string;
    age_range: string;
    status: string;
    based_on_uploaded_file: string;
  };
  product: {
    title: string;
    subtitle: string;
    public_title_question: string;
    format: string;
    duration_minutes: string;
    context_of_use: string;
    core_metaphor: string;
    purpose: string;
    observable_outcome: string;
    formation_of_character: {
      virtues: string[];
      observable_behaviors: string[];
    };
  };
  publication_rules: {
    do_not_show: string[];
    show_instead: string[];
  };
  case: {
    case_title: string;
    situation: string;
    central_dilemma: string;
    neutral_evidence: string[];
  };
  interaction_model: {
    mode: string;
    moments: number;
    randomize_options: boolean;
    feedback_timing: string;
    data_collection: string;
    ux_improvements: string[];
  };
  moments: CarinoMoment[];
  closing: CarinoClosing;
}

export const EL_CARINO_DATA: CarinoData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    product_id: "CDJ-262",
    version: "v3.0_mejorado_pedagogia_ux",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 14 años",
    status: "Listo para revisión de contenido, diseño y programación",
    based_on_uploaded_file: "CDJ-262_caso_corto_preguntas_generadoras_secundaria_V2.html"
  },
  product: {
    title: "El cariño no pide contraseñas",
    subtitle: "Caso interactivo para reconocer control digital, cuidar tu privacidad y poner límites claros.",
    public_title_question: "¿Dónde termina el cariño y empieza el control digital?",
    format: "Caso interactivo + radar de señales + tarjeta de límite",
    duration_minutes: "12 a 18",
    context_of_use: "Micrositio CDJ / actividad individual o guiada",
    core_metaphor: "El límite como candado personal: cuida sin atacar y protege sin aislarte.",
    purpose: "Que el estudiante reconozca señales de control digital disfrazadas de cariño, identifique datos que no deben entregarse y practique una respuesta segura, clara y respetuosa.",
    observable_outcome: "El estudiante distingue cuidado de vigilancia, rechaza compartir contraseña, ubicación o capturas, y elige una ruta de apoyo si la presión escala.",
    formation_of_character: {
      virtues: [
        "prudencia",
        "dignidad",
        "autocuidado",
        "fortaleza",
        "respeto"
      ],
      observable_behaviors: [
        "decir no sin insultar",
        "no entregar datos privados para demostrar confianza",
        "pedir apoyo antes de responder desde el miedo",
        "guardar evidencia si hay presión o amenaza",
        "bloquear o reportar si la insistencia continúa"
      ]
    }
  },
  publication_rules: {
    do_not_show: [
      "puntajes internos",
      "etiquetas de respuesta correcta/incorrecta antes de elegir",
      "colores tipo semáforo que adelanten la respuesta",
      "mensajes moralizantes o culpabilizadores",
      "solicitud de datos reales del estudiante"
    ],
    show_instead: [
      "contexto narrativo",
      "señales neutrales",
      "opciones plausibles",
      "retroalimentación posterior a la elección",
      "tarjeta final de límite y apoyo"
    ]
  },
  case: {
    case_title: "La ubicación en tiempo real",
    situation: "Nayeli tiene 14 años y se mensajea con Mateo desde hace algunas semanas. Al principio todo parecía tranquilo, pero después Mateo empezó a pedirle ubicación en tiempo real, capturas de sus chats y, finalmente, su contraseña. Mateo dice que lo hace porque le importa, pero Nayeli se siente incómoda. Su amiga Dani le recuerda algo importante: una cosa es cuidar y otra controlar.",
    central_dilemma: "¿Cómo puede Nayeli poner límites sin entregar su privacidad, sin responder con agresión y sin quedarse sola ante la presión?",
    neutral_evidence: [
      "Mateo pide ubicación, capturas y contraseña.",
      "Usa frases de confianza para presionar una respuesta.",
      "Nayeli siente incomodidad, pero duda si está exagerando.",
      "Dani acompaña sin exponer el conflicto al grupo.",
      "Si la presión continúa, puede guardar evidencia y pedir apoyo."
    ]
  },
  interaction_model: {
    mode: "case_interactivo_con_decisiones_y_radar_de_control",
    moments: 6,
    randomize_options: true,
    feedback_timing: "después de elegir",
    data_collection: "no recopila datos personales",
    ux_improvements: [
      "un solo foco por pantalla",
      "opciones de dificultad media con distractores plausibles",
      "retroalimentación dividida en lo que cuida / lo que deja pendiente / pregunta para pensar",
      "microexplicación sobre control digital antes del caso",
      "cierre con frase límite copiable y plan de seguridad breve"
    ]
  },
  moments: [
    {
      id: "M1",
      title: "Momento 1 · La ubicación",
      context: "Mateo insiste en que Nayeli active su ubicación en tiempo real para sentirse tranquilo.",
      chat: [
        {
          speaker: "Mateo",
          text: "¿Ya saliste? Activa tu ubicación en tiempo real para saber dónde andas."
        },
        {
          speaker: "Nayeli",
          text: "Voy con Dani y luego a mi casa. ¿Para qué necesitas verla?"
        },
        {
          speaker: "Mateo",
          text: "No es por controlarte. Si no la activas, siento que ocultas algo."
        }
      ],
      neutral_signals: [
        "La petición revela movimientos reales.",
        "La confianza se usa como presión.",
        "Nayeli no ofreció compartir esa información."
      ],
      question: "¿Qué respuesta cuida mejor su privacidad sin escalar la conversación?",
      options: [
        {
          id: "A",
          text: "Activar la ubicación solo por una hora para que Mateo se calme.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Calma el momento, pero deja abierta la idea de que tu ubicación se puede pedir para evitar conflicto.",
            what_remains: "El límite queda poco claro y puede repetirse.",
            reflection: "¿Qué pasa cuando una excepción se vuelve costumbre?"
          }
        },
        {
          id: "B",
          text: "Responder: “No voy a compartir mi ubicación. Puedo avisar cuando llegue, pero mi ubicación no es prueba de confianza”.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Marca un límite concreto y ofrece una alternativa razonable.",
            what_remains: "Si la presión continúa, puede requerir apoyo adicional.",
            reflection: "¿Cómo suena un límite firme sin sonar agresivo?"
          }
        },
        {
          id: "C",
          text: "Mandarle una captura del mapa sin activar la ubicación en vivo.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Evita compartir seguimiento continuo, pero aún entrega información de movimiento.",
            what_remains: "Puede mantener la dinámica de comprobar dónde está.",
            reflection: "¿Qué datos muestra una captura aunque parezca inofensiva?"
          }
        },
        {
          id: "D",
          text: "Contestar con enojo: “Qué intenso eres, ya no me escribas”.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Pone distancia, pero puede escalar el conflicto si se responde desde la explosión.",
            what_remains: "No deja una ruta clara de seguridad si la insistencia sigue.",
            reflection: "¿Cuándo conviene pausar antes de responder?"
          }
        }
      ]
    },
    {
      id: "M2",
      title: "Momento 2 · La contraseña",
      context: "Después del límite sobre ubicación, Mateo cambia la petición y pide revisar el celular de Nayeli.",
      chat: [
        {
          speaker: "Mateo",
          text: "Entonces mándame captura de tus chats. Solo quiero saber con quién hablas."
        },
        {
          speaker: "Nayeli",
          text: "Mis chats son privados."
        },
        {
          speaker: "Mateo",
          text: "Si de verdad confías en mí, pásame tu contraseña. Así no hay secretos."
        }
      ],
      neutral_signals: [
        "Se pide acceso a conversaciones.",
        "Se solicita una contraseña personal.",
        "La confianza se presenta como intercambio de acceso."
      ],
      question: "¿Qué debería hacer Nayeli antes de que la presión crezca?",
      options: [
        {
          id: "A",
          text: "Mandar solo una captura para demostrar que no oculta nada.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Parece menos grave que dar la contraseña, pero también expone conversaciones y datos de otras personas.",
            what_remains: "La presión puede moverse de una captura a más pruebas.",
            reflection: "¿Por qué una captura también puede invadir privacidad?"
          }
        },
        {
          id: "B",
          text: "No compartir contraseña ni capturas, guardar los mensajes y hablar con Dani o una persona adulta de confianza.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Protege la cuenta, conserva evidencia y evita que Nayeli enfrente sola la situación.",
            what_remains: "Debe elegir bien a quién mostrar lo necesario, sin reenviar todo a grupos.",
            reflection: "¿Qué diferencia hay entre pedir apoyo y hacer público un conflicto?"
          }
        },
        {
          id: "C",
          text: "Cambiar la contraseña, pero decirle a Mateo que después se la pasa si se tranquiliza.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Cambiar la contraseña protege por ahora, pero prometer acceso después mantiene la idea de que la privacidad es negociable.",
            what_remains: "El mensaje puede dejar confuso el límite.",
            reflection: "¿Qué datos no deben usarse como prueba de cariño?"
          }
        },
        {
          id: "D",
          text: "Ignorarlo todo y esperar a que se le pase.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Pausar evita responder por miedo, pero si la insistencia sigue, quedarse sola puede aumentar la presión.",
            what_remains: "Falta una red de apoyo y una acción de seguridad.",
            reflection: "¿Cuándo ignorar ayuda y cuándo solo aplaza el problema?"
          }
        }
      ]
    },
    {
      id: "M3",
      title: "Momento 3 · La culpa",
      context: "Mateo insiste y convierte el límite de Nayeli en una supuesta prueba de desconfianza.",
      chat: [
        {
          speaker: "Mateo",
          text: "Si no me dejas ver tus chats es porque algo escondes."
        },
        {
          speaker: "Mateo",
          text: "Yo sí compartiría todo contigo."
        },
        {
          speaker: "Nayeli",
          text: "No quiero pelear, pero me incomoda."
        }
      ],
      neutral_signals: [
        "La culpa se usa para presionar.",
        "El límite se interpreta como traición.",
        "La incomodidad de Nayeli es una señal importante."
      ],
      question: "¿Cuál es la mejor lectura de esta situación?",
      options: [
        {
          id: "A",
          text: "Es normal que una persona pida pruebas si se preocupa mucho.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Esta lectura normaliza la vigilancia. Preocuparse por alguien no da derecho a revisar sus cuentas.",
            what_remains: "No distingue cuidado de control.",
            reflection: "¿Qué diferencia hay entre preocuparse y vigilar?"
          }
        },
        {
          id: "B",
          text: "Hay una señal de control: se usa culpa para que Nayeli entregue privacidad.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Reconoce la señal central: la confianza no debería exigir contraseñas, ubicación ni capturas.",
            what_remains: "Aún falta decidir cómo responder y a quién pedir apoyo.",
            reflection: "¿Qué frases hacen que un límite parezca una falta de cariño?"
          }
        },
        {
          id: "C",
          text: "Nayeli debería explicar con detalle todos sus chats para que Mateo entienda.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Sobreexplicar puede ponerla a justificar su vida privada y entregar más información.",
            what_remains: "No todo límite necesita una explicación larga.",
            reflection: "¿Cuándo explicar ayuda y cuándo te deja más expuesto?"
          }
        },
        {
          id: "D",
          text: "Lo mejor es contestar con otra amenaza para que Mateo sienta lo mismo.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Responder con amenaza puede escalar y mover el problema hacia otra agresión.",
            what_remains: "No protege privacidad ni construye una salida segura.",
            reflection: "¿Cómo se corta una presión sin copiar la agresión?"
          }
        }
      ]
    },
    {
      id: "M4",
      title: "Momento 4 · La aliada",
      context: "Nayeli le cuenta a Dani lo que pasa, cuidando no exponer conversaciones de otras personas.",
      chat: [
        {
          speaker: "Nayeli",
          text: "No sé si estoy exagerando. Me pidió ubicación, capturas y contraseña."
        },
        {
          speaker: "Dani",
          text: "No estás exagerando. Puedes poner un límite y pedir apoyo si insiste."
        },
        {
          speaker: "Dani",
          text: "No tienes que demostrar cariño con tus cuentas."
        }
      ],
      neutral_signals: [
        "Dani acompaña sin decidir por Nayeli.",
        "Pedir apoyo no significa hacer escándalo.",
        "El conflicto puede atenderse antes de escalar."
      ],
      question: "¿Qué forma de apoyo es más segura y proporcional?",
      options: [
        {
          id: "A",
          text: "Publicar capturas en el grupo para que todos opinen si Mateo exageró.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Puede sentirse como defensa, pero convierte el conflicto en espectáculo y puede escalar chismes o burlas.",
            what_remains: "Expone más información y suma presión social.",
            reflection: "¿Por qué no todo apoyo debe ser público?"
          }
        },
        {
          id: "B",
          text: "Mostrar lo necesario a Dani o a una persona adulta de confianza y pedir orientación antes de responder más.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Permite ordenar la situación, cuidar evidencia y decidir con respaldo.",
            what_remains: "Debe evitarse reenviar información privada innecesaria.",
            reflection: "¿Qué significa mostrar solo lo necesario?"
          }
        },
        {
          id: "C",
          text: "Pedirle a Dani que le escriba a Mateo insultándolo para defenderla.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Delegar una agresión puede complicar el conflicto y poner a otra persona en medio.",
            what_remains: "Defender no significa atacar.",
            reflection: "¿Qué apoyo ayuda sin echar más gasolina?"
          }
        },
        {
          id: "D",
          text: "No contarle a nadie porque en temas de pareja o amistad nadie debe opinar.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Cuidar la privacidad no es aislarse. Cuando hay presión, apoyo confiable puede ser autocuidado.",
            what_remains: "La soledad puede hacer más difícil sostener el límite.",
            reflection: "¿Con quién sí conviene hablar cuando algo incomoda?"
          }
        }
      ]
    },
    {
      id: "M5",
      title: "Momento 5 · Cerrar candados",
      context: "Nayeli decide cuidar su seguridad digital antes de seguir conversando.",
      chat: [
        {
          speaker: "Sistema",
          text: "Revisión rápida de seguridad"
        },
        {
          speaker: "Dani",
          text: "Antes de responder otra vez, revisa tus cuentas."
        },
        {
          speaker: "Nayeli",
          text: "Quiero asegurarme de que nadie tenga acceso."
        }
      ],
      neutral_signals: [
        "Las contraseñas no se comparten.",
        "Las sesiones abiertas pueden revisarse.",
        "La ubicación en tiempo real se puede desactivar."
      ],
      question: "¿Qué paquete de acciones protege mejor sus cuentas y su ubicación?",
      options: [
        {
          id: "A",
          text: "Cambiar contraseña, cerrar sesiones desconocidas, revisar ubicación compartida y activar verificación en dos pasos si está disponible.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Es un paquete completo y preventivo: protege acceso, ubicación y recuperación de cuenta.",
            what_remains: "Si hay amenazas, también conviene guardar evidencia y pedir apoyo.",
            reflection: "¿Qué candado digital cerrarías primero en una situación así?"
          }
        },
        {
          id: "B",
          text: "Borrar toda la conversación para no volver a pensar en eso.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Borrar puede aliviar, pero también elimina evidencia si la presión escala.",
            what_remains: "No mejora seguridad de cuentas ni ubicación.",
            reflection: "¿Qué evidencia conviene conservar sin reenviarla?"
          }
        },
        {
          id: "C",
          text: "Cambiar la foto de perfil para que Mateo no se enoje tanto.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Cambiar la imagen no resuelve el acceso, la ubicación ni la presión.",
            what_remains: "Desvía el foco del problema real.",
            reflection: "¿Qué acciones son cosméticas y cuáles sí protegen?"
          }
        },
        {
          id: "D",
          text: "Apagar el celular toda la semana sin revisar nada más.",
          internal_score: 2,
          feedback: {
            what_it_protects: "Pausar puede ayudar emocionalmente, pero no cierra sesiones ni cambia configuraciones.",
            what_remains: "La seguridad digital necesita acciones concretas, no solo evitar el celular.",
            reflection: "¿Qué se puede hacer sin entrar en pánico?"
          }
        }
      ]
    },
    {
      id: "M6",
      title: "Momento 6 · El límite final",
      context: "Nayeli quiere responder una sola vez, con claridad, y saber qué hacer si la insistencia continúa.",
      chat: [
        {
          speaker: "Mateo",
          text: "¿Entonces no me vas a pasar nada?"
        },
        {
          speaker: "Nayeli",
          text: "Quiero responder sin pelear, pero sin ceder mi privacidad."
        },
        {
          speaker: "Mateo",
          text: "Tú sabrás. Luego no digas que no confío."
        }
      ],
      neutral_signals: [
        "La respuesta debe ser breve.",
        "No necesita justificar toda su vida privada.",
        "Si la presión continúa, puede bloquear, reportar o pedir apoyo."
      ],
      question: "¿Qué frase funciona mejor como límite claro?",
      options: [
        {
          id: "A",
          text: "No voy a compartir mi contraseña, ubicación ni capturas. Podemos hablar con respeto, pero mi privacidad no se negocia.",
          internal_score: 4,
          feedback: {
            what_it_protects: "Marca límites concretos, mantiene respeto y no entrega datos.",
            what_remains: "Si la insistencia sigue, ya no basta con repetir: toca activar apoyo o bloqueo.",
            reflection: "¿Qué parte de la frase cuida la convivencia y qué parte cuida el límite?"
          }
        },
        {
          id: "B",
          text: "Está bien, te paso mi contraseña, pero prométeme que no revisarás todo.",
          internal_score: 0,
          feedback: {
            what_it_protects: "La promesa no protege la cuenta. Una vez que alguien tiene acceso, puede entrar, cambiar datos o compartir información.",
            what_remains: "Cede justo el dato más delicado.",
            reflection: "¿Por qué una contraseña no debe prestarse?"
          }
        },
        {
          id: "C",
          text: "Ya no preguntes o voy a contarle a todos cómo eres.",
          internal_score: 1,
          feedback: {
            what_it_protects: "La molestia es comprensible, pero amenazar con exponer puede escalar el conflicto.",
            what_remains: "El límite queda mezclado con ataque.",
            reflection: "¿Cómo poner un límite sin convertirlo en amenaza?"
          }
        },
        {
          id: "D",
          text: "Te mando mi ubicación cuando vaya sola, pero no cuando esté con mis amigas.",
          internal_score: 1,
          feedback: {
            what_it_protects: "Parece un punto medio, pero mantiene la idea de que la ubicación se puede exigir según la situación.",
            what_remains: "La privacidad sigue condicionada por la presión de otra persona.",
            reflection: "¿Qué límites no conviene negociar?"
          }
        }
      ]
    }
  ],
  closing: {
    title: "Tarjeta de límite: mi privacidad no se negocia",
    model_phrase: "No voy a compartir mi contraseña, ubicación ni capturas. Podemos hablar con respeto, pero mi privacidad no se negocia.",
    limit_checklist: [
      "No comparto contraseñas.",
      "No activo ubicación por presión.",
      "No mando capturas para demostrar confianza.",
      "Guardo evidencia si hay insistencia o amenaza.",
      "Pido apoyo a una persona de confianza.",
      "Bloqueo o reporto si la presión escala."
    ],
    final_message: "El cariño no exige vigilancia. El respeto acepta límites."
  }
};
