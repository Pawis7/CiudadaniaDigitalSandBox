// CDJ-PB-GAME-P01 · ¿Quién entra a mi mundo?
// Segmento: Secundaria · 12 a 14 años
// Dimensiones: pausa, limite, datos, ayuda

export interface QuienEntraOption {
  txt:     string;
  level:   'best' | 'partial' | 'risk' | 'danger';
  points:  number;
  dims:    { pausa: number; limite: number; datos: number; ayuda: number };
  exp1:    string;  // ¿Qué hiciste bien?
  exp2:    string;  // Señal
  tip:     string;  // Prueba esto
}

export type QuienEntraFeedItem =
  | { type: 'sys';  text: string }
  | { type: 'msg';  author: string; role: string; avatar: string; color: string; text: string; isMe?: boolean }
  | { type: 'inv';  title: string; sub: string }
  | { type: 'alert'; text: string };

export interface QuienEntraMission {
  id:     string;
  ch:     string;      // "canal" (sala del juego)
  desc:   string;      // Nombre corto de escena
  brief:  string;      // Texto contexto
  locked: string;      // Señal bloqueada
  sig:    string;      // Señal desbloqueada
  why:    string;      // ¿Por qué importa?
  q:      string;      // Pregunta de decisión
  feed:   QuienEntraFeedItem[];
  ops:    QuienEntraOption[];
}

export const QUIEN_ENTRA_DATA: QuienEntraMission[] = [
  {
    id: 'M1', ch: 'plaza-central', desc: 'Alguien quiere entrar',
    brief: 'Mini está construyendo una casa en MiniMundo. Aparece una invitación de alguien desconocido.',
    locked: '🔒 Señal 1', sig: 'No sé quién es esta persona',
    why: 'No todas las personas del juego son amigas. Antes de aceptar, pausa y pregunta.',
    q: 'PixelRayo quiere entrar a tu mundo. ¿Qué haces?',
    feed: [
      { type: 'sys',  text: 'Plaza de MiniMundo' },
      { type: 'msg',  author: 'Nube',     role: 'amiga',    avatar: 'N', color: 'blue',   text: 'Tu casa quedó bonita, Mini.' },
      { type: 'inv',  title: 'PixelRayo quiere entrar', sub: 'jugador desconocido · trae regalos' },
      { type: 'msg',  author: 'Mini',     role: '',         avatar: 'M', color: 'purple', text: 'Veo la invitación…', isMe: true },
    ],
    ops: [
      {
        txt: 'Pregunto a un adulto antes de aceptar.',
        level: 'best', points: 4,
        dims: { pausa: 2, limite: 1, datos: 0, ayuda: 2 },
        exp1: '¡Muy bien! Pediste ayuda antes de decidir.',
        exp2: 'No sé quién es',
        tip:  'Di: "¿puedo aceptar esta invitación?"',
      },
      {
        txt: 'Acepto porque trae regalos.',
        level: 'danger', points: 0,
        dims: { pausa: 0, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'El regalo te apuró.',
        exp2: 'No conoces a esa persona',
        tip:  'Los regalos no hacen a alguien amigo. Primero pregunta.',
      },
      {
        txt: 'Digo: "solo juego con personas que conozco".',
        level: 'best', points: 4,
        dims: { pausa: 1, limite: 2, datos: 0, ayuda: 0 },
        exp1: '¡Buen límite! Dijiste no con calma.',
        exp2: 'No tienes que aceptar a todos',
        tip:  'Puedes decir: "ahora no, gracias".',
      },
      {
        txt: 'Lo dejo esperando y sigo jugando.',
        level: 'partial', points: 2,
        dims: { pausa: 1, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'Pausaste, pero no cerraste.',
        exp2: 'No aceptaste rápido',
        tip:  'Si insiste, pide ayuda o bloquea.',
      },
    ],
  },

  {
    id: 'M2', ch: 'chat-privado', desc: 'Mensaje secreto',
    brief: 'PixelRayo manda un mensaje aparte con un truco "secreto" para Mini.',
    locked: '🔒 Señal 2', sig: 'Alguien pide guardar secreto',
    why: 'Los secretos en juegos pueden impedir pedir ayuda cuando algo se siente raro.',
    q: 'PixelRayo dice: "no le digas a nadie". ¿Qué haces?',
    feed: [
      { type: 'sys',  text: 'Chat privado con PixelRayo' },
      { type: 'msg',  author: 'PixelRayo', role: 'jugador', avatar: 'P', color: 'red',    text: 'Te doy un truco si no le dices a Nube.' },
      { type: 'msg',  author: 'PixelRayo', role: 'jugador', avatar: 'P', color: 'red',    text: 'Es secreto, ¿de acuerdo?' },
      { type: 'msg',  author: 'Mini',      role: '',        avatar: 'M', color: 'purple', text: 'Leo el mensaje…', isMe: true },
    ],
    ops: [
      {
        txt: 'Le digo a un adulto: "me pidieron un secreto".',
        level: 'best', points: 4,
        dims: { pausa: 1, limite: 1, datos: 0, ayuda: 3 },
        exp1: '¡Excelente! No guardaste el secreto.',
        exp2: 'Pedir secreto es una señal',
        tip:  'Puedes contar aunque no estés seguro o segura.',
      },
      {
        txt: 'Prometo guardar el secreto.',
        level: 'danger', points: 0,
        dims: { pausa: 0, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'Aceptaste el secreto.',
        exp2: 'Eso te deja solo o sola',
        tip:  'Mejor avisa a un adulto.',
      },
      {
        txt: 'Le digo: "no juego en secreto".',
        level: 'best', points: 4,
        dims: { pausa: 1, limite: 2, datos: 0, ayuda: 0 },
        exp1: '¡Muy bien! Pusiste una regla clara.',
        exp2: 'Secreto y juego no combinan',
        tip:  'Di: "no juego en secreto".',
      },
      {
        txt: 'No contesto, pero sigo leyendo el mensaje.',
        level: 'partial', points: 2,
        dims: { pausa: 1, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'No aceptaste, pero sigues ahí.',
        exp2: 'El mensaje sigue abierto',
        tip:  'Cierra el chat o pide ayuda.',
      },
    ],
  },

  {
    id: 'M3', ch: 'perfil', desc: 'Pregunta de datos',
    brief: 'PixelRayo empieza a hacer preguntas personales a Mini en el chat.',
    locked: '🔒 Señal 3', sig: 'Alguien pide datos personales',
    why: 'Edad, escuela, casa o nombre real no hacen falta para jugar.',
    q: 'PixelRayo pregunta tu edad y tu escuela. ¿Qué haces?',
    feed: [
      { type: 'sys',  text: 'Chat activo con PixelRayo' },
      { type: 'msg',  author: 'PixelRayo', role: 'jugador', avatar: 'P', color: 'red',    text: '¿Cuántos años tienes?' },
      { type: 'msg',  author: 'PixelRayo', role: 'jugador', avatar: 'P', color: 'red',    text: '¿A qué escuela vas?' },
      { type: 'msg',  author: 'Mini',      role: '',        avatar: 'M', color: 'purple', text: 'Veo las preguntas…', isMe: true },
    ],
    ops: [
      {
        txt: 'No respondo y digo: "solo hablo del juego".',
        level: 'best', points: 4,
        dims: { pausa: 1, limite: 1, datos: 3, ayuda: 0 },
        exp1: '¡Muy bien! Cuidaste tus datos.',
        exp2: 'Edad y escuela son datos tuyos',
        tip:  'Di: "solo hablo del juego".',
      },
      {
        txt: 'Digo solo mi edad.',
        level: 'danger', points: 0,
        dims: { pausa: 0, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'La edad también es un dato.',
        exp2: 'Un dato pequeño también cuenta',
        tip:  'Para jugar no hace falta decir tu edad.',
      },
      {
        txt: 'Invento una escuela falsa.',
        level: 'partial', points: 2,
        dims: { pausa: 1, limite: 0, datos: 1, ayuda: 0 },
        exp1: 'No diste tu escuela real.',
        exp2: 'Pero sigues en la charla',
        tip:  'Mejor di no y sal del chat.',
      },
      {
        txt: 'Le pregunto su escuela primero.',
        level: 'danger', points: 0,
        dims: { pausa: 0, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'Ahora hablan de escuelas.',
        exp2: 'Más datos no dan seguridad',
        tip:  'No investigues: no compartas.',
      },
    ],
  },

  {
    id: 'M4', ch: 'menu-ayuda', desc: 'Cerrar y avisar',
    brief: 'PixelRayo presiona para que Mini entre ya. Nube pregunta si todo está bien.',
    locked: '🔒 Señal 4', sig: 'Siento que necesito ayuda',
    why: 'Salir, bloquear y avisar puede cortar la presión cuando algo se siente raro.',
    q: '¿Cómo cierras esta situación?',
    feed: [
      { type: 'sys',  text: 'Menú de seguridad — MiniMundo' },
      { type: 'msg',  author: 'PixelRayo', role: 'jugador', avatar: 'P', color: 'red',    text: '¿Por qué tardas? Entra ya.' },
      { type: 'msg',  author: 'Nube',      role: 'amiga',   avatar: 'N', color: 'blue',   text: '¿Todo bien, Mini?' },
      { type: 'msg',  author: 'Mini',      role: '',        avatar: 'M', color: 'purple', text: 'Toca decidir.', isMe: true },
    ],
    ops: [
      {
        txt: 'Salgo, bloqueo si insiste y aviso a un adulto.',
        level: 'best', points: 4,
        dims: { pausa: 1, limite: 2, datos: 0, ayuda: 3 },
        exp1: '¡Gran cierre! Te cuidaste muy bien.',
        exp2: 'La presión ya apareció',
        tip:  'Salir y avisar ayuda mucho.',
      },
      {
        txt: 'Solo cierro el juego.',
        level: 'partial', points: 2,
        dims: { pausa: 1, limite: 1, datos: 0, ayuda: 0 },
        exp1: 'Salir ayuda.',
        exp2: 'Pero puede faltar avisar',
        tip:  'Cuéntale a un adulto qué pasó.',
      },
      {
        txt: 'Le digo en el chat que es malo.',
        level: 'risk', points: 1,
        dims: { pausa: 0, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'Puede empezar un problema.',
        exp2: 'Quieres defenderte',
        tip:  'Mejor bloquea y avisa.',
      },
      {
        txt: 'Sigo jugando, pero ya no contesto.',
        level: 'partial', points: 2,
        dims: { pausa: 1, limite: 0, datos: 0, ayuda: 0 },
        exp1: 'Dejas de responder.',
        exp2: 'Pero la presión sigue cerca',
        tip:  'Mejor sal del chat y avisa.',
      },
    ],
  },
];
