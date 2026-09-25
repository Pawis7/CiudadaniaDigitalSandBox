# Pantallas Seguras · actualización editorial

Fecha de integración: 20 de septiembre de 2026.

## Alcance

Se actualiza la sección existente `/pantallas-seguras`, sin crear una página paralela. Se conserva el banner `CD_PantallasSeguras.webp`, el diseño editorial de filas y el comportamiento de los perfiles, cuentos, audios y actividades.

- Introducción explícita sobre los derechos de niñas, niños y adolescentes.
- Nota visible del artículo 37, fracción X, antes del índice, compartida con la respuesta correspondiente de preguntas frecuentes.
- Cuatro etapas de acompañamiento familiar. Primaria baja y primaria alta se distinguen dentro de 6 a 11 años.
- Las acciones por edad y las frases de conversación están identificadas como orientaciones educativas, no como citas de la ley.
- Las atribuciones de la Secretaría de Educación se separan de las correspondientes a los centros educativos.
- Los recursos enlazan a los perfiles y experiencias existentes. Los perfiles se seleccionan mediante `perfil` y las etapas mediante fragmentos, conforme a la navegación actual.
- Los contactos se consultan en `/ayuda`; esta sección no mantiene otra copia de los datos de atención.
- No se añaden botones de descarga para materiales inexistentes.

## Fuentes y pendientes que no deben presentarse como resueltos

Texto base: Ley para Garantizar los Derechos de Niñas, Niños y Adolescentes en Entornos Digitales del Estado de Jalisco y sus Municipios, Decreto 30168/LXIV/26.

https://congresoweb.congresojal.gob.mx/BibliotecaVirtual/legislacion/Leyes/Documentos_PDF-Leyes/Ley%20para%20Garantizar%20los%20Derechos%20de%20Ni%C3%B1as,%20Ni%C3%B1os%20y%20Adolescentes%20en%20Entornos%20Digitales%20del%20Estado%20de%20Jalisco%20y%20sus%20Municipios-050626.pdf

Publicación oficial enlazada: https://periodicooficial.jalisco.gob.mx/seccion/periodico/25227

1. Vigencia: el PDF consultado presenta una discrepancia entre el transitorio primero (día siguiente de la publicación) y la ficha final (vigencia: 15 de mayo de 2026; publicación: 2 de junio de 2026). La respuesta pública describe el transitorio sin resolver por cuenta propia la discrepancia ni fijar una fecha calculada. Antes de afirmar una fecha concreta, contrastar el decreto publicado y la orientación del área jurídica.
2. Protocolo especializado: no se acredita aquí su publicación o estado de implementación. El protocolo escolar enlazado se identifica como referencia institucional; no se presenta como sustituto del previsto en la nueva ley.
3. El artículo 37, fracción X, se presenta dentro de lo que el protocolo debe incluir. No se añaden excepciones no expresadas en esa disposición.
4. Las recomendaciones de UNICEF se identifican como orientación complementaria y se contextualizan con las disposiciones aplicables en Jalisco.

Estas notas son de mantenimiento; no forman parte del contenido público de la página.

## Validación técnica reproducible

El flujo `.github/workflows/pantallas-seguras.yml` compila la aplicación completa y ejecuta `scripts/check-pantallas-seguras.mjs` sobre la compilación real. Comprueba cuatro etapas, dos subetapas de primaria, diez recursos relacionados, seis preguntas frecuentes, teclado, enlaces y ausencia de desbordamiento horizontal en anchos de 1440, 900, 768, 390 y 320 píxeles. Conserva capturas y un informe JSON como artefactos de la ejecución.

Los resultados deben consultarse en la ejecución correspondiente; la existencia del flujo no implica que haya superado las pruebas.
