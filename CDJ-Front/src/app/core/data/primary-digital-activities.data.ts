import { IllustratedActivityConfig } from '../../shared/illustrated-activity/illustrated-activity.models';

// Original classroom stories. The notices, names and permissions in the challenges are fictional.
const PRIVACY_SOURCE = {
  label: 'INCIBE · Privacidad y acompañamiento de niñas y niños',
  url: 'https://www.incibe.es/menores/tematicas/privacidad',
};

const FAMILY_SOURCE = {
  label: 'UNICEF · Acompañar experiencias seguras en Internet',
  url: 'https://www.unicef.org/parenting/child-care/keep-your-child-safe-online',
};

const VERIFICATION_SOURCE = {
  label: 'UNESCO · Aprender a verificar información mediante casos',
  url: 'https://www.unesco.org/mil4teachers/en/module4/unit5',
};

const AUTHORSHIP_SOURCE = {
  label: 'Creative Commons · Autoría y condiciones para compartir obras',
  url: 'https://creativecommons.org/cc-licenses/',
};

export const LUNA_ACTIVITY: IllustratedActivityConfig = {
  id: 'luna-cajita-importante',
  title: 'Luna y la cajita de las cosas importantes',
  ageLabel: 'Primaria alta · 9 a 11 años',
  intro:
    'Luna ya sabe que sus datos se cuidan. Ahora necesita decidir qué información hace falta compartir, qué permisos conviene aceptar y qué hacer cuando una aplicación pide más de lo necesario.',
  cover: {
    src: '/cuentos/primaria/carteles/luna.webp',
    alt: 'Luna, con vestido amarillo, y su compañera Nube descubren una cajita junto a una tableta.',
  },
  scenes: [
    {
      id: 'luna-datos-necesarios',
      title: '¿De verdad necesita saberlo?',
      image: {
        src: '/cuentos/primaria/luna/01-escena.webp',
        alt: 'Luna y Nube revisan un formulario en la tableta mientras una persona adulta está cerca.',
      },
      paragraphs: [
        'Luna y Nube encontraron una herramienta para crear un jardín digital. Antes de empezar, apareció un formulario que pedía nombre completo, fecha de nacimiento y dirección.',
        'Luna recordó que una aplicación puede pedir información aunque no sea necesaria para lo que quiere hacer.',
      ],
      prompt: '¿Qué conviene hacer antes de completar el formulario?',
      choices: [
        {
          id: 'llenar-todo',
          label: 'Llenarlo completo porque la aplicación lo pide.',
          feedback:
            'Que un campo aparezca en pantalla no significa que sea necesario. Conviene revisar para qué se solicita cada dato antes de entregarlo.',
          correct: false,
        },
        {
          id: 'revisar-necesidad',
          label: 'Revisar qué datos son realmente necesarios y pedir ayuda si no está claro.',
          feedback:
            'Luna se detiene y revisa el propósito del formulario con una persona adulta. Si un dato no hace falta para la actividad, no tienen por qué entregarlo.',
          correct: true,
        },
        {
          id: 'inventar-datos-ajenos',
          label: 'Usar los datos de otra persona para poder entrar.',
          feedback:
            'Los datos de otras personas también merecen cuidado. La solución no es sustituir unos datos por otros, sino revisar qué información necesita realmente el servicio.',
          correct: false,
        },
      ],
      takeaway: 'Antes de compartir un dato, pregunto para qué lo necesitan y si realmente hace falta.',
      paperTone: 'sunshine',
    },
    {
      id: 'luna-foto-contexto',
      title: 'Una foto dice más de lo que parece',
      image: {
        src: '/cuentos/primaria/luna/02-escena.webp',
        alt: 'Luna y una persona adulta comparan un dibujo con una fotografía que muestra una casa.',
      },
      paragraphs: [
        'Para una actividad escolar, Luna quiere mostrar cómo cuida las plantas. Tiene una foto frente a su casa y un dibujo del jardín.',
        'Al mirar con atención, descubre que en la fotografía también aparecen el número de la casa y una credencial colgada de su mochila.',
      ],
      prompt: '¿Qué decisión protege mejor su privacidad y permite mostrar su idea?',
      choices: [
        {
          id: 'subir-foto',
          label: 'Subir la foto porque lo importante son las plantas.',
          feedback:
            'Una imagen puede revelar información en el fondo aunque esa no sea la intención. Conviene revisar toda la imagen antes de compartirla.',
          correct: false,
        },
        {
          id: 'solo-tapar-cara',
          label: 'Tapar su cara y compartir el resto de la foto.',
          feedback:
            'Tapar el rostro no elimina el número de la casa ni la credencial. La privacidad depende de todo lo que puede verse, no solo de la cara.',
          correct: false,
        },
        {
          id: 'usar-dibujo',
          label: 'Usar el dibujo o crear una imagen que no muestre datos personales.',
          feedback:
            'Luna comunica su idea sin revelar información innecesaria. También aprende a revisar el fondo de una imagen antes de compartirla.',
          correct: true,
        },
      ],
      takeaway: 'Antes de compartir una imagen, reviso a las personas, los objetos y las pistas que aparecen alrededor.',
      paperTone: 'sky',
    },
    {
      id: 'luna-permisos',
      title: 'Un permiso no es automático',
      image: {
        src: '/cuentos/primaria/luna/03-escena.webp',
        alt: 'Luna y Nube conversan con una persona adulta junto a la tableta mientras revisan una solicitud de permiso.',
      },
      paragraphs: [
        'La herramienta muestra un botón para grabar una explicación. Al tocarlo, pide permiso para usar el micrófono.',
        'Luna quiere grabar una sola vez, pero la pantalla no explica con claridad si el micrófono seguirá disponible después.',
      ],
      prompt: '¿Qué decisión tiene más sentido?',
      choices: [
        {
          id: 'permitir-siempre',
          label: 'Aceptar siempre para que la aplicación funcione mejor.',
          feedback:
            'Dar acceso permanente ofrece más permiso del que Luna necesita para una sola grabación. Conviene limitar el acceso cuando sea posible.',
          correct: false,
        },
        {
          id: 'revisar-permiso',
          label: 'Revisar las opciones y permitir el micrófono solo cuando sea necesario.',
          feedback:
            'Luna revisa el permiso con una persona adulta y elige la opción más limitada que permite realizar la actividad.',
          correct: true,
        },
        {
          id: 'aceptar-sin-leer',
          label: 'Aceptar rápido y cambiarlo después si ocurre algo.',
          feedback:
            'Los permisos conviene revisarlos antes. Hacer una pausa permite decidir qué acceso necesita realmente la herramienta.',
          correct: false,
        },
      ],
      takeaway: 'Los permisos se revisan: una aplicación no necesita acceso permanente a todo mi dispositivo.',
      paperTone: 'peach',
    },
    {
      id: 'luna-ya-comparti',
      title: 'Todavía puedo actuar',
      image: {
        src: '/cuentos/primaria/luna/03-escena.webp',
        alt: 'La persona adulta escucha a Luna con calma mientras Nube la acompaña.',
      },
      paragraphs: [
        'Luna recuerda que el día anterior compartió una imagen sin revisar el fondo. Ahora se da cuenta de que aparecía información que preferiría mantener privada.',
        'Le preocupa que sea demasiado tarde para hacer algo, pero Nube le recuerda que pedir ayuda también sirve después de compartir.',
      ],
      prompt: '¿Qué puede hacer Luna ahora?',
      choices: [
        {
          id: 'ignorar',
          label: 'No hacer nada porque ya se compartió.',
          feedback:
            'Aunque no siempre sea posible retirar todas las copias, todavía puede revisar dónde está la imagen, eliminarla cuando sea posible y pedir apoyo.',
          correct: false,
        },
        {
          id: 'pedir-ayuda-revisar',
          label: 'Contarlo, revisar dónde se compartió y usar las opciones disponibles para retirarla o limitarla.',
          feedback:
            'Luna pide ayuda sin ocultar lo ocurrido. Juntas revisan la publicación, los permisos y las opciones para reducir la exposición.',
          correct: true,
        },
        {
          id: 'mandar-otra',
          label: 'Compartir otra imagen para que la anterior deje de llamar la atención.',
          feedback:
            'Publicar más contenido no elimina el anterior y puede aumentar la exposición. Es mejor actuar directamente sobre lo que ya se compartió.',
          correct: false,
        },
      ],
      takeaway: 'Si compartí algo por error, puedo pedir ayuda, revisar opciones y actuar para reducir la exposición.',
      paperTone: 'mint',
    },
  ],
  ending: {
    title: '¡Luna cuida su cajita con mejores decisiones!',
    message:
      'Luna descubrió que la privacidad no consiste solo en guardar secretos: también implica compartir únicamente lo necesario, revisar imágenes completas, controlar permisos y saber qué hacer si algo ya salió de su cajita.',
    rule: 'Comparto solo lo necesario, reviso antes de aceptar y pido ayuda si algo no me queda claro.',
    image: {
      src: '/cuentos/primaria/luna/cierre.webp',
      alt: 'Luna y Nube celebran acompañadas por una persona adulta, con su dibujo y una cajita.',
    },
  },
  sources: [PRIVACY_SOURCE, FAMILY_SOURCE],
};

export const DETECTIVES_ACTIVITY: IllustratedActivityConfig = {
  id: 'detectives-pistas',
  title: 'Detectives de las pistas',
  ageLabel: 'Primaria alta · 9 a 11 años',
  intro:
    'Un aviso cambió los planes del equipo. Examina las pistas con Bit y decide qué sabemos, qué no sabemos y qué conviene comprobar. La escuela y todos los avisos de este caso son inventados.',
  cover: {
    src: '/cuentos/primaria/carteles/detectives.webp',
    alt: 'Un equipo de estudiantes y Bit investiga avisos escolares con una tableta y una lupa.',
  },
  scenes: [
    {
      id: 'detectives-fuente',
      title: '¿De dónde salió el aviso?',
      image: {
        src: '/cuentos/primaria/detectives/01-escena.webp',
        alt: 'Estudiantes comparan un aviso recortado en una tableta mientras Bit observa las pistas.',
      },
      paragraphs: [
        'En la Escuela del Árbol preparan una feria de inventos. Alguien encuentra una imagen que dice que la feria cambió de lugar.',
        'Bit propone mirar quién escribió el aviso antes de cambiar los planes del equipo.',
      ],
      prompt: 'Con estas pistas, ¿qué podemos concluir?',
      evidence: [
        {
          id: 'fuente-recorte',
          label: 'Abrir el aviso',
          text: 'AVISO DEL CASO: «La feria de inventos cambia a la biblioteca». La imagen está recortada y no muestra firma, fecha ni dónde se publicó.',
        },
        {
          id: 'fuente-origen',
          label: 'Revisar de dónde llegó',
          text: 'El archivo se llama aviso-feria.png. Quien lo mostró dice: «Me pasaron esta imagen, pero no sé quién la hizo».',
        },
      ],
      requiredEvidenceIds: ['fuente-recorte', 'fuente-origen'],
      choices: [
        {
          id: 'recorte-falso',
          label: 'Es falso porque no tiene firma.',
          feedback:
            'La falta de firma nos deja sin una pista; no demuestra que el contenido sea falso. Necesitamos encontrar su origen y comprobarlo.',
          correct: false,
        },
        {
          id: 'recorte-confirmado',
          label: 'Está confirmado porque parece un aviso.',
          feedback:
            'El aspecto del archivo no confirma quién lo escribió. Puede ser un aviso real, una versión antigua o una imagen modificada.',
          correct: false,
        },
        {
          id: 'recorte-pendiente',
          label: 'Todavía no está confirmado: falta revisar su origen.',
          feedback:
            'Por ahora no sabemos quién lo emitió ni a qué fecha corresponde. El equipo conserva la duda y busca el aviso original con la docente.',
          correct: true,
        },
      ],
      takeaway:
        'Que falte la fuente no demuestra que algo sea falso; indica qué necesitamos comprobar.',
      paperTone: 'sky',
    },
    {
      id: 'detectives-fecha',
      title: 'El año cambia la pista',
      image: {
        src: '/cuentos/primaria/detectives/02-escena.webp',
        alt: 'El equipo revisa el origen y la fecha de varios avisos junto a un calendario.',
      },
      paragraphs: [
        'La docente encuentra el aviso completo en el archivo de la escuela. Sí lo publicó la dirección.',
        'Pero encontrar una fuente no termina la investigación: el equipo también compara las fechas.',
      ],
      prompt: '¿Este aviso confirma dónde será la feria de este año?',
      evidence: [
        {
          id: 'fecha-archivo',
          label: 'Leer el aviso completo',
          text: 'ARCHIVO DEL CASO · Dirección · Publicado: 10 de mayo de 2029. «La feria del 15 de mayo de 2029 se realizará en la biblioteca por mantenimiento del patio».',
        },
        {
          id: 'fecha-actual',
          label: 'Mirar el calendario del caso',
          text: 'HOY EN ESTA HISTORIA: 12 de mayo de 2030. El grupo prepara la feria del 15 de mayo de 2030.',
        },
      ],
      requiredEvidenceIds: ['fecha-archivo', 'fecha-actual'],
      choices: [
        {
          id: 'fecha-otra-feria',
          label: 'No: habla de la feria del año anterior.',
          feedback:
            'El aviso es de 2029 y el equipo prepara la feria de 2030. Puede haber sido correcto en su momento, pero no confirma los planes actuales.',
          correct: true,
        },
        {
          id: 'fecha-mismo-mes',
          label: 'Sí: coincide el día y el mes.',
          feedback:
            'Coinciden el día y el mes, pero los años son distintos. Para este evento hace falta información de la feria de 2030.',
          correct: false,
        },
        {
          id: 'fecha-autoridad',
          label: 'Sí: la dirección lo publicó.',
          feedback:
            'Saber quién lo publicó ayuda, pero también importa cuándo y para qué evento. Un aviso anterior no actualiza por sí solo los planes de este año.',
          correct: false,
        },
      ],
      takeaway: 'Una información auténtica puede dejar de servir si cambia la fecha o el contexto.',
      paperTone: 'sunshine',
    },
    {
      id: 'detectives-comparar',
      title: 'Dos avisos, dos actividades',
      image: {
        src: '/cuentos/primaria/detectives/03-escena.webp',
        alt: 'Una docente y el equipo comparan dos avisos y organizan sus conclusiones con Bit.',
      },
      paragraphs: [
        'Ahora tienen dos avisos de este año. Uno menciona el patio y otro la biblioteca.',
        '—¿Se contradicen? —pregunta alguien. El equipo lee a qué actividad se refiere cada uno.',
      ],
      prompt: '¿Cuál es la explicación que apoyan ambos avisos?',
      evidence: [
        {
          id: 'comparar-feria',
          label: 'Consultar el programa general',
          text: 'PROGRAMA DEL CASO · Dirección · 11 de mayo de 2030. «Feria de inventos: 15 de mayo, de 10 a 12, en el patio. Participan todos los equipos».',
        },
        {
          id: 'comparar-robots',
          label: 'Consultar el aviso del taller',
          text: 'AVISO DEL CASO · Docente del taller de robots · 12 de mayo de 2030. «La prueba de robots del 15 de mayo, a las 11, cambia a la biblioteca. El resto de la feria sigue en el patio».',
        },
      ],
      requiredEvidenceIds: ['comparar-feria', 'comparar-robots'],
      choices: [
        {
          id: 'comparar-todo-cambia',
          label: 'Toda la feria cambió a la biblioteca.',
          feedback:
            'El aviso del taller limita el cambio a la prueba de robots. También dice que el resto de la feria continúa en el patio.',
          correct: false,
        },
        {
          id: 'comparar-alcance',
          label: 'La feria sigue en el patio; la prueba de robots cambia.',
          feedback:
            'Los avisos hablan de actividades distintas y sus datos encajan. Leer el alcance del cambio evita extenderlo a toda la feria.',
          correct: true,
        },
        {
          id: 'comparar-descartar-nuevo',
          label: 'Hay que ignorar el aviso del taller porque es diferente.',
          feedback:
            'Una diferencia merece revisión. Aquí el aviso más específico explica un cambio del taller que puede convivir con el programa general.',
          correct: false,
        },
      ],
      takeaway:
        'Comparo el contenido completo: dos avisos distintos pueden referirse a cosas diferentes.',
      paperTone: 'mint',
    },
    {
      id: 'detectives-conclusion',
      title: 'Decir hasta dónde sabemos',
      image: {
        src: '/cuentos/primaria/detectives/03-escena.webp',
        alt: 'El equipo prepara una conclusión con las pistas revisadas y consulta una duda con la docente.',
      },
      paragraphs: [
        'Antes de avisar al grupo, aparece otra pregunta: «¿El taller de dibujo también irá a la biblioteca?».',
        'El equipo revisa lo que tiene. Prefiere separar lo confirmado de lo que todavía necesita preguntar.',
      ],
      prompt: '¿Qué mensaje pueden comunicar al grupo?',
      evidence: [
        {
          id: 'conclusion-verificado',
          label: 'Repasar lo confirmado',
          text: 'PISTAS COMPROBADAS DEL CASO: el programa de dirección mantiene la feria en el patio. El aviso de la docente de robots cambia únicamente su prueba a la biblioteca.',
        },
        {
          id: 'conclusion-duda',
          label: 'Revisar la nueva pregunta',
          text: 'SOBRE EL TALLER DE DIBUJO: nadie ha presentado un aviso de cambio ni ha preguntado a su docente. No hay una confirmación de que vaya a la biblioteca.',
        },
      ],
      requiredEvidenceIds: ['conclusion-verificado', 'conclusion-duda'],
      choices: [
        {
          id: 'conclusion-todos',
          label: 'Los dos talleres van a la biblioteca.',
          feedback:
            'Solo tenemos un cambio confirmado para robots. Extenderlo a dibujo añadiría información que las pistas no sostienen.',
          correct: false,
        },
        {
          id: 'conclusion-dibujo-falso',
          label: 'El cambio de dibujo es falso; nadie trajo un aviso.',
          feedback:
            'No encontrar un aviso todavía no demuestra que el cambio sea falso. Se puede consultar a la persona responsable del taller.',
          correct: false,
        },
        {
          id: 'conclusion-limite',
          label: 'Feria en el patio, robots en biblioteca; falta consultar lo de dibujo.',
          feedback:
            'El mensaje distingue los datos comprobados de la duda pendiente. El equipo puede actualizarlo cuando la docente de dibujo responda.',
          correct: true,
        },
      ],
      takeaway:
        'Puedo decir «aún no lo sé», explicar qué falta y buscar una respuesta antes de afirmarlo.',
      paperTone: 'lilac',
    },
  ],
  ending: {
    title: '¡Caso investigado!',
    message:
      'El equipo dejó de seguir un recorte y empezó a seguir las pistas. Revisó el origen, la fecha y el contexto, y dejó una pregunta pendiente para la docente.',
    rule: 'Busco la fuente, reviso la fecha y comparo. Comunico lo que las pistas permiten afirmar.',
    image: {
      src: '/cuentos/primaria/detectives/cierre.webp',
      alt: 'El equipo y Bit celebran la investigación con sus pistas ordenadas y una lupa.',
    },
  },
  sources: [VERIFICATION_SOURCE],
};

export const MURAL_ACTIVITY: IllustratedActivityConfig = {
  id: 'mural-buenas-ideas',
  title: 'El mural de las buenas ideas',
  ageLabel: 'Primaria alta · 9 a 11 años',
  intro:
    'El grupo creará un mural digital para cuidar el patio. Ayuda a decidir cómo usar dibujos, reconocer autorías y mejorar ideas respetando a sus compañeras y compañeros. Todos los ejemplos son ficticios.',
  cover: {
    src: '/cuentos/primaria/carteles/mural.webp',
    alt: 'Estudiantes y Bit crean juntos un mural de ideas para mejorar el patio de su escuela.',
  },
  scenes: [
    {
      id: 'mural-permiso',
      title: 'El dibujo de otra persona',
      image: {
        src: '/cuentos/primaria/mural/01-escena.webp',
        alt: 'El equipo prepara bocetos y una tableta para organizar el mural sobre el patio.',
      },
      paragraphs: [
        'El equipo quiere incluir el dibujo de un árbol que hizo Inés. Está en su carpeta de clase, pero ella aún no ha dicho si quiere que aparezca en el mural.',
        'Bit pregunta cómo pueden continuar mientras consultan a su compañera.',
      ],
      prompt: '¿Qué decisión cuida el trabajo de Inés?',
      choices: [
        {
          id: 'permiso-carpeta',
          label: 'Usarlo: si está en la carpeta, todos pueden decidir por ella.',
          feedback:
            'Poder ver el dibujo no nos dice si Inés acepta ese uso. Podemos explicarle para qué mural lo queremos y quién lo verá.',
          correct: false,
        },
        {
          id: 'permiso-despues',
          label: 'Subirlo con su nombre y preguntarle al terminar.',
          feedback:
            'Reconocer a quien dibujó es valioso, pero no sustituye consultar antes. Inés todavía debe poder decidir si quiere participar de esa manera.',
          correct: false,
        },
        {
          id: 'permiso-esperar',
          label: 'Pedirle permiso y avanzar con otros elementos mientras responde.',
          feedback:
            'El equipo explica dónde aparecerá el dibujo y espera su respuesta. Si Inés no quiere, pueden crear otro árbol sin presionarla.',
          correct: true,
        },
      ],
      takeaway:
        'Explico para qué quiero usar una creación y respeto la respuesta de quien la hizo.',
      paperTone: 'peach',
    },
    {
      id: 'mural-autoria',
      title: 'Las ideas tienen autoría',
      image: {
        src: '/cuentos/primaria/mural/02-escena.webp',
        alt: 'Una compañera comparte su dibujo con el equipo y juntos preparan el reconocimiento de su autoría.',
      },
      paragraphs: [
        'Inés acepta que usen su árbol en este mural y acuerdan cómo reconocer su trabajo. Para un segundo icono, la docente entrega una ficha con permiso de uso.',
        'El equipo revisa esa ficha antes de añadir el icono de una regadera.',
      ],
      prompt: '¿Cómo pueden reconocer correctamente el icono?',
      evidence: [
        {
          id: 'autoria-ficha',
          label: 'Leer la ficha del icono',
          text: 'RECURSO FICTICIO: «Regadera», creado por Taller Semilla. Licencia CC BY 4.0. Origen: catálogo de Taller Semilla. El equipo lo usará sin cambios. La docente conservará los enlaces al original y a la licencia.',
        },
        {
          id: 'autoria-acuerdo',
          label: 'Revisar el espacio de créditos',
          text: 'EL MURAL TIENE UN APARTADO «CRÉDITOS». Ahí caben el nombre de cada obra, quién la creó, su origen y la licencia. Dar crédito no convierte al equipo en autor de una obra ajena.',
        },
      ],
      requiredEvidenceIds: ['autoria-ficha', 'autoria-acuerdo'],
      choices: [
        {
          id: 'autoria-completa',
          label: 'Anotar «Regadera», Taller Semilla, el origen y CC BY 4.0.',
          feedback:
            'Así se reconoce la creación y se conserva su permiso de uso. La docente añade los enlaces al original y a la licencia en los créditos del mural.',
          correct: true,
        },
        {
          id: 'autoria-internet',
          label: 'Escribir únicamente «Imagen de Internet».',
          feedback:
            'Esa frase no permite saber quién creó el icono ni localizar su permiso. La ficha ofrece datos concretos para los créditos.',
          correct: false,
        },
        {
          id: 'autoria-equipo',
          label: 'Firmar el icono con el nombre del equipo.',
          feedback:
            'El equipo está construyendo el mural, pero Taller Semilla creó ese icono. Pueden reconocer ambas aportaciones sin confundirlas.',
          correct: false,
        },
      ],
      takeaway:
        'Antes de reutilizar una obra, reviso su permiso y conservo los datos para reconocer a quien la creó.',
      paperTone: 'sunshine',
    },
    {
      id: 'mural-comentario',
      title: 'Una propuesta que ayuda',
      image: {
        src: '/cuentos/primaria/mural/03-escena.webp',
        alt: 'El equipo conversa frente al mural y revisa juntos las imágenes y los comentarios.',
      },
      paragraphs: [
        'Al revisar el mural, Diego nota que el título se pierde porque tiene un color parecido al fondo.',
        'Quiere proponer un cambio sin descalificar el trabajo de su compañera. Puede explicar qué observa y ofrecer una idea.',
      ],
      prompt: '¿Qué comentario ayuda a mejorar el mural?',
      choices: [
        {
          id: 'comentario-vago',
          label: '«Está raro. Hazlo de nuevo».',
          feedback:
            'La compañera no sabrá qué parte necesita cambiar. Nombrar el problema de lectura permite buscar una solución concreta.',
          correct: false,
        },
        {
          id: 'comentario-propuesta',
          label: '«El título se lee poco. ¿Probamos un color más oscuro?».',
          feedback:
            'Diego describe una dificultad del trabajo y propone una prueba. Su compañera puede opinar y revisar el resultado con el equipo.',
          correct: true,
        },
        {
          id: 'comentario-borrar',
          label: 'Borrar el título y poner otro sin comentarlo.',
          feedback:
            'Cambiarlo sin hablar deja fuera a quien lo hizo. Pueden comparar dos opciones y decidir juntas cómo se entiende mejor.',
          correct: false,
        },
      ],
      takeaway:
        'Comento el trabajo con respeto: digo qué observo y propongo una mejora que podamos probar.',
      paperTone: 'sky',
    },
    {
      id: 'mural-privacidad',
      title: 'La última revisión',
      image: {
        src: '/cuentos/primaria/mural/03-escena.webp',
        alt: 'Estudiantes y docente revisan qué información aparece en el mural antes de mostrarlo.',
      },
      paragraphs: [
        'La docente mostrará el mural en una exposición a la que asistirán otras personas. Una foto del borrador incluye caras y tarjetas con nombres completos.',
        'Esos detalles no hacen falta para explicar cómo cuidar el patio. El equipo tiene otro recurso disponible.',
      ],
      prompt: '¿Qué versión pueden revisar con la docente para la exposición?',
      evidence: [
        {
          id: 'privacidad-foto',
          label: 'Revisar la fotografía',
          text: 'BORRADOR DEL CASO: una fotografía del equipo muestra rostros y tarjetas con nombres completos. No se ha acordado mostrar esa foto fuera del grupo.',
        },
        {
          id: 'privacidad-alternativa',
          label: 'Revisar otra opción',
          text: 'ALTERNATIVA DEL CASO: un dibujo de macetas, un árbol y recipientes para separar residuos. El equipo lo hizo para el mural; no incluye caras ni datos personales.',
        },
      ],
      requiredEvidenceIds: ['privacidad-foto', 'privacidad-alternativa'],
      choices: [
        {
          id: 'privacidad-solo-nombres',
          label: 'Tapar los nombres y dejar las caras sin consultar.',
          feedback:
            'Las caras también identifican a las personas. Quitar una parte de la información no sustituye revisar con ellas y la docente ese uso de la foto.',
          correct: false,
        },
        {
          id: 'privacidad-grupo',
          label: 'Dejar la foto porque todos pertenecen al mismo grupo.',
          feedback:
            'La exposición tendrá otro público. Pertenecer al grupo no significa haber aceptado que otras personas vean la foto y esos datos.',
          correct: false,
        },
        {
          id: 'privacidad-dibujo',
          label: 'Usar el dibujo sin datos y revisar el mural con la docente.',
          feedback:
            'El dibujo comunica la propuesta del equipo sin exponer caras ni nombres completos. Antes de mostrarlo, revisan también sus créditos y el público de la exposición.',
          correct: true,
        },
      ],
      takeaway:
        'Antes de mostrar una creación, reviso qué datos incluye, quién la verá y qué permisos necesitamos.',
      paperTone: 'mint',
    },
  ],
  ending: {
    title: '¡Un mural construido en equipo!',
    message:
      'El mural ya cuenta con dibujos acordados, créditos claros y comentarios que ayudaron a mejorarlo. La docente acompaña al grupo para compartir sus propuestas.',
    rule: 'Pido permiso, reconozco las autorías, propongo con respeto y cuido los datos de todas las personas.',
    image: {
      src: '/cuentos/primaria/mural/cierre.webp',
      alt: 'El equipo y Bit presentan su mural terminado con alegría en el aula.',
    },
  },
  sources: [AUTHORSHIP_SOURCE, PRIVACY_SOURCE, FAMILY_SOURCE],
};
