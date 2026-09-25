export interface PuntosInternos {
  respeto: number;
  autocontrol: number;
  accion: number;
  criterio: number;
}

export interface LimitesOption {
  option_id: string;
  texto_visible: string;
  puntos_internos_no_publicar: PuntosInternos;
  observacion_tags: string[];
}

export interface LimitesStep {
  step_id: string;
  titulo: string;
  pregunta: string;
  apoyo_visual: string;
  opciones: LimitesOption[];
  pregunta_generadora_posterior: string;
}

export interface LimitesCase {
  case_id: string;
  titulo: string;
  gancho_inicial: string;
  duracion_estimada_minutos: number;
  situacion: string;
  personajes: string[];
  evidencias_neutrales_del_caso: string[];
  microcopys: Record<string, string>;
  pasos: LimitesStep[];
}

export interface LimitesClosure {
  closure_id: string;
  label: string;
  range: {
    min: number;
    max: number;
  };
  observacion_principal: string;
  fortalezas_visibles: string[];
  frase_util: string;
  mini_plan: string[];
  sugerencia_final: string;
}

export interface LimitesChatsData {
  metadata: {
    project: string;
    template_name: string;
    template_version: string;
    product_id: string;
    product_title: string;
    audience: string;
    subsegment: string;
    age_range: string;
    dimension: string;
    public_axis: string;
    guiding_verb: string;
    content_type: string;
    format_family: string;
    format_type: string;
    use_context: string;
    estimated_duration_minutes: number;
    status: string;
    version_notes: string;
  };
  branding: {
    programa: string;
    institucion: string;
    proyecto: string;
    logo_oficial_requerido: boolean;
  };
  pantalla_inicio: {
    titulo: string;
    subtitulo: string;
    chips: string[];
    indicaciones: string[];
    boton_inicio: string;
  };
  casos_cortos: LimitesCase[];
  cierres_personalizados: LimitesClosure[];
}

export const LIMITES_CHATS_DATA: LimitesChatsData = {
  metadata: {
    project: "Ciudadanía Digital Jalisco",
    template_name: "CASO_CORTO_SECUNDARIA_RELACIONES_CARDFLOW_V4",
    template_version: "5.0",
    product_id: "CDJ-165",
    product_title: "¿Cómo pongo límites sin bronca en chats y redes?",
    audience: "Estudiantes",
    subsegment: "Secundaria",
    age_range: "12 a 14 años",
    dimension: "D2",
    public_axis: "Relaciones y comunicación",
    guiding_verb: "Actuar",
    content_type: "Formativo",
    format_family: "Digital",
    format_type: "Dos casos cortos interactivos en tarjetas + cierre personalizado",
    use_context: "Micrositio",
    estimated_duration_minutes: 12,
    status: "Modelo v5 con dos casos, seis decisiones y cierre personalizado",
    version_notes: "Se agrega un segundo caso y se balancean las posiciones de las opciones esperadas para evitar patrones obvios."
  },
  branding: {
    programa: "ALFA DIGITAL",
    institucion: "SECRETARÍA DE EDUCACIÓN JALISCO",
    proyecto: "Ciudadanía Digital Jalisco",
    logo_oficial_requerido: true
  },
  pantalla_inicio: {
    titulo: "¿Cómo pongo límites sin bronca en chats y redes?",
    subtitulo: "Lee dos casos breves, toma seis decisiones y descubre qué tipo de límite pondrías tú.",
    chips: [
      "2 casos",
      "6 decisiones",
      "12 minutos",
      "Secundaria"
    ],
    indicaciones: [
      "Lee con calma lo que pasó en cada chat.",
      "Elige lo que harías de verdad, no lo que suena perfecto.",
      "No necesitas escribir datos personales ni compartir redes reales.",
      "Al final recibirás una frase útil y un mini plan."
    ],
    boton_inicio: "Empezar"
  },
  casos_cortos: [
    {
      case_id: "CASO_01",
      titulo: "Solo era una broma… ¿o ya se pasó?",
      gancho_inicial: "En el grupo del salón empieza una burla que parece chiste, pero ya está exponiendo a una compañera.",
      duracion_estimada_minutos: 6,
      situacion: "Valeria está en el chat de su grupo. Faltan dos días para entregar un trabajo y varias personas están tensas. Diego manda una captura de una compañera que escribió mal una parte de la tarea. Varias personas reaccionan con emojis de risa y alguien propone hacer un sticker con esa captura para compartirlo en otro grupo.",
      personajes: [
        "Valeria",
        "Diego",
        "Compañera expuesta",
        "Grupo del salón"
      ],
      evidencias_neutrales_del_caso: [
        "La captura se compartió sin permiso de la compañera.",
        "La burla ya se está normalizando porque varias personas reaccionaron riéndose.",
        "Alguien quiere llevar la burla a otro grupo con un sticker.",
        "Valeria siente que si pone un límite, pueden decirle exagerada."
      ],
      microcopys: {
        mira_el_caso: "Mira lo que está pasando",
        piensa_antes_de_elegir: "Piensa antes de elegir",
        pregunta_para_pensar: "Pregunta para pensar",
        cierre: "Tu cierre personalizado"
      },
      pasos: [
        {
          step_id: "C1_PASO_01",
          titulo: "Primero: leer bien la situación",
          pregunta: "¿Qué decisión ayuda más a leer bien la situación antes de responder?",
          apoyo_visual: "chips_evidencia",
          opciones: [
            {
              option_id: "A",
              texto_visible: "Reírse también para no quedar fuera del grupo.",
              puntos_internos_no_publicar: {
                respeto: 0,
                autocontrol: 0,
                accion: 0,
                criterio: 0
              },
              observacion_tags: [
                "sigue_la_corriente",
                "normaliza_burla"
              ]
            },
            {
              option_id: "B",
              texto_visible: "Esperar a ver si alguien más dice algo primero, aunque la captura siga circulando.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 2,
                accion: 0,
                criterio: 1
              },
              observacion_tags: [
                "duda_pero_no_actua",
                "depende_del_grupo"
              ]
            },
            {
              option_id: "C",
              texto_visible: "Pausar antes de escribir y reconocer que compartir la captura ya está dañando a alguien.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "lee_el_contexto",
                "detecta_falta_de_respeto"
              ]
            },
            {
              option_id: "D",
              texto_visible: "Mandar un audio regañando a todo el grupo para que entiendan que estuvo mal.",
              puntos_internos_no_publicar: {
                respeto: 2,
                autocontrol: 0,
                accion: 2,
                criterio: 1
              },
              observacion_tags: [
                "pone_limite_pero_escala",
                "respuesta_impulsiva"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿En qué momento una risa en el chat deja de ser chiste y empieza a sostener una falta de respeto?"
        },
        {
          step_id: "C1_PASO_02",
          titulo: "Después: poner un límite sin pelear",
          pregunta: "¿Qué respuesta pone mejor un límite sin escalar el conflicto?",
          apoyo_visual: "frases_cortas",
          opciones: [
            {
              option_id: "A",
              texto_visible: "Responder: “Ya bájenle. Están bien inmaduros con esa captura. Mejor sigamos con la tarea”.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 1,
                accion: 2,
                criterio: 1
              },
              observacion_tags: [
                "pone_limite_pero_agrede",
                "puede_escalar"
              ]
            },
            {
              option_id: "B",
              texto_visible: "Responder: “Esa captura ya expone de más. Mejor quítenla y volvamos al trabajo”.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "limite_claro_y_breve",
                "redirige_sin_agredir"
              ]
            },
            {
              option_id: "C",
              texto_visible: "Silenciar el chat y esperar a que el tema se enfríe solo.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 2,
                accion: 1,
                criterio: 1
              },
              observacion_tags: [
                "se_protege_pero_no_interviene",
                "evita_conflicto"
              ]
            },
            {
              option_id: "D",
              texto_visible: "Hacer otro sticker más ligero para que el grupo se distraiga y deje el anterior.",
              puntos_internos_no_publicar: {
                respeto: 0,
                autocontrol: 1,
                accion: 0,
                criterio: 0
              },
              observacion_tags: [
                "humor_que_empeora",
                "aumenta_danio"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿Qué diferencia hay entre defender a alguien y atacar de vuelta?"
        },
        {
          step_id: "C1_PASO_03",
          titulo: "Si sigue: actuar sin escalar",
          pregunta: "Si el grupo no hace caso y sigue con la burla, ¿qué paso conviene seguir?",
          apoyo_visual: "ruta_breve",
          opciones: [
            {
              option_id: "A",
              texto_visible: "Salir del chat sin decir nada y dejar el problema ahí.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 2,
                accion: 1,
                criterio: 1
              },
              observacion_tags: [
                "se_protege_pero_no_canaliza",
                "requiere_pedir_apoyo"
              ]
            },
            {
              option_id: "B",
              texto_visible: "Seguir discutiendo hasta que el grupo acepte que tú tienes razón.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 0,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "discusion_sin_salida",
                "puede_escalar"
              ]
            },
            {
              option_id: "C",
              texto_visible: "Escribirle en privado a la compañera para decirle que estuvo feo, pero no hacer nada más.",
              puntos_internos_no_publicar: {
                respeto: 2,
                autocontrol: 2,
                accion: 1,
                criterio: 2
              },
              observacion_tags: [
                "apoya_en_privado",
                "falta_canalizar"
              ]
            },
            {
              option_id: "D",
              texto_visible: "Guardar evidencia si hace falta, dejar de alimentar la burla y avisar a una persona adulta de confianza o responsable del grupo.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "pide_apoyo",
                "actua_con_responsabilidad"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿Cuándo conviene dejar de responder en el chat y buscar apoyo fuera de él?"
        }
      ]
    },
    {
      case_id: "CASO_02",
      titulo: "El favor que ya no se siente favor",
      gancho_inicial: "Una conversación privada empieza como ayuda para una tarea, pero se convierte en presión y amenaza.",
      duracion_estimada_minutos: 6,
      situacion: "Emiliano trabaja en equipo con Sofía. En la noche, Sofía le manda varios mensajes pidiéndole que le pase las respuestas completas “para salir del apuro”. Cuando Emiliano tarda en contestar, ella escribe: “si no me ayudas, mañana digo que tú no hiciste nada”. Emiliano sí quiere llevarse bien, pero no quiere copiar ni quedar metido en una pelea.",
      personajes: [
        "Emiliano",
        "Sofía",
        "Equipo de trabajo",
        "Docente o tutoría"
      ],
      evidencias_neutrales_del_caso: [
        "La petición empezó como ayuda, pero ya incluye presión y amenaza.",
        "Responder con enojo puede convertir el problema en pelea.",
        "Pasar respuestas completas resolvería el momento, pero deja un problema más grande.",
        "Emiliano necesita poner un límite sin humillar ni dejarse manipular."
      ],
      microcopys: {
        mira_el_caso: "Mira lo que está pasando",
        piensa_antes_de_elegir: "Piensa antes de elegir",
        pregunta_para_pensar: "Pregunta para pensar",
        cierre: "Tu cierre personalizado"
      },
      pasos: [
        {
          step_id: "C2_PASO_01",
          titulo: "Primero: reconocer la presión",
          pregunta: "¿Qué decisión ayuda más a entender qué está pasando antes de contestar?",
          apoyo_visual: "chips_evidencia",
          opciones: [
            {
              option_id: "A",
              texto_visible: "Contestar rápido y pasarle todo para que no se enoje.",
              puntos_internos_no_publicar: {
                respeto: 0,
                autocontrol: 0,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "cede_por_presion",
                "evita_conflicto_con_costo"
              ]
            },
            {
              option_id: "B",
              texto_visible: "Pausar y notar que la conversación pasó de pedir ayuda a presionar con una amenaza.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "detecta_presion",
                "lee_el_contexto"
              ]
            },
            {
              option_id: "C",
              texto_visible: "Borrar el chat para no pensar más en el problema.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 1,
                accion: 0,
                criterio: 1
              },
              observacion_tags: [
                "evita_sin_resolver",
                "pierde_evidencia"
              ]
            },
            {
              option_id: "D",
              texto_visible: "Responder con una amenaza parecida para que Sofía entienda cómo se siente.",
              puntos_internos_no_publicar: {
                respeto: 0,
                autocontrol: 0,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "responde_con_amenaza",
                "escala_conflicto"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿Cómo distinguirías una petición de ayuda de una presión que cruza un límite?"
        },
        {
          step_id: "C2_PASO_02",
          titulo: "Después: ayudar sin dejarte presionar",
          pregunta: "¿Qué respuesta pone un límite claro y conserva una salida útil?",
          apoyo_visual: "frases_cortas",
          opciones: [
            {
              option_id: "A",
              texto_visible: "“Te paso las respuestas, pero prométeme que no dices nada”.",
              puntos_internos_no_publicar: {
                respeto: 0,
                autocontrol: 1,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "cede_a_la_presion",
                "solucion_aparente"
              ]
            },
            {
              option_id: "B",
              texto_visible: "“No me presiones. Tú siempre haces lo mismo y por eso nadie quiere trabajar contigo”.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 0,
                accion: 1,
                criterio: 1
              },
              observacion_tags: [
                "limite_agresivo",
                "generaliza_y_escala"
              ]
            },
            {
              option_id: "C",
              texto_visible: "“Ahorita no puedo, luego vemos”.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 2,
                accion: 0,
                criterio: 1
              },
              observacion_tags: [
                "pospone_sin_limite",
                "ambiguedad"
              ]
            },
            {
              option_id: "D",
              texto_visible: "“No te voy a pasar respuestas ni entrar en amenazas. Sí puedo explicarte qué parte entendí y acordamos qué hará cada quien”.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "limite_claro",
                "ofrece_alternativa"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿Por qué poner un límite no significa negar toda ayuda?"
        },
        {
          step_id: "C2_PASO_03",
          titulo: "Si insiste: cortar y pedir apoyo",
          pregunta: "Si Sofía sigue presionando o amenaza con acusarlo, ¿qué paso conviene más?",
          apoyo_visual: "ruta_breve",
          opciones: [
            {
              option_id: "A",
              texto_visible: "Responder una sola vez con el límite, guardar mensajes si hace falta y pedir apoyo a tutoría, docente o una persona adulta de confianza.",
              puntos_internos_no_publicar: {
                respeto: 3,
                autocontrol: 3,
                accion: 3,
                criterio: 3
              },
              observacion_tags: [
                "corta_y_canaliza",
                "pide_apoyo"
              ]
            },
            {
              option_id: "B",
              texto_visible: "Hacer capturas y mandarlas al grupo para que todos vean lo que Sofía hizo.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 1,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "expone_en_grupo",
                "aumenta_conflicto"
              ]
            },
            {
              option_id: "C",
              texto_visible: "Bloquearla sin avisar a nadie, aunque el equipo siga con el problema al día siguiente.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 2,
                accion: 1,
                criterio: 1
              },
              observacion_tags: [
                "se_protege_pero_no_resuelve",
                "falta_canalizar"
              ]
            },
            {
              option_id: "D",
              texto_visible: "Aceptar pasarle una parte de la tarea para que deje de molestar.",
              puntos_internos_no_publicar: {
                respeto: 1,
                autocontrol: 1,
                accion: 1,
                criterio: 0
              },
              observacion_tags: [
                "cede_parcialmente",
                "mantiene_presion"
              ]
            }
          ],
          pregunta_generadora_posterior: "¿Cuándo conviene dejar de negociar en el chat y llevar el problema a una persona responsable?"
        }
      ]
    }
  ],
  cierres_personalizados: [
    {
      closure_id: "CIERRE_01",
      label: "Pones límites con claridad sin echarle gasolina al chat",
      range: {
        min: 54,
        max: 72
      },
      observacion_principal: "Tiendes a leer bien el ambiente, detectar presión o falta de respeto y actuar sin engancharte de más.",
      fortalezas_visibles: [
        "Lees el contexto antes de reaccionar.",
        "Pones límites claros sin humillar.",
        "Reconoces cuándo conviene cortar la interacción y pedir apoyo."
      ],
      frase_util: "No voy a seguir si esto expone o presiona a alguien. Mejor lo resolvemos con respeto.",
      mini_plan: [
        "Pausa antes de responder cuando el chat se acelere.",
        "Usa una frase breve, clara y sin insultos para marcar límite.",
        "Si no paran o hay amenaza, corta la conversación y busca apoyo."
      ],
      sugerencia_final: "Tu reto ahora es sostener ese criterio también cuando el grupo o una amistad te presionen."
    },
    {
      closure_id: "CIERRE_02",
      label: "Notas el problema, pero todavía necesitas actuar con más firmeza",
      range: {
        min: 30,
        max: 53
      },
      observacion_principal: "Detectas que algo no está bien, pero a veces dudas, pospones o intentas evitar el conflicto aunque el límite ya sea necesario.",
      fortalezas_visibles: [
        "No te vas tan fácil con la corriente.",
        "Empiezas a distinguir entre ayuda, broma, presión y falta de respeto."
      ],
      frase_util: "Entiendo lo que pides, pero así no. Puedo ayudar sin copiar, exponer o pelear.",
      mini_plan: [
        "Prepara una frase corta antes de contestar.",
        "No esperes a que el grupo marque el camino.",
        "Si la presión sigue, guarda lo necesario y busca apoyo."
      ],
      sugerencia_final: "Tu siguiente paso es convertir la duda en una acción breve, respetuosa y clara."
    },
    {
      closure_id: "CIERRE_03",
      label: "La presión todavía te mueve más de lo que te conviene",
      range: {
        min: 0,
        max: 29
      },
      observacion_principal: "Por ahora la presión del grupo, el miedo a quedar mal o el impulso de responder puede llevarte a sostener el problema o escalarlo.",
      fortalezas_visibles: [
        "Ya estás revisando situaciones que sí vale la pena pensar mejor."
      ],
      frase_util: "No le voy a seguir a esto. Mejor lo dejamos aquí y lo vemos con calma.",
      mini_plan: [
        "No respondas solo por quedar bien.",
        "Evita contestar con burla, amenaza o enojo.",
        "Cuando algo expone, presiona o amenaza, corta el chat y busca a una persona adulta de confianza."
      ],
      sugerencia_final: "Tu meta no es ganar el chat; es actuar con más respeto, prudencia y autocontrol."
    }
  ]
};
