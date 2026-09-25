import {
  AudiobookPaperTone,
  AudiobookSpread,
  AudiobookTextBlock,
  IllustratedAudiobookConfig,
} from '../../shared/illustrated-audiobook/illustrated-audiobook.models';

const COLLECTION_LABEL = 'Colección Primaria baja · Cuentos para leer juntos';
const body = (text: string): AudiobookTextBlock => ({ text });
const dialogue = (text: string): AudiobookTextBlock => ({ kind: 'dialogue', text });
const quote = (text: string): AudiobookTextBlock => ({ kind: 'quote', text });

interface ReadingScene {
  title: string;
  alt: string;
  tone: AudiobookPaperTone;
  blocks: AudiobookTextBlock[];
}

interface ReadingBook {
  id: string;
  title: string;
  lead: string;
  accent: string;
  accentStrong: string;
  coverAlt: string;
  scenes: ReadingScene[];
  rule: string;
  question: string;
  activity: string;
  endingTitle: string;
}

/** These books are read together with an adult; they never start recorded or synthetic speech. */
function readingBook(config: ReadingBook): IllustratedAudiobookConfig {
  const assetRoot = `/cuentos/PrimariaBaja/${config.id}`;
  const lastIllustration = {
    src: `${assetRoot}/06-escena-5.webp`,
    alt: config.scenes[4].alt,
  };
  const scenes: AudiobookSpread[] = config.scenes.map((scene, index) => ({
    id: `escena-${index + 1}`,
    kind: 'scene',
    paperTone: scene.tone,
    title: scene.title,
    pageLabel: `Escena ${index + 1} de 5`,
    leftPage: {
      src: `${assetRoot}/${String(index + 2).padStart(2, '0')}-escena-${index + 1}.webp`,
      alt: scene.alt,
      pageNumber: index + 1,
    },
    blocks: scene.blocks,
    narration: { fallbackSegments: [] },
  }));

  return {
    id: config.id,
    title: config.title,
    collectionLabel: COLLECTION_LABEL,
    readingOnly: true,
    accent: config.accent,
    accentStrong: config.accentStrong,
    spreads: [
      {
        id: 'portada',
        kind: 'cover',
        paperTone: 'sunshine',
        pageLabel: 'Portada',
        lead: config.lead,
        leftPage: { src: `${assetRoot}/02-escena-1.webp`, alt: config.scenes[0].alt },
        narration: { fallbackSegments: [] },
      },
      ...scenes,
      {
        id: 'regla',
        kind: 'scene',
        paperTone: 'sunshine',
        title: 'Para conversar juntos',
        pageLabel: 'Regla final',
        leftPage: lastIllustration,
        blocks: [quote(config.rule), body(config.question), body(config.activity)],
        narration: { fallbackSegments: [] },
      },
    ],
    ending: {
      title: config.endingTitle,
      subtitle: config.activity,
      ruleLabel: 'Nuestro acuerdo:',
      rule: config.rule,
      illustration: lastIllustration,
    },
  };
}

export const BIT_PUENTE_POR_TERMINAR_BOOK = readingBook({
  id: 'bit-puente-por-terminar',
  title: 'Bit y el puente por terminar',
  lead: 'Bit quiere terminar su puente. Su papá lo acompaña a reconocer el enojo, cerrar el juego y continuar construyendo de otra manera.',
  accent: '#df9a47',
  accentStrong: '#855025',
  coverAlt: 'Bit y su papá de camisa azul, junto a una tableta y unos bloques para construir un puente.',
  scenes: [
    {
      title: 'Antes de empezar',
      alt: 'El papá de camisa azul conversa con Bit antes de abrir un juego de puentes en la tableta.',
      tone: 'peach',
      blocks: [
        body('Después de merendar, Bit encontró a su papá acomodando unos bloques sobre la mesa. A su lado estaba la tableta. Papá había elegido y revisado un juego de construir puentes que funcionaba sin conexión.'),
        dialogue('—Lo jugaremos juntos un rato —dijo—. Te avisaré antes de terminar y guardaremos cuando suene el reloj.'),
        body('Bit miró los bloques y luego la pantalla. Quería hacer un puente larguísimo. Se sentó junto a su papá y acordaron el plan antes de empezar.'),
      ],
    },
    {
      title: 'Una pieza que no encaja',
      alt: 'Bit juega a construir un puente mientras su papá permanece sentado junto a él y observa la pantalla.',
      tone: 'sky',
      blocks: [
        body('En la pantalla había un río y varias piezas de madera. Bit colocó una larga sobre dos columnas, pero el puente se inclinó. Papá seguía sentado a su lado.'),
        dialogue('—¿Qué pasaría si acercamos un poco las columnas? —preguntó.'),
        body('Bit probó. Esta vez, el puente sostuvo un carrito. Los dos sonrieron. Después eligieron otro tramo y conversaron sobre dónde apoyarlo. Bit estaba tan concentrado que ya imaginaba un camino hasta la otra orilla. Su papá miró el reloj: pronto llegaría el momento de avisar.'),
      ],
    },
    {
      title: 'Pero todavía falta',
      alt: 'El papá avisa con calma que se acerca el final y Bit muestra frustración ante el puente incompleto.',
      tone: 'lilac',
      blocks: [
        dialogue('—Nos quedan unos minutos —avisó papá, todavía junto a Bit—. Pensemos dónde podemos dejar el puente para continuarlo otro día.'),
        body('Bit frunció la cara. Había encontrado una pieza perfecta y aún faltaba llegar a la orilla. Apretó los dedos contra la mesa.'),
        dialogue('—¡Pero no lo he terminado!'),
        body('Papá se acercó un poco, sin quitarle la tableta.'),
        dialogue('—Veo que te da mucho enojo parar ahora. Tenías una idea y querías verla completa. Estoy aquí para ayudarte a guardar.'),
      ],
    },
    {
      title: 'Lo dejamos a salvo',
      alt: 'Bit y su papá guardan el avance y cierran juntos la tableta antes de cambiar de actividad.',
      tone: 'mint',
      blocks: [
        body('Cuando sonó el reloj, Bit todavía sentía el enojo en la cara. Papá permaneció con él y esperó a que soltara el aire despacio.'),
        dialogue('—No tenemos que terminar todo hoy. Vamos a guardar lo que construimos.'),
        body('Papá lo ayudó a guardar el avance y comprobó que estuviera listo para otro momento. Después cerraron el juego y dejaron la tableta en su lugar. Bit la miró una vez más.'),
        dialogue('—Sigue faltando un pedazo —murmuró.'),
        dialogue('—Sí —respondió papá—. Tu idea puede esperar. Y yo puedo acompañarte mientras cuesta.'),
      ],
    },
    {
      title: 'Otro puente entre los dos',
      alt: 'Bit y su papá construyen un puente con bloques sobre la mesa mientras la tableta permanece guardada.',
      tone: 'sunshine',
      blocks: [
        body('Papá acercó los bloques que habían dejado sobre la mesa. Bit tardó un momento en tomar uno. Luego puso dos columnas separadas y buscó una pieza larga.'),
        dialogue('—¿Me sostienes este lado?'),
        body('Papá lo sostuvo. Entre los dos construyeron un puente pequeño y pasaron un carrito por debajo. A veces se caía una pieza y tenían que probar de nuevo. La tableta seguía guardada. El puente de la pantalla no estaba terminado, pero Bit ya estaba compartiendo otra parte de su idea con su papá.'),
      ],
    },
  ],
  rule: 'Antes acordamos. Jugamos acompañados. Cuando toca terminar, guardamos juntos.',
  question: '¿Qué hizo el papá de Bit para ayudarlo cuando le costó dejar el juego? ¿Qué ayuda te gustaría pedir en un momento así?',
  activity: 'Con una persona adulta, construyan un puente con bloques o cajas. Antes de empezar, acuerden cómo avisarán cuando llegue el momento de terminar.',
  endingTitle: 'La idea puede continuar',
});

export const BIT_VENTANA_INESPERADA_BOOK = readingBook({
  id: 'bit-ventana-inesperada',
  title: 'Bit y la ventana inesperada',
  lead: 'Mientras Bit y su mamá aprenden a doblar un avión, una ventana tapa el video. Detenerse y avisar es el primer paso.',
  accent: '#dc8b76',
  accentStrong: '#994f41',
  coverAlt: 'Bit y su mamá de blusa coral observan una tableta junto a hojas de papel para hacer un avión.',
  scenes: [
    {
      title: 'Un avión de papel',
      alt: 'La mamá de blusa coral ve con Bit un video de origami que ella eligió y preparó.',
      tone: 'sky',
      blocks: [
        body('Bit quería hacer un avión que volara hasta el otro extremo de la mesa. Su mamá puso dos hojas de papel frente a ellos y se sentó a su lado. Tenían muchas ganas de probarlo.'),
        dialogue('—Elegí un video para aprender estos dobleces. Lo veremos juntos y lo pausaremos cuando necesitemos practicar.'),
        body('Mamá preparó la tableta y abrió el video. Bit observó unas manos doblar las esquinas de una hoja. Después miró su papel y buscó el centro. Mamá hizo el primer doblez con él, sin dejarlo solo frente a la pantalla.'),
      ],
    },
    {
      title: 'Algo tapó los dobleces',
      alt: 'Una ventana de colores aparece sobre el video; Bit se detiene y su mamá continúa sentada junto a él.',
      tone: 'peach',
      blocks: [
        body('Cuando iban a mirar el siguiente paso, apareció una ventana de colores encima del video. Tenía formas de colores y varios botones. Las manos que doblaban el papel ya no se veían.'),
        body('Bit no sabía qué era aquella ventana. Le molestó que hubiera tapado justo lo que necesitaba mirar. Acercó un dedo, pensando en quitarla, pero se detuvo. Mamá estaba a su lado, sosteniendo su hoja de papel.'),
        dialogue('—Mamá, apareció algo que no entiendo —dijo Bit, apartando la mano de la pantalla.'),
      ],
    },
    {
      title: 'Te lo cuento',
      alt: 'Bit avisa a su mamá y mantiene las manos lejos de los botones de la ventana inesperada.',
      tone: 'lilac',
      blocks: [
        body('Mamá dejó su papel sobre la mesa y miró la pantalla junto a Bit.'),
        dialogue('—Gracias por avisarme. No necesitas tocar botones para descubrir qué es. Yo voy a revisarlo.'),
        body('Bit apoyó las manos en su hoja. Le contó que la ventana había aparecido mientras miraban el video y que no había pulsado nada. Mamá lo escuchó hasta el final. Seguía sentada cerca de él.'),
        dialogue('—Podemos parar siempre que algo nos sorprenda o nos incomode —le explicó—. No tienes que resolverlo tú solo.'),
      ],
    },
    {
      title: 'Mamá se encarga',
      alt: 'La mamá cierra la ventana y el video, revisa la tableta y tranquiliza a Bit sin regañarlo.',
      tone: 'mint',
      blocks: [
        body('Mamá tomó la tableta, cerró la ventana y salió del video. Revisó lo que había ocurrido antes de guardar el dispositivo. Bit la observaba desde su silla.'),
        dialogue('—¿Hice algo mal? —preguntó.'),
        dialogue('—No. A veces aparece algo que no esperábamos. Hiciste bien en parar y contármelo. Yo me encargo de revisar dónde vemos los videos.'),
        body('Mamá dejó la tableta guardada y acercó las dos hojas. Todavía recordaban los primeros pasos del avión. No necesitaban abrir otra ventana para continuar juntos con el papel.'),
      ],
    },
    {
      title: 'Alas sobre la mesa',
      alt: 'Bit y su mamá terminan aviones de papel juntos, con la tableta guardada y las manos ocupadas en los dobleces.',
      tone: 'sunshine',
      blocks: [
        body('Mamá dobló una de las alas y Bit hizo lo mismo en su hoja. La primera quedó más ancha que la otra. Los dos compararon sus aviones y enderezaron los bordes con las manos.'),
        dialogue('—El mío parece que quiere dar una vuelta —dijo Bit.'),
        body('Despejaron un espacio y probaron un vuelo corto. El avión de Bit giró suavemente y cayó junto a la mesa. Mamá lo recogió para intentarlo otra vez. La tableta seguía guardada; ahora estaban descubriendo, entre risas y dobleces, cómo hacer volar sus propias alas de papel.'),
      ],
    },
  ],
  rule: 'Si algo inesperado aparece, paro y aviso. La persona adulta lo revisa.',
  question: '¿Qué hizo Bit cuando la ventana tapó el video? ¿A quién le avisarías si algo te incomoda mientras usan una pantalla juntos?',
  activity: 'Guarden la pantalla y doblen un avión de papel con una persona adulta. Prueben qué cambia cuando hacen las alas un poco más grandes.',
  endingTitle: 'Avisar nos ayuda',
});

export const BIT_BOTON_BRILLANTE_BOOK = readingBook({
  id: 'bit-boton-brillante',
  title: 'Bit y el botón brillante',
  lead: 'Un botón promete una estrella, pero pide algo que Bit no esperaba. Su abuela está a su lado para ayudarlo a decidir.',
  accent: '#63a087',
  accentStrong: '#34624d',
  coverAlt: 'Bit y su abuela de cabello gris, gafas y cárdigan verde comparten una actividad de rompecabezas.',
  scenes: [
    {
      title: 'Un rompecabezas juntos',
      alt: 'Bit y su abuela de cárdigan verde, gafas y cabello gris hacen un rompecabezas juntos en la tableta.',
      tone: 'mint',
      blocks: [
        body('La abuela de Bit llegó con una carpeta de dibujos bajo el brazo. Traía una sorpresa para más tarde. Se sentó junto a él y abrió en la tableta un rompecabezas que había elegido para jugar juntos.'),
        dialogue('—Vamos a armar este rompecabezas juntos. Cuando terminemos el rato acordado, guardamos la tableta.'),
        body('Bit buscó las piezas de colores. Su abuela señaló una esquina y le preguntó dónde podría ir. Entre los dos acomodaron un triángulo rojo, un círculo azul y varios cuadrados verdes.'),
      ],
    },
    {
      title: 'Una estrella que parpadea',
      alt: 'Un botón con una estrella aparece junto al rompecabezas mientras la abuela permanece al lado de Bit.',
      tone: 'sunshine',
      blocks: [
        body('De pronto apareció un botón brillante junto al rompecabezas. Una estrella se encendía y se apagaba. Debajo había unos símbolos pequeños que Bit no entendía.'),
        dialogue('—Abuela, mira esa estrella. ¿Es otra pieza?'),
        body('La abuela se inclinó un poco para mirar, sin apartarse de su lado. Bit mantuvo el dedo sobre la mesa. La estrella llamaba mucho su atención, pero todavía no sabía qué pasaría al tocarla.'),
        dialogue('—Vamos a revisar primero qué pide —respondió ella—. No hace falta pulsarla para preguntarme.'),
      ],
    },
    {
      title: '¿Para qué pide eso?',
      alt: 'La abuela lee con Bit que la oferta solicita un nombre y una fotografía; ninguno introduce datos ni pulsa el botón.',
      tone: 'peach',
      blocks: [
        body('La abuela revisó la petición que acompañaba a la estrella. Para recibirla, pedía escribir un nombre y enviar una fotografía. Bit miró la cámara de la tableta y luego a su abuela.'),
        dialogue('—¿Necesita una foto para que terminemos el rompecabezas?'),
        dialogue('—No. Eso no forma parte del rompecabezas que elegimos. No vamos a escribir ni enviar nada.'),
        body('Bit apartó las manos de la pantalla. La abuela seguía junto a él. Habían podido detenerse y conversar antes de pulsar el botón, abrir la cámara o compartir información.'),
      ],
    },
    {
      title: 'La estrella puede esperar',
      alt: 'La abuela cierra la aplicación y guarda la tableta mientras explica a Bit que no necesitan aceptar la oferta.',
      tone: 'lilac',
      blocks: [
        body('La abuela cerró la aplicación y dejó la tableta a un lado mientras revisaba lo sucedido. Después guardó el dispositivo. Bit aún pensaba en aquella estrella.'),
        dialogue('—Era muy bonita —dijo.'),
        dialogue('—Sí, llamaba la atención. Pero un premio no decide por nosotros. Si aparece una petición de datos, yo la reviso contigo antes de hacer nada.'),
        body('La abuela abrió su carpeta. Dentro llevaba un dibujo cortado en piezas grandes. Podían seguir armando un rompecabezas de otra manera, sin aceptar la oferta ni enviar una fotografía.'),
      ],
    },
    {
      title: 'Pieza por pieza',
      alt: 'Bit y su abuela arman un rompecabezas de papel sobre la mesa, con la tableta guardada.',
      tone: 'sky',
      blocks: [
        body('Bit extendió las piezas de papel sobre la mesa. La abuela se quedó a su lado y sostuvo una esquina del dibujo mientras él buscaba otra que tuviera el mismo color.'),
        dialogue('—¡Aquí está el centro de la flor! —dijo.'),
        body('Poco a poco apareció una flor de colores. Algunas piezas necesitaron varios intentos. Cuando terminaron, Bit pasó un dedo alrededor del dibujo y comprobó que todas encajaran. La abuela sonrió y le propuso mezclar las piezas para empezar por otro lado. La tableta seguía guardada. Todavía tenían muchas formas de disfrutar aquel momento juntos.'),
      ],
    },
  ],
  rule: 'No pulso ni doy mis datos. Primero lo reviso con la persona adulta que me acompaña.',
  question: '¿Por qué Bit consultó a su abuela antes de tocar la estrella? ¿Qué hicieron para seguir disfrutando juntos sin enviar una foto?',
  activity: 'Dibujen algo con una persona adulta y conviértanlo en un rompecabezas de papel. Mezclen las piezas y ayúdense a reconstruirlo.',
  endingTitle: 'Otra forma de jugar',
});

export const BIT_CARTEL_CLASE_BOOK = readingBook({
  id: 'bit-cartel-clase',
  title: 'Bit y el cartel de la clase',
  lead: 'Bit y Data quieren hacer un cartel de mariposas. Con su maestra descubren cómo usar una cámara sin olvidar el permiso y las ideas de cada quien.',
  accent: '#57a5a1',
  accentStrong: '#286967',
  coverAlt: 'Bit, Data y su maestra de blusa blanca y overol verde azulado preparan un cartel de mariposas.',
  scenes: [
    {
      title: '¿Qué queremos contar?',
      alt: 'Bit, Data y su maestra de blusa blanca y overol verde azulado planean un cartel de mariposas antes de usar la tableta.',
      tone: 'sunshine',
      blocks: [
        body('Bit y Data habían dibujado mariposas en hojas grandes. Data, con su pelo amarillo lleno de puntitas, había hecho unas alas con círculos. Bit había elegido rayas.'),
        body('Su maestra puso una cartulina sobre la mesa, junto a los dibujos que habían terminado. La tableta seguía guardada.'),
        dialogue('—Queremos contar cómo imaginamos nuestras mariposas —dijo—. ¿Qué necesitamos para hacer un cartel?'),
        body('Hablaron de dibujos, colores y un título. Después acordaron usar la cámara, con la maestra presente, para conservar una imagen de sus creaciones antes de pegarlas.'),
      ],
    },
    {
      title: 'La cámara tiene una tarea',
      alt: 'La maestra prepara la cámara y acompaña a Bit a fotografiar los dibujos de mariposas mientras Data los acomoda.',
      tone: 'sky',
      blocks: [
        body('La maestra sacó la tableta, preparó la cámara y se colocó junto a Bit y Data. Sobre la mesa dejaron solamente los dibujos que iban a registrar.'),
        dialogue('—La cámara nos ayudará a recordar cómo eran antes de hacer el cartel. Yo los acompaño mientras la usamos.'),
        body('Data acomodó su mariposa sobre un fondo claro. Bit sostuvo la tableta con ayuda de la maestra. Miraron juntos el encuadre: se veían las alas completas y no hacía falta incluir a nadie más. Tomaron la fotografía y revisaron el resultado los tres.'),
      ],
    },
    {
      title: 'Data prefiere otra cosa',
      alt: 'Data expresa que no quiere aparecer en una fotografía y Bit y la maestra escuchan su decisión sin insistir.',
      tone: 'peach',
      blocks: [
        body('Bit pensó que también quedaría bonita una fotografía de Data junto a las mariposas. Antes de tomarla, se lo preguntó. La maestra seguía con ellos, cerca de la tableta.'),
        dialogue('—Prefiero que no me tomen una foto —respondió Data.'),
        body('Bit bajó la cámara. Había imaginado otra cosa, pero Data ya había dicho lo que quería.'),
        dialogue('—Está bien. Podemos mostrar tu dibujo —propuso.'),
        dialogue('—Si Data está de acuerdo —añadió la maestra—. Para participar en el cartel no hace falta salir en una fotografía.'),
      ],
    },
    {
      title: 'El dibujo también tiene autor',
      alt: 'Bit, Data y la maestra eligen dibujos con permiso y reconocen quién creó cada mariposa antes de guardar la tableta.',
      tone: 'mint',
      blocks: [
        dialogue('—Mi mariposa sí puede ir en el cartel —dijo Data—. Quiero que sepan que yo dibujé esos círculos.'),
        body('Bit estuvo de acuerdo y pidió que su mariposa de rayas llevara también su nombre. La maestra los ayudó a reconocer qué había creado cada quien. No necesitaban fotografías de sus caras para mostrar sus ideas.'),
        body('Los tres eligieron los dibujos que usarían. La maestra organizó las imágenes de la actividad, cerró la cámara y guardó la tableta. Sobre la mesa quedaron las hojas, la cartulina y los colores.'),
      ],
    },
    {
      title: 'Un mural entre todos',
      alt: 'Bit, Data y su maestra terminan un mural de papel con mariposas y los nombres de sus autores; la tableta está guardada.',
      tone: 'lilac',
      blocks: [
        body('La maestra sostuvo la cartulina mientras Bit y Data acomodaban sus dibujos. Pegaron una mariposa junto a la otra y dejaron espacio para un título. Debajo de cada creación colocaron el nombre de quien la había hecho.'),
        dialogue('—Esta tiene mis círculos —dijo Data, señalando sus alas.'),
        dialogue('—Y esta tiene mis rayas —añadió Bit.'),
        body('Los tres miraron el mural terminado. Habían usado la cámara para una tarea concreta y después la habían guardado. En el papel estaban las ideas de ambos, compartidas con permiso y sin obligar a nadie a salir en una foto.'),
      ],
    },
  ],
  rule: 'Primero sabemos para qué. Usamos la tableta con la maestra, pedimos permiso y reconocemos las ideas.',
  question: '¿Cómo siguió participando Data después de decir que no quería una fotografía? ¿Cómo supieron de quién era cada dibujo?',
  activity: 'Con una persona adulta, hagan un mural de dibujos en papel. Pregunten cuáles quiere compartir cada quien y reconozcan a sus autores.',
  endingTitle: 'Nuestras ideas tienen lugar',
});

export const LOWER_PRIMARY_BOOKS: Record<string, IllustratedAudiobookConfig> = {
  [BIT_PUENTE_POR_TERMINAR_BOOK.id]: BIT_PUENTE_POR_TERMINAR_BOOK,
  [BIT_VENTANA_INESPERADA_BOOK.id]: BIT_VENTANA_INESPERADA_BOOK,
  [BIT_BOTON_BRILLANTE_BOOK.id]: BIT_BOTON_BRILLANTE_BOOK,
  [BIT_CARTEL_CLASE_BOOK.id]: BIT_CARTEL_CLASE_BOOK,
};
