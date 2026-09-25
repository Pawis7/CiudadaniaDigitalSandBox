/**
 * Orientaciones originales para acompañar las historias del catálogo infantil.
 * La etapa, la edad, el título y la portada se resuelven desde page-content.ts.
 * Las producciones propuestas son presenciales y no requieren recopilar datos.
 */
export interface AdultStoryGuidance {
  resourceId: string;
  family: {
    before: string;
    during: string;
    after: string;
    outcome: string;
  };
  school: {
    objective: string;
    before: string;
    during: string;
    after: string;
    outcome: string;
    duration: string;
  };
}

export const ADULT_STORY_GUIDANCE: AdultStoryGuidance[] = [
  {
    resourceId: 'bit-hojas',
    family: {
      before:
        'Reúne dos hojas caídas. Antes de abrir el cuento, invita a tu hija o hijo a observar sus formas con las manos y los ojos.',
      during:
        'Cuando la maestra elija la cámara, comenta: «La usa para mirar detalles». Deja que tu hija o hijo señale qué quieren descubrir.',
      after:
        'Cierren el cuento y dibujen las dos hojas en papel. Busca junto a tu hija o hijo una diferencia que puedan mostrar.',
      outcome:
        'Señala una diferencia entre las hojas y relaciona la cámara del cuento con observar mejor.',
    },
    school: {
      objective:
        'Comparar detalles de dos hojas y reconocer para qué ayuda una herramienta durante la exploración.',
      before:
        'Lleva hojas caídas, papel y colores. Lee el cuento en voz alta o proyéctalo; deja las hojas reales al alcance del grupo.',
      during:
        'Detente cuando la maestra elige la cámara. Modela cómo observar un borde y permite que el grupo señale semejanzas o diferencias.',
      after:
        'Guarda la pantalla y armen un pequeño mural con dibujos de las hojas. Acompaña sus comentarios sin pedir respuestas por escrito.',
      outcome:
        'El grupo muestra diferencias visibles en sus dibujos y explica, con palabras o gestos, qué ayudó a observarlas.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'bit-plan-casa',
    family: {
      before:
        'Elige un momento tranquilo para leer juntos. Acuerden dónde dejarán la pantalla al terminar y qué juego harán después, como una casa de cojines.',
      during:
        'Al sonar el reloj del cuento, presta tu voz a la persona adulta: «Terminamos este paso y guardamos juntos». Acompaña sin apurar.',
      after:
        'Guarden el dispositivo y hagan el juego acordado. Dibujen tres momentos en una hoja: elegir para qué, compartir y cerrar.',
      outcome:
        'Participa en una transición acompañada y reconoce que después de cerrar puede comenzar otra actividad agradable.',
    },
    school: {
      objective:
        'Representar un acuerdo sencillo para iniciar, acompañar y terminar el uso de una pantalla.',
      before:
        'Prepara tres dibujos: plan, compañía y guardar. Lee el cuento al grupo; usa una tableta de cartón para el juego posterior.',
      during:
        'Acompaña con gestos la receta, el aviso del reloj y el cierre. Invita a completar la acción de guardar sin examinar la memoria.',
      after:
        'Dramaticen con la tableta de cartón un plan breve y su cierre. Pasen después a construir o dibujar, como hacen los personajes.',
      outcome:
        'Representa con ayuda un inicio y un cierre acordados, y acepta participar en la siguiente propuesta de juego.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'bit-data-mensaje-gris',
    family: {
      before:
        'Siéntate a leer junto a tu hija o hijo y prepara papel y colores. Anticipa que después del cuento dibujarán lejos de la pantalla.',
      during:
        'Cuando Bit quiera seguir dibujando, nombra su molestia sin regañarlo. Modela con calma la secuencia de respirar, guardar el dibujo y cerrar.',
      after:
        'Cierren juntos y hagan un dibujo en papel. Acompaña cualquier molestia por terminar; no necesita estar contento para recibir ayuda.',
      outcome:
        'Reconoce la molestia de Bit y ensaya una pausa con apoyo, sin tener que ocultar lo que siente.',
    },
    school: {
      objective:
        'Reconocer la frustración al terminar una actividad y practicar una transición acompañada hacia otra propuesta.',
      before:
        'Prepara papel y colores para continuar después. Lee o proyecta el cuento y anticipa al grupo cómo será el cambio de actividad.',
      during:
        'Al mirar a Bit molesto, pon palabras a lo que ocurre. Modela respirar y guardar; permite participar con gestos, sin exigir calma inmediata.',
      after:
        'Cierren la pantalla y dibujen a Tuercas en papel. Acompaña el cambio con la misma secuencia que practicaron durante la historia.',
      outcome:
        'Relaciona la emoción de Bit con la pausa y practica una acción para terminar con acompañamiento.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'reconozco-emociones',
    family: {
      before:
        'Recorran juntos las primeras tres escenas y dejen las demás para otro momento. Prepara un espacio cercano para moverse después.',
      during:
        'Miren el rostro y las manos de Bit cuando aparece el ruido o se traba el juego. Nombra posibilidades y escucha sin corregir sentimientos propios.',
      after:
        'Apaguen la pantalla y jueguen a mostrar emociones con gestos. Ensaya tú primero cómo parar y decir: «Ayúdame, por favor».',
      outcome:
        'Señala una emoción del personaje y prueba una manera de pedir ayuda o hacer una pausa.',
    },
    school: {
      objective:
        'Reconocer señales emocionales del personaje y ensayar una respuesta de cuidado mediante gestos y palabras.',
      before:
        'Proyecta las primeras tres escenas o describe sus imágenes. Reserva otra sesión para continuar; prepara caritas dibujadas para jugar después.',
      during:
        'Lee cada situación y deja observar a Bit antes de elegir. Acompaña las respuestas; evita clasificar como incorrecta la emoción que alguien siente.',
      after:
        'Sin pantalla, dramatiza un juego que se detiene. Invita a señalar una carita y ensayar contigo la petición de ayuda.',
      outcome:
        'Relaciona una señal del rostro o cuerpo de Bit con una emoción y representa una acción de cuidado.',
      duration: '10 min por sesión',
    },
  },
  {
    resourceId: 'bit-rotonda',
    family: {
      before:
        'Prepara un juego sencillo para hacer después, dentro de casa o afuera. Lee el cuento a su lado y observen juntos la plaza.',
      during:
        'Cuando Bit levante la mirada, señala las familias y el juego que descubre. Invita a observar lo que aparece alrededor, sin culparlo.',
      after:
        'Guarden juntos el dispositivo y hagan el juego elegido. La persona adulta también deja su pantalla para compartir ese momento.',
      outcome:
        'Identifica una posibilidad de juego fuera de la pantalla y participa en ella con compañía.',
    },
    school: {
      objective:
        'Descubrir oportunidades de convivencia y movimiento al atender lo que sucede alrededor de una pantalla.',
      before:
        'Lee o proyecta el cuento y prepara un espacio seguro para un juego de palmas o movimiento al terminar.',
      during:
        'Invita a señalar qué sucede en la plaza mientras Bit mira la tableta. Después acompañen con un gesto el momento de levantar la mirada.',
      after:
        'Cierren el cuento y comiencen un juego colectivo breve. Permite participar mirando, haciendo palmas o moviéndose, según las posibilidades de cada niña o niño.',
      outcome:
        'Reconoce una actividad compartida de la plaza y encuentra una forma de participar en el juego del grupo.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'bit-foto-otra-vez',
    family: {
      before:
        'Prepara una cámara de cartón o juega con las manos, sin tomar fotografías reales. Lee el cuento y modela cómo pedir permiso.',
      during:
        'Cuando Data esconda sus alitas, comenta que no quiere esa foto. Muestra cómo detenerse, escucharla y preguntar antes de tomar otra.',
      after:
        'Jueguen a pedir una foto imaginaria. Responde algunas veces «ahora no» y respeta también su respuesta, sin insistir ni guardar imágenes.',
      outcome:
        'Pregunta antes de una foto imaginaria y ensaya aceptar un «no» sin presionar a la otra persona.',
    },
    school: {
      objective:
        'Practicar la petición de permiso y el respeto a una negativa mediante un juego de fotografías imaginarias.',
      before:
        'Lee el cuento al grupo y prepara una cámara de cartón. Explica que jugarán sin tomar ni mostrar fotografías reales.',
      during:
        'Al aparecer la foto de la caída, nombra la incomodidad de Data. Representa cómo Bit puede detenerse y cuidar su respuesta.',
      after:
        'Modela con un títere una petición de foto y una negativa. Invita a ensayar con gestos o palabras, sin obligar a posar.',
      outcome:
        'Pide permiso en el juego y detiene la acción cuando el personaje o compañero dice que no.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'bit-puente-por-terminar',
    family: {
      before:
        'Siéntate junto a tu hija o hijo para leer. Prepara bloques y acuerden que después construirán un puente fuera de la pantalla.',
      during:
        'Cuando Bit quiera terminar el puente de la tableta, nombra su frustración. Observen cómo su papá lo escucha y lo ayuda a guardar el avance antes de cerrar.',
      after:
        'Guarden juntos la pantalla y construyan un puente con bloques durante cinco minutos. Acompaña el cambio aunque todavía haya ganas de seguir con el juego.',
      outcome:
        'Reconoce la emoción de Bit y participa, con apoyo adulto, en un cierre que permite guardar y continuar con otra actividad.',
    },
    school: {
      objective:
        'Reconocer la frustración al interrumpir un juego y practicar una transición con acompañamiento adulto y un cierre acordado.',
      before:
        'Prepara bloques para construir al terminar. Lee el cuento en voz alta al grupo y anticipa que pasarán de la lectura al juego compartido.',
      during:
        'Detente cuando llega el momento de cerrar. Explica cómo el papá acompaña a Bit: escucha lo que siente, le ayuda a guardar y sostiene el acuerdo.',
      after:
        'Cierra tú la pantalla e invita al grupo a construir puentes durante cinco minutos. Modela una frase para pedir ayuda cuando cuesta terminar y acompaña el cambio de actividad.',
      outcome:
        'Describe una ayuda que recibe Bit y ensaya una transición acompañada sin tener que ocultar su frustración.',
      duration: '10 min de lectura acompañada + 5 min de actividad presencial',
    },
  },
  {
    resourceId: 'bit-ventana-inesperada',
    family: {
      before:
        'Prepara papel para doblar y lee el cuento junto a tu hija o hijo. Explica que la mamá de Bit lo acompaña mientras usan un video para hacer origami.',
      during:
        'Cuando aparezca la ventana inesperada, observen cómo Bit se detiene y se lo cuenta a su mamá. Señala que ella se encarga de revisar y cerrar la ventana, sin pedirle a Bit que la investigue.',
      after:
        'Guarden la pantalla y doblen juntos una figura de papel durante cinco minutos. Ensayen una petición sencilla: «Apareció algo que no esperaba; ayúdame». Responde con calma y cercanía.',
      outcome:
        'Reconoce que puede detenerse y contar lo que aparece, mientras la persona adulta se hace cargo de revisar el dispositivo.',
    },
    school: {
      objective:
        'Practicar la petición de ayuda ante una ventana inesperada y reconocer la responsabilidad adulta de revisar y cerrar el contenido.',
      before:
        'Lee o proyecta el cuento desde el equipo docente. Prepara papel y una figura sencilla de origami para realizar con el grupo al terminar.',
      during:
        'Detente en la ventana inesperada y presta tu voz a la mamá, que escucha y se encarga del dispositivo. Invita a ensayar cómo contar lo ocurrido sin abrir ni reproducir ventanas reales.',
      after:
        'Cierra el cuento y guía durante cinco minutos el doblado de papel. Recuerda que pedir ayuda permite continuar con la actividad en compañía.',
      outcome:
        'Formula una petición de ayuda y distingue lo que hace Bit de la revisión que corresponde a la persona adulta.',
      duration: '10 min de lectura acompañada + 5 min de actividad presencial',
    },
  },
  {
    resourceId: 'bit-boton-brillante',
    family: {
      before:
        'Lean juntos y prepara un rompecabezas de papel para después. Explica que Bit y su abuela están compartiendo un juego en la tableta.',
      during:
        'Cuando el premio pida datos, observen que Bit no pulsa el botón y llama a su abuela. Señala cómo ella revisa el aviso y lo cierra; no es tarea de Bit averiguar si el premio es verdadero.',
      after:
        'Guarden juntos el dispositivo y armen el rompecabezas de papel durante cinco minutos. Representa con un dibujo un botón de premio y acompaña la práctica de parar y pedirte ayuda, sin escribir datos.',
      outcome:
        'Reconoce que un premio puede esperar y ensaya pedir apoyo antes de pulsar, mientras la persona adulta revisa y decide.',
    },
    school: {
      objective:
        'Reconocer una petición de datos en un premio ficticio y practicar la pausa y la petición de apoyo adulto antes de actuar.',
      before:
        'Lee el cuento al grupo y prepara rompecabezas de papel. Trabaja solo con el aviso ilustrado de la historia, sin abrir promociones ni solicitar datos personales.',
      during:
        'Señala que Bit deja el botón sin pulsar y consulta a su abuela. Modela la respuesta adulta: escuchar, revisar el aviso y cerrarlo sin completar la petición.',
      after:
        'Guarda la pantalla y acompaña al grupo mientras arma rompecabezas durante cinco minutos. Ensayen cómo llamar a una persona adulta de confianza ante un premio que solicita información.',
      outcome:
        'Explica por qué Bit espera ayuda y representa una petición de apoyo sin pulsar ni entregar información.',
      duration: '10 min de lectura acompañada + 5 min de actividad presencial',
    },
  },
  {
    resourceId: 'bit-cartel-clase',
    family: {
      before:
        'Prepara papel y colores para dibujar mariposas. Lee a su lado y observen que la maestra dirige el cartel y acompaña el uso de la cámara.',
      during:
        'Cuando Data diga que no quiere una foto, muestra cómo la maestra y Bit respetan su decisión. Conversen sobre la alternativa: fotografiar un dibujo con permiso y reconocer a quien lo hizo.',
      after:
        'Cierren la pantalla y armen un pequeño mural de papel durante cinco minutos. Pregunta qué dibujos quieren incluir, acepta una negativa y añade el nombre o símbolo que cada autor elija; no hace falta tomar fotos.',
      outcome:
        'Pide permiso, acepta un «no» y reconoce la aportación de otra persona al crear un mural con acompañamiento.',
    },
    school: {
      objective:
        'Crear un mural acompañado que respete el permiso para usar imágenes, las negativas y la autoría de los dibujos.',
      before:
        'Prepara papel y colores para un mural de mariposas. Lee el cuento al grupo y explica para qué usa la cámara la maestra y cómo acompaña a Bit.',
      during:
        'Detente cuando Data rechaza la foto. Modela cómo aceptar sin insistir y cómo pedir permiso antes de fotografiar el dibujo, reconociendo a quien lo creó.',
      after:
        'Cierra el cuento y guía durante cinco minutos un mural de papel. Pregunta antes de incorporar cada dibujo y acompaña los créditos con nombres o símbolos elegidos; no se necesitan fotografías reales.',
      outcome:
        'El mural incorpora aportaciones autorizadas y reconoce a sus autores; el grupo practica aceptar que alguien no quiera participar.',
      duration: '10 min de lectura acompañada + 5 min de actividad presencial',
    },
  },
  {
    resourceId: 'luna-cajita-importante',
    family: {
      before:
        'Lean juntos el cuento y acuerden que trabajarán solo con los ejemplos ficticios de Luna. No hace falta mostrar perfiles, fotos ni permisos reales del dispositivo.',
      during:
        'En cada decisión, pregunten qué información necesita realmente la herramienta y qué podría revelar de más. Comparen compartir, limitar un permiso y pedir ayuda.',
      after:
        'Inventen una aplicación en papel y escriban tres preguntas antes de usarla: qué pide, para qué lo pide y qué permiso necesita. Decidan qué aceptarían y qué revisarían.',
      outcome:
        'Explica por qué conviene compartir solo los datos necesarios y reconoce que imágenes y permisos también forman parte de la privacidad.',
    },
    school: {
      objective:
        'Analizar minimización de datos, contexto de las imágenes y permisos de aplicaciones mediante situaciones ficticias.',
      before:
        'Proyecta el cuento desde un equipo del aula. Trabajen únicamente con Luna y la aplicación inventada; no solicites al alumnado mostrar cuentas, fotografías ni configuraciones personales.',
      during:
        'Pide justificar cada decisión: qué necesita la aplicación, qué dato sobra, qué revela el fondo de la imagen y cuánto acceso requiere el micrófono.',
      after:
        'En equipos, diseñen en papel una pantalla ficticia que pida datos o permisos. Intercámbienla con otro equipo para marcar qué aceptarían, qué limitarían y qué preguntarían antes.',
      outcome:
        'Justifica al menos una decisión de minimización de datos y una de control de permisos usando información del caso.',
      duration: '20 min',
    },
  },
  {
    resourceId: 'detectives-pistas',
    family: {
      before:
        'Abran juntos el caso del aviso escolar y tengan papel a mano. Propón investigar las pistas del cuento, sin buscar publicaciones reales.',
      during:
        'Lean las dos pistas antes de responder. En el aviso de la feria, comparen el año, quién informa y a qué actividad se refiere.',
      after:
        'Escriban una nota breve sobre el caso: qué está confirmado y qué falta saber. Revisen si cada afirmación tiene una pista que la sostenga.',
      outcome:
        'Distingue una información confirmada de una duda y señala la fuente o fecha que apoya su explicación.',
    },
    school: {
      objective:
        'Contrastar fuente, fecha y contexto de avisos ficticios para comunicar qué se sabe y qué falta verificar.',
      before:
        'Proyecta el caso o lee sus avisos en voz alta. Entrega papel para registrar pistas; trabajen sin cuentas ni teléfonos personales.',
      during:
        'Antes de votar una opción, abran ambas pistas. Pide comparar los años y las actividades de los avisos, no decidir por su apariencia.',
      after:
        'Cada pareja redacta dos frases sobre la feria: una confirmada y otra pendiente de verificar. Compartan la pista que sustenta cada decisión.',
      outcome:
        'El mensaje distingue hechos comprobados y dudas, y cita una pista concreta del caso para justificar la elección.',
      duration: '20 min',
    },
  },
  {
    resourceId: 'mural-buenas-ideas',
    family: {
      before:
        'Prepara papel y colores para hacer una composición familiar. Lean primero el cuento y acuerden que cualquier dibujo puede quedarse fuera si su autor prefiere.',
      during:
        'En la escena de Inés, pregunten antes de añadir su dibujo. Al revisar el icono, conversen sobre cómo reconocer a quien lo creó.',
      after:
        'Armen una composición con dibujos autorizados y firmen con símbolos elegidos. Propongan una mejora concreta y respetuosa; pueden conservarla solo en casa.',
      outcome:
        'Consulta antes de usar una creación ajena, reconoce su aportación y expresa una sugerencia que ayuda a mejorarla.',
    },
    school: {
      objective:
        'Crear en equipo respetando permisos, autorías, comentarios constructivos y privacidad antes de mostrar una producción.',
      before:
        'Lee o proyecta el cuento. Prepara un mural de papel con dibujos del grupo y acuerda que nadie está obligado a incluir su trabajo.',
      during:
        'Comparen el permiso de Inés, los créditos del icono y la alternativa sin rostros ni nombres. Revisen también quién verá la exposición.',
      after:
        'Añadan al mural solo aportaciones acordadas y créditos con símbolos elegidos. Intercambien una mejora concreta; revisen con la docente antes de exponerlo.',
      outcome:
        'La producción incluye aportaciones autorizadas, reconoce a quienes participaron y evita datos innecesarios para explicar sus ideas.',
      duration: '20 min',
    },
  },
  {
    resourceId: 'castillo-cambio',
    family: {
      before:
        'Lean juntos la historia de Mara. Recuerda que puede dejar de mirar algo incómodo y contártelo; no necesita volver a mostrarlo para demostrarlo.',
      during:
        'Cuando cambie el castillo, conversen sobre cómo salir y buscar compañía. Observen por qué estar con su papá no vuelve adecuada cualquier zona.',
      after:
        'Construyan un puente con papel o bloques. Ensayen qué diría Mara para pedir ayuda y qué revisaría la persona adulta antes de otra experiencia.',
      outcome:
        'Explica que puede salir de un contenido incómodo y que una zona nueva requiere revisión adulta, aunque conozca el juego.',
    },
    school: {
      objective:
        'Reconocer cambios de contenido en un mundo virtual ficticio y elegir salir, pedir apoyo y buscar alternativas adecuadas.',
      before:
        'Lee o proyecta el cuento y prepara bloques o papel. Trabajen únicamente con Mara; no solicites relatos de incidentes privados del alumnado.',
      during:
        'Deténganse en el portal y en la indicación de edad. Conversen sobre qué cambió y por qué acompañar no sustituye elegir contenido adecuado.',
      after:
        'En parejas, representen a Mara pidiendo ayuda y a su papá escuchando. Después construyan un puente de papel como alternativa del caso.',
      outcome:
        'Propone salir y contar lo ocurrido, y distingue acompañamiento adulto de permiso para entrar en cualquier contenido.',
      duration: '20 min',
    },
  },
  {
    resourceId: 'mision-puede-esperar',
    family: {
      before:
        'Lean la historia de Leo en un momento tranquilo. Tengan papel para acordar un cierre y una actividad posterior, sin abrir ningún juego.',
      during:
        'Al aparecer la estrella de la racha, reconoce que perderla puede molestar. Conversen sobre cómo ayuda la abuela sin jugar en lugar de Leo.',
      after:
        'Dibujen un plan con aviso previo, tiempo para guardar y algo que desean hacer después. Acuerden revisarlo juntos si terminar sigue costando.',
      outcome:
        'Reconoce la presión de una recompensa y participa en un acuerdo que reserva tiempo para descanso y convivencia.',
    },
    school: {
      objective:
        'Identificar la presión de una recompensa y proponer un cierre acordado que cuide el descanso y otras actividades.',
      before:
        'Lee o proyecta el caso de Leo. Dibuja un reloj y prepara tarjetas de actividades; trabajen con la tarde ficticia del personaje.',
      during:
        'Comparen el plan de Leo con la misión extra. Pregunta qué se perdería de su tarde si la estrella decidiera siempre cuándo terminar.',
      after:
        'En equipos, organicen en papel la tarde de Leo e incluyan un aviso de cierre. Ensayen cómo acompañarlo aunque siga decepcionado.',
      outcome:
        'El plan incluye tiempo para guardar y descansar, y una frase de apoyo que reconoce la molestia sin prolongar la partida.',
      duration: '20 min',
    },
  },
  {
    resourceId: 'monedas-gratis',
    family: {
      before:
        'Recorran la simulación en compañía. Explica que sus mensajes son ficticios: no necesitan abrir los enlaces ni escribir contraseñas para practicar.',
      during:
        'Comparen la promesa de monedas, el enlace urgente y la petición de códigos. Pregunta qué cambia entre revisar un aviso y entregar datos.',
      after:
        'Inventen en papel una oferta que presione a decidir rápido. Practiquen detenerse y pedir ayuda; no compartan ni prueben direcciones reales.',
      outcome:
        'Detecta una señal de presión y explica por qué una recompensa no justifica entregar contraseñas ni códigos.',
    },
    school: {
      objective:
        'Reconocer señales de engaño en premios ficticios y justificar una respuesta que proteja datos de acceso.',
      before:
        'Proyecta la simulación desde un solo equipo. Explica que analizarán ejemplos ficticios; no deben copiar enlaces ni aportar datos de cuentas.',
      during:
        'Antes de elegir, identifiquen premio, prisa y datos solicitados. Comparen las explicaciones de las opciones; centren la conversación en decisiones, no en puntajes.',
      after:
        'Cada equipo dibuja un aviso inventado y marca dos señales para detenerse. Ensayen una petición de ayuda sin relatar experiencias privadas.',
      outcome:
        'Señala dos indicios del mensaje y propone una respuesta que evita abrir rutas desconocidas o entregar datos.',
      duration: '15 min',
    },
  },
  {
    resourceId: 'el-mundo-privado',
    family: {
      before:
        'Acompaña la simulación y aclara que no abrirán salas reales. Di que puede pedirte ayuda incluso si antes aceptó una invitación.',
      during:
        'Observen cuándo la invitación empieza a pedir secretos o datos. Conversen sobre salir, poner un límite y buscar una persona de confianza.',
      after:
        'Ensayen con personajes inventados una frase para salir y otra para pedir ayuda. Responde escuchando; conocer a alguien jugando no obliga a continuar.',
      outcome:
        'Identifica una petición que cruza sus límites y practica cómo interrumpir el contacto y buscar apoyo adulto.',
    },
    school: {
      objective:
        'Reconocer presión y solicitudes inadecuadas en una invitación ficticia, y ensayar límites y una ruta de ayuda.',
      before:
        'Lee o proyecta los mensajes del simulador. Usa solo sus personajes; explica que nadie tiene que contar conversaciones privadas ante el grupo.',
      during:
        'Identifiquen qué pide el jugador y cómo cambia el tono. Comparen salir, bloquear, reportar y pedir ayuda según las situaciones del caso.',
      after:
        'En parejas, escriban una respuesta breve para detener la conversación ficticia y otra para solicitar apoyo. Comenten alternativas sin compartir nombres ni cuentas.',
      outcome:
        'Formula un límite claro y una petición de ayuda; explica que una invitación aceptada puede interrumpirse si incomoda.',
      duration: '20 min',
    },
  },
];

export const ADULT_STORY_GUIDANCE_BY_RESOURCE: ReadonlyMap<string, AdultStoryGuidance> = new Map(
  ADULT_STORY_GUIDANCE.map((guidance) => [guidance.resourceId, guidance]),
);

