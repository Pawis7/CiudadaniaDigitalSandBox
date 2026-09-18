// CDJ-PRE-AUDIOCUENTO-P02 · ¡Un, dos, tres… foto otra vez!
// Segmento: Preescolar · 3 a 5 años
// Eje: Creación responsable y participación / Privacidad y relaciones digitales

export interface NarrationSegment {
  text: string;
  pause?: number;
  rate?: number;
  pitch?: number;
}

export const FOTO_OTRA_VEZ_NARRATIONS: Record<number | string, NarrationSegment[]> = {
  // 0: Portada
  0: [
    { text: "¡Un, dos, tres… foto otra vez!", pause: 600, rate: 0.78, pitch: 1.1 },
    { text: "Un audiocuento para descubrir que antes de tomar o mostrar una foto de alguien, uso mi voz para preguntar.", pause: 500, rate: 0.8, pitch: 1.08 }
  ],
  // 1: El gran hallazgo
  1: [
    { text: "¡Hola! Acompaña a tus amigos en esta historia.", pause: 500, rate: 0.8, pitch: 1.1 },
    { text: "Hoy, la maestra le prestó a Bit una cámara fotográfica para el taller de exploradores.", pause: 580, rate: 0.8, pitch: 1.08 },
    { text: "A Bit le encanta ver por el lente, apuntar y presionar el botón de arriba para guardar imágenes de todo lo que ve en el salón.", pause: 650, rate: 0.8, pitch: 1.08 }
  ],
  // 2: El tropiezo de Data
  2: [
    { text: "¡Oh, no! Data la pajarita perdió el equilibrio y dio una voltereta de cabeza.", pause: 580, rate: 0.78, pitch: 1.08 },
    { text: "Bit se rió y, sin avisar, levantó la cámara y... ¡Click! Guardó una foto justo cuando Data cayó al suelo.", pause: 620, rate: 0.8, pitch: 1.06 }
  ],
  // 3: La reacción de Data
  3: [
    { text: "Bit quería correr a enseñarle la foto a todos los robots del salón, pero al mirar a Data, vio que guardó sus alitas y escondió su piquito.", pause: 620, rate: 0.78, pitch: 1.06 },
    { text: "A Data le dio mucha pena que capturaran ese momento tan incómodo con la cámara sin haberle preguntado antes si estaba lista.", pause: 650, rate: 0.8, pitch: 1.06 }
  ],
  // 4: Momento de decidir
  4: [
    { text: "La cámara de Bit es una gran herramienta para crear, pero para usarla con respeto, debemos recordar la regla de oro:", pause: 580, rate: 0.8, pitch: 1.08 },
    { text: "¡Antes de tomar una foto a un amigo, usamos nuestra voz para preguntar!", pause: 620, rate: 0.8, pitch: 1.1 },
    { text: "Ayuda a Bit a decidir: ¿Qué debe hacer ahora?", pause: 500, rate: 0.82, pitch: 1.1 }
  ],
  // 5: Cierre correcto
  5: [
    { text: "¡Excelente decisión!", pause: 520, rate: 0.82, pitch: 1.12 },
    { text: "Bit borró la foto incómoda, miró a Data y le preguntó: Data, ¿te puedo tomar una foto volando feliz?", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "Data sonrió, abrió sus alitas y dijo: ¡Sí, ahora sí estoy lista!", pause: 580, rate: 0.82, pitch: 1.1 },
    { text: "¡Eso es usar la tecnología con prudencia y cuidar a nuestros amigos!", pause: 600, rate: 0.8, pitch: 1.08 }
  ],
  // 6: Final
  6: [
    { text: "¡Cuento completado! Recuerda la regla de oro: antes de tomar una foto, pregunto con mi voz.", pause: 500, rate: 0.8, pitch: 1.08 }
  ],
  // Feedback amable si elige mostrar
  'feedback': [
    { text: "Mira a Data. ¿Se siente lista? Probemos otra vez: primero preguntamos con nuestra voz.", pause: 600, rate: 0.8, pitch: 1.08 }
  ]
};
