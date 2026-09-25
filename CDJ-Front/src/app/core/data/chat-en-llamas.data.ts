export interface ChatMessage {
  speaker: string;
  text: string;
}

export interface ChatOptionFeedback {
  what_it_protects: string;
  what_remains: string;
  reflection: string;
}

export interface ChatOption {
  text: string;
  points: number;
  tags: string[];
  feedback: ChatOptionFeedback;
}

export interface ChatMoment {
  id: string;
  title: string;
  icon: string;
  context: string;
  chat: ChatMessage[];
  question: string;
  options: ChatOption[];
}

export interface ChatClosing {
  title: string;
  model_phrase: string;
  limit_checklist: string[];
  final_message: string;
}

export interface ChatData {
  metadata: {
    project: string;
    product_id: string;
    version: string;
    audience: string;
    subsegment: string;
    age_range: string;
    status: string;
  };
  product: {
    title: string;
    subtitle: string;
    public_title_question: string;
    duration_minutes: string;
    core_metaphor: string;
    purpose: string;
  };
  case: {
    case_title: string;
    situation: string;
    neutral_evidence: string[];
  };
  moments: ChatMoment[];
  closing: ChatClosing;
}

export const CHAT_EN_LLAMAS_DATA: ChatData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    product_id: "CDJ-263",
    version: "v3.1_feedback_mejorada",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 14 años",
    status: "Actualizado: retroalimentación pedagógica y UX mejorada"
  },
  product: {
    title: "Chat en llamas",
    subtitle: "Práctica cómo bajar la tensión cuando una broma, captura o meme empieza a salirse de control.",
    public_title_question: "¿Cómo bajar la tensión en un chat sin humillar, reenviar ni esconder lo que pasó?",
    duration_minutes: "15",
    core_metaphor: "Un chat enojado funciona como fuego: cada captura, burla o indirecta puede alimentarlo. Pausar evita que el daño crezca.",
    purpose: "Que el estudiante distinga hechos, opiniones y contexto incompleto en un conflicto digital, para actuar sin aumentar la exposición ni la agresión."
  },
  case: {
    case_title: "El chat que se salió de control",
    situation: "En el grupo de 3.º de secundaria, un meme editado sobre Emiliano empieza como broma, pero termina en capturas, burlas y presión para que todos opinen.",
    neutral_evidence: [
      "La captura muestra solo la respuesta molesta de Emiliano, no el meme inicial.",
      "El meme editado usa una foto real tomada durante el partido escolar.",
      "Varias personas opinan sin haber visto el contexto completo.",
      "Alguien propone subir todo a una historia para que 'se sepa la verdad'.",
      "Sofía sugiere pausar el chat y pedir apoyo antes de seguir.",
      "El contenido ya puede salir del grupo original si alguien lo reenvía."
    ]
  },
  moments: [
    {
      id: "M1",
      title: "Momento 1 · La captura incompleta",
      icon: "capture",
      context: "Valeria recibe una captura donde solo aparece la respuesta molesta de Emiliano. No se ve el meme editado ni los mensajes anteriores.",
      chat: [
        {
          speaker: "Sofía",
          text: "Oigan, me pasaron esta captura de Emiliano enojadísimo en el grupo de fut 😬"
        },
        {
          speaker: "Diego",
          text: "¡Ufff, se ve que se súper alteró! Emiliano siempre haciendo drama. Pásenla de una vez"
        }
      ],
      question: "¿Qué conviene hacer antes de opinar o reenviar?",
      options: [
        {
          text: "Pedir que no se reenvíe más y preguntar por el contexto completo antes de sacar conclusiones.",
          points: 3,
          tags: ["pausa", "contexto"],
          feedback: {
            what_it_protects: "Buena pausa: no tomas una captura incompleta como prueba total y además intentas frenar la difusión.",
            what_remains: "Siguiente paso: pide contexto sin reenviar la imagen. Si el grupo sigue empujando, usa una frase breve: 'paremos tantito, falta contexto'.",
            reflection: "¿Qué parte de la historia queda fuera cuando solo vemos una captura?"
          }
        },
        {
          text: "Responder que Emiliano exageró, porque en la captura se ve muy enojado.",
          points: 0,
          tags: ["impulso"],
          feedback: {
            what_it_protects: "Esta respuesta nace del impulso: ves enojo y completas la historia demasiado rápido.",
            what_remains: "Ajuste: antes de opinar, pregunta qué pasó antes y evita convertir una reacción aislada en sentencia contra alguien.",
            reflection: "¿Cuándo una captura parece prueba, pero todavía no explica lo que ocurrió?"
          }
        },
        {
          text: "Mandar la captura por privado a más personas para preguntar qué saben.",
          points: 1,
          tags: ["difusion"],
          feedback: {
            what_it_protects: "La intención de entender mejor es válida, pero reenviar la captura multiplica el problema.",
            what_remains: "Ajuste: pregunta por contexto sin mandar la imagen; describe la situación o habla con una persona de confianza.",
            reflection: "¿Cómo se puede pedir contexto sin volver viral el problema?"
          }
        },
        {
          text: "Subir una encuesta para que el grupo vote quién tuvo la culpa.",
          points: 0,
          tags: ["tribunal_publico"],
          feedback: {
            what_it_protects: "Convertir el conflicto en encuesta vuelve el chat un tribunal público. Eso casi nunca repara; normalmente enciende más bandos.",
            what_remains: "Ajuste: cambia la pregunta de 'quién tiene la culpa' a 'qué falta saber y cómo detenemos la difusión'.",
            reflection: "¿Por qué votar culpables en redes rara vez repara el daño?"
          }
        }
      ]
    },
    {
      id: "M2",
      title: "Momento 2 · 'Solo era un meme'",
      icon: "meme",
      context: "Diego dice que todo fue 'solo un meme'. Pero el meme usa una foto real de Emiliano tomada durante el partido escolar y ya varias personas lo guardaron.",
      chat: [
        {
          speaker: "Diego",
          text: "Relájense todos, solo era un meme sobre el partido escolar 😂"
        },
        {
          speaker: "Sofía",
          text: "Pero usaron su foto real de cuando se cayó y le pusieron apodos feos..."
        },
        {
          speaker: "Diego",
          text: "Bueno, pero si causó risa en el grupo no es tan grave, es cura"
        }
      ],
      question: "¿Qué lectura es más completa sobre lo que está pasando?",
      options: [
        {
          text: "Si causó risa, entonces no fue tan grave; los memes son parte del grupo.",
          points: 0,
          tags: ["minimiza"],
          feedback: {
            what_it_protects: "Esta lectura se queda en la risa del grupo y deja fuera a la persona que quedó expuesta.",
            what_remains: "Ajuste: no se trata de prohibir el humor; se trata de no usar la imagen real de alguien para hacerlo quedar mal.",
            reflection: "¿Quién decide si una broma cruzó un límite: quien la hizo o quien quedó expuesto?"
          }
        },
        {
          text: "El problema no es que exista humor, sino usar una foto real para exponer a alguien sin permiso.",
          points: 3,
          tags: ["contexto", "respeto"],
          feedback: {
            what_it_protects: "Buena distinción: el problema no es que exista humor, sino que se use una foto real sin permiso para exponer a alguien.",
            what_remains: "Siguiente paso: pasa de reconocer el límite a pedir que no se guarde ni se reenvíe el meme.",
            reflection: "¿Qué diferencia hay entre reírse con alguien y convertirlo en contenido?"
          }
        },
        {
          text: "Como Emiliano contestó molesto, ya perdió el derecho a quejarse del meme.",
          points: 0,
          tags: ["culpabiliza"],
          feedback: {
            what_it_protects: "Aquí aparece una trampa común: usar una reacción molesta para justificar que el grupo siga dañando.",
            what_remains: "Ajuste: una mala respuesta puede revisarse sin mantener vivo el meme ni castigar a la persona con más exposición.",
            reflection: "¿Una reacción equivocada borra el daño que la provocó?"
          }
        },
        {
          text: "Lo mejor es que cada quien decida si lo guarda; no se puede controlar todo lo que pasa en internet.",
          points: 1,
          tags: ["fatalismo"],
          feedback: {
            what_it_protects: "Es cierto que no controlamos todo internet, pero el grupo sí puede controlar lo que decide reenviar, guardar o celebrar.",
            what_remains: "Ajuste: enfócate en lo que sí depende del grupo: dejar de compartir, pedir que se borre y bajar el tono.",
            reflection: "¿Qué cosas sí están bajo control del grupo aunque el contenido ya haya circulado?"
          }
        }
      ]
    },
    {
      id: "M3",
      title: "Momento 3 · El chat se calienta",
      icon: "fire",
      context: "Empiezan apodos, indirectas y mensajes cada vez más pesados. Emiliano pide que dejen de pasar su foto editada.",
      chat: [
        {
          speaker: "Diego",
          text: "Ya dejen de defender a Emiliano 'manos de trapo' jajaja 🧤"
        },
        {
          speaker: "Emiliano",
          text: "Oigan, ya paren. En serio, dejen de pasar mi foto editada. No da risa."
        },
        {
          speaker: "Diego",
          text: "Ay ya vas a empezar con tu drama... si tú solito te expusiste"
        }
      ],
      question: "¿Qué mensaje ayuda más a bajar la tensión sin atacar a nadie?",
      options: [
        {
          text: "'Ya cállense, siempre hacen drama por todo'.",
          points: 0,
          tags: ["escala"],
          feedback: {
            what_it_protects: "Quieres cortar el ruido, pero lo haces con otra agresión. El incendio no se apaga con gasolina.",
            what_remains: "Ajuste: cambia el ataque por límite: 'ya estuvo, no reenviemos más y revisemos qué pasó'.",
            reflection: "¿Qué diferencia hay entre poner límite y atacar?"
          }
        },
        {
          text: "'Pausa. Esto ya está escalando. No reenviemos más capturas ni memes y revisemos qué pasó'.",
          points: 3,
          tags: ["pausa", "contexto", "autocontrol"],
          feedback: {
            what_it_protects: "Buena frase: es breve, frena la difusión y cambia el foco de la burla al contexto.",
            what_remains: "Siguiente paso: no entres a defenderte si se burlan. Repite una vez el límite y después busca apoyo si sigue escalando.",
            reflection: "¿Qué palabras hacen que el límite sea firme sin sonar agresivo?"
          }
        },
        {
          text: "'Yo no me meto, pero sigan si quieren'.",
          points: 1,
          tags: ["retirada_pasiva"],
          feedback: {
            what_it_protects: "No sumarte ayuda, pero dejar el 'sigan si quieren' mantiene abierta la puerta al daño.",
            what_remains: "Ajuste: si no quieres discutir, al menos marca una pausa mínima: 'yo no le entro; mejor no lo reenviemos'.",
            reflection: "¿Cuándo el silencio protege y cuándo deja crecer la agresión?"
          }
        },
        {
          text: "'Emiliano también se pasó, mejor suban todo para que cada quien vea'.",
          points: 0,
          tags: ["difusion", "tribunal_publico"],
          feedback: {
            what_it_protects: "Pedir 'suban todo' parece buscar contexto, pero en la práctica puede amplificar la exposición.",
            what_remains: "Ajuste: el contexto se revisa con quien puede ayudar, no convirtiendo el caso en contenido para todos.",
            reflection: "¿Por qué más información no siempre significa mejor solución?"
          }
        }
      ]
    },
    {
      id: "M4",
      title: "Momento 4 · Te presionan para elegir bando",
      icon: "pressure",
      context: "Alguien te etiqueta: 'Tú dinos quién empezó'. Otros escriben que si no opinas es porque estás defendiendo a Emiliano.",
      chat: [
        {
          speaker: "Diego",
          text: "@Tú dinos quién empezó. No te quedes callado."
        },
        {
          speaker: "Sofía",
          text: "Sí, dinos de qué lado estás. Si no opinas es porque estás defendiendo su berrinche."
        }
      ],
      question: "¿Cómo respondes sin dejarte arrastrar por el grupo?",
      options: [
        {
          text: "'No voy a decidir con una captura incompleta. Si quieren resolverlo, bajen el tono y pidan apoyo'.",
          points: 3,
          tags: ["fortaleza", "contexto", "pausa"],
          feedback: {
            what_it_protects: "Buena forma de resistir presión: no eliges bando con información incompleta y propones bajar el tono.",
            what_remains: "Siguiente paso: si te siguen etiquetando, no sobreexpliques. Repite una frase corta o pide mediación.",
            reflection: "¿Qué te ayuda a no responder solo para quedar bien con el grupo?"
          }
        },
        {
          text: "'Yo creo que Emiliano empezó, pero no me hagan mucho caso'.",
          points: 1,
          tags: ["cede_presion"],
          feedback: {
            what_it_protects: "Esta opción intenta quitarte la presión, pero termina dando al grupo una frase para usar como munición.",
            what_remains: "Ajuste: cuando no hay contexto suficiente, mejor no opinar sobre culpables. Nombra el límite, no el bando.",
            reflection: "¿Qué pasa cuando opinamos para quitarnos presión de encima?"
          }
        },
        {
          text: "Salir del grupo de inmediato y bloquear a todos.",
          points: 1,
          tags: ["evitacion"],
          feedback: {
            what_it_protects: "Retirarte puede protegerte si el chat te rebasa, pero no siempre ayuda a frenar lo que sigue circulando.",
            what_remains: "Ajuste: antes de salir, considera guardar evidencia mínima y avisar a una persona adulta o mediadora si hay daño real.",
            reflection: "¿Cuándo retirarse ayuda y cuándo conviene pedir apoyo antes?"
          }
        },
        {
          text: "Mandar un audio largo explicando todo lo que está mal con el grupo.",
          points: 2,
          tags: ["sobreexplica"],
          feedback: {
            what_it_protects: "Dar razones puede servir, pero un audio largo en un chat caliente se vuelve blanco fácil para burla o edición.",
            what_remains: "Ajuste: usa una frase corta y verificable. En conflictos encendidos, menos discurso y más límite.",
            reflection: "¿Por qué en momentos tensos a veces funciona mejor una frase corta?"
          }
        }
      ]
    },
    {
      id: "M5",
      title: "Momento 5 · El meme ya salió del grupo",
      icon: "spread",
      context: "Más tarde ves el meme en otro chat. No sabes cuántas personas lo tienen. Alguien propone borrar todo para que 'no haya pruebas'.",
      chat: [
        {
          speaker: "Sofía",
          text: "Oigan, el meme ya salió del grupo. Ya lo vi en el chat de 3.º A..."
        },
        {
          speaker: "Diego",
          text: "¡No manches! Si lo ve el prefecto nos van a reportar a todos."
        },
        {
          speaker: "Diego",
          text: "Hay que borrar todos los mensajes rápido para que no haya pruebas."
        }
      ],
      question: "¿Qué ruta cuida mejor a la persona afectada y permite pedir ayuda?",
      options: [
        {
          text: "Borrar todo y fingir que nada pasó para que no haya consecuencias.",
          points: 0,
          tags: ["oculta"],
          feedback: {
            what_it_protects: "Borrar todo puede parecer salida rápida, pero también puede dejar sola a la persona afectada y sin elementos para pedir ayuda.",
            what_remains: "Ajuste: no reenvíes el meme; conserva solo evidencia necesaria y busca apoyo para detener la difusión.",
            reflection: "¿Qué diferencia hay entre dejar de difundir y desaparecer evidencia necesaria?"
          }
        },
        {
          text: "Guardar evidencia mínima, no reenviar el meme, avisar a una persona adulta de confianza y pedir que se detenga la difusión.",
          points: 3,
          tags: ["reparacion", "responsabilidad"],
          feedback: {
            what_it_protects: "Ruta sólida: combina cuidado, evidencia mínima y apoyo sin convertir el caso en espectáculo.",
            what_remains: "Siguiente paso: la reparación no es venganza. Habrá que hablar con quienes participaron sin humillar de vuelta.",
            reflection: "¿Qué evidencia basta para pedir ayuda sin seguir dañando?"
          }
        },
        {
          text: "Hacer una publicación contando quién lo hizo para que todos sepan la verdad.",
          points: 0,
          tags: ["venganza_publica"],
          feedback: {
            what_it_protects: "Exponer al responsable puede sentirse justo, pero abre otra ronda de ataque público y más difusión del caso.",
            what_remains: "Ajuste: busca responsabilidad por una ruta de apoyo o mediación, no por publicación de escarnio.",
            reflection: "¿Qué puede salir mal cuando buscamos reparar con una publicación pública?"
          }
        },
        {
          text: "Decirle a Emiliano que mejor no haga caso porque mañana se les olvida.",
          points: 1,
          tags: ["minimiza"],
          feedback: {
            what_it_protects: "Intentas tranquilizar, pero 'no hagas caso' puede sonar a 'tu malestar no importa'.",
            what_remains: "Ajuste: acompaña sin minimizar: 'entiendo que te pegó; no lo voy a reenviar y buscamos apoyo'.",
            reflection: "¿Qué frases acompañan sin minimizar?"
          }
        }
      ]
    },
    {
      id: "M6",
      title: "Momento 6 · Acuerdo para que no se repita",
      icon: "agreement",
      context: "El grupo acepta que el chat se salió de control. Ahora necesitan un acuerdo simple para futuros conflictos.",
      chat: [
        {
          speaker: "Sofía",
          text: "Menos mal que pudimos hablarlo bien en orientación..."
        },
        {
          speaker: "Diego",
          text: "La verdad es que sí nos pasamos. El chat se súper calentó."
        },
        {
          speaker: "Sofía",
          text: "Necesitamos un acuerdo claro en el grupo para que esto no vuelva a ocurrir."
        }
      ],
      question: "¿Qué acuerdo sería más útil y realista para el grupo?",
      options: [
        {
          text: "'En este grupo nunca se hacen bromas'.",
          points: 1,
          tags: ["exceso"],
          feedback: {
            what_it_protects: "La intención es cuidar, pero un acuerdo imposible suele romperse rápido y perder autoridad.",
            what_remains: "Ajuste: no elimines todo humor; pon límites claros sobre humillación, imágenes sin permiso y reenvíos.",
            reflection: "¿Qué acuerdos se pueden cumplir de verdad?"
          }
        },
        {
          text: "'Si una publicación humilla, no la reenviamos; si una captura está incompleta, no la usamos como prueba; si escala, pedimos apoyo'.",
          points: 3,
          tags: ["acuerdo", "reparacion", "contexto"],
          feedback: {
            what_it_protects: "Buen acuerdo: es concreto, aplicable y cubre tres puntos clave: difusión, contexto y apoyo.",
            what_remains: "Siguiente paso: que el grupo lo use cuando haya presión real, no solo cuando todos están tranquilos.",
            reflection: "¿Cómo se nota que un acuerdo sí cambia la conducta del grupo?"
          }
        },
        {
          text: "'Cada quien se hace responsable de lo que le pase si responde feo'.",
          points: 0,
          tags: ["culpabiliza"],
          feedback: {
            what_it_protects: "Esta frase habla de responsabilidad, pero carga todo sobre quien reacciona y borra el papel del grupo.",
            what_remains: "Ajuste: un chat también es corresponsable cuando alimenta, guarda o reenvía contenido que humilla.",
            reflection: "¿Por qué la responsabilidad en un chat no es solo individual?"
          }
        },
        {
          text: "'Si alguien se ofende, que lo diga por privado para no cortar el ambiente'.",
          points: 1,
          tags: ["desplaza_carga"],
          feedback: {
            what_it_protects: "Pedir que la persona afectada hable por privado puede ayudar, pero también le deja toda la carga a quien recibió el daño.",
            what_remains: "Ajuste: el grupo debe tener una regla previa: si humilla, no se reenvía, aunque nadie haya pedido parar todavía.",
            reflection: "¿Qué parte del cuidado le toca al grupo antes de que alguien tenga que pedirlo?"
          }
        }
      ]
    }
  ],
  closing: {
    title: "Acuerdo de chat de 3.º B",
    model_phrase: "Pausa. No reenviemos más. Revisemos contexto y pidamos apoyo si hace falta.",
    limit_checklist: [
      "No reenviar memes, capturas ni audios que humillen.",
      "Guardar solo evidencia necesaria.",
      "Evitar insultos, burlas o indirectas.",
      "Pedir una pausa con frase breve.",
      "Acudir a tutoría, orientación o una persona adulta de confianza."
    ],
    final_message: "Si una publicación humilla, no la reenviamos. Si escala, pausamos."
  }
};
