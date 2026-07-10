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
    limites: number;
    confianza: number;
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

export const EL_MUNDO_PRIVADO_DATA: Mission[] = [
  {
    id: "M1",
    ch: "plaza",
    desc: "Invitación después de jugar",
    brief: "Estás en la plaza después de una partida. Un jugador te escribe y propone seguir jugando.",
    locked: "Señal 1 bloqueada",
    sig: "La invitación cambia de espacio rápidamente",
    q: "SkyFox te invita a seguir jugando en otra sala. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Plaza central · 18 jugadores conectados" },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Buena partida. Esa torre quedó enorme." },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "Juegas bien. Tengo un mundo mejor, más pro. Ven, te enseño trucos." },
      { type: "msg", author: "PixelFox", role: "jugador", avatar: "P", color: "blue", text: "¿Es un mundo público o privado?" },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "Privado, pero tranqui. Solo entra quien yo invito." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Veo la invitación.", isMe: true }
    ],
    ops: [
      {
        txt: "Preguntar qué tipo de mundo es y si pueden entrar también Nube o PixelFox.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 1, confianza: 2, ayuda: 0 },
        exp1: "Pausaste y buscaste más contexto antes de moverte de sala.",
        exp2: "No rechazaste jugar; revisaste mejor la invitación.",
        exp3: "Si la respuesta evita que otros entren, conviene tener más cuidado.",
        tip: "Una invitación se entiende mejor cuando no te separa del grupo."
      },
      {
        txt: "Entrar porque ya jugaron una partida y SkyFox parece buena onda.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, limites: 0, confianza: 1, ayuda: 0 },
        exp1: "Una buena partida no dice suficiente sobre una persona.",
        exp2: "Reconociste que hubo una interacción agradable.",
        exp3: "Jugar bien juntos no convierte a alguien en persona de confianza.",
        tip: "Puedes seguir jugando sin entrar de inmediato a un espacio privado."
      },
      {
        txt: "Decir que solo entras si Nube también puede entrar.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 2, confianza: 1, ayuda: 0 },
        exp1: "Pusiste una condición clara sin pelear.",
        exp2: "Mantienes el juego en un espacio menos aislado.",
        exp3: "Si insiste en que vayas solo, esa respuesta da información importante.",
        tip: "Pedir compañía dentro del juego puede ser una forma simple de cuidarte."
      },
      {
        txt: "Ignorar todo y seguir jugando sin responder.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, limites: 1, confianza: 0, ayuda: 0 },
        exp1: "No entraste de inmediato, pero dejas la invitación sin cerrar.",
        exp2: "Evitaste moverte rápido.",
        exp3: "Si insiste, conviene responder con límite o bloquear.",
        tip: "Ignorar puede servir un rato; un límite claro sirve más si continúa."
      }
    ]
  },
  {
    id: "M2",
    ch: "invitacion",
    desc: "Sala privada",
    brief: "Aparece una ventana para entrar a una sala privada. El jugador insiste.",
    locked: "Señal 2 bloqueada",
    sig: "La invitación busca aislar la conversación",
    q: "SkyFox manda invitación a una sala privada. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Invitación recibida · Sala Privada" },
      { type: "reward", title: "Sala privada", subtitle: "TreeHouse VIP", desc: "Invitación de SkyFox · 1/2 jugadores" },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "Entra rápido. Allí no molestan los demás." },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "Yo no recibí invitación." },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "Es que primero quiero mostrarle a T." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Tengo la invitación abierta.", isMe: true }
    ],
    ops: [
      {
        txt: "Cerrar la invitación y decir: “prefiero jugar en mundo público o con más gente”.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 2, confianza: 1, ayuda: 0 },
        exp1: "Pusiste un límite claro y mantuviste el juego en un espacio conocido.",
        exp2: "No acusaste a nadie; solo decidiste dónde jugar.",
        exp3: "Si sigue insistiendo, conviene bloquear o pedir ayuda.",
        tip: "Puedes elegir dónde jugar sin dar explicaciones largas."
      },
      {
        txt: "Entrar solo por unos minutos y salir si se pone raro.",
        level: "risk",
        points: 1,
        dims: { pausa: 1, limites: 0, confianza: 0, ayuda: 0 },
        exp1: "Parece una prueba controlada, pero ya entras a un espacio más aislado.",
        exp2: "Pensaste en salir después.",
        exp3: "A veces es más fácil no entrar que intentar salir después.",
        tip: "Si algo te separa del grupo, pausa antes de aceptar."
      },
      {
        txt: "Pedir que invite también a Nube antes de entrar.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 1, confianza: 2, ayuda: 0 },
        exp1: "Cambiaste la condición de entrada para reducir aislamiento.",
        exp2: "No bloqueas el juego; pides hacerlo más abierto.",
        exp3: "Si se niega, eso te da una señal para no entrar.",
        tip: "Las salas privadas no son malas por sí mismas; el contexto importa."
      },
      {
        txt: "Aceptar porque no quieres que piense que eres grosero/a.",
        level: "partial",
        points: 2,
        dims: { pausa: 0, limites: 0, confianza: 1, ayuda: 0 },
        exp1: "La cortesía empieza a decidir por ti.",
        exp2: "Quieres tratar bien a la otra persona.",
        exp3: "Ser amable no significa aceptar todas las invitaciones.",
        tip: "Puedes decir no de forma tranquila."
      }
    ]
  },
  {
    id: "M3",
    ch: "chat-privado",
    desc: "Mensaje aparte",
    brief: "El jugador te escribe por chat privado después de que dudas de entrar.",
    locked: "Señal 3 bloqueada",
    sig: "El mensaje pide discreción y rapidez",
    q: "SkyFox te manda un mensaje privado. ¿Qué respondes?",
    feed: [
      { type: "sys", text: "Chat privado · SkyFox" },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "No le digas a Nube, se va a querer meter y arruina los trucos." },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "Te enseño un mapa secreto. Pero ven ya." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Leo el mensaje privado.", isMe: true }
    ],
    ops: [
      {
        txt: "Responder: “no juego en secreto; si es para jugar, puede ser con más gente”.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 2, confianza: 1, ayuda: 0 },
        exp1: "Nombraste tu límite sin hacer una pelea.",
        exp2: "No aceptaste la idea de ocultarlo.",
        exp3: "Si insiste, ya no es solo una invitación normal.",
        tip: "Cuando alguien pide secreto para jugar, conviene pausar."
      },
      {
        txt: "Decirle a Nube que SkyFox pidió no decirle y preguntarle qué piensa.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 1, confianza: 1, ayuda: 2 },
        exp1: "Buscaste apoyo de alguien conocido del juego.",
        exp2: "No te quedaste solo con la presión del mensaje.",
        exp3: "Para temas importantes, también conviene avisar a un adulto.",
        tip: "Pedir otra mirada ayuda cuando un mensaje se siente raro."
      },
      {
        txt: "Prometer que no dirás nada, pero entrar solo poquito.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, limites: 0, confianza: 0, ayuda: 0 },
        exp1: "El secreto y la prisa quedan aceptados.",
        exp2: "Intentas controlar la situación entrando poco tiempo.",
        exp3: "Cuando una condición te pide ocultar algo, el riesgo aumenta.",
        tip: "No necesitas probar una situación que ya te incomoda."
      },
      {
        txt: "No contestar el privado, pero dejar abierta la invitación.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, limites: 0, confianza: 0, ayuda: 0 },
        exp1: "No respondiste al secreto, pero la presión sigue abierta.",
        exp2: "Evitaste aceptar en ese momento.",
        exp3: "Si continúa, conviene cerrar invitación, bloquear o pedir ayuda.",
        tip: "No responder es válido; cerrar la puerta puede ser más claro."
      }
    ]
  },
  {
    id: "M4",
    ch: "datos",
    desc: "Preguntas dentro de la sala",
    brief: "La conversación empieza a pedir información personal de forma casual.",
    locked: "Señal 4 bloqueada",
    sig: "La charla se mueve hacia datos personales",
    q: "SkyFox empieza a preguntar cosas personales. ¿Qué haces?",
    feed: [
      { type: "sys", text: "Chat privado activo" },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "¿Cuántos años tienes? Yo tengo 12." },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "¿A qué escuela vas? Igual vivimos cerca." },
      { type: "report", title: "Panel de chat", options: "Opciones disponibles: bloquear · reportar · salir · captura" },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Veo las preguntas.", isMe: true }
    ],
    ops: [
      {
        txt: "No responder datos y decir: “solo hablo del juego”.",
        level: "best",
        points: 4,
        dims: { pausa: 1, limites: 2, confianza: 1, ayuda: 0 },
        exp1: "Pusiste una frontera clara entre juego y datos personales.",
        exp2: "No entraste a discutir ni diste información.",
        exp3: "Si sigue preguntando, usa bloqueo/reporte o pide ayuda.",
        tip: "Nombre real, escuela, edad exacta y ubicación no son necesarios para jugar."
      },
      {
        txt: "Dar solo tu edad, pero no escuela ni colonia.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, limites: 1, confianza: 0, ayuda: 0 },
        exp1: "Parece poco, pero sigue siendo información personal.",
        exp2: "Intentaste no dar todo.",
        exp3: "Los datos pequeños pueden juntarse con otros datos.",
        tip: "Para jugar no necesitas dar edad, escuela o ubicación."
      },
      {
        txt: "Inventar datos falsos para salir del paso.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, limites: 1, confianza: 0, ayuda: 0 },
        exp1: "No diste datos reales, pero sigues dentro de una conversación incómoda.",
        exp2: "Protegiste tu información real.",
        exp3: "Mentir puede alargar la charla en vez de cerrarla.",
        tip: "Mejor usar una frase límite y salir/bloquear si continúa."
      },
      {
        txt: "Preguntarle primero a SkyFox su escuela para ver si es verdad.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, limites: 0, confianza: 0, ayuda: 0 },
        exp1: "La conversación se vuelve intercambio de datos personales.",
        exp2: "Buscas comprobar si dice la verdad.",
        exp3: "Verificar con más datos no hace segura la charla.",
        tip: "No necesitas investigar a alguien para decidir no compartir datos."
      }
    ]
  },
  {
    id: "M5",
    ch: "cierre",
    desc: "Cerrar la situación",
    brief: "Ya hubo invitación privada, secreto, prisa y preguntas. Decide cómo cerrar.",
    locked: "Señal 5 bloqueada",
    sig: "Cerrar también puede incluir bloqueo, reporte y ayuda",
    q: "¿Cómo cierras la situación dentro de Rubloox?",
    feed: [
      { type: "sys", text: "Menú abierto · Opciones disponibles" },
      { type: "report", title: "Panel de seguridad", options: "Salir de sala · Bloquear jugador · Reportar mensaje · Avisar a adulto" },
      { type: "msg", author: "SkyFox", role: "jugador", avatar: "S", color: "purple", text: "¿Por qué tardas? Si sales, pierdes el truco." },
      { type: "msg", author: "Nube", role: "amiga del juego", avatar: "N", color: "cyan", text: "¿Todo bien? Te saliste del mundo público." },
      { type: "msg", author: "Tú", role: "", avatar: "T", color: "green", text: "Toca decidir el cierre.", isMe: true }
    ],
    ops: [
      {
        txt: "Salir de la sala, bloquear/reportar si insiste y avisar a un adulto de confianza.",
        level: "best",
        points: 4,
        dims: { pausa: 2, limites: 2, confianza: 1, ayuda: 2 },
        exp1: "Cortaste la presión y usaste rutas de ayuda.",
        exp2: "No convertiste la situación en burla ni cadena.",
        exp3: "Si compartiste algún dato, avisa pronto para revisar qué hacer.",
        tip: "Cerrar a tiempo también es jugar seguro."
      },
      {
        txt: "Solo salir de la sala y volver con Nube.",
        level: "partial",
        points: 2,
        dims: { pausa: 1, limites: 1, confianza: 1, ayuda: 0 },
        exp1: "Salir te protege en ese momento, pero no corta necesariamente la insistencia.",
        exp2: "Volviste a un espacio menos aislado.",
        exp3: "Si SkyFox sigue escribiendo, faltaría bloquear/reportar o pedir ayuda.",
        tip: "Salir puede ser el primer paso, no siempre el último."
      },
      {
        txt: "Contarle a todo el chat que SkyFox es peligroso.",
        level: "risk",
        points: 1,
        dims: { pausa: 0, limites: 1, confianza: 0, ayuda: 0 },
        exp1: "Puede armar pelea y no resolver la presión directa.",
        exp2: "Quieres advertir a otros.",
        exp3: "Advertir no necesita insultos ni espectáculo.",
        tip: "Mejor: bloquear/reportar en privado y avisar a un adulto de confianza."
      },
      {
        txt: "Quedarte en la sala a ver qué trucos te enseña y no contarle a nadie.",
        level: "danger",
        points: 0,
        dims: { pausa: 0, limites: 0, confianza: 0, ayuda: 0 },
        exp1: "Te quedas bajo presión y aceptando el secreto.",
        exp2: "Decidiste no salir de la sala.",
        exp3: "Evitar contarle a nadie aumenta la situación de aislamiento.",
        tip: "Si algo te hace sentir incómodo/a, habla con un adulto de confianza."
      }
    ]
  }
];
