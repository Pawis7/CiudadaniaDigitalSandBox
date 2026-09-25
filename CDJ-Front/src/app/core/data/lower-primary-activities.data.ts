export interface LowerPrimaryObject {
  id: string;
  label: string;
  image: string;
  description?: string;
  correctTargets: string[];
  successFeedback: string;
  errorFeedback: string;
  feedbackByTarget?: Record<string, string>;
  clue?: { title: string; text: string };
  /** Positive wording shown after placing the object and in the final agreement. */
  resultText?: string;
}

export interface LowerPrimaryZone {
  id: string;
  label: string;
  hint: string;
  icon?: string;
  capacity?: number;
}

export interface LowerPrimaryRound {
  id: string;
  title: string;
  context: string;
  instruction: string;
  objects: LowerPrimaryObject[];
  zones: LowerPrimaryZone[];
  success: string;
}

export interface LowerPrimaryBoard {
  id: string;
  title: string;
  subtitle: string;
  instruction: string;
  mode: 'footprints' | 'evidence' | 'chat' | 'day' | 'tools' | 'agreements';
  rounds: LowerPrimaryRound[];
  success: string;
}

const picture = (id: string): string => `/primaria-baja/objetos-v2/${id}.png`;

export const LOWER_PRIMARY_BOARDS: LowerPrimaryBoard[] = [
  {
    id: 'rastro-de-bit',
    title: 'El rastro de Bit',
    subtitle: 'Huella e identidad digital',
    mode: 'footprints',
    instruction: 'Sigue las huellas de Bit. Mueve cada acción al lugar donde deja un rastro y después descubre quién puede verlo. Puedes escuchar cada objeto.',
    rounds: [
      {
        id: 'donde-queda',
        title: '¿Dónde quedó la huella?',
        context: 'Bit usa la tableta de la clase. Algunas acciones quedan guardadas en ella y otras llegan al grupo.',
        instruction: 'Coloca cada acción donde quedó su rastro en este caso.',
        zones: [
          { id: 'dispositivo', label: 'Queda en la tableta', hint: 'Guardado aquí, sin enviarlo al grupo', icon: 'tablet_mac' },
          { id: 'grupo', label: 'Llega al grupo', hint: 'El equipo recibe una copia', icon: 'groups' },
        ],
        objects: [
          {
            id: 'buscar-dinosaurios', label: 'Buscar dinosaurios', image: picture('busqueda'),
            description: 'Bit busca dinosaurios. El navegador tiene el historial activado.', correctTargets: ['dispositivo'],
            successFeedback: 'La búsqueda aparece en el historial de la tableta. Quien use ese navegador podría encontrarla.',
            errorFeedback: 'Bit no envió la búsqueda al grupo. En este caso seguimos el rastro que quedó en el historial.',
            resultText: 'Huella: búsqueda guardada en el historial.',
          },
          {
            id: 'enviar-dibujo', label: 'Enviar un dibujo', image: picture('dibujo'),
            description: 'Con la maestra, Bit envía su dibujo al grupo de la clase.', correctTargets: ['grupo'],
            successFeedback: 'El grupo recibe el dibujo. Aunque Bit borre su copia, alguien del grupo podría conservarlo.',
            errorFeedback: 'El dibujo también puede estar en la tableta, pero Bit ya lo envió: su huella llegó a otras personas.',
            resultText: 'Huella: dibujo recibido por la clase.',
          },
          {
            id: 'guardar-foto', label: 'Guardar una foto', image: picture('foto'),
            description: 'Bit guarda una foto de su planta en la tableta. No la envía ni la sube a internet.', correctTargets: ['dispositivo'],
            successFeedback: 'La foto queda en la galería de esta tableta. Todavía no se ha enviado al grupo.',
            errorFeedback: 'En este caso la foto no se compartió. Busca el lugar donde Bit la guardó.',
            resultText: 'Huella: foto en la galería.',
          },
          {
            id: 'escribir-equipo', label: 'Escribir al equipo', image: picture('mensaje-ayuda'),
            description: 'En el espacio de la clase, Bit escribe: «Yo llevo las semillas».', correctTargets: ['grupo'],
            successFeedback: 'El mensaje queda en la conversación de la clase. Las otras personas pueden leerlo después.',
            errorFeedback: 'Bit escribió al equipo: el mensaje ya llegó a sus compañeros, no se quedó solo en su tableta.',
            resultText: 'Huella: mensaje en la conversación.',
          },
        ],
        success: 'Buscar, guardar y enviar dejan rastros distintos. Aquí seguimos sus copias; los servicios también pueden guardar información de uso.',
      },
      {
        id: 'quien-la-ve',
        title: '¿Quién puede ver la huella?',
        context: 'Ahora Bit revisa dónde guardó o compartió sus creaciones. El lugar cambia quién puede verlas.',
        instruction: 'Une cada objeto con las personas que pueden verlo en esta situación.',
        zones: [
          { id: 'tableta', label: 'Quien use la tableta', hint: 'Archivo guardado aquí, sin enviarlo', icon: 'tablet_mac' },
          { id: 'clase', label: 'El grupo de la clase', hint: 'Enviado al espacio del grupo', icon: 'groups' },
          { id: 'publico', label: 'Cualquier visitante', hint: 'Publicado en una página abierta', icon: 'public' },
        ],
        objects: [
          {
            id: 'foto-local', label: 'Foto sin enviar', image: picture('foto'),
            description: 'La foto sigue en la galería de la tableta compartida, sin subirla a internet.', correctTargets: ['tableta'],
            successFeedback: 'Quien tenga acceso a la galería puede verla. Guardarla aquí no la hace pública.',
            errorFeedback: 'La foto no se ha enviado ni publicado: piensa quién puede abrir la galería de esa tableta.',
            feedbackByTarget: {
              clase: 'No se envió al grupo. Solo tener una foto en la galería no la comparte con la clase.',
              publico: 'No se publicó en una página abierta. El rastro que seguimos está en la tableta.',
            },
            resultText: 'Galería: visible para quien acceda a la tableta.',
          },
          {
            id: 'dibujo-grupo', label: 'Dibujo para la clase', image: picture('dibujo'),
            description: 'La maestra ayuda a Bit a enviarlo al espacio privado de la clase.', correctTargets: ['clase'],
            successFeedback: 'Lo ve el grupo de la clase. Si alguien hace una copia y la comparte, podría llegar a más personas.',
            errorFeedback: 'Mira a quién se envió el dibujo: al grupo de la clase.',
            feedbackByTarget: {
              tableta: 'El dibujo salió de la tableta cuando se envió. El grupo también recibió una copia.',
              publico: 'En este caso se envió al grupo, no a una página pública. Aun así, una copia podría salir del grupo.',
            },
            resultText: 'Grupo: la clase recibe el dibujo.',
          },
          {
            id: 'cartel-publico', label: 'Cartel en la web', image: picture('aviso'),
            description: 'Con permiso del grupo, la escuela publica el cartel sin datos personales en su página abierta.', correctTargets: ['publico'],
            successFeedback: 'Cualquier visitante de esa página puede ver el cartel. Por eso revisaron su contenido antes de publicarlo.',
            errorFeedback: 'La página está abierta: no hace falta pertenecer al grupo ni usar su tableta para verla.',
            resultText: 'Página abierta: cualquier visitante puede verlo.',
          },
          {
            id: 'audio-grupo', label: 'Audio para el equipo', image: picture('microfono'),
            description: 'Bit envía una explicación de la maqueta solo al espacio de la clase.', correctTargets: ['clase'],
            successFeedback: 'La clase puede escuchar el audio. También puede guardarlo: enviar deja una copia fuera de nuestra tableta.',
            errorFeedback: 'El audio se envió al espacio de la clase. Revisa quién participa allí.',
            feedbackByTarget: {
              tableta: 'El audio ya salió de la tableta: el equipo recibió una copia.',
              publico: 'Bit no lo publicó en una página abierta. Lo recibió la clase; una copia podría compartirse después.',
            },
            resultText: 'Grupo: el equipo puede escuchar el audio.',
          },
        ],
        success: 'Antes de enviar o publicar, miro quién podrá verlo. Compartir con un grupo tampoco impide que alguien haga una copia.',
      },
    ],
    success: 'Lo que hacemos con tecnología puede dejar huellas. Podemos revisar dónde se guardan, quién las ve y qué queremos compartir.',
  },
  {
    id: 'lo-sabemos-o-preguntamos',
    title: '¿Lo sabemos o lo preguntamos?',
    subtitle: 'Pensamiento crítico inicial',
    mode: 'evidence',
    instruction: 'Abre las pistas de cada mensaje. Mira quién lo cuenta, de cuándo es y qué muestra. Después colócalo donde corresponda. No hace falta adivinar.',
    rounds: [
      {
        id: 'visita-parque',
        title: '¿La visita al parque es mañana?',
        context: 'En este juego hoy es 8 de octubre. La clase quiere saber si su visita al parque será el día 9.',
        instruction: 'Abre la pista de cada objeto y decide si ayuda a resolver este caso.',
        zones: [
          { id: 'pista', label: 'Ayuda en este caso', hint: 'Coincide con esta clase y esta fecha', icon: 'search' },
          { id: 'comprobar', label: 'Falta comprobar', hint: 'No alcanza o corresponde a otro caso', icon: 'help' },
        ],
        objects: [
          {
            id: 'aviso-actual', label: 'Aviso del parque', image: picture('aviso'),
            description: 'Un aviso dice que habrá una visita. Abre la pista para ver de qué grupo y fecha habla.',
            correctTargets: ['pista'],
            clue: { title: 'Fuente, fecha y grupo', text: 'Lo publica nuestra escuela el 7 de octubre. Dice: «La clase de Bit visitará el parque el 9 de octubre». Coincide con el grupo y el día que investigamos.' },
            successFeedback: 'Este aviso sí aporta una pista: nombra a nuestra clase y al 9 de octubre. Podemos compararlo con su agenda.',
            errorFeedback: 'Al abrir la pista vimos el grupo y la fecha que buscamos. Nos ayuda por esos datos, no solo porque dice «escuela».',
          },
          {
            id: 'aviso-otra-clase', label: 'Salida cancelada', image: picture('reenviado'),
            description: 'Alguien reenvía un aviso que dice «La salida se cancela». Mira la letra pequeña.',
            correctTargets: ['comprobar'],
            clue: { title: '¿A quién corresponde?', text: 'El aviso sí viene de una escuela, pero es de otra clase. Tiene fecha del 15 de mayo y habla de una salida al museo, no de nuestra visita al parque.' },
            successFeedback: 'La fuente puede ser real y aun así hablar de otro caso. Este aviso no dice qué pasará con nuestra visita.',
            errorFeedback: 'Ese aviso es de mayo, de otra clase y de otro lugar. No confirma una cancelación para el grupo de Bit.',
          },
          {
            id: 'agenda-grupo', label: 'Agenda de la clase', image: picture('calendario'),
            description: 'La agenda del grupo tiene una anotación. Abre la pista para leerla.',
            correctTargets: ['pista'],
            clue: { title: 'La anotación completa', text: 'La maestra y la clase anotaron el 7 de octubre: «Visita al parque: 9 de octubre». La anotación corresponde al grupo de Bit y coincide con el aviso actual.' },
            successFeedback: 'La agenda coincide con el aviso en grupo, lugar y día. Juntas nos ayudan a responder la pregunta.',
            errorFeedback: 'La agenda tiene el día y el lugar de esta visita. Compararla con el aviso nos da otra pista útil.',
          },
          {
            id: 'audio-sin-datos', label: '«Mañana no vamos»', image: picture('microfono'),
            description: 'Un audio reenviado dice que mañana no habrá salida. ¿De cuándo será?',
            correctTargets: ['comprobar'],
            clue: { title: 'Los datos que faltan', text: 'No sabemos quién grabó el audio ni qué día lo hizo. Tampoco menciona escuela, grupo o lugar. «Mañana» cambia según el día en que se grabó.' },
            successFeedback: 'No sabemos a qué «mañana» se refiere. Antes de compartirlo, necesitamos averiguar de dónde salió y de qué visita habla.',
            errorFeedback: 'El audio no tiene fecha ni grupo. Aunque suene seguro, todavía no demuestra qué pasará en esta visita.',
          },
        ],
        success: 'El aviso actual y la agenda coinciden: la visita de esta clase es el 9. Si llega un cambio, revisamos un aviso nuevo con una persona adulta.',
      },
      {
        id: 'semillas',
        title: '¿Todas las semillas brotan en un día?',
        context: 'Bit vio una planta crecer muy rápido en un video. El equipo quiere comprobar cuánto tarda una semilla.',
        instruction: 'Abre cada pista. Separa lo que aporta información de lo que aún necesita comprobarse.',
        zones: [
          { id: 'pista', label: 'Aporta información', hint: 'Muestra cómo o cuándo se observó', icon: 'search' },
          { id: 'comprobar', label: 'Falta comprobar', hint: 'No muestra el tiempo o faltan datos', icon: 'help' },
        ],
        objects: [
          {
            id: 'video-acelerado', label: 'Planta en segundos', image: picture('video'),
            description: 'En un video la semilla se convierte enseguida en una planta grande.', correctTargets: ['comprobar'],
            clue: { title: '¿Pasó tanto tiempo?', text: 'No aparece quién lo grabó ni las fechas. Se ven saltos entre las imágenes: primero hay una semilla y después una planta. El video no muestra cuánto tiempo pasó de verdad.' },
            successFeedback: 'Un video puede recortar o acelerar el tiempo. Estas imágenes no prueban que la planta creciera en un día.',
            errorFeedback: 'Durar pocos segundos no significa que la planta tardara eso en crecer. Faltan las fechas de las imágenes.',
          },
          {
            id: 'registro-frijol', label: 'Nuestro registro', image: picture('cuaderno'),
            description: 'El equipo dibujó su frijol durante varios días.', correctTargets: ['pista'],
            clue: { title: 'Observaciones con fecha', text: 'La clase plantó el frijol el lunes 1. Lo observó cada día y anotó el primer brote el jueves 4. Las fechas y dibujos están en su cuaderno.' },
            successFeedback: 'Este frijol tardó varios días. Es una observación que nos ayuda a ver que no todas las semillas brotan al día siguiente.',
            errorFeedback: 'El registro muestra qué observaron y cuándo. Esa información sí nos ayuda, aunque otras semillas puedan tardar diferente.',
          },
          {
            id: 'foto-brote', label: 'Foto de un brote', image: picture('foto'),
            description: 'Una foto muestra una semilla con un brote verde.', correctTargets: ['comprobar'],
            clue: { title: 'Lo que la foto no cuenta', text: 'Vemos un brote, pero la foto no dice cuándo se sembró ni cuándo se tomó. Podemos ver la planta, pero no saber cuánto tardó solo con esta imagen.' },
            successFeedback: 'La foto muestra un brote; no muestra los días de espera. Necesitamos la fecha de siembra y la de la foto.',
            errorFeedback: 'La imagen sí muestra una planta, pero nuestra pregunta trata del tiempo. Esos datos faltan.',
          },
          {
            id: 'libro-semillas', label: 'Libro de plantas', image: picture('cuaderno'),
            description: 'El equipo busca en un libro cómo nacen las plantas.', correctTargets: ['pista'],
            clue: { title: '¿Qué explica la página?', text: 'La página de un libro infantil sobre plantas explica: las semillas necesitan condiciones adecuadas y pueden tardar varios días en brotar. El tiempo cambia según la semilla. Esa explicación coincide con el registro de la clase.' },
            successFeedback: 'La explicación y lo observado en clase coinciden: las semillas pueden tardar diferente. Podemos seguir observando y anotando.',
            errorFeedback: 'Esta página explica el tiempo de germinación y coincide con el registro. Nos ayuda por lo que explica, no solo por estar en un libro.',
          },
        ],
        success: 'Las imágenes sorprendentes pueden dejar fuera información. Preguntar, mirar fechas y comparar con lo observado nos ayuda a entender.',
      },
    ],
    success: 'No tenemos que adivinar. Podemos decir «todavía no lo sé», abrir las pistas y pedir ayuda para comprobar.',
  },
  {
    id: 'chat-del-equipo', title: 'El chat del equipo', subtitle: 'Convivencia digital', mode: 'chat',
    instruction: 'Lee o escucha lo que pasó en el equipo. Mueve los mensajes que ayudan a la conversación y lleva los que lastiman al taller de cambios.',
    rounds: [
      {
        id: 'error-cartel', title: 'Ana necesita ayuda',
        context: 'En la conversación de una actividad de clase, Ana escribe: «Me equivoqué y borré parte del cartel. No sé cómo arreglarlo».',
        instruction: 'Envía apoyo a Ana. Lleva las burlas al taller para convertirlas en ayuda.',
        zones: [
          { id: 'equipo', label: 'Enviar al equipo', hint: 'Acompañar y buscar una solución', icon: 'forum' },
          { id: 'taller', label: 'Taller de mensajes', hint: 'Cambiar las palabras antes de enviarlas', icon: 'edit' },
        ],
        objects: [
          {
            id: 'ayudar-reconstruir', label: '«Lo reconstruimos juntos»', image: picture('mensaje-ayuda'),
            description: 'Ofrecer ayuda para recuperar el cartel.', correctTargets: ['equipo'],
            successFeedback: 'Ana responde: «Gracias. Yo recuerdo el título; podemos empezar por ahí». El equipo vuelve a colaborar.',
            errorFeedback: 'Este mensaje ya ofrece ayuda. Puede ir a la conversación para que Ana sepa que cuenta con el equipo.',
            resultText: 'Lo reconstruimos juntos.',
          },
          {
            id: 'burla-error', label: '«¡Siempre lo arruinas!»', image: picture('mensaje-burla'),
            description: 'Culpar a Ana por todo en lugar de ayudar.', correctTargets: ['taller'],
            successFeedback: 'Lo cambiamos por «¿Qué parte se borró? Te ayudo». Ana responde: «El dibujo de abajo. Gracias por preguntar».',
            errorFeedback: 'Ese mensaje puede avergonzar a Ana y no repara el cartel. Llévalo al taller para convertirlo en una ayuda concreta.',
            resultText: '¿Qué parte se borró? Te ayudo.',
          },
          {
            id: 'pedir-apoyo', label: '«Preguntemos a la maestra»', image: picture('familia'),
            description: 'Pedir apoyo para saber si se puede recuperar el trabajo.', correctTargets: ['equipo'],
            successFeedback: 'Ana responde: «Sí, podemos preguntarle cómo recuperar la versión anterior». Pedir ayuda también es colaborar.',
            errorFeedback: 'Pedir apoyo para recuperar el trabajo sí ayuda. Este mensaje puede llegar al equipo.',
            resultText: 'Pidamos ayuda para recuperar el trabajo.',
          },
          {
            id: 'excluir-ana', label: '«Ya no participes»', image: picture('mensaje-presion'),
            description: 'Sacar a Ana del equipo por haberse equivocado.', correctTargets: ['taller'],
            successFeedback: 'Lo cambiamos por «Ana, ¿qué parte quieres ayudar a rehacer?». Ana responde: «Puedo volver a dibujar las hojas».',
            errorFeedback: 'Excluir a alguien por un error no soluciona el trabajo. En el taller podemos invitarle a repararlo.',
            resultText: 'Ana, ¿qué parte quieres ayudar a rehacer?',
          },
        ],
        success: 'Los errores se pueden reparar. Escribir con respeto permite seguir participando y buscar una solución juntos.',
      },
      {
        id: 'sticker-permiso', title: 'Sara pone un límite',
        context: 'En el cartel digital de la clase alguien puso un sticker con la foto de Sara. Ella escribe: «No quiero que usen mi foto. Quítenla, por favor».',
        instruction: 'Ayuda al equipo a respetar el límite de Sara y reparar lo que pasó.',
        zones: [
          { id: 'equipo', label: 'Enviar al equipo', hint: 'Escuchar, retirar y pedir permiso', icon: 'forum' },
          { id: 'taller', label: 'Taller de mensajes', hint: 'Cambiar burlas o presión por respeto', icon: 'edit' },
        ],
        objects: [
          {
            id: 'retirar-disculpa', label: '«Lo retiro. Perdón, no pregunté»', image: picture('mensaje-perdon'),
            description: 'Quitar el sticker del cartel y reconocer el error.', correctTargets: ['equipo'],
            successFeedback: 'Sara responde: «Gracias por quitarlo». La disculpa va acompañada de una acción que repara.',
            errorFeedback: 'Este mensaje escucha el límite y retira la foto. Puede ir al equipo; después hay que cumplirlo.',
            resultText: 'Retiro la foto y pido permiso antes de usar otra.',
          },
          {
            id: 'minimizar-limite', label: '«Era broma, aguanta»', image: picture('mensaje-burla'),
            description: 'Ignorar que Sara ya dijo que no quiere esa foto.', correctTargets: ['taller'],
            successFeedback: 'Lo cambiamos por «Entiendo, quitamos tu foto». Sara responde: «Gracias por escucharme».',
            errorFeedback: 'Decir que era broma no cambia el límite de Sara. Llévalo al taller para responder con respeto.',
            resultText: 'Entiendo, quitamos tu foto.',
          },
          {
            id: 'proponer-dibujo', label: '«Podemos usar mi dibujo»', image: picture('dibujo'),
            description: 'Proponer un dibujo propio para sustituir el sticker.', correctTargets: ['equipo'],
            successFeedback: 'Sara responde: «Me gusta esa idea». El equipo puede continuar el cartel sin usar su foto.',
            errorFeedback: 'Ofrecer una creación propia ayuda a continuar sin presionar a Sara. Este mensaje ya puede enviarse.',
            resultText: 'Podemos usar una creación que sí tenga permiso.',
          },
          {
            id: 'presionar-foto', label: '«Todos quieren que se quede»', image: picture('mensaje-presion'),
            description: 'Usar la opinión del grupo para presionar a Sara.', correctTargets: ['taller'],
            successFeedback: 'Lo cambiamos por «Tu foto se usa solo si tú quieres». Sara responde: «Prefiero otro dibujo». El grupo respeta su decisión.',
            errorFeedback: 'Que al grupo le guste la foto no sustituye el permiso de Sara. En el taller podemos respetar su decisión.',
            resultText: 'Tu foto se usa solo si tú quieres.',
          },
        ],
        success: 'Respetar un límite incluye actuar: quitar lo que no tiene permiso, escuchar y elegir otra opción juntos.',
      },
    ],
    success: 'Antes de enviar, puedo pensar cómo se sentirá la otra persona. Si algo lastima, lo cambio; si me equivoco, puedo reparar.',
  },
  {
    id: 'mi-dia-tiene-de-todo', title: 'Mi día tiene de todo', subtitle: 'Bienestar digital', mode: 'day',
    instruction: 'Ayuda a Bit a organizar su día. Mueve las actividades a los momentos del tablero y haz espacio para aprender, jugar, comer, convivir y descansar.',
    rounds: [
      {
        id: 'tarde-escuela', title: 'Una tarde al salir de la escuela',
        context: 'Bit llega con hambre. Acordó comer, hacer una tarea breve y salir a jugar antes de cenar. Después le espera su descanso.',
        instruction: 'Arma este plan de la tarde: una actividad en cada momento.',
        zones: [
          { id: 'llegar', label: '1 · Al llegar', hint: 'Bit tiene hambre', icon: 'home', capacity: 1 },
          { id: 'despues', label: '2 · Después de comer', hint: 'Una tarea breve pendiente', icon: 'school', capacity: 1 },
          { id: 'tarde', label: '3 · Antes de cenar', hint: 'Tiempo para salir y moverse', icon: 'wb_sunny', capacity: 1 },
          { id: 'noche', label: '4 · A dormir', hint: 'El cuerpo necesita descansar', icon: 'bedtime', capacity: 1 },
        ],
        objects: [
          {
            id: 'comer', label: 'Comer con calma', image: picture('comida'),
            description: 'Hacer espacio para comer al llegar de la escuela.', correctTargets: ['llegar'],
            successFeedback: 'Primero Bit atiende su hambre y come con calma. El juego no tiene que quitarle ese momento.',
            errorFeedback: 'En este plan Bit llega con hambre. Busca el primer momento de la tarde.',
            feedbackByTarget: { despues: 'Este espacio ocurre después de comer. La comida va antes.', tarde: 'Antes de cenar ya habrá comido. Bit necesita atender su hambre al llegar.', noche: 'Este es el momento de dormir. En el plan, la comida sucede al llegar de la escuela.' },
          },
          {
            id: 'tarea-breve', label: 'Hacer la tarea breve', image: picture('cuaderno'),
            description: 'La tarea acordada va después de comer, antes de salir a jugar.', correctTargets: ['despues'],
            successFeedback: 'La tarea tiene su espacio después de comer. Cuando termine, habrá tiempo para salir a jugar.',
            errorFeedback: 'En este caso acordaron hacer la tarea después de comer y antes de salir.',
            feedbackByTarget: { llegar: 'Bit llega con hambre: en este plan come antes de hacer la tarea.', tarde: 'El juego al aire libre espera aquí. La tarea se acordó para después de comer.', noche: 'Dejar la tarea para dormir le quitaría descanso en este plan. Tiene un momento anterior.' },
          },
          {
            id: 'juego-patio', label: 'Salir a jugar', image: picture('pelota'),
            description: 'Moverse y jugar al aire libre después de terminar la tarea.', correctTargets: ['tarde'],
            successFeedback: 'El día también tiene espacio para moverse, jugar y estar con otras personas.',
            errorFeedback: 'En este plan saldrán a jugar al terminar la tarea, antes de cenar.',
            feedbackByTarget: { llegar: 'Primero Bit necesita comer. El juego al aire libre tiene otro momento reservado.', despues: 'Aquí acordaron terminar una tarea breve. El juego viene después.', noche: 'Aquí toca descansar. El juego del patio tiene su lugar antes de cenar.' },
          },
          {
            id: 'dormir', label: 'Dormir y descansar', image: picture('cama'),
            description: 'Terminar el día y tener tiempo suficiente para dormir.', correctTargets: ['noche'],
            successFeedback: 'Dormir tiene un lugar propio en el plan. Ni el juego ni la tarea deben ocupar toda la noche.',
            errorFeedback: 'En este tablero organizamos el descanso de la noche. Busca el último momento.',
            feedbackByTarget: { llegar: 'Aquí planeamos la comida al volver de la escuela. El descanso nocturno va al final.', despues: 'En este caso la tarea breve va después de comer; el sueño de la noche tiene su propio espacio.', tarde: 'Antes de cenar Bit acordó salir a jugar. Su descanso nocturno está más adelante.' },
          },
        ],
        success: 'Este es un plan posible para esa tarde. Otros días pueden organizarse diferente, sin dejar fuera comida, movimiento y descanso.',
      },
      {
        id: 'sabado', title: 'Un sábado con pantallas y más',
        context: 'Bit acordó jugar afuera por la mañana y usar un videojuego un rato después de comer. Por la tarde cenará y platicará con su familia.',
        instruction: 'Coloca cada actividad en el plan acordado. El videojuego también debe dejar espacio para lo demás.',
        zones: [
          { id: 'manana', label: '1 · Por la mañana', hint: 'Juego al aire libre', icon: 'wb_sunny', capacity: 1 },
          { id: 'pantalla', label: '2 · Después de comer', hint: 'Un rato de juego acordado', icon: 'videogame_asset', capacity: 1 },
          { id: 'familia', label: '3 · Al caer la tarde', hint: 'Cena y conversación', icon: 'groups', capacity: 1 },
          { id: 'noche', label: '4 · Al terminar el día', hint: 'Prepararnos para descansar', icon: 'bedtime', capacity: 1 },
        ],
        objects: [
          {
            id: 'moverse-sabado', label: 'Jugar al aire libre', image: picture('pelota'),
            description: 'Por la mañana Bit quiere jugar y moverse afuera.', correctTargets: ['manana'],
            successFeedback: 'El día empieza con movimiento. Hay muchas formas de jugar, con pantallas y sin ellas.',
            errorFeedback: 'Hoy el juego al aire libre se acordó por la mañana. El resto del día tiene otros momentos.',
            feedbackByTarget: { pantalla: 'Este rato se reservó para el videojuego. Bit saldrá a moverse antes.', familia: 'Aquí el plan reserva tiempo para comer y conversar en familia.', noche: 'A esta hora el plan cuida el descanso. El juego al aire libre tiene su momento por la mañana.' },
          },
          {
            id: 'videojuego', label: 'Videojuego acordado', image: picture('tableta'),
            description: 'Jugar el rato acordado después de comer y hacer una pausa si el cuerpo lo necesita.', correctTargets: ['pantalla'],
            successFeedback: 'El videojuego cabe en el día con un acuerdo. Si hay cansancio o toca otra actividad, Bit guarda y hace una pausa.',
            errorFeedback: 'El acuerdo de este sábado coloca el videojuego después de comer, sin ocupar la cena ni el descanso.',
            feedbackByTarget: { manana: 'La mañana se reservó para salir a jugar. El videojuego tiene un rato acordado después de comer.', familia: 'Este espacio es para cenar y conversar. El videojuego tiene su propio momento antes.', noche: 'Extender el juego hasta el momento de dormir quitaría descanso. Busca el rato acordado después de comer.' },
          },
          {
            id: 'convivir', label: 'Cenar y platicar', image: picture('familia'),
            description: 'Compartir la comida y conversar con la familia sin que el juego se lleve toda la atención.', correctTargets: ['familia'],
            successFeedback: 'Bit deja un espacio para cenar y escuchar a su familia. Las personas también necesitan nuestra atención.',
            errorFeedback: 'En este caso la cena y la conversación se acordaron al caer la tarde.',
            feedbackByTarget: { manana: 'En este caso no es el desayuno: el objeto representa la cena en familia.', pantalla: 'Este momento es después de comer. La cena y la conversación del plan suceden más tarde.', noche: 'La cena está prevista antes del momento de dormir. Así queda espacio para las dos cosas.' },
          },
          {
            id: 'descanso-sabado', label: 'Prepararse para dormir', image: picture('cama'),
            description: 'Guardar la tableta y terminar el día con calma.', correctTargets: ['noche'],
            successFeedback: 'Bit guarda la tableta y se prepara para descansar. Mañana habrá tiempo para volver a jugar.',
            errorFeedback: 'Este objeto representa el descanso al terminar el día. Busca el último momento del tablero.',
            feedbackByTarget: { manana: 'Este tablero empieza después de despertar. Prepararse para dormir va al final del día.', pantalla: 'Aquí está el rato de juego acordado. Dormir tiene un espacio propio más adelante.', familia: 'Todavía falta cenar y conversar. Después llega el momento de descansar.' },
          },
        ],
        success: 'Un acuerdo puede incluir pantallas y cuidar también juego, comida, convivencia y sueño. Podemos revisarlo en familia cuando cambie el día.',
      },
    ],
    success: 'Nuestro día necesita distintas actividades. Los planes pueden cambiar: escuchar al cuerpo y acordar pausas nos ayuda a cuidarnos.',
  },
  {
    id: 'que-herramienta-nos-ayuda', title: '¿Qué herramienta nos ayuda?', subtitle: 'Uso intencional de tecnología', mode: 'tools',
    instruction: 'Mira las dos misiones y mueve cada herramienta hacia una tarea que pueda resolver. Puede haber más de una buena respuesta. Escucha para qué sirve.',
    rounds: [
      {
        id: 'observar-explicar', title: 'Dos misiones para la clase',
        context: 'El grupo quiere registrar cómo cambia una planta y explicar una regla para cuidar el patio. Una herramienta puede servir para más de una misión.',
        instruction: 'Elige una misión para cada herramienta y escucha cómo podrías usarla.',
        zones: [
          { id: 'planta', label: 'Registrar la planta', hint: 'Recordar qué cambió y en qué día', icon: 'potted_plant' },
          { id: 'regla', label: 'Explicar una regla', hint: 'Mostrar cómo cuidar el patio', icon: 'campaign' },
        ],
        objects: [
          {
            id: 'camara', label: 'Cámara', image: picture('camara'),
            description: 'Permite tomar fotos o grabar un video con ayuda de una persona adulta.', correctTargets: ['planta', 'regla'],
            successFeedback: 'La cámara sirve cuando sabemos qué queremos mostrar.', errorFeedback: 'Revisa qué quieres registrar o explicar con la cámara.',
            feedbackByTarget: { planta: 'Puedes tomar una foto de la planta cada día y anotar la fecha. Así comparas sus cambios.', regla: 'Puedes grabar una demostración de cómo recoger los residuos, sin mostrar personas que no hayan dado permiso.' },
          },
          {
            id: 'cuaderno', label: 'Dibujos y notas', image: picture('cuaderno'),
            description: 'Un cuaderno permite dibujar, escribir y poner fechas.', correctTargets: ['planta', 'regla'],
            successFeedback: 'Dibujar y escribir también permite observar y explicar.', errorFeedback: 'Piensa qué podrías dibujar o anotar para esta misión.',
            feedbackByTarget: { planta: 'Puedes dibujar la planta cada día, poner fecha y anotar cuánto creció. No hace falta una cámara.', regla: 'Puedes dibujar los pasos para separar residuos. Las imágenes ayudan a entender la regla.' },
          },
          {
            id: 'microfono', label: 'Audio breve', image: picture('microfono'),
            description: 'Un audio conserva lo que observamos o lo que queremos explicar.', correctTargets: ['planta', 'regla'],
            successFeedback: 'La voz sirve para registrar o explicar si el mensaje tiene la información necesaria.', errorFeedback: 'Piensa qué información grabarías para que el audio ayude.',
            feedbackByTarget: { planta: 'Puedes decir la fecha y describir las hojas nuevas. Al escuchar varios audios recuerdas los cambios.', regla: 'Puedes grabar una explicación breve de dónde poner cada residuo. Otras personas podrán escucharla después.' },
          },
          {
            id: 'cartel', label: 'Papel y colores', image: picture('dibujo'),
            description: 'Sirven para crear un cartel visible para todo el equipo.', correctTargets: ['planta', 'regla'],
            successFeedback: 'El papel también comunica y guarda información.', errorFeedback: 'Imagina qué datos o dibujos pondrías en el papel.',
            feedbackByTarget: { planta: 'Puedes hacer un registro grande con fechas y dibujos de la planta. Todo el grupo podrá compararlos.', regla: 'Puedes hacer un cartel con dibujos y una frase breve que recuerde cómo cuidar el patio.' },
          },
        ],
        success: 'Cámara, voz, dibujos y papel pueden resolver las dos misiones de distintas maneras. La elección depende de lo que necesitamos mostrar.',
      },
      {
        id: 'juego-invitacion', title: 'Preparar una exposición',
        context: 'La clase va a enseñar un juego con pelota y a invitar a las familias. La invitación necesita decir el día y el lugar.',
        instruction: 'Reparte las herramientas. Algunas sirven para las dos misiones; otras necesitan acompañarse de algo más.',
        zones: [
          { id: 'juego', label: 'Aprender el juego', hint: 'Conocer las reglas y practicar', icon: 'sports_soccer' },
          { id: 'invitacion', label: 'Invitar a las familias', hint: 'Comunicar qué habrá, dónde y cuándo', icon: 'mail' },
        ],
        objects: [
          {
            id: 'conversacion', label: 'Conversar', image: picture('familia'),
            description: 'Podemos preguntar, explicar y escuchar a otra persona.', correctTargets: ['juego', 'invitacion'],
            successFeedback: 'Hablar y escuchar puede ser suficiente para esta tarea.', errorFeedback: 'Piensa qué explicarías o preguntarías en la conversación.',
            feedbackByTarget: { juego: 'Podemos pedir a alguien que nos explique las reglas y preguntarle lo que no entendamos.', invitacion: 'Podemos invitar en persona y decir con claridad el día, el lugar y qué hará la clase. No hace falta publicar datos en internet.' },
          },
          {
            id: 'tableta', label: 'Tableta', image: picture('tableta'),
            description: 'Con ayuda de la maestra, permite preparar imágenes, escuchar o grabar.', correctTargets: ['juego', 'invitacion'],
            successFeedback: 'La tableta ayuda cuando elegimos una tarea concreta.', errorFeedback: 'Primero decide qué necesitas aprender o comunicar.',
            feedbackByTarget: { juego: 'Con la maestra podemos ver una demostración breve del juego y después salir a practicar.', invitacion: 'Con la maestra podemos crear una invitación con día y lugar para enviarla por el canal de la escuela a las familias.' },
          },
          {
            id: 'papel', label: 'Papel y lápices', image: picture('cuaderno'),
            description: 'Permiten dibujar instrucciones o escribir una invitación.', correctTargets: ['juego', 'invitacion'],
            successFeedback: 'Una herramienta sencilla también puede resolver bien la tarea.', errorFeedback: 'Piensa qué instrucciones o datos pondrías en el papel.',
            feedbackByTarget: { juego: 'Podemos dibujar el recorrido y escribir las reglas para consultarlas mientras practicamos.', invitacion: 'Podemos hacer una invitación en papel con día y lugar y entregarla a nuestras familias.' },
          },
          {
            id: 'pelota', label: 'Pelota', image: picture('pelota'),
            description: 'Sirve para ensayar el juego que vamos a mostrar.', correctTargets: ['juego'],
            successFeedback: 'Para aprender este juego también necesitamos practicar con la pelota. Mirar una pantalla no reemplaza ese ensayo.',
            errorFeedback: 'La pelota sola no dice el día ni el lugar de la exposición. Para invitar necesitamos un mensaje; úsala para practicar el juego.',
            feedbackByTarget: { invitacion: 'En esta misión la invitación debe decir día y lugar. La pelota sola no da esos datos; sí sirve para ensayar el juego.' },
          },
        ],
        success: 'A veces ayuda una pantalla, a veces el papel o una conversación, y a veces necesitamos actuar. Primero va la tarea que queremos resolver.',
      },
    ],
    success: 'Puede haber más de una herramienta útil. Elegimos por lo que queremos hacer, por las personas que participarán y por lo que tenemos disponible.',
  },
  {
    id: 'nuestro-acuerdo-digital', title: 'Nuestro acuerdo digital', subtitle: 'Participación y responsabilidad', mode: 'agreements',
    instruction: 'Construye el acuerdo de la clase. Coloca las acciones que nos cuidan y lleva las que necesitan cambiar al taller. Al final tendrás acuerdos para compartir.',
    rounds: [
      {
        id: 'crear-juntos', title: 'Crear juntos y cuidar el trabajo',
        context: 'La clase compartirá una tableta para crear un cartel. Necesita acuerdos que cuiden a las personas y sus ideas.',
        instruction: 'Añade las acciones que cuidan al grupo. Transforma las demás en acuerdos positivos.',
        zones: [
          { id: 'acuerdo', label: 'Nuestro acuerdo', hint: 'Así queremos trabajar juntos', icon: 'verified' },
          { id: 'taller', label: 'Lo transformamos', hint: 'Cambiar la acción para que nos cuide', icon: 'edit' },
        ],
        objects: [
          {
            id: 'pedir-permiso', label: 'Pedir permiso para una foto', image: picture('permiso'),
            description: 'Preguntar antes de fotografiar y antes de compartir la foto.', correctTargets: ['acuerdo'],
            successFeedback: 'Este acuerdo cuida la decisión de cada persona. Si alguien dice que no, buscamos otra imagen.',
            errorFeedback: 'Pedir permiso ya es una acción que cuida. Puede entrar directamente en nuestro acuerdo.',
            resultText: 'Pedimos permiso antes de fotografiar o compartir la imagen de alguien y respetamos su respuesta.',
          },
          {
            id: 'borrar-ajeno', label: 'Borrar sin preguntar', image: picture('borrar'),
            description: 'Quitar el dibujo de otra persona porque queremos poner el nuestro.', correctTargets: ['taller'],
            successFeedback: 'Lo transformamos: antes de cambiar el trabajo de otra persona, le preguntamos y acordamos qué hacer.',
            errorFeedback: 'Borrar sin preguntar no cuida el trabajo del grupo. Llévalo al taller para cambiar esa acción.',
            resultText: 'Preguntamos y acordamos los cambios antes de modificar el trabajo de otra persona.',
          },
          {
            id: 'respetar-turnos', label: 'Acordar turnos', image: picture('turnos'),
            description: 'Repartir el uso de la tableta para que todas las personas participen.', correctTargets: ['acuerdo'],
            successFeedback: 'Los turnos permiten participar. También podemos pedir ayuda o ajustar el turno cuando alguien lo necesita.',
            errorFeedback: 'Acordar turnos ya ayuda a trabajar juntos. Ponlo en el acuerdo de la clase.',
            resultText: 'Acordamos turnos y ayudamos para que todas las personas puedan participar.',
          },
          {
            id: 'ocultar-autoria', label: 'Poner mi nombre en un dibujo ajeno', image: picture('autoria'),
            description: 'Usar una creación de otra persona como si la hubiera hecho yo.', correctTargets: ['taller'],
            successFeedback: 'Lo transformamos: pedimos permiso para usar la creación y reconocemos a la persona que la hizo.',
            errorFeedback: 'Cambiar el nombre no convierte el dibujo en nuestro. El taller nos ayuda a reconocer a quien lo creó.',
            resultText: 'Pedimos permiso para usar una creación y decimos quién la hizo.',
          },
        ],
        success: 'Las cuatro acciones se convirtieron en acuerdos que respetan permiso, trabajo, participación y autoría.',
      },
      {
        id: 'cuidarnos', title: 'Cuidarnos mientras participamos',
        context: 'El grupo también quiere saber cómo cuidar sus datos, pedir apoyo y hacer pausas al usar tecnología.',
        instruction: 'Completa el acuerdo. Las acciones del taller se convertirán en una forma de cuidarnos.',
        zones: [
          { id: 'acuerdo', label: 'Nuestro acuerdo', hint: 'Una acción que nos ayuda a cuidarnos', icon: 'verified' },
          { id: 'taller', label: 'Lo transformamos', hint: 'Buscar una acción más cuidadosa', icon: 'edit' },
        ],
        objects: [
          {
            id: 'direccion-publica', label: 'Publicar dónde vivo', image: picture('ubicacion'),
            description: 'Poner la dirección de casa en un cartel abierto en internet.', correctTargets: ['taller'],
            successFeedback: 'Lo transformamos: dejamos fuera la dirección de casa y revisamos los datos con una persona adulta de confianza.',
            errorFeedback: 'Una página abierta puede mostrar esos datos a personas desconocidas. Llévalo al taller para cuidar la información.',
            resultText: 'Cuidamos nuestros datos y revisamos con una persona adulta de confianza antes de compartirlos.',
          },
          {
            id: 'pedir-ayuda', label: 'Contar algo que me incomoda', image: picture('familia'),
            description: 'Buscar a una persona adulta de confianza cuando algo nos preocupa en una pantalla.', correctTargets: ['acuerdo'],
            successFeedback: 'Pedir ayuda es parte de cuidarnos. Podemos contar lo que pasó sin tener que resolverlo solos.',
            errorFeedback: 'Contar una preocupación ya es una acción que ayuda. Puede entrar directamente en el acuerdo.',
            resultText: 'Si algo nos incomoda o preocupa, paramos y lo contamos a una persona adulta de confianza.',
          },
          {
            id: 'comprobar-antes', label: 'Comprobar un mensaje dudoso', image: picture('busqueda'),
            description: 'Preguntar y buscar pistas antes de repetir un mensaje que no entendemos.', correctTargets: ['acuerdo'],
            successFeedback: 'El acuerdo deja espacio para decir «todavía no sé». Podemos preguntar y revisar antes de compartir.',
            errorFeedback: 'Buscar pistas antes de compartir ya cuida al grupo. Esta acción pertenece al acuerdo.',
            resultText: 'Antes de compartir algo dudoso, preguntamos y buscamos pistas para comprobarlo.',
          },
          {
            id: 'seguir-sin-pausa', label: 'Seguir jugando aunque toque descansar', image: picture('tableta'),
            description: 'Dejar que el juego ocupe el momento acordado para comer, convivir o dormir.', correctTargets: ['taller'],
            successFeedback: 'Lo transformamos: guardamos el juego, hacemos una pausa y revisamos los acuerdos para que el día tenga de todo.',
            errorFeedback: 'Si el juego ocupa siempre esos momentos, algo queda fuera. En el taller podemos hacer espacio para el descanso y las personas.',
            resultText: 'Acordamos momentos para las pantallas y hacemos espacio para comer, movernos, convivir y descansar.',
          },
        ],
        success: 'Ya tenemos propuestas para cuidar al grupo. Podemos leerlas juntos y adaptarlas a las necesidades de nuestra clase.',
      },
    ],
    success: 'Este es el acuerdo que construiste. Compártelo con la clase: escuchen sus ideas, hagan los cambios que necesiten y revisen cómo les funciona.',
  },
];

export const LOWER_PRIMARY_BOARD_BY_ID = new Map(LOWER_PRIMARY_BOARDS.map((board) => [board.id, board]));
