# CLAUDE.md — Ciudadanía Digital Sandbox

Guía de referencia rápida para este proyecto. Las instrucciones globales viven en `~/CLAUDE.md` y la memoria de auto-memory en `~/.claude/projects/-Users-mac-Desktop-CiudadaniaDigitalSandBox/memory/`.

## Contexto del proyecto
- **Cliente / iniciativa**: Ciudadanía Digital (CDJ) — portal institucional con audiencias segmentadas por sub-nivel.
- **Stack**: React/Next + Tailwind CSS + shadcn/ui.
- **Backend**: Replica el stack de Harisco Academy / Recreacademy (NO Supabase aquí).
- **Estilo visual**: Animaciones tipo Apple — parallax, scroll-driven, frame-to-frame, badges flotantes (validado por Yair).
- **Branch principal**: `main`. Branch de trabajo actual: `yair_dev`. Otro colaborador: `saul_dev`.

## Skills a la mano

Invoca con `/<nombre-skill>`. Las marcadas con ⭐ son las que más sirven en este proyecto.

### 🎨 Diseño y Frontend
| Skill | Cuándo usar |
|---|---|
| ⭐ `/frontend-design:frontend-design` | Componentes/páginas production-grade con buen taste por default. |
| ⭐ `/gpt-taste` | Animaciones scroll-driven, GSAP ScrollTrigger, pinning, scrubbing — **estilo Apple**. |
| ⭐ `/high-end-visual-design` | Bloquea defaults genéricos de IA (sombras feas, gradientes baratos). Aplicar antes de codear secciones premium. |
| ⭐ `/redesign-existing-projects` | Auditar una sección existente del portal y subirla a calidad premium sin romper. |
| `/design-taste-frontend` | Reglas métricas estrictas (spacing, type scale, hardware-accelerated CSS). |
| `/stitch-design-taste` | Generar `DESIGN.md` con reglas anti-genérico, asimetría editorial. |
| `/minimalist-ui` | Cuando una sección necesita editorial limpio (monocromo, sin gradientes). |
| `/industrial-brutalist-ui` | Solo si una sub-página quiere look declassified/dashboard pesado. |
| `/image-to-code` | Primero genero imagen de diseño, la analizo y luego la codeo lo más fiel posible. |
| `/imagegen-frontend-web` | Generar referencias visuales antes de implementar (hero, landing, comps). |
| `/imagegen-frontend-mobile` | Para vistas mobile del portal. |
| `/brandkit` | Si surge necesidad de board de marca / sistema de logo. |

### 🛠️ Workflow de desarrollo
| Skill | Cuándo usar |
|---|---|
| ⭐ `/feature-dev:feature-dev` | Features no triviales — planifica arquitectura antes de codear. |
| ⭐ `/verify` | Después de un cambio: corre la app y valida visualmente, no solo tests. |
| ⭐ `/code-review` | Review + fixes en código modificado recientemente. |
| `/run` | Lanzar la app y ver el cambio en vivo. |
| `/review` | Review de un PR completo. |
| `/security-review` | Antes de mergear a `main` cambios sensibles. |

### ⚙️ Quality of life
| Skill | Cuándo usar |
|---|---|
| `/fewer-permission-prompts` | Reducir popups de permisos repetitivos en este proyecto. |
| `/full-output-enforcement` | Forzar salida completa cuando el LLM tiende a truncar. |
| `/init` | (Ya ejecutada — generó este archivo). |
| `/schedule` / `/loop` | Tareas recurrentes (poll de deploy, recordatorios). |

## Atajos sugeridos al iniciar sesión
1. Si tocas UI nueva → arranca con `/imagegen-frontend-web` o `/image-to-code`.
2. Si refactorizas sección vieja → `/redesign-existing-projects`.
3. Animaciones de scroll → `/gpt-taste`.
4. Cierre antes de PR → `/code-review` + `/verify` + `/security-review`.

## Reglas específicas del proyecto
- **NO** introducir Supabase (replicar stack de Harisco/Recreacademy).
- Banner hero principal (`.main-hero`): altura fluida `clamp(260px, 22vw, 360px)` con `object-contain` + fondo crimson `#E9004C` matching para que no se recorte la imagen. (La regla previa de altura fija 423px del commit `b0d8d645` fue relajada el 2026-05-25.) Otros heroes (`.hero-aud`, `.catalog-hero`) sí siguen en 423px estrictos.
- Tipografía: **Garet** (reemplazó a Work Sans en commits `81037a25` / `6e8ce183`).

## Especificaciones de Diseño y Secciones Pendientes

### 5. Detalle de producto (Ficha de Recurso)
- **Propósito de la sección**: Explicar de forma clara qué contiene cada recurso, qué aprenderá la persona y cómo puede usarlo en casa, aula o sitio web.
- **Componentes y Textos Sugeridos**:
  - **Título**: (Ejemplo: *¿Qué cosas no se comparten ni por juego?*)
  - **Descripción breve**: (Ejemplo: *Aprende qué información personal no debemos compartir en internet, incluso en juegos, redes sociales o aplicaciones.*)
  - **Lo que aprenderás**: (Ejemplo: *Al finalizar este recurso podrás identificar información personal que no debe compartirse, reconocer situaciones de riesgo y tomar decisiones más seguras para proteger tu privacidad.*)
  - **Botones de acción**:
    - *Iniciar recurso*
    - *Guardar*
    - *Descargar materiales*
    - *Compartir*

