export interface AppNoSeAcabaDetectorItem {
  id: string;
  label: string;
  type: 'hook' | 'brake' | 'context' | 'risk_context';
  feedback: string;
}

export interface AppNoSeAcabaOption {
  text: string;
  points: number;
  cares: string;
  pending: string;
  think: string;
}

export interface AppNoSeAcabaDilemma {
  id: string;
  title: string;
  scene: string;
  evidence: string[];
  question: string;
  options: AppNoSeAcabaOption[];
}

export interface AppNoSeAcabaData {
  metadata: {
    project: string;
    product_id: string;
    version: string;
    audience: string;
    subsegment: string;
    age_range: string;
    title: string;
    public_title: string;
    status: string;
  };
  branding: {
    programa: string;
    institucion: string;
    proyecto: string;
    logo_oficial_requerido: boolean;
  };
  pantalla_inicio: {
    titulo: string;
    subtitulo: string;
    chips: string[];
    indicaciones: string[];
    boton_inicio: string;
  };
  detector_items: AppNoSeAcabaDetectorItem[];
  dilemmas: AppNoSeAcabaDilemma[];
}

export const APP_NO_SE_ACABA_DATA: AppNoSeAcabaData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    product_id: "CDJ-255",
    version: "v3.0_laboratorio_atencion",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 15 años",
    title: "La app que no se acaba",
    public_title: "¿Por qué me cuesta salir de la app?",
    status: "Prototipo mejorado listo para revisión pedagógica, diseño y programación"
  },
  branding: {
    programa: "ALFA DIGITAL",
    institucion: "Secretaría de Educación Jalisco",
    proyecto: "Ciudadanía Digital Jalisco",
    logo_oficial_requerido: true
  },
  pantalla_inicio: {
    titulo: "La app que no se acaba",
    subtitulo: "Ayuda a Leo a descubrir por qué una app puede jalar su atención aunque ya quiera salir. No se trata de odiar la tecnología: se trata de usarla con más control.",
    chips: [
      "Estudiantes",
      "Secundaria",
      "Bienestar digital",
      "CDJ-255"
    ],
    indicaciones: [
      "Analiza las señales y notificaciones que Leo recibe.",
      "Elige opciones realistas en cada momento para tomar control de tu atención.",
      "Este recurso no pide datos personales. Tus respuestas sirven solo para darte retroalimentación.",
      "Al final obtendrás un plan personalizado y un reto de 7 días."
    ],
    boton_inicio: "Iniciar laboratorio"
  },
  detector_items: [
    {
      id: "autoplay",
      label: "La app reproduce otro video automáticamente.",
      type: "hook",
      feedback: "Reduce el momento de pausa: si el siguiente video aparece solo, decidir salir cuesta más."
    },
    {
      id: "streak",
      label: "La app avisa que Leo perderá su racha.",
      type: "hook",
      feedback: "La racha convierte una decisión personal en presión de pérdida."
    },
    {
      id: "notification",
      label: "La notificación aparece mientras intenta hacer tarea.",
      type: "hook",
      feedback: "La interrupción rompe el foco aunque Leo no entre mucho tiempo."
    },
    {
      id: "recommendations",
      label: "Aparecen videos muy parecidos al anterior.",
      type: "hook",
      feedback: "Las recomendaciones encadenan contenido y hacen que el final se vuelva borroso."
    },
    {
      id: "timer",
      label: "Leo pone un temporizador antes de entrar.",
      type: "brake",
      feedback: "Eso no es gancho de la app; es un freno que Leo podría usar."
    },
    {
      id: "friend",
      label: "Un amigo le manda un video por mensaje.",
      type: "context",
      feedback: "Es parte del contexto social, pero no necesariamente un mecanismo de la app por sí solo."
    },
    {
      id: "sleep",
      label: "Leo usa el celular justo antes de dormir.",
      type: "risk_context",
      feedback: "Es una situación que aumenta el impacto; no es gancho técnico, pero sí un momento vulnerable."
    },
    {
      id: "close",
      label: "El botón de cerrar está disponible y visible.",
      type: "brake",
      feedback: "Si el cierre es claro, ayuda a recuperar control; aquí funciona como freno, no como gancho."
    }
  ],
  dilemmas: [
    {
      id: "D1",
      title: "Momento 1 · Antes de abrir",
      scene: "Leo entra para ver un video que le mandó el grupo. Dice: ‘solo cinco minutos’. Todavía no abrió la app.",
      evidence: [
        "Sabe para qué quiere entrar.",
        "Todavía puede poner una condición antes de empezar.",
        "El problema suele aparecer cuando entra sin límite de salida."
      ],
      question: "¿Qué decisión le da más control antes de entrar?",
      options: [
        {
          text: "Abrir rápido y confiar en que ahora sí saldrá cuando termine el video.",
          points: 1,
          cares: "Quiere usar la app sin exagerar.",
          pending: "Depende demasiado de acordarse justo cuando el impulso ya empezó.",
          think: "¿Qué señal externa podría ayudarle a salir?"
        },
        {
          text: "Decidir ver solo ese video, poner temporizador de 10 minutos y cerrar cuando suene.",
          points: 4,
          cares: "Combina intención con una señal concreta de salida.",
          pending: "Debe cumplir el cierre cuando suene, no negociar ‘uno más’. ",
          think: "¿Qué haría más fácil respetar ese temporizador?"
        },
        {
          text: "Esperar hasta tener mucho tiempo libre para entrar sin preocuparse por salir.",
          points: 2,
          cares: "Evita interrumpir la tarea en ese momento.",
          pending: "No resuelve el ciclo de quedarse más tiempo cuando la app empieza a recomendar más contenido.",
          think: "¿Tiempo libre significa tiempo sin límite?"
        },
        {
          text: "Pedir al grupo que le resuma el video para no quedarse fuera de la conversación.",
          points: 3,
          cares: "Busca participar sin abrir la app inmediatamente.",
          pending: "Puede funcionar si el video no era necesario; no enseña todavía a usar la app con límites.",
          think: "¿Cuándo conviene no entrar aunque todos estén hablando del tema?"
        }
      ]
    },
    {
      id: "D2",
      title: "Momento 2 · La app no se acaba",
      scene: "Termina el video y aparece otro casi igual. El título promete: ‘este sí tienes que verlo’. Leo siente curiosidad.",
      evidence: [
        "La recomendación aparece justo al terminar el video.",
        "No hay una decisión nueva clara entre un video y otro.",
        "La curiosidad no es mala, pero puede encadenarse."
      ],
      question: "¿Qué lectura ayuda más a entender lo que está pasando?",
      options: [
        {
          text: "Si le da curiosidad, significa que de verdad quería seguir viendo.",
          points: 1,
          cares: "Reconoce que hay interés real.",
          pending: "Confunde interés con permanencia automática; la app también ordena lo que aparece y cuándo aparece.",
          think: "¿La curiosidad nació antes de abrir o apareció por la recomendación?"
        },
        {
          text: "El diseño reduce la pausa entre videos; por eso conviene crear un momento de salida.",
          points: 4,
          cares: "Detecta el mecanismo central: menos pausa, más continuidad.",
          pending: "Falta convertir esa lectura en regla concreta.",
          think: "¿Cuál sería una buena señal para decir ‘hasta aquí’?"
        },
        {
          text: "El problema es que el video anterior no fue suficientemente bueno; por eso busca otro.",
          points: 1,
          cares: "Observa que Leo no quedó satisfecho.",
          pending: "Buscar que el tiempo ‘valga la pena’ puede alargar más el uso.",
          think: "¿Cuándo buscar compensar el tiempo perdido termina haciendo perder más tiempo?"
        },
        {
          text: "Debe dejar la app para siempre porque todas las recomendaciones son manipulación.",
          points: 2,
          cares: "Reconoce que hay diseño persuasivo.",
          pending: "La respuesta es extrema y difícil de sostener; CDJ busca criterio, no pánico digital.",
          think: "¿Qué límite sería realista sin borrar toda la vida digital?"
        }
      ]
    },
    {
      id: "D3",
      title: "Momento 3 · La racha interrumpe",
      scene: "Mientras hace tarea, Leo recibe: ‘Tu racha está en peligro. Entra ahora’. Siente que si no entra, pierde algo.",
      evidence: [
        "La notificación aparece durante una actividad que requiere foco.",
        "La palabra ‘peligro’ aumenta urgencia.",
        "La racha convierte una app en obligación."
      ],
      question: "¿Qué respuesta cuida mejor su atención sin irse a extremos?",
      options: [
        {
          text: "Entrar de inmediato para salvar la racha y volver rápido a la tarea.",
          points: 1,
          cares: "Quiere resolverlo rápido.",
          pending: "La app ya marcó el ritmo; además, ‘rápido’ puede abrir otra cadena de contenido.",
          think: "¿Quién decidió el momento: Leo o la notificación?"
        },
        {
          text: "Silenciar esa app en horario de tarea y sueño, y revisarla en una franja decidida por él.",
          points: 4,
          cares: "Cambia el momento de entrada: Leo decide cuándo revisar.",
          pending: "Debe elegir una franja realista para no abandonar el ajuste al tercer día.",
          think: "¿Qué horarios son más vulnerables para tu atención?"
        },
        {
          text: "Apagar todas las notificaciones del celular para siempre.",
          points: 2,
          cares: "Reduce interrupciones de golpe.",
          pending: "Puede ser poco realista y bloquear avisos útiles; conviene empezar por la app que más interrumpe.",
          think: "¿Qué app merece el primer ajuste?"
        },
        {
          text: "Pedirle a un amigo que le avise cuando ya lleve mucho tiempo en la app.",
          points: 3,
          cares: "Busca apoyo externo.",
          pending: "Sirve como apoyo, pero deja el control principal fuera de Leo.",
          think: "¿Qué freno puede depender más de ti y menos de alguien más?"
        }
      ]
    },
    {
      id: "D4",
      title: "Momento 4 · Después de una hora",
      scene: "Leo deja el celular cansado. No recuerda bien qué vio y siente que no avanzó con su tarea ni descansó.",
      evidence: [
        "Hubo tiempo de uso, pero poca satisfacción.",
        "El cansancio aparece después de muchas piezas cortas de contenido.",
        "Culparse puede bloquear el aprendizaje."
      ],
      question: "¿Qué conclusión le sirve para aprender sin culparse?",
      options: [
        {
          text: "‘Soy muy débil; si tuviera disciplina no me pasaría’.",
          points: 0,
          cares: "Reconoce que hay algo que mejorar.",
          pending: "La culpa no diseña un plan; solo hace que el problema se sienta personal e imposible.",
          think: "¿Qué cambia si pasas de culparte a observar el patrón?"
        },
        {
          text: "‘La app usa recomendaciones, notificaciones y continuidad; yo puedo poner frenos concretos’.",
          points: 4,
          cares: "Une dos piezas: diseño de la app y decisión personal.",
          pending: "El siguiente paso es elegir solo un ajuste para empezar.",
          think: "¿Cuál freno tendría más impacto esta semana?"
        },
        {
          text: "‘Si los videos hubieran sido mejores, el tiempo habría valido la pena’.",
          points: 1,
          cares: "Intenta evaluar la calidad del contenido.",
          pending: "El punto no es solo si fue bueno o malo, sino si Leo decidió o fue arrastrado.",
          think: "¿Disfrutar algo elimina la necesidad de límite?"
        },
        {
          text: "‘La única solución es borrar todo y no volver a usar apps de video’.",
          points: 2,
          cares: "Quiere cortar el ciclo.",
          pending: "Puede funcionar un día, pero no siempre enseña autocontrol digital sostenible.",
          think: "¿Qué cambio pequeño podrías mantener sin sentirlo como castigo?"
        }
      ]
    },
    {
      id: "D5",
      title: "Momento 5 · El experimento",
      scene: "El grupo quiere probar si reducir interrupciones mejora el foco, pero no quieren una regla imposible.",
      evidence: [
        "Buscan observar cambios, no solo prometer ‘usar menos’.",
        "Un buen experimento debe ser concreto, medible y realista.",
        "El reto debe cuidar tarea, descanso y sueño."
      ],
      question: "¿Cuál experimento tiene mejor diseño?",
      options: [
        {
          text: "No usar celular durante toda la semana para demostrar fuerza de voluntad.",
          points: 2,
          cares: "Tiene una meta clara.",
          pending: "Es extremo para la mayoría y puede volverse castigo; si falla, parece que todo falló.",
          think: "¿Qué reto tiene mejor probabilidad de sostenerse?"
        },
        {
          text: "Prometer que usarán menos apps, sin registrar nada para no complicarse.",
          points: 1,
          cares: "La intención es sencilla.",
          pending: "Sin registro mínimo, no sabrán qué cambió en foco, sueño o ánimo.",
          think: "¿Qué dato pequeño sí valdría la pena observar?"
        },
        {
          text: "Elegir una app, silenciarla en dos franjas del día y registrar durante 7 días foco o descanso.",
          points: 4,
          cares: "Es concreto, medible y posible de sostener.",
          pending: "Debe quedar claro qué franjas y qué indicador observarán.",
          think: "¿Qué franja elegirías: tarea, comida, convivencia o sueño?"
        },
        {
          text: "Crear diez reglas para todas las apps y revisar cada hora si las cumplieron.",
          points: 2,
          cares: "Quiere tomar en serio el problema.",
          pending: "Demasiadas reglas pueden cansar y hacer que abandonen; menos reglas, mejor seguimiento.",
          think: "¿Qué una sola regla movería más el resultado?"
        }
      ]
    },
    {
      id: "D6",
      title: "Momento 6 · Si falla un día",
      scene: "El día 3 Leo rompe su propio límite. Entra por 10 minutos y se queda 35. Le da pena decirlo en el grupo.",
      evidence: [
        "Un tropiezo no cancela el experimento.",
        "Ocultar la recaída impide aprender del patrón.",
        "Ajustar una regla puede ser más útil que endurecerla."
      ],
      question: "¿Qué respuesta fortalece mejor el autocontrol?",
      options: [
        {
          text: "Abandonar el reto porque ya falló y empezar otra vez cuando tenga más disciplina.",
          points: 1,
          cares: "No quiere engañarse.",
          pending: "Un error no invalida todo; abandonar impide aprender qué lo hizo caer.",
          think: "¿Qué información dejó ese tropiezo?"
        },
        {
          text: "Contarlo sin drama, revisar qué lo activó y ajustar el freno para el día siguiente.",
          points: 4,
          cares: "Convierte el tropiezo en aprendizaje y mantiene la responsabilidad.",
          pending: "Debe elegir un ajuste específico, no solo decir ‘mañana sí’.",
          think: "¿Qué activó la entrada: aburrimiento, notificación, presión o costumbre?"
        },
        {
          text: "Compensar bloqueando el celular completo durante dos días.",
          points: 2,
          cares: "Quiere corregir rápido.",
          pending: "La compensación extrema puede sentirse como castigo y no necesariamente enseña a decidir mejor.",
          think: "¿Corrección o castigo? No son lo mismo."
        },
        {
          text: "No decir nada para que nadie piense que no pudo con el reto.",
          points: 1,
          cares: "Evita la vergüenza momentánea.",
          pending: "Ocultar el problema deja solo a Leo y no permite mejorar la estrategia.",
          think: "¿Qué diferencia hay entre fallar y aprender?"
        }
      ]
    },
    {
      id: "D7",
      title: "Momento 7 · Mensaje para otros",
      scene: "El equipo quiere invitar a otros estudiantes a probar el reto sin regañar ni sonar superior.",
      evidence: [
        "El mensaje debe ser claro y respetuoso.",
        "No debe culpar a quien usa apps.",
        "Debe proponer una acción concreta."
      ],
      question: "¿Qué mensaje comunica mejor la idea?",
      options: [
        {
          text: "Si no puedes dejar una app, te falta disciplina. Apaga el celular y ya.",
          points: 0,
          cares: "Busca una solución rápida.",
          pending: "Culpa y simplifica demasiado; probablemente cierre la conversación.",
          think: "¿Un regaño ayuda a cambiar hábitos?"
        },
        {
          text: "Prueba 7 días: decide antes de entrar, silencia lo que interrumpe y observa si recuperas foco o descanso.",
          points: 4,
          cares: "Propone una acción concreta sin atacar a nadie.",
          pending: "Conviene acompañarlo con ejemplos de franjas o ajustes.",
          think: "¿Qué ejemplo haría que más personas lo intenten?"
        },
        {
          text: "Borra todas tus redes antes de que las redes te controlen.",
          points: 1,
          cares: "Señala que hay un problema real.",
          pending: "Es alarmista y poco realista para muchas personas.",
          think: "¿Cómo hablar de cuidado sin meter miedo?"
        },
        {
          text: "Cada quien sabe cuánto usar su celular; no hay que meterse.",
          points: 1,
          cares: "Evita juzgar a otros.",
          pending: "También evita conversar sobre diseño persuasivo y límites saludables.",
          think: "¿Respetar decisiones significa no hablar del tema?"
        }
      ]
    }
  ]
};
