export interface ExperienceChoice { label: string; feedback: string; preferred?: boolean; }
export interface LearningExperience {
  slug: string; title: string; subtitle: string; audience: string; duration: string; videoId: string;
  prompt: string; firstQuestion: string; firstChoices: string[];
  postScenario: string; postChoices: ExperienceChoice[];
  takeaways: string[]; actionTitle: string; actionOptions: string[];
}

export const LEARNING_EXPERIENCES: LearningExperience[] = [
  {
    slug:'habitos-regreso-clases', title:'Volver a clases también cambia nuestros hábitos digitales', subtitle:'Rutinas, descanso y uso intencional de pantallas', audience:'Familias · Docentes · Estudiantes', duration:'7–9 min', videoId:'23v1RLc5VtY',
    prompt:'Faltan pocos días para volver a clases y en casa todavía se duerme tarde, se revisa el celular al despertar y las pantallas siguen encendidas hasta la noche.',
    firstQuestion:'¿Qué cambiarías primero para recuperar una rutina más saludable?', firstChoices:['Quitar todos los dispositivos de inmediato','Empezar a ajustar poco a poco horarios de sueño y pantallas','Esperar al primer día de clases para cambiar la rutina'],
    postScenario:'Faltan tres días para iniciar clases y un estudiante de primaria sigue durmiéndose a medianoche viendo videos en su tableta.',
    postChoices:[
      {label:'Permitirle seguir hasta tarde para que disfrute sus últimos días libres.',feedback:'Mantener la rutina puede hacer más difícil el ajuste de sueño cuando regresen las clases.'},
      {label:'Retirar la tableta de golpe y sin explicaciones.',feedback:'El límite puede ser necesario, pero un cambio brusco y sin diálogo suele aumentar la resistencia.'},
      {label:'Acordar guardar la tableta una hora antes y adelantar gradualmente la hora de dormir.',feedback:'Esta opción aplica la transición gradual y sustituye la pantalla nocturna por una rutina de descanso.',preferred:true}],
    takeaways:['No se trata de eliminar la tecnología, sino de recuperar intención y horarios.','El scroll automático puede aparecer como respuesta al nerviosismo o al aburrimiento.','Los cambios graduales y compartidos facilitan una rutina sostenible.'],
    actionTitle:'Elige una pausa de pantallas para empezar hoy', actionOptions:['45 min antes de dormir','Durante la comida','Al despertar','En otro momento acordado']
  },
  {
    slug:'uso-con-intencion', title:'¿Abriste el celular para algo… o solo por costumbre?', subtitle:'Autonomía digital frente al consumo pasivo', audience:'Niñas y niños · Adolescentes · Familias · Docentes', duration:'7–9 min', videoId:'B0V1XUy3YME',
    prompt:'Tienes unos minutos libres. Sin pensarlo demasiado, desbloqueas el celular y empiezas a deslizar videos aunque no estabas buscando nada.',
    firstQuestion:'¿Qué describe mejor lo que acaba de pasar?', firstChoices:['Elegí conscientemente qué quería hacer','Entré por costumbre y seguí consumiendo contenido','La única forma de descansar es usar una pantalla'],
    postScenario:'Una adolescente dice que está aburrida y enciende una pantalla para ver videos uno tras otro sin poner atención.',
    postChoices:[
      {label:'Dejarla consumir videos sin límite para que no se aburra.',feedback:'El aburrimiento desaparece por un momento, pero se refuerza el consumo automático.'},
      {label:'Apagar la pantalla y obligarla a hacer una tarea.',feedback:'Cortar el uso sin ofrecer alternativas no desarrolla autonomía digital.'},
      {label:'Proponer una actividad offline o usar la pantalla con un propósito concreto, como aprender algo.',feedback:'La clave es pasar de la inercia a una decisión con propósito.',preferred:true}],
    takeaways:['Consumo pasivo es usar contenido por inercia, sin un propósito claro.','Autonomía digital significa decidir cómo, cuándo y para qué usamos tecnología.','Tener alternativas sin pantalla ayuda a recuperar la capacidad de elegir.'],
    actionTitle:'¿Qué alternativa probarías la próxima vez que aparezca el aburrimiento?', actionOptions:['Una actividad de 5 minutos','Caminar o conversar','Aprender algo concreto','Crear mi propia lista']
  },
  {
    slug:'tecnologia-en-familia', title:'Una pantalla también puede iniciar una conversación', subtitle:'Ver, preguntar y compartir', audience:'Familias · Niñas y niños', duration:'7–9 min', videoId:'NGv12bQmVTc',
    prompt:'Termina un cuento o video que viste con una niña o niño y la plataforma empieza a reproducir automáticamente el siguiente.',
    firstQuestion:'¿Qué oportunidad educativa aparece justo en ese momento?', firstChoices:['Dejar que continúe la reproducción automática','Pausar y conversar sobre lo que acabamos de ver','Cerrar todo sin hablar del contenido'],
    postScenario:'Acaba de terminar un cuento animado con un niño de 6 años y la aplicación ya inició otra historia.',
    postChoices:[
      {label:'Dejar que siga reproduciendo historias automáticamente.',feedback:'La experiencia continúa, pero se pierde la oportunidad de convertir consumo en conversación.'},
      {label:'Pausar y preguntar qué sintió un personaje o qué habría hecho en su lugar.',feedback:'Pausar, preguntar y compartir transforma la pantalla en una experiencia de aprendizaje conjunto.',preferred:true},
      {label:'Quitar el dispositivo bruscamente.',feedback:'Detener la pantalla no garantiza reflexión; el diálogo es la parte educativa.'}],
    takeaways:['Los medios pueden ser pasivos, interactivos o creativos.','Preguntar después de mirar ayuda a desarrollar expresión y pensamiento.','Crear con tecnología cambia el papel de consumidor a participante.'],
    actionTitle:'Elige una experiencia para hacer juntos', actionOptions:['Preguntar después de un video','Crear un video familiar','Resolver un reto juntos','Compartir una canción y comentarla']
  },
  {
    slug:'desconexion-familiar', title:'Desconectarse también es una decisión digital', subtitle:'Equilibrio, descanso y convivencia', audience:'Familias · Niñas y niños · Adolescentes', duration:'5–7 min', videoId:'TF0JatOzQpw',
    prompt:'Es fin de semana. Todos están en casa, pero cada persona está mirando su propia pantalla.',
    firstQuestion:'¿Qué podría cambiar la dinámica sin convertir la tecnología en el enemigo?', firstChoices:['Prohibir todos los dispositivos todo el día','Acordar un momento compartido sin pantallas','No intervenir porque cada quien está entretenido'],
    postScenario:'Planeaste cocinar en familia, pero tus hijos están concentrados en sus celulares y no quieren levantarse.',
    postChoices:[
      {label:'Cancelar la actividad para evitar conflicto.',feedback:'Evita el conflicto inmediato, pero también se pierde el espacio de convivencia.'},
      {label:'Retirar los celulares con enojo y obligarlos a participar.',feedback:'La desconexión impuesta puede sentirse como castigo y no como un acuerdo de bienestar.'},
      {label:'Proponer un reto atractivo y acordar que todos, también los adultos, guarden el teléfono durante la actividad.',feedback:'El modelaje adulto y el acuerdo compartido hacen coherente la pausa digital.',preferred:true}],
    takeaways:['Las pausas digitales pueden favorecer descanso y convivencia.','Los adultos también modelan los hábitos que esperan de niñas, niños y adolescentes.','Equilibrio no significa prohibición total.'],
    actionTitle:'Programa una pausa compartida', actionOptions:['Una comida sin teléfonos','Una caminata','Una actividad creativa','Una tarde familiar']
  },
  {
    slug:'duolingo-familia', title:'Cuando jugar también puede ser aprender', subtitle:'Gamificación y aprendizaje en familia', audience:'Familias · Docentes · Estudiantes', duration:'6–8 min', videoId:'eqgbr0Lcg3g',
    prompt:'Una niña o un adolescente quiere usar la tableta para jugar, mientras en casa quieren que aproveche parte de ese tiempo para aprender.',
    firstQuestion:'¿Tecnología para aprender y tecnología para jugar tienen que ser opuestas?', firstChoices:['Sí, aprender debe ocurrir sin juegos','No, algunas experiencias usan mecánicas de juego para aprender','Depende solamente del tiempo de pantalla'],
    postScenario:'Tu hijo quiere jugar en la tableta y tú quieres que practique inglés.',
    postChoices:[
      {label:'Dejar únicamente el videojuego habitual.',feedback:'No aprovecha la oportunidad de introducir un uso formativo de la tecnología.'},
      {label:'Sustituir la tableta por dos horas de estudio obligatorio con diccionario.',feedback:'El cambio rompe por completo la lógica lúdica que propone la gamificación.'},
      {label:'Probar una sesión breve de aprendizaje gamificado y después continuar con el tiempo de ocio acordado.',feedback:'Integra aprendizaje, juego y negociación en una rutina breve y sostenible.',preferred:true}],
    takeaways:['La gamificación usa puntos, niveles y retos para motivar el aprendizaje.','Sesiones cortas pueden convertir parte del tiempo digital en microaprendizaje.','Aprender juntos puede crear un puente entre generaciones.'],
    actionTitle:'Prueba una micro-rutina de aprendizaje', actionOptions:['5 minutos diarios','Un reto familiar','Aprender una palabra juntos','Explorar otra herramienta educativa']
  },
  {
    slug:'fomo', title:'¿Te estás perdiendo de algo… o solo lo parece?', subtitle:'FOMO, redes sociales y bienestar', audience:'Adolescentes · Familias · Docentes', duration:'5–8 min', videoId:'aePoGmliAzw',
    prompt:'Ves que varias personas de tu grupo estuvieron juntas y subieron fotos. Tú no fuiste invitado.',
    firstQuestion:'¿Qué harías primero?', firstChoices:['Revisar todas las publicaciones una y otra vez','Escribir al grupo para reclamar','Reconocer cómo me siento y hablarlo con alguien de confianza'],
    postScenario:'Son las 11:30 de la noche. El grupo sigue enviando mensajes y mañana tienes clases. Sientes que si dejas el celular te perderás algo importante.',
    postChoices:[
      {label:'Seguir conectado hasta que los demás dejen de escribir.',feedback:'Puede calmar momentáneamente la sensación de exclusión, pero también afectar el descanso.'},
      {label:'Silenciar el grupo, dejar el teléfono y revisar mañana.',feedback:'Poner un límite no significa alejarte de tus amistades; significa cuidar tu descanso.',preferred:true},
      {label:'Salir del grupo para no sentirte así.',feedback:'Antes de cortar el vínculo, puedes probar límites menos drásticos y decidir con calma.'}],
    takeaways:['Las redes muestran una parte seleccionada de la realidad.','El FOMO puede relacionarse con ansiedad, insomnio y baja autoestima.','Escuchar, hablar y establecer límites puede ayudar a recuperar control.'],
    actionTitle:'Elige un momento sin pantalla para hoy', actionOptions:['Durante la comida','Antes de dormir','Mientras hago una tarea','En otro momento']
  },
  {
    slug:'influencers', title:'¿Te inspira o te presiona?', subtitle:'Influencers, consumo y pensamiento crítico', audience:'Primaria alta · Adolescentes · Familias · Docentes', duration:'7–9 min', videoId:'w4hf7tEW-S8',
    prompt:'Un creador que sigues recomienda insistentemente un producto y hace parecer que tenerlo es necesario para pertenecer.',
    firstQuestion:'¿Qué pregunta conviene hacer antes de querer comprarlo?', firstChoices:['¿Cuánto cuesta?','¿Lo quiero yo o me están convenciendo de que lo necesito?','¿Cuántos seguidores tiene quien lo recomienda?'],
    postScenario:'Un niño de 10 años insiste en comprar una bebida específica porque la consume su youtuber favorito.',
    postChoices:[
      {label:'Comprar el producto para evitar que se sienta excluido.',feedback:'Resolver la presión comprando no ayuda a reconocer la intención comercial del mensaje.'},
      {label:'Investigar juntos el producto y conversar sobre si existe publicidad o patrocinio.',feedback:'Analizar el mensaje permite distinguir inspiración de presión comercial.',preferred:true},
      {label:'Prohibirle volver a ver al creador.',feedback:'La prohibición elimina el contenido, pero no desarrolla el criterio para evaluar otros mensajes futuros.'}],
    takeaways:['Influir puede inspirar, pero también puede generar presión y consumo.','Pensamiento crítico significa preguntar por la intención detrás del mensaje.','La vida cotidiana no tiene que parecer perfecta para tener valor.'],
    actionTitle:'Pon a prueba el Semáforo de Influencers', actionOptions:['Verde: inspira o enseña','Amarillo: entretiene pero vende','Rojo: manipula o asusta','Analizar un creador en familia']
  },
  {
    slug:'ciberseguridad-familiar', title:'Tu cinturón de seguridad digital', subtitle:'Datos, contraseñas y decisiones preventivas', audience:'Niñas y niños · Familias · Docentes', duration:'6–8 min', videoId:'VAHWyfb4ERI',
    prompt:'En un juego en línea alguien parece amable, conversa contigo desde hace días y empieza a pedir información personal.',
    firstQuestion:'¿Qué datos no deberían compartirse con una persona conocida solo en internet?', firstChoices:['Dirección, teléfono, escuela o nombre completo','Mi personaje favorito','El nombre del juego que estoy usando'],
    postScenario:'Un amigo virtual pide el teléfono de casa para hablar de manera más directa.',
    postChoices:[
      {label:'Compartirlo porque ha sido amable.',feedback:'La amabilidad en línea no confirma la identidad real de una persona.'},
      {label:'No compartir el dato y hablar con un adulto de confianza sobre la solicitud.',feedback:'Protege los datos personales y mantiene abierto un canal de ayuda.',preferred:true},
      {label:'Dejar de usar internet por completo.',feedback:'La prevención digital busca desarrollar hábitos seguros, no eliminar toda participación en línea.'}],
    takeaways:['Los datos personales necesitan protección.','Una contraseña segura no se comparte.','Ante enlaces, descargas o solicitudes extrañas conviene detenerse y pedir apoyo.'],
    actionTitle:'Haz una revisión de seguridad', actionOptions:['Revisar una contraseña','Revisar privacidad','Identificar datos que no comparto','Hablar de un contacto desconocido']
  },
  {
    slug:'fraudes-estafas', title:'Urgente, premio, enlace… ¿seguro?', subtitle:'Fraudes, phishing y protección de cuentas', audience:'Adolescentes · Familias · Docentes', duration:'5–7 min', videoId:'kkoTerdNvbc',
    prompt:'Recibes un mensaje urgente: “Detectamos un acceso extraño. Entra a este enlace y escribe tu contraseña para no perder tu cuenta”.',
    firstQuestion:'¿Qué señal debería hacerte detenerte antes de tocar el enlace?', firstChoices:['La urgencia y la solicitud de credenciales','Que el mensaje tenga un logotipo','Que llegue a tu correo personal'],
    postScenario:'Un correo que parece del soporte de una red social te pide iniciar sesión desde un enlace para evitar que cierren tu cuenta.',
    postChoices:[
      {label:'Abrir el enlace y escribir la contraseña inmediatamente.',feedback:'La urgencia es una técnica común para evitar que verifiques el mensaje.'},
      {label:'No usar el enlace y revisar el estado de la cuenta desde la aplicación o sitio oficial.',feedback:'Verificar desde el canal oficial reduce el riesgo de caer en phishing.',preferred:true},
      {label:'Reenviar el enlace a amistades para preguntar si también les llegó.',feedback:'Compartir un enlace sospechoso puede extender el riesgo a otras personas.'}],
    takeaways:['El phishing imita