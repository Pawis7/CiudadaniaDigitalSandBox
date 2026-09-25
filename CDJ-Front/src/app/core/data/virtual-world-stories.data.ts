import { IllustratedActivityConfig } from '../../shared/illustrated-activity/illustrated-activity.models';

const MEXICAN_RATINGS_SOURCE = {
  label: 'Para personas adultas · DOF: clasificación y elementos interactivos de videojuegos',
  url: 'https://dof.gob.mx/nota_detalle_popup.php?codigo=5606047',
};

const CHOOSING_GAMES_SOURCE = {
  label: 'Para personas adultas · eSafety: elegir y revisar juegos adecuados',
  url: 'https://www.esafety.gov.au/parents/issues-and-advice/gaming/how-to-set-up-and-choose-games-safely',
};

const GAMING_FEATURES_SOURCE = {
  label: 'Para personas adultas · eSafety: comprender las funciones de los juegos',
  url: 'https://www.esafety.gov.au/parents/issues-and-advice/gaming/understanding-online-gaming-features',
};

const FAMILY_GAMING_SOURCE = {
  label: 'Para personas adultas · eSafety: acompañar el juego en familia',
  url: 'https://www.esafety.gov.au/parents/issues-and-advice/gaming/together-as-a-family',
};

export const CASTLE_ACTIVITY: IllustratedActivityConfig = {
  id: 'castillo-cambio',
  title: 'El castillo que cambió',
  ageLabel: 'Primaria alta · 9 a 11 años',
  intro:
    'Mara quiere construir un puente hasta la torre más alta. Pero un portal cambia el camino y también lo que siente al jugar. Acompáñala a decidir qué hacer con la ayuda de su papá y de Bit.',
  cover: {
    src: '/cuentos/primaria/carteles/castillo.webp',
    alt: 'Mara, de cabello rizado y camisa coral, junto a su papá y Bit frente a un castillo digital.',
  },
  scenes: [
    {
      id: 'castillo-elegir',
      title: 'Antes de cruzar el puente',
      image: {
        src: '/cuentos/primaria/castillo/01-escena.webp',
        alt: 'Mara y su papá, de bigote y camisa crema, revisan juntos un mundo de construcción en una tableta con Bit a su lado.',
      },
      paragraphs: [
        'Mara acercó la tableta a su papá. En la pantalla había un castillo con puentes de colores. Quería construir uno que llegara hasta la torre más alta.',
        '—Se ve divertido —dijo él—. Antes de entrar, vamos a conocerlo. Bit señaló la ficha que estaba junto a la imagen.',
      ],
      prompt: '¿Qué información les ayudará a decidir si ese mundo es adecuado para Mara?',
      choices: [
        {
          id: 'elegir-popularidad',
          label: 'Cuántas personas lo juegan y si aparece entre los favoritos.',
          feedback:
            'La popularidad cuenta cuánta gente participa, pero no qué encontrará Mara. También necesitan conocer el contenido, la edad indicada y las funciones disponibles.',
          correct: false,
        },
        {
          id: 'elegir-contenido',
          label: 'La edad indicada, el contenido y las funciones del mundo.',
          feedback:
            'Revisan esas pistas y su papá explora primero. En esta experiencia encuentran construcción tranquila adecuada para Mara; también acuerdan salir si algo cambia o la incomoda.',
          correct: true,
        },
        {
          id: 'elegir-imagen',
          label: 'Los colores de la portada y lo amable que parece el castillo.',
          feedback:
            'La portada muestra solo una parte. Para elegir necesitan revisar qué hay dentro y para qué edades está pensado, con ayuda de su papá.',
          correct: false,
        },
      ],
      takeaway: 'Elijo con una persona adulta: la portada no cuenta todo lo que hay dentro.',
      paperTone: 'sunshine',
    },
    {
      id: 'castillo-cambio',
      title: 'Detrás del portal',
      image: {
        src: '/cuentos/primaria/castillo/02-escena.webp',
        alt: 'La tableta muestra un pasillo morado más oscuro; Mara, incómoda por el cambio, busca la mirada de su papá.',
      },
      paragraphs: [
        'Mara terminó su puente. Junto a la torre apareció un portal nuevo y lo tocó pensando que encontraría más piezas.',
        'El jardín desapareció. Sonó un golpe fuerte y el camino se convirtió en un pasillo oscuro. Mara apretó los hombros: ya no quería seguir ahí.',
      ],
      prompt: '¿Qué puede hacer Mara en ese momento?',
      choices: [
        {
          id: 'cambio-esperar-final',
          label: 'Llegar al final del pasillo antes de decidir si sale.',
          feedback:
            'No necesita terminar una zona que la incomoda. Puede dejar de verla y pedir ayuda en ese momento, aunque el juego siga.',
          correct: false,
        },
        {
          id: 'cambio-sin-sonido',
          label: 'Quitar el sonido y seguir para recuperar el jardín.',
          feedback:
            'Bajar el sonido no cambia todo el contenido. Si Mara ya está incómoda, puede salir y revisar lo ocurrido con su papá.',
          correct: false,
        },
        {
          id: 'cambio-salir',
          label: 'Salir de esa zona y contarle a su papá qué cambió.',
          feedback:
            'Mara deja la zona y busca a su papá. No tiene que volver a mirar el pasillo para demostrar lo que sintió; puede explicarlo con sus palabras.',
          correct: true,
        },
      ],
      takeaway:
        'Puedo salir cuando un contenido me incomoda. No tengo que terminarlo para pedir ayuda.',
      paperTone: 'lilac',
    },
    {
      id: 'castillo-acompanar',
      title: 'Un mundo dentro de otro',
      image: {
        src: '/cuentos/primaria/castillo/03-escena.webp',
        alt: 'El papá escucha a Mara con calma y revisa con ella una alternativa de construcción con bloques de colores; Bit los acompaña.',
      },
      paragraphs: [
        '—Gracias por contármelo —dijo su papá. Al revisar la información del portal, encontró que esa zona la había creado otra persona y tenía una indicación de edad mayor.',
        '—Entonces, ¿puedo entrar si tú te quedas? —preguntó Mara. Su papá se sentó junto a ella para pensar una alternativa.',
      ],
      prompt: '¿Qué decisión pueden tomar juntos?',
      choices: [
        {
          id: 'acompanar-alternativa',
          label: 'Dejar esa zona y elegir otra experiencia adecuada para su edad.',
          feedback:
            'Estar acompañada no convierte cualquier contenido en adecuado. Su papá ayuda a encontrar otra experiencia de construcción y revisan también cómo se pasa a otras zonas.',
          correct: true,
        },
        {
          id: 'acompanar-excepcion',
          label: 'Entrar porque la presencia de su papá sustituye la indicación de edad.',
          feedback:
            'Acompañar ayuda a decidir y a cuidar, pero no cambia para quién está pensado el contenido. Pueden conservar la idea de construir en otra experiencia.',
          correct: false,
        },
        {
          id: 'acompanar-primera-zona',
          label: 'Confiar en que todo será como el primer jardín que revisaron.',
          feedback:
            'El portal llevó a un contenido distinto. En mundos con varias zonas o creadores, lo revisado al principio no describe necesariamente todo lo que puede aparecer.',
          correct: false,
        },
      ],
      takeaway:
        'El acompañamiento sirve para elegir y cuidarme; no vuelve adecuado un contenido para mayores.',
      paperTone: 'peach',
    },
    {
      id: 'castillo-revisar',
      title: 'Volver a mirar antes de entrar',
      image: {
        src: '/cuentos/primaria/castillo/03-escena.webp',
        alt: 'Mara y su papá conversan sobre qué revisar antes de probar otra zona del mundo de construcción.',
      },
      paragraphs: [
        'Mientras elegían una alternativa, Mara encontró una ficha que decía: «Nuevas zonas». Esta vez no abrió el portal de inmediato.',
        '—Podemos revisar qué cambió —dijo—. Y si no encontramos la información, construir nuestro puente con estos bloques. Bit ya tenía lista la primera pieza.',
      ],
      prompt: '¿Qué acuerdo les servirá para las próximas partidas?',
      choices: [
        {
          id: 'revisar-una-vez',
          label: 'Revisar un mundo solo la primera vez que lo abren.',
          feedback:
            'Un mundo puede recibir actualizaciones o añadir zonas. Conviene volver a revisar cuando cambia el contenido o las funciones que van a usar.',
          correct: false,
        },
        {
          id: 'revisar-cambios',
          label: 'Revisar juntos los cambios; si no pueden comprobarlos, elegir otra opción.',
          feedback:
            'No tienen que decidir con prisa. La próxima vez comprobarán la edad, el contenido y las opciones de cuidado; mientras tanto pueden disfrutar de otra forma de construir.',
          correct: true,
        },
        {
          id: 'revisar-por-mara',
          label: 'Que Mara pruebe sola cada zona nueva para luego describirla.',
          feedback:
            'Mara no tiene que exponerse a un contenido desconocido para revisarlo. Esa tarea la puede hacer su papá antes de decidir juntos.',
          correct: false,
        },
      ],
      takeaway:
        'Si un mundo cambia, volvemos a revisarlo. Esperar y elegir otra opción también es decidir.',
      paperTone: 'mint',
    },
  ],
  ending: {
    title: '¡Un puente para seguir creando!',
    message:
      'Mara no necesitó terminar el pasillo oscuro. Su papá la escuchó y juntos encontraron otra forma de construir. Saber salir y pedir ayuda también forma parte de aprender a jugar.',
    rule: 'Reviso con una persona adulta, salgo si algo me incomoda y elijo experiencias adecuadas para mi edad.',
    image: {
      src: '/cuentos/primaria/castillo/cierre.webp',
      alt: 'Mara, su papá y Bit disfrutan construyendo un puente con bloques de colores.',
    },
  },
  sources: [MEXICAN_RATINGS_SOURCE, CHOOSING_GAMES_SOURCE, GAMING_FEATURES_SOURCE],
};

export const MISSION_ACTIVITY: IllustratedActivityConfig = {
  id: 'mision-puede-esperar',
  title: 'La misión puede esperar',
  ageLabel: 'Primaria alta · 9 a 11 años',
  intro:
    'Leo está a punto de terminar una construcción cuando aparece una misión extra. Quiere conservar su racha, pero también tiene un acuerdo con su abuela. Ayúdalo a reconocer esa presión y elegir cómo cerrar.',
  cover: {
    src: '/cuentos/primaria/carteles/mision.webp',
    alt: 'Leo, con camisa turquesa y camiseta amarilla, juega junto a su abuela de cabello gris y Bit, con un reloj cerca.',
  },
  scenes: [
    {
      id: 'mision-acuerdo',
      title: 'El plan antes de empezar',
      image: {
        src: '/cuentos/primaria/mision/01-escena.webp',
        alt: 'Leo y su abuela, con el cabello recogido y cárdigan morado, acuerdan el cierre junto a un reloj; la tableta muestra una estación espacial de bloques.',
      },
      paragraphs: [
        'Leo quería terminar una estación espacial de bloques. Su abuela se sentó junto a él: después prepararían la mochila, cenarían y tendrían tiempo para leer antes de dormir.',
        'En ese juego podían guardar la construcción. Leo y su abuela miraron el reloj para hacer un plan antes de empezar.',
      ],
      prompt: '¿Qué acuerdo les permite disfrutar la partida y preparar el cierre?',
      choices: [
        {
          id: 'acuerdo-hasta-cansarse',
          label: 'Jugar hasta que Leo se canse, sin decidir un momento de cierre.',
          feedback:
            'Cuando algo nos entusiasma, el cansancio puede pasar inadvertido. Acordar antes un momento de cierre ayuda a reservar tiempo para el resto de la tarde.',
          correct: false,
        },
        {
          id: 'acuerdo-todas-misiones',
          label: 'Cerrar cuando ya no aparezca ninguna misión pendiente.',
          feedback:
            'El juego puede seguir ofreciendo misiones. El final de la sesión necesita depender del acuerdo de Leo y su abuela, no de que el juego deje de proponer cosas.',
          correct: false,
        },
        {
          id: 'acuerdo-hora-aviso',
          label: 'Elegir una hora de cierre, un aviso previo y tiempo para guardar.',
          feedback:
            'Acuerdan cerrar a las siete y darse un aviso antes para guardar la estación. Es su plan para esta tarde y deja espacio para cenar, leer y descansar.',
          correct: true,
        },
      ],
      takeaway:
        'Acordar el cierre antes de jugar ayuda a que también haya tiempo para otras cosas.',
      paperTone: 'sky',
    },
    {
      id: 'mision-recompensa',
      title: 'La estrella que no quería perder',
      image: {
        src: '/cuentos/primaria/mision/02-escena.webp',
        alt: 'Leo mira una estrella de recompensa y una racha en la pantalla, con expresión preocupada y cansada.',
      },
      paragraphs: [
        'Cuando llegó el aviso de cierre, apareció una estrella: «Completa otra misión hoy y conserva tu racha». A Leo le faltaba poco para ganar la insignia semanal.',
        'Movió la mano hacia «Empezar». Le daba coraje perderla, aunque ya habían llegado a la hora acordada. Bit señaló el reloj sin quitarle la tableta.',
      ],
      prompt: '¿Qué puede ayudar a Leo a decidir sin dejarse llevar por la prisa?',
      choices: [
        {
          id: 'recompensa-contar',
          label: 'Decirle a su abuela que teme perder la racha y revisar el acuerdo.',
          feedback:
            'Nombrar lo que siente ayuda a hacer una pausa. La estrella le propone seguir, pero Leo puede decidir con apoyo sin iniciar automáticamente otra misión.',
          correct: true,
        },
        {
          id: 'recompensa-empezar',
          label: 'Iniciar la misión y preguntar cuánto dura después.',
          feedback:
            'Empezar primero puede hacer más difícil salir después. Leo puede contar lo que siente antes de aceptar una tarea que no estaba en su plan.',
          correct: false,
        },
        {
          id: 'recompensa-restar-sueno',
          label: 'Conservar la racha y quitarle ese tiempo al descanso.',
          feedback:
            'La recompensa puede esperar o perderse; el descanso necesita su espacio. Leo puede sentirse decepcionado y aun así cuidar el plan que eligieron.',
          correct: false,
        },
      ],
      takeaway:
        'Una recompensa puede hacerme sentir prisa. Puedo detenerme y hablar antes de aceptar otra misión.',
      paperTone: 'sunshine',
    },
    {
      id: 'mision-cerrar',
      title: 'Terminar aunque queden ganas',
      image: {
        src: '/cuentos/primaria/mision/03-escena.webp',
        alt: 'La abuela acompaña a Leo a cerrar la tableta y conversar sobre su siguiente sesión, con un calendario cerca.',
      },
      paragraphs: [
        '—Si cierro, hoy no completo la racha —dijo Leo. Su abuela lo escuchó: entendía que hubiera puesto empeño en conseguirla.',
        '—Podemos guardar lo que construiste. La insignia quizá se pierda, pero esta tarde también es tuya. Leo miró el botón de guardar y respiró.',
      ],
      prompt: '¿Qué puede hacer Leo para cumplir el acuerdo con el apoyo de su abuela?',
      choices: [
        {
          id: 'cerrar-abuela-juega',
          label: 'Pedirle a su abuela que complete la misión por él cada vez.',
          feedback:
            'Así la recompensa seguiría decidiendo qué hace la familia. Su abuela puede acompañarlo a cerrar, sin tener que mantener la racha en su lugar.',
          correct: false,
        },
        {
          id: 'cerrar-guardar',
          label: 'Guardar la estación, cerrar y seguir con el plan de la tarde.',
          feedback:
            'Leo guarda la estación y cierra. Todavía le molesta perder la insignia; su abuela lo acompaña sin burlarse. No necesita dejar de sentirlo para poder terminar.',
          correct: true,
        },
        {
          id: 'cerrar-volver-noche',
          label: 'Cerrar ahora y volver a escondidas cuando todos duerman.',
          feedback:
            'Volver por la noche quitaría espacio al descanso y dejaría a Leo solo con esa presión. Puede pedir ayuda para que sea más sencillo no regresar por la recompensa.',
          correct: false,
        },
      ],
      takeaway:
        'Puedo tener ganas de seguir y aun así cerrar. Una persona de confianza puede ayudarme en ese momento.',
      paperTone: 'peach',
    },
    {
      id: 'mision-proxima-vez',
      title: 'Una próxima partida sin obligación',
      image: {
        src: '/cuentos/primaria/mision/03-escena.webp',
        alt: 'Leo y su abuela miran un calendario sencillo y dejan la tableta cerrada mientras preparan otras actividades.',
      },
      paragraphs: [
        'Con la tableta cerrada, Leo le explicó a su abuela que el aviso de la racha lo hacía pensar en volver todos los días, incluso cuando prefería jugar afuera.',
        'Juntos pensaron cómo sería la próxima sesión. Bit acercó unas piezas de construcción: la estación también podía continuar lejos de la pantalla.',
      ],
      prompt: '¿Qué plan les ayudaría a cuidar el descanso y disfrutar más del juego?',
      choices: [
        {
          id: 'proxima-racha-obligatoria',
          label: 'Reservar un rato diario obligatorio para no perder otra racha.',
          feedback:
            'Convertir la racha en una tarea mantendría la presión. Los días de juego pueden decidirse según la vida de Leo y su familia, no por el contador.',
          correct: false,
        },
        {
          id: 'proxima-desactivar-y-seguir',
          label: 'Quitar los avisos y dejar de acordar cuándo cerrar.',
          feedback:
            'Reducir recordatorios puede ayudar, pero no reemplaza el acuerdo. También necesitan reservar tiempo para dormir, moverse y convivir.',
          correct: false,
        },
        {
          id: 'proxima-plan-juntos',
          label:
            'Planear cuándo jugar, reducir recordatorios y cambiar de juego si la presión continúa.',
          feedback:
            'Revisan los recordatorios disponibles y acuerdan otra sesión con un cierre claro. Si el juego sigue generando mucha presión, pueden escoger uno que sea más fácil disfrutar y dejar.',
          correct: true,
        },
      ],
      takeaway:
        'El juego cabe en mi día junto con el descanso, el movimiento y la convivencia; no tengo que organizar mi día alrededor de una racha.',
      paperTone: 'mint',
    },
  ],
  ending: {
    title: '¡La tarde también es tuya!',
    message:
      'Leo cerró con ayuda de su abuela. La insignia no decidió por ellos: guardaron la construcción y dejaron espacio para descansar y disfrutar de otras cosas. Pueden elegir otra partida cuando su plan lo permita.',
    rule: 'Hablo si me cuesta parar, cuido nuestros acuerdos y dejo tiempo para descansar y jugar fuera de la pantalla.',
    image: {
      src: '/cuentos/primaria/mision/cierre.webp',
      alt: 'Leo, su abuela y Bit disfrutan una construcción con bloques físicos; la tableta está apartada.',
    },
  },
  sources: [CHOOSING_GAMES_SOURCE, FAMILY_GAMING_SOURCE],
};
