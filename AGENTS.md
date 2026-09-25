# Reglas y Comportamiento del Asistente (AGENTS.md)

## 1. No ejecutar builds ni comandos innecesarios tras editar código
- **PROHIBIDO ejecutar builds (`yarn build`, `npm run build`, `ng build`), tests o comandos pesados de verificación tras editar archivos.**
- El IDE cuenta con guardado automático (*autosave*) y el servidor de desarrollo (`yarn start`) ya se encuentra en ejecución continua con recarga en caliente (*hot-reloading*). Al guardar los archivos, el usuario ve los cambios en el navegador de manera inmediata.
- No ejecutar comandos de terminal para "probar si compila" ni comandos de verificación a menos que el usuario lo solicite explícitamente.
- Mantener las respuestas directas, rápidas y concentradas en la edición de código y el contenido.
