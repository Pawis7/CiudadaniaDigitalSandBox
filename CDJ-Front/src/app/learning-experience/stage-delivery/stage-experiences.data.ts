// Casos preparados: sin herramientas externas, cuentas ni información personal para resolverlos.
export type StageProfile = 'kids' | 'teens' | 'families' | 'teachers';
export type UseContext = 'casa' | 'escuela';
export type Band = 'pb' | 'pa' | 'sec' | 'ems';
export interface CaseChoice { label: string; feedback: string; preferred: boolean; }
export interface CaseQuestion { story: string; question: string; choices: CaseChoice[]; }
export interface StageLesson { title: string; subtitle: string; duration: string; objective: string; first: CaseQuestion; clues: string[]; second: CaseQuestion; practice: string[]; evidence: string; family: string[]; teacher: string[]; risks: string[]; band: Band; }
export interface StageOption { profile: StageProfile; stage: string; label: string; band: Band; alternativeBand?: Band; }
export interface StageDelivery { slug: string; option: StageOption; lesson: StageLesson; context: UseContext; key: string; }
export const PROFILE_LABELS: Record<StageProfile,string> = { kids:'Niñas y niños', teens:'Adolescentes', families:'Familias', teachers:'Docentes' };
export const PROFILE_ROUTES: Record<StageProfile,string> = { kids:'/p/ninas-y-ninos', teens:'/p/adolescentes', families:'/p/familias', teachers:'/p/docentes' };
export const BAND_LABELS: Record<Band,string> = {pb:'Primaria baja',pa:'Primaria alta',sec:'Secundaria',ems:'Media superior'};
export const STAGE_LESSONS: Record<string,StageLesson> = {
  "datos-pb": {
    "title": "Tu cinturón de seguridad digital",
    "subtitle": "El mensaje que pedía más de la cuenta",
    "duration": "8–10 min",
    "objective": "Reconocer una solicitud de información personal y practicar cómo pedir ayuda.",
    "first": {
      "story": "Leo lee un cuento digital junto a su abuela. En la historia, un personaje recibe este mensaje: “Te regalo un dibujo. Dime tu nombre completo y en qué escuela estudias”.",
      "question": "¿Qué podría hacer el personaje?",
      "choices": [
        {
          "label": "Contar sus datos para recibir el dibujo.",
          "feedback": "Un regalo no es razón para entregar información personal. Puede detenerse y pedir ayuda.",
          "preferred": false
        },
        {
          "label": "No responder y mostrar el mensaje a una persona adulta.",
          "feedback": "Detenerse y contarlo permite que una persona adulta revise la situación sin entregar datos.",
          "preferred": true
        },
        {
          "label": "Preguntar si el dibujo es bonito.",
          "feedback": "Seguir la conversación no aclara por qué le piden esos datos. Lo importante es buscar ayuda.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "Para recibir un dibujo no necesitan saber su escuela ni su nombre completo.",
      "Que un mensaje parezca amable no significa que haya que responder.",
      "Puede cerrar el mensaje y decir: “Me pidieron mis datos; ayúdame a revisarlo”."
    ],
    "second": {
      "story": "En otro ejemplo, una ventana pide una fotografía con el uniforme para entregar una estrella. Leo todavía no ha tocado ningún botón.",
      "question": "¿Qué decisión cuida mejor su información?",
      "choices": [
        {
          "label": "Tomar la foto antes de que desaparezca la estrella.",
          "feedback": "La prisa no vuelve necesaria la foto. No hace falta enviar una imagen para terminar esta actividad.",
          "preferred": false
        },
        {
          "label": "Cerrar la ventana y contarlo a la persona adulta que lo acompaña.",
          "feedback": "Una foto también puede mostrar información. La persona adulta revisa la solicitud; Leo no tiene que resolverla solo.",
          "preferred": true
        },
        {
          "label": "Enviar la foto de otro niño.",
          "feedback": "También cuidamos la información de otras personas. No enviamos su imagen para conseguir un premio.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Decir en voz alta: “Me pidieron información y necesito ayuda”.",
      "Señalar qué información pidió el mensaje del cuento."
    ],
    "evidence": "Identifica un dato solicitado en el caso y practica una frase para pedir ayuda, sin decir datos reales.",
    "family": [
      "Lee el caso con la niña o el niño; no le pidas su nombre completo ni su escuela.",
      "Pregunta: “¿Qué le pidió el mensaje? ¿A quién podría contarlo?”. Escucha antes de corregir.",
      "Practiquen una frase de ayuda y acuerden quién puede acompañar. Si algo ya ocurrió, escucha sin culpabilizar."
    ],
    "teacher": [
      "Presenta el caso en voz alta, impreso o proyectado; no pidas celulares ni cuentas.",
      "Haz que identifiquen la solicitud y representen cómo pedir ayuda con personajes ficticios.",
      "Observa si distinguen el dato y pueden solicitar apoyo; no recojas datos familiares como evidencia."
    ],
    "risks": [
      "contacto",
      "datos"
    ],
    "band": "pb"
  },
  "datos-pa": {
    "title": "Tu cinturón de seguridad digital",
    "subtitle": "No todos los permisos tienen sentido",
    "duration": "10–12 min",
    "objective": "Explicar cuándo una solicitud de datos no corresponde con el propósito de una actividad.",
    "first": {
      "story": "En una tarjeta ficticia, una aplicación para dibujar figuras pide nombre completo, ubicación y acceso a los contactos. No es necesario instalarla: el grupo sólo analiza lo escrito.",
      "question": "¿Qué conviene revisar primero?",
      "choices": [
        {
          "label": "Si el botón de aceptar es fácil de encontrar.",
          "feedback": "La comodidad no explica para qué se usarán los datos. Antes de aceptar hay que revisar la finalidad.",
          "preferred": false
        },
        {
          "label": "Para qué necesita esos datos y si hay una alternativa que no los pida.",
          "feedback": "Relacionar la finalidad con los datos ayuda a reconocer solicitudes excesivas. Revisarlo no obliga a aceptar.",
          "preferred": true
        },
        {
          "label": "Si todos los demás aceptarían.",
          "feedback": "Lo que hagan otras personas no demuestra que el permiso sea necesario.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "El propósito es dibujar figuras; no necesita conocer a los contactos del teléfono.",
      "Una fotografía puede revelar uniforme, ubicación o rutinas aunque no escribamos esos datos.",
      "Si una condición no se entiende, se puede detener la actividad y revisarla con una persona adulta."
    ],
    "second": {
      "story": "Un personaje quiere responder a un supuesto concurso de dibujo. Le piden una foto frente a la puerta de su casa, con el número visible. Dice: “No escribí mi dirección, así que no doy datos”.",
      "question": "¿Qué explicación le darías?",
      "choices": [
        {
          "label": "La foto también puede revelar dónde vive; conviene no enviarla y consultar.",
          "feedback": "La información puede estar en una imagen. Identificarla antes de compartir permite elegir otra forma de participar.",
          "preferred": true
        },
        {
          "label": "Que basta con borrar su nombre del mensaje.",
          "feedback": "Quitar el nombre no elimina el número de la casa ni otras pistas de la fotografía.",
          "preferred": false
        },
        {
          "label": "Que utilice una foto de la casa de otra persona.",
          "feedback": "Cambiar de persona no resuelve la exposición. También protegemos los datos ajenos.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Explicar qué permiso del caso no corresponde con dibujar.",
      "Proponer una alternativa al concurso que no use fotografías de casas."
    ],
    "evidence": "Relaciona una solicitud con su finalidad y justifica qué dato no entregaría en el caso ficticio.",
    "family": [
      "Usen la tarjeta del caso, no la cuenta ni el teléfono del menor.",
      "Pídele explicar qué solicita la aplicación y para qué. Revisen juntos su razonamiento.",
      "Acordar consultar antes de nuevos permisos no significa vigilar todas sus decisiones. Mantén una persona de apoyo identificada."
    ],
    "teacher": [
      "Proyecta o lee la solicitud ficticia y separa en el pizarrón “propósito” y “datos pedidos”.",
      "En parejas, argumenten qué permisos no corresponden y propongan una alternativa.",
      "Valora la explicación, no sólo la opción elegida. No pidas perfiles ni fotografías reales."
    ],
    "risks": [
      "contenido",
      "datos",
      "contacto"
    ],
    "band": "pa"
  },
  "datos-sec": {
    "title": "Tu cinturón de seguridad digital",
    "subtitle": "Una solicitud convincente también se revisa",
    "duration": "10–12 min",
    "objective": "Reconocer una solicitud no verificada y elegir una respuesta que no exponga más información.",
    "first": {
      "story": "En un caso ficticio, Alex recibe un mensaje con el logotipo de una actividad escolar. Promete un reconocimiento si envía una foto de su credencial y el código que llegó a su teléfono.",
      "question": "¿Cómo puede verificar sin entregar información?",
      "choices": [
        {
          "label": "Enviar primero el código y preguntar después.",
          "feedback": "El código puede dar acceso a una cuenta. Verificar después no revierte la entrega.",
          "preferred": false
        },
        {
          "label": "Consultar por un canal de la escuela que ya conoce, sin usar el enlace del mensaje.",
          "feedback": "Un logotipo no confirma quién escribe. Un canal conocido permite comprobar la solicitud sin entregar el código.",
          "preferred": true
        },
        {
          "label": "Reenviar el mensaje a todo el grupo.",
          "feedback": "Compartirlo puede extender el riesgo y no verifica su origen. Puede pedir apoyo sin difundirlo masivamente.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "La urgencia o el uso de un logotipo no acreditan la identidad.",
      "Una credencial puede contener varios datos personales; un código de acceso no se comparte.",
      "Se puede consultar a una persona adulta o responsable escolar por un canal ya conocido."
    ],
    "second": {
      "story": "Alex ya respondió con un dato y ahora recibe más solicitudes. Le da vergüenza contarlo porque piensa que lo van a regañar.",
      "question": "¿Qué conviene hacer ahora?",
      "choices": [
        {
          "label": "Seguir respondiendo para terminar cuanto antes.",
          "feedback": "Eso puede aumentar la exposición. Es posible detenerse aunque ya se haya respondido.",
          "preferred": false
        },
        {
          "label": "Detener el intercambio y pedir apoyo para proteger la información y revisar la cuenta afectada.",
          "feedback": "Pedir apoyo no implica culpa. La persona adulta o responsable puede acompañar los pasos de protección necesarios.",
          "preferred": true
        },
        {
          "label": "Publicar la conversación con todos sus datos.",
          "feedback": "Publicarla puede exponer más información. La ayuda debe buscarse sin difundir datos personales.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Explicar un modo de verificar sin utilizar el enlace del caso.",
      "Ensayar cómo pedir apoyo después de haber respondido por error."
    ],
    "evidence": "Identifica dos señales de la solicitud y propone cómo verificar y pedir ayuda sin ampliar la exposición.",
    "family": [
      "Analicen este ejemplo, sin revisar conversaciones privadas ni solicitar códigos reales.",
      "Escucha qué haría y conversen sobre cómo pedir apoyo incluso después de equivocarse.",
      "Definan un canal de consulta conocido y revisen sólo lo necesario, con participación del adolescente."
    ],
    "teacher": [
      "Presenta el mensaje como caso preparado; no lo envíes a cuentas del alumnado para sorprenderlo.",
      "Distingan identidad aparente, datos solicitados y canal independiente de verificación.",
      "Solicita una explicación sobre el caso, no una captura de cuentas personales; señala al responsable escolar de apoyo."
    ],
    "risks": [
      "contenido",
      "contacto",
      "datos"
    ],
    "band": "sec"
  },
  "juego-pb": {
    "title": "Jugar en línea también requiere acuerdos",
    "subtitle": "El regalo que no era necesario aceptar",
    "duration": "8–10 min",
    "objective": "Identificar cuándo detenerse y consultar ante mensajes o compras dentro de un juego.",
    "first": {
      "story": "Nora y su papá miran una tarjeta de un juego inventado. En ella aparece: “Te regalo monedas si me mandas una foto”. No están jugando en línea: sólo leen el ejemplo.",
      "question": "¿Qué puede hacer Nora?",
      "choices": [
        {
          "label": "Enviar una foto para recibir las monedas.",
          "feedback": "Un regalo no obliga a enviar una imagen. Nora puede detenerse y pedir ayuda.",
          "preferred": false
        },
        {
          "label": "No responder y contarle a su papá qué pidió el mensaje.",
          "feedback": "La persona adulta revisa la situación. No hace falta conversar con quien ofrece el regalo.",
          "preferred": true
        },
        {
          "label": "Enviar una foto de su hermana.",
          "feedback": "La imagen de otra persona también necesita protección. No es una alternativa para conseguir monedas.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "Un mensaje dentro de un juego puede pedir cosas que no corresponden.",
      "Un objeto virtual puede costar dinero real.",
      "Elegir juegos, revisar funciones y autorizar compras requiere intervención adulta."
    ],
    "second": {
      "story": "Otra tarjeta dice: “Cinco monedas por 20 pesos. Toca aquí para pagar”. Nora quiere probar, pero no sabe qué significa el precio.",
      "question": "¿Qué decisión puede practicar?",
      "choices": [
        {
          "label": "Tocar para ver si el pago funciona.",
          "feedback": "Probar un botón de compra puede generar un cobro. No se necesita pagar para aprender con este caso.",
          "preferred": false
        },
        {
          "label": "Preguntar qué significa y aceptar que pueden decidir no comprar.",
          "feedback": "Consultar ayuda a entender el costo. La persona adulta puede decidir que no conviene comprar o utilizar ese juego.",
          "preferred": true
        },
        {
          "label": "Buscar la tarjeta de alguien sin preguntarle.",
          "feedback": "Usar una tarjeta requiere autorización; no corresponde buscarla ni introducirla por cuenta propia.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Representar cómo pedir ayuda ante el mensaje del regalo.",
      "Explicar que una moneda del juego puede costar pesos."
    ],
    "evidence": "Reconoce una solicitud que debe detener y señala qué decisión corresponde a la persona adulta.",
    "family": [
      "Lean las tarjetas; no abran un juego ni una tienda de aplicaciones.",
      "Explícale el costo del ejemplo sin pedir una tarjeta bancaria ni hacer una compra de prueba.",
      "Acuerden cómo pedir ayuda. Si un juego no es adecuado, limitarlo o descartarlo puede ser necesario y debe explicarse."
    ],
    "teacher": [
      "Lee las tarjetas o imprímelas; no pidas descargar un juego.",
      "Representen quién solicita ayuda y quién revisa la situación, sin actuar como personas desconocidas reales.",
      "Cierra con la frase de ayuda y la diferencia entre monedas virtuales y dinero real."
    ],
    "risks": [
      "contacto",
      "datos",
      "conducta"
    ],
    "band": "pb"
  },
  "juego-pa": {
    "title": "Jugar en línea también requiere acuerdos",
    "subtitle": "Antes del premio, revisa las condiciones",
    "duration": "10–12 min",
    "objective": "Identificar presión, costo y solicitudes de datos en una oferta ficticia y proponer acuerdos de protección.",
    "first": {
      "story": "El grupo analiza una oferta inventada: “Premio por tiempo limitado. Para recibirlo, comparte tu contraseña y continúa la conversación fuera del juego”.",
      "question": "¿Qué señales justifican detenerse?",
      "choices": [
        {
          "label": "Pide una contraseña, impone prisa y cambia el lugar de conversación.",
          "feedback": "Las tres señales merecen atención. No es necesario cumplir la petición para comprobar que es problemática.",
          "preferred": true
        },
        {
          "label": "Sólo el color del botón de premio.",
          "feedback": "El aspecto del botón no es lo principal. Lo importante es la información y la interacción que solicita.",
          "preferred": false
        },
        {
          "label": "Ninguna: si promete un premio, conviene intentarlo.",
          "feedback": "Un premio no demuestra que la oferta sea confiable. Se puede rechazar y pedir ayuda.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "Las contraseñas no se entregan a contactos ni a ofertas de premios.",
      "La moneda virtual y las suscripciones pueden implicar cobros reales.",
      "Un acuerdo puede incluir no comprar, desactivar funciones o no usar un juego que no sea adecuado."
    ],
    "second": {
      "story": "Una tarjeta de ejemplo ofrece una suscripción de 50 pesos al mes. El personaje dice: “Sólo pagaré 50 pesos una vez”. Otra persona le insiste en comprar para seguir en el equipo.",
      "question": "¿Cómo responderías?",
      "choices": [
        {
          "label": "Comprar para no perder al equipo.",
          "feedback": "La presión de grupo no aclara el costo ni vuelve necesaria la compra.",
          "preferred": false
        },
        {
          "label": "Revisar que el cobro se repite y conversar con una persona adulta antes de decidir.",
          "feedback": "“Al mes” indica una condición importante. Comprenderla y poder decir que no forma parte del acuerdo.",
          "preferred": true
        },
        {
          "label": "Pedir a otro integrante que pague usando su cuenta.",
          "feedback": "Trasladar la compra a otra persona no resuelve el permiso ni el costo recurrente.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Proponer un acuerdo para rechazar premios que piden contraseñas.",
      "Explicar el costo mensual y una alternativa sin compra."
    ],
    "evidence": "Explica dos señales de riesgo y propone un acuerdo que incluya la posibilidad de no utilizar o no comprar.",
    "family": [
      "No hace falta revisar un perfil real: usen los ejemplos de esta actividad.",
      "Pide que explique la oferta y conversen sobre costos, chats y presión de grupo.",
      "La adecuación por edad y funciones se revisa antes de elegir un juego. Acordar no usarlo puede ser una medida de protección."
    ],
    "teacher": [
      "Presenta la oferta ficticia como un texto para analizar; nunca pruebes la suplantación con el grupo.",
      "Distingan petición, costo y presión. Cada equipo propone un acuerdo y explica a quién protege.",
      "Valora la justificación y recuerda que enseñar sobre juegos no implica autorizar su uso escolar."
    ],
    "risks": [
      "contenido",
      "contacto",
      "conducta",
      "datos"
    ],
    "band": "pa"
  },
  "fomo-sec": {
    "title": "¿Te estás perdiendo de algo… o sólo lo parece?",
    "subtitle": "Pertenecer sin estar pendiente de todo",
    "duration": "10–12 min",
    "objective": "Distinguir un hecho de una interpretación y proponer una respuesta que cuide el descanso y la convivencia.",
    "first": {
      "story": "Durante una conversación en la escuela, Dani ve una imagen preparada para este caso: varias personas se reunieron el fin de semana. Dani no asistió y piensa: “Ya no quieren estar conmigo”. No hace falta tener redes sociales para analizarlo.",
      "question": "¿Qué ayuda a entender lo ocurrido?",
      "choices": [
        {
          "label": "Dar por seguro que ya no le quieren.",
          "feedback": "La imagen sólo muestra un momento. Esa conclusión necesita más contexto y no invalida lo que Dani siente.",
          "preferred": false
        },
        {
          "label": "Nombrar lo que siente y distinguir lo que sabe de lo que está suponiendo.",
          "feedback": "Puede sentirse triste y, a la vez, reconocer que no sabe toda la historia. Hablar con alguien ayuda a aclararla.",
          "preferred": true
        },
        {
          "label": "Burlarse de otra persona para sentirse parte del grupo.",
          "feedback": "Lastimar a otra persona no resuelve la necesidad de pertenecer. Se puede buscar conversación y apoyo.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "FOMO es el temor a perderse lo que otras personas hacen; puede aparecer incluso sin una cuenta propia.",
      "Una imagen no cuenta todo lo que ocurre en una relación.",
      "Pertenecer no exige responder a cualquier hora ni compartir datos o imágenes por presión."
    ],
    "second": {
      "story": "En un caso distinto, un grupo dice que quien no esté pendiente de los mensajes por la noche quedará fuera de una actividad. Dani necesita descansar y le preocupa perder amistades.",
      "question": "¿Qué respuesta combina un límite con una vía de apoyo?",
      "choices": [
        {
          "label": "Mantenerse despierto para no perder ningún mensaje.",
          "feedback": "Estar pendiente toda la noche no resuelve la presión. Dani tiene derecho a descansar y puede pedir apoyo.",
          "preferred": false
        },
        {
          "label": "Explicar que descansará y buscar apoyo si la presión o la exclusión continúan.",
          "feedback": "Puede proponer una forma de organizarse que no exija conexión nocturna. Si hay daño o amenazas, no tiene que resolverlo solo.",
          "preferred": true
        },
        {
          "label": "Reenviar una imagen privada para que lo acepten.",
          "feedback": "El consentimiento y la privacidad no se intercambian por pertenencia. No corresponde difundir una imagen para entrar al grupo.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Separar un hecho y una suposición del primer caso.",
      "Ensayar una frase para poner un límite sin agredir."
    ],
    "evidence": "Distingue un hecho de una interpretación y propone un límite con una persona o instancia de apoyo.",
    "family": [
      "Analicen a Dani; no pidas mostrar cuentas ni comprobar públicamente qué amistades tiene.",
      "Escucha la emoción sin minimizarla. Pregunta qué sabe y qué está imaginando sobre el caso.",
      "Acuerden cómo cuidar el descanso y a quién acudir ante presión o exclusión que cause daño. No hace falta abrir una cuenta."
    ],
    "teacher": [
      "Usa el caso ficticio sin pedir testimonios del grupo ni exhibir publicaciones reales.",
      "Separen hechos, interpretaciones y emociones. Practiquen una frase de límite en parejas.",
      "Señala la ruta escolar de apoyo. Una actividad formativa no sustituye la atención de una situación real."
    ],
    "risks": [
      "contenido",
      "contacto",
      "conducta",
      "datos"
    ],
    "band": "sec"
  },
  "fomo-ems": {
    "title": "¿Te estás perdiendo de algo… o sólo lo parece?",
    "subtitle": "Decidir sin la presión de estar siempre disponible",
    "duration": "12–15 min",
    "objective": "Analizar la presión de disponibilidad y justificar acuerdos que cuiden privacidad, descanso y participación.",
    "first": {
      "story": "En un caso ficticio de media superior, un equipo organiza una actividad. Una persona exige respuestas de inmediato y pide compartir la ubicación todo el día como “prueba de compromiso”. No se utiliza ninguna cuenta real.",
      "question": "¿Qué acuerdo permite participar sin entregar información innecesaria?",
      "choices": [
        {
          "label": "Compartir la ubicación todo el día para demostrar interés.",
          "feedback": "El interés no necesita probarse mediante seguimiento permanente. Es posible acordar información y horarios proporcionados.",
          "preferred": false
        },
        {
          "label": "Acordar horarios, un canal permitido y la información mínima necesaria para la actividad.",
          "feedback": "El acuerdo relaciona la coordinación con su propósito. No confunde disponibilidad permanente con compromiso.",
          "preferred": true
        },
        {
          "label": "Excluir a quien no pueda conectarse siempre.",
          "feedback": "La participación no debería depender de conexión permanente ni de ceder privacidad.",
          "preferred": false
        }
      ]
    },
    "clues": [
      "FOMO nombra el temor a perderse algo; no obliga a ceder privacidad ni a estar disponible siempre.",
      "La necesidad de coordinarse no justifica pedir cualquier dato o imponer conexión continua.",
      "Un acuerdo útil explica para qué, cuándo, qué información se usa y qué alternativa tiene quien no puede conectarse."
    ],
    "second": {
      "story": "Una persona del equipo se retira del chat para descansar. Al día siguiente alguien difunde una captura privada para ridiculizarla. Otra persona propone “arreglarlo” compartiendo más capturas.",
      "question": "¿Cuál sería una respuesta responsable?",
      "choices": [
        {
          "label": "No redistribuir, acompañar a la persona afectada y buscar la intervención institucional que corresponda.",
          "feedback": "Se evita ampliar la exposición y se reconoce que la protección puede necesitar apoyo institucional. No se reduce todo a una discusión entre pares.",
          "preferred": true
        },
        {
          "label": "Compartir más capturas para equilibrar las burlas.",
          "feedback": "Aumentar la difusión amplifica el daño y no repara la privacidad.",
          "preferred": false
        },
        {
          "label": "Culpar a quien dejó de responder.",
          "feedback": "Poner un límite no justifica la humillación. La responsabilidad del daño no se traslada a quien descansó.",
          "preferred": false
        }
      ]
    },
    "practice": [
      "Redactar oralmente un acuerdo con finalidad, horario y alternativa sin conexión.",
      "Justificar cómo apoyar sin redistribuir la captura del caso."
    ],
    "evidence": "Justifica un acuerdo proporcionado y diferencia una medida preventiva de una respuesta institucional de protección.",
    "family": [
      "Conversen sobre el caso, no exijas acceso permanente a cuentas personales.",
      "Pide que justifique un acuerdo de disponibilidad y privacidad. Mantén espacio para que proponga alternativas.",
      "Definan en qué situaciones se requiere apoyo adulto o institucional, sin castigar la búsqueda de ayuda."
    ],
    "teacher": [
      "Presenta el caso en el marco de las condiciones de uso del plantel; no exijas cuentas sociales para organizar el trabajo.",
      "Solicita un acuerdo con finalidad, horarios, datos mínimos y alternativa para quien no puede conectarse.",
      "Evalúa argumentos y diferencia prevención de atención. Si se revela un caso real, evita exponerlo y sigue la ruta institucional."
    ],
    "risks": [
      "contenido",
      "contacto",
      "conducta",
      "datos"
    ],
    "band": "ems"
  }
};
const option = (profile:StageProfile,stage:string,label:string,band:Band,alternativeBand?:Band):StageOption => ({profile,stage,label,band,alternativeBand});
const PRIMARY = [option('kids','primaria-baja','Primaria baja','pb'),option('kids','primaria-alta','Primaria alta','pa'),option('families','fam-6-11','6 - 11 años','pb','pa'),option('teachers','doc-pb','Primaria baja','pb'),option('teachers','doc-pa','Primaria alta','pa')];
export const DELIVERY_OPTIONS: Record<string,StageOption[]> = {
 'ciberseguridad-familiar':[...PRIMARY,option('families','fam-12-14','12 - 14 años','sec'),option('teens','secundaria','Secundaria','sec'),option('teachers','doc-sec','Secundaria','sec')],
 'roblox-seguridad':PRIMARY,
 'fomo':[option('teens','secundaria','Secundaria','sec'),option('teens','preparatoria','Media superior','ems'),option('families','fam-12-14','12 - 14 años','sec'),option('families','fam-15-17','15 - 17 años','ems'),option('teachers','doc-sec','Secundaria','sec'),option('teachers','doc-prep','Media superior','ems')]
};
export const DELIVERY_TITLES: Record<string,string> = {'ciberseguridad-familiar':'Tu cinturón de seguridad digital','roblox-seguridad':'Jugar en línea también requiere acuerdos','fomo':'¿Te estás perdiendo de algo… o sólo lo parece?'};
export const DELIVERY_TOPICS: Record<string,'security'|'consumer'|'wellbeing'> = {'ciberseguridad-familiar':'security','roblox-seguridad':'consumer','fomo':'wellbeing'};
export const isStageExperience = (slug:string):boolean => Object.prototype.hasOwnProperty.call(DELIVERY_OPTIONS,slug);
export function resolveStageDelivery(slug:string,profile:string|null,stage:string|null,context:string|null,focus:string|null):StageDelivery|null {
 if (!isStageExperience(slug)) return null;
 const selected = DELIVERY_OPTIONS[slug].find(o=>o.profile===profile && o.stage===stage);
 if (!selected) return null; // An absent/invalid stage is a neutral chooser, never an access permission.
 const band:Band = selected.alternativeBand && focus===selected.alternativeBand ? selected.alternativeBand : selected.band;
 const prefix = slug==='ciberseguridad-familiar'?'datos':slug==='roblox-seguridad'?'juego':'fomo';
 const lesson=STAGE_LESSONS[prefix+'-'+band];
 if (!lesson) return null;
 const place:UseContext=context==='escuela'?'escuela':context==='casa'?'casa':profile==='teachers'?'escuela':'casa';
 return {slug,option:{...selected,band},lesson,context:place,key:[slug,profile,stage,band,place].join(':')};
}
// Editorial coverage is not a certificate of institutional/legal approval or evidence of learner mastery.
export const DELIVERY_REVIEW = { date:'2026-09-22', editorial:'casos redactados y revisados para esta entrega', userTesting:'pendiente de observación con alumnado', legalApproval:'no constituye un protocolo ni autorización institucional', audiovisual:'los videos originales no forman parte de estas variantes; requieren revisión audiovisual antes de reincorporarse', sources:['https://www.esafety.gov.au/educators/best-practice-framework','/pantallas-seguras#redes-sociales'] };
