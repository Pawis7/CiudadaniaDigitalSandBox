# Presentación de las tres experiencias por etapa

Base de integración: ea30a4486cfd328e200c54855dce2635e23d83d0.

- Usa los banners e imágenes existentes del portal, según perfil; no reemplaza ni fabrica logotipos.
- Conserva los siete casos, sus objetivos, respuestas y las 21 variantes.
- La advertencia imprescindible está dentro de una caja; acompañamiento y precisión de edad siguen disponibles antes del caso. Los detalles secundarios se despliegan.
- Las guías se giran al pasar el puntero, al pulsar, al tocar o con Enter/Espacio. El giro no depende exclusivamente del hover y respeta movimiento reducido.
- Solo la pregunta activa existe en la interfaz. Seleccionar una respuesta revela la retroalimentación; Continuar avanza con deslizamiento. No se oculta la explicación con un salto automático.
- Se conserva la respuesta al retroceder. La etapa, el contexto y el enfoque se conservan al volver al perfil.
- El cierre solo aparece tras las dos situaciones. Terminar no acredita aprendizaje ni autoriza acceso a servicios.
- La orientación «Si ocurre algo real» se distingue de la actividad y no se convierte en un canal de denuncias.
- La impresión contiene las dos situaciones, las pistas, el cierre y la guía adulta completa, independientemente del paso visible.
- No se agregan cuentas, formularios de datos, herramientas de IA ni reproductores externos.

Pruebas: `npm run build -- --output-path=dist/stage-check`; instalar Playwright de forma aislada, copiar `scripts/check-stage-delivery.mjs` a ese entorno y ejecutarlo desde CDJ-Front. `BASE_URL` permite probar el portal publicado. El informe se guarda en `artifacts/stage-delivery`.

No sustituye la validación institucional ni la observación pedagógica con estudiantes.
