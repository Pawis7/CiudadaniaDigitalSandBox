export interface PeerPressureChatMessage {
  from: 'me' | 'other' | 'system';
  name: string;
  text: string;
  time: string;
}

export interface PeerPressureOption {
  id: string;
  texto_visible: string;
  puntos: number;
  feedback: string;
  microaccion: string;
  tags: string[];
}

export interface PeerPressureMoment {
  id: string;
  orden: number;
  momento: string;
  pressure_level: number;
  contexto: string;
  chat: PeerPressureChatMessage[];
  evidencias_neutrales: string[];
  pregunta: string;
  opciones: PeerPressureOption[];
  pregunta_generadora_posterior: string;
}

export interface PeerPressureResult {
  min: number;
  max: number;
  titulo: string;
  mensaje: string;
  fortalezas: string[];
  punto_ciego: string;
}

export interface PeerPressureStep {
  paso: string;
  pregunta: string;
}

export interface PeerPressureCard {
  titulo: string;
  descripcion: string;
  pasos: PeerPressureStep[];
}

export interface PeerPressureData {
  metadata: {
    project: string;
    product_id: string;
    version: string;
    audience: string;
    subsegment: string;
    age_range: string;
  };
  proposito: {
    titulo_publico: string;
    subtitulo: string;
  };
  clasificacion: {
    formato: string;
    duracion_sugerida_minutos: string;
  };
  termometro_de_presion: {
    nivel: number;
    nombre: string;
    senal: string;
    pregunta: string;
  }[];
  tarjeta_paro_pienso_decido: PeerPressureCard;
  momentos_interactivos: PeerPressureMoment[];
  resultados_finales: PeerPressureResult[];
  preguntas_generadoras_para_aula: string[];
}

export const PEER_PRESSURE_SIMULATOR_DATA: PeerPressureData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    product_id: "CDJ-253",
    version: "v3.0_mejora_pedagogica_ux",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 14 años"
  },
  proposito: {
    titulo_publico: "El chat como corriente",
    subtitulo: "Decide cómo responder en el grupo sin sumarte al daño, sin atacar y sin dejar sola a la persona afectada."
  },
  clasificacion: {
    formato: "Caso interactivo con chat simulado + termómetro de presión + tarjeta Paro · Pienso · Decido",
    duracion_sugerida_minutos: "12 a 15"
  },
  termometro_de_presion: [
    {
      nivel: 1,
      nombre: "Risa inicial",
      senal: "Aparecen reacciones y comentarios sueltos.",
      pregunta: "¿Esto puede cambiar de tono si otros se suman?"
    },
    {
      nivel: 2,
      nombre: "Empuje del grupo",
      senal: "Te etiquetan, retan o presionan para participar.",
      pregunta: "¿Estoy decidiendo por criterio o por presión?"
    },
    {
      nivel: 3,
      nombre: "Circulación",
      senal: "Aparecen stickers, reenvíos, capturas o más grupos.",
      pregunta: "¿Mi acción reduce o aumenta la exposición?"
    },
    {
      nivel: 4,
      nombre: "Necesidad de apoyo",
      senal: "El contenido sale del grupo, afecta a alguien o puede seguir circulando.",
      pregunta: "¿Qué evidencia guardo y a quién pido apoyo?"
    }
  ],
  tarjeta_paro_pienso_decido: {
    titulo: "Paro · Pienso · Decido",
    descripcion: "Herramienta breve para usar antes de responder, reenviar, capturar, hacer sticker o seguir una burla.",
    pasos: [
      {
        paso: "Paro",
        pregunta: "¿Estoy respondiendo por presión o por criterio propio?"
      },
      {
        paso: "Pienso",
        pregunta: "¿Esto expone, humilla o puede seguir circulando?"
      },
      {
        paso: "Decido",
        pregunta: "¿Qué acción corta, firme y respetuosa puedo hacer ahora?"
      }
    ]
  },
  momentos_interactivos: [
    {
      id: "D1",
      orden: 1,
      momento: "Momento 1 · La corriente empieza",
      pressure_level: 1,
      contexto: "Alguien comparte un audio de una compañera equivocándose durante una exposición. El chat empieza con risas y luego aparecen ideas para usar el audio como burla.",
      chat: [
        { from: "other", name: "Grupo 2B", text: "Nooo, escuchen cómo se trabó en la exposición 😂", time: "14:21" },
        { from: "other", name: "Grupo 2B", text: "Pásenlo otra vez, está buenísimo", time: "14:22" },
        { from: "other", name: "Grupo 2B", text: "Con eso hacemos sticker para el grupo", time: "14:23" },
        { from: "other", name: "Grupo 2B", text: "@tú no seas aburrido, ponle algo bueno", time: "14:24" }
      ],
      evidencias_neutrales: [
        "El audio muestra un error durante una actividad escolar.",
        "La persona del audio no está participando en la conversación.",
        "La conversación pasa de risa a propuesta de sticker.",
        "Te etiquetan para que participes aunque no iniciaste la burla."
      ],
      pregunta: "¿Qué está cambiando en el chat?",
      opciones: [
        {
          id: "A",
          texto_visible: "Todavía parece algo interno del grupo; el problema real empezaría si lo mandan fuera.",
          puntos: 2,
          feedback: "Es verdad que salir del grupo agrava la situación, pero el cambio ya empezó antes: convertir un error en material de burla prepara la circulación.",
          microaccion: "Observa no solo dónde está el contenido, sino para qué lo están usando.",
          tags: ["detecta_parcial"]
        },
        {
          id: "B",
          texto_visible: "El grupo está convirtiendo el error de una persona en contenido para reírse de ella, y además te presiona a participar.",
          puntos: 4,
          feedback: "Buena lectura. Identificas dos señales clave: exposición de alguien que no puede responder y presión para que otros se sumen.",
          microaccion: "Antes de escribir, nombra la presión: ‘me están jalando a participar’.",
          tags: ["reconoce_presion_y_exposicion"]
        },
        {
          id: "C",
          texto_visible: "Lo central es que te etiquetaron; conviene responder algo rápido para que dejen de insistir.",
          puntos: 2,
          feedback: "La etiqueta sí presiona, pero responder rápido puede meterte en la corriente. Primero conviene leer qué efecto tendría tu mensaje.",
          microaccion: "No respondas solo para quitarte presión de encima.",
          tags: ["prioriza_quedar_bien"]
        },
        {
          id: "D",
          texto_visible: "Si la mayoría se está riendo, probablemente la compañera también lo tomaría como broma.",
          puntos: 1,
          feedback: "Cuidado: la risa del grupo no confirma consentimiento. En digital, una mayoría riéndose puede normalizar una exposición injusta.",
          microaccion: "No uses la reacción de la mayoría como brújula automática.",
          tags: ["minimiza_danio"]
        }
      ],
      pregunta_generadora_posterior: "¿Qué cambia cuando una risa del chat empieza a convertirse en presión para participar?"
    },
    {
      id: "D2",
      orden: 2,
      momento: "Momento 2 · Te etiquetan",
      pressure_level: 2,
      contexto: "Varios compañeros esperan tu respuesta. Nadie quiere verse exagerado ni quedar fuera del grupo.",
      chat: [
        { from: "other", name: "Grupo 2B", text: "@tú di algo, siempre tienes buenos memes", time: "14:25" },
        { from: "other", name: "Grupo 2B", text: "Si no contestas es porque eres su abogado jajaja", time: "14:25" },
        { from: "me", name: "Tú", text: "...", time: "14:26" }
      ],
      evidencias_neutrales: [
        "La etiqueta te coloca frente al grupo.",
        "La frase convierte el silencio en motivo de burla.",
        "Responder por impulso puede aumentar el problema.",
        "Todavía puede frenarse sin exhibir más a nadie."
      ],
      pregunta: "¿Qué haces con esa presión?",
      opciones: [
        {
          id: "A",
          texto_visible: "Mandar un emoji neutro y ya no escribir más, para no verte intenso ni alimentar demasiado la burla.",
          puntos: 2,
          feedback: "Puede sentirse como salida intermedia, pero sigue siendo una señal de participación. En chats acelerados, hasta un emoji puede empujar la corriente.",
          microaccion: "Si vas a participar, que sea para reducir el daño, no para sobrevivir socialmente.",
          tags: ["cede_suave"]
        },
        {
          id: "B",
          texto_visible: "Escribirle en privado a alguien con influencia en el grupo: ‘¿paramos esto? Ya se está pasando’.",
          puntos: 3,
          feedback: "Es una ruta útil si te cuesta enfrentar solo al grupo. No es la más directa, pero puede ayudar a crear apoyo antes de intervenir.",
          microaccion: "Buscar aliado puede ser fortaleza, no cobardía, si ayuda a cortar el daño.",
          tags: ["busca_aliado"]
        },
        {
          id: "C",
          texto_visible: "Responder en el chat: ‘No hagamos sticker de ella; mejor sigamos con el trabajo’.",
          puntos: 4,
          feedback: "Buena decisión. Es breve, concreta y no insulta. Pone límite y redirige al propósito del grupo.",
          microaccion: "Una frase límite funciona mejor cuando no ataca: nombra la acción y propone salida.",
          tags: ["pone_limite_breve"]
        },
        {
          id: "D",
          texto_visible: "No escribir nada y cerrar la app; si no participas, no eres parte del problema.",
          puntos: 2,
          feedback: "Pausar te protege del impulso, pero si la burla ya crece, solo irte puede dejar la corriente avanzando sin límite.",
          microaccion: "Pausar sirve más cuando después decides qué acción proporcional toca.",
          tags: ["pausa_sin_accion"]
        }
      ],
      pregunta_generadora_posterior: "¿Qué diferencia hay entre no participar y ayudar a que algo se detenga?"
    },
    {
      id: "D3",
      orden: 3,
      momento: "Momento 3 · El grupo reacciona",
      pressure_level: 2,
      contexto: "Después de poner límite, algunos se burlan de ti. Otros ya no escriben, pero siguen leyendo.",
      chat: [
        { from: "other", name: "Grupo 2B", text: "Ay, ya llegó el serio del salón 🙄", time: "14:27" },
        { from: "other", name: "Grupo 2B", text: "Era broma, tampoco exageres", time: "14:27" },
        { from: "other", name: "Grupo 2B", text: "Bueno ya, manden otra cosa", time: "14:28" }
      ],
      evidencias_neutrales: [
        "El grupo intenta bajarle importancia.",
        "Tu respuesta incomodó a quienes querían seguir.",
        "También hay señales de que el tema podría cambiar.",
        "Insistir demasiado puede abrir otra pelea."
      ],
      pregunta: "¿Cómo sostienes el límite sin echarle más gasolina?",
      opciones: [
        {
          id: "A",
          texto_visible: "Responder una vez más: ‘No es exagerar; solo no quiero sumarme a eso’. Y dejar de discutir.",
          puntos: 4,
          feedback: "Buena ruta. Reafirmas tu postura sin convertir el chat en juicio público. A veces sostener el límite también es no justificarte de más.",
          microaccion: "Una segunda frase corta puede cerrar mejor que diez explicaciones.",
          tags: ["sostiene_limite"]
        },
        {
          id: "B",
          texto_visible: "Explicar con detalle por qué todos estuvieron mal, para que entiendan la gravedad.",
          puntos: 2,
          feedback: "La intención es buena, pero en un chat encendido los mensajes largos se vuelven material para seguir discutiendo o burlarse.",
          microaccion: "Guarda la explicación larga para una conversación con docente, tutoría o grupo guiado.",
          tags: ["sobreexplica"]
        },
        {
          id: "C",
          texto_visible: "Contestar con sarcasmo para que también les dé pena: ‘sí, qué maduros todos’.",
          puntos: 1,
          feedback: "El sarcasmo puede sentirse justo, pero suele mover el conflicto de la burla original a una pelea contigo.",
          microaccion: "No necesitas humillar al grupo para marcar que algo no va.",
          tags: ["escala_conflicto"]
        },
        {
          id: "D",
          texto_visible: "Borrar tus mensajes para que no te sigan molestando y dejar que el tema se enfríe.",
          puntos: 2,
          feedback: "Borrar puede bajar tu exposición, pero no resuelve si el audio o sticker sigue circulando. Además puede parecer que el límite no se sostuvo.",
          microaccion: "Si decides retirarte, hazlo después de una frase breve o busca apoyo fuera del chat.",
          tags: ["se_retira_sin_cierre"]
        }
      ],
      pregunta_generadora_posterior: "¿Cuándo conviene explicar y cuándo conviene solo sostener una frase breve?"
    },
    {
      id: "D4",
      orden: 4,
      momento: "Momento 4 · El sticker aparece",
      pressure_level: 3,
      contexto: "Más tarde ves que alguien ya hizo el sticker y lo mandó a otro grupo. No sabes cuántas personas lo recibieron.",
      chat: [
        { from: "other", name: "Otro grupo", text: "Miren el sticker nuevo del 2B 😂", time: "16:08" },
        { from: "other", name: "Otro grupo", text: "Pásenlo para guardarlo", time: "16:09" },
        { from: "me", name: "Tú", text: "...", time: "16:10" }
      ],
      evidencias_neutrales: [
        "El contenido ya salió del grupo original.",
        "No se sabe hasta dónde llegará.",
        "Reenviar para pedir ayuda también puede ampliar la circulación.",
        "Todavía hay acciones para documentar y pedir apoyo."
      ],
      pregunta: "¿Qué paso conviene seguir si el contenido ya empezó a circular?",
      opciones: [
        {
          id: "A",
          texto_visible: "Guardar evidencia sin reenviar, pedir que lo bajen y avisar a tutoría/orientación si sigue circulando.",
          puntos: 4,
          feedback: "Esta ruta cuida dos cosas: no amplía la burla y sí deja evidencia para pedir apoyo si el grupo no se detiene.",
          microaccion: "Evidencia no significa reenviar: puede ser captura cuidada, fecha, grupo y contexto.",
          tags: ["pide_apoyo_sin_amplificar"]
        },
        {
          id: "B",
          texto_visible: "Reenviarlo a una persona de confianza para que vea exactamente qué está pasando.",
          puntos: 1,
          feedback: "Aunque la intención sea pedir ayuda, reenviar el sticker puede ampliar el daño. Hay formas de pedir apoyo sin circular más el contenido.",
          microaccion: "Describe lo ocurrido o muestra evidencia solo a quien corresponda, sin redistribuir.",
          tags: ["amplifica_con_buena_intencion"]
        },
        {
          id: "C",
          texto_visible: "Borrarlo de tu celular y evitar volver a verlo.",
          puntos: 2,
          feedback: "Evitas guardarlo, pero si ya circula, borrar solo tu copia puede no bastar. Falta una acción para frenar o canalizar.",
          microaccion: "Cuidarte importa, pero también puede hacer falta avisar si el daño continúa.",
          tags: ["se_protege_sin_canalizar"]
        },
        {
          id: "D",
          texto_visible: "Mandarlo al grupo original con el mensaje: ‘vean lo que causaron’.",
          puntos: 1,
          feedback: "Eso puede aumentar la exposición y reactivar la burla. Nombrar el problema no requiere volver a mover el contenido.",
          microaccion: "Habla del hecho sin convertir el contenido en espectáculo otra vez.",
          tags: ["amplifica_para_demostrar"]
        }
      ],
      pregunta_generadora_posterior: "¿Por qué pedir ayuda no es lo mismo que reenviar el contenido a más personas?"
    },
    {
      id: "D5",
      orden: 5,
      momento: "Momento 5 · Apoyar sin exhibir",
      pressure_level: 4,
      contexto: "Piensas en escribirle a la compañera, pero no quieres hacerla sentir peor ni presionarla para explicar lo ocurrido.",
      chat: [
        { from: "system", name: "Nota", text: "La compañera afectada no ha escrito en el grupo desde que empezó la burla.", time: "16:20" },
        { from: "me", name: "Tú", text: "¿Le digo algo?", time: "16:21" }
      ],
      evidencias_neutrales: [
        "La persona afectada no tiene obligación de reaccionar frente al grupo.",
        "Pedirle explicaciones puede aumentar la carga emocional.",
        "Apoyar puede ser ofrecer compañía y opciones, no decidir por ella.",
        "No reenviar el contenido también es una forma de cuidado."
      ],
      pregunta: "¿Qué mensaje de apoyo sería más cuidadoso?",
      opciones: [
        {
          id: "A",
          texto_visible: "‘Vi que están circulando cosas del grupo. No voy a reenviarlas. Si quieres, te acompaño a pedir que las bajen o hablar con alguien’.",
          puntos: 4,
          feedback: "Este mensaje cuida, no presiona y ofrece una acción concreta. Además deja claro que no seguirás circulando el contenido.",
          microaccion: "Apoyar es abrir una puerta, no empujar a alguien a actuar como tú actuarías.",
          tags: ["apoya_sin_exhibir"]
        },
        {
          id: "B",
          texto_visible: "‘No hagas caso, mañana se les olvida’.",
          puntos: 2,
          feedback: "Intenta calmar, pero puede minimizar. En digital, lo que circula no siempre se olvida rápido y la persona puede necesitar apoyo real.",
          microaccion: "Evita frases que suenan tranquilizadoras pero cierran la conversación.",
          tags: ["minimiza_emocion"]
        },
        {
          id: "C",
          texto_visible: "‘¿Por qué no te defendiste? Yo sí les habría contestado’.",
          puntos: 1,
          feedback: "Aunque parezca preocupación, puede sonar a juicio. La persona afectada no está obligada a reaccionar como otros esperan.",
          microaccion: "No evalúes su reacción; ofrece apoyo.",
          tags: ["juzga_reaccion"]
        },
        {
          id: "D",
          texto_visible: "‘Si quieres, puedo ir contigo con tutoría. Tú decides si hablamos o no’.",
          puntos: 3,
          feedback: "Es una buena opción: ofrece compañía y respeta decisión. Le falta aclarar que no reenviarás ni pedirás ver el contenido.",
          microaccion: "Acompañar + no circular contenido es una combinación fuerte.",
          tags: ["acompanamiento_parcial"]
        }
      ],
      pregunta_generadora_posterior: "¿Qué diferencia hay entre acompañar y presionar a alguien para que actúe?"
    },
    {
      id: "D6",
      orden: 6,
      momento: "Momento 6 · Acuerdo de pausa",
      pressure_level: 4,
      contexto: "El grupo necesita una regla simple para evitar que algo parecido vuelva a crecer por impulso.",
      chat: [
        { from: "other", name: "Grupo 2B", text: "Ok, entonces ¿qué regla ponemos para que no vuelva a pasar?", time: "18:03" },
        { from: "me", name: "Tú", text: "...", time: "18:04" }
      ],
      evidencias_neutrales: [
        "El acuerdo debe servir antes de que el daño empiece.",
        "No debe poner toda la carga en quien se siente afectado.",
        "Debe ser fácil de recordar en un chat acelerado.",
        "Debe incluir capturas, reenvíos, stickers y burlas."
      ],
      pregunta: "¿Cuál acuerdo de pausa sería más útil para el grupo?",
      opciones: [
        {
          id: "A",
          texto_visible: "‘Si alguien pide que paremos, paramos y no preguntamos más’.",
          puntos: 3,
          feedback: "Es un acuerdo útil para detener una situación, pero todavía reacciona cuando alguien ya tuvo que pedir que paren.",
          microaccion: "Buen acuerdo de contención; combínalo con una pausa antes de publicar.",
          tags: ["acuerdo_util_incompleto"]
        },
        {
          id: "B",
          texto_visible: "‘Antes de reenviar, capturar o hacer sticker, paramos 10 segundos: ¿expone, humilla o puede seguir circulando?’",
          puntos: 4,
          feedback: "Es preventivo, concreto y fácil de aplicar. Convierte el impulso del chat en una pausa de criterio.",
          microaccion: "Una buena regla cabe en una frase y se puede usar justo antes del clic.",
          tags: ["acuerdo_preventivo"]
        },
        {
          id: "C",
          texto_visible: "‘Si a la mayoría le da risa, se vale; si a la mayoría no, lo borramos’.",
          puntos: 1,
          feedback: "La mayoría también puede presionar o equivocarse. La cantidad de risas no determina si algo cuida o daña.",
          microaccion: "No confundas popularidad con criterio.",
          tags: ["mayoria_como_brujula"]
        },
        {
          id: "D",
          texto_visible: "‘Cada quien se hace responsable de lo que manda; si alguien se ofende, que lo diga’.",
          puntos: 2,
          feedback: "Parece justo, pero pone toda la carga en quien se siente afectado. Un buen acuerdo ayuda a pensar antes, no solo después.",
          microaccion: "La responsabilidad digital no empieza cuando alguien reclama; empieza antes de publicar.",
          tags: ["responsabilidad_tardia"]
        }
      ],
      pregunta_generadora_posterior: "¿Qué tendría que pasar para que este acuerdo no se quede solo en frase bonita?"
    }
  ],
  resultados_finales: [
    {
      min: 21,
      max: 24,
      titulo: "Criterio firme ante la corriente",
      mensaje: "Tus decisiones tienden a frenar la presión del grupo sin atacar. Tu reto es sostener ese criterio incluso cuando otros intenten ridiculizar el límite.",
      fortalezas: ["Lees señales de presión", "Pones límites breves", "Buscas apoyo sin ampliar el daño"],
      punto_ciego: "Cuidar que tu explicación no se vuelva una pelea nueva."
    },
    {
      min: 15,
      max: 20,
      titulo: "Criterio en construcción",
      mensaje: "Identificas parte del problema, pero a veces puedes quedarte en la pausa sin pasar a una acción clara o depender de que otros actúen primero.",
      fortalezas: ["No reaccionas tan rápido", "Notas cuando algo se empieza a pasar", "Puedes buscar aliados"],
      punto_ciego: "Pasar de ‘esto no está bien’ a una frase o acción concreta."
    },
    {
      min: 6,
      max: 14,
      titulo: "Necesitas más pausa antes de responder",
      mensaje: "La presión del grupo puede empujarte a minimizar, seguir la corriente o dejar pasar situaciones que sí pueden dañar.",
      fortalezas: ["Puedes empezar por pausar", "Puedes usar frases preparadas", "Puedes pedir apoyo si el chat escala"],
      punto_ciego: "No usar la risa del grupo como única señal para decidir."
    }
  ],
  preguntas_generadoras_para_aula: [
    "¿Qué señales muestran que el grupo está presionando y no solo bromeando?",
    "¿Por qué un sticker, captura o audio puede seguir dañando aunque la persona no esté en el chat?",
    "¿Qué diferencia hay entre pausar, callar, poner límite y pedir apoyo?",
    "¿Cómo se puede apoyar a alguien sin exponerlo más?",
    "¿Qué significa Fortaleza en un chat donde todos empujan a seguir la corriente?"
  ]
};
