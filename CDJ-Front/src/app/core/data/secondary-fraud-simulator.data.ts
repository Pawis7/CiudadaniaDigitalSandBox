export interface FraudCase {
  id: string;
  name: string;
  icon: string;
  grad: string;
  contact: {
    name: string;
    avatar: string;
    avGrad: string;
  };
  intro: { t: string; link?: boolean }[];
  turns: {
    options: {
      txt: string;
      level: 'safe' | 'careful' | 'risky' | 'danger';
      reply: { t: string; link?: boolean }[];
      alert: {
        type: 'safe' | 'warn' | 'danger';
        title: string;
        text: string;
      };
    }[];
  }[];
  finalTip: string;
}

export const SECONDARY_FRAUD_SIMULATOR_DATA: FraudCase[] = [
  {
    id: "premio", name: "Premio inesperado", icon: "🎁", grad: "linear-gradient(145deg,#a855f7,#7c3aed)",
    contact: { name: "¡Felicidades! 🎉", avatar: "🎁", avGrad: "linear-gradient(145deg,#f472b6,#a855f7)" },
    intro: [
      { t: "¡Hola! 👋" },
      { t: "Has sido seleccionado como GANADOR de un iPhone 15 😍" },
      { t: "Para recibir tu premio solo llena tus datos en este enlace:" },
      { t: "www.ganaste-premio-gratis.com", link: true }
    ],
    turns: [
      { options: [
        { txt: "¡Wow! ¿En serio? 😮", level: "careful",
          reply: [{ t: "¡Claro que sí! Eres muy afortunado 🍀 date prisa, es por tiempo limitado ⏰" }],
          alert: { type: "warn", title: "Ojo con la prisa", text: "\"Por tiempo limitado\" y \"date prisa\" sirven para que no pienses. Un premio real no te apura." } },
        { txt: "Yo nunca me inscribí a ningún sorteo 🤔", level: "safe",
          reply: [{ t: "Fuiste elegido al azar por tu número 😎 ¡aprovecha antes de que se lo den a otro!" }],
          alert: { type: "safe", title: "¡Bien pensado!", text: "No puedes ganar un sorteo en el que nunca participaste. Esa pregunta desarma casi cualquier estafa de premios." } },
        { txt: "Va, le doy clic al enlace 👆", level: "danger",
          reply: [{ t: "¡Perfecto! Solo pon tu nombre, dirección y los datos de la tarjeta para el envío 💳" }],
          alert: { type: "danger", title: "¡Alto! No abras el enlace", text: "Los enlaces de desconocidos pueden robar tus datos o meter virus a tu teléfono. Nunca des clic si no sabes quién lo manda." } }
      ]},
      { options: [
        { txt: "¿Cómo consiguieron mi número?", level: "safe",
          reply: [{ t: "Eh… el sistema lo eligió 🤖 ya no preguntes tanto y mete tus datos 😅" }],
          alert: { type: "safe", title: "Pregunta incómoda = buena señal", text: "Cuando pides explicaciones, los estafadores se molestan o se contradicen. La gente honesta no." } },
        { txt: "Te paso mi nombre y dirección 🏠", level: "danger",
          reply: [{ t: "Genial ✍️ ahora los 16 dígitos de tu tarjeta para pagar el \"envío\" 💳" }],
          alert: { type: "danger", title: "Datos personales en riesgo", text: "Tu nombre, dirección o escuela no se comparten con desconocidos. Con eso pueden hacerte daño o engañar a tu familia." } },
        { txt: "Esto es una estafa, no caigo 🚫", level: "safe",
          reply: [{ t: "😡 te lo pierdes, era de verdad" }],
          alert: { type: "safe", title: "¡Lo descubriste!", text: "Detectaste el fraude. Lo mejor ahora: no responder más, bloquear el contacto y contarle a un adulto." } }
      ]},
      { options: [
        { txt: "Voy a contarle a mi mamá o papá 👨‍👩‍👧", level: "safe",
          reply: [{ t: "No no, mejor no le digas a nadie, es entre tú y yo 🤫" }],
          alert: { type: "safe", title: "Avisar a un adulto: lo correcto", text: "Hablar con un adulto de confianza es tu mejor escudo. Y si alguien te pide \"no decirle a nadie\", eso es una alarma enorme." } },
        { txt: "Pago el envío para que llegue rápido 💳", level: "danger",
          reply: [{ t: "Listo, en 24h llega tu iPhone 📦 (spoiler: nunca llega)" }],
          alert: { type: "danger", title: "Un premio nunca se paga", text: "Si para recibir un \"premio gratis\" te piden pagar algo, es 100% estafa. Lo gratis no cuesta." } },
        { txt: "Bloquear y reportar 🚷", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Cierre perfecto", text: "Bloquear y reportar corta el contacto y avisa a la app. Hiciste lo más seguro." } }
      ]}
    ],
    finalTip: "Un premio que no pediste, con prisa y que te pide datos o dinero, siempre es un fraude."
  },

  {
    id: "cuenta", name: "Cuenta suspendida", icon: "⚠️", grad: "linear-gradient(145deg,#f59e0b,#ea580c)",
    contact: { name: "Soporte de Seguridad", avatar: "⚠️", avGrad: "linear-gradient(145deg,#fbbf24,#ea580c)" },
    intro: [
      { t: "⚠️ AVISO IMPORTANTE" },
      { t: "Detectamos un acceso extraño a tu cuenta. Será BLOQUEADA en 1 hora ⏳" },
      { t: "Para evitarlo, verifica tu identidad aquí:" },
      { t: "www.verifica-tu-cuenta-ahora.net", link: true }
    ],
    turns: [
      { options: [
        { txt: "¡No! ¿Qué hago? 😰 dime rápido", level: "risky",
          reply: [{ t: "Tranquilo, solo escribe aquí tu usuario y contraseña para protegerte 🔐" }],
          alert: { type: "warn", title: "El miedo es el anzuelo", text: "Te asustan para que actúes sin pensar. Respira: una cuenta no se bloquea por un mensaje así." } },
        { txt: "¿De qué cuenta hablas exactamente?", level: "safe",
          reply: [{ t: "De… tu cuenta principal 😅 entra al enlace y verifica ya" }],
          alert: { type: "safe", title: "Pides detalles, no caes", text: "Una empresa real sabe de qué cuenta habla y te llama por tu nombre. La vaguedad delata al estafador." } },
        { txt: "Le doy clic para arreglarlo 👆", level: "danger",
          reply: [{ t: "Bien. Inicia sesión con tu correo y contraseña en la página 🔓" }],
          alert: { type: "danger", title: "No entres por ese enlace", text: "Es una página falsa que copia el diseño real para robar tu contraseña. Esto se llama phishing." } }
      ]},
      { options: [
        { txt: "Aquí tienes mi contraseña: ...", level: "danger",
          reply: [{ t: "¡Recibido! Ya tenemos el control de tu cuenta 😈" }],
          alert: { type: "danger", title: "Nunca compartas contraseñas", text: "Ningún soporte real te pide tu contraseña. Jamás se escribe en un chat ni en un enlace que te mandaron." } },
        { txt: "Voy a entrar yo mismo a la app oficial", level: "safe",
          reply: [{ t: "No, hazlo desde mi enlace, es más rápido ⚡" }],
          alert: { type: "safe", title: "Entrar por tu cuenta = seguro", text: "Si dudas, abre tú mismo la app o el sitio oficial escribiéndolo tú. Nunca uses el enlace que te enviaron." } },
        { txt: "Voy a llamar al número oficial para confirmar 📞", level: "safe",
          reply: [{ t: "No hace falta llamar, confía en mí 🙏" }],
          alert: { type: "safe", title: "Verificar por otro canal", text: "Confirmar por el número oficial (no el que te dan) es la forma más segura de saber si un aviso es real." } }
      ]},
      { options: [
        { txt: "Le aviso a un adulto y reporto el mensaje 🛡️", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Decisión de experto", text: "Avisar a un adulto y reportar es lo mejor. Acabas de bloquear un intento de robo de cuenta." } },
        { txt: "Mejor mando mi correo y teléfono", level: "risky",
          reply: [{ t: "Perfecto, con eso seguimos 😏" }],
          alert: { type: "warn", title: "Cada dato suma para ellos", text: "Aunque parezca poco, tu correo y teléfono ayudan al estafador a engañarte mejor después. No los entregues." } },
        { txt: "Bloquear y seguir con mi día 🚫", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Cierre limpio", text: "Ignorar, bloquear y no responder es totalmente válido. No le debes explicaciones a un estafador." } }
      ]}
    ],
    finalTip: "Nadie de \"soporte\" real te pide tu contraseña ni te apura con bloqueos. Verifica siempre por el sitio oficial."
  },

  {
    id: "amor", name: "Amistad falsa", icon: "💛", grad: "linear-gradient(145deg,#fb7185,#e11d48)",
    contact: { name: "Alex_nuevo", avatar: "🙂", avGrad: "linear-gradient(145deg,#fb7185,#be185d)" },
    intro: [
      { t: "Hola 😊 vi tu perfil y pareces súper buena onda" },
      { t: "Tengo tu misma edad, también me gustan los videojuegos 🎮" },
      { t: "¿Podemos ser amigos y platicar solo tú y yo? 😄" }
    ],
    turns: [
      { options: [
        { txt: "¡Claro! ¿Tú quién eres? ¿Te conozco?", level: "safe",
          reply: [{ t: "Eh… soy nuevo en la escuela 😅 mejor no preguntes y platicamos" }],
          alert: { type: "safe", title: "Verificar quién es: correcto", text: "En internet cualquiera puede decir que tiene tu edad. Está bien preguntar y desconfiar si las respuestas son raras." } },
        { txt: "Ok, pero ¿por qué solo tú y yo en secreto?", level: "safe",
          reply: [{ t: "Porque los demás no entienden lo nuestro 🤫 será nuestro secreto" }],
          alert: { type: "danger", title: "Señal de alarma: el secreto", text: "Cuando alguien pide que sea \"un secreto\" y que no le digas a tus papás, es una de las señales más peligrosas. Cuéntale a un adulto." } },
        { txt: "Sí, eres mi mejor amigo ya 🥰", level: "risky",
          reply: [{ t: "¡Yo igual! Oye… ¿me pasas una foto tuya? 📸" }],
          alert: { type: "warn", title: "Confianza demasiado rápido", text: "Alguien que te quiere muchísimo en minutos puede estar fingiendo para ganarse tu confianza. Ve con calma." } }
      ]},
      { options: [
        { txt: "Te paso una foto 📸", level: "danger",
          reply: [{ t: "Qué linda 😍 ¿y dónde vives? ¿a qué escuela vas?" }],
          alert: { type: "danger", title: "No envíes fotos tuyas", text: "Nunca mandes fotos a alguien que no conoces en persona. No sabes a dónde llegan ni qué harán con ellas." } },
        { txt: "No mando fotos ni doy mi escuela 🚫", level: "safe",
          reply: [{ t: "Ándale, no seas así 😢 si somos amigos…" }],
          alert: { type: "safe", title: "Límite firme: excelente", text: "Tu dirección, escuela y fotos son privadas. Que insistan o te hagan sentir mal no te obliga a nada." } },
        { txt: "¿Para qué quieres saber dónde vivo? 🤨", level: "safe",
          reply: [{ t: "Solo para conocernos en persona un día 😉 no le digas a nadie" }],
          alert: { type: "danger", title: "Quiere ubicarte: peligro real", text: "Pedir tu ubicación y proponer verse en secreto es gravísimo. Habla YA con un adulto de confianza." } }
      ]},
      { options: [
        { txt: "Voy a contarle a mis papás sobre ti 👨‍👩‍👧", level: "safe",
          reply: [{ t: "¡No! Si les dices ya no seremos amigos 😠" }],
          alert: { type: "safe", title: "Hablar con un adulto: lo más valiente", text: "Si alguien se enoja porque le cuentas a un adulto, confirma que algo anda mal. Contarlo es lo correcto, siempre." } },
        { txt: "Mejor quedamos de vernos solos 🤐", level: "danger",
          reply: [{ t: "¡Sí! No le digas a nadie, va a ser nuestro secreto 🤫" }],
          alert: { type: "danger", title: "Nunca te veas a solas", text: "Jamás quedes de ver a solas a alguien que conociste en línea, ni guardes ese secreto. Avisa a un adulto de inmediato." } },
        { txt: "Te bloqueo y reporto el perfil 🚷", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Te protegiste muy bien", text: "Bloquear, reportar y contarle a un adulto es exactamente lo que debes hacer. Tu seguridad va primero." } }
      ]}
    ],
    finalTip: "Un desconocido que te apura, te pide fotos o secretos y quiere verte a solas es un peligro. Cuéntale siempre a un adulto de confianza."
  },

  {
    id: "compra", name: "Compra fraudulenta", icon: "🛍️", grad: "linear-gradient(145deg,#38bdf8,#2563eb)",
    contact: { name: "VentasGamer_MX", avatar: "🎮", avGrad: "linear-gradient(145deg,#38bdf8,#1d4ed8)" },
    intro: [
      { t: "¡Vendo consola nueva, sellada, súper barata! 🎮🔥" },
      { t: "Normal cuesta 8000, te la dejo en 1500 💸 ¡última pieza!" },
      { t: "Solo aparta con el pago YA y te la mando hoy mismo 📦" }
    ],
    turns: [
      { options: [
        { txt: "¡Qué barata! La quiero ya 🤑", level: "risky",
          reply: [{ t: "¡Genial! Pásame el pago por transferencia y guardo la tuya 💳" }],
          alert: { type: "warn", title: "Demasiado barata = sospechoso", text: "Un precio increíble suele ser el anzuelo. Si es muy barato para ser verdad, casi siempre lo es." } },
        { txt: "¿Por qué tan barata si es nueva? 🤔", level: "safe",
          reply: [{ t: "Porque necesito el dinero urgente, pero apúrate o se va 🏃" }],
          alert: { type: "safe", title: "Buena duda", text: "Pedir el porqué del precio y notar la prisa te protege. Las ofertas \"urgentes\" suelen ser trampas." } },
        { txt: "¿Puedo pagar al recibirla en persona?", level: "safe",
          reply: [{ t: "No, primero el pago, luego te la mando 😅 confía" }],
          alert: { type: "safe", title: "Pagar al recibir: lo seguro", text: "Quien no acepta pago contra entrega ni verse en un lugar público suele estar mintiendo." } }
      ]},
      { options: [
        { txt: "Te transfiero todo de una vez 💸", level: "danger",
          reply: [{ t: "¡Recibido! Te aviso cuando la mande 😈 (y desaparece)" }],
          alert: { type: "danger", title: "No pagues por adelantado", text: "Pagar antes a un desconocido es como regalar tu dinero. Si te bloquea, no recuperas nada." } },
        { txt: "Pásame fotos reales con la fecha de hoy 📸", level: "safe",
          reply: [{ t: "Ehh… las fotos están en mi otro cel 📱 confía en mí" }],
          alert: { type: "safe", title: "Pides pruebas: muy bien", text: "Pedir pruebas frescas (foto con la fecha) descubre a quien copió imágenes de internet." } },
        { txt: "Voy a buscar opiniones de este vendedor 🔍", level: "safe",
          reply: [{ t: "No hace falta, soy de confianza 🙏 mejor apúrate" }],
          alert: { type: "safe", title: "Investigar al vendedor", text: "Revisar reseñas y reputación antes de pagar es básico. Un vendedor real no le teme a que lo investigues." } }
      ]},
      { options: [
        { txt: "No pago nada hasta verla. Le aviso a un adulto 🛡️", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Compra inteligente", text: "No pagar por adelantado y consultar con un adulto antes de gastar es justo lo que hace alguien seguro." } },
        { txt: "Le mando la mitad para apartar 💰", level: "risky",
          reply: [{ t: "Va, mándala y guardo la consola 😏" }],
          alert: { type: "warn", title: "Ni un peso por adelantado", text: "\"Apartar\" con dinero a un desconocido es el mismo riesgo: puede quedarse con tu anticipo y desaparecer." } },
        { txt: "Reporto la publicación como fraude 🚩", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Ayudas a más personas", text: "Reportar la estafa protege a otros que podrían caer. Gran decisión." } }
      ]}
    ],
    finalTip: "Precio increíble + prisa + pago por adelantado = fraude. Paga solo al recibir y consulta con un adulto."
  },

  {
    id: "familiar", name: "Familiar falso", icon: "📱", grad: "linear-gradient(145deg,#34d399,#0d9488)",
    contact: { name: "Número desconocido", avatar: "❓", avGrad: "linear-gradient(145deg,#34d399,#0f766e)" },
    intro: [
      { t: "Hola, soy tu primo 😊 cambié de número, guárdalo" },
      { t: "Oye, tengo una emergencia y no puedo entrar a mi banco 😩" },
      { t: "¿Me ayudas con algo urgente porfa?" }
    ],
    turns: [
      { options: [
        { txt: "¡Claro primo! ¿Qué necesitas?", level: "risky",
          reply: [{ t: "Te va a llegar un código por SMS, pásamelo rápido porfa 🙏" }],
          alert: { type: "warn", title: "\"Soy tu primo\" sin probarlo", text: "Que alguien diga ser tu familiar desde un número nuevo no lo confirma. Verifica antes de ayudar." } },
        { txt: "¿Cuál primo? ¿Cómo se llama tu mamá? 🤨", level: "safe",
          reply: [{ t: "Ash, ya no preguntes, es urgente 😤 solo pásame el código" }],
          alert: { type: "safe", title: "Prueba de identidad: bien hecho", text: "Pedir un dato que solo el familiar real sabría desenmascara al impostor al instante." } },
        { txt: "Te marco a tu número de siempre para confirmar 📞", level: "safe",
          reply: [{ t: "No, ese cel ya no sirve 📵 mejor por aquí" }],
          alert: { type: "safe", title: "Confirmar por otro canal", text: "Llamar al número de siempre o preguntar a la familia es la forma segura de saber si de verdad es quien dice." } }
      ]},
      { options: [
        { txt: "Aquí está el código que me llegó: 4821", level: "danger",
          reply: [{ t: "¡Gracias! (ahora controlan tu cuenta de WhatsApp) 😈" }],
          alert: { type: "danger", title: "Nunca compartas códigos", text: "Los códigos que llegan por SMS son llaves de TUS cuentas. Nadie real te los pide; compartirlos es regalar tu cuenta." } },
        { txt: "No comparto códigos con nadie 🔐", level: "safe",
          reply: [{ t: "Pero si soy tu primo 😢 ándale" }],
          alert: { type: "safe", title: "Regla de oro cumplida", text: "Un código de verificación NO se comparte jamás, ni con \"familiares\". Lo tienes clarísimo." } },
        { txt: "Necesito que me prestes $500 a este número 💸", level: "danger",
          reply: [{ t: "¡Sí! Mándalos a esta cuenta porfa 🙏" }],
          alert: { type: "danger", title: "Dinero urgente: clásico fraude", text: "Pedir dinero \"urgente\" haciéndose pasar por un familiar es de los engaños más comunes. Confirma siempre antes." } }
      ]},
      { options: [
        { txt: "Le voy a preguntar a mis papás si es real 👨‍👩‍👧", level: "safe",
          reply: [{ t: "No les digas, es entre nosotros 🤫" }],
          alert: { type: "safe", title: "Consultar a la familia: correcto", text: "Antes de dar códigos o dinero, pregunta a un adulto de tu familia. Y si piden \"no decir\", desconfía." } },
        { txt: "Mando el dinero para ayudar rápido 💸", level: "danger",
          reply: [{ t: "¡Eres el mejor! (y nunca vuelves a saber de él) 👋" }],
          alert: { type: "danger", title: "Dinero perdido", text: "Una vez que envías dinero a un estafador, no vuelve. Por eso siempre se confirma primero quién es." } },
        { txt: "Bloqueo el número y aviso a la familia 🚫", level: "safe",
          reply: [{ t: "—" }],
          alert: { type: "safe", title: "Cierre de experto", text: "Bloquear y avisar a la familia evita que el estafador lo intente con otros parientes. Perfecto." } }
      ]}
    ],
    finalTip: "Verifica siempre quién es antes de dar códigos o dinero. Los códigos de SMS no se comparten con nadie, nunca."
  }
];
