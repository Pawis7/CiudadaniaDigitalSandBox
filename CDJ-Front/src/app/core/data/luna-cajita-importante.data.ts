// CDJ-PB-AUDIOCUENTO-P02 · Luna y la cajita de las cosas importantes
// Segmento: Primaria baja · 6 a 8 años (aprox)

export interface NarrationSegment {
  text: string;
  pause?: number;
  rate?: number;
  pitch?: number;
}

export const NATURAL_NARRATIONS: NarrationSegment[][] = [
  [
    { text: "Luna y la cajita de las cosas importantes.", pause: 650, rate: 0.78, pitch: 1.1 },
    { text: "Un cuento para aprender que el nombre, la casa, la foto y la voz se cuidan con ayuda.", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "Si una pantalla pide algo mío, primero llamo a un adulto.", pause: 540, rate: 0.8, pitch: 1.1 }
  ],
  [
    { text: "Luna encontró una cajita brillante sobre la mesa.", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "Adentro había dibujos pequeños: una casita, una foto, unas letras con su nombre y una vocecita guardada.", pause: 720, rate: 0.8, pitch: 1.08 },
    { text: "Luna abrió mucho los ojos y preguntó: ¿todo esto es mío?", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "Nube se acercó flotando y le contestó con cariño.", pause: 500, rate: 0.78, pitch: 1.08 },
    { text: "Sí. Son cosas importantes. Algunas se cuidan con ayuda.", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "Nombre, casa, foto y voz: son cosas que cuido.", pause: 560, rate: 0.8, pitch: 1.1 }
  ],
  [
    { text: "Más tarde, Luna miraba una pantalla con dibujos de colores.", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "Entonces apareció un mensajito. No gritaba. No daba miedo. Pero preguntaba algo de Luna.", pause: 680, rate: 0.8, pitch: 1.08 },
    { text: "El mensajito decía: ¿me dices tu nombre completo?", pause: 580, rate: 0.76, pitch: 0.98 },
    { text: "Luna miró la pantalla y pensó en su cajita.", pause: 520, rate: 0.8, pitch: 1.08 },
    { text: "Mmm... mi nombre completo está en mi cajita.", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "Cuando una pantalla pregunta algo mío, hago una pausa.", pause: 560, rate: 0.8, pitch: 1.1 }
  ],
  [
    { text: "Luna no supo qué hacer. Su corazón hizo una pregunta pequeñita por dentro.", pause: 660, rate: 0.8, pitch: 1.08 },
    { text: "Nube flotó cerquita, como una almohada suave.", pause: 540, rate: 0.8, pitch: 1.08 },
    { text: "Entonces Nube le dijo: cuando tienes duda, no tienes que contestar sola.", pause: 650, rate: 0.8, pitch: 1.08 },
    { text: "Luna respiró y preguntó: ¿entonces puedo pedir ayuda?", pause: 580, rate: 0.8, pitch: 1.08 },
    { text: "Nube sonrió. Sí. Tu duda es una señal que te cuida.", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "Si tengo duda, busco ayuda.", pause: 500, rate: 0.78, pitch: 1.1 }
  ],
  [
    { text: "Luna no tocó el botón. No escribió su nombre. No mandó ninguna foto.", pause: 680, rate: 0.8, pitch: 1.08 },
    { text: "Tomó la tablet con calma y fue con la persona adulta que la cuidaba.", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "La pantalla me preguntó algo mío, dijo Luna.", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "La persona adulta miró la pantalla con ella y respondió tranquila.", pause: 560, rate: 0.8, pitch: 1.08 },
    { text: "Hiciste bien en venir. Eso lo vemos juntos.", pause: 620, rate: 0.8, pitch: 1.08 },
    { text: "Si la pantalla me pide algo mío, primero llamo a un adulto.", pause: 620, rate: 0.8, pitch: 1.1 }
  ],
  [
    { text: "Después, Luna volvió a guardar sus cosas importantes en la cajita.", pause: 600, rate: 0.8, pitch: 1.08 },
    { text: "La cajita no era para esconderse. Era para recordar que algunas cosas se cuidan con ayuda.", pause: 700, rate: 0.8, pitch: 1.08 },
    { text: "Nube le recordó: tu nombre, tu casa, tu foto y tu voz no se comparten sin ayuda.", pause: 700, rate: 0.8, pitch: 1.08 },
    { text: "Luna sonrió y dijo: ya sé qué hacer.", pause: 540, rate: 0.8, pitch: 1.08 },
    { text: "Si la pantalla me pide algo mío, primero llamo a un adulto.", pause: 620, rate: 0.78, pitch: 1.12 }
  ],
  [
    { text: "¡Felicidades! Has terminado el cuento. Recuerda siempre nuestra regla: ante la duda, ¡primero llamo a un adulto!", pause: 600, rate: 0.8, pitch: 1.1 }
  ]
];
