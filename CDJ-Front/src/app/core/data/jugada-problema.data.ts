// CDJ-GAME-P06 · La jugada no era el problema
// Dimensiones: criterio, apoyo, evidencia, comunidad

export interface JugadaOption {
  txt:     string;
  level:   'best' | 'partial' | 'risk' | 'danger';
  points:  number;
  dims:    { criterio: number; apoyo: number; evidencia: number; comunidad: number };
  exp1:    string;  // Lo que hiciste bien
  exp2:    string;  // Lo que faltó
  tip:     string;  // Para la vida real
}

export type JugadaFeedItem =
  | { type: 'sys';    text: string }
  | { type: 'msg';    author: string; role: string; avatar: string; color: string; text: string; isMe?: boolean }
  | { type: 'clip';   author: string; title: string; meta: string }
  | { type: 'report'; title: string; content: string }
  | { type: 'rule';   label: string; text: string };

export interface JugadaMission {
  id:     string;
  ch:     string;        // Canal de Discord
  desc:   string;        // Nombre corto de la escena
  brief:  string;        // Texto del brief en juego
  locked: string;        // Texto señal bloqueada
  sig:    string;        // Señal desbloqueada
  q:      string;        // Pregunta de decisión
  feed:   JugadaFeedItem[];
  ops:    JugadaOption[];
}

export const JUGADA_DATA: JugadaMission[] = [
  {
    id: 'M1', ch: 'chat-partida', desc: 'Después de la jugada',
    brief: 'Revisión de partida que empieza a moverse de la jugada a la persona.',
    locked: '🔒 Señal 1', sig: 'La conversación dejó la jugada y fijó su atención en una persona',
    q: 'La partida acaba de terminar y el chat comenta la entrada de Vega. ¿Qué haces?',
    feed: [
      { type: 'sys',  text: 'Post-partida · #chat-partida' },
      { type: 'msg',  author: 'Vega',  role: 'jugadora', avatar: 'V', color: 'pink',   text: 'Mi entrada salió mal. Pensé que Byte tenía utilidad lista.' },
      { type: 'msg',  author: 'Byte',  role: 'soporte',  avatar: 'B', color: 'blue',   text: 'La tenía tarde. También me equivoqué en timing.' },
      { type: 'msg',  author: 'Kron',  role: 'duelist',  avatar: 'K', color: 'purple', text: 'No sé si fue timing. Esa entrada ya la habíamos visto antes.' },
      { type: 'msg',  author: 'Rafa',  role: 'flex',     avatar: 'R', color: 'gold',   text: 'Puede ser, pero también entramos partidos.' },
      { type: 'msg',  author: 'Tú',    role: '',         avatar: 'T', color: 'green',  text: '', isMe: true },
    ],
    ops: [
      {
        txt: 'Proponer revisar la ronda por partes: llamada, timing, utilidad y entrada.',
        level: 'best', points: 4,
        dims: { criterio: 2, apoyo: 1, evidencia: 0, comunidad: 1 },
        exp1: 'Regresas la conversación a hechos revisables sin negar el error.',
        exp2: 'Si alguien insiste en personalizar, habrá que marcar límite.',
        tip:  'Una revisión justa mira la jugada completa, no solo a quien quedó más visible.',
      },
      {
        txt: 'Decir que probablemente fue error de Vega, pero que lo revisen con calma.',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'No entraste en burla ni insulto.',
        exp2: 'La frase inclina la explicación hacia una persona antes de revisar todo.',
        tip:  'Una opinión moderada también puede fijar una culpa demasiado pronto.',
      },
      {
        txt: 'Pedir que pasen rápido a la siguiente partida.',
        level: 'risk', points: 1,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'Intentas que el grupo no se quede atorado.',
        exp2: 'Cerrar pronto puede dejar una versión incompleta instalada.',
        tip:  'No todo conflicto necesita larga discusión, pero algunos sí necesitan contexto.',
      },
      {
        txt: '"Otra vez la misma entrada, por eso perdemos."',
        level: 'danger', points: 0,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'Buscas señalar un posible patrón.',
        exp2: 'Convierte una jugada en etiqueta personal sin revisar contexto.',
        tip:  'Una cosa es detectar patrón; otra es usarlo para etiquetar a alguien.',
      },
    ],
  },

  {
    id: 'M2', ch: 'voz', desc: 'El canal de voz se cruza',
    brief: 'El desacuerdo pasa a voz. El grupo intenta ordenar qué ocurrió.',
    locked: '🔒 Señal 2', sig: 'La forma de hablar empieza a pesar tanto como el contenido',
    q: 'En voz, varias personas hablan encima. ¿Cómo respondes?',
    feed: [
      { type: 'sys',  text: 'Canal de voz · 5 conectados' },
      { type: 'msg',  author: 'Kron',  role: 'duelist', avatar: 'K', color: 'purple', text: 'Si alguien llama así, luego no se queje.' },
      { type: 'msg',  author: 'Jules', role: 'sniper',  avatar: 'J', color: 'cyan',   text: 'Podemos revisar la llamada sin hacerlo personal.' },
      { type: 'msg',  author: 'Rafa',  role: 'flex',    avatar: 'R', color: 'gold',   text: 'Una persona a la vez, por favor.' },
      { type: 'msg',  author: 'Vega',  role: 'jugadora',avatar: 'V', color: 'pink',   text: 'Si lo usan para revisar, va. Si es para burlarse, no.' },
      { type: 'msg',  author: 'Tú',    role: '',        avatar: 'T', color: 'green',  text: '', isMe: true },
    ],
    ops: [
      {
        txt: '"Una persona a la vez; revisemos hechos y luego cerramos."',
        level: 'best', points: 4,
        dims: { criterio: 1, apoyo: 1, evidencia: 0, comunidad: 2 },
        exp1: 'Pones una regla de conversación sin cancelar la revisión.',
        exp2: 'Si alguien sigue interrumpiendo, quizá se necesite pausa o moderación.',
        tip:  'La convivencia digital también se juega en cómo se organiza una conversación.',
      },
      {
        txt: 'Apoyar que hable primero quien tenga más experiencia en ranked.',
        level: 'risk', points: 1,
        dims: { criterio: 1, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'Buscas ordenar la discusión.',
        exp2: 'Puede reforzar jerarquía aunque no tenga todo el contexto de la ronda.',
        tip:  'Un buen criterio no es solo quién habla, sino qué datos aporta.',
      },
      {
        txt: 'Sugerir que Vega escriba su versión por chat.',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 1, evidencia: 0, comunidad: 0 },
        exp1: 'Buscas una vía menos caótica.',
        exp2: 'Desplaza la carga a ella en vez de ordenar el canal para todos.',
        tip:  'A veces conviene otro canal; otras, corregir el trato en el mismo espacio.',
      },
      {
        txt: 'Decir que no vale la pena revisar nada si ya están alterados.',
        level: 'partial', points: 2,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 1 },
        exp1: 'Evitas que la conversación explote.',
        exp2: 'Pausar no es lo mismo que abandonar el tema por completo.',
        tip:  'Una pausa sirve más si luego hay un cierre concreto.',
      },
    ],
  },

  {
    id: 'M3', ch: 'clips', desc: 'El clip recortado',
    brief: 'Aparece un clip breve de la jugada. No muestra toda la ronda.',
    locked: '🔒 Señal 3', sig: 'El clip puede ser evidencia o versión simplificada',
    q: 'Suben un clip de 8 segundos sobre el error de Vega. ¿Qué haces?',
    feed: [
      { type: 'sys',  text: 'Nuevo clip en #clips' },
      { type: 'clip', author: 'ClipBot', title: '"La llamada de Vega"', meta: 'Recorte de 8 seg · 16 reacciones · 4 compartidos' },
      { type: 'msg',  author: 'Kron',  role: 'duelist', avatar: 'K', color: 'purple', text: 'Lo dejo aquí para revisar qué pasó.' },
      { type: 'msg',  author: 'Jules', role: 'sniper',  avatar: 'J', color: 'cyan',   text: 'Ese clip no muestra que entramos antes ni la utilidad tarde.' },
      { type: 'msg',  author: 'Vega',  role: 'jugadora',avatar: 'V', color: 'pink',   text: 'Si lo usan para revisar, va. Si es para burlarse, no.' },
      { type: 'msg',  author: 'Tú',    role: '',        avatar: 'T', color: 'green',  text: '', isMe: true },
    ],
    ops: [
      {
        txt: 'Pedir que el clip se use solo con contexto: ronda completa y sin burla.',
        level: 'best', points: 4,
        dims: { criterio: 1, apoyo: 1, evidencia: 1, comunidad: 1 },
        exp1: 'Distingues entre usar evidencia y convertirla en espectáculo.',
        exp2: 'Si ya hay reposts burlones, tocará pedir que se bajen.',
        tip:  'La evidencia sirve mejor cuando conserva contexto y propósito.',
      },
      {
        txt: 'Pedir otro clip más largo antes de opinar.',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 0, evidencia: 1, comunidad: 0 },
        exp1: 'No compras la primera versión sin revisar.',
        exp2: 'Mientras pides más material, el recorte sigue circulando con otro tono.',
        tip:  'Pedir evidencia ayuda; también importa frenar usos dañinos en paralelo.',
      },
      {
        txt: 'Abrir una votación rápida sobre quién falló.',
        level: 'risk', points: 1,
        dims: { criterio: 0, apoyo: 0, evidencia: 1, comunidad: 0 },
        exp1: 'Buscas participación del grupo.',
        exp2: 'Convierte una revisión técnica en juicio público por popularidad.',
        tip:  'No todo desacuerdo mejora cuando se vuelve encuesta.',
      },
      {
        txt: 'Reaccionar con emoji de risa porque el clip está editado gracioso.',
        level: 'danger', points: 0,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'No compartiste el clip fuera del servidor.',
        exp2: 'Las reacciones también empujan el tono y la difusión del grupo.',
        tip:  'En comunidades digitales, un emoji puede contar como participación.',
      },
    ],
  },

  {
    id: 'M4', ch: 'dm-apoyo', desc: 'Mensaje privado',
    brief: 'Vega te escribe por DM. Decide cómo responder sin tomar el control por ella.',
    locked: '🔒 Señal 4', sig: 'El apoyo puede acompañar sin quitar agencia a quien lo necesita',
    q: 'Vega te escribe por DM. ¿Qué respuesta ayuda más?',
    feed: [
      { type: 'sys',  text: 'DM recibido · Vega' },
      { type: 'msg',  author: 'Vega', role: 'jugadora', avatar: 'V', color: 'pink', text: 'No me molesta que revisen la jugada. Me molesta que cada error mío se vuelva tema del servidor.' },
      { type: 'msg',  author: 'Vega', role: 'jugadora', avatar: 'V', color: 'pink', text: 'No sé si pedir que bajen el clip o dejarlo pasar.' },
      { type: 'msg',  author: 'Tú',   role: '',         avatar: 'T', color: 'green', text: '', isMe: true },
    ],
    ops: [
      {
        txt: '"¿Quieres que te acompañe a pedir que lo bajen o prefieres solo dejar contexto?"',
        level: 'best', points: 4,
        dims: { criterio: 1, apoyo: 2, evidencia: 1, comunidad: 0 },
        exp1: 'Ofreces apoyo concreto sin decidir por ella.',
        exp2: 'Si hay acoso repetido, conviene escalar más allá del servidor.',
        tip:  'Acompañar es ayudar a que la persona tenga opciones, no tomar el volante.',
      },
      {
        txt: '"Quizá conviene dejarlo pasar para no darle más atención."',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 1, evidencia: 0, comunidad: 0 },
        exp1: 'Te preocupa no agrandar el problema.',
        exp2: 'Dejar pasar no siempre detiene reposts o comentarios.',
        tip:  'Bajar intensidad sirve más cuando se decide junto con la persona afectada.',
      },
      {
        txt: 'Ofrecer escribir tú en el canal para explicar todo por ella.',
        level: 'risk', points: 1,
        dims: { criterio: 0, apoyo: 1, evidencia: 0, comunidad: 0 },
        exp1: 'Quieres apoyarla activamente.',
        exp2: 'Hablar por alguien puede convertirte en protagonista sin quererlo.',
        tip:  'Antes de intervenir por otra persona, pregunta qué necesita y qué autoriza.',
      },
      {
        txt: '"En ranked todos reciben críticas, no lo tomes personal."',
        level: 'danger', points: 0,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'Quizá intentas normalizar el ambiente competitivo.',
        exp2: 'Minimizas lo que ella está diferenciando: crítica de juego vs. exposición personal.',
        tip:  'Competir no elimina el derecho a poner límites.',
      },
    ],
  },

  {
    id: 'M5', ch: 'moderacion', desc: 'Reporte y contexto',
    brief: 'El grupo decide si pedir revisión de moderación sin hacer más grande el conflicto.',
    locked: '🔒 Señal 5', sig: 'La evidencia debe servir sin amplificar la exposición',
    q: 'Van a contactar a moderación. ¿Qué preparas para el reporte?',
    feed: [
      { type: 'sys',    text: '#moderacion · solicitud abierta' },
      { type: 'msg',    author: 'ModZero', role: 'moderador', avatar: 'M', color: 'gray', text: 'Puedo revisar, pero no llenen el canal de capturas repetidas.' },
      { type: 'report', title: 'Borrador de reporte', content: 'Clip recortado + comentarios + petición de bajar reposts de burla' },
      { type: 'msg',    author: 'Rafa',    role: 'flex',     avatar: 'R', color: 'gold', text: 'Necesitamos explicar sin hacer más show.' },
      { type: 'msg',    author: 'Jules',   role: 'sniper',   avatar: 'J', color: 'cyan', text: 'Podemos mandar contexto mínimo.' },
      { type: 'msg',    author: 'Tú',      role: '',         avatar: 'T', color: 'green', text: '', isMe: true },
    ],
    ops: [
      {
        txt: 'Mandar resumen breve, enlace al clip original y dos comentarios relevantes.',
        level: 'best', points: 4,
        dims: { criterio: 1, apoyo: 1, evidencia: 2, comunidad: 1 },
        exp1: 'Haces un reporte revisable sin llenar el canal de exposición.',
        exp2: 'Si Vega aparece en el reporte, conviene confirmar que está de acuerdo.',
        tip:  'Un reporte útil dice qué pasó, dónde, con evidencia mínima y qué se pide.',
      },
      {
        txt: 'Mandar todas las capturas por si moderación necesita panorama completo.',
        level: 'risk', points: 1,
        dims: { criterio: 1, apoyo: 0, evidencia: 1, comunidad: 0 },
        exp1: 'Quieres que no falte información.',
        exp2: 'Puede reexponer y saturar el canal innecesariamente.',
        tip:  'Evidencia suficiente no significa evidencia excesiva.',
      },
      {
        txt: 'Pedir a moderación que revise sin enviar nada todavía.',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 0, evidencia: 0, comunidad: 1 },
        exp1: 'Evitas circular material de más.',
        exp2: 'Sin contexto mínimo, la revisión puede quedar incompleta.',
        tip:  'Lo ideal es poco material, pero bien elegido.',
      },
      {
        txt: 'Armar una encuesta del servidor para decidir si vale la pena reportar.',
        level: 'danger', points: 0,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 0 },
        exp1: 'Buscas que el grupo no exagere.',
        exp2: 'Votar sobre situaciones sensibles las convierte en espectáculo.',
        tip:  'Los reportes no deberían depender de aplausómetro.',
      },
    ],
  },

  {
    id: 'M6', ch: 'reglas', desc: 'Reglas del servidor',
    brief: 'El servidor cierra una regla sobre crítica, clips y trato.',
    locked: '🔒 Señal 6', sig: 'Una regla puede permitir desacuerdo sin burla pública',
    q: 'El servidor redacta una regla nueva. ¿Cuál apoyas?',
    feed: [
      { type: 'sys',  text: '#reglas · edición abierta' },
      { type: 'rule', label: 'Borrador A', text: '"En ranked se permite crítica fuerte, pero sin insultos directos."' },
      { type: 'rule', label: 'Borrador B', text: '"Se puede criticar una jugada con criterios de juego. No se permiten ataques personales, clips para humillar ni reposts fuera de contexto."' },
      { type: 'rule', label: 'Borrador C', text: '"Evitemos hablar de errores después de partida para no crear conflictos."' },
      { type: 'msg',  author: 'Vega', role: 'jugadora', avatar: 'V', color: 'pink', text: 'No quiero ser intocable. Solo que no usen errores para burlarse.' },
      { type: 'msg',  author: 'Tú',   role: '',         avatar: 'T', color: 'green', text: '', isMe: true },
    ],
    ops: [
      {
        txt: 'Apoyar el Borrador B y pedir que quede visible en #reglas.',
        level: 'best', points: 4,
        dims: { criterio: 2, apoyo: 1, evidencia: 1, comunidad: 2 },
        exp1: 'La regla permite crítica útil y corta el uso de clips para humillar.',
        exp2: 'Debe aplicarse a todos por igual, no solo cuando el caso se vuelve visible.',
        tip:  'Una buena comunidad digital permite desacuerdo sin convertirlo en ataque.',
      },
      {
        txt: 'Apoyar el Borrador A porque mantiene competitividad y evita insultos.',
        level: 'partial', points: 2,
        dims: { criterio: 1, apoyo: 0, evidencia: 0, comunidad: 1 },
        exp1: 'No cancela la crítica competitiva.',
        exp2: 'Deja fuera clips, reposts y uso de evidencia fuera de contexto.',
        tip:  'No todo ataque digital se ve como insulto explícito.',
      },
      {
        txt: 'Apoyar el Borrador C para cuidar el ambiente.',
        level: 'risk', points: 1,
        dims: { criterio: 0, apoyo: 1, evidencia: 0, comunidad: 0 },
        exp1: 'Quieres proteger el ambiente del servidor.',
        exp2: 'Silenciar toda crítica puede esconder problemas en vez de resolverlos.',
        tip:  'La clave es cómo se critica, no prohibir toda revisión.',
      },
      {
        txt: 'Dejar solo "sean respetuosos" y que moderación vea caso por caso.',
        level: 'partial', points: 2,
        dims: { criterio: 0, apoyo: 0, evidencia: 0, comunidad: 1 },
        exp1: 'Evitas una regla demasiado larga.',
        exp2: 'Sin ejemplos ni ruta, cada quien interpreta distinto cuando hay clips.',
        tip:  'Las reglas breves sirven si explican qué hacer cuando algo pasa.',
      },
    ],
  },
];
