# Diseño — Cursos Alfa Digital (CAD)

**Fecha:** 2026-06-19
**Origen:** Duplicado de Ciudadanía Digital Sandbox (CDJ).
**Objetivo:** Clonar CDJ a un proyecto independiente "Cursos Alfa Digital" y reorientar el front a una plataforma de cursos estilo Kaggle Learn, conservando la identidad cromática institucional (rojo + amarillo de la Secretaría).

## Contexto del origen

CDJ son dos proyectos en `/Users/mac/Desktop/CiudadaniaDigitalSandBox`:

- **CDJ-Front** — Angular 21 + Tailwind v4 (yarn). Componentes standalone. Secciones: inicio, cursos, series, edutips, juegos, recursos, audiencia, auth, ayuda, notebooks-ia, quienes-somos.
- **CDJ-Back** — Next.js 15 + Prisma 6 + PostgreSQL (Docker). API: auth(admin), content, cursos, juegos, learning-paths, notebooks-ia, resources, videos, images, upload, help.

Hallazgos clave:
- El modelo `Course` ya existe en Prisma (slug, title, shortDescription, longDescription, level, durationHours, instructor, `syllabus` JSON `[{unit, lessons:[{title,durationMin}]}]`, `materials`, tags, certificate, audience, etc.).
- El catálogo `/cursos` ya tiene filtros (nivel, audiencia, certificado, duración, orden) pero usa datos **locales** (`special-sections.data.ts`), no el API.
- **Falta** la página de detalle de curso (`/cursos/:slug`) y el seguimiento de progreso.
- Back en puerto `4180`, Postgres `5432`, DB/usuario/containers `cdj`/`cdj_*`.
- ~12 archivos del front contienen el string "Ciudadanía Digital".

## Decisiones (aprobadas por el usuario)

1. **Alcance front:** Reskin visual + plataforma de cursos de verdad (catálogo + detalle con módulos/lecciones + progreso). No rehacer todo desde cero.
2. **Duplicación:** Copia limpia + rebrand total (proyecto 100% independiente, git nuevo).
3. **Progreso:** Visual sin login, guardado en `localStorage`. No se agregan cuentas de usuario final ni se toca el back para auth.
4. **Paleta:** Institucional rojo + amarillo de la Secretaría (crimson `#E9004C` + ámbar/amarillo), NO cyan de Kaggle. Se adopta el **layout/estructura** de Kaggle, no su color.

## Arquitectura del proyecto duplicado

Nueva carpeta hermana: `/Users/mac/Desktop/CursosAlfaDigital/` con:

- `CAD-Front` — copia de CDJ-Front
- `CAD-Back` — copia de CDJ-Back

Git nuevo inicializado desde cero (sin historial de CDJ).

### Rebrand total

| Original | Nuevo |
|---|---|
| prefijos `cdj` / `CDJ` (ids, nombres internos) | `cad` / `CAD` |
| textos visibles "Ciudadanía Digital" / "...Jalisco" | "Cursos Alfa Digital" |
| DB `cdj`, user `cdj`, password `cdj_dev`, containers `cdj_*` | `cad`, `cad_*`, `cad_dev` |
| localStorage `cdj_api_base_v1`, `cdj_admin_token_v1` | `cad_api_base_v1`, `cad_admin_token_v1` |
| ruta admin `/AlfaAdminLogin` | se conserva (ya dice "Alfa") |

### Coexistencia con CDJ (sin choque de puertos)

Para poder correr ambos proyectos al mismo tiempo:

| Recurso | CDJ | CAD |
|---|---|---|
| Back (Next) | 4180 | **4280** |
| Postgres | 5432 | **5433** |
| DB name | cdj | cad |
| Containers | cdj_* | cad_* |

Archivos a tocar para puertos/DB: `CAD-Back/package.json` (scripts dev/start `-p 4280`), `CAD-Back/docker-compose.yml`, `CAD-Back/.env` (`DATABASE_URL`, `PUBLIC_BASE_URL`), `CAD-Front/src/app/core/services/api.config.ts` (`API_BASE` → `http://localhost:4280/api`).

## Rediseño del front — estilo Kaggle Learn, color institucional

### Home enfocado a cursos
Hoy el home es un portal institucional. Se reorienta para que el **grid de cursos sea el protagonista**: hero limpio (rojo/amarillo) + catálogo destacado. Se conservan las animaciones scroll-reveal existentes.

### Catálogo `/cursos`
Reskin de las cards al estilo Kaggle: cover, badges de nivel/duración, micro-barra de progreso. Se conservan los filtros ya existentes (nivel, audiencia, certificado, duración, orden).

### NUEVO `/cursos/:slug` — detalle de curso
Pieza que falta. Layout tipo Kaggle Learn:
- Portada (cover, título, instructor, nivel, duración, certificado).
- **Temario en módulos/lecciones** alimentado por `Course.syllabus`.
- Sidebar con progreso (barra + % completado) y lista de materiales (`Course.materials`).
- Botón "marcar lección como completada".

### Progreso visual sin login
- Lecciones completadas y % de avance por curso guardados en `localStorage` (key `cad_progress_v1`, estructura `{ [courseSlug]: string[] /* lessonIds completados */ }`).
- Un servicio Angular `ProgressService` encapsula leer/escribir/calcular %, para que las vistas no toquen `localStorage` directo.

### Identidad visual
- Paleta institucional: crimson `#E9004C` + amarillo/ámbar (los de la Secretaría).
- Cards limpias estilo Kaggle, jerarquía tipográfica clara. Se mantiene Tailwind v4 y la tipografía Garet existente.

## Qué se conserva igual (YAGNI)

- El back se copia tal cual (solo rebrand de strings/puertos/DB). El modelo `Course` ya sirve; no se cambia el esquema.
- Secciones extra (series, juegos, edutips, ayuda, notebooks-ia, recursos) se conservan pero **fuera del foco**: el nav principal gira en torno a Cursos. No se borran (se pueden retomar después).
- Sin Redis, reverse-proxy, ni dependencias nuevas innecesarias.
- Los datos de cursos siguen viniendo de los datos locales/seed por ahora; conectar el catálogo al API queda como mejora posterior.

## Componentes / unidades

- `ProgressService` (Angular) — única fuente de verdad del progreso en localStorage. API: `isLessonDone(slug, lessonId)`, `toggleLesson(slug, lessonId)`, `courseProgress(slug, totalLessons): number`. Testeable aislado.
- `CursoDetailComponent` (`/cursos/:slug`) — consume el curso (de datos locales por slug) + `ProgressService`. Renderiza temario y progreso.
- `CursosComponent` (existente) — reskin de cards + micro-progreso (lee `ProgressService`).
- `InicioComponent` (existente) — reorientado a cursos.

## Plan de construcción (orden)

1. Copiar carpeta CDJ → CAD, limpiar `.git`, `git init` nuevo.
2. Rebrand global: strings (`cdj`→`cad`, "Ciudadanía Digital"→"Cursos Alfa Digital"), puertos (4280/5433), DB (`cad`), containers, localStorage keys.
3. Verificar: back levanta en :4280, Postgres en :5433, front (`ng serve`) conecta a `:4280/api` y compila.
4. Reskin home + catálogo a estilo Kaggle (color institucional).
5. `ProgressService` + nueva vista `/cursos/:slug` con temario y progreso localStorage.
6. Verificación visual (`/verify`).

## Criterios de éxito

- `CursosAlfaDigital/` corre independiente y simultáneo con CDJ (sin choque de puertos/DB).
- No queda ningún string "Ciudadanía Digital" / "cdj" visible al usuario en el front de CAD.
- El catálogo y un detalle de curso se ven y se sienten estilo Kaggle, con paleta rojo/amarillo.
- El progreso de lecciones persiste al recargar (localStorage) sin login.

## Fuera de alcance

- Cuentas de usuario final / auth de alumnos.
- Certificados reales por usuario.
- Conectar el catálogo de cursos al API (queda como mejora futura).
- Rediseñar secciones no relacionadas a cursos (series, juegos, etc.).
