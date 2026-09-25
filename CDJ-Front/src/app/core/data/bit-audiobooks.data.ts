import {
  AudiobookNarration,
  AudiobookTextBlock,
  IllustratedAudiobookConfig,
} from '../../shared/illustrated-audiobook/illustrated-audiobook.models';

const narration = (
  audioSrc: string,
  durationLabel: string,
  ...segments: string[]
): AudiobookNarration => ({
  audioSrc,
  durationLabel,
  fallbackSegments: segments.map((text) => ({ text, pauseMs: 460, rate: 0.82, pitch: 1.04 })),
});

const body = (text: string): AudiobookTextBlock => ({ text });
const dialogue = (text: string): AudiobookTextBlock => ({ kind: 'dialogue', text });
const quote = (text: string): AudiobookTextBlock => ({ kind: 'quote', text });
const moral = (text: string): AudiobookTextBlock => ({ kind: 'moral', text });

export const BIT_HOJAS_BOOK: IllustratedAudiobookConfig = {
  id: 'bit-hojas',
  title: 'Bit, Data y el misterio de las hojas',
  accent: '#48a96b',
  accentStrong: '#256d45',
  spreads: [
    {
      id: 'portada',
      kind: 'cover',
      paperTone: 'mint',
      pageLabel: 'Portada',
      lead: 'Una historia para descubrir que, en la escuela, primero pensamos qué queremos aprender y después elegimos la herramienta.',
      leftPage: {
        src: '/cuentos/BitHojas/01-portada.webp',
        alt: 'Bit, Data, Tuercas y su maestra observan una hoja y una tableta en el aula.',
      },
      narration: narration(
        '/audio/cuentos/bit-hojas/01-portada.mp3',
        '0:13',
        'Bit, Data y el misterio de las hojas. Una historia para descubrir que, en la escuela, primero pensamos qué queremos aprender y después elegimos qué herramienta puede ayudarnos.',
      ),
    },
    {
      id: 'pregunta-verde',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'Una pregunta verde',
      pageLabel: 'Escena 1 de 5',
      leftPage: {
        src: '/cuentos/BitHojas/02-pregunta.webp',
        alt: 'La maestra presenta tres hojas diferentes mientras la tableta permanece guardada.',
        pageNumber: 1,
      },
      blocks: [
        body(
          'Una mañana, la maestra puso tres hojas sobre la mesa. Una era larga, otra redonda y otra tenía las orillas como pequeños dientes.',
        ),
        dialogue('—¿Todas las hojas serán iguales? —preguntó.'),
        body('Bit las miró. Data tocó sus bordes con cuidado. Tuercas las olfateó: ¡snif, snif!'),
        dialogue(
          '—Antes de usar una herramienta, debemos saber qué queremos descubrir —explicó la maestra.',
        ),
        moral('Su misión era observar en qué se parecían y en qué eran diferentes.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/02-escena-1.mp3',
        '0:35',
        'Una mañana, la maestra puso tres hojas sobre la mesa. Una era larga, otra redonda y otra tenía las orillas como pequeños dientes.',
        '¿Todas las hojas serán iguales?, preguntó.',
        'Bit las miró. Data tocó sus bordes con cuidado. Tuercas las olfateó: snif, snif.',
        'Antes de usar una herramienta, explicó la maestra, debemos saber qué queremos descubrir.',
        'Ya tenían su misión: observar en qué se parecían y en qué eran diferentes.',
      ),
    },
    {
      id: 'elegimos-herramienta',
      kind: 'scene',
      paperTone: 'sky',
      title: 'Elegimos una herramienta',
      pageLabel: 'Escena 2 de 5',
      leftPage: {
        src: '/cuentos/BitHojas/03-herramienta.webp',
        alt: 'La maestra muestra cómo la cámara de la tableta ayuda a mirar una hoja de cerca.',
        pageNumber: 2,
      },
      blocks: [
        body('Algunos detalles eran tan pequeños que costaba observarlos.'),
        dialogue(
          '—Podemos usar la cámara de una tableta para hacer fotos de cerca y comparar las hojas —propuso la maestra.',
        ),
        body(
          'La tableta no se encendió solo porque estaba allí. La eligieron porque podía ayudarlos con su pregunta.',
        ),
        moral('La pregunta llegó primero. Después eligieron la herramienta.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/03-escena-2.mp3',
        '0:31',
        'Bit acercó mucho sus ojos, pero algunos detalles eran muy pequeños.',
        'Podemos usar la cámara de una tableta para hacer fotos de cerca, propuso la maestra. Así podremos comparar las hojas.',
        'La tableta no se encendió solo porque estaba allí. La eligieron porque podía ayudarlos con su pregunta.',
        'La maestra preparó una tableta de la escuela y explicó la actividad. Todos tendrían una tarea y la usarían juntos.',
      ),
    },
    {
      id: 'ojos-exploradores',
      kind: 'scene',
      paperTone: 'peach',
      title: 'Ojos de exploradores',
      pageLabel: 'Escena 3 de 5',
      leftPage: {
        src: '/cuentos/BitHojas/04-exploradores.webp',
        alt: 'Data sostiene una hoja, Bit la fotografía y la maestra acompaña la actividad.',
        pageNumber: 3,
      },
      blocks: [
        body(
          'Data colocó una hoja sobre una cartulina clara. Bit sostuvo la tableta y la maestra lo ayudó a encuadrarla.',
        ),
        dialogue('—Solo necesitamos fotografiar las hojas —recordó ella.'),
        body('¡Clic! Una hoja lisa. ¡Clic! Una con puntas. ¡Clic! Una con pequeñas líneas.'),
        body('Tuercas esperaba su turno junto a la mesa, moviendo la cola.'),
        moral('Cada fotografía tenía un propósito: ayudarlos a observar mejor.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/04-escena-3.mp3',
        '0:30',
        'Data colocó la primera hoja sobre una cartulina clara. Bit sostuvo la tableta y la maestra lo ayudó a encuadrarla.',
        'Solo necesitamos fotografiar las hojas, recordó ella.',
        'Clic. Una hoja lisa. Clic. Una hoja con puntas. Clic. Una hoja con pequeñas líneas.',
        'Tuercas esperaba su turno junto a la mesa, moviendo la cola.',
        'Cada fotografía tenía un propósito: ayudarlos a observar mejor.',
      ),
    },
    {
      id: 'pantalla-mesa',
      kind: 'scene',
      paperTone: 'lilac',
      title: 'De la pantalla a la mesa',
      pageLabel: 'Escena 4 de 5',
      leftPage: {
        src: '/cuentos/BitHojas/05-comparamos.webp',
        alt: 'Bit y Data comparan fotografías con hojas reales mientras la tableta está en un soporte.',
        pageNumber: 4,
      },
      blocks: [
        body(
          'La maestra colocó la tableta sobre un soporte. A un lado estaban las hojas verdaderas.',
        ),
        dialogue('—¿Qué descubrieron? —preguntó.'),
        dialogue('—Esta hoja tiene bordes suaves —dijo Data.'),
        dialogue('—Y esta parece una pequeña sierra —añadió Bit.'),
        body(
          'Miraron las fotos, tocaron las hojas y comprobaron sus ideas con las manos y los ojos.',
        ),
        moral('La tableta mostraba detalles; las preguntas y respuestas nacían de ellos.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/05-escena-4.mp3',
        '0:36',
        'La maestra colocó la tableta sobre un soporte. A un lado estaban las hojas verdaderas.',
        '¿Qué descubrieron?, preguntó.',
        'Esta hoja tiene bordes suaves, dijo Data.',
        'Y esta parece una pequeña sierra, añadió Bit.',
        'Después separaron las hojas por sus formas. Miraron la pantalla, volvieron a la mesa y comprobaron cada idea con sus manos y sus ojos.',
        'La tableta mostraba los detalles, pero las preguntas y las respuestas nacían de ellos.',
      ),
    },
    {
      id: 'contamos-guardamos',
      kind: 'scene',
      paperTone: 'mint',
      title: 'Lo contamos y guardamos',
      pageLabel: 'Escena 5 de 5',
      leftPage: {
        src: '/cuentos/BitHojas/06-cierre.webp',
        alt: 'Bit y Data muestran su mural de hojas mientras la tableta está apagada y guardada.',
        pageNumber: 5,
      },
      blocks: [
        body('Al terminar de comparar, Bit cerró la cámara y la maestra guardó la tableta.'),
        body(
          'Después hicieron un mural con papel, colores y hojas caídas. Tuercas dejó una huella junto al dibujo.',
        ),
        dialogue('—¡Ya resolvimos el misterio! Las hojas tienen formas y detalles diferentes.'),
        moral('La tableta cumplió su tarea. Era momento de compartir lo aprendido.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/06-escena-5.mp3',
        '0:36',
        'Cuando terminaron de comparar, Bit cerró la cámara. La maestra guardó la tableta en su lugar.',
        'Luego, Bit y Data dibujaron las hojas en un mural. Usaron papel, colores y algunas hojas caídas que habían recogido con la maestra. Tuercas dejó una pequeña huella junto al dibujo.',
        '¡Ya resolvimos el misterio!, celebró Bit. Las hojas tienen formas y detalles diferentes.',
        'La tableta cumplió su tarea. Ahora era momento de guardar y compartir lo aprendido.',
      ),
    },
    {
      id: 'regla',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'Nuestra regla de exploradores',
      pageLabel: 'Regla final',
      leftPage: {
        src: '/cuentos/BitHojas/06-cierre.webp',
        alt: 'El mural terminado recuerda que la pregunta y el aprendizaje guían la actividad.',
        objectPosition: 'center 42%',
      },
      blocks: [
        body(
          'Un dispositivo no dirige la actividad: la pregunta y el aprendizaje indican cuándo puede ser útil.',
        ),
        quote('Primero la pregunta; después, la herramienta. Aprendemos y la guardamos.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-hojas/07-cierre.mp3',
        '0:19',
        'Bit, Data y Tuercas aprendieron que un dispositivo no dirige la actividad: la pregunta y el aprendizaje indican cuándo puede ser útil.',
        'Repitamos su regla: primero la pregunta; después, la herramienta. Aprendemos y la guardamos.',
      ),
    },
  ],
  ending: {
    illustration: { src: '/cuentos/cierres/hojas.webp', alt: '' },
    title: '¡Misterio resuelto!',
    subtitle: 'La herramienta tuvo un propósito y volvió a su lugar al terminar.',
    ruleLabel: 'La regla del aula:',
    rule: 'Primero la pregunta; después, la herramienta. Aprendemos y la guardamos.',
  },
};

export const BIT_PLAN_CASA_BOOK: IllustratedAudiobookConfig = {
  id: 'bit-plan-casa',
  title: 'Bit, Data y el plan de casa',
  accent: '#f09a42',
  accentStrong: '#a94c2f',
  spreads: [
    {
      id: 'portada',
      kind: 'cover',
      paperTone: 'peach',
      pageLabel: 'Portada',
      lead: 'Una pantalla, muchos momentos. Antes de encenderla, la familia hace un plan.',
      leftPage: {
        src: '/cuentos/BitPlanCasa/01-portada.webp',
        alt: 'Bit, Data y Tuercas preparan un plan familiar antes de usar la tableta.',
      },
      narration: narration(
        '/audio/cuentos/bit-plan-casa/01-portada.mp3',
        '0:18',
        'En casa de Bit había una tableta, muchas ideas y una regla muy especial: antes de encender una pantalla, la familia hacía un plan. ¿Quieres descubrirlo con Bit, Data y Tuercas?',
      ),
    },
    {
      id: 'hacemos-plan',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'Hacemos un plan',
      pageLabel: 'Escena 1 de 5',
      leftPage: {
        src: '/cuentos/BitPlanCasa/02-plan.webp',
        alt: 'Bit y su familia acuerdan para qué y durante cuánto tiempo usarán la tableta.',
        pageNumber: 1,
      },
      blocks: [
        body('Después de la merienda, Bit tomó la tableta.'),
        dialogue('—¿La encendemos? —preguntó.'),
        body(
          'Una persona adulta se sentó junto a él. Buscarían una receta de ensalada de frutas para servirla en vasitos y guardarían la tableta cuando sonara el reloj.',
        ),
        quote('Primero acordamos.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/02-escena-1.mp3',
        '0:27',
        'Después de la merienda, Bit tomó la tableta.',
        '¿La encendemos?, preguntó.',
        'Una persona adulta de su familia se sentó junto a él. Primero eligieron para qué usarla: buscarían una receta de ensalada de frutas para servirla en vasitos. Después acordaron el tiempo: la guardarían cuando sonara el reloj.',
        'Primero acordamos, dijeron todos.',
      ),
    },
    {
      id: 'juntos',
      kind: 'scene',
      paperTone: 'sky',
      title: 'La usamos juntos',
      pageLabel: 'Escena 2 de 5',
      leftPage: {
        src: '/cuentos/BitPlanCasa/03-juntos.webp',
        alt: 'La tableta está en un soporte mientras la familia observa una receta de frutas.',
        pageNumber: 2,
      },
      blocks: [
        body(
          'La persona adulta colocó la tableta sobre un soporte para que todos pudieran verla. La receta mostraba manzana, plátano, fresa y mango.',
        ),
        body('Data señaló los colores, Bit contó las frutas y Tuercas movió la cola.'),
        dialogue('—Juntos la usamos —recordó Bit.'),
        moral('La pantalla tenía un propósito y nadie la usaba a solas.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/03-escena-2.mp3',
        '0:24',
        'La persona adulta colocó la tableta sobre un soporte para que todos pudieran verla. En la receta aparecían manzana, plátano, fresa y mango.',
        'Data señaló los colores y Bit contó las frutas. Tuercas movió la cola al escuchar cada nombre. Nadie usaba la pantalla a solas.',
        'Juntos la usamos, recordó Bit.',
      ),
    },
    {
      id: 'descanso',
      kind: 'scene',
      paperTone: 'mint',
      title: 'La pantalla también descansa',
      pageLabel: 'Escena 3 de 5',
      leftPage: {
        src: '/cuentos/BitPlanCasa/04-descanso.webp',
        alt: 'La tableta descansa apagada mientras una persona adulta corta fruta y la familia prepara vasitos.',
        pageNumber: 3,
      },
      blocks: [
        body(
          'Cuando entendieron la receta, apagaron la pantalla. La persona adulta lavó y cortó la fruta en trozos seguros; Bit y Data ayudaron a repartirla en vasitos.',
        ),
        body('Bit mezcló colores, Data ordenó las piezas y Tuercas esperó su turno para jugar.'),
        quote('Manos en acción, pantalla en descanso.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/04-escena-3.mp3',
        '0:24',
        'Cuando entendieron la receta, la persona adulta apagó la pantalla y colocó la tableta en su lugar. Después lavó y cortó la fruta en trozos seguros.',
        'Bit mezcló colores en los vasitos, Data ayudó a repartirlos y Tuercas esperó su turno para jugar.',
        'Manos en acción, pantalla en descanso, cantaron.',
      ),
    },
    {
      id: 'guardamos',
      kind: 'scene',
      paperTone: 'lilac',
      title: 'Terminamos con calma',
      pageLabel: 'Escena 4 de 5',
      leftPage: {
        src: '/cuentos/BitPlanCasa/05-guardar.webp',
        alt: 'Una persona adulta acompaña a Bit a guardar la tableta cuando suena el reloj.',
        pageNumber: 4,
      },
      blocks: [
        body(
          'Encendieron la tableta otra vez para revisar el último paso. Poco después, el reloj hizo: tin, tin.',
        ),
        dialogue(
          '—Sé que cuesta parar cuando algo nos gusta. Terminamos este paso y la guardamos juntos.',
        ),
        body('Bit respiró, cerró la receta y llevó la tableta a su lugar.'),
        moral('Avisamos, terminamos y guardamos.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/05-escena-4.mp3',
        '0:25',
        'Para revisar el último paso, encendieron otra vez la tableta. Poco después, el reloj hizo: tin, tin. Bit quería seguir mirando.',
        'La persona adulta le dijo con calma: sé que cuesta parar cuando algo nos gusta. Terminamos este paso y la guardamos juntos.',
        'Bit respiró, cerró la receta y llevó la tableta a su lugar.',
      ),
    },
    {
      id: 'compartimos',
      kind: 'scene',
      paperTone: 'peach',
      title: 'Tiempo para compartir',
      pageLabel: 'Escena 5 de 5',
      leftPage: {
        src: '/cuentos/BitPlanCasa/06-cierre.webp',
        alt: 'La familia comparte fruta y juega en una casa de cojines con la tableta guardada.',
        pageNumber: 5,
      },
      blocks: [
        body(
          'Con los vasitos de fruta listos, la familia se sentó a conversar y probar los sabores.',
        ),
        body(
          'Después, Bit, Data y Tuercas construyeron una casita con cojines y buscaron tesoros.',
        ),
        moral(
          'Guardar la tableta no terminaba la diversión: abría espacio para otro momento especial.',
        ),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/06-escena-5.mp3',
        '0:27',
        'Con los vasitos de fruta listos, la familia se sentó a conversar y probar los sabores.',
        'Después, Bit, Data y Tuercas construyeron una casita con cojines y jugaron a encontrar tesoros.',
        'Bit descubrió que guardar la tableta no terminaba la diversión: abría espacio para otro momento especial. La pantalla podía esperar hasta el próximo plan familiar.',
      ),
    },
    {
      id: 'regla',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'El plan de casa',
      pageLabel: 'Regla final',
      leftPage: {
        src: '/cuentos/BitPlanCasa/06-cierre.webp',
        alt: 'La familia reunida recuerda su acuerdo para usar y guardar la tableta.',
        objectPosition: 'center 42%',
      },
      blocks: [
        body(
          'En la familia de Bit acordaron usar las pantallas con un propósito, en compañía y durante el tiempo acordado.',
        ),
        body(
          'Cuando llega el momento de terminar, avisamos, cerramos con calma y volvemos a compartir.',
        ),
        quote('Primero acordamos. Juntos la usamos. Después la guardamos.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-plan-casa/07-cierre.mp3',
        '0:24',
        'En la familia de Bit acordaron usar las pantallas con un propósito, en compañía y durante el tiempo acordado.',
        'Cuando llega el momento de terminar, avisamos, cerramos con calma y volvemos a compartir.',
        'Repitamos la regla de Bit: primero acordamos, juntos la usamos y después la guardamos.',
      ),
    },
  ],
  ending: {
    illustration: { src: '/cuentos/cierres/casa.webp', alt: '' },
    title: '¡Plan cumplido!',
    subtitle: 'Hubo un momento para aprender con la tableta y muchos momentos para compartir.',
    ruleLabel: 'La regla de casa:',
    rule: 'Primero acordamos. Juntos la usamos. Después la guardamos.',
  },
};

export const BIT_ROTONDA_BOOK: IllustratedAudiobookConfig = {
  id: 'bit-rotonda',
  title: 'Bit, Data y el juego de la plaza',
  accent: '#dda431',
  accentStrong: '#785516',
  spreads: [
    {
      id: 'portada',
      kind: 'cover',
      paperTone: 'sky',
      pageLabel: 'Portada',
      lead: 'Una tarde en la Rotonda de las y los Jaliscienses Ilustres para guardar, mirar alrededor y volver a elegir.',
      leftPage: {
        src: '/cuentos/BitRotonda/01-portada.webp',
        alt: 'Bit levanta la mirada mientras Data, Tuercas y varias familias juegan frente a la Rotonda.',
      },
      narration: narration(
        '/audio/cuentos/bit-rotonda/01-portada.mp3',
        '0:16',
        'Esta es la historia de Bit, Data, Tuercas y una tarde en la plaza. Había una tableta, muchas risas y un juego que solo podía suceder en ese momento. ¿Quieres escuchar?',
      ),
    },
    {
      id: 'tarde-plaza',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'Una tarde en la plaza',
      pageLabel: 'Escena 1 de 5',
      leftPage: {
        src: '/cuentos/BitRotonda/02-acuerdo.webp',
        alt: 'Bit y tía Sol acuerdan cuándo guardar la tableta frente a la Rotonda.',
        pageNumber: 1,
      },
      blocks: [
        body(
          'Bit llegó con Data, Tuercas y tía Sol. Frente a ellos estaban las columnas de la Rotonda y, más atrás, las torres de la Catedral.',
        ),
        body('Bit quería terminar una partida y tía Sol le mostró el reloj.'),
        dialogue('—Cuando suene la alarma, guardamos y elegimos juntos qué hacer después.'),
        moral('Bit estuvo de acuerdo.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/02-escena-1.mp3',
        '0:27',
        'En el centro de Guadalajara, Bit llegó a la plaza con Data, Tuercas y tía Sol.',
        'Frente a ellos se levantaban las columnas redondas de la Rotonda y, más atrás, las torres de la Catedral.',
        'Bit quería terminar una partida. Tía Sol le mostró el reloj: cuando suene la alarma, guardamos y elegimos juntos qué hacer después.',
        'Bit estuvo de acuerdo.',
      ),
    },
    {
      id: 'mientras-miraba',
      kind: 'scene',
      paperTone: 'peach',
      title: 'Mientras Bit miraba…',
      pageLabel: 'Escena 2 de 5',
      leftPage: {
        src: '/cuentos/BitRotonda/03-alrededor.webp',
        alt: 'Bit mira un rompecabezas mientras familias, niñas y niños juegan en la plaza.',
        pageNumber: 2,
      },
      blocks: [
        body('¡Pi-pí! sonó la alarma, pero Bit seguía concentrado en el rompecabezas.'),
        body('A veces cuesta cambiar de actividad cuando algo nos gusta mucho.'),
        body(
          'Data perseguía una burbuja, Tuercas movía la cola y varias familias jugaban a la ronda.',
        ),
        dialogue('Sonaron palmas, risas y una voz que llamó: «¡Ven, Bit!»'),
        moral('Bit aún no notaba todo lo que estaba pasando.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/03-escena-2.mp3',
        '0:27',
        'La alarma hizo pi, pi, pero Bit seguía mirando el rompecabezas. A veces cuesta cambiar de actividad cuando algo nos gusta mucho.',
        'Mientras tanto, Data perseguía una burbuja, Tuercas movía la cola y varias familias jugaban a la ronda sobre la plaza.',
        'Sonaron unas palmas, una risa y un: ¡ven, Bit! Bit aún no se daba cuenta de todo lo que estaba pasando.',
      ),
    },
    {
      id: 'puente',
      kind: 'scene',
      paperTone: 'lilac',
      title: 'Un puente para cambiar',
      pageLabel: 'Escena 3 de 5',
      leftPage: {
        src: '/cuentos/BitRotonda/04-transicion.webp',
        alt: 'Tía Sol se pone a la altura de Bit y lo acompaña a guardar su avance.',
        pageNumber: 3,
      },
      blocks: [
        body('Tía Sol no le quitó la tableta ni lo regañó. Se agachó para mirarlo a los ojos.'),
        dialogue(
          '—Veo que cuesta parar. Primero guardamos tu avance; después cerramos la pantalla; luego respiramos juntos.',
        ),
        body('Bit guardó la partida para otro momento, cerró la tableta y soltó el aire despacio.'),
        moral('Una persona adulta puede ayudarnos a cambiar de actividad.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/04-escena-3.mp3',
        '0:26',
        'Tía Sol no le quitó la tableta ni lo regañó. Se agachó para mirarlo a los ojos y dijo: veo que cuesta parar.',
        'Hagamos un puente para cambiar: primero guardamos tu avance; después cerramos la pantalla; luego respiramos juntos.',
        'Bit tocó el símbolo de guardar. La partida quedó lista para otro momento. Cerró la tableta y soltó el aire muy despacio.',
      ),
    },
    {
      id: 'tres-pistas',
      kind: 'scene',
      paperTone: 'mint',
      title: 'Tres pistas de la plaza',
      pageLabel: 'Escena 4 de 5',
      leftPage: {
        src: '/cuentos/BitRotonda/05-pistas.webp',
        alt: 'Bit escucha campanas, mira hojas al viento y observa a Data jugar con Tuercas.',
        pageNumber: 4,
      },
      blocks: [
        dialogue('—Busca algo que suene, algo que se mueva y algo que te haga sonreír.'),
        body('Bit oyó las campanas: tan, tan. Vio las hojas moverse con el viento.'),
        body('Después encontró a Data haciendo cosquillas a Tuercas. Los dos reían.'),
        moral('La plaza no había estado callada; Bit apenas comenzaba a escucharla.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/05-escena-4.mp3',
        '0:27',
        'Ahora busca tres pistas, propuso tía Sol. Algo que suene, algo que se mueva y algo que te haga sonreír.',
        'Bit escuchó: tan, tan, sonaban las campanas. Miró arriba: las hojas se movían con el viento.',
        'Miró al frente: Data hacía cosquillas a Tuercas y los dos reían. La plaza no había estado callada; Bit apenas comenzaba a escucharla.',
      ),
    },
    {
      id: 'juego-aqui',
      kind: 'scene',
      paperTone: 'sky',
      title: 'El juego de aquí',
      pageLabel: 'Escena 5 de 5',
      leftPage: {
        src: '/cuentos/BitRotonda/06-cierre.webp',
        alt: 'Bit participa con otras niñas y niños en un juego de observación frente a la Rotonda.',
        pageNumber: 5,
      },
      blocks: [
        dialogue('—¿Todavía puedo jugar? —preguntó Bit.'),
        dialogue('—¡Claro! —respondieron.'),
        body(
          'Hicieron una ronda y después un “veo, veo” con las columnas, las estatuas y los colores de la plaza.',
        ),
        body('La tableta seguía guardada y segura. Podría usarla en otro momento.'),
        quote('Ahora quiero jugar aquí.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/06-escena-5.mp3',
        '0:31',
        'Bit se acercó y preguntó: ¿todavía puedo jugar? Claro, respondieron.',
        'Primero hicieron una ronda; después inventaron un veo, veo con las columnas, las estatuas y los colores de la plaza.',
        'Bit encontró un árbol con flores, una torre dorada y una sonrisa enorme en Data.',
        'La tableta seguía guardada y segura. Podría usarla en otro momento. Ahora Bit había elegido estar allí.',
      ),
    },
    {
      id: 'regla',
      kind: 'scene',
      paperTone: 'sunshine',
      title: 'La regla de Bit',
      pageLabel: 'Regla final',
      leftPage: {
        src: '/cuentos/BitRotonda/06-cierre.webp',
        alt: 'Bit juega acompañado y observa la plaza con la tableta guardada.',
        objectPosition: 'center 44%',
      },
      blocks: [
        body('Cuando termina el tiempo acordado, Bit recuerda cuatro pasos.'),
        quote('Guardo. Cierro. Miro a mi alrededor. Me uno a lo que sigue.'),
        moral('Si cambiar de actividad cuesta, pedir ayuda está bien.'),
      ],
      narration: narration(
        '/audio/cuentos/bit-rotonda/07-cierre.mp3',
        '0:15',
        'Cuando termina el tiempo acordado, Bit recuerda cuatro pasos: guardo, cierro, miro a mi alrededor y me uno a lo que sigue.',
        'Si cambiar de actividad cuesta, pedir ayuda está bien.',
      ),
    },
  ],
  ending: {
    illustration: { src: '/cuentos/cierres/plaza.webp', alt: '' },
    title: '¡Bit volvió a elegir!',
    subtitle: 'La tableta podía esperar. El juego de la plaza estaba sucediendo ahora.',
    ruleLabel: 'La regla de Bit:',
    rule: 'Guardo · cierro · miro · me uno.',
  },
};
