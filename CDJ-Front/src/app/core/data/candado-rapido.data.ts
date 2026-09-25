export interface CandadoOption {
  id: string;
  text: string;
  accepted: boolean;
}

export interface CandadoElement {
  id: string;
  zone: string;
  public_title: string;
  visible_text: string;
  prompt: string;
  options: CandadoOption[];
  expert_note: string;
  tags: string[];
}

export interface CandadoLock {
  id: string;
  label: string;
  description: string;
  covers: string[];
}

export interface CandadoFeedbackBand {
  min: number;
  max: number;
  title: string;
  message: string;
}

export interface CandadoData {
  metadata: {
    project: string;
    programa: string;
    institucion: string;
    product_id: string;
    version: string;
    audience: string;
    subsegment: string;
    age_range: string;
    public_axis: string;
    dimension: string;
    guiding_verb: string;
    format_type: string;
    duration_minutes: string;
    not_a_simulator: boolean;
    no_real_personal_data: boolean;
  };
  public_experience: {
    title: string;
    subtitle: string;
    mission: string;
    steps: { id: string; name: string; action: string }[];
  };
  elements: CandadoElement[];
  locks: CandadoLock[];
  feedback_logic: {
    critical_tags: string[];
    bands: CandadoFeedbackBand[];
  };
  public_closing: string;
}

export const CANDADO_RAPIDO_DATA: CandadoData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    programa: "ALFA DIGITAL",
    institucion: "SECRETARIA DE EDUCACIÓN JALISCO",
    product_id: "CDJ-148",
    version: "v2.2_respuestas_desafiantes_y_orden_balanceado",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 14 años",
    public_axis: "Privacidad y seguridad",
    dimension: "D2",
    guiding_verb: "Actuar",
    format_type: "Herramienta interactiva de auditoría visual, lectura contextual y priorización de privacidad",
    duration_minutes: "8 a 12",
    not_a_simulator: true,
    no_real_personal_data: true
  },
  public_experience: {
    title: "Candado rápido: ¿qué estás mostrando sin darte cuenta?",
    subtitle: "Ayuda a Ana a revisar una cuenta ficticia. No todo lo visible es grave, pero algunas pistas juntas pueden decir demasiado.",
    mission: "Lee cada elemento, distingue dato directo, inferencia razonable y exageración. Después elige solo tres candados: no se trata de marcar todo, sino de decidir bien.",
    steps: [
      { id: "inicio", name: "Misión", action: "Entender la tarea" },
      { id: "inspector", name: "Cuenta simulada", action: "Observar 12 elementos mixtos" },
      { id: "lectura", name: "Lectura contextual", action: "Responder opciones específicas por elemento" },
      { id: "mapa", name: "Mapa de exposición", action: "Comparar lectura y revisar explicación" },
      { id: "candados", name: "Tres candados", action: "Elegir tres ajustes prioritarios" },
      { id: "cierre", name: "Plan final", action: "Revisar cobertura y copiar plan" }
    ]
  },
  elements: [
    {
      id: "E01",
      zone: "Perfil",
      public_title: "Foto de perfil",
      visible_text: "Ana aparece con sudadera escolar parcialmente visible. No se ve el nombre completo de la escuela.",
      prompt: "¿Qué lectura sería más precisa?",
      options: [
        { id: "E01_A", text: "No dice nada relevante, porque no aparece el nombre completo de la escuela.", accepted: false },
        { id: "E01_B", text: "Revela por sí sola escuela, grupo y horario de salida.", accepted: false },
        { id: "E01_C", text: "No confirma la escuela, pero puede sumar una pista si se combina con bio, mochila o historias.", accepted: true },
        { id: "E01_D", text: "Solo sería delicada si Ana escribiera también su dirección completa.", accepted: false }
      ],
      expert_note: "La pista no es concluyente por sí sola. El riesgo aparece cuando una señal parcial se acumula con otras: horarios, zonas, mochila, uniforme o rutinas.",
      tags: ["identidad_escolar", "señal_contextual"]
    },
    {
      id: "E02",
      zone: "Bio",
      public_title: "Descripción del perfil",
      visible_text: "'Ana L. · entreno martes y jueves · zona centro'.",
      prompt: "¿Qué combinación de datos aparece realmente aquí?",
      options: [
        { id: "E02_A", text: "Nombre parcial, actividad recurrente, días de rutina y zona aproximada.", accepted: true },
        { id: "E02_B", text: "Solo gustos personales; no hay rutina porque no aparece la hora exacta.", accepted: false },
        { id: "E02_C", text: "Ubicación exacta de entrenamiento y nombre completo de la escuela.", accepted: false },
        { id: "E02_D", text: "Un dato aislado de zona, sin relación con identidad o horarios.", accepted: false }
      ],
      expert_note: "No hay dirección exacta, pero la mezcla de identidad parcial + días + actividad + zona reduce el margen de búsqueda. En privacidad, la combinación pesa más que cada dato aislado.",
      tags: ["rutina", "ubicacion", "identidad"]
    },
    {
      id: "E03",
      zone: "Historia",
      public_title: "Historia reciente",
      visible_text: "Foto después de clases: 'al fin salimos 2:10'. Se ve una mochila con iniciales de la escuela.",
      prompt: "¿Qué inferencia es razonable sin exagerar?",
      options: [
        { id: "E03_A", text: "Que Ana vive exactamente donde fue tomada la foto.", accepted: false },
        { id: "E03_B", text: "Que puede haber una pista de horario escolar y otra de identidad escolar, aunque no aparezca dirección.", accepted: true },
        { id: "E03_C", text: "Que no hay información útil, porque la frase no menciona el nombre de la escuela.", accepted: false },
        { id: "E03_D", text: "Que la mochila confirma por completo escuela, salón y ruta de regreso.", accepted: false }
      ],
      expert_note: "La señal es intermedia: no revela todo, pero hora de salida + indicio escolar puede exponer rutina. No hace falta publicar una dirección para dar demasiadas pistas.",
      tags: ["horario", "identidad_escolar", "rutina"]
    },
    {
      id: "E04",
      zone: "Publicación antigua",
      public_title: "Cancha de entrenamiento",
      visible_text: "Publicación de hace 8 semanas con fachada reconocible de una cancha. Tiene ubicación aproximada activada.",
      prompt: "¿Por qué podría importar aunque sea antigua?",
      options: [
        { id: "E04_A", text: "Porque toda publicación antigua siempre revela la ubicación actual de una persona.", accepted: false },
        { id: "E04_B", text: "Porque los likes antiguos permiten saber contraseñas o cuentas vinculadas.", accepted: false },
        { id: "E04_C", text: "Porque si el lugar sigue siendo frecuente, una publicación vieja puede seguir funcionando como pista de rutina.", accepted: true },
        { id: "E04_D", text: "Porque una ubicación aproximada es igual que una dirección exacta.", accepted: false }
      ],
      expert_note: "Lo antiguo no siempre deja de importar. Si el lugar es frecuente, una publicación anterior puede seguir ayudando a ubicar rutinas o zonas habituales.",
      tags: ["publicacion_antigua", "ubicacion", "rutina"]
    },
    {
      id: "E05",
      zone: "Etiqueta",
      public_title: "Foto subida por una amiga",
      visible_text: "Ana está etiquetada en una foto grupal. Se ven uniformes, cancha y una frase: 'martes de entrenamiento'.",
      prompt: "¿Qué problema muestra mejor este elemento?",
      options: [
        { id: "E05_A", text: "Que si otra persona subió la foto, Ana ya no puede hacer nada para cuidarse.", accepted: false },
        { id: "E05_B", text: "Que la exposición también puede venir de etiquetas o fotos de otras personas, no solo de lo que Ana publica.", accepted: true },
        { id: "E05_C", text: "Que toda foto grupal debería estar prohibida, aunque no muestre datos sensibles.", accepted: false },
        { id: "E05_D", text: "Que el único dato relevante es que Ana tiene amigas.", accepted: false }
      ],
      expert_note: "La privacidad no depende solo de lo que Ana publica. Etiquetas, fotos grupales y lugares visibles también pueden exponer datos de terceros.",
      tags: ["etiquetas", "terceros", "identidad_escolar", "rutina"]
    },
    {
      id: "E06",
      zone: "Solicitud",
      public_title: "Cuenta desconocida",
      visible_text: "Cuenta con pocas fotos, nombre genérico y 3 seguidores en común. Pide seguir a Ana.",
      prompt: "¿Qué criterio conviene usar con seguidores en común?",
      options: [
        { id: "E06_A", text: "Aceptar primero, porque los seguidores en común prueban que la persona es confiable.", accepted: false },
        { id: "E06_B", text: "Bloquear siempre cualquier cuenta con pocos datos, sin revisar contexto.", accepted: false },
        { id: "E06_C", text: "Tomarlos como una señal a revisar, pero no como prueba de identidad o confianza.", accepted: true },
        { id: "E06_D", text: "Ignorarlos por completo, porque nunca aportan contexto útil.", accepted: false }
      ],
      expert_note: "Los seguidores en común pueden dar contexto, pero no verifican identidad. Sirven para pausar y revisar, no para aceptar automáticamente.",
      tags: ["solicitud", "identidad", "seguidores_comunes"]
    },
    {
      id: "E07",
      zone: "Mensaje",
      public_title: "Mensaje privado",
      visible_text: "“Creo que te vi saliendo de la escuela. ¿Entrenas los martes, verdad?”",
      prompt: "¿Qué hace que este mensaje merezca pausa?",
      options: [
        { id: "E07_A", text: "Que usa una pregunta, porque toda pregunta de desconocidos es peligrosa.", accepted: false },
        { id: "E07_B", text: "Que no incluye emojis; eso lo vuelve más sospechoso que el contenido.", accepted: false },
        { id: "E07_C", text: "Que es educado; por eso conviene responder para no parecer grosera.", accepted: false },
        { id: "E07_D", text: "Que conecta escuela, salida y entrenamiento, como si ya hubiera unido varias pistas de rutina.", accepted: true }
      ],
      expert_note: "El foco no es el tono del mensaje, sino la combinación de datos que parece haber armado: escuela + salida + entrenamiento.",
      tags: ["mensaje", "rutina", "contacto_invasivo"]
    },
    {
      id: "E08",
      zone: "Ajuste",
      public_title: "Historias públicas",
      visible_text: "Configuración: cualquier persona puede ver historias durante 24 horas.",
      prompt: "¿Qué efecto real tiene este ajuste?",
      options: [
        { id: "E08_A", text: "Solo afecta historias antiguas, no contenido reciente.", accepted: false },
        { id: "E08_B", text: "Permite que personas fuera de su círculo vean contenido reciente, incluyendo rutinas o lugares si aparecen.", accepted: true },
        { id: "E08_C", text: "Hace privada la cuenta, pero deja públicos los mensajes.", accepted: false },
        { id: "E08_D", text: "No importa si Ana no acepta solicitudes nuevas.", accepted: false }
      ],
      expert_note: "Las historias pueden parecer temporales, pero durante su vigencia muestran información reciente. Si son públicas, el alcance se abre más allá del círculo de confianza.",
      tags: ["historias", "configuracion", "alcance"]
    },
    {
      id: "E09",
      zone: "Ajuste",
      public_title: "Mensajes abiertos",
      visible_text: "Configuración: cualquier persona puede enviar solicitudes de mensaje.",
      prompt: "¿Qué decisión es más equilibrada?",
      options: [
        { id: "E09_A", text: "Dejarlo abierto siempre, porque limitar mensajes impide usar redes sociales.", accepted: false },
        { id: "E09_B", text: "Cerrar toda la cuenta y borrar todas las publicaciones, aunque no haya contacto extraño.", accepted: false },
        { id: "E09_C", text: "Depende del uso; si ya hay contacto invasivo, conviene limitar mensajes de desconocidos o filtrar solicitudes.", accepted: true },
        { id: "E09_D", text: "No cambiar nada mientras Ana no conteste el mensaje.", accepted: false }
      ],
      expert_note: "El objetivo no es desaparecer ni entrar en pánico. Es ajustar el canal de contacto cuando hay señales de invasión o acumulación de datos.",
      tags: ["mensajes", "configuracion", "contacto"]
    },
    {
      id: "E10",
      zone: "Ajuste",
      public_title: "Etiquetas automáticas",
      visible_text: "Configuración: las etiquetas aparecen en el perfil sin revisión previa.",
      prompt: "¿Qué riesgo específico abre esta configuración?",
      options: [
        { id: "E10_A", text: "Que Ana pierda acceso a su cuenta inmediatamente.", accepted: false },
        { id: "E10_B", text: "Que únicamente se muestren fotos tomadas por Ana.", accepted: false },
        { id: "E10_C", text: "Que las etiquetas dejen de existir para sus amistades.", accepted: false },
        { id: "E10_D", text: "Que otras personas puedan asociarla con lugares, horarios o grupos antes de que ella revise la publicación.", accepted: true }
      ],
      expert_note: "La revisión previa de etiquetas reduce exposición indirecta. No controla lo que otros suben, pero sí lo que se asocia al perfil de Ana.",
      tags: ["etiquetas", "terceros", "configuracion"]
    },
    {
      id: "E11",
      zone: "Publicación",
      public_title: "Foto de mascota",
      visible_text: "Foto de un perro sobre un sillón. No hay uniforme, ubicación, personas ni texto de rutina.",
      prompt: "¿Qué lectura conviene hacer aquí?",
      options: [
        { id: "E11_A", text: "Tratarla como exposición alta porque toda foto interior revela dirección exacta.", accepted: false },
        { id: "E11_B", text: "Considerarla de bajo riesgo visible si no muestra ubicación, personas, escuela o rutinas; aun así conviene revisar fondo antes de publicar.", accepted: true },
        { id: "E11_C", text: "Asumir que revela automáticamente la escuela de Ana por aparecer en su perfil.", accepted: false },
        { id: "E11_D", text: "Borrarla porque cualquier imagen personal debe eliminarse de internet.", accepted: false }
      ],
      expert_note: "No todo contenido personal expone lo mismo. El criterio está en revisar qué se ve: ubicación, personas, documentos, rutinas o identificadores.",
      tags: ["distractor", "bajo_riesgo", "criterio"]
    },
    {
      id: "E12",
      zone: "Repost",
      public_title: "Meme compartido",
      visible_text: "Repost de un meme sin ubicación ni datos de personas conocidas.",
      prompt: "¿Qué distingue este elemento de los más delicados?",
      options: [
        { id: "E12_A", text: "Que no parece aportar ubicación, rutina, identidad escolar ni datos de terceros visibles.", accepted: true },
        { id: "E12_B", text: "Que todo repost revela automáticamente la ubicación de quien lo comparte.", accepted: false },
        { id: "E12_C", text: "Que al ser meme siempre debe considerarse evidencia de riesgo alto.", accepted: false },
        { id: "E12_D", text: "Que expone la escuela porque aparece en la misma cuenta donde Ana publicó otras cosas.", accepted: false }
      ],
      expert_note: "Este funciona como distractor sano. No todo debe marcarse como riesgo; el aprendizaje está en distinguir entre dato visible, inferencia y ruido.",
      tags: ["distractor", "bajo_riesgo", "criterio"]
    }
  ],
  locks: [
    {
      id: "L01",
      label: "Poner la cuenta privada",
      description: "Reduce quién puede ver el perfil y publicaciones.",
      covers: ["acceso_publico", "historial"]
    },
    {
      id: "L02",
      label: "Limitar historias a contactos cercanos",
      description: "Evita que rutinas recientes sean visibles para cualquiera.",
      covers: ["historias", "rutina", "horario"]
    },
    {
      id: "L03",
      label: "Quitar rutinas de la bio",
      description: "Borra pistas como días de entrenamiento, zona o escuela.",
      covers: ["rutina", "ubicacion", "identidad"]
    },
    {
      id: "L04",
      label: "Desactivar ubicación en publicaciones",
      description: "Evita marcar lugares frecuentes o aproximados.",
      covers: ["ubicacion"]
    },
    {
      id: "L05",
      label: "Revisar publicaciones antiguas",
      description: "Corrige pistas que siguen visibles aunque ya no sean recientes.",
      covers: ["historial", "ubicacion", "rutina"]
    },
    {
      id: "L06",
      label: "Activar revisión de etiquetas",
      description: "Impide que fotos de otras personas aparezcan sin permiso en el perfil.",
      covers: ["etiquetas", "terceros"]
    },
    {
      id: "L07",
      label: "Limitar mensajes de desconocidos",
      description: "Reduce contacto directo de cuentas no reconocidas.",
      covers: ["mensajes", "contacto_desconocido"]
    },
    {
      id: "L08",
      label: "Bloquear/reportar cuenta insistente",
      description: "Sirve si una cuenta invade, insiste o menciona escuela, horarios o lugares.",
      covers: ["contacto_desconocido"]
    }
  ],
  feedback_logic: {
    critical_tags: ["rutina", "ubicacion", "contacto_desconocido", "etiquetas", "historias", "historial", "identidad_escolar"],
    bands: [
      {
        min: 0,
        max: 5,
        title: "Plan débil: viste algunas pistas, pero quedaron huecos importantes.",
        message: "No basta con notar algo raro. La privacidad mejora cuando conectas pistas y eliges ajustes concretos."
      },
      {
        min: 6,
        max: 9,
        title: "Plan razonable: detectaste varias señales, pero puedes priorizar mejor.",
        message: "Tu revisión ya tiene criterio, aunque todavía hay huecos entre lo que viste y los candados que elegiste."
      },
      {
        min: 10,
        max: 12,
        title: "Plan sólido: conectaste señales mixtas y priorizaste bien.",
        message: "No marcaste por marcar; distinguiste datos, contexto y ajustes concretos. Eso sí es criterio digital."
      }
    ]
  },
  public_closing: "La privacidad no es esconderse: es decidir quién puede verte, escribirte, etiquetarte o ubicarte."
};
