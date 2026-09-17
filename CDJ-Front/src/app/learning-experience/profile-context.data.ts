import { ExperienceChoice, LearningExperience } from './learning-experience.data';

export type ExperienceProfile = 'kids' | 'teens' | 'families' | 'teachers';

export interface ProfileContext {
  key: ExperienceProfile;
  label: string;
  eyebrow: string;
  intro: string;
  support?: string;
  backHref: string;
  backLabel: string;
}

export const PROFILE_CONTEXTS: Record<ExperienceProfile, ProfileContext> = {
  kids: {
    key: 'kids',
    label: 'Niñas y niños',
    eyebrow: 'Actividad para aprender y practicar',
    intro: 'Lee la situación, mira el video y toma una decisión. Algunas partes se hacen mejor con una persona adulta de confianza.',
    support: 'Cuando aparezca “Hazlo con un adulto”, no tienes que resolverlo solo: pide apoyo para revisar configuraciones, compras, contactos o información personal.',
    backHref: '/p/ninas-y-ninos',
    backLabel: 'Volver a Niñas y niños',
  },
  teens: {
    key: 'teens',
    label: 'Adolescentes',
    eyebrow: 'Decisiones para tu vida digital',
    intro: 'Analiza una situación cercana, decide y compara tu respuesta después del video. En situaciones de riesgo, pedir ayuda también es una decisión autónoma.',
    backHref: '/p/adolescentes',
    backLabel: 'Volver a Adolescentes',
  },
  families: {
    key: 'families',
    label: 'Familias',
    eyebrow: 'Acompañar sin resolver todo por ellos',
    intro: 'La actividad está pensada para conversar, acordar y acompañar según la edad. El objetivo es fortalecer gradualmente la autonomía, no vigilar cada decisión.',
    backHref: '/p/familias',
    backLabel: 'Volver a Familias',
  },
  teachers: {
    key: 'teachers',
    label: 'Docentes',
    eyebrow: 'Situación para trabajar con el grupo',
    intro: 'Revisa el caso como una experiencia breve de aula: plantea la situación, escucha decisiones, muestra el EduTip y cierra con una acción o acuerdo aplicable.',
    support: 'La retroalimentación orienta la conversación; no se plantea como examen ni como una única respuesta para calificar al alumnado.',
    backHref: '/p/docentes',
    backLabel: 'Volver a Docentes',
  },
};

const ch = (label: string, feedback: string, preferred = false): ExperienceChoice => ({ label, feedback, preferred });

type Override = Partial<Pick<LearningExperience, 'prompt' | 'firstQuestion' | 'firstChoices' | 'postScenario' | 'postChoices' | 'actionTitle' | 'actionOptions'>>;

const OVERRIDES: Record<string, Override> = {
  'kids:tecnologia-en-familia': {
    prompt: 'Termina un cuento que viste con una persona adulta y la plataforma empieza a reproducir otra historia automáticamente.',
    firstQuestion: '¿Qué podrían hacer juntos antes de seguir?',
    firstChoices: ['Dejar que siga sin hablar', 'Pausar y platicar sobre el cuento', 'Cerrar la pantalla y terminar la actividad'],
    postScenario: 'Acaba el cuento. Antes de que empiece otro, puedes contar qué personaje te gustó, qué sentiste o qué habrías hecho tú.',
    postChoices: [
      ch('Seguir viendo sin detenernos.', 'Podrían perder una buena oportunidad para conversar.'),
      ch('Pausar y compartir lo que pensamos del cuento.', 'Convierte la pantalla en un punto de encuentro y conversación.', true),
      ch('Quitar el dispositivo sin decir nada.', 'Cerrar la pantalla no explica qué aprendimos ni cómo nos sentimos.'),
    ],
    actionTitle: 'Hazlo con una persona adulta',
    actionOptions: ['Hacer una pregunta después de un video', 'Crear algo juntos', 'Compartir una canción', 'Contar qué aprendimos'],
  },
  'kids:ciberseguridad-familiar': {
    actionTitle: 'Haz una revisión con una persona adulta de confianza',
    actionOptions: ['Revisar privacidad', 'Identificar datos que no comparto', 'Hablar de un contacto desconocido', 'Revisar una contraseña sin mostrarla'],
  },
  'kids:roblox-seguridad': {
    prompt: 'En un videojuego puedes hablar con otras personas y comprar objetos con monedas virtuales. Algunas decisiones necesitan apoyo de una persona adulta.',
    firstQuestion: '¿Cuándo conviene pedir ayuda?',
    firstChoices: ['Cuando alguien pide datos o quiero hacer una compra', 'Solo cuando el juego deja de funcionar', 'Nunca, porque es mi cuenta'],
    postScenario: 'Quieres comprar monedas virtuales para tu avatar. Para hacerlo se necesita dinero real o una tarjeta.',
    postChoices: [
      ch('Usar una tarjeta sin permiso para terminar la compra.', 'Una compra digital usa dinero real y necesita autorización.'),
      ch('Preguntar a una persona adulta y revisar juntos cuánto cuesta y si se puede comprar.', 'Pedir apoyo protege el dinero familiar y te ayuda a entender cómo funcionan las compras digitales.', true),
      ch('Compartir una contraseña para que otra persona del juego haga la compra.', 'Las contraseñas no deben compartirse y una persona desconocida no debe gestionar tus compras.'),
    ],
    actionTitle: 'Hazlo con una persona adulta',
    actionOptions: ['Revisar quién puede escribirte', 'Revisar privacidad', 'Activar autorización de compras', 'Revisar lista de contactos'],
  },
  'kids:influencers': {
    postScenario: 'Ves que tu creador favorito recomienda un producto y sientes que lo necesitas para ser parte del grupo.',
    postChoices: [
      ch('Pedir que lo compren de inmediato.', 'La urgencia por pertenecer puede venir de la presión del mensaje.'),
      ch('Preguntarme si de verdad lo necesito y comentarlo con una persona adulta.', 'Hacer una pausa ayuda a distinguir entre gusto propio, publicidad y presión.', true),
      ch('Dejar de ver para siempre a cualquier creador.', 'Aprender a analizar mensajes te sirve incluso cuando cambien los creadores que sigues.'),
    ],
  },
  'teens:influencers': {
    postScenario: 'Un creador que sigues recomienda un producto y en tu grupo empieza a sentirse como algo que “todos deberían tener”.',
    postChoices: [
      ch('Comprarlo para no quedarme fuera.', 'La presión social puede confundirse con una necesidad real.'),
      ch('Revisar si es publicidad, qué promete y si realmente lo quiero.', 'Analizar intención, evidencia y presión comercial fortalece tu criterio.', true),
      ch('Bloquear a todos los creadores.', 'Evitar todo contenido no sustituye la capacidad de analizarlo.'),
    ],
  },
  'teens:desconexion-familiar': {
    postScenario: 'Es fin de semana y en casa proponen cocinar o salir juntos, pero tú estás concentrado en el celular y no quieres dejarlo.',
    postChoices: [
      ch('Seguir conectado y no participar.', 'Mantiene la pantalla como respuesta automática.'),
      ch('Acordar una pausa y participar, sabiendo cuándo podrás volver a conectarte.', 'Un acuerdo claro permite equilibrar conexión y convivencia.', true),
      ch('Entregar el teléfono molesto y participar como castigo.', 'La pausa funciona mejor como decisión compartida que como sanción.'),
    ],
  },
};

export function normalizeProfile(value: string | null): ExperienceProfile {
  return value === 'kids' || value === 'teens' || value === 'families' || value === 'teachers' ? value : 'teens';
}

export function profileContext(profile: ExperienceProfile): ProfileContext {
  return PROFILE_CONTEXTS[profile];
}

export function adaptExperience(base: LearningExperience | undefined, profile: ExperienceProfile): LearningExperience | undefined {
  if (!base) return undefined;
  const specific = OVERRIDES[`${profile}:${base.slug}`] ?? {};
  if (profile === 'teachers') {
    return {
      ...base,
      ...specific,
      audience: 'Docentes',
      actionTitle: 'Llévalo al aula',
      actionOptions: ['Pregunta detonadora', 'Discusión en parejas', 'Acuerdo de grupo', 'Cierre con una acción concreta'],
    };
  }
  return { ...base, ...specific, audience: PROFILE_CONTEXTS[profile].label };
}
