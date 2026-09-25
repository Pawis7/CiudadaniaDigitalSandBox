export type BitEmotion =
  | 'alegria'
  | 'susto'
  | 'enojo'
  | 'tristeza'
  | 'duda'
  | 'cansancio'
  | 'calma';

export interface EmotionScene {
  escena: number;
  titulo: string;
  situacion: string;
  emocion_objetivo: string;
  emocion_visual: BitEmotion;
  emocion_resuelta?: BitEmotion;
  texto_estado_resuelto?: string;
  tipo_aprendizaje: string;
  char: string;
  reto_visible: string;
  opciones_visibles: string[];
  respuesta_esperada: string;
  correct: number;
  feedback_positivo: string;
  feedback_reintento: string;
  refuerzo: string;
  voz_situacion: string;
  voz_reto: string;
}

export interface EmotionsGameData {
  titulo_publico: string;
  producto_version: string;
  segmento: string;
  subsegmento: string;
  tema: string;
  subtemas: string[];
  subtema_foco: string;
  eje_publico: string;
  eje_complementario: string;
  titulo_pregunta_problema: string;
  competencia_especifica: string;
  virtud_ancla: string;
  virtudes_complementarias: string[];
  pregunta_esencial: string;
  resultado_observable: string;
  producto_a_desarrollar: string;
  enfoque_didactico_recomendado: string;
  elemento_narrativo_metafora: string;
  dimension: string;
  verbo_guia: string;
  tipo: string;
  formato_familia: string;
  formato_tipo_concreto: string;
  contexto_de_uso: string;
  nivel_sugerido: string;
  responsable_sugerido: string;
  estado_sugerido: string;
  duracion_estimada: string;
  mejoras_pedagogicas_y_ux: string[];
  restricciones: string[];
  emociones_objetivo: string[];
  escenas: EmotionScene[];
}

export const RECONOZCO_EMOCIONES_DATA: EmotionsGameData = {
  titulo_publico: '¡A jugar! Reconozco mis emociones',
  producto_version: 'v12 · 12 escenas · UX pedagógica mejorada',
  segmento: 'Estudiantes',
  subsegmento: 'Preescolar (3–5)',
  tema: 'Emociones digitales iniciales',
  subtemas: [
    'reconocimiento de emociones',
    'pedir ayuda',
    'pausa y descanso de pantallas',
    'turnos y convivencia',
    'contenido extraño o incómodo',
    'autorregulación básica',
  ],
  subtema_foco:
    'Reconocer cómo una interacción en pantalla puede generar alegría, susto, enojo/frustración, tristeza, cansancio, duda o calma; y practicar una respuesta segura con mediación adulta.',
  eje_publico: 'Balance y bienestar digital',
  eje_complementario: 'Privacidad y seguridad / Convivencia digital',
  titulo_pregunta_problema: '¿Cómo sé lo que siento cuando uso una pantalla y qué puedo hacer?',
  competencia_especifica:
    'Reconoce emociones básicas que pueden surgir durante una interacción digital sencilla y practica respuestas seguras: pausar, respirar, esperar turno, apagar o pedir ayuda adulta.',
  virtud_ancla: 'Autocontrol',
  virtudes_complementarias: [
    'prudencia',
    'respeto',
    'confianza para pedir ayuda',
    'empatía inicial',
  ],
  pregunta_esencial: '¿Cómo escucho mi cuerpo y mis emociones cuando uso una pantalla?',
  resultado_observable:
    'La niña o el niño identifica emociones en el personaje, selecciona una carita o acción segura y repite al cierre la rutina: pauso, respiro y pido ayuda.',
  producto_a_desarrollar:
    'Juego interactivo lineal de 12 escenas con audio, caritas emocionales, feedback positivo, pausas pedagógicas y cierre de descanso de pantallas.',
  enfoque_didactico_recomendado:
    'Juego guiado, visual, breve, con mediación adulta total. Para preescolar se recomienda jugarlo en dos bloques de 6 escenas o seleccionar escenas según el objetivo de la sesión.',
  elemento_narrativo_metafora:
    'Bit descubre que su luz cambia según lo que siente al usar una pantalla; Data lo acompaña a nombrar la emoción, respirar, poner límites sencillos y pedir ayuda.',
  dimension: 'D2 con apoyo inicial de D1',
  verbo_guia: 'Reconocer',
  tipo: 'Juego interactivo',
  formato_familia: 'Juego / simulador simple de decisiones emocionales',
  formato_tipo_concreto:
    'Interacción lineal de 12 escenas tipo H5P o HTML, con audio, botones grandes, feedback sin castigo, pausa intermedia y avance manual.',
  contexto_de_uso: 'Aula de preescolar, rincón digital o sesión guiada por docente',
  nivel_sugerido: 'Preescolar',
  responsable_sugerido:
    'Diseño instruccional, diseño visual, programación, revisión pedagógica y QA institucional',
  estado_sugerido: 'Listo para producción con validación de personajes oficiales',
  duracion_estimada:
    '10 a 15 minutos si se juega completo; recomendado en dos bloques de 5 a 8 minutos.',
  mejoras_pedagogicas_y_ux: [
    'Avance manual después de feedback para evitar transiciones demasiado rápidas.',
    'Botón de audio / leer instrucción usando voz del dispositivo como apoyo de accesibilidad.',
    'Progreso visible por escena y barra de avance.',
    'Pausa pedagógica a mitad del recorrido.',
    'Opciones de respuesta con emoción y acción concreta, no solo caritas.',
    'Feedback de reintento sin castigo; invita a observar rostro, cuerpo o situación.',
    'Cierre integrador que consolida la rutina: pauso, respiro y pido ayuda.',
    'Recomendación de uso docente: dividir en dos sesiones para no saturar a preescolar.',
  ],
  restricciones: [
    'No recopilar datos personales de niñas y niños',
    'No usar mensajes de error punitivos',
    'No usar sonidos estridentes ni animaciones rápidas',
    'No depender solo del color para comunicar emociones',
    'No promover uso autónomo sin mediación adulta',
    'No mostrar temporizadores de presión ni puntajes competitivos',
  ],
  emociones_objetivo: [
    'alegría',
    'miedo/susto',
    'enojo/frustración',
    'tristeza',
    'duda/confusión',
    'cansancio',
    'calma/bienestar',
    'autocontrol',
  ],
  escenas: [
    {
      escena: 1,
      titulo: 'Escena 1 · Bit recibe un video bonito',
      situacion: 'Bit recibe un video bonito de un perrito saltando.',
      emocion_objetivo: 'Alegría',
      emocion_visual: 'alegria',
      tipo_aprendizaje: 'Reconocer emoción agradable',
      char: '🤖🐶',
      reto_visible: 'Bit recibió un video de un perrito. ¿Cómo se siente?',
      opciones_visibles: ['😊 Alegría', '😟 Susto', '😡 Enojo'],
      respuesta_esperada: '😊 Alegría',
      correct: 0,
      feedback_positivo: '¡Sí! Bit está feliz porque le gustó el video.',
      feedback_reintento: 'Mira otra vez su cara. ¿Está sonriendo?',
      refuerzo:
        'Las pantallas pueden mostrarnos cosas bonitas. También podemos compartir con respeto.',
      voz_situacion:
        'Mira a Bit. Su abuelito le envió un video de un perrito saltando. ¡Qué divertido!',
      voz_reto: '¿Cómo crees que se siente Bit? Toca la carita que mejor muestre su emoción.',
    },
    {
      escena: 2,
      titulo: 'Escena 2 · Aparece un anuncio ruidoso',
      situacion: 'Bit ve dibujos y aparece un anuncio con un ruido fuerte.',
      emocion_objetivo: 'Miedo/susto',
      emocion_visual: 'susto',
      tipo_aprendizaje: 'Reconocer susto y pedir ayuda',
      char: '🤖🔊',
      reto_visible: 'Apareció un anuncio con ruido fuerte. ¿Cómo se siente Bit?',
      opciones_visibles: ['😊 Alegría', '😟 Susto', '😡 Enojo'],
      respuesta_esperada: '😟 Susto',
      correct: 1,
      feedback_positivo: 'Exacto. Bit se asustó. Puede pedir ayuda.',
      feedback_reintento: 'Observa sus ojos. ¿Parece tranquilo o asustado?',
      refuerzo: 'Si algo en la pantalla te asusta, puedes decir: ayúdame, por favor.',
      voz_situacion: '¡Oh, no! Bit veía sus dibujos y apareció un anuncio con un ruido muy fuerte.',
      voz_reto: '¿Cómo se siente Bit ahora? Mira su cara y toca la emoción.',
    },
    {
      escena: 3,
      titulo: 'Escena 3 · El juego se trabó',
      situacion: 'Bit está jugando, pero el juego se traba y no responde.',
      emocion_objetivo: 'Enojo/frustración',
      emocion_visual: 'enojo',
      tipo_aprendizaje: 'Reconocer frustración y regularse',
      char: '🤖🎮',
      reto_visible: 'El juego de Bit se trabó. Bit aprieta botones y se molesta. ¿Cómo se siente?',
      opciones_visibles: ['😡 Enojo', '😊 Alegría', '😴 Cansancio'],
      respuesta_esperada: '😡 Enojo',
      correct: 0,
      feedback_positivo: 'Sí. Bit está frustrado. Puede respirar y pedir ayuda.',
      feedback_reintento: 'Mira su cara y sus manos. ¿Parece tranquilo o molesto?',
      refuerzo: 'Cuando algo no funciona, podemos parar, respirar y pedir ayuda.',
      voz_situacion: 'El juego de Bit se trabó. Bit aprieta botones, pero nada cambia.',
      voz_reto: '¿Cómo se siente Bit? Toca la carita que mejor lo muestra.',
    },
    {
      escena: 4,
      titulo: 'Escena 4 · La videollamada se cortó',
      situacion: 'Bit hablaba con su prima por videollamada y la llamada se cortó.',
      emocion_objetivo: 'Tristeza',
      emocion_visual: 'tristeza',
      tipo_aprendizaje: 'Reconocer tristeza y nombrarla',
      char: '🤖📱',
      reto_visible: 'La videollamada se cortó y Bit extraña a su prima. ¿Cómo se siente?',
      opciones_visibles: ['😢 Tristeza', '😡 Enojo', '😊 Alegría'],
      respuesta_esperada: '😢 Tristeza',
      correct: 0,
      feedback_positivo: 'Muy bien. Bit está triste. Puede decirlo y buscar compañía.',
      feedback_reintento: 'Observa su carita. ¿Parece contento o triste?',
      refuerzo: 'Cuando algo nos pone tristes, podemos decir cómo nos sentimos.',
      voz_situacion: 'Bit hablaba con su prima por videollamada, pero la llamada se cortó.',
      voz_reto: 'Bit la extraña. ¿Cómo se siente ahora?',
    },
    {
      escena: 5,
      titulo: 'Escena 5 · Aparece un botón raro',
      situacion: 'En la pantalla aparece un botón que dice premio, pero Bit no sabe qué es.',
      emocion_objetivo: 'Duda/confusión',
      emocion_visual: 'duda',
      emocion_resuelta: 'calma',
      texto_estado_resuelto:
        'Bit pide ayuda para entender el botón y empieza a sentirse más tranquilo.',
      tipo_aprendizaje: 'Pedir ayuda ante algo extraño',
      char: '🤖❓',
      reto_visible: 'Apareció un botón raro que dice premio. ¿Qué puede hacer Bit?',
      opciones_visibles: ['👩🏫 Pedir ayuda', '🎁 Tocar el premio', '🙈 Esconder la tablet'],
      respuesta_esperada: '👩🏫 Pedir ayuda',
      correct: 0,
      feedback_positivo: '¡Eso! Si algo se ve raro, Bit puede pedir ayuda.',
      feedback_reintento: 'Cuando algo no se entiende, ¿quién puede ayudarnos?',
      refuerzo: 'No tienes que tocar botones raros. Puedes pedir ayuda.',
      voz_situacion: 'En la pantalla apareció un botón que dice premio. Bit no sabe qué es.',
      voz_reto: '¿Qué puede hacer Bit para cuidarse?',
    },
    {
      escena: 6,
      titulo: 'Escena 6 · Muchos videos seguidos',
      situacion: 'Bit vio varios videos seguidos. Sus ojos están cansados.',
      emocion_objetivo: 'Cansancio',
      emocion_visual: 'cansancio',
      tipo_aprendizaje: 'Reconocer señales del cuerpo',
      char: '🤖😴',
      reto_visible: 'Bit vio muchos videos y sus ojos están cansados. ¿Qué siente su cuerpo?',
      opciones_visibles: ['😴 Cansancio', '😊 Alegría', '😡 Enojo'],
      respuesta_esperada: '😴 Cansancio',
      correct: 0,
      feedback_positivo: 'Sí. Su cuerpo está cansado. Es momento de pausar.',
      feedback_reintento: 'Mira sus ojos y su postura. ¿Tiene mucha energía o necesita descansar?',
      refuerzo: 'El cuerpo también habla. Cuando se cansa, podemos descansar la pantalla.',
      voz_situacion: 'Bit vio varios videos seguidos. Ahora sus ojitos están cansados.',
      voz_reto: '¿Qué siente su cuerpo?',
    },
    {
      escena: 7,
      titulo: 'Escena 7 · Bit descansa de la pantalla',
      situacion: 'Bit está cansado y quiere jugar con su pelota.',
      emocion_objetivo: 'Calma/bienestar',
      emocion_visual: 'cansancio',
      emocion_resuelta: 'calma',
      texto_estado_resuelto:
        'Bit apaga la tableta, descansa los ojos y se prepara para jugar con su pelota.',
      tipo_aprendizaje: 'Acción de pausa saludable',
      char: '🤖⚽',
      reto_visible: 'Bit está cansado y quiere jugar. ¿Le ayudas a apagar la tablet?',
      opciones_visibles: ['⏻ Apagar', '😊 Más videos', '🔊 Más ruido'],
      respuesta_esperada: '⏻ Apagar',
      correct: 0,
      feedback_positivo: '¡Clic! Descansar también cuida nuestras emociones.',
      feedback_reintento: 'Busquemos el botón para descansar la pantalla.',
      refuerzo: 'Pausar no es castigo. Es cuidar los ojos, el cuerpo y el ánimo.',
      voz_situacion: 'Bit está cansado y quiere jugar con su pelota.',
      voz_reto: '¿Le ayudas a apagar la tablet?',
    },
    {
      escena: 8,
      titulo: 'Escena 8 · Data propone respirar',
      situacion: 'Después de varias emociones, Data invita a Bit a respirar despacio.',
      emocion_objetivo: 'Calma',
      emocion_visual: 'calma',
      emocion_resuelta: 'calma',
      texto_estado_resuelto: 'Bit respira despacio y siente cómo sus hombros descansan.',
      tipo_aprendizaje: 'Practicar pausa corporal',
      char: '🪶🤖',
      reto_visible: 'Data dice: hagamos una pausa. ¿Qué ayuda a Bit a calmarse?',
      opciones_visibles: [
        '🌬️ Respirar despacio',
        '🎮 Seguir picando botones',
        '🙉 Taparse y gritar',
      ],
      respuesta_esperada: '🌬️ Respirar despacio',
      correct: 0,
      feedback_positivo: 'Muy bien. Respirar despacio ayuda al cuerpo a calmarse.',
      feedback_reintento: 'Busquemos una acción tranquila para ayudar al cuerpo.',
      refuerzo: 'Pausa corta: inhalo, exhalo y miro a mi alrededor.',
      voz_situacion:
        'Data nota que Bit ha sentido muchas cosas. Le propone hacer una pausa pequeña.',
      voz_reto: '¿Qué ayuda a Bit a calmarse?',
    },
    {
      escena: 9,
      titulo: 'Escena 9 · Un amigo quiere la tablet ya',
      situacion: 'Un amigo quiere usar la tablet de Bit y se acerca muy rápido.',
      emocion_objetivo: 'Molestia/enojo leve',
      emocion_visual: 'enojo',
      emocion_resuelta: 'calma',
      texto_estado_resuelto: 'Bit dice «espera tu turno» con voz tranquila y cuida la tableta.',
      tipo_aprendizaje: 'Turnos y convivencia digital',
      char: '🤖🧒',
      reto_visible: 'Un amigo quiere la tablet ya. Bit se molesta. ¿Qué puede hacer?',
      opciones_visibles: ['🗣️ Decir: espera tu turno', '😡 Empujar la tablet', '🙈 Esconderla'],
      respuesta_esperada: '🗣️ Decir: espera tu turno',
      correct: 0,
      feedback_positivo: 'Sí. Bit puede usar palabras claras y cuidar el turno.',
      feedback_reintento: 'Pensemos en una forma de decirlo sin pelear.',
      refuerzo: 'Convivir también es respetar turnos y cuidar los objetos.',
      voz_situacion:
        'Un amigo quiere usar la tablet de Bit y se acerca muy rápido. Bit se molesta.',
      voz_reto: '¿Qué puede hacer Bit para poner un límite sin pelear?',
    },
    {
      escena: 10,
      titulo: 'Escena 10 · Algo aparece y Bit no entiende',
      situacion: 'Bit ve una imagen extraña que no entiende y siente incomodidad.',
      emocion_objetivo: 'Incomodidad/duda',
      emocion_visual: 'duda',
      emocion_resuelta: 'calma',
      texto_estado_resuelto:
        'Bit avisa a una persona adulta, le cuenta qué le incomodó y se siente acompañado.',
      tipo_aprendizaje: 'Avisar ante contenido incómodo',
      char: '🤖🖼️',
      reto_visible: 'Bit vio algo que no entiende y no le gusta. ¿Qué puede hacer?',
      opciones_visibles: ['👩🏫 Avisar a un adulto', '🔁 Verlo muchas veces', '🤫 Guardar secreto'],
      respuesta_esperada: '👩🏫 Avisar a un adulto',
      correct: 0,
      feedback_positivo: 'Correcto. Si algo incomoda, Bit puede avisar.',
      feedback_reintento: 'Cuando algo no se siente bien, ¿conviene guardarlo o pedir ayuda?',
      refuerzo: 'Pedir ayuda es una forma de cuidarse.',
      voz_situacion: 'Bit vio una imagen que no entiende y no le gusta. Su pancita se siente rara.',
      voz_reto: '¿Qué puede hacer Bit?',
    },
    {
      escena: 11,
      titulo: 'Escena 11 · Bit gana un juego',
      situacion: 'Bit gana un nivel y se emociona mucho. Quiere gritar y enseñar la pantalla.',
      emocion_objetivo: 'Alegría/emoción alta',
      emocion_visual: 'alegria',
      tipo_aprendizaje: 'Celebrar con autocontrol',
      char: '🤖🏆',
      reto_visible:
        'Bit ganó un juego y se emocionó mucho. ¿Cómo puede celebrar cuidando a los demás?',
      opciones_visibles: [
        '🎉 Celebrar sin gritar',
        '📢 Gritar muy fuerte',
        '📱 Empujar la pantalla a otros',
      ],
      respuesta_esperada: '🎉 Celebrar sin gritar',
      correct: 0,
      feedback_positivo: '¡Sí! Se puede celebrar con alegría y respeto.',
      feedback_reintento: 'Busquemos una forma alegre que también cuide a los demás.',
      refuerzo: 'La alegría también puede ser amable.',
      voz_situacion: 'Bit ganó un nivel. Se siente muy emocionado y quiere celebrarlo.',
      voz_reto: '¿Cómo puede celebrar cuidando a los demás?',
    },
    {
      escena: 12,
      titulo: 'Escena 12 · Se acaba el tiempo de pantalla',
      situacion:
        'Data avisa que el tiempo de pantalla terminó. Bit quiere seguir, pero también quiere sentirse bien.',
      emocion_objetivo: 'Autocontrol y bienestar',
      emocion_visual: 'duda',
      emocion_resuelta: 'calma',
      texto_estado_resuelto: 'Bit hace una pausa, respira y elige jugar fuera de la pantalla.',
      tipo_aprendizaje: 'Cierre integrador',
      char: '🤖⏰',
      reto_visible: 'Se acabó el tiempo de pantalla. ¿Qué plan ayuda más a Bit?',
      opciones_visibles: [
        '💛 Pauso, respiro y juego',
        '📺 Un video más y otro más',
        '😡 Enojarme y gritar',
      ],
      respuesta_esperada: '💛 Pauso, respiro y juego',
      correct: 0,
      feedback_positivo: '¡Muy bien! Bit aprendió a escuchar sus emociones.',
      feedback_reintento: 'Busquemos un plan que cuide el cuerpo y las emociones.',
      refuerzo: 'Recuerda: pauso, respiro, pido ayuda y juego también fuera de la pantalla.',
      voz_situacion:
        'Data avisa que el tiempo de pantalla terminó. Bit quiere seguir, pero también quiere sentirse bien.',
      voz_reto: '¿Qué plan ayuda más a Bit?',
    },
  ],
};
