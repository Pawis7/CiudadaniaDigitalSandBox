export interface ViralChoice {
  text: string;
  sentText?: string;
  level: 'best' | 'good' | 'partial' | 'risk' | 'danger';
  points: number;
  dims: {
    freno: number;
    apoyo: number;
    evidencia: number;
    criterio: number;
  };
  fb: string;
  plus: string;
  watch: string;
  real: string;
}

export interface ViralChatMessage {
  from: string;
  name: string;
  role: string;
  letter: string;
  avatarClass: string;
  text: string;
  time?: string;
  clipTitle?: string; // stores title for clips, post cards, or rules
  isVoice?: boolean;
  isClip?: boolean;
  isRule?: boolean;
  isPost?: boolean;
  isSystem?: boolean;
  isMe?: boolean;
}

export interface ViralMission {
  id: string;
  channel: string;
  title: string;
  focus: string;
  signal_locked: string;
  signal_revealed: string;
  question: string;
  scene_summary: string;
  feed: ViralChatMessage[];
  choices: ViralChoice[];
}

export interface ViralData {
  metadata: {
    id: string;
    product_title: string;
    subtitulo: string;
    version: string;
  };
  missions: ViralMission[];
  results: {
    min: number;
    max: number;
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const NO_LO_HAGAS_VIRAL_DATA: ViralData = {
  metadata: {
    id: "CDJ-GAME-P04",
    product_title: "No lo hagas viral",
    subtitulo: "Cuando un clip de juego se convierte en exposición, burla y presión del grupo",
    version: "v1.0"
  },
  missions: [
    {
      id: "M1",
      channel: "feed-clips",
      title: "Aparece el clip",
      focus: "El contenido empieza a exponer a una persona",
      signal_locked: "Señal 1 bloqueada",
      signal_revealed: "El contenido empieza a exponer a una persona",
      question: "Suben un clip de una mala jugada y el feed empieza a reaccionar. ¿Qué haces?",
      scene_summary: "Suben un clip de una mala jugada de Ari. Algunos en el servidor quieren mandarlo a otros grupos.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Nuevo clip publicado · feed del servidor", isSystem: true },
        { from: "other", name: "ClipBot", role: "bot", letter: "C", avatarClass: "av-gray", text: "Error de Ari en minuto 08:22 · 18 reacciones", clipTitle: "Fail in ranked", isClip: true },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Nooo, esto va directo al grupo del salón 😂", time: "18:02" },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "Ey, fue una partida. No lo muevan tanto.", time: "18:02" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo el clip y los comentarios.", time: "18:03", isMe: true }
      ],
      choices: [
        {
          text: "Pedir que no lo muevan y preguntar si Ari quiere que se baje.",
          sentText: "“Ey, no lo muevan. ¿Ari está de acuerdo con que se quede subido?”",
          level: "best",
          points: 4,
          dims: { freno: 2, apoyo: 1, evidencia: 0, criterio: 1 },
          fb: "Frenaste la circulación y tomaste en cuenta a quien aparece en el clip.",
          plus: "No decidiste por Ari ni lo hiciste más grande.",
          watch: "Si el clip sigue, hará falta ruta de reporte.",
          real: "Una frase corta puede cambiar la norma del feed: “no lo movamos más”."
        },
        {
          text: "No comentar nada y esperar que se calme.",
          sentText: "“...”",
          level: "partial",
          points: 2,
          dims: { freno: 1, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "No alimentaste la burla, pero tampoco ayudaste a frenarla.",
          plus: "No amplificaste el contenido.",
          watch: "A veces el silencio deja que el feed decida por todos.",
          real: "Si el contenido expone a alguien, una intervención breve puede ayudar más que esperar."
        },
        {
          text: "Reaccionar con risa y seguir el ambiente.",
          sentText: "“😂”",
          level: "risk",
          points: 1,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 0 },
          fb: "Te sumaste a la ola aunque parezca algo menor.",
          plus: "No fuiste quien subió el clip.",
          watch: "Las reacciones también empujan la difusión.",
          real: "No todo apoyo al daño es comentario: a veces basta un like o una risa."
        },
        {
          text: "Compartirlo en otro grupo para que vean cómo se burlan.",
          sentText: "“Miren este clip, se están burlando bien feo en el server.”",
          level: "danger",
          points: 0,
          dims: { freno: 0, apoyo: 0, evidencia: 1, criterio: 0 },
          fb: "La intención puede ser denunciar, pero el daño se expande.",
          plus: "Quisiste mostrar lo que ocurría.",
          watch: "Mover el clip hace crecer la exposición.",
          real: "Denunciar no es viralizar. Evidencia útil no necesita público extra."
        }
      ]
    },
    {
      id: "M2",
      channel: "comentarios",
      title: "El tono cambia",
      focus: "Los comentarios pasan de juego a ataque personal",
      signal_locked: "Señal 2 bloqueada",
      signal_revealed: "Los comentarios pasan de juego a ataque personal",
      question: "El hilo deja de hablar de la jugada y empieza a atacar a Ari. ¿Cómo respondes?",
      scene_summary: "El hilo de comentarios escala de lo deportivo a burlas personales hacia Ari. Se publica un meme con su captura.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Hilo de comentarios · 32 respuestas", isSystem: true },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-cyan", text: "El clip sí está gracioso, pero ya se están pasando.", time: "18:04" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Que no juegue ranked si no aguanta memes.", time: "18:04" },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "Bájenle. Era solo una jugada.", time: "18:05" },
        { from: "other", name: "Feed", role: "repost", letter: "F", avatarClass: "av-pink", text: "Captura del clip con texto encima · 9 compartidos", clipTitle: "Meme repost", isPost: true }
      ],
      choices: [
        {
          text: "Escribir: “una cosa es comentar la jugada; otra, atacar a la persona”.",
          sentText: "“Una cosa es comentar la jugada; otra, atacar a la persona.”",
          level: "best",
          points: 4,
          dims: { freno: 1, apoyo: 1, evidencia: 0, criterio: 2 },
          fb: "Separaste crítica de juego y ataque personal.",
          plus: "El límite es claro y fácil de entender.",
          watch: "Si siguen los reposts, no basta el comentario.",
          real: "Nombrar el límite ayuda: jugada sí, humillación no."
        },
        {
          text: "Mandar DM a Ari: “no les hagas caso, bloquéalos y ya”.",
          sentText: "“Hola Ari, no les hagas caso, bloquéalos y ya (DM).”",
          level: "partial",
          points: 2,
          dims: { freno: 0, apoyo: 1, evidencia: 0, criterio: 1 },
          fb: "Puede sentirse como apoyo, pero deja intacta la dinámica pública.",
          plus: "Te acercaste a la persona afectada.",
          watch: "La carga vuelve a quedar en Ari.",
          real: "Apoyo privado + límite público suele funcionar mejor."
        },
        {
          text: "Responder con otro meme menos pesado para cambiar el ambiente.",
          sentText: "“Mejor miren este otro meme del juego.”",
          level: "risk",
          points: 1,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "Puede parecer salida creativa, pero mantiene a Ari como contenido.",
          plus: "Intentaste bajar intensidad.",
          watch: "El centro sigue siendo la burla.",
          real: "Cambiar el tono sirve solo si también corta la exposición."
        },
        {
          text: "Responder agresivo a quienes comentan para que se callen.",
          sentText: "“¡Cállense! Son unos tóxicos y no saben jugar.”",
          level: "risk",
          points: 1,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 0 },
          fb: "Puedes escalar la pelea y desviar el foco.",
          plus: "No querías dejar pasar el ataque.",
          watch: "El hilo puede volverse una guerra donde Ari queda todavía más expuesta.",
          real: "Firme no es lo mismo que explosivo."
        }
      ]
    },
    {
      id: "M3",
      channel: "grupo-externo",
      title: "Quieren sacarlo del servidor",
      focus: "La difusión sale del contexto original",
      signal_locked: "Señal 3 bloqueada",
      signal_revealed: "La difusión sale del contexto original",
      question: "Alguien propone llevar el clip a otro grupo. ¿Qué ruta eliges?",
      scene_summary: "Kron propone enviar el clip al chat general de la escuela para aumentar la burla. Lía se opone.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Nuevo mensaje · canal #grupo-externo", isSystem: true },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Pásenlo al chat de la escuela. Ahí sí se va a hacer bueno.", time: "18:06" },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-cyan", text: "No sé, ya no tiene que ver con la partida.", time: "18:06" },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "Neta no lo pasen.", time: "18:07" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "El clip todavía está en el servidor.", time: "18:07", isMe: true }
      ],
      choices: [
        {
          text: "Decir que no se comparta fuera y pedir que se borre el repost.",
          sentText: "“No compartan esto fuera del servidor, y borremos el repost. No hay que pasarlo más.”",
          level: "best",
          points: 4,
          dims: { freno: 2, apoyo: 1, evidencia: 0, criterio: 1 },
          fb: "Cortaste el salto a otro espacio y protegiste mejor el contexto.",
          plus: "Frenaste la expansión del daño.",
          watch: "Conviene pedir apoyo a moderación si no hacen caso.",
          real: "El momento clave es antes de que salga del primer canal."
        },
        {
          text: "Pasarlo solo a una persona de confianza para pedir opinión.",
          sentText: "“Mira lo que andan compartiendo (DM). ¿Crees que deba reportar?”",
          level: "partial",
          points: 2,
          dims: { freno: 0, apoyo: 0, evidencia: 1, criterio: 1 },
          fb: "Buscar opinión puede ayudar, pero el clip ya sale de su contexto.",
          plus: "No lo mandaste a un grupo grande.",
          watch: "Aunque sea una persona, ya ampliaste la exposición.",
          real: "Describe la situación sin reenviar el material cuando puedas."
        },
        {
          text: "No meterte porque Ari ya dijo que no lo pasen.",
          sentText: "“...”",
          level: "partial",
          points: 2,
          dims: { freno: 1, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "No lo compartiste, pero dejaste sola la petición de Ari.",
          plus: "No amplificaste el clip.",
          watch: "Cuando alguien ya pidió que no lo muevan, el grupo necesita respaldar ese límite.",
          real: "Acompañar puede ser tan simple como reforzar: “sí, no lo pasen”."
        },
        {
          text: "Compartirlo con texto de advertencia: “no se burlen”.",
          sentText: "“Reenvío esto pero para pedirles que no se burlen.”",
          level: "danger",
          points: 0,
          dims: { freno: 0, apoyo: 0, evidencia: 1, criterio: 0 },
          fb: "El texto no cancela la exposición.",
          plus: "Intentaste controlar la lectura.",
          watch: "Una vez fuera, ya no controlas cómo circula.",
          real: "La mejor advertencia suele ser no reenviar."
        }
      ]
    },
    {
      id: "M4",
      channel: "dm-apoyo",
      title: "La persona afectada escribe",
      focus: "Apoyo sin convertirte en protagonista",
      signal_locked: "Señal 4 bloqueada",
      signal_revealed: "Apoyo sin convertirte en protagonista",
      question: "Ari te escribe por DM. ¿Qué respuesta ayuda más?",
      scene_summary: "Ari te contacta directamente por mensaje privado. Te expresa su frustración y te dice que no quiere drama público pero sí frenar la difusión.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "DM recibido · Ari", isSystem: true },
        { from: "other", name: "Ari", role: "jugador/a", letter: "A", avatarClass: "av-pink", text: "Me dio coraje. Ni fue para tanto la jugada.", time: "18:08" },
        { from: "other", name: "Ari", role: "jugador/a", letter: "A", avatarClass: "av-pink", text: "No quiero que lo sigan pasando, pero tampoco quiero más drama.", time: "18:09" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Te leo.", time: "18:09", isMe: true }
      ],
      choices: [
        {
          text: "“Dime si quieres que te acompañe a pedir que lo bajen o reportarlo”.",
          sentText: "“Lamento lo que pasa, Ari. Dime si quieres que te acompañe a pedir que bajen el clip o si lo reportamos.”",
          level: "best",
          points: 4,
          dims: { freno: 1, apoyo: 2, evidencia: 0, criterio: 1 },
          fb: "Ofreces apoyo concreto sin decidir por Ari.",
          plus: "Das opciones y respetas su ritmo.",
          watch: "Si hay amenazas, sí conviene escalar a apoyo adulto/institucional.",
          real: "Acompañar no es tomar el volante: es dar respaldo y opciones."
        },
        {
          text: "“Salte del servidor y ya”.",
          sentText: "“Mejor salte del servidor y ya no veas el chat.”",
          level: "partial",
          points: 2,
          dims: { freno: 1, apoyo: 1, evidencia: 0, criterio: 0 },
          fb: "Salir puede cuidar en el momento, pero no debería ser la única salida.",
          plus: "Pensaste en cortar exposición.",
          watch: "Si siempre se va quien recibe el daño, la comunidad no cambia.",
          real: "Salir, reportar y pedir que bajen contenido son opciones distintas."
        },
        {
          text: "“Yo voy a exhibir a todos para que aprendan”.",
          sentText: "“No te preocupes, yo los voy a quemar en público para que les dé pena.”",
          level: "risk",
          points: 1,
          dims: { freno: 0, apoyo: 1, evidencia: 0, criterio: 0 },
          fb: "Puedes terminar haciendo más grande lo que Ari no quiere agrandar.",
          plus: "Te importó defender.",
          watch: "El protagonismo puede aumentar la exposición.",
          real: "Antes de actuar por alguien, pregunta qué necesita."
        },
        {
          text: "“Mejor ignóralos. En internet todo pasa rápido”.",
          sentText: "“Mejor ignóralos. En internet todo pasa rápido y se les olvidará pronto.”",
          level: "danger",
          points: 0,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 0 },
          fb: "Minimizas el problema y cortas la posibilidad de apoyo.",
          plus: "Quizá querías calmar.",
          watch: "Ignorar no borra capturas, reposts ni comentarios.",
          real: "Validar no es exagerar: “sí estuvo mal, vemos qué opción tienes”."
        }
      ]
    },
    {
      id: "M5",
      channel: "moderacion",
      title: "Reporte del clip",
      focus: "Evidencia mínima sin reexponer",
      signal_locked: "Señal 5 bloqueada",
      signal_revealed: "Evidencia mínima sin reexponer",
      question: "Van a pedir moderación. ¿Qué preparas?",
      scene_summary: "El canal de moderación solicita detalles de lo ocurrido. El moderador pide que no se manden capturas repetidas en canales generales.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #moderacion · solicitud abierta", isSystem: true },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "¿Qué pasó exactamente? No manden spam de capturas.", time: "18:10" },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "Necesitamos explicar sin llenar el canal de reposts.", time: "18:10" },
        { from: "other", name: "ClipBot", role: "bot", letter: "C", avatarClass: "av-gray", text: "Disponible en el servidor · comentarios activos", clipTitle: "Clip original", isClip: true },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Podemos ordenar la información.", time: "18:11", isMe: true }
      ],
      choices: [
        {
          text: "Enviar resumen breve, enlace al clip original y ejemplos mínimos de comentarios.",
          sentText: "“Hice un reporte: un resumen, enlace al clip y ejemplos breves de las capturas del hilo de burlas (enviado por ticket privado).”",
          level: "best",
          points: 4,
          dims: { freno: 1, apoyo: 1, evidencia: 2, criterio: 1 },
          fb: "Hiciste un reporte de moderación estructurado y útil.",
          plus: "Ordenaste contexto, evidencia y solicitud.",
          watch: "Asegura que Ari esté de acuerdo cuando el reporte la involucra.",
          real: "Un reporte útil responde: qué pasó, dónde, quién lo mueve y qué se pide."
        },
        {
          text: "Borrar todo y no dejar evidencia para que se acabe rápido.",
          sentText: "“Pidamos que borren el hilo entero ya, sin mandar nada más.”",
          level: "partial",
          points: 2,
          dims: { freno: 1, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "Cortar difusión ayuda, pero puede dificultar actuar si el patrón sigue.",
          plus: "Quieres frenar el daño.",
          watch: "Sin evidencia mínima, moderar se vuelve más difícil.",
          real: "No se trata de guardar todo: se trata de guardar lo necesario."
        },
        {
          text: "Armar una encuesta pública para decidir si fue grave.",
          sentText: "“Hagamos una encuesta en el canal general para ver si la mayoría cree que el meme es ofensivo.”",
          level: "risk",
          points: 1,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "Votar sobre la incomodidad de alguien puede revictimizar.",
          plus: "Buscabas criterio comunitario.",
          watch: "La seguridad no debería depender de popularidad.",
          real: "Los reportes sensibles no son concurso de opiniones."
        },
        {
          text: "Mandar todas las capturas al canal público para que se entienda.",
          sentText: "“Voy a subir todas las 15 capturas de comentarios al canal general para que vean bien.”",
          level: "danger",
          points: 0,
          dims: { freno: 0, apoyo: 0, evidencia: 1, criterio: 0 },
          fb: "Demasiada evidencia en público puede reexponer.",
          plus: "Quisiste documentar bien.",
          watch: "Más material público también puede alimentar el problema.",
          real: "Evidencia suficiente, canal correcto y poca exposición."
        }
      ]
    },
    {
      id: "M6",
      channel: "reglas-feed",
      title: "Nueva regla de clips",
      focus: "Norma concreta para clips y reposts",
      signal_locked: "Señal 6 bloqueada",
      signal_revealed: "Norma concreta para clips y reposts",
      question: "El servidor quiere dejar una regla. ¿Cuál funciona mejor?",
      scene_summary: "El moderador abre el borrador de reglas para evitar casos similares de burlas a partir de clips en el futuro.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #reglas-feed · edición abierta", isSystem: true },
        { from: "other", name: "Borrador A", role: "regla", letter: "R", avatarClass: "av-cyan", text: "“Sean buena onda. No hagan drama con los clips.”", clipTitle: "Borrador A", isRule: true },
        { from: "other", name: "Borrador B", role: "regla", letter: "R", avatarClass: "av-cyan", text: "“No repostear clips para humillar. Si un clip incomoda a quien aparece, se pausa difusión, se revisa contexto y se reporta sin viralizar.”", clipTitle: "Borrador B", isRule: true },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "Necesitamos una regla que se pueda aplicar.", time: "18:12" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "La regla debería prevenir, no solo reaccionar.", time: "18:13", isMe: true }
      ],
      choices: [
        {
          text: "Elegir el Borrador B y agregar canal de reporte visible.",
          sentText: "“Propongo el Borrador B. Es más claro y define cómo pausar, revisar y reportar.”",
          level: "best",
          points: 4,
          dims: { freno: 2, apoyo: 1, evidencia: 1, criterio: 1 },
          fb: "La regla dice qué evitar, qué hacer y por dónde actuar.",
          plus: "Conectas prevención y moderación.",
          watch: "Toda regla necesita aplicación consistente.",
          real: "Una regla útil no es larga: es concreta y accionable."
        },
        {
          text: "Elegir el Borrador A porque suena menos intenso.",
          sentText: "“Opino que el Borrador A. Es simple y suena más tranquilo.”",
          level: "partial",
          points: 2,
          dims: { freno: 1, apoyo: 0, evidencia: 0, criterio: 1 },
          fb: "Suena amable, pero deja lo importante abierto.",
          plus: "Buscaste una regla simple.",
          watch: "“No hagan drama” puede silenciar a quien pide ayuda.",
          real: "Lo simple funciona si no borra el problema."
        },
        {
          text: "Prohibir todos los clips para evitar problemas.",
          sentText: "“Mejor prohibamos subir clips en todo el servidor, así evitamos problemas.”",
          level: "risk",
          points: 1,
          dims: { freno: 1, apoyo: 0, evidencia: 0, criterio: 0 },
          fb: "Evita algunos riesgos, pero puede ser una respuesta desproporcionada.",
          plus: "Quieres prevenir.",
          watch: "La solución borra usos positivos del clip: aprender, compartir logros, reportar bugs.",
          real: "Mejor regular daño que prohibir toda práctica útil."
        },
        {
          text: "No poner reglas: cada quien decide qué subir.",
          sentText: "“No pongamos reglas. Cada quien es libre de subir y ver lo que quiera.”",
          level: "danger",
          points: 0,
          dims: { freno: 0, apoyo: 0, evidencia: 0, criterio: 0 },
          fb: "Eso deja la exposición sin límite comunitario.",
          plus: "Valoras libertad individual.",
          watch: "Una comunidad sin límites premia al contenido más ruidoso.",
          real: "Libertad digital no significa permiso para usar a otros como material."
        }
      ]
    }
  ],
  results: [
    {
      min: 21,
      max: 24,
      title: "Cortaste la cadena",
      desc: "Frenaste la difusión, apoyaste sin protagonismo y usaste evidencia sin convertirla en espectáculo. ¡Excelente criterio para proteger a otros!",
      icon: "🛑"
    },
    {
      min: 15,
      max: 20,
      title: "Freno parcial",
      desc: "Tomaste varias rutas cuidadosas, aunque a veces el clip siguió circulando o faltó una acción más clara en público.",
      icon: "🧭"
    },
    {
      min: 9,
      max: 14,
      title: "El feed te arrastró",
      desc: "Notaste parte del problema, pero varias decisiones dejaron que el contenido siguiera ganando público o no frenaron la burla.",
      icon: "👀"
    },
    {
      min: 0,
      max: 8,
      title: "La viralidad decidió",
      desc: "El impulso del feed pesó más que el criterio. Recuerda: no reenviar, apoyar, guardar evidencia mínima y reportar por canales seguros.",
      icon: "⚠️"
    }
  ]
};
