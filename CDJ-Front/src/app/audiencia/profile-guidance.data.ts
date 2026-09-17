import { AudienceSlug } from '../core/models/content.models';

export interface GuidanceItem { title:string; summary:string; watch?:string; action?:string; }
export interface GuidanceBlock { eyebrow:string; title:string; intro:string; items:GuidanceItem[]; }

const KIDS_PRE: GuidanceBlock={eyebrow:'Antes de empezar',title:'Para acompañar esta etapa',intro:'En preescolar la experiencia digital se aprende principalmente con compañía, conversación y ejemplo adulto.',items:[
 {title:'Lo que siente también importa',summary:'Una pantalla, un video o un mensaje puede provocar alegría, miedo, enojo o confusión.',watch:'Si algo le incomoda, no minimices lo que siente.',action:'Ayúdale a nombrar la emoción y practicar: cierro, me alejo y cuento.'},
 {title:'Hay cosas que se cuidan',summary:'Nombre completo, fotos, voz, ubicación y datos familiares no deben compartirse sin acompañamiento.',watch:'A esta edad no corresponde que decida solo qué información entregar.',action:'Usen ejemplos sencillos de cosas que sí puede contar y cosas que primero debe consultar.'},
 {title:'Pedir ayuda es parte de aprender',summary:'La meta no es que resuelva solo una situación digital, sino que reconozca cuándo necesita a una persona adulta.',action:'Repitan una regla fácil: si algo me asusta, me pide un secreto o no lo entiendo, lo cuento.'},
 {title:'Pantalla, juego y descanso',summary:'La tecnología es una actividad más dentro del día; no necesita ocupar todos los momentos.',action:'Alternen pantalla con juego físico, conversación, sueño y actividades sin dispositivo.'}
]};
const KIDS_LOW: GuidanceBlock={eyebrow:'Lo importante para ti',title:'Antes de jugar o compartir en línea',intro:'Ideas sencillas para empezar a tomar decisiones y saber cuándo pedir ayuda.',items:[
 {title:'Mis datos son importantes',summary:'Tu nombre completo, dirección, escuela, contraseñas, fotos y ubicación pueden decir mucho sobre ti.',action:'Antes de compartir un dato, pregunta a una persona adulta de confianza.'},
 {title:'No todas las personas en línea son conocidas',summary:'Un avatar o un nombre de usuario no demuestra quién está detrás de una cuenta.',watch:'Desconfía si alguien pide secretos, datos, fotos o quiere llevar la conversación a otro lugar.',action:'No respondas, sal de la conversación y cuéntalo.'},
 {title:'Jugar en línea también necesita acuerdos',summary:'Chats, amistades y compras dentro de los juegos son decisiones reales.',action:'Las compras y cambios de privacidad se revisan con una persona adulta.'},
 {title:'Ser amable también cuenta en internet',summary:'Lo que escribimos, enviamos o compartimos puede hacer sentir bien o mal a otras personas.',action:'Si algo lastima, no lo reenvíes y busca ayuda.'}
]};
const KIDS_HIGH: GuidanceBlock={eyebrow:'Lo importante para ti',title:'Más autonomía, mejores decisiones',intro:'A medida que haces más cosas en línea, también puedes aprender a detenerte, revisar y decidir.',items:[
 {title:'Privacidad y cuentas',summary:'Configurar quién puede verte, escribirte o conocer tus datos reduce exposiciones innecesarias.',action:'Revisa privacidad y usa contraseñas diferentes; pide apoyo cuando una configuración no sea clara.'},
 {title:'Videojuegos, chats y compras',summary:'Las monedas virtuales, premios y ofertas pueden involucrar dinero real o intentos de engaño.',watch:'Urgencia, premios demasiado buenos y solicitudes de contraseña son señales de alerta.',action:'Pausa antes de comprar, abrir enlaces o aceptar contactos.'},
 {title:'Lo popular no siempre es confiable',summary:'Influencers, retos y publicaciones pueden mezclar entretenimiento, publicidad, presión y datos falsos.',action:'Pregúntate quién lo publica, para qué y qué evidencia ofrece.'},
 {title:'Convivencia y presión de grupo',summary:'Participar en una broma, reenviar una imagen o sumarse a un reto también tiene consecuencias.',action:'Antes de compartir, piensa si es seguro, respetuoso y si la otra persona estaría de acuerdo.'}
]};
const TEENS: GuidanceBlock={eyebrow:'Lo importante para tu vida digital',title:'Entiende antes de decidir',intro:'No se trata de desconectarte, sino de reconocer cómo funcionan los espacios digitales y conservar el control de tus decisiones.',items:[
 {title:'Privacidad, identidad y reputación',summary:'Lo que publicas, comentas y permites que otros compartan puede permanecer, circular y llegar a personas que no esperabas.',action:'Revisa audiencia, permisos y contexto antes de publicar.'},
 {title:'Relaciones, chats y consentimiento',summary:'La presión, exclusión, burla o difusión de contenido sin permiso también ocurre en espacios digitales.',watch:'Si alguien insiste, amenaza, pide secretos o comparte algo íntimo sin consentimiento, no tienes que resolverlo solo.',action:'Pon límites, conserva evidencia cuando sea necesario y busca apoyo.'},
 {title:'Información, influencers e IA',summary:'Una publicación convincente puede ser publicidad, opinión, contenido manipulado o información generada con IA.',action:'Revisa fuente, intención, fecha y evidencia antes de creer o compartir.'},
 {title:'Atención, FOMO y bienestar',summary:'Notificaciones, reproducción continua y recomendaciones están diseñadas para facilitar que sigas conectado.',action:'Reconoce cuándo eliges seguir y cuándo la plataforma está decidiendo por ti.'},
 {title:'Fraudes y seguridad',summary:'Urgencia, premios, cobros inesperados, enlaces y suplantaciones buscan que actúes antes de verificar.',action:'Detente, verifica por otro canal y nunca entregues códigos o contraseñas.'}
]};
const FAMILIES: GuidanceBlock={eyebrow:'Antes de acompañar',title:'Lo importante cambia con la edad',intro:'Acompañar no significa vigilar todo: significa ajustar presencia, límites y autonomía conforme niñas, niños y adolescentes crecen.',items:[
 {title:'Conversar antes de controlar',summary:'Es más probable que pidan ayuda si saben que pueden contar lo ocurrido sin recibir un castigo automático.',action:'Escucha primero; después decide junto con ellos qué hacer.'},
 {title:'Privacidad y seguridad se enseñan',summary:'Controles parentales y configuraciones ayudan, pero no sustituyen aprender a reconocer riesgos y tomar decisiones.',action:'Revisen juntos privacidad, compras, contactos y datos según la edad.'},
 {title:'Bienestar sin convertir la pantalla en enemiga',summary:'Sueño, atención, convivencia y actividad física importan tanto como el número de minutos conectados.',action:'Construyan acuerdos claros que también modelen las personas adultas.'},
 {title:'Cuando algo ya ocurrió',summary:'Acoso, fraude, contacto no deseado o difusión de contenido requieren calma y una respuesta proporcional.',action:'Escucha, protege, conserva evidencia si corresponde, bloquea o reporta y busca apoyo cuando sea necesario.'},
 {title:'IA, redes e información',summary:'Acompañar hoy también implica hablar de contenido generado con IA, publicidad, influencers y desinformación.',action:'Practiquen juntos preguntas como: quién lo creó, qué quiere provocar y cómo podemos verificarlo.'}
]};
const TEACHERS: GuidanceBlock={eyebrow:'Antes de llevarlo al aula',title:'Ciudadanía digital se enseña con situaciones reales',intro:'Los recursos funcionan mejor cuando el alumnado puede analizar, decidir, argumentar y trasladar lo aprendido a su vida cotidiana.',items:[
 {title:'Enseñar según la etapa',summary:'La autonomía, el lenguaje y el tipo de decisión deben cambiar entre preescolar, primaria y adolescencia.',action:'En edades pequeñas prioriza mediación; después aumenta progresivamente análisis y autonomía.'},
 {title:'Seguridad sin alarmismo',summary:'Hablar solo de peligros puede generar miedo sin desarrollar criterio.',action:'Trabaja señales, decisiones, consecuencias y rutas de ayuda con situaciones cercanas.'},
 {title:'Convivencia y participación',summary:'Ciudadanía digital también incluye empatía, consentimiento, colaboración, creación y participación responsable.',action:'No reduzcas el tema a contraseñas y riesgos.'},
 {title:'Pensamiento crítico e IA',summary:'El alumnado necesita analizar fuentes, publicidad, algoritmos, contenido sintético y posibles errores de la IA.',action:'Incorpora verificación y explicación del razonamiento, no solo respuestas correctas.'},
 {title:'Ante un incidente',summary:'Una actividad educativa no sustituye los protocolos escolares ni la atención correspondiente.',action:'Protege al estudiante, evita exposición adicional, documenta lo necesario y sigue la ruta institucional aplicable.'}
]};

export function guidanceFor(theme:AudienceSlug,level:string):GuidanceBlock|null{
 if(theme==='kids') return level==='preescolar'?KIDS_PRE:level==='primaria-alta'?KIDS_HIGH:KIDS_LOW;
 if(theme==='teens') return TEENS;
 if(theme==='families') return FAMILIES;
 if(theme==='teachers') return TEACHERS;
 return null;
}
