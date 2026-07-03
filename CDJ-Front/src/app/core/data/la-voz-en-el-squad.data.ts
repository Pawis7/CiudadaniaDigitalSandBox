export interface SquadChoice {
  text: string;
  sentText?: string; // actual text printed in the chat bubble when selected
  level: 'best' | 'good' | 'partial' | 'risk' | 'danger';
  points: number;
  dims: {
    convivencia: number;
    limites: number;
    apoyo: number;
    evidencia: number;
  };
  fb: string;
  plus: string;
  watch: string;
  real: string;
}

export interface SquadChatMessage {
  from: string;
  name: string;
  role: string;
  letter: string;
  avatarClass: string;
  text: string;
  time?: string;
  isVoice?: boolean;
  isClip?: boolean;
  isRule?: boolean;
  isSystem?: boolean;
  isMe?: boolean;
}

export interface SquadMission {
  id: string;
  channel: string;
  title: string;
  focus: string;
  signal_locked: string;
  signal_revealed: string;
  question: string;
  scene_summary: string;
  feed: SquadChatMessage[];
  choices: SquadChoice[];
}

export interface SquadData {
  metadata: {
    id: string;
    product_title: string;
    subtitulo: string;
    version: string;
  };
  missions: SquadMission[];
  results: {
    min: number;
    max: number;
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const LA_VOZ_EN_EL_SQUAD_DATA: SquadData = {
  metadata: {
    id: "CDJ-GAME-P03",
    product_title: "La voz en el squad",
    subtitulo: "Cuando el chat de voz deja de ser juego",
    version: "v1.0"
  },
  missions: [
    {
      id: "M1",
      channel: "lobby-squad",
      title: "Entra una nueva jugadora",
      focus: "Gatekeeping y duda dirigida a la habilidad por identidad",
      signal_locked: "Señal 1 bloqueada",
      signal_revealed: "Duda dirigida a la habilidad por identidad",
      question: "Entra una nueva jugadora al squad. ¿Qué haces primero?",
      scene_summary: "Una jugadora llamada Lía entra al equipo. Un integrante pone en duda si realmente sabe jugar o si viene a que la carguen.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Partida rápida · lobby abierto", isSystem: true },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "Tenemos una más para ranked. Entra Lía.", time: "18:02" },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "Hola, juego soporte o flex. ¿Qué necesitan?", time: "18:02" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "¿Sí rankeas o vienes a que te carreen?", time: "18:03" },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-cyan", text: "Jajaja tranqui, apenas entró.", time: "18:03" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Estoy viendo cómo se arma el equipo.", time: "18:04", isMe: true }
      ],
      choices: [
        {
          text: "Dejarlo pasar para no empezar con tensión.",
          sentText: "“...”",
          level: "partial",
          points: 2,
          dims: { convivencia: 1, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Evitaste escalar, pero el comentario queda como algo normal dentro del grupo.",
          plus: "No incendiaste el canal.",
          watch: "El silencio puede hacer que el ambiente se cierre para quien acaba de llegar.",
          real: "Puedes marcar tono sin hacer sermón: “juguemos y vemos cómo se acomoda el squad”."
        },
        {
          text: "Responder: “Primero juguemos; aquí no se mide a nadie por voz o perfil”.",
          sentText: "“Primero juguemos; aquí no se mide a nadie por voz o perfil.”",
          level: "best",
          points: 4,
          dims: { convivencia: 2, limites: 1, apoyo: 1, evidencia: 0 },
          fb: "Pusiste un límite breve y enfocado en la dinámica del equipo.",
          plus: "Cuidaste el ambiente sin convertirlo en pleito.",
          watch: "Si el patrón sigue, conviene pasar de comentario a ruta de moderación.",
          real: "Una intervención corta funciona mejor que una discusión eterna."
        },
        {
          text: "Reírte y decir que lo demuestre en partida.",
          sentText: "“Jaja, a ver si es cierto en la partida.”",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Parece broma ligera, pero suma presión a quien acaba de entrar.",
          plus: "Intentaste mantener tono casual.",
          watch: "La carga de demostrar valor queda sobre una sola persona.",
          real: "La convivencia mejora cuando el reto es del equipo, no una prueba personal por identidad."
        },
        {
          text: "Mandarle DM a Lía para decirle que ignore todo.",
          sentText: "“Hola Lía, ignora a Kron, a veces se pone muy pesado. (DM)”",
          level: "partial",
          points: 2,
          dims: { convivencia: 0, limites: 0, apoyo: 1, evidencia: 0 },
          fb: "Puede sentirse como apoyo, pero no cambia el ambiente público.",
          plus: "Notaste que pudo incomodarla.",
          watch: "Si solo se atiende en privado, el grupo no aprende ningún límite.",
          real: "Apoyar en privado sirve más si también se cuida la norma pública."
        }
      ]
    },
    {
      id: "M2",
      channel: "voz-squad",
      title: "La conversación se mueve a voz",
      focus: "Comentarios incómodos sobre voz, género e identidad",
      signal_locked: "Señal 2 bloqueada",
      signal_revealed: "Atención incómoda sobre voz e identidad",
      question: "El equipo entra a voz y los comentarios cambian. ¿Cómo respondes?",
      scene_summary: "Al escuchar la voz de Lía aparecen comentarios sobre que es mujer, insistencia para que hable y bromas disfrazadas de curiosidad.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal de voz · 5 conectados", isSystem: true },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "No sabía que eras morra. Di algo otra vez, a ver si sí eres tú.", time: "18:06", isVoice: true },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "Ya, concéntrense en picks.", time: "18:07" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Nomás pregunto. No se ardan.", time: "18:07" },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "Podemos jugar y ya.", time: "18:08" }
      ],
      choices: [
        {
          text: "Cambiar el tema rápido: “vamos a picks, no a entrevistas”.",
          sentText: "“Ya dejen las entrevistas, concéntrense en los picks.”",
          level: "good",
          points: 3,
          dims: { convivencia: 1, limites: 1, apoyo: 1, evidencia: 0 },
          fb: "Cortaste el foco incómodo y regresaste al objetivo del canal.",
          plus: "Bajaste la presión sin señalar de más a Lía.",
          watch: "Si se repite, cambiar tema ya no basta.",
          real: "Redirigir ayuda; insistencia repetida requiere límite más claro."
        },
        {
          text: "Decir: “No hagas eso. Voz o género no son requisito para jugar”.",
          sentText: "“No hagas eso Kron. La voz o el género no son requisito para jugar.”",
          level: "best",
          points: 4,
          dims: { convivencia: 1, limites: 2, apoyo: 1, evidencia: 0 },
          fb: "Nombraste el límite sin insultar ni abrir una guerra.",
          plus: "La regla queda clara para todos.",
          watch: "Cuida no hablar encima de la persona afectada si ella pide otra cosa.",
          real: "Un límite útil es breve, específico y no humilla."
        },
        {
          text: "Pedirle a Lía que mejor apague micro para evitar problemas.",
          sentText: "“Lía, mejor apaga el mic para evitar broncas.”",
          level: "danger",
          points: 0,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Trasladaste el costo a quien recibió el comentario.",
          plus: "Querías evitar que siguiera la incomodidad.",
          watch: "La solución termina siendo que ella desaparezca del canal.",
          real: "Cuidar no es pedirle a alguien que se achique para que otros no incomoden."
        },
        {
          text: "Hacer otra broma para que se relaje el ambiente.",
          sentText: "“Jaja, bueno ya, ¿qué personajes vamos a elegir?”",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "La broma puede parecer salida fácil, pero también puede tapar el problema.",
          plus: "Intentaste bajar tensión.",
          watch: "Si nadie marca límite, la dinámica se repite.",
          real: "El humor ayuda cuando no borra el daño ni presiona más a alguien."
        }
      ]
    },
    {
      id: "M3",
      channel: "clips",
      title: "Aparece un clip del error",
      focus: "Viralización de burla y evidencia sin exposición",
      signal_locked: "Señal 3 bloqueada",
      signal_revealed: "Riesgo de viralizar una burla",
      question: "Suben un clip de una mala jugada con comentarios. ¿Qué haces?",
      scene_summary: "El grupo publica un clip donde Lía falla una jugada y varios integrantes quieren moverlo a otros grupos para burlarse.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Nuevo clip publicado en #clips", isSystem: true },
        { from: "other", name: "ClipBot", role: "bot", letter: "CB", avatarClass: "av-gray", text: "Error de Lía en minuto 07:14 · 12 reacciones", isClip: true },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-cyan", text: "Pásenlo al grupo del salón 😂", time: "18:11" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Con razón casi manqueamos.", time: "18:11" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo el clip y los comentarios.", time: "18:12", isMe: true }
      ],
      choices: [
        {
          text: "Compartirlo para que más gente vea lo mal que se portaron.",
          sentText: "“Miren cómo se pasaron de lanza con Lía en #clips, no se vale.”",
          level: "danger",
          points: 0,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 1 },
          fb: "La intención puede ser denunciar, pero el daño circula más.",
          plus: "Quisiste mostrar lo que ocurrió.",
          watch: "Mover el clip expone más a la persona.",
          real: "Evidencia no significa difusión. Guarda lo necesario sin hacerlo viral."
        },
        {
          text: "Pedir que no lo muevan, guardar evidencia mínima y reportar si sigue.",
          sentText: "“Ya no compartan ese clip en otros lados. Si hay temas de juego lo hablamos bien.”",
          level: "best",
          points: 4,
          dims: { convivencia: 1, limites: 1, apoyo: 1, evidencia: 1 },
          fb: "Frenaste circulación, cuidaste evidencia y abriste una ruta concreta.",
          plus: "Separaste evidencia de espectáculo.",
          watch: "No prometas acciones que no puedas sostener.",
          real: "La mejor evidencia es suficiente, privada y útil para reportar."
        },
        {
          text: "Comentar “no exageren” y seguir jugando.",
          sentText: "“No exageren, jueguen bien.”",
          level: "partial",
          points: 2,
          dims: { convivencia: 1, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "No te sumaste al ataque, pero faltó una acción clara.",
          plus: "No te sumaste al ataque.",
          watch: "La frase puede sonar débil si el clip sigue circulando.",
          real: "Mejor: “no lo sigan moviendo; si hay problema de juego se habla sin burla”."
        },
        {
          text: "Etiquetar a Lía para que se defienda.",
          sentText: "“@Lía diles algo jaja.”",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "La pones al centro de una conversación que quizá no quiere enfrentar ahí.",
          plus: "Querías darle oportunidad de responder.",
          watch: "Defenderse públicamente puede aumentar la exposición.",
          real: "Antes de empujar a alguien a responder, pregunta qué necesita."
        }
      ]
    },
    {
      id: "M4",
      channel: "dm-apoyo",
      title: "Conversación privada de apoyo",
      focus: "Apoyar sin invadir ni hablar por la persona afectada",
      signal_locked: "Señal 4 bloqueada",
      signal_revealed: "Apoyo sin invadir ni hablar por la persona",
      question: "Lía te manda un DM. ¿Cuál respuesta ayuda más?",
      scene_summary: "Lía expresa cansancio y duda entre salirse o reportar. El usuario debe elegir cómo acompañar sin tomar control ni minimizar.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "DM recibido · Lía", isSystem: true },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "Qué hueva. Siempre que prendo el mic pasa algo así.", time: "18:14" },
        { from: "other", name: "Lía", role: "jugadora", letter: "L", avatarClass: "av-pink", text: "No sé si salirme o reportar.", time: "18:14" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Te leo.", time: "18:15", isMe: true }
      ],
      choices: [
        {
          text: "“Yo lo arreglo. Los voy a funar en el canal general”.",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 0, apoyo: 1, evidencia: 0 },
          fb: "Quieres ayudar, pero tomas el control y puedes exponer más.",
          plus: "Te importó lo que le pasó.",
          watch: "Actuar sin preguntar puede quitarle agencia.",
          real: "Apoyo útil: preguntar qué necesita y ofrecer opciones."
        },
        {
          text: "“¿Quieres que te acompañe a reportar o prefieres que solo esté pendiente?”.",
          level: "best",
          points: 4,
          dims: { convivencia: 1, limites: 1, apoyo: 2, evidencia: 0 },
          fb: "Acompañas sin invadir y dejas la decisión en quien vivió la situación.",
          plus: "Ofreces apoyo concreto.",
          watch: "Si hay amenazas directas, conviene buscar apoyo adulto/institucional.",
          real: "Acompañar no es rescatar a la fuerza; es dar respaldo y opciones."
        },
        {
          text: "“No les hagas caso, así son todos en ranked”.",
          level: "danger",
          points: 0,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Normalizas el problemá y cierras la conversación.",
          plus: "Quizá querías que no le doliera tanto.",
          watch: "Minimizar puede hacer que la persona se quede sola.",
          real: "No hace falta exagerar para validar: “sí estuvo incómodo, ¿qué quieres hacer?”."
        },
        {
          text: "“Salte del servidor, es lo más fácil”.",
          sentText: "“Salte del servidor Lía, es lo más fácil.”",
          level: "partial",
          points: 2,
          dims: { convivencia: 0, limites: 1, apoyo: 1, evidencia: 0 },
          fb: "Puede ser una opción válida, pero no debe ser la única salida.",
          plus: "Pensaste en cortar exposición.",
          watch: "Si siempre se van quienes reciben el maltrato, el entorno no cambia.",
          real: "Salir puede ser cuidado inmediato; reportar o pedir moderación puede prevenir repetición."
        }
      ]
    },
    {
      id: "M5",
      channel: "moderacion",
      title: "El equipo decide si reporta",
      focus: "Reporte con contexto, patrón y evidencia mínima",
      signal_locked: "Señal 5 bloqueada",
      signal_revealed: "Moderación débil ante un patrón",
      question: "El moderador responde que “no fue para tanto”. ¿Qué haces?",
      scene_summary: "El moderador minimiza el caso por no ver amenaza directa. El usuario debe decidir si escala, organiza evidencia o deja el asunto como bloqueo individual.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #moderacion · reporte abierto", isSystem: true },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "Revisé rápido. No veo amenaza directa.", time: "18:17" },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "Si no les gusta, muteen y ya.", time: "18:17" },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "¿Entonces no hacemos nada?", time: "18:18" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Hay mensajes, voz y clip en el mismo hilo.", time: "18:19", isMe: true }
      ],
      choices: [
        {
          text: "Insultar al moderador para presionar una respuesta.",
          sentText: "“@ModZero qué pésimo moderador eres, es obvio que sí es acoso.”",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 1 },
          fb: "La presión puede llamar atención, pero también desvía el foco.",
          plus: "No dejaste que se cerrara el tema.",
          watch: "Si atacas al moderador, la discusión cambia de problema.",
          real: "Presionar con evidencia y solicitud clara funciona mejor que explotar."
        },
        {
          text: "Ordenar evidencia mínima: mensajes, voz transcrita, clip y pedir revisión de patrón.",
          sentText: "“ModZero, aquí está el hilo con el clip de voz y los mensajes. Claramente hay un patrón de hostigamiento.”",
          level: "best",
          points: 4,
          dims: { convivencia: 1, limites: 1, apoyo: 1, evidencia: 2 },
          fb: "Convertiste el malestar en una solicitud revisable.",
          plus: "No dependes solo de “me pareció mal”.",
          watch: "Cuida no compartir evidencia en canales donde se exponga más a Lía.",
          real: "Un reporte útil muestra patrón, contexto y acción solicitada."
        },
        {
          text: "Aceptar el cierre y dejar que cada quien bloquee a quien quiera.",
          sentText: "“Bueno, pues cada quien que lo bloquee si le molesta.”",
          level: "partial",
          points: 2,
          dims: { convivencia: 0, limites: 1, apoyo: 0, evidencia: 0 },
          fb: "Bloquear puede proteger individualmente, pero no resuelve la norma comunitaria.",
          plus: "Reconoces una herramienta disponible.",
          watch: "El servidor mantiene la misma dinámica para la siguiente persona.",
          real: "Bloquear es cuidado personal; moderar es cuidado comunitario."
        },
        {
          text: "Abrir una votación pública con el clip incluido.",
          sentText: "“¿Hacemos votación pública para banear a Kron del servidor?”",
          level: "danger",
          points: 0,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Democratizar el daño puede hacerlo más grande.",
          plus: "Buscabas que la comunidad opinara.",
          watch: "Votar sobre la incomodidad de alguien puede revictimizar.",
          real: "Los reportes sensibles no deberían convertirse en espectáculo público."
        }
      ]
    },
    {
      id: "M6",
      channel: "reglas-squad",
      title: "Nueva regla comunitaria",
      focus: "Normas claras contra hostigamiento y exposición",
      signal_locked: "Señal 6 bloqueada",
      signal_revealed: "Norma clara contra hostigamiento y exposición",
      question: "El squad quiere actualizar reglas. ¿Cuál propuesta deja mejor base?",
      scene_summary: "El servidor compara reglas vagas contra reglas específicas sobre voz, cuerpo, género, clips y reportes.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #reglas-squad · edición abierta", isSystem: true },
        { from: "other", name: "Borrador A", role: "regla", letter: "A", avatarClass: "av-gray", text: "“No sean tóxicos. Jueguen bien y no armen drama.”", isRule: true },
        { from: "other", name: "Borrador B", role: "regla", letter: "B", avatarClass: "av-gray", text: "“No comentarios sobre voz, cuerpo, género u orientación. No clips para humillar. Reportes con evidencia mínima y sin viralizar.”", isRule: true },
        { from: "other", name: "Rafa", role: "capitán", letter: "R", avatarClass: "av-gold", text: "Necesitamos algo que sí se pueda aplicar.", time: "18:22" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Propongo cerrar con una regla breve y usable.", time: "18:23", isMe: true }
      ],
      choices: [
        {
          text: "Elegir el Borrador B y sumar canal de reporte visible.",
          sentText: "“Propongo el Borrador B. Es más específico sobre género, cuerpo, voz y canal de reportes.”",
          level: "best",
          points: 4,
          dims: { convivencia: 2, limites: 1, apoyo: 1, evidencia: 1 },
          fb: "La regla es concreta, aplicable y evita dejar todo en “portarse bien”.",
          plus: "Pasaste de reacción a prevención.",
          watch: "Una regla también requiere moderación real.",
          real: "Las normas útiles dicen qué no, qué hacer y por dónde reportar."
        },
        {
          text: "Elegir el Borrador A porque suena menos intenso.",
          sentText: "“Voto por el Borrador A, suena más simple y directo.”",
          level: "partial",
          points: 2,
          dims: { convivencia: 1, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Suena cómodo, pero deja demasiada interpretación.",
          plus: "Buscaste una regla simple.",
          watch: "“No sean tóxicos” suele quedarse corto cuando hay casos concretos.",
          real: "Lo simple funciona si también es específico."
        },
        {
          text: "No poner reglas; cada quien mutea si algo le molesta.",
          sentText: "“Mejor no pongamos reglas. Si a alguien no le gusta, que lo mutee y ya.”",
          level: "danger",
          points: 0,
          dims: { convivencia: 0, limites: 0, apoyo: 0, evidencia: 0 },
          fb: "Eso deja toda la carga en quien recibe el trato incómodo.",
          plus: "Valoras autonomía individual.",
          watch: "Sin norma comunitaria, el patrón se repite.",
          real: "La libertad en comunidad necesita límites compartidos."
        },
        {
          text: "Poner una regla durísima: expulsión inmediata por cualquier queja.",
          sentText: "“Propuesta C: Expulsión directa del servidor ante cualquier queja o reporte.”",
          level: "risk",
          points: 1,
          dims: { convivencia: 0, limites: 1, apoyo: 0, evidencia: 0 },
          fb: "La intención es cuidar, pero sin criterios puede ser injusto o difícil de aplicar.",
          plus: "Quieres tomarlo en serio.",
          watch: "La proporcionalidad también importa.",
          real: "Buenas reglas combinan claridad, evidencia, escucha y consecuencias proporcionales."
        }
      ]
    }
  ],
  results: [
    {
      min: 21,
      max: 24,
      title: "Intervención útil",
      desc: "Lees el ambiente, pones límites sin espectáculo y conviertes la incomodidad en rutas de apoyo y moderación. ¡Excelente criterio digital!",
      icon: "🎯"
    },
    {
      min: 15,
      max: 20,
      title: "Aliado en progreso",
      desc: "Tomas varias decisiones cuidadosas para acompañar, aunque a veces recurres a soluciones parciales o evitas confrontar el problema público. ¡Sigue adelante!",
      icon: "🧭"
    },
    {
      min: 9,
      max: 14,
      title: "Testigo intermitente",
      desc: "Notas parte del problema, pero a veces dejas la carga de los límites en quien recibe el trato incómodo o promueves acciones que exponen más la situación. Refuerza tus candados.",
      icon: "⚖️"
    },
    {
      min: 0,
      max: 8,
      title: "El grupo decidió por ti",
      desc: "La presión del ambiente competitivo y las reacciones rápidas pesaron más que el criterio de ciudadanía digital. Te invitamos a volver a intentar con más cautela.",
      icon: "⚠️"
    }
  ]
};
