export interface GhostChoice {
  text: string;
  sentText?: string;
  level: 'best' | 'good' | 'partial' | 'risk' | 'danger';
  points: number;
  dims: {
    agencia: number;
    privacidad: number;
    apoyo: number;
    comunidad: number;
  };
  fb: string;
  plus: string;
  watch: string;
  real: string;
}

export interface GhostChatMessage {
  from: string;
  name: string;
  role: string;
  letter: string;
  avatarClass: string;
  text: string;
  time?: string;
  clipTitle?: string; // used for ctitle in profile/settings/rule cards
  isProfile?: boolean;
  isSettings?: boolean;
  isRule?: boolean;
  isSystem?: boolean;
  isMe?: boolean;
}

export interface GhostMission {
  id: string;
  channel: string;
  title: string;
  focus: string;
  signal_locked: string;
  signal_revealed: string;
  question: string;
  brief: string;
  feed: GhostChatMessage[];
  choices: GhostChoice[];
}

export interface GhostData {
  metadata: {
    id: string;
    product_title: string;
    subtitulo: string;
    version: string;
  };
  missions: GhostMission[];
  results: {
    min: number;
    max: number;
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const PERFIL_FANTASMA_DATA: GhostData = {
  metadata: {
    id: "CDJ-GAME-P05",
    product_title: "Perfil fantasma",
    subtitulo: "Decidir tu perfil y tus límites sin desaparecer",
    version: "v1.0"
  },
  missions: [
    {
      id: "M1",
      channel: "lobby",
      title: "El comentario sobre el perfil",
      focus: "Distinguir desempeño de apariencia de perfil.",
      signal_locked: "Señal 1 bloqueada",
      signal_revealed: "El perfil se vuelve pretexto para evaluar a alguien",
      question: "Kron acaba de comentar sobre tu avatar y tu nick. ¿Qué haces?",
      brief: "El comentario se dirige a tu perfil. Responde como integrante del servidor.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Lobby después de partida · 6 conectados", isSystem: true },
        { from: "other", name: "Perfil", role: "panel", letter: "P", avatarClass: "av-mint", text: "avatar visible · estado en línea", clipTitle: "Tu perfil visible", isProfile: true },
        { from: "other", name: "Vega", role: "capitana", letter: "V", avatarClass: "av-mint", text: "Buen clutch en la última. Falta una para ranked.", time: "18:02" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "¿Ghost? Con ese avatar pensé que eras de puro casual.", time: "18:02" },
        { from: "other", name: "Jules", role: "jugadora", letter: "J", avatarClass: "av-pink", text: "Kron, no empieces con el filtro de avatar.", time: "18:03" },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-blue", text: "Estamos viendo roles, no perfiles.", time: "18:03" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo el comentario y el panel de perfil.", time: "18:04", isMe: true }
      ],
      choices: [
        {
          text: "Responder: “Juzguemos la partida, no el avatar”. Luego decidir si cambias algo por gusto propio.",
          sentText: "“Juzguemos la partida, no el avatar.”",
          level: "best",
          points: 4,
          dims: { agencia: 2, privacidad: 1, apoyo: 0, comunidad: 1 },
          fb: "Pusiste un límite breve y separaste tu perfil de tu desempeño.",
          plus: "No convertiste el comentario en pelea larga.",
          watch: "Si el patrón sigue, necesitarás apoyo o moderación.",
          real: "Un límite corto puede cambiar el tono sin regalar demasiada energía."
        },
        {
          text: "Cambiar avatar y nick de inmediato para que no comenten más.",
          sentText: "“Voy a cambiar mi avatar y nick rápido.”",
          level: "partial",
          points: 2,
          dims: { agencia: 1, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "La herramienta puede ayudarte, pero la decisión queda demasiado marcada por el comentario de otra persona.",
          plus: "Usaste una opción disponible del perfil.",
          watch: "Si siempre te toca ajustarte para evitar comentarios, el problema sigue en el grupo.",
          real: "Privacidad sirve más cuando es elección, no reacción automática a presión."
        },
        {
          text: "Salir del servidor y no volver a entrar hoy.",
          sentText: "“Mejor me desconecto por hoy.”",
          level: "partial",
          points: 2,
          dims: { agencia: 1, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Salir puede cuidar en el momento, pero también deja al grupo sin límite claro.",
          plus: "Cortaste exposición rápidamente.",
          watch: "Si siempre la única salida es irte, el servidor no aprende nada.",
          real: "Salir es válido; también puedes guardar energía y reportar después."
        },
        {
          text: "Devolverle la burla a Kron sobre su perfil.",
          sentText: "“Mira quién habla, tu avatar está peor.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "La respuesta puede sentirse justa, pero mueve la escena a intercambio de ataques.",
          plus: "No dejaste pasar el comentario.",
          watch: "La burla cambia de objetivo, no mejora la norma.",
          real: "Puedes ser firme sin copiar la misma dinámica."
        }
      ]
    },
    {
      id: "M2",
      channel: "voz-ranked",
      title: "La voz en partida",
      focus: "Participar con límites y opciones de voz.",
      signal_locked: "Señal 2 bloqueada",
      signal_revealed: "La voz se vuelve foco de atención no pedida",
      question: "El canal de voz se activa para ranked. ¿Cómo participas?",
      brief: "El equipo pide coordinación por voz. Nadie debe convertir la voz en espectáculo.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal de voz · ranked por iniciar", isSystem: true },
        { from: "other", name: "Vega", role: "capitana", letter: "V", avatarClass: "av-mint", text: "Entren si pueden. Callouts cortos: posiciones y cooldowns.", time: "18:05" },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Ah, Ghost sí habla. No esperaba esa voz.", time: "18:05" },
        { from: "other", name: "Jules", role: "jugadora", letter: "J", avatarClass: "av-pink", text: "Kron, callouts. Nada de comentar voces.", time: "18:06" },
        { from: "other", name: "Ajustes", role: "config", letter: "A", avatarClass: "av-blue", text: "Push-to-talk disponible · silenciar DMs", clipTitle: "Ajustes de voz", isSettings: true },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo opciones de voz antes de entrar.", time: "18:06", isMe: true }
      ],
      choices: [
        {
          text: "Usar push-to-talk y decir: “callouts de partida, no comentarios personales”.",
          sentText: "“Callouts de partida, no comentarios personales.”",
          level: "best",
          points: 4,
          dims: { agencia: 2, privacidad: 1, apoyo: 0, comunidad: 1 },
          fb: "Combinaste herramienta técnica y límite social claro.",
          plus: "Sigues participando sin entregar todo el control.",
          watch: "Si insiste, ya no es tema de configuración sino de moderación.",
          real: "La mejor configuración no reemplaza una regla de convivencia."
        },
        {
          text: "Apagar micro toda la partida sin decir nada.",
          sentText: "“Me quedaré muteado toda la partida.”",
          level: "partial",
          points: 2,
          dims: { agencia: 1, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Puede protegerte, pero también reduce participación si tú sí querías hablar.",
          plus: "Cuidaste una frontera personal.",
          watch: "La decisión puede sentirse forzada si nace solo del comentario.",
          real: "Silenciarte debe ser opción, no castigo."
        },
        {
          text: "Entrar a voz aunque incomode, para no parecer difícil.",
          sentText: "“Entro a voz normal.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "La presión social termina decidiendo por ti.",
          plus: "Quieres cooperar con el equipo.",
          watch: "Coordinar no debería exigir aguantar comentarios sobre tu voz.",
          real: "Puedes coordinar con límites: push-to-talk, texto o una regla de canal."
        },
        {
          text: "Decir que quien no aguante comentarios no debería entrar a voz.",
          sentText: "“Si no aguantan comentarios, mejor ni entren a voz.”",
          level: "danger",
          points: 0,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Refuerzas que participar exige tolerar incomodidad.",
          plus: "Valoras coordinación.",
          watch: "Confundes comunicación de juego con permiso para comentar a la persona.",
          real: "Un buen equipo coordina sin convertir la voz en prueba de pertenencia."
        }
      ]
    },
    {
      id: "M3",
      channel: "dm-shadow",
      title: "El DM después de jugar",
      focus: "Mantener contacto en canales verificables.",
      signal_locked: "Señal 3 bloqueada",
      signal_revealed: "El DM pide información que no es necesaria para jugar",
      question: "Shadow te manda mensaje privado después de la partida. ¿Qué respondes?",
      brief: "Recibes un DM. Decide cuánto contacto tiene sentido fuera del canal.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "DM recibido · Shadow", isSystem: true },
        { from: "other", name: "Shadow", role: "miembro", letter: "S", avatarClass: "av-gray", text: "Juegas bien. Pasa tu insta para armar team fuera de aquí.", time: "18:07" },
        { from: "other", name: "Shadow", role: "miembro", letter: "S", avatarClass: "av-gray", text: "O mínimo dime cómo te llamas, para ubicarte.", time: "18:08" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo el DM.", time: "18:08", isMe: true }
      ],
      choices: [
        {
          text: "Responder: “prefiero coordinar por el servidor o por funciones del juego”.",
          sentText: "“Prefiero coordinar por el servidor o por las funciones del juego.”",
          level: "best",
          points: 4,
          dims: { agencia: 1, privacidad: 2, apoyo: 0, comunidad: 1 },
          fb: "Pusiste límite sin atacar y mantuviste un canal verificable.",
          plus: "Protegiste datos y contexto.",
          watch: "Si insiste, ya hay motivo para bloquear o reportar.",
          real: "No todo contacto útil necesita moverse a redes personales."
        },
        {
          text: "Ignorar el DM, pero dejarlo abierto por si luego sirve.",
          sentText: "“...”",
          level: "partial",
          points: 2,
          dims: { agencia: 1, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "No entregaste datos, aunque dejas abierta la insistencia.",
          plus: "No compartiste información.",
          watch: "Si se repite, conviene cerrar, bloquear o configurar privacidad.",
          real: "Ignorar sirve a veces; poner límite suele ser más claro."
        },
        {
          text: "Dar una red secundaria para no quedar mal.",
          sentText: "“Te paso mi cuenta secundaria de twitter.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Compartes más información por presión de cortesía.",
          plus: "Intentas mantener buena relación.",
          watch: "No debes datos personales para demostrar amabilidad.",
          real: "Un no breve también puede ser convivencia."
        },
        {
          text: "Publicar captura del DM para burlarte de Shadow.",
          sentText: "“Miren lo que me mandó Shadow (en canal público).”",
          level: "danger",
          points: 0,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Conviertes un límite privado en exposición pública.",
          plus: "Te molestó la presión.",
          watch: "La burla escala y distrae del límite real.",
          real: "Puedes reportar o bloquear sin convertirlo en show."
        }
      ]
    },
    {
      id: "M4",
      channel: "cuenta-alt",
      title: "La cuenta alternativa",
      focus: "Validar estrategia sin volverla única solución.",
      signal_locked: "Señal 4 bloqueada",
      signal_revealed: "La carga de esconderse cae sobre quien recibe presión",
      question: "Jules cuenta que usa una cuenta alternativa para evitar comentarios. ¿Qué haces?",
      brief: "Ahora ves a otra jugadora explicar por qué usa una cuenta distinta.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #cuenta-alt", isSystem: true },
        { from: "other", name: "Jules", role: "jugadora", letter: "J", avatarClass: "av-pink", text: "Por eso a veces entro con nick neutro. Me cansa explicar que solo quiero jugar.", time: "18:09" },
        { from: "other", name: "Byte", role: "miembro", letter: "B", avatarClass: "av-blue", text: "Tiene sentido, pero está pesado que tengas que hacer eso.", time: "18:09" },
        { from: "other", name: "Perfil", role: "panel", letter: "P", avatarClass: "av-pink", text: "Nick genérico · DMs cerrados", clipTitle: "Cuenta alternativa", isProfile: true },
        { from: "other", name: "Kron", role: "miembro", letter: "K", avatarClass: "av-purple", text: "Pues si funciona, problema resuelto, ¿no?", time: "18:10" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "La conversación queda abierta.", time: "18:10", isMe: true }
      ],
      choices: [
        {
          text: "Validar que puede servir y proponer reglas, bloqueo/reportes y apoyo del equipo.",
          sentText: "“Es una opción para Jules, pero también hacen falta reglas en el server para que nadie tenga que esconderse.”",
          level: "best",
          points: 4,
          dims: { agencia: 1, privacidad: 1, apoyo: 1, comunidad: 2 },
          fb: "Combinaste cuidado individual y responsabilidad comunitaria.",
          plus: "No juzgaste la estrategia de Jules.",
          watch: "Sin reglas, el patrón se repite con otra persona.",
          real: "La mejor respuesta mezcla herramientas personales y normas del grupo."
        },
        {
          text: "Decir que usar cuenta alternativa siempre es lo más inteligente.",
          sentText: "“Sí, usar otra cuenta es lo mejor que se puede hacer.”",
          level: "partial",
          points: 2,
          dims: { agencia: 0, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Puede ser útil, pero la presentas como única solución.",
          plus: "Reconoces una forma de reducir exposición.",
          watch: "Normaliza que quien recibe presión tenga que desaparecer.",
          real: "La privacidad es herramienta; la comunidad también debe cambiar."
        },
        {
          text: "Pedirle a Jules que use siempre esa cuenta para evitar problemas.",
          sentText: "“Jules, mejor usa siempre esa cuenta genérica para no tener broncas.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Trasladas toda la carga a ella.",
          plus: "Buscas reducir exposición.",
          watch: "La solución termina siendo: cambia tú para que otros no molesten.",
          real: "Cuidar no es pedirle a alguien que se borre."
        },
        {
          text: "Burlarte de que usar otra cuenta es exagerado.",
          sentText: "“Jajaja no manches, qué exagerada.”",
          level: "danger",
          points: 0,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Ridiculizas una estrategia que quizá nació de experiencias reales.",
          plus: "Quizá querías sonar relajado.",
          watch: "La burla cierra la conversación y aumenta aislamiento.",
          real: "No sabes qué experiencias llevaron a alguien a protegerse así."
        }
      ]
    },
    {
      id: "M5",
      channel: "ajustes",
      title: "Configuración de privacidad",
      focus: "Usar configuración fina sin desaparecer.",
      signal_locked: "Señal 5 bloqueada",
      signal_revealed: "La configuración puede reducir exposición sin borrar participación",
      question: "El servidor muestra opciones de privacidad. ¿Qué revisas primero?",
      brief: "La escena muestra controles técnicos. Decide qué revisar sin desaparecer del servidor.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Panel de privacidad · ajustes disponibles", isSystem: true },
        { from: "other", name: "Ajustes", role: "config", letter: "A", avatarClass: "av-blue", text: "DMs abiertos · voz sin push-to-talk", clipTitle: "Ajustes actuales", isSettings: true },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "Pueden ajustar DMs, menciones, roles y bloqueo de usuarios.", time: "18:11" },
        { from: "other", name: "Vega", role: "capitana", letter: "V", avatarClass: "av-mint", text: "También podemos fijar una guía de configuración para gente nueva.", time: "18:12" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "Veo el panel.", time: "18:12", isMe: true }
      ],
      choices: [
        {
          text: "Revisar DMs, menciones, invitaciones y voz; dejar visible solo lo que tenga sentido.",
          sentText: "“Voy a ajustar mis DMs para amigos y activar push-to-talk. Dejo abierto solo lo que me sirve.”",
          level: "best",
          points: 4,
          dims: { agencia: 2, privacidad: 2, apoyo: 0, comunidad: 1 },
          fb: "Usaste privacidad como control fino, no como castigo.",
          plus: "Decides por función y comodidad.",
          watch: "La configuración no reemplaza reglas ni moderación.",
          real: "Buena privacidad permite participar con menos exposición innecesaria."
        },
        {
          text: "Cerrar todo y no volver a hablar en el servidor.",
          sentText: "“Cierro todos los DMs, apago micro y solo leo.”",
          level: "partial",
          points: 2,
          dims: { agencia: 1, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Reduce exposición, pero también corta participación si tú sí querías estar.",
          plus: "Usaste controles de privacidad.",
          watch: "Privacidad total puede sentirse como retirada obligada.",
          real: "Ajustar no debería significar desaparecer."
        },
        {
          text: "No tocar nada porque configurar es exagerado.",
          sentText: "“Así lo dejo, no hay que ser paranoicos.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Dejas abiertas opciones que quizá no necesitas.",
          plus: "Evitas complicarte.",
          watch: "No revisar ajustes también es una decisión.",
          real: "Configurar no es paranoia; es mantenimiento básico."
        },
        {
          text: "Publicar una queja general antes de ajustar algo.",
          sentText: "“¡Este server debería tener mejor privacidad por defecto! (Queja pública)”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "La queja puede escalar antes de reducir exposición.",
          plus: "Quieres que el grupo vea el problema.",
          watch: "Primero conviene pausar, configurar y elegir bien la ruta.",
          real: "Orden útil: pausa, configura, guarda evidencia si aplica, reporta."
        }
      ]
    },
    {
      id: "M6",
      channel: "reglas",
      title: "Reglas del servidor",
      focus: "Convertir casos en reglas claras y aplicables.",
      signal_locked: "Señal 6 bloqueada",
      signal_revealed: "Una norma puede proteger sin imponer invisibilidad",
      question: "El servidor redacta una regla nueva. ¿Cuál propuesta apoyas?",
      brief: "El grupo quiere dejar una regla clara para perfiles, voz y datos personales.",
      feed: [
        { from: "system", name: "", role: "", letter: "", avatarClass: "", text: "Canal #reglas · edición abierta", isSystem: true },
        { from: "other", name: "Reglas", role: "borrador", letter: "R", avatarClass: "av-cyan", text: "“Cada quien se cuida como quiera. Si no quieren comentarios, oculten su perfil.”", clipTitle: "Borrador A", isRule: true },
        { from: "other", name: "Reglas", role: "borrador", letter: "R", avatarClass: "av-cyan", text: "“Nadie está obligado a dar redes, voz, foto, nombre o explicaciones personales. Comentarios sobre identidad/perfil se moderan. Hay canal de reporte y ajustes recomendados.”", clipTitle: "Borrador B", isRule: true },
        { from: "other", name: "ModZero", role: "moderador", letter: "M", avatarClass: "av-gray", text: "Necesitamos una regla clara y aplicable.", time: "18:13" },
        { from: "other", name: "Jules", role: "jugadora", letter: "J", avatarClass: "av-pink", text: "Me sirve que no todo dependa de esconderme.", time: "18:14" },
        { from: "me", name: "Tú", role: "", letter: "T", avatarClass: "av-green", text: "La regla debería servir antes de que alguien tenga que desaparecer.", time: "18:14", isMe: true }
      ],
      choices: [
        {
          text: "Elegir el Borrador B y agregar guía breve de configuración.",
          sentText: "“Voto por el Borrador B. Combina límites y protege a la gente sin exigirles que se borren.”",
          level: "best",
          points: 4,
          dims: { agencia: 2, privacidad: 1, apoyo: 1, comunidad: 2 },
          fb: "La regla combina límites, privacidad y ruta de acción.",
          plus: "No obliga a desaparecer para estar seguro.",
          watch: "Debe aplicarse de forma consistente.",
          real: "Una comunidad sana permite mostrarse o reservarse sin castigo."
        },
        {
          text: "Dejarlo en “sean respetuosos” sin más detalle.",
          sentText: "“Mejor una regla simple: sean respetuosos con todos y ya.”",
          level: "partial",
          points: 2,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 1 },
          fb: "Suena bien, pero puede quedarse corto.",
          plus: "Busca una norma simple.",
          watch: "Sin ejemplos ni ruta, se interpreta como sea.",
          real: "Las reglas breves sirven si dicen qué hacer cuando algo pasa."
        },
        {
          text: "Prohibir fotos, voz y nombres reales para todos.",
          sentText: "“Para evitar broncas, prohibamos compartir fotos, voz o nombres en todo el server.”",
          level: "risk",
          points: 1,
          dims: { agencia: 0, privacidad: 1, apoyo: 0, comunidad: 0 },
          fb: "Reduce algunos riesgos, pero impone invisibilidad a todos.",
          plus: "Quieres prevenir.",
          watch: "Una prohibición total puede ser desproporcionada.",
          real: "Mejor ofrecer opciones y límites claros que imponer desaparición."
        },
        {
          text: "Elegir el Borrador A porque cada quien es responsable de su perfil.",
          sentText: "“Voto por el Borrador A. Cada quien debe saber cómo cuidarse.”",
          level: "danger",
          points: 0,
          dims: { agencia: 0, privacidad: 0, apoyo: 0, comunidad: 0 },
          fb: "Deja toda la carga en quien recibe comentarios.",
          plus: "Valoras autonomía personal.",
          watch: "La autonomía sin norma puede volverse abandono.",
          real: "La privacidad personal no reemplaza responsabilidad comunitaria."
        }
      ]
    }
  ],
  results: [
    {
      min: 21,
      max: 24,
      title: "Presencia segura",
      desc: "Elegiste herramientas de cuidado sin desaparecer del todo. Pusiste límites claros al hostigamiento y reforzaste la responsabilidad comunitaria.",
      icon: "🛑"
    },
    {
      min: 15,
      max: 20,
      title: "Equilibrio parcial",
      desc: "Tomaste varias opciones de privacidad efectivas, aunque en ocasiones cediste a la presión o aislaste de más tu perfil.",
      icon: "🧭"
    },
    {
      min: 9,
      max: 14,
      title: "Presión de grupo",
      desc: "Varias decisiones se orientaron a cambiar o silenciar tu perfil para evitar fricciones, perdiendo agencia frente a Kron o Shadow.",
      icon: "👀"
    },
    {
      min: 0,
      max: 8,
      title: "Invisibilidad forzada",
      desc: "Tus elecciones impusieron la desaparición del perfil y el silencio como únicas alternativas de cuidado. ¡Recuerda el valor de tu agencia!",
      icon: "⚠️"
    }
  ]
};
