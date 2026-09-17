import { AudienceSlug } from '../core/models/content.models';

export interface ProfileActivity {
  slug: string;
  kicker: string;
  title: string;
  description: string;
}

export interface ProfileLearningBlock {
  title: string;
  description: string;
  activities: ProfileActivity[];
}

export const PROFILE_LEARNING: Partial<Record<AudienceSlug, ProfileLearningBlock>> = {
  kids: {
    title: 'Actividades para aprender y pedir ayuda cuando la necesitas',
    description: 'Algunas puedes hacerlas por tu cuenta y otras indican cuándo conviene participar con una persona adulta de confianza.',
    activities: [
      { slug:'tecnologia-en-familia', kicker:'Preescolar y primaria baja · En compañía', title:'Una pantalla también puede iniciar una conversación', description:'Mirar, preguntar y compartir con una persona adulta.' },
      { slug:'uso-con-intencion', kicker:'Primaria · Autonomía', title:'¿Lo abriste para algo o solo por costumbre?', description:'Reconocer cuándo usamos una pantalla con intención.' },
      { slug:'ciberseguridad-familiar', kicker:'Primaria · Hazlo con un adulto', title:'Tu cinturón de seguridad digital', description:'Datos personales, contraseñas y solicitudes extrañas.' },
      { slug:'roblox-seguridad', kicker:'Primaria · Hazlo con un adulto', title:'Jugar en línea también requiere acuerdos', description:'Chats, privacidad y compras con dinero real.' },
      { slug:'influencers', kicker:'Primaria alta · Pensamiento crítico', title:'¿Te inspira o te presiona?', description:'Reconocer publicidad, presión y decisiones propias.' },
      { slug:'retos-virales', kicker:'Primaria alta · Seguridad', title:'Antes de aceptar el reto, pausa', description:'Pensar si un reto es seguro para ti y para otras personas.' },
    ],
  },
  teens: {
    title: 'Decisiones para tu vida digital',
    description: 'Situaciones breves para analizar lo que pasa en redes, chats y plataformas, tomar decisiones y saber cuándo pedir apoyo.',
    activities: [
      { slug:'uso-con-intencion', kicker:'Hábitos', title:'¿Lo abriste para algo o solo por costumbre?', description:'Autonomía digital frente al scroll automático.' },
      { slug:'fomo', kicker:'Bienestar', title:'¿Te estás perdiendo de algo… o solo lo parece?', description:'FOMO, pertenencia, descanso y redes sociales.' },
      { slug:'influencers', kicker:'Pensamiento crítico', title:'¿Te inspira o te presiona?', description:'Publicidad, consumo y presión social.' },
      { slug:'fraudes-estafas', kicker:'Seguridad', title:'Urgente, premio, enlace… ¿seguro?', description:'Phishing, engaños y protección de cuentas.' },
      { slug:'retos-virales', kicker:'Convivencia y seguridad', title:'Antes de aceptar el reto, pausa', description:'Presión de grupo, privacidad y cuidado de otras personas.' },
      { slug:'desconexion-familiar', kicker:'Equilibrio', title:'Desconectarse también es una decisión digital', description:'Acordar pausas sin convertirlas en castigo.' },
    ],
  },
  families: {
    title: 'Acompañar cada etapa sin invadir',
    description: 'Experiencias para conversar, acordar límites y fortalecer la autonomía de niñas, niños y adolescentes de acuerdo con su edad.',
    activities: [
      { slug:'habitos-regreso-clases', kicker:'Rutinas', title:'Volver a clases también cambia los hábitos digitales', description:'Ajustar sueño y pantallas de manera gradual.' },
      { slug:'tecnologia-en-familia', kicker:'0–11 años · Acompañamiento', title:'Una pantalla también puede iniciar una conversación', description:'Ver, preguntar y compartir en lugar de solo supervisar.' },
      { slug:'uso-con-intencion', kicker:'6–17 años · Autonomía', title:'Fomentar intención, no evitación', description:'Acompañar para que aprendan a decidir cómo, cuándo y para qué usan tecnología.' },
      { slug:'ciberseguridad-familiar', kicker:'6–14 años · Seguridad', title:'Ciberseguridad familiar', description:'Datos, contraseñas, contactos y acuerdos familiares.' },
      { slug:'roblox-seguridad', kicker:'6–11 años · Videojuegos', title:'Jugar en línea también requiere acuerdos', description:'Chats, control parental y compras dentro del juego.' },
      { slug:'fomo', kicker:'12–17 años · Bienestar', title:'Acompañar el FOMO con empatía', description:'Escuchar, validar y mantener límites saludables.' },
      { slug:'influencers', kicker:'9–15 años · Pensamiento crítico', title:'¿Quién influye y para qué?', description:'Conversar sobre publicidad, presión y consumo.' },
      { slug:'fraudes-estafas', kicker:'12 años en adelante · Seguridad', title:'Fraudes y estafas en línea', description:'Reconocer phishing y proteger cuentas familiares.' },
      { slug:'retos-virales', kicker:'10–17 años · Convivencia', title:'Retos virales: acompañar antes de prohibir', description:'Crear una pausa para evaluar riesgo, privacidad y respeto.' },
      { slug:'desconexion-familiar', kicker:'Todas las edades · Bienestar', title:'Desconectarse para volver a encontrarse', description:'Construir pausas compartidas con el ejemplo adulto.' },
    ],
  },
  teachers: {
    title: 'Situaciones listas para conversar en el aula',
    description: 'Cada recorrido parte de un caso, incorpora un EduTip y cierra con una decisión o acción que puede trabajarse con el grupo.',
    activities: [
      { slug:'habitos-regreso-clases', kicker:'Hábitos y bienestar', title:'Rutinas digitales y regreso a clases', description:'Detonar acuerdos sobre descanso, horarios e intención.' },
      { slug:'uso-con-intencion', kicker:'Autonomía digital', title:'Uso con intención frente al consumo automático', description:'Distinguir propósito, hábito y consumo pasivo.' },
      { slug:'tecnologia-en-familia', kicker:'Primaria · Mediación', title:'De mirar a conversar y crear', description:'Transformar un contenido audiovisual en diálogo y producción.' },
      { slug:'fomo', kicker:'Secundaria · Bienestar', title:'FOMO, pertenencia y descanso', description:'Analizar presión social sin minimizar lo que siente el alumnado.' },
      { slug:'influencers', kicker:'Pensamiento crítico', title:'Influencers, publicidad y presión', description:'Identificar intención, persuasión y consumo.' },
      { slug:'ciberseguridad-familiar', kicker:'Seguridad', title:'Datos personales y solicitudes extrañas', description:'Practicar decisiones de protección y búsqueda de ayuda.' },
      { slug:'fraudes-estafas', kicker:'Secundaria y media superior · Seguridad', title:'Phishing y verificación', description:'Reconocer urgencia, suplantación y canales oficiales.' },
      { slug:'retos-virales', kicker:'Convivencia', title:'Retos virales y presión de grupo', description:'Evaluar seguridad, privacidad, dignidad y responsabilidad al compartir.' },
    ],
  },
};

export const PROFILE_QUERY: Record<AudienceSlug, string> = {
  kids:'kids', teens:'teens', families:'families', teachers:'teachers', cdj:'teens', series:'teens', screens:'families', edutips:'families', help:'families'
};
