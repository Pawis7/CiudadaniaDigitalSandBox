export interface StickerChatMessage {
  from: 'me' | 'other' | 'system';
  name: string;
  text: string;
  time: string;
}

export interface StickerOption {
  id: string;
  texto_visible: string;
  puntos: number;
  // Retroalimentación formativa de tres bloques
  feedback_cuida: string;
  feedback_pendiente: string;
  feedback_reflexion: string;
  dimension: 'reconocer' | 'detener' | 'acompanar' | 'prevenir';
}

export interface StickerMoment {
  id: string;
  orden: number;
  momento: string;
  intencion: string;
  contexto: string;
  chat: StickerChatMessage[];
  evidencias_neutrales: string[];
  pregunta: string;
  opciones: StickerOption[];
  pregunta_reflexion: string;
}

export interface RepairMapDimension {
  id: 'reconocer' | 'detener' | 'acompanar' | 'prevenir';
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface StickerData {
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
  evidencias_generales: string[];
  momentos_interactivos: StickerMoment[];
  mapa_reparacion: RepairMapDimension[];
}

export const STICKER_CONTROL_DATA: StickerData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    product_id: "CDJ-254",
    version: "v3.0_mejora_pedagogica_ux",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 15 años"
  },
  proposito: {
    titulo_publico: "El sticker que se salió de control",
    subtitulo: "Aprende a responder ante la difusión sin consentimiento de contenido digital y construye un mapa de reparación para el salón."
  },
  clasificacion: {
    formato: "Taller interactivo de reparación digital en seis momentos + mapa final de reparación",
    duracion_sugerida_minutos: "10 a 15"
  },
  evidencias_generales: [
    "E1 · Mensaje de Leo: ‘Solo fue un sticker, no exageren.’",
    "E2 · Cambio en Dani: Dani dejó de escribir y evitó participar al día siguiente.",
    "E3 · Reenvío: Alguien lo mandó a otros grupos fuera del chat original.",
    "E4 · Intervención de Majo: Majo pidió que se detuviera la cadena y que ya no lo compartieran.",
    "E5 · Dato clave: Borrar una copia no borra las copias que ya circularon."
  ],
  mapa_reparacion: [
    {
      id: 'reconocer',
      titulo: 'Reconocer',
      descripcion: 'Asumir el impacto y la responsabilidad de la burla digital sin excusas ni minimizaciones.',
      icono: 'assignment_turned_in'
    },
    {
      id: 'detener',
      titulo: 'Detener',
      descripcion: 'Frenar la cadena de circulación del sticker de forma discreta y sin generar más espectáculo.',
      icono: 'block'
    },
    {
      id: 'acompanar',
      titulo: 'Acompañar',
      descripcion: 'Ofrecer apoyo emocional a Dani respetando sus tiempos, sin forzarlo a explicarse ni exponerlo.',
      icono: 'volunteer_activism'
    },
    {
      id: 'prevenir',
      titulo: 'Prevenir',
      descripcion: 'Establecer acuerdos de convivencia claros en el chat escolar para que no vuelva a ocurrir.',
      icono: 'shield'
    }
  ],
  momentos_interactivos: [
    {
      id: "M1",
      orden: 1,
      momento: "Momento 1 · Nombrar lo que pasó",
      intencion: "Reconocer el daño sin minimizarlo",
      contexto: "En el chat grupal, varios compañeros comentan divertidos el sticker que hizo Leo con la foto de Dani. Leo insiste en que no pasa nada, pero Dani ya no escribe.",
      chat: [
        { from: "other", name: "Leo", text: "Solo fue un sticker, no exageren 🙄", time: "08:15" },
        { from: "other", name: "Compañero", text: "Sí, además quedó graciosísimo jajaja", time: "08:16" },
        { from: "other", name: "Majo", text: "No está chido, Dani ya ni escribe nada.", time: "08:17" }
      ],
      evidencias_neutrales: [
        "Dani dejó de escribir en el grupo.",
        "Leo insiste en que se trata de una exageración.",
        "Otros compañeros siguen celebrando la imagen."
      ],
      pregunta: "Antes de que el grupo quiera cerrar el tema rápido, ¿qué tendría que reconocer Leo?",
      pregunta_reflexion: "¿Qué diferencia hay entre borrar algo y reconocer el daño que causó?",
      opciones: [
        {
          id: "M1_A",
          texto_visible: "Que usó la imagen de Dani para una burla, que eso pudo lastimarle y que el reenvío hizo más difícil controlar el daño.",
          puntos: 4,
          feedback_cuida: "Cuida el reconocimiento directo del hecho, validando que el uso de la imagen ajena para burla es perjudicial por sí mismo.",
          feedback_pendiente: "Falta actuar activamente para frenar la cadena de circulación exterior.",
          feedback_reflexion: "¿Cómo cambia la actitud de un grupo cuando el responsable admite su error sin rodeos?",
          dimension: 'reconocer'
        },
        {
          id: "M1_B",
          texto_visible: "Que el sticker se salió del chat del salón y que debió borrarlo antes de que otros lo reenviaran.",
          puntos: 2,
          feedback_cuida: "Cuida la visibilidad sobre los canales de propagación externa.",
          feedback_pendiente: "Deja pendiente reconocer el daño del acto inicial (hacer la burla), limitándose solo a lamentar la falta de velocidad para borrarlo.",
          feedback_reflexion: "¿Borrar rápido un contenido digital borra la molestia de la persona cuya imagen fue expuesta?",
          dimension: 'reconocer'
        },
        {
          id: "M1_C",
          texto_visible: "Que Dani es una persona muy reservada y que a la próxima debe hacer stickers solo de compañeros que aguanten bromas.",
          puntos: 1,
          feedback_cuida: "Cuida un intento (desviado) de analizar la personalidad de los involucrados.",
          feedback_pendiente: "Deja pendiente asumir la responsabilidad, culpabilizando de forma indirecta a la persona afectada por 'no aguantar' la broma.",
          feedback_reflexion: "¿El respeto digital depende del temperamento de la persona o de las normas de convivencia del grupo?",
          dimension: 'reconocer'
        },
        {
          id: "M1_D",
          texto_visible: "Que el sticker afectó a Dani al grado de no querer participar en clase, aunque Leo no tuviera la intención de causarle ese daño.",
          puntos: 3,
          feedback_cuida: "Cuida la relación entre el sticker y la afectación escolar/emocional observable en Dani.",
          feedback_pendiente: "Deja un espacio de justificación al escudarse en que 'no hubo intención', restando fuerza a la asunción de la falta.",
          feedback_reflexion: "¿La falta de una mala intención disminuye el impacto del daño en el entorno digital?",
          dimension: 'reconocer'
        }
      ]
    },
    {
      id: "M2",
      orden: 2,
      momento: "Momento 2 · Frenar la cadena",
      intencion: "Detener circulación sin aumentar exposición",
      contexto: "El sticker ya circula en chats fuera del grupo escolar. Majo insiste en que borrar la copia de Leo no soluciona el problema de las copias que ya se compartieron.",
      chat: [
        { from: "other", name: "Majo", text: "Borrarlo de tu cel no sirve si ya lo mandaron a otros grupos.", time: "11:30" },
        { from: "other", name: "Compañero 2", text: "Ya lo vi en el grupo de fútbol del A...", time: "11:32" },
        { from: "other", name: "Compañero 3", text: "Y yo en el de la banda", time: "11:33" }
      ],
      evidencias_neutrales: [
        "El contenido circula en grupos de otros salones y actividades.",
        "Borrar la imagen de origen no borra las descargas activas.",
        "El problema crece y sale de la jurisdicción del grupo inicial."
      ],
      pregunta: "El sticker ya salió del chat original. ¿Qué acción va primero?",
      pregunta_reflexion: "¿Qué mensaje corto ayuda a cortar la cadena sin convertirlo en persecución?",
      opciones: [
        {
          id: "M2_A",
          texto_visible: "Pedir que nadie lo reenvíe más, que borren copias y que avisen en qué grupos apareció para pedir que también lo detengan.",
          puntos: 4,
          feedback_cuida: "Cuida la contención inmediata del sticker y promueve un monitoreo responsable enfocado en reducir la propagación.",
          feedback_pendiente: "Falta el acercamiento personal con Dani para apoyarle y la mediación escolar.",
          feedback_reflexion: "¿Por qué es vital dar instrucciones claras al grupo en lugar de solo quejarse del problema?",
          dimension: 'detener'
        },
        {
          id: "M2_B",
          texto_visible: "Publicar un mensaje de alerta en el chat general exigiendo saber quién lo reenvió para castigar al responsable.",
          puntos: 2,
          feedback_cuida: "Cuida la intención de buscar responsabilidades y frenar las malas conductas.",
          feedback_pendiente: "Deja pendiente la contención física del sticker al enfocarse en culpas, generando tensiones y más mensajes en el chat.",
          feedback_reflexion: "¿El enojo en público ayuda a detener la difusión de un archivo o tiende a avivar el conflicto?",
          dimension: 'detener'
        },
        {
          id: "M2_C",
          texto_visible: "Reportar el sticker en la aplicación de chat para que la plataforma lo borre automáticamente de todos los teléfonos.",
          puntos: 1,
          feedback_cuida: "Cuida el intento de usar medidas técnicas de moderación en la app.",
          feedback_pendiente: "Deja pendiente la acción humana inmediata; los reportes de plataformas no eliminan los archivos descargados localmente.",
          feedback_reflexion: "¿Podemos depender de los tiempos de soporte de una aplicación cuando un compañero sufre acoso hoy?",
          dimension: 'detener'
        },
        {
          id: "M2_D",
          texto_visible: "Escribir individualmente a los administradores de los otros chats para pedirles que borren el sticker y el mensaje.",
          puntos: 3,
          feedback_cuida: "Cuida la diplomacia y actúa directamente sobre los administradores externos que tienen poder de moderación.",
          feedback_pendiente: "Deja de lado la acción colectiva del grupo de origen, que fue el que gestó y extendió el daño inicial.",
          feedback_reflexion: "¿Qué tiene más impacto: el reclamo de una sola persona o el acuerdo de un grupo que enmienda su error?",
          dimension: 'detener'
        }
      ]
    },
    {
      id: "M3",
      orden: 3,
      momento: "Momento 3 · Disculparse sin presionar",
      intencion: "Reparar sin exigir perdón",
      contexto: "Dani faltó a clases hoy tras el incidente y sigue sin contestar las llamadas ni los chats. El grupo siente la tensión de la situación.",
      chat: [
        { from: "system", name: "Estado", text: "Dani no asistió a la escuela y tiene su teléfono apagado.", time: "14:10" },
        { from: "other", name: "Leo", text: "¿Le escribo algo en privado o mejor dejo que se le pase?", time: "14:12" }
      ],
      evidencias_neutrales: [
        "Dani está ausente del aula física y digital.",
        "Hay una presión indirecta sobre Dani para responder o restarle importancia.",
        "La disculpa debe enfocarse en resarcir, no en librar de culpa al emisor."
      ],
      pregunta: "Dani no ha respondido. ¿Cómo conviene acercarse?",
      pregunta_reflexion: "¿Cómo suena una disculpa que reconoce el daño sin exigir respuesta inmediata?",
      opciones: [
        {
          id: "M3_A",
          texto_visible: "‘Perdón por hacer el sticker con tu foto. Entiendo si no quieres contestar ahora. Voy a pedir que deje de circular.’",
          puntos: 4,
          feedback_cuida: "Cuida la disculpa sin peros, valida los tiempos de la víctima y asume un compromiso activo de contención.",
          feedback_pendiente: "Falta que el grupo en su conjunto respalde este compromiso preventivo.",
          feedback_reflexion: "¿Por qué condicionar la disculpa a obtener un 'está bien' inmediato reduce su honestidad?",
          dimension: 'reconocer'
        },
        {
          id: "M3_B",
          texto_visible: "‘Disculpa por el sticker, era jugando y no pensé que te enojaras. Dime qué puedo hacer para que ya estés bien.’",
          puntos: 2,
          feedback_cuida: "Cuida la intención de querer arreglar la situación directamente.",
          feedback_pendiente: "Deja pendiente asumir la agresión de frente al llamarla 'juego' y responsabiliza a la víctima por 'enojarse'.",
          feedback_reflexion: "¿Cómo se siente recibir una disculpa que minimiza el acto llamándolo 'una simple broma'?",
          dimension: 'reconocer'
        },
        {
          id: "M3_C",
          texto_visible: "‘Leo ya borró el sticker y todos lo sentimos. Por favor contesta para saber que ya estamos en paz y que mañana vas a ir a clase.’",
          puntos: 1,
          feedback_cuida: "Cuida la comunicación de que la imagen original se eliminó y muestra preocupación por su escolaridad.",
          feedback_pendiente: "Ejerce presión indebida para obtener respuesta rápida, priorizando la tranquilidad del grupo sobre el proceso del afectado.",
          feedback_reflexion: "¿A quién beneficia realmente una disculpa apresurada: al que dañó o al que fue dañado?",
          dimension: 'reconocer'
        },
        {
          id: "M3_D",
          texto_visible: "‘Dani, lamento mucho haber compartido esa foto. Sé que estuvo mal y que se salió de control. Respeto si necesitas tu espacio y no me contestas.’",
          puntos: 3,
          feedback_cuida: "Cuida la empatía profunda, asume la responsabilidad del descontrol y respeta el silencio.",
          feedback_pendiente: "No hace referencia a qué acciones concretas está tomando el emisor para frenar la propagación actual.",
          feedback_reflexion: "¿De qué forma las palabras de disculpa ganan peso cuando van acompañadas de un plan de acción?",
          dimension: 'reconocer'
        }
      ]
    },
    {
      id: "M4",
      orden: 4,
      momento: "Momento 4 · Ayudar sin reexponer",
      intencion: "Apoyar sin volver a mostrar el contenido",
      contexto: "Majo quiere intervenir activamente en el chat privado de Dani para mostrarle su apoyo y preguntarle cómo se siente, pero teme meter la pata.",
      chat: [
        { from: "other", name: "Majo", text: "Quiero escribirle a Dani, pero no quiero que sienta que le tengo lástima o que lo presiono.", time: "16:00" },
        { from: "other", name: "Leo", text: "Pues no le digan nada, si le siguen moviendo solo se va a acordar más.", time: "16:02" }
      ],
      evidencias_neutrales: [
        "El silencio grupal puede interpretarse como complicidad o desinterés.",
        "Defender públicamente en el chat a veces reinicia la pelea y la exposición.",
        "El apoyo privado e individual resguarda la confidencialidad."
      ],
      pregunta: "Majo quiere ayudar. ¿Qué puede hacer sin aumentar la exposición?",
      pregunta_reflexion: "¿Cuál es la diferencia entre defender a alguien y volver a exponerlo?",
      opciones: [
        {
          id: "M4_A",
          texto_visible: "Pedir que no se comparta más, escribirle a Dani en privado para ofrecer apoyo y sugerir hablar con tutoría si sigue circulando.",
          puntos: 4,
          feedback_cuida: "Cuida el trato digno y privado, frena la burla de forma firme y propone canales de contención institucionales.",
          feedback_pendiente: "Queda pendiente concretar la mediación escolar y los acuerdos formales del grupo.",
          feedback_reflexion: "¿Por qué un mensaje privado sincero suele dar más seguridad que una defensa ruidosa en el chat grupal?",
          dimension: 'acompanar'
        },
        {
          id: "M4_B",
          texto_visible: "Mandar captura del sticker al chat del grupo para exigirle a Leo que él mismo solucione la cadena de reenvíos.",
          puntos: 2,
          feedback_cuida: "Cuida la exigencia de responsabilidad directa al autor de la falta.",
          feedback_pendiente: "Vuelve a publicar la imagen ofensiva (reexposición), obligando a todos a ver de nuevo la burla.",
          feedback_reflexion: "¿Es coherente combatir la difusión de un contenido ofensivo volviéndolo a publicar en el chat?",
          dimension: 'acompanar'
        },
        {
          id: "M4_C",
          texto_visible: "Publicar un mensaje largo en el chat escolar defendiendo a Dani y explicando detalladamente por qué el sticker es ofensivo.",
          puntos: 1,
          feedback_cuida: "Cuida el posicionamiento ético público y el rechazo a la violencia digital.",
          feedback_pendiente: "Convierte el incidente en un debate público y duradero, manteniendo el nombre de Dani asociado al conflicto.",
          feedback_reflexion: "¿Cuándo nuestro deseo de educar en público termina exponiendo de más a quien queríamos proteger?",
          dimension: 'acompanar'
        },
        {
          id: "M4_D",
          texto_visible: "Preguntar discretamente en el chat quién tiene los reenvíos activos para contactarlos uno a uno y pedirles borrar el contenido.",
          puntos: 3,
          feedback_cuida: "Cuida la cadena de contención al rastrear los focos de retransmisión.",
          feedback_pendiente: "Al preguntar en el chat grupal quién tiene la imagen, puede despertar la curiosidad de otros para conseguir el archivo.",
          feedback_reflexion: "¿Cómo puede la búsqueda pública de evidencia incentivar el tráfico informal del material?",
          dimension: 'acompanar'
        }
      ]
    },
    {
      id: "M5",
      orden: 5,
      momento: "Momento 5 · Pedir apoyo con orden",
      intencion: "Canalizar sin convertirlo en espectáculo",
      contexto: "El docente tutor nota tensión en el salón y pregunta qué ocurre. El grupo decide hablar con él para resolver el tema de raíz.",
      chat: [
        { from: "other", name: "Docente Tutor", text: "Jóvenes, noto al grupo distraído y Dani no ha venido. ¿Ocurre algo?", time: "09:00" },
        { from: "other", name: "Majo", text: "Tenemos que decirle, pero hay que hacerlo bien.", time: "09:02" }
      ],
      evidencias_neutrales: [
        "La intervención de adultos de confianza es clave si el ciberacoso persiste.",
        "Los reportes desordenados pueden interpretarse como chismes o quejas individuales.",
        "Se requiere un enfoque de solución y no solo de señalamiento."
      ],
      pregunta: "Si el tutor interviene, ¿qué debe llevar el grupo para avanzar?",
      pregunta_reflexion: "¿Qué información ayuda a resolver sin volver la reunión una ronda de acusaciones?",
      opciones: [
        {
          id: "M5_A",
          texto_visible: "Explicar qué se compartió, dónde pudo circular, qué ya se intentó detener, qué necesita Dani y qué acuerdo propone el grupo.",
          puntos: 4,
          feedback_cuida: "Cuida la objetividad de los hechos, reporta de manera estructurada los esfuerzos y prioriza la voz y necesidades del afectado.",
          feedback_pendiente: "Falta implementar el plan de reparación formal y dar seguimiento a los infractores.",
          feedback_reflexion: "¿Cómo ayuda centrarse en hechos y soluciones a que las autoridades escolares actúen rápido?",
          dimension: 'acompanar'
        },
        {
          id: "M5_B",
          texto_visible: "Llevar capturas de pantalla de todos los que se rieron o hicieron comentarios ofensivos para que los expulsen de la escuela.",
          puntos: 2,
          feedback_cuida: "Cuida la visibilidad sobre la complicidad grupal en la agresión.",
          feedback_pendiente: "Fomenta una lógica puramente punitiva (castigo masivo) sin solucionar la circulación del sticker ni sanar el aula.",
          feedback_reflexion: "¿Las sanciones masivas y el miedo al castigo construyen empatía real en el grupo?",
          dimension: 'acompanar'
        },
        {
          id: "M5_C",
          texto_visible: "Pedirle a Dani que asista a la reunión para que explique frente al tutor y el grupo completo cómo le afectó el sticker.",
          puntos: 1,
          feedback_cuida: "Cuida el principio de que la víctima debe ser escuchada directamente.",
          feedback_pendiente: "Somete a Dani a una revictimización severa al obligarle a revivir la humillación ante quienes la causaron.",
          feedback_reflexion: "¿Por qué es inadecuado exigirle a la persona vulnerada que exponga su dolor en público para avanzar?",
          dimension: 'acompanar'
        },
        {
          id: "M5_D",
          texto_visible: "Entregar un reporte escrito con el sticker impreso, el nombre del creador (Leo) y una declaración grupal exigiendo una disculpa obligatoria en público.",
          puntos: 3,
          feedback_cuida: "Cuida la documentación formal del caso y señala al autor principal.",
          feedback_pendiente: "El sticker impreso perpetúa la burla en papel; obligar a una disculpa pública puede generar resentimiento en vez de cambio.",
          feedback_reflexion: "¿Las disculpas obligatorias de rodillas restauran relaciones o solo cierran el caso en apariencia?",
          dimension: 'acompanar'
        }
      ]
    },
    {
      id: "M6",
      orden: 6,
      momento: "Momento 6 · Acordar no repetir",
      intencion: "Prevenir sin prohibiciones absurdas",
      contexto: "El grupo se reúne a diseñar las pautas de convivencia del chat de WhatsApp escolar para evitar incidentes similares en el futuro.",
      chat: [
        { from: "other", name: "Majo", text: "Bueno, ya pasó esto. ¿Cómo nos aseguramos de que no vuelva a suceder en el grupo?", time: "13:45" },
        { from: "other", name: "Compañero 4", text: "Hay que poner una regla clara en la descripción del chat.", time: "13:47" }
      ],
      evidencias_neutrales: [
        "Las normas preventivas deben ser realistas para que se cumplan.",
        "La autorregulación grupal es más efectiva que la censura externa.",
        "El consentimiento es la base de todo contenido compartido."
      ],
      pregunta: "Para que no se repita, ¿qué acuerdo es más útil para el chat del grupo?",
      pregunta_reflexion: "¿Qué acuerdo breve se puede recordar antes de convertir una foto, audio o error en burla?",
      opciones: [
        {
          id: "M6_A",
          texto_visible: "No usar fotos, audios o errores de compañeros para stickers, memes o reenvíos sin permiso; si pasa, detener y pedir apoyo.",
          puntos: 4,
          feedback_cuida: "Cuida la prevención, promueve activamente la cultura del consentimiento y traza un camino de acción solidario.",
          feedback_pendiente: "Falta el compromiso diario y la constancia de cada miembro del grupo para sostener la regla.",
          feedback_reflexion: "¿Por qué centrar los acuerdos en el consentimiento evita la creación de burlas disfrazadas de bromas?",
          dimension: 'prevenir'
        },
        {
          id: "M6_B",
          texto_visible: "Prohibir el uso de stickers, memes y emojis en el chat del grupo, permitiendo únicamente mensajes de texto escolares.",
          puntos: 2,
          feedback_cuida: "Cuida la eliminación radical de los formatos donde suelen ocurrir estas burlas.",
          feedback_pendiente: "Es una norma excesivamente restrictiva y poco realista que los estudiantes terminarán eludiendo en chats alternos.",
          feedback_reflexion: "¿Las prohibiciones totales educan en el respeto o solo ocultan los comportamientos dañinos?",
          dimension: 'prevenir'
        },
        {
          id: "M6_C",
          texto_visible: "Nombrar a un administrador del chat encargado de revisar y borrar de inmediato cualquier mensaje que considere inadecuado o sospechoso.",
          puntos: 1,
          feedback_cuida: "Cuida la moderación del chat mediante la asignación de un rol de control.",
          feedback_pendiente: "Carga la responsabilidad en una sola persona, deslindando al resto de su propia autorregulación y empatía.",
          feedback_reflexion: "¿Depender de un vigilante nos ayuda a ser ciudadanos digitales responsables de nuestros propios clics?",
          dimension: 'prevenir'
        },
        {
          id: "M6_D",
          texto_visible: "Establecer que si alguien sube un contenido ofensivo, se le expulsará del chat de forma definitiva y se le reportará con la dirección escolar.",
          puntos: 3,
          feedback_cuida: "Cuida el establecimiento de consecuencias firmes y directas ante la transgresión.",
          feedback_pendiente: "Actúa de manera punitiva *después* de que el daño ya ocurrió, sin ofrecer herramientas previas para la reflexión.",
          feedback_reflexion: "¿La amenaza de expulsión promueve el entendimiento mutuo o solo enseña a cuidarse de ser atrapado?",
          dimension: 'prevenir'
        }
      ]
    }
  ]
};
