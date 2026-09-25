export interface FamilyGamingGuide {
  title: string;
  lead: string;
  principles: { id: string; title: string; text: string }[];
  situations: {
    id: string;
    title: string;
    resourceId: string;
    context: string;
    prompt: string;
    action: string;
  }[];
  agreement: {
    title: string;
    intro: string;
    items: { id: string; prompt: string; example: string }[];
  };
  help: { title: string; steps: string[]; supportText: string };
  sources: { label: string; url: string; note: string }[];
  adaptationNote: string;
}

// The seven principles are the only adaptation of the eSafety article below.
// Situations and the agreement are original companion activities for our stories.
export const FAMILY_GAMING_GUIDE: FamilyGamingGuide = {
  title: 'Videojuegos en casa',
  lead: 'Para madres, padres y personas cuidadoras. No necesitas dominar cada juego: estos cuentos te ayudan a ensayar conversaciones y decisiones con tu hija o hijo. Elige una situación y platiquen cómo la resolverían en casa.',
  principles: [
    {
      id: 'elegir',
      title: 'La elección empieza contigo',
      text: 'Comprueba la edad indicada y qué aparece al jugar; una portada amigable no basta. Respeta también la edad mínima del servicio; no uses una fecha falsa para habilitar funciones.',
    },
    {
      id: 'funciones',
      title: 'Conoce lo que permite',
      text: 'Revisa conversaciones, compras, anuncios y contenido de otros jugadores, además de las posibilidades de aprender o crear.',
    },
    {
      id: 'configurar',
      title: 'Ajusta y explica',
      text: 'Configura privacidad, contactos y gastos en el dispositivo y el juego; explica a tu hija o hijo para qué.',
    },
    {
      id: 'limites-controles',
      title: 'Los controles tienen límites',
      text: 'Las herramientas reducen riesgos, pero no sustituyen tu presencia ni una conversación en la que pueda pedir ayuda.',
    },
    {
      id: 'emociones',
      title: 'Mira cómo se siente',
      text: 'Observa si disfruta o si las recompensas y la prisa por seguir dificultan dejar la partida.',
    },
    {
      id: 'cierre',
      title: 'Planeen una salida',
      text: 'Acuerden antes dónde y cuándo jugar, cómo cerrar y quién acompañará, cuidando el descanso y otras actividades.',
    },
    {
      id: 'cambios',
      title: 'Vuelve a revisar',
      text: 'Comprueba nuevamente contenido y ajustes cuando aparezcan zonas, funciones o maneras de jugar distintas.',
    },
  ],
  situations: [
    {
      id: 'portal',
      title: 'Cuando el juego ya no se parece al que eligieron',
      resourceId: 'castillo-cambio',
      context:
        'Mara construye un puente. Un portal la lleva a un pasillo que la incomoda; su papá descubre que esa zona está indicada para mayores.',
      prompt: 'Si Mara fuera tu hija, ¿qué le dirías antes de revisar la tableta?',
      action:
        'Ensayen: «Gracias por avisarme; no tienes que volver al pasillo». Después elijan otro lugar para construir. Estar contigo no vuelve adecuado un contenido para mayores.',
    },
    {
      id: 'racha',
      title: 'Cuando una recompensa pesa más que el acuerdo',
      resourceId: 'mision-puede-esperar',
      context:
        'Leo quiere conservar una racha mientras termina su estación espacial. Llegó la hora acordada con su abuela y perder la insignia le da tristeza.',
      prompt: '¿Cómo acompañarías esa tristeza sin abrir otra misión para compensarla?',
      action:
        'Representen el cierre: Leo guarda su construcción y su abuela reconoce el esfuerzo. Inventen una frase para despedirse de la estación hasta otro día. Puede perder la insignia; su abuela lo acompaña aunque le moleste.',
    },
    {
      id: 'premio',
      title: 'Cuando un regalo pide algo a cambio',
      resourceId: 'monedas-gratis',
      context:
        'Un anuncio promete monedas y CoinMax ofrece un atajo. Más adelante aparece un formulario que pide contraseña y código de seguridad.',
      prompt: '¿En qué momento te gustaría que tu hija o hijo te llamara? ¿Y si ya escribió algo?',
      action:
        'Pausen la simulación antes del formulario. Practiquen «Necesito que vengas» y una respuesta adulta: «Cuéntame qué pasó; vamos a revisar cómo ayudarte». No prueben el enlace ni usen datos reales.',
    },
    {
      id: 'invitacion',
      title: 'Cuando alguien quiere apartarlo del grupo',
      resourceId: 'el-mundo-privado',
      context:
        'Después de una buena partida, SkyFox invita a otra sala. La situación cambia cuando insiste en dejar fuera a los demás y guardar el encuentro en secreto.',
      prompt: '¿Cómo distinguirían una invitación para jugar de una presión para aislarse?',
      action:
        'Señalen juntos la frase que cambia la situación. Ensayen salir y buscarte sin discutir con SkyFox. La respuesta adulta puede empezar así: «Hiciste bien en contármelo; no tienes que resolverlo a solas».',
    },
  ],
  agreement: {
    title: 'Un miniacuerdo para nuestra próxima partida',
    intro:
      'Después del cuento, completen estas cuatro frases en una conversación o en papel. Los ejemplos se pueden cambiar; también la persona adulta asume compromisos.',
    items: [
      {
        id: 'proyecto',
        prompt: 'Hoy queremos…',
        example: 'Terminar el puente que dibujamos, sin abrir el portal nuevo.',
      },
      {
        id: 'final',
        prompt: 'Cerraremos así…',
        example:
          'Guardamos la construcción antes de cenar; la misión extra queda para otra ocasión.',
      },
      {
        id: 'senal',
        prompt: 'Si algo cambia, nuestra señal será…',
        example:
          'Decir «Ven conmigo» cuando aparezca un pasillo raro, un formulario o una invitación insistente.',
      },
      {
        id: 'adulto',
        prompt: 'Como persona adulta, yo me comprometo a…',
        example:
          'Acercarme, escuchar la explicación completa y ayudar a decidir el siguiente paso sin burlas ni regaños.',
      },
    ],
  },
  help: {
    title: 'Si hoy necesita tu ayuda',
    steps: [
      'Acércate con calma: «Estoy contigo. Puedes contarme lo que pasó, aunque hayas tocado el botón o aceptado la invitación».',
      'Escucha sin interrogar ni pedir que vuelva a mirar algo que le hizo daño. Pregunta: «¿Qué necesitas para sentirte acompañado ahora?».',
      'Acuerden un siguiente paso concreto: dejar esa experiencia, revisar lo ocurrido desde las herramientas de la plataforma o buscar orientación. Si hubo acoso o abuso, recuérdale que no es su culpa.',
    ],
    supportText:
      'Si necesitan orientación adicional, consulta las opciones de ayuda del portal y elijan el apoyo que corresponda a su situación.',
  },
  sources: [
    {
      label: 'eSafety Commissioner · Elección y configuración de videojuegos',
      url: 'https://www.esafety.gov.au/parents/issues-and-advice/gaming/how-to-set-up-and-choose-games-safely',
      note: 'Fuente de los siete principios. Orientaciones educativas de Australia, en inglés; no representan la normativa de Jalisco o México.',
    },
    {
      label: 'UNICEF · Acompañar a niñas y niños en internet',
      url: 'https://www.unicef.org/parenting/child-care/keep-your-child-safe-online',
      note: 'Referencia para la comunicación familiar y la respuesta sin culpabilizar ante acoso o abuso. Disponible en inglés.',
    },
  ],
  adaptationNote:
    'Los siete principios son una adaptación breve de orientaciones de eSafety Commissioner. Las situaciones, preguntas y el miniacuerdo son propuestas originales a partir de los relatos de este portal.',
};
