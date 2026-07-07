export interface MissionFeed {
  type: 'sys' | 'reward' | 'msg' | 'link' | 'login' | 'report';
  text?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  author?: string;
  role?: string;
  avatar?: string;
  color?: string;
  isMe?: boolean;
  url?: string;
  preview?: string;
  fields?: string;
  options?: string;
}

export interface MissionOption {
  txt: string;
  level: 'best' | 'partial' | 'risk' | 'danger';
  points: number;
  dims: {
    pausa: number;
    cuenta: number;
    verificacion: number;
    ayuda: number;
  };
  exp1: string;
  exp2: string;
  exp3: string;
  tip: string;
}

export interface Mission {
  id: string;
  ch: string;
  desc: string;
  brief: string;
  locked: string;
  sig: string;
  q: string;
  feed: MissionFeed[];
  ops: MissionOption[];
}

export const MONEDAS_GRATIS_DATA: Mission[] = [
  {
    id: "M1",
    ch: "plaza",
    desc: "Mensaje en la plaza",
    brief: "Estás en la plaza del mundo. Aparece un mensaje sobre monedas y un jugador te habla.",
    locked: "Señal 1 bloqueada",
    sig: "Promesa de premio fácil",
    q: "Aparece una oferta de monedas en el chat. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Plaza central · 23 jugadores conectados" },
      { type: "reward", title: "Anuncio flotante", subtitle: "Evento Relámpago", desc: "“500 monedas para jugadores activos” · botón: Reclamar" },
      { type: "msg", author: "PixelFox", role: "jugador", avatar: "P", color: "purple", text: "Yo vi ese anuncio ayer. Creo que sí da algo." },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "¿Está en la tienda del juego o solo salió en el chat?" },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Si quieres te paso el camino rápido para reclamarlo." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Estoy viendo el anuncio.", isMe: true }
    ],
    ops: [
      {
        txt: "Buscar si el premio aparece dentro del menú oficial del juego antes de tocar el botón.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 1, verificacion: 2, ayuda: 0 },
        exp1: "Pausaste y comparaste el anuncio con un lugar oficial del juego.",
        exp2: "No rechazaste todo por miedo; revisaste mejor.",
        exp3: "Si no aparece en el menú oficial, conviene no seguir.",
        tip: "Cuando hay premio, primero revisa desde el juego, no desde el chat."
      },
      {
        txt: "Preguntar en el chat si alguien ya lo reclamó.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, cuenta: 0, verificacion: 1, ayuda: 0 },
        exp1: "Pedir experiencia a otros puede ayudar, pero no confirma que sea seguro.",
        exp2: "No tocaste el botón de inmediato.",
        exp3: "Las respuestas del chat pueden equivocarse o presionarte.",
        tip: "Mejor combinar preguntas con revisión del menú oficial."
      },
      {
        txt: "Presionar el botón para ver qué pide, pero sin escribir nada todavía.",
        level: "risk",
        points: 1,
        dims: { pausa: 1, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Abrir una ruta desconocida ya puede llevarte fuera del juego o confundirte.",
        exp2: "Intentas revisar antes de dar datos.",
        exp3: "A veces el problema empieza antes de escribir la contraseña.",
        tip: "Si algo parece raro, revisa desde el menú oficial o avisa."
      },
      {
        txt: "Aceptar el camino rápido que ofrece CoinMax porque parece saber.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Seguir a un jugador nuevo puede llevarte a una ruta que no controlas.",
        exp2: "Buscas ayuda para entender el anuncio.",
        exp3: "Que alguien parezca seguro no significa que la ruta sea confiable.",
        tip: "Las recompensas deben poder revisarse sin depender de un extraño."
      }
    ]
  },
  {
    id: "M2",
    ch: "link",
    desc: "El link corto",
    brief: "El jugador nuevo manda una dirección abreviada. Dice que es más rápido.",
    locked: "Señal 2 bloqueada",
    sig: "El premio intenta sacarte del juego",
    q: "CoinMax manda un link corto y dice que solo funciona hoy. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Chat privado recibido · CoinMax" },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Aquí está: mb-premio.co/500. Entra rápido, se acaba hoy." },
      { type: "link", title: "Link recibido", url: "mb-premio.co/500", preview: "Vista previa: “Reclama monedas de evento”" },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Ese link no se parece al menú de Rubloox." },
      { type: "msg", author: "PixelFox", role: "jugador", avatar: "P", color: "purple", text: "Puede ser página de evento, ¿no?" },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Tengo el link en pantalla.", isMe: true }
    ],
    ops: [
      {
        txt: "No abrir el link y revisar el evento desde la tienda o avisos oficiales del juego.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 1, verificacion: 2, ayuda: 0 },
        exp1: "Evitaste salir del juego y buscaste una ruta más confiable.",
        exp2: "La decisión no depende de la prisa del mensaje.",
        exp3: "Si aún tienes duda, pregunta a un adulto antes de abrirlo.",
        tip: "Los links con prisa y premio fácil merecen pausa."
      },
      {
        txt: "Copiar el link para preguntarle después a un adulto, sin abrirlo.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 1, verificacion: 1, ayuda: 2 },
        exp1: "Guardaste la duda sin entrar al sitio.",
        exp2: "No te dejaste presionar por el “solo hoy”.",
        exp3: "Conviene no compartirlo con más niños mientras se revisa.",
        tip: "Pedir ayuda antes de abrir puede evitar problemas."
      },
      {
        txt: "Abrirlo, mirar si se ve bien y cerrar si pide contraseña.",
        level: "risk",
        points: 1,
        dims: { pausa: 1, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Una página falsa puede verse muy parecida a una real.",
        exp2: "Quieres revisar con cuidado.",
        exp3: "La apariencia no basta para confiar.",
        tip: "Mejor no abrir links raros desde chats."
      },
      {
        txt: "Pasarlo al grupo para que otros digan si les funcionó.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Compartirlo puede llevar a más personas al mismo riesgo.",
        exp2: "Buscas ayuda del grupo.",
        exp3: "Probar con otros no vuelve seguro un link.",
        tip: "Si dudas, no lo conviertas en cadena."
      }
    ]
  },
  {
    id: "M3",
    ch: "login",
    desc: "Pantalla de cuenta",
    brief: "Aparece una pantalla que parece de inicio de sesión. Revisa qué está pidiendo.",
    locked: "Señal 3 bloqueada",
    sig: "Pide datos de cuenta para entregar un premio",
    q: "La pantalla pide usuario, contraseña y un código de seguridad. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Ventana nueva · Reclamo de monedas" },
      { type: "login", title: "Formulario", fields: "Usuario · contraseña · código de seguridad", desc: "Texto: “necesitamos verificar tu cuenta para entregar monedas”" },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Es normal. Si no pones el código, no te llega." },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Yo no pondría contraseña fuera del juego." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "La pantalla está abierta.", isMe: true }
    ],
    ops: [
      {
        txt: "Cerrar la pantalla y no escribir contraseña ni código.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 2, verificacion: 1, ayuda: 0 },
        exp1: "Protegiste lo más importante: tu cuenta y códigos.",
        exp2: "No intentaste “probar tantito”.",
        exp3: "Si ya escribiste algo antes, hay que avisar y cambiar contraseña con ayuda.",
        tip: "Contraseña y códigos no se entregan por premios."
      },
      {
        txt: "Escribir solo el usuario, pero no la contraseña.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, cuenta: 1, verificacion: 0, ayuda: 0 },
        exp1: "No diste todo, pero el formulario sigue siendo una ruta dudosa.",
        exp2: "Cuidaste no poner la contraseña.",
        exp3: "El usuario también puede servir para intentar engaños después.",
        tip: "Si pide datos de cuenta por premio, mejor cerrar."
      },
      {
        txt: "Pedirle a Nube que lo intente primero con su cuenta secundaria.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Trasladas el riesgo a otra persona.",
        exp2: "No querías arriesgar tu cuenta.",
        exp3: "Probar con alguien más no hace seguro el sitio.",
        tip: "Si es dudoso, se pausa para todos."
      },
      {
        txt: "Tomar captura de la pantalla para preguntar a un adulto, cuidando que no tenga datos escritos.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 2, verificacion: 1, ayuda: 2 },
        exp1: "Guardaste contexto sin entregar información.",
        exp2: "La captura ayuda a explicar qué viste.",
        exp3: "No compartas la captura en chats públicos si muestra datos.",
        tip: "Pedir ayuda con una captura limpia puede ser buena decisión."
      }
    ]
  },
  {
    id: "M4",
    ch: "captura",
    desc: "La captura del código",
    brief: "Otro jugador dice que solo falta una captura para terminar el proceso.",
    locked: "Señal 4 bloqueada",
    sig: "La captura puede mostrar información privada",
    q: "CoinMax pide una captura de tu pantalla para “ayudarte”. ¿Qué respondes?",
    feed: [
      { type: "sys", text: "Chat privado · CoinMax insiste" },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Mándame captura. Solo quiero ver si ya te salió el código." },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Tapa tu contraseña si quieres, no pasa nada." },
      { type: "report", title: "Panel visible", options: "Código de seguridad · correo parcial · botón continuar" },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Ojo, la captura puede mostrar más de lo que parece." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Estoy viendo mi pantalla.", isMe: true }
    ],
    ops: [
      {
        txt: "No enviar captura y cerrar el chat privado.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 2, verificacion: 0, ayuda: 1 },
        exp1: "Evitaste compartir información de tu pantalla.",
        exp2: "No discutiste de más con quien insiste.",
        exp3: "Puedes bloquear o reportar si continúa.",
        tip: "Una captura también puede revelar datos importantes."
      },
      {
        txt: "Mandar captura después de tapar la contraseña.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, cuenta: 1, verificacion: 0, ayuda: 0 },
        exp1: "Aunque tapes una parte, pueden quedar códigos, correo o datos visibles.",
        exp2: "Intentaste cuidar algo.",
        exp3: "No siempre sabes qué información aparece en una captura.",
        tip: "Si alguien pide capturas de seguridad, mejor no enviarlas."
      },
      {
        txt: "Pedirle que te diga exactamente qué parte necesita ver.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Preguntar parece cuidadoso, pero mantiene abierta una petición riesgosa.",
        exp2: "No mandaste la captura de inmediato.",
        exp3: "El problema no es solo qué parte: es que te pide ver tu pantalla.",
        tip: "No tienes que demostrar nada con capturas privadas."
      },
      {
        txt: "Enviar la captura al grupo para que todos opinen.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Aumentas el número de personas que podrían ver información privada.",
        exp2: "Buscas ayuda.",
        exp3: "El grupo no es el mejor lugar para pantallas con datos.",
        tip: "Si necesitas ayuda, mejor adulto de confianza o canal oficial."
      }
    ]
  },
  {
    id: "M5",
    ch: "reporte",
    desc: "Cierre del caso",
    brief: "Ya viste mensajes, link, formulario y captura. Elige cómo cerrar dentro del mundo.",
    locked: "Señal 5 bloqueada",
    sig: "Cerrar el riesgo incluye avisar por la ruta correcta",
    q: "¿Qué haces para cerrar la situación?",
    feed: [
      { type: "sys", text: "Menú del mundo · opciones disponibles" },
      { type: "report", title: "Opciones", options: "Bloquear jugador · Reportar mensaje · Revisar tienda oficial · Avisar a adulto" },
      { type: "msg", author: "CoinMax", role: "jugador nuevo", avatar: "C", color: "coin", text: "Última oportunidad. Si no reclamas, pierdes las monedas." },
      { type: "msg", author: "PixelFox", role: "jugador", avatar: "P", color: "purple", text: "Yo ya mejor no sé." },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Podemos dejar de mover el link." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Toca decidir el cierre.", isMe: true }
    ],
    ops: [
      {
        txt: "Bloquear/reportar a CoinMax, no mover el link y avisar a un adulto de confianza.",
        level: "best",
        points: 4,
        dims: { pausa: 2, cuenta: 2, verificacion: 1, ayuda: 2 },
        exp1: "Cerraste el contacto, evitaste que se comparta y pediste ayuda.",
        exp2: "No lo convertiste en cadena ni en burla.",
        exp3: "Si alguien ya puso datos, hay que avisar rápido para cambiar contraseña.",
        tip: "Bloquear, reportar y avisar puede protegerte a ti y a otros."
      },
      {
        txt: "Solo bloquearlo para que ya no te moleste.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, cuenta: 1, verificacion: 0, ayuda: 0 },
        exp1: "Bloquear te protege, pero no ayuda a revisar el link ni avisar si otros lo recibieron.",
        exp2: "Cortaste el contacto directo.",
        exp3: "Si hay más personas expuestas, conviene reportar o avisar.",
        tip: "Bloquear es buen inicio, pero a veces no basta."
      },
      {
        txt: "Decirle a todos que CoinMax es un ladrón y burlarse de él.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, cuenta: 0, verificacion: 0, ayuda: 0 },
        exp1: "Puede iniciar pelea y no resuelve el riesgo del link.",
        exp2: "Quieres advertir al grupo.",
        exp3: "Advertir no requiere insultar ni hacer show.",
        tip: "Mejor: “no abran el link, ya lo reporté”."
      },
      {
        txt: "Dejarlo pasar porque no alcanzaste a poner contraseña.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, cuenta: 1, verificacion: 0, ayuda: 0 },
        exp1: "No perdiste la cuenta, pero el intento puede seguir con otros jugadores.",
        exp2: "Te tranquiliza no haber escrito datos.",
        exp3: "El riesgo no siempre termina cuando tú te sales.",
        tip: "Si hubo link o presión, reportar ayuda a cortar la ruta."
      }
    ]
  }
];
