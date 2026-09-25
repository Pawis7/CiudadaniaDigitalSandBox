import { AudienceSlug } from '../core/models/content.models';

export interface ProfileActivity { slug:string; kicker:string; title:string; description:string; levels:string[]; }
export interface ProfileLearningBlock { title:string; description:string; activities:ProfileActivity[]; }

export const PROFILE_LEARNING: Partial<Record<AudienceSlug, ProfileLearningBlock>> = {
  kids:{title:'Actividades para aprender y pedir ayuda cuando la necesitas',description:'En cada etapa aprenderás a tomar mejores decisiones. Algunas actividades se realizan con acompañamiento y otras te ayudan a practicar qué puedes decidir y cuándo conviene pedir apoyo.',activities:[
    {slug:'tecnologia-en-familia',kicker:'Preescolar y primaria baja · En compañía',title:'Una pantalla también puede iniciar una conversación',description:'Mirar, preguntar y compartir con una persona adulta.',levels:['preescolar','primaria-baja']},
    {slug:'uso-con-intencion',kicker:'Primaria · Crear y aprender',title:'¿Para qué vamos a usar la tableta?',description:'Elegir para qué usar una pantalla y cuándo continuar con otra actividad.',levels:['primaria-baja','primaria-alta']},
    {slug:'ciberseguridad-familiar',kicker:'Primaria · Hazlo con un adulto',title:'Tu cinturón de seguridad digital',description:'Reconoce solicitudes de datos mediante casos ficticios y practica cómo pedir ayuda.',levels:['primaria-baja','primaria-alta']},
    {slug:'roblox-seguridad',kicker:'Primaria · Hazlo con un adulto',title:'Jugar en línea también requiere acuerdos',description:'Casos preparados para decidir sobre mensajes y compras, sin abrir un juego.',levels:['primaria-baja','primaria-alta']},
    {slug:'influencers',kicker:'Primaria alta · Pensamiento crítico',title:'¿Te inspira o te presiona?',description:'Reconocer publicidad, presión y decisiones propias.',levels:['primaria-alta']},
    {slug:'retos-virales',kicker:'Primaria alta · Seguridad',title:'Antes de aceptar el reto, pausa',description:'Pensar si un reto es seguro para ti y para otras personas.',levels:['primaria-alta']}]},
  teens:{title:'Decisiones para tu vida digital',description:'Situaciones breves para analizar lo que pasa en redes, chats y plataformas, tomar decisiones y saber cuándo pedir apoyo.',activities:[
    {slug:'ciberseguridad-familiar',kicker:'Secundaria · Datos y privacidad',title:'Tu cinturón de seguridad digital',description:'Verifica una solicitud ficticia sin entregar información personal.',levels:['secundaria']},
    {slug:'uso-con-intencion',kicker:'Hábitos',title:'¿Lo abriste para algo o solo por costumbre?',description:'Autonomía digital frente al scroll automático.',levels:['secundaria','preparatoria']},
    {slug:'fomo',kicker:'Bienestar',title:'¿Te estás perdiendo de algo… o solo lo parece?',description:'Analiza un caso de pertenencia, presión y descanso sin utilizar redes sociales.',levels:['secundaria','preparatoria']},
    {slug:'influencers',kicker:'Pensamiento crítico',title:'¿Te inspira o te presiona?',description:'Publicidad, consumo y presión social.',levels:['secundaria','preparatoria']},
    {slug:'fraudes-estafas',kicker:'Seguridad',title:'Urgente, premio, enlace… ¿seguro?',description:'Phishing, engaños y protección de cuentas.',levels:['secundaria','preparatoria']},
    {slug:'retos-virales',kicker:'Convivencia y seguridad',title:'Antes de aceptar el reto, pausa',description:'Presión de grupo, privacidad y cuidado de otras personas.',levels:['secundaria','preparatoria']},
    {slug:'desconexion-familiar',kicker:'Equilibrio',title:'Desconectarse también es una decisión digital',description:'Acordar pausas sin convertirlas en castigo.',levels:['secundaria','preparatoria']}]},
  families:{title:'Acompañar cada etapa sin invadir',description:'Experiencias para acompañar cada etapa: conversar, acordar límites, dar espacio para decidir y mantener disponible una red clara de apoyo.',activities:[
    {slug:'habitos-regreso-clases',kicker:'Rutinas',title:'Volver a clases también cambia los hábitos digitales',description:'Ajustar sueño y pantallas de manera gradual.',levels:['fam-0-5','fam-6-11','fam-12-14','fam-15-17']},
    {slug:'tecnologia-en-familia',kicker:'0–11 años · Acompañamiento',title:'Una pantalla también puede iniciar una conversación',description:'Ver, preguntar y compartir en lugar de solo supervisar.',levels:['fam-0-5','fam-6-11']},
    {slug:'uso-con-intencion',kicker:'Autonomía digital',title:'Fomentar intención, no evitación',description:'Conversar sobre cómo, cuándo y para qué usamos tecnología.',levels:['fam-6-11','fam-12-14','fam-15-17','fam-18-22']},
    {slug:'ciberseguridad-familiar',kicker:'6–14 años · Seguridad',title:'Ciberseguridad familiar',description:'Datos, contraseñas, contactos y acuerdos familiares.',levels:['fam-6-11','fam-12-14']},
    {slug:'roblox-seguridad',kicker:'6–11 años · Videojuegos',title:'Jugar en línea también requiere acuerdos',description:'Conversa sobre mensajes y compras con casos preparados, sin abrir un juego.',levels:['fam-6-11']},
    {slug:'fomo',kicker:'12–17 años · Bienestar',title:'Acompañar el FOMO con empatía',description:'Escuchar, validar y mantener límites saludables.',levels:['fam-12-14','fam-15-17']},
    {slug:'influencers',kicker:'9–15 años · Pensamiento crítico',title:'¿Quién influye y para qué?',description:'Conversar sobre publicidad, presión y consumo.',levels:['fam-6-11','fam-12-14']},
    {slug:'fraudes-estafas',kicker:'12 años en adelante · Seguridad',title:'Fraudes y estafas en línea',description:'Reconocer phishing y revisar cuentas adultas o servicios adecuados para la edad.',levels:['fam-12-14','fam-15-17','fam-18-22']},
    {slug:'retos-virales',kicker:'9–17 años · Convivencia',title:'Retos virales: analizar un caso sin publicarlo',description:'Conversar con un caso ficticio, sin abrir redes sociales ni grabar, sobre riesgo, privacidad y respeto.',levels:['fam-6-11','fam-12-14','fam-15-17']},
    {slug:'desconexion-familiar',kicker:'Todas las edades · Bienestar',title:'Desconectarse para volver a encontrarse',description:'Construir pausas compartidas con el ejemplo adulto.',levels:['fam-0-5','fam-6-11','fam-12-14','fam-15-17','fam-18-22']}]},
  teachers:{title:'Situaciones listas para conversar en el aula',description:'Cada recorrido parte de un caso y cierra con decisiones que permiten ampliar la autonomía de forma progresiva, con límites claros y rutas de apoyo.',activities:[
    {slug:'roblox-seguridad',kicker:'Primaria · Guía docente',title:'Jugar en línea también requiere acuerdos',description:'Casos preparados para hablar de mensajes, costos y acompañamiento sin abrir videojuegos.',levels:['doc-pb','doc-pa']},
    {slug:'habitos-regreso-clases',kicker:'Hábitos y bienestar',title:'Rutinas digitales y regreso a clases',description:'Detonar acuerdos sobre descanso, horarios e intención.',levels:['doc-pre','doc-pb','doc-pa','doc-sec','doc-prep']},
    {slug:'uso-con-intencion',kicker:'Autonomía digital',title:'Uso con intención frente al consumo automático',description:'Distinguir propósito, hábito y consumo pasivo.',levels:['doc-pb','doc-pa','doc-sec','doc-prep']},
    {slug:'tecnologia-en-familia',kicker:'Preescolar y primaria · Mediación',title:'De mirar a conversar y crear',description:'Transformar un contenido audiovisual en diálogo y producción.',levels:['doc-pre','doc-pb']},
    {slug:'fomo',kicker:'Secundaria · Bienestar',title:'FOMO, pertenencia y descanso',description:'Analizar presión social sin minimizar lo que siente el alumnado.',levels:['doc-sec','doc-prep']},
    {slug:'influencers',kicker:'Pensamiento crítico',title:'Influencers, publicidad y presión',description:'Identificar intención, persuasión y consumo.',levels:['doc-pa','doc-sec','doc-prep']},
    {slug:'ciberseguridad-familiar',kicker:'Primaria y secundaria · Seguridad',title:'Datos personales y solicitudes extrañas',description:'Practicar decisiones de protección y búsqueda de ayuda.',levels:['doc-pb','doc-pa','doc-sec']},
    {slug:'fraudes-estafas',kicker:'Secundaria y media superior · Seguridad',title:'Phishing y verificación',description:'Reconocer urgencia, suplantación y canales oficiales.',levels:['doc-sec','doc-prep']},
    {slug:'retos-virales',kicker:'Convivencia',title:'Retos virales y presión de grupo',description:'Evaluar seguridad, privacidad, dignidad y responsabilidad al compartir.',levels:['doc-pa','doc-sec','doc-prep']}]}
};

export const PROFILE_QUERY: Record<AudienceSlug,string> = {kids:'kids',teens:'teens',families:'families',teachers:'teachers',help:'families',screens:'families',edutips:'families',casi:'kids',cdj:'teens'};
