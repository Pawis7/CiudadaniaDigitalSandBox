import { AudienceSlug } from '../core/models/content.models';
export interface GuidanceItem { title:string; summary:string; watch?:string; action?:string; }
export interface GuidanceBlock { eyebrow:string; title:string; intro:string; items:GuidanceItem[]; accompaniment?: { title: string; text: string }; }

const KIDS_PRE:GuidanceBlock={eyebrow:'Antes de empezar',title:'Para acompañar esta etapa',intro:'En preescolar, niñas y niños aprenden acompañados. Una persona adulta les ayuda a elegir qué ver y qué hacer, y les enseña que si algo les asusta, les confunde o no lo entienden, pueden parar y contarlo.',items:[{title:'Lo que siente también importa',summary:'Una pantalla, un video o un mensaje puede provocar alegría, miedo, enojo o confusión.',watch:'Si algo le incomoda, no minimices lo que siente.',action:'Ayúdale a nombrar la emoción y practicar: cierro, me alejo y cuento.'},{title:'Hay cosas que se cuidan',summary:'Nombre completo, fotos, voz, ubicación y datos familiares no deben compartirse sin acompañamiento.',watch:'A esta edad no corresponde que decida solo qué información entregar.',action:'Usen ejemplos sencillos de cosas que sí puede contar y cosas que primero debe consultar.'},{title:'Pedir ayuda es parte de aprender',summary:'La meta no es que resuelva solo una situación digital, sino que reconozca cuándo necesita a una persona adulta.',action:'Repitan una regla fácil: si algo me asusta, me pide un secreto o no lo entiendo, lo cuento.'},{title:'Pantalla, juego y descanso',summary:'La tecnología es una actividad más dentro del día; no necesita ocupar todos los momentos.',action:'Alternen pantalla con juego físico, conversación, sueño y actividades sin dispositivo.'}]};
const KIDS_LOW:GuidanceBlock={eyebrow:'Lo importante para ti',title:'Antes de jugar o compartir en línea',intro:'En primaria baja empiezan a tomar decisiones sencillas, siempre con una persona adulta disponible. La meta es aprender a detenerse, preguntar y pedir ayuda cuando algo no está claro.',items:[{title:'Mis datos son importantes',summary:'Tu nombre completo, dirección, escuela, contraseñas, fotos y ubicación pueden decir mucho sobre ti.',action:'Antes de compartir un dato, pregunta a una persona adulta de confianza.'},{title:'No todas las personas en línea son conocidas',summary:'Un avatar o un nombre de usuario no demuestra quién está detrás de una cuenta.',watch:'Desconfía si alguien pide secretos, datos, fotos o quiere llevar la conversación a otro lugar.',action:'No respondas, sal de la conversación y cuéntalo.'},{title:'Jugar en línea también necesita acuerdos',summary:'Chats, amistades y compras dentro de los juegos son decisiones reales.',action:'Las compras y cambios de privacidad se revisan con una persona adulta.'},{title:'Ser amable también cuenta en internet',summary:'Lo que escribimos, enviamos o compartimos puede hacer sentir bien o mal a otras personas.',action:'Si algo lastima, no lo reenvíes y busca ayuda.'}]};
const KIDS_HIGH:GuidanceBlock={eyebrow:'Lo importante para ti',title:'Más autonomía, mejores decisiones',intro:'En primaria alta crece la autonomía. Antes de compartir, aceptar, comprar o responder, conviene detenerse, revisar qué se está pidiendo y buscar apoyo cuando algo no está claro.',items:[{title:'Privacidad y cuentas',summary:'Configurar quién puede verte, escribirte o conocer tus datos reduce exposiciones innecesarias.',action:'Revisa privacidad y usa contraseñas diferentes; pide apoyo cuando una configuración no sea clara.'},{title:'Videojuegos, chats y compras',summary:'Las monedas virtuales, premios y ofertas pueden involucrar dinero real o intentos de engaño.',watch:'Urgencia, premios demasiado buenos y solicitudes de contraseña son señales de alerta.',action:'Pausa antes de comprar, abrir enlaces o aceptar contactos.'},{title:'Lo popular no siempre es confiable',summary:'Influencers, retos y publicaciones pueden mezclar entretenimiento, publicidad, presión y datos falsos.',action:'Pregúntate quién lo publica, para qué y qué evidencia ofrece.'},{title:'Convivencia y presión de grupo',summary:'Participar en una broma, reenviar una imagen o sumarse a un reto también tiene consecuencias.',action:'Antes de compartir, piensa si es seguro, respetuoso y si la otra persona estaría de acuerdo.'}]};

const TEENS:GuidanceBlock={eyebrow:'Lo importante para tu vida digital',title:'Palabras que vas a escuchar y conviene entender',intro:'Tener más autonomía también implica saber cuándo pedir apoyo. Comprender estas situaciones ayuda a verificar información, poner límites y tomar decisiones sin tener que resolver a solas algo que presiona, amenaza o pone en riesgo.',items:[
 {title:'Phishing: cuando intentan engañarte para robar tus datos',summary:'Es un mensaje, correo o página que se hace pasar por alguien confiable para que entregues una contraseña, código, dato bancario o abras un enlace. Ejemplo: “Tu cuenta será bloqueada hoy. Entra aquí y confirma tu contraseña”.',watch:'Mensajes con mucha urgencia, premios inesperados, direcciones extrañas o solicitudes de códigos y contraseñas.',action:'No abras el enlace. Entra tú mismo a la app o sitio oficial y verifica. Nunca compartas códigos de acceso.'},
 {title:'Sexting: compartir contenido íntimo por medios digitales',summary:'Es enviar o intercambiar mensajes, fotos o videos íntimos. Puede existir entre personas que están de acuerdo, pero una imagen puede guardarse, copiarse o difundirse fuera del contexto original. Ejemplo: alguien con quien sales te pide una foto íntima y te dice que “si confías, se la mandas”.',watch:'Presión, chantaje, insistencia o cualquier difusión sin permiso.',action:'No tienes que enviar nada para demostrar confianza. Si una imagen tuya se comparte sin permiso, no la reenvíes para “comprobarlo”; guarda la información necesaria, pide apoyo a una persona de confianza y reporta la difusión.'},
 {title:'Grooming: cuando un adulto busca ganarse la confianza de un menor con fines sexuales',summary:'Puede empezar como una conversación amistosa: comparte gustos, ofrece regalos o hace sentir especial a la persona. Después puede pedir secretos, fotos íntimas, videollamadas o encuentros.',watch:'Pedir que ocultes la conversación, mover el chat a un espacio privado, regalos, preguntas sexuales o amenazas para que no cuentes nada.',action:'Corta el contacto, no envíes más contenido, conserva evidencia si es seguro hacerlo, bloquea y cuéntaselo a una persona adulta de confianza.'},
 {title:'Ciberacoso: cuando el daño también ocurre por pantallas',summary:'Son agresiones, humillaciones, amenazas o exclusión mediante chats, redes, videojuegos u otros espacios digitales. Ejemplo: crear un grupo para burlarse de alguien o compartir una foto para ridiculizarlo.',watch:'Cuando la conducta se repite, se amplifica al compartirla o hace que alguien tenga miedo de conectarse o asistir a la escuela.',action:'No respondas con otra agresión ni ayudes a difundirla. Guarda evidencia, bloquea o reporta y busca apoyo.'},
 {title:'Huella digital: lo que va quedando de tu actividad en línea',summary:'Publicaciones, comentarios, perfiles, fotos y registros pueden permanecer o circular aunque después los borres. No significa que debas tener miedo de publicar, sino pensar en contexto y audiencia.',action:'Antes de publicar pregúntate: ¿estoy de acuerdo con que esto salga de este chat o llegue a otra persona?'},
 {title:'Deepfake y contenido generado con IA',summary:'La IA puede crear o modificar imágenes, voces y videos para que parezca que una persona dijo o hizo algo que nunca ocurrió. Un video muy realista ya no es prueba suficiente por sí solo.',watch:'Contenido sorprendente sin fuente clara, cuentas que lo publican sin contexto o imágenes y audios usados para presionar o engañar.',action:'Busca la fuente original, contrasta con otras fuentes y no compartas solo porque parece real.'}
]};

const FAMILIES_EARLY:GuidanceBlock={eyebrow:'Para acompañar de 0 a 5 años',title:'Presencia adulta antes que autonomía digital',intro:'Presencia antes que autonomía. En primera infancia, elegir el contenido, acompañar la experiencia y cerrar juntos corresponde principalmente a la persona adulta.',items:[
 {title:'La pantalla no sustituye la compañía',summary:'A esta edad aprenden principalmente al hablar, jugar, moverse y relacionarse con otras personas.',watch:'Que la pantalla desplace sueño, comida, juego físico, conversación o calma sin dispositivo.',action:'Permanece cerca, comenta lo que ocurre y conecta el contenido con una actividad fuera de la pantalla.'},
 {title:'Elegir antes de entregar el dispositivo',summary:'La persona adulta decide qué contenido se abre, durante cuánto tiempo y qué funciones quedan disponibles.',action:'Usa contenido breve y apropiado para su edad; desactiva reproducción automática, compras y notificaciones cuando sea posible.'},
 {title:'Fotos, voz y datos se cuidan',summary:'Niñas y niños pequeños todavía no pueden dimensionar quién verá una foto, un audio o su ubicación.',action:'Pregunta antes de fotografiar y evita publicar rutinas, uniforme, escuela, ubicación o datos que permitan identificarles.'},
 {title:'Una salida sencilla cuando algo incomoda',summary:'No necesitan resolver solos una situación digital.',action:'Practiquen una regla corta: cierro, me alejo y lo cuento a una persona adulta.'}
]};

const FAMILIES_CHILDHOOD:GuidanceBlock={eyebrow:'Para acompañar de 6 a 11 años',title:'Acuerdos claros mientras crece su autonomía',intro:'Acompaña sus primeras decisiones. No se trata de resolver todo por ellos, sino de enseñarles cuándo detenerse, preguntar y pedir ayuda sin trasladarles toda la responsabilidad.',items:[
 {title:'Datos personales y privacidad',summary:'Nombre completo, escuela, ubicación, contraseñas, fotos y voz pueden identificar a una persona.',action:'Revisen juntos qué datos no se comparten y a quién acudir si una aplicación o persona los solicita.'},
 {title:'Personas desconocidas en juegos y chats',summary:'Un avatar o nombre de usuario no permite saber quién está detrás de una cuenta.',watch:'Peticiones de secretos, datos, regalos, fotografías o conversaciones en otra plataforma.',action:'Acuerden no responder, salir, bloquear cuando corresponda y contarlo sin miedo a perder el dispositivo.'},
 {title:'Compras y permisos',summary:'Monedas virtuales, cajas sorpresa y ofertas dentro de juegos pueden involucrar dinero real.',action:'Protege las compras con clave y establece que cualquier pago o cambio de privacidad se revisa en compañía.'},
 {title:'Acompañar sin convertir todo en castigo',summary:'Si pedir ayuda implica perder siempre el juego o el teléfono, es más probable que oculten lo ocurrido.',action:'Escucha primero, protege y después acuerden juntos el siguiente paso.'}
]};

const FAMILIES_EARLY_TEENS:GuidanceBlock={eyebrow:'Para acompañar de 12 a 14 años',title:'Escuchar, acordar y reconocer señales de riesgo',intro:'Más privacidad no significa menos acompañamiento. Escucha, acuerda límites y mantente disponible sin convertir cada situación en vigilancia o castigo.',items:[
 {title:'Privacidad, cuentas y engaños',summary:'Mensajes urgentes, premios y enlaces que imitan servicios reales pueden buscar contraseñas, códigos o dinero.',action:'Practiquen verificar desde la aplicación o sitio oficial y activar medidas de seguridad apropiadas para la cuenta.'},
 {title:'Presión para compartir imágenes',summary:'Nadie tiene que enviar contenido íntimo para demostrar confianza. Compartir una imagen ajena sin permiso amplifica el daño.',watch:'Chantaje, insistencia, miedo a revisar el teléfono o preocupación porque una imagen pueda circular.',action:'Escucha sin culpabilizar, no reenvíes el material y ayuda a reportar y buscar apoyo.'},
 {title:'Contacto manipulador',summary:'Una persona puede ganarse la confianza, ofrecer regalos o pedir secretos para aislar y presionar.',action:'Si existe una situación real, protege a la persona menor, conserva la información necesaria cuando sea seguro y sigue la ruta institucional o de autoridades.'},
 {title:'Ciberacoso y participación del grupo',summary:'Quien observa, reacciona o reenvía también puede aumentar el alcance del daño.',action:'Hablen de cómo no sumarse, guardar evidencia, reportar y acompañar a la persona afectada.'}
]};

const FAMILIES_LATE_TEENS:GuidanceBlock={eyebrow:'Para acompañar de 15 a 17 años',title:'Autonomía gradual con una red de apoyo disponible',intro:'La autonomía crece y la red de apoyo permanece. Conversen sobre decisiones, consecuencias y las situaciones en las que todavía se necesita intervención adulta.',items:[
 {title:'Privacidad e identidad digital',summary:'Publicaciones, cuentas y relaciones digitales forman parte de su vida personal y académica.',action:'Conversen sobre audiencias, permanencia y consentimiento sin exigir acceso permanente a sus cuentas.'},
 {title:'Fraudes, suplantación y contenido manipulado',summary:'Una voz, imagen o video convincente puede ser falso y usarse para pedir dinero, datos o acceso a una cuenta.',action:'Practiquen verificar por un segundo canal, revisar la fuente original y no actuar bajo presión.'},
 {title:'Consentimiento y difusión sin permiso',summary:'Presionar, amenazar o redistribuir contenido íntimo sin consentimiento es una forma de violencia digital.',action:'Escucha sin culpar, evita reenviar el material y acompaña la solicitud de ayuda que corresponda.'},
 {title:'Acompañar sin invadir',summary:'La confianza se fortalece cuando pueden pedir ayuda sin que la primera respuesta sea castigo o vigilancia total.',action:'Acuerden qué situaciones requieren intervención adulta y qué espacios personales se respetan.'}
]};

const FAMILIES_YOUNG_ADULTS:GuidanceBlock={eyebrow:'Para convivir y apoyar de 18 a 22 años',title:'Apoyo acordado entre personas adultas',intro:'Acompañar entre personas adultas significa ofrecer apoyo, no controlar. La familia puede escuchar, preguntar qué ayuda se necesita y respetar la privacidad y las decisiones personales.',items:[
 {title:'Privacidad y consentimiento',summary:'Revisar un teléfono, cuenta o conversación requiere permiso, incluso cuando comparten hogar.',action:'Pregunta qué apoyo desea la persona y acuerden de forma explícita cualquier intervención.'},
 {title:'Apoyo ante fraudes o suplantación',summary:'La familia puede ayudar a detener pagos, recuperar cuentas y documentar lo ocurrido sin apropiarse del problema.',action:'Ofrece acompañamiento, verifica por canales oficiales y deja que la persona participe en cada decisión.'},
 {title:'Contenido íntimo o violencia digital',summary:'La respuesta debe proteger la dignidad y las decisiones de la persona afectada.',action:'No reenvíes material, no culpabilices y pregunta antes de contactar a una institución o autoridad, salvo que exista un riesgo inmediato.'},
 {title:'Acuerdos de convivencia digital',summary:'Horarios, gastos, fotografías familiares y uso de dispositivos en espacios comunes pueden conversarse sin imponer vigilancia.',action:'Construyan acuerdos recíprocos que apliquen a todas las personas adultas del hogar.'}
]};

const TEACHERS_PRE:GuidanceBlock={eyebrow:'Preescolar',title:'Ciudadanía digital desde el cuidado cotidiano',intro:'La mediación es parte de la actividad. En preescolar no se espera que niñas y niños naveguen o resuelvan situaciones digitales por sí solos; se trabajan hábitos, emociones, permiso y búsqueda de ayuda.',items:[
 {title:'Experiencias breves y acompañadas',summary:'La pantalla funciona mejor cuando tiene un propósito claro y una persona adulta conversa durante la actividad.',action:'Anticipa qué harán, acompaña la experiencia y ciérrala con juego, dibujo o conversación.'},
 {title:'Nombrar emociones',summary:'Un video, sonido o imagen puede provocar alegría, miedo, enojo o confusión.',action:'Ayuda a nombrar lo que sienten y practica: paro, me alejo y lo cuento.'},
 {title:'Pedir permiso para fotografiar',summary:'El consentimiento puede iniciarse con una pregunta concreta antes de tomar o mostrar una foto.',action:'Modela la pregunta “¿puedo tomar o enseñar esta foto?” y respeta la respuesta.'},
 {title:'Observar y comunicar',summary:'Si aparece un contenido inadecuado o una revelación, corresponde intervenir a las personas adultas.',action:'No interrogues al grupo ni expongas el caso; registra lo indispensable y sigue el protocolo escolar.'}
]};

const TEACHERS_PRIMARY_LOW:GuidanceBlock={eyebrow:'Primaria baja',title:'Reglas sencillas que pueden practicar',intro:'En primaria baja, la meta no es la autonomía técnica. Enseña decisiones sencillas y una ruta clara de ayuda para que el alumnado reconozca cuándo detenerse y consultar.',items:[
 {title:'Datos que necesitan cuidado',summary:'Nombre completo, escuela, ubicación, fotografías y contraseñas no se comparten sin acompañamiento.',action:'Clasifiquen ejemplos cotidianos en “puedo compartir” y “primero pregunto”.'},
 {title:'Mensajes y contactos desconocidos',summary:'Un nombre o avatar no confirma quién está detrás de una cuenta.',action:'Ensayen tres acciones: no responder, salir y contarlo a una persona adulta.'},
 {title:'Buen trato en juegos y chats',summary:'Las palabras y reacciones digitales también afectan a otras personas.',action:'Trabaja casos breves para decidir qué no reenviar y cómo apoyar a alguien.'},
 {title:'Compras dentro de aplicaciones',summary:'Los objetos virtuales pueden costar dinero real.',action:'Refuerza que cualquier compra requiere autorización de la familia y evita solicitar experiencias personales de gasto.'}
]};

const TEACHERS_PRIMARY_HIGH:GuidanceBlock={eyebrow:'Primaria alta',title:'Pausa, verifica y decide',intro:'En primaria alta puede ampliarse la autonomía sin retirar el acompañamiento. Pide que expliquen por qué eligen una acción, qué señales tomaron en cuenta y cuándo pedirían apoyo.',items:[
 {title:'Privacidad y configuración',summary:'Elegir quién puede ver, escribir o invitar reduce exposiciones innecesarias.',action:'Use una cuenta ficticia para revisar opciones de privacidad sin pedir al alumnado que muestre perfiles reales.'},
 {title:'Publicidad, premios y presión',summary:'Influencers, juegos y publicaciones pueden mezclar entretenimiento con publicidad o solicitudes engañosas.',action:'Pida identificar quién publica, qué quiere que hagamos y qué señales conviene revisar.'},
 {title:'Ciberacoso y reenvío',summary:'Una captura, burla o exclusión puede amplificarse cuando otras personas la comparten.',action:'Analicen qué puede hacer quien observa: no sumarse, apoyar, guardar evidencia y pedir ayuda.'},
 {title:'Ruta de ayuda',summary:'El alumnado necesita saber quién escucha y qué pasará después de contar algo.',action:'Presenta la ruta escolar con nombres, lugares y pasos comprensibles para su edad.'}
]};

const TEACHERS_SECONDARY:GuidanceBlock={eyebrow:'Secundaria',title:'Decisiones digitales, consentimiento y verificación',intro:'Promueve autonomía con límites y rutas de apoyo. Trabaja situaciones realistas sin pedir confesiones personales y cierra cada actividad con acciones concretas de verificación, consentimiento y solicitud de ayuda.',items:[
 {title:'Phishing y robo de cuentas',summary:'La urgencia, la suplantación y los enlaces extraños se usan para obtener contraseñas, códigos o dinero.',action:'Practiquen verificar remitente, dirección y canal oficial antes de actuar.'},
 {title:'Consentimiento y contenido íntimo',summary:'Distinga entre el concepto, la presión para producir contenido y la difusión sin permiso.',watch:'No solicite ejemplos personales ni exhiba material sensible.',action:'Use casos ficticios sobre no redistribución, apoyo y rutas de atención.'},
 {title:'Contacto manipulador',summary:'Regalos, secretos, aislamiento y amenazas pueden formar parte de un acercamiento de riesgo.',action:'Enseñe señales concretas y, ante una revelación, aplique el protocolo institucional sin culpabilizar.'},
 {title:'Ciberacoso y responsabilidad colectiva',summary:'Quien observa o reenvía puede detener o amplificar el daño.',action:'Analicen acciones posibles para la persona afectada, quien observa, quien reenvía y la comunidad escolar.'}
]};

const TEACHERS_UPPER:GuidanceBlock={eyebrow:'Bachillerato',title:'Pensamiento crítico, autonomía y participación',intro:'Favorece decisiones informadas y responsabilidad progresiva. En media superior el alumnado puede justificar sus elecciones, documentar procesos y reconocer cuándo una situación requiere orientación o intervención institucional.',items:[
 {title:'Verificación y desinformación',summary:'Una publicación convincente no es evidencia suficiente, especialmente ante contenido generado o manipulado con IA.',action:'Contrasten fuente original, fecha, contexto, evidencia independiente y propósito.'},
 {title:'Identidad, huella y audiencias',summary:'El contenido puede salir de su contexto y alcanzar espacios académicos, familiares o laborales.',action:'Analicen casos ficticios para decidir qué compartir, con quién y bajo qué condiciones.'},
 {title:'Consentimiento y violencia digital',summary:'La presión, el chantaje y la difusión de contenido íntimo sin permiso requieren una respuesta de protección, no de culpabilización.',action:'Enseñe no redistribución, conservación responsable de evidencia y rutas institucionales de ayuda.'},
 {title:'IA y autoría',summary:'Usar IA implica revisar exactitud, sesgos, datos compartidos y aportación propia.',action:'Solicite que documenten qué herramienta usaron, para qué, qué verificaron y qué decisiones conservaron como propias.'}
]};

function baseGuidanceFor(theme:AudienceSlug,level:string):GuidanceBlock|null{
  if(theme==='kids') return level==='preescolar'?KIDS_PRE:level==='primaria-alta'?KIDS_HIGH:KIDS_LOW;
  if(theme==='teens') return TEENS;
  if(theme==='families'){
    if(level==='fam-0-5') return FAMILIES_EARLY;
    if(level==='fam-6-11') return FAMILIES_CHILDHOOD;
    if(level==='fam-12-14') return FAMILIES_EARLY_TEENS;
    if(level==='fam-15-17') return FAMILIES_LATE_TEENS;
    return FAMILIES_YOUNG_ADULTS;
  }
  if(theme==='teachers'){
    if(level==='doc-pre') return TEACHERS_PRE;
    if(level==='doc-pb') return TEACHERS_PRIMARY_LOW;
    if(level==='doc-pa') return TEACHERS_PRIMARY_HIGH;
    if(level==='doc-sec') return TEACHERS_SECONDARY;
    return TEACHERS_UPPER;
  }
  return null;
}


// Editorial messages shown once, at the beginning of the selected stage.
const ACCOMPANIMENT_MESSAGES: Readonly<Record<string, { title: string; text: string }>> = {
  "kids:preescolar": {
    "title": "Aprendo acompañado.",
    "text": "Una persona adulta me ayuda a elegir qué ver y qué hacer. Si algo me asusta, me confunde o no lo entiendo, paro y lo cuento."
  },
  "kids:primaria-baja": {
    "title": "Primero pregunto, después decido.",
    "text": "Exploro con una persona adulta. Cada vez puedo hacer más cosas, pero si alguien me pide datos, fotos, secretos o hacer algo que no entiendo, busco a una persona adulta de confianza."
  },
  "kids:primaria-alta": {
    "title": "Puedo decidir mejor cuando me detengo y reviso.",
    "text": "Antes de compartir, aceptar, comprar o responder, pienso qué me están pidiendo y pido apoyo cuando algo no está claro."
  },
  "teens:secundaria": {
    "title": "Tener más autonomía también implica saber cuándo pedir apoyo.",
    "text": "Puedo tomar decisiones sobre mi vida digital, verificar información y poner límites, pero no tengo que resolver solo una situación que me presiona, amenaza o pone en riesgo."
  },
  "teens:preparatoria": {
    "title": "Autonomía significa decidir con información y asumir responsabilidad.",
    "text": "Antes de utilizar, compartir o crear contenido, evalúo sus consecuencias, protejo mis datos y reconozco cuándo necesito orientación o apoyo."
  },
  "families:fam-0-5": {
    "title": "Presencia antes que autonomía.",
    "text": "A esta edad, elegir el contenido, acompañar la experiencia y cerrar juntos corresponde principalmente a la persona adulta."
  },
  "families:fam-6-11": {
    "title": "Acompaña las primeras decisiones sin retirarte de golpe.",
    "text": "De 6 a 8 años, acompaña la experiencia y enséñales cuándo detenerse, preguntar y pedir ayuda. De 9 a 11 años, dales espacio para explicar qué harían, revisen juntos sus decisiones y mantén disponible una ruta clara de ayuda."
  },
  "families:fam-12-14": {
    "title": "Más privacidad no significa menos acompañamiento.",
    "text": "Escucha, acuerda límites y mantente disponible sin convertir cada situación en vigilancia o castigo."
  },
  "families:fam-15-17": {
    "title": "La autonomía crece, la red de apoyo permanece.",
    "text": "Conversen sobre decisiones, consecuencias y situaciones en las que necesitan intervención adulta."
  },
  "families:fam-18-22": {
    "title": "Acompañar entre personas adultas significa ofrecer apoyo, no controlar.",
    "text": "Pregunta qué ayuda necesitan y respeta sus decisiones y su privacidad."
  },
  "teachers:doc-pre": {
    "title": "La mediación es parte de la actividad.",
    "text": "No se espera que niñas y niños naveguen o resuelvan situaciones digitales por sí solos."
  },
  "teachers:doc-pb": {
    "title": "Enseña decisiones sencillas y una ruta clara de ayuda.",
    "text": "La meta no es autonomía técnica, sino reconocer cuándo detenerse y consultar."
  },
  "teachers:doc-pa": {
    "title": "Da espacio para decidir, pero mantén acompañamiento.",
    "text": "Pide que expliquen por qué eligen una acción y qué señales tomaron en cuenta."
  },
  "teachers:doc-sec": {
    "title": "Promueve autonomía con límites y rutas de apoyo.",
    "text": "Trabaja verificación, consentimiento y decisiones responsables sin trasladar al estudiante toda la carga de protegerse."
  },
  "teachers:doc-prep": {
    "title": "Favorece decisiones informadas y responsabilidad progresiva.",
    "text": "El estudiante puede justificar sus elecciones, documentar procesos y reconocer cuándo una situación requiere intervención institucional."
  }
};

export function guidanceFor(theme: AudienceSlug, level: string): GuidanceBlock | null {
  const guidance = baseGuidanceFor(theme, level);
  if (!guidance) return null;
  const accompaniment = ACCOMPANIMENT_MESSAGES[theme + ':' + level];
  return accompaniment ? { ...guidance, accompaniment } : guidance;
}
