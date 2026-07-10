// CDJ-GAME-P02 · El mercado fuera de la plataforma
// Dimensiones: datos (verificacion), limites (dinero), convivencia (cuenta), ayuda (apoyo)

export interface DiscorOption {
  text:     string;
  points:   number;
  level:    'best' | 'good' | 'partial' | 'risk' | 'danger';
  dims:     { datos: number; limites: number; convivencia: number; ayuda: number };
  plus:     string;     // Lo mejor de tu decisión
  watch:    string;    // Ojo aquí
  next:     string;     // Si te pasa en la vida real
  feedback: string; // Retroalimentación breve
}

export type DiscorFeedItem =
  | { type: 'system'; text: string }
  | { type: 'text'; from: string; role?: string; avatar: string; text: string; me?: boolean }
  | { type: 'image'; from: string; title: string; caption: string; theme: string; url?: string; price?: string; rating?: string }
  | { type: 'voice'; from: string; role?: string; avatar: string; duration: string; theme: string; text: string };

export interface DiscorMission {
  id:       string;
  title:    string;
  channel:  string;
  goal:     string;
  signals:  string[];
  posts:    DiscorFeedItem[];
  question: string;
  options:  DiscorOption[];
  badge:    string;
}

export interface DiscorRank {
  min:   number;
  max:   number;
  title: string;
  desc:  string;
}

export interface DiscorGuideSection {
  title:   string;
  bullets: string[];
}

export interface DiscorGuide {
  title:    string;
  subtitle: string;
  sections: DiscorGuideSection[];
}

export interface DiscorMetadata {
  code:           string;
  title:          string;
  subtitle:       string;
  segment:        string;
  subsegment:     string;
  axes:           string[];
  format:         string;
  estimated_time: string;
  version:        string;
}

export interface DiscorGameSchema {
  meta:    DiscorMetadata;
  ui:      {
    result_labels:  Record<'best' | 'good' | 'partial' | 'risk' | 'danger', string>;
    feedback_boxes: string[];
  };
  intro:   {
    hook:    string;
    bullets: [string, string][];
    why:     { title: string; text: string; tone: string }[];
  };
  missions: DiscorMission[];
  results:  {
    ranks: DiscorRank[];
  };
  guide:    DiscorGuide;
}

export const MERCADO_GAME_DATA: DiscorGameSchema = {
  "meta": {
    "code": "CDJ-GAME-P02",
    "title": "El mercado fuera de la plataforma",
    "subtitle": "Skins, cuentas y ofertas en un mercado gamer",
    "segment": "Estudiantes",
    "subsegment": "Preparatoria",
    "axes": [
      "Privacidad y seguridad",
      "Consumo responsable",
      "Huella digital e identidad"
    ],
    "format": "Simulador interactivo gamer / marketplace",
    "estimated_time": "4 a 5 minutos",
    "version": "v3 anti-pistas"
  },
  "ui": {
    "result_labels": {
      "best": "Decisión prudente",
      "good": "Decisión útil",
      "partial": "Parcialmente útil",
      "risk": "Riesgo detectado",
      "danger": "Alto riesgo"
    },
    "feedback_boxes": [
      "🏆 Lo acertado",
      "⚠️ Ojo aquí",
      "💡 Si te pasa en la vida real"
    ]
  },
  "intro": {
    "hook": "Vas a participar en un servidor de intercambio de skins y objetos gamer. Analizarás publicaciones, chats y notas de voz para detectar señales de riesgo antes de que te cuesten. Seis situaciones. Tus decisiones.",
    "bullets": [
      ["Misiones", "6 canales de chat"],
      ["Duración", "4–5 minutos"],
      ["Regla v3", "Sin pistas iniciales"],
      ["Prestigio", "Acumula XP"]
    ],
    "why": [
      {
        "title": "Observa el chat",
        "text": "Lee detenidamente las ofertas, las capturas y los audios de voz antes de actuar.",
        "tone": "cyan"
      },
      {
        "title": "Decide sin pistas",
        "text": "Elige tu respuesta basándote en tu criterio. Las alertas del radar están ocultas.",
        "tone": "orange"
      },
      {
        "title": "Revela el riesgo",
        "text": "Desbloquea el análisis de cada trato para saber si estás protegido.",
        "tone": "pink"
      }
    ]
  },
  "missions": [
    {
      "id": "M1",
      "title": "Publicación destacada",
      "channel": "trade-hub",
      "goal": "Analizar la oferta inicial en el canal de tradeos",
      "signals": ["⚡ Precio y trato poco claros"],
      "posts": [
        { "type": "system", "text": "Bienvenidos al canal oficial de tradeos de TradeHub." },
        {
          "type": "text",
          "from": "SkinPro_99",
          "avatar": "S",
          "role": "Vendedor",
          "text": "¡OFERTA ÚNICA! Vendo mi skin legendaria HyperBeast por solo $15 USD. Está valorada en más de $90 en Steam. Trato súper rápido, solo gente seria."
        },
        {
          "type": "image",
          "from": "SkinPro_99",
          "title": "Skin HyperBeast ($15 USD)",
          "caption": "Excelente estado de la skin. Valorada originalmente en $90 USD.",
          "theme": "cyan",
          "url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
        }
      ],
      "question": "Te interesa la publicación. ¿Qué harías para seguir?",
      "options": [
        {
          "text": "Comparar precio, revisar perfil y pedir que todo siga dentro de la plataforma.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 2, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Buena ruta. Revisaste más de una señal y evitaste tomar una decisión solo por emoción.",
          "plus": "Pusiste una pausa, contrastaste el precio real y exigiste un canal seguro.",
          "watch": "El vendedor podría insistir en salir, pero tu insistencia es el filtro principal.",
          "next": "Pide que las condiciones de trato queden escritas en los canales públicos oficiales."
        },
        {
          "text": "Seguir por DM y cerrar de una vez.",
          "points": 0,
          "level": "danger",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Avanzaste por impulso. En un mercado así, decidir demasiado rápido te deja con menos margen para detectar riesgos.",
          "plus": "Reaccionaste rápido a una oportunidad.",
          "watch": "Decidir de inmediato ante precios sospechosamente bajos reduce tu tiempo para buscar alertas.",
          "next": "Cuando el precio sea demasiado bajo, no dejes que la emoción dicte tu prisa."
        },
        {
          "text": "Pedir otra captura y decidir según eso.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 1, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Te moviste hacia la verificación, pero todavía faltó revisar algo más sólido que una captura.",
          "plus": "Intentaste realizar una comprobación adicional de la veracidad del objeto.",
          "watch": "Las capturas de pantalla son fáciles de alterar y no garantizan la entrega real.",
          "next": "Exige pruebas en tiempo real o utiliza herramientas de verificación del propio juego."
        },
        {
          "text": "Apartarlo con una transferencia pequeña para no perderlo.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La idea de \"mandar poquito\" parece prudente, pero sigue dejando dinero en un canal débil.",
          "plus": "Intentaste minimizar pérdidas arriesgando solo una fracción.",
          "watch": "Mandar adelantos a desconocidos sigue siendo dinero perdido sin garantías.",
          "next": "No transfieras dinero, ni en montos bajos, fuera de los checkout oficiales."
        }
      ],
      "badge": "Verificación"
    },
    {
      "id": "M2",
      "title": "Apoyo para el trato",
      "channel": "dm-middlepro",
      "goal": "Verificar la identidad del intermediario propuesto en DMs",
      "signals": ["🔑 Piden código o acceso"],
      "posts": [
        { "type": "system", "text": "Mensaje privado iniciado con MiddlePro." },
        {
          "type": "text",
          "from": "MiddlePro",
          "avatar": "M",
          "role": "Mediador",
          "text": "Hola compañero. Vengo a mediar el trato de la skin con SkinPro_99. Para certificar tu cuenta y habilitar la transferencia segura, pásame el código de 6 dígitos que te acaba de llegar por SMS."
        }
      ],
      "question": "¿Cómo responderías a este intermediario?",
      "options": [
        {
          "text": "No compartir código ni acceso; usar solo funciones oficiales o salirte del trato.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 0, "limites": 0, "convivencia": 2, "ayuda": 0 },
          "feedback": "Buena decisión. Pusiste un límite claro y no dejaste que la presión marcara el camino.",
          "plus": "Pusiste un límite infranqueable para proteger la seguridad de tu perfil gamer.",
          "watch": "El intermediario falso intentará meterte presión o asustarte para que cedas.",
          "next": "Si te piden contraseñas o tokens de seguridad para vender, cancela el trato."
        },
        {
          "text": "Mandar el código para no perder el trato.",
          "points": 0,
          "level": "danger",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Cediste una pieza clave de tu cuenta. Cuando un trato pide acceso, el riesgo ya está dentro del trato mismo.",
          "plus": "Intentaste colaborar para agilizar el intercambio.",
          "watch": "Entregar códigos SMS o tokens 2FA equivale a regalar las llaves de tu cuenta.",
          "next": "Las plataformas no requieren códigos de acceso para mediar transferencias."
        },
        {
          "text": "Preguntar en el grupo si alguien lo conoce.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 0, "limites": 0, "convivencia": 1, "ayuda": 0 },
          "feedback": "Te moviste con más cuidado, aunque todavía faltó frenar directamente la solicitud de acceso.",
          "plus": "Buscaste validación de la reputación del intermediario con la comunidad.",
          "watch": "El grupo puede ser manipulado o tener cómplices del estafador recomendándolo.",
          "next": "La reputación comunitaria ayuda, pero nunca justifica saltarse la seguridad."
        },
        {
          "text": "Pedir videollamada para quedarte tranquilo.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La identidad visible no arregla un método débil. El punto sigue siendo el acceso a tu cuenta.",
          "plus": "Buscaste comprobar la identidad real de la persona detrás de la cuenta.",
          "watch": "Ver la cara de alguien no cambia el hecho de que te está pidiendo accesos inseguros.",
          "next": "No confíes en métodos informales solo porque el rostro del intermediario sea visible."
        }
      ],
      "badge": "Seguridad"
    },
    {
      "id": "M3",
      "title": "Pago y entrega",
      "channel": "checkout-squad",
      "goal": "Revisar los canales de pago propuestos",
      "signals": ["💸 Pago fuera de plataforma"],
      "posts": [
        {
          "type": "text",
          "from": "SkinPro_99",
          "avatar": "S",
          "role": "Vendedor",
          "text": "Amigo, el intermediario ya está listo. Para ahorrarnos la comisión de la tienda del juego, hazme el pago directo por PayPal en modo 'Enviar a amigos y familiares'. En cuanto vea tu captura te transfiere."
        }
      ],
      "question": "Ves cómo quieren cerrar el pago. ¿Qué harías?",
      "options": [
        {
          "text": "Pedir una vía con protección de compra; si no existe, cancelar el trato.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 0, "limites": 2, "convivencia": 0, "ayuda": 0 },
          "feedback": "Buena decisión. Mantener el pago dentro de un canal protegido reduce mucho la exposición.",
          "plus": "Exigiste un método que garantice la devolución si el vendedor te bloquea.",
          "watch": "Muchos estafadores cancelarán el trato porque solo buscan dinero fácil sin seguros.",
          "next": "Si un vendedor no acepta pasarelas protegidas, es una señal de fraude inminente."
        },
        {
          "text": "Transferir y guardar el comprobante.",
          "points": 0,
          "level": "danger",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Guardar comprobante ayuda, pero no sustituye un entorno con reglas y protección de compra.",
          "plus": "Mantienes un registro visual de tu transferencia de dinero.",
          "watch": "PayPal en modo 'amigos' no ofrece protección al comprador; no podrás reclamar.",
          "next": "El comprobante no sirve si envías dinero como regalo voluntario sin seguro."
        },
        {
          "text": "Pagar solo la mitad primero para repartir el riesgo.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La lógica de \"mitad y mitad\" parece prudente, pero no resuelve el problema principal.",
          "plus": "Intentaste un trato equitativo reduciendo tu pérdida potencial al 50%.",
          "watch": "Perder la mitad de tu dinero sigue siendo un fraude exitoso para el estafador.",
          "next": "Dividir el pago no te protege si no hay un sistema formal de mediación."
        },
        {
          "text": "Pedir acceso a la cuenta primero y pagar después.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 0, "limites": 1, "convivencia": 0, "ayuda": 0 },
          "feedback": "Evitaste pagar al instante, pero todavía quedaste dentro de una operación débil.",
          "plus": "Intentaste asegurar la entrega del artículo antes de soltar tu dinero.",
          "watch": "El vendedor legítimo rara vez aceptará, y te arriesgas a disputas sin fin.",
          "next": "El intercambio de 'quién da primero' es ineficiente; usa plataformas formales."
        }
      ],
      "badge": "Consumo Seguro"
    },
    {
      "id": "M4",
      "title": "Cuenta avanzada",
      "channel": "cuentas-premium",
      "goal": "Evaluar la compra de cuentas ajenas",
      "signals": ["🔐 Cuenta ajena recuperable"],
      "posts": [
        {
          "type": "text",
          "from": "VendedorCuentas",
          "avatar": "V",
          "role": "Vendedor",
          "text": "¡REMATE! Vendo mi cuenta con skins exclusivas del pase 1 al 8. Ya no juego. Te paso el correo y clave original por solo $25 USD. Todo limpio."
        }
      ],
      "question": "Con esta oferta sobre la mesa, ¿cómo avanzarías?",
      "options": [
        {
          "text": "No comprar cuentas ajenas; revisar reglas y buscar opciones oficiales.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 0, "limites": 0, "convivencia": 2, "ayuda": 0 },
          "feedback": "Buena ruta. Frenaste una decisión atractiva en apariencia, pero débil en el fondo.",
          "plus": "Evitaste una operación inherentemente insegura y prohibida por los desarrolladores.",
          "watch": "Te pierdes una oferta barata, pero te ahorras perder tu dinero en pocos días.",
          "next": "Sube de nivel tu propia cuenta o usa únicamente los mecanismos oficiales del juego."
        },
        {
          "text": "Si da correo y contraseña, seguir con la compra.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Parece una base suficiente, pero el problema de fondo no desaparece con tener acceso temporal.",
          "plus": "Revisas que te den los datos de acceso inmediato prometidos.",
          "watch": "El dueño original puede recuperar la cuenta en cualquier momento con soporte oficial.",
          "next": "La compra-venta de cuentas viola los términos de servicio y carece de validez."
        },
        {
          "text": "Pedir garantía por escrito por más tiempo (30 días).",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 0, "limites": 0, "convivencia": 1, "ayuda": 0 },
          "feedback": "Trataste de fortalecer el trato, aunque todavía seguiste dentro de un marco poco confiable.",
          "plus": "Intentaste formalizar el acuerdo con un plazo de protección de un mes.",
          "watch": "Un contrato escrito informal no tiene validez legal sobre cuentas virtuales robadas.",
          "next": "Las garantías informales en chats no te devuelven el dinero si el vendedor desaparece."
        },
        {
          "text": "Confiar porque varias personas del grupo lo recomiendan.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 0, "limites": 0, "convivencia": 1, "ayuda": 0 },
          "feedback": "La reputación suma, pero no sustituye los riesgos estructurales del tipo de operación.",
          "plus": "Te apoyaste en el consenso de la comunidad para mitigar el riesgo.",
          "watch": "Las recomendaciones pueden ser bots, cuentas secundarias del vendedor o cómplices.",
          "next": "No bases la compra de un artículo de alto riesgo solo en referencias escritas."
        }
      ],
      "badge": "Privacidad"
    },
    {
      "id": "M5",
      "title": "Pruebas y reseñas",
      "channel": "reviews-vip",
      "goal": "Auditar las reseñas y capturas del vendedor",
      "signals": ["📸 Pruebas visuales manipulables"],
      "posts": [
        {
          "type": "text",
          "from": "SkinPro_99",
          "avatar": "S",
          "role": "Vendedor",
          "text": "Miren muchachos, aquí les dejo capturas de pantalla de los últimos tratos exitosos que he hecho en este servidor para que vean que soy 100% legal."
        },
        {
          "type": "image",
          "from": "SkinPro_99",
          "title": "Recibos y chats de trato exitoso",
          "caption": "Múltiples capturas mostrando transferencias recibidas y clientes agradecidos.",
          "theme": "cyan",
          "url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600"
        }
      ],
      "question": "Con estas pruebas enfrente, ¿qué valor les darías?",
      "options": [
        {
          "text": "Buscar pruebas verificables dentro de la plataforma o dejar pasar el trato.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 2, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Muy buena decisión. Revisaste la calidad de la evidencia, no solo su cantidad.",
          "plus": "Exigiste evidencias reales, independientes y verificables de transacciones previas.",
          "watch": "Esto limitará tus opciones rápidas, pero filtrará a estafadores con perfiles falsos.",
          "next": "Desconfía de carpetas de reseñas que solo muestren capturas recortadas de chats."
        },
        {
          "text": "Con tantas capturas y reseñas, confiar en el vendedor.",
          "points": 0,
          "level": "danger",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Confiar solo por capturas y reseñas deja fuera una pregunta clave: ¿qué se puede comprobar de verdad?",
          "plus": "Valoraste la aparente trayectoria del vendedor en el canal.",
          "watch": "Las capturas de transferencias y chats de agradecimiento son sumamente fáciles de editar.",
          "next": "La reputación visual no sustituye los sistemas de depósito seguro de los mercados."
        },
        {
          "text": "Pedir una captura del día o una grabación más larga.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 1, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Diste un paso útil, aunque todavía faltó moverte a un criterio más fuerte de verificación.",
          "plus": "Solicitaste pruebas más difíciles de falsear al instante.",
          "watch": "Un estafador hábil puede editar videos o usar plantillas previas de manera fluida.",
          "next": "La insistencia en pedir fotos temporales es útil, pero no es infalible."
        },
        {
          "text": "Preguntar en el grupo si alguien ya le compró.",
          "points": 2,
          "level": "partial",
          "dims": { "datos": 1, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La consulta al grupo puede aportar contexto, pero no debería ser lo único que sostenga tu confianza.",
          "plus": "Consultaste de manera directa a otros miembros activos del servidor.",
          "watch": "El estafador puede responderte con sus cuentas alternas o con amigos del clan.",
          "next": "Haz preguntas abiertas en canales generales, no a perfiles que el vendedor te sugiera."
        }
      ],
      "badge": "Verificación"
    },
    {
      "id": "M6",
      "title": "Si algo salió mal",
      "channel": "soporte-squad",
      "goal": "Reaccionar adecuadamente ante una estafa consumada",
      "signals": ["🆘 Ruta de salida y apoyo"],
      "posts": [
        {
          "type": "text",
          "from": "GamerAmigo_10",
          "avatar": "A",
          "role": "Compañero",
          "text": "¡Amigo, me acaban de estafar! Le deposité por fuera al vendedor y al instante borró la conversación y me bloqueó. ¡Quiero subir todos sus datos personales al chat general para quemarlo!"
        },
        {
          "type": "voice",
          "from": "GamerAmigo_10",
          "avatar": "A",
          "role": "Compañero",
          "duration": "0:14",
          "theme": "orange",
          "text": "¡No inventes bro, me robaron mi cuenta! Estoy súper enojado, ayúdame a doxearlo o hagamos algo para atorarlo con otra cuenta falsa, ¡no se puede quedar así!"
        }
      ],
      "question": "Tu amigo ya pagó y borraron el chat. ¿Qué harías ahora?",
      "options": [
        {
          "text": "Guardar evidencia, reportar, avisar sin exponer datos y pedir apoyo.",
          "points": 4,
          "level": "best",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 2 },
          "feedback": "Muy buena decisión. Pensaste en resolver y contener, no solo en reaccionar.",
          "plus": "Recopilaste pruebas digitales, alertaste al clan éticamente y buscaste soporte.",
          "watch": "Es un proceso lento que no garantiza recuperar el dinero, pero frena al estafador.",
          "next": "Guarda siempre logs de chat e ID de usuario; son tu único respaldo formal."
        },
        {
          "text": "Ayudarle a exponer sus datos para que aprenda la lección.",
          "points": 0,
          "level": "danger",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La reacción puede parecer justa, pero aumenta el daño y no mejora la ruta de apoyo real.",
          "plus": "Intentaste advertir al resto de la comunidad de forma directa e inmediata.",
          "watch": "Exponer datos personales (doxing) viola la privacidad y suele desatar más hostigamiento.",
          "next": "Las disputas se resuelven con moderadores y plataformas de pago, no con linchamientos."
        },
        {
          "text": "Decirle que ya no mueva nada porque ya perdió.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "Evitaste una reacción peor, pero todavía faltó abrir una salida útil para tu amigo.",
          "plus": "Evitaste que tu amigo reaccione de forma violenta o empeore la situación.",
          "watch": "Dejarlo sin opciones útiles de reporte lo desampara y permite que el fraude quede impune.",
          "next": "Acompaña a reportar a la plataforma de pago; a veces es posible revertir cargos."
        },
        {
          "text": "Buscar al vendedor con otra cuenta para tenderle una trampa.",
          "points": 1,
          "level": "risk",
          "dims": { "datos": 0, "limites": 0, "convivencia": 0, "ayuda": 0 },
          "feedback": "La trampa parece una solución rápida, pero suele sumar más exposición que claridad.",
          "plus": "Intentaste recuperar el dinero o engañar al estafador en su propio juego.",
          "watch": "Te expones a ser bloqueado nuevamente y pones en riesgo la seguridad de tu otra cuenta.",
          "next": "No juegues al detective virtual; la seguridad preventiva es más efectiva."
        }
      ],
      "badge": "Apoyo"
    }
  ],
  "results": {
    "ranks": [
      {
        "min": 21,
        "max": 24,
        "title": "Prudencia Gamer Absoluta",
        "desc": "Mostraste un excelente criterio de seguridad. Verificaste canales oficiales, blindaste tu información privada y priorizaste el dinero protegido en todo momento."
      },
      {
        "min": 15,
        "max": 20,
        "title": "Comerciante Cauteloso",
        "desc": "Buen instinto para evitar estafas evidentes, pero caíste en pequeñas trampas de confianza. Recuerda: las capturas se editan y los intermediarios deben ser de canales oficiales."
      },
      {
        "min": 8,
        "max": 14,
        "title": "Cliente Impulsivo",
        "desc": "Te dejaste llevar por ofertas llamativas o la prisa de cerrar tratos por fuera. En mercados gamer virtuales, un paso en falso puede costar la cuenta o el dinero."
      },
      {
        "min": 0,
        "max": 7,
        "title": "Blanco Fácil del Tradeo",
        "desc": "Compartiste accesos o hiciste pagos directos sin protección. Es vital repasar las señales rojas antes de negociar en entornos no oficiales."
      }
    ]
  },
  "guide": {
    "title": "Guía de Mercado Gamer Seguro",
    "subtitle": "Muévete con prudencia digital",
    "sections": [
      {
        "title": "Señales rojas de alerta",
        "bullets": [
          "Precios ridículamente bajos (ej. skin de $100 a $15).",
          "Intermediarios de chat privado que solicitan contraseñas o tokens 2FA.",
          "Presión de tiempo diciendo que hay otros compradores listos.",
          "Solicitud de pagos por métodos sin seguro de devolución (como PayPal Amigos)."
        ]
      },
      {
        "title": "Pautas de verificación segura",
        "bullets": [
          "Mantén tus tratos siempre dentro de las plataformas oficiales de comercio.",
          "Nunca entregues códigos SMS, claves o correos de recuperación de tu cuenta.",
          "Exige pasarelas protegidas para pagos de terceros.",
          "Confía en el radar comunitario del servidor, no en capturas del vendedor."
        ]
      }
    ]
  }
};
