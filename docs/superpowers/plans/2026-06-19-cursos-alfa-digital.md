# Cursos Alfa Digital — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Duplicar Ciudadanía Digital (CDJ) a un proyecto independiente "Cursos Alfa Digital" (CAD) y reorientar el front a una plataforma de cursos estilo Kaggle Learn, con paleta institucional rojo/amarillo y progreso de lecciones en localStorage.

**Architecture:** Copia limpia de `CDJ-Front` (Angular 21 + Tailwind v4) y `CDJ-Back` (Next.js 15 + Prisma 6 + Postgres) a una carpeta hermana `CursosAlfaDigital/`, con git nuevo. Rebrand total de strings/puertos/DB para coexistir con CDJ. El back se conserva (el modelo `Course` ya sirve). El front gana una vista de detalle de curso `/cursos/:slug` y un `ProgressService` que persiste lecciones completadas en localStorage sin login.

**Tech Stack:** Angular 21 standalone components + signals, Tailwind CSS v4, vitest (front). Next.js 15 + Prisma 6 + PostgreSQL/Docker (back). yarn (front), npm (back).

## Global Constraints

- Carpeta destino: `/Users/mac/Desktop/CursosAlfaDigital/` con `CAD-Front` y `CAD-Back`. Git nuevo (sin historial CDJ).
- Rebrand: `cdj`/`CDJ` → `cad`/`CAD`; "Ciudadanía Digital" / "Ciudadanía Digital Jalisco" → "Cursos Alfa Digital"; ruta `/AlfaAdminLogin` se conserva tal cual.
- Puertos para coexistir con CDJ: back Next `4280` (CDJ usa 4180), Postgres `5433` (CDJ usa 5432).
- DB/credenciales: nombre `cad`, usuario `cad`, password `cad_dev`, containers `cad_*`.
- localStorage keys: `cad_api_base_v1`, `cad_admin_token_v1`, y nuevo `cad_progress_v1`.
- Paleta: institucional crimson `#E9004C` + amarillo/ámbar (Secretaría). NO cyan. Se adopta el layout estilo Kaggle, no el color.
- Stack sin dependencias nuevas (YAGNI): no Redis, no reverse-proxy, no librerías extra.
- `lessonId` estable = `"<unitIndex>.<lessonIndex>"` (las lecciones no tienen id propio; se identifican por posición).
- Datos de cursos siguen viniendo de `special-sections.data.ts` (local), no del API.

---

### Task 1: Copia del proyecto + git nuevo

**Files:**
- Create: `/Users/mac/Desktop/CursosAlfaDigital/CAD-Front/` (copia de `CDJ-Front` sin `node_modules`, `.angular`, `dist`, `.git`)
- Create: `/Users/mac/Desktop/CursosAlfaDigital/CAD-Back/` (copia de `CDJ-Back` sin `node_modules`, `.git`)

**Interfaces:**
- Produces: árbol de proyecto `CursosAlfaDigital/` con `CAD-Front` y `CAD-Back`, repo git inicializado.

- [ ] **Step 1: Crear carpeta y copiar front y back excluyendo artefactos pesados**

```bash
SRC=/Users/mac/Desktop/CiudadaniaDigitalSandBox
DST=/Users/mac/Desktop/CursosAlfaDigital
mkdir -p "$DST"
rsync -a --exclude node_modules --exclude .angular --exclude dist --exclude dist-docs \
  --exclude .git --exclude '.DS_Store' "$SRC/CDJ-Front/" "$DST/CAD-Front/"
rsync -a --exclude node_modules --exclude .git --exclude '.DS_Store' \
  --exclude tsconfig.tsbuildinfo "$SRC/CDJ-Back/" "$DST/CAD-Back/"
```

- [ ] **Step 2: Verificar que se copió la estructura clave**

Run: `ls /Users/mac/Desktop/CursosAlfaDigital/CAD-Front/src/app && ls /Users/mac/Desktop/CursosAlfaDigital/CAD-Back/src/app/api`
Expected: lista las secciones del front (cursos, inicio, …) y las rutas del API (cursos, auth, …). Sin error.

- [ ] **Step 3: Inicializar git nuevo en la raíz del proyecto**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
printf 'node_modules/\ndist/\n.angular/\n*.tsbuildinfo\n.DS_Store\n.env\n' > .gitignore
git init -q && git add -A && git commit -q -m "chore: copia inicial de CDJ como Cursos Alfa Digital"
```

- [ ] **Step 4: Verificar commit inicial**

Run: `cd /Users/mac/Desktop/CursosAlfaDigital && git log --oneline -1`
Expected: muestra el commit "chore: copia inicial…".

---

### Task 2: Rebrand del backend (strings, puertos, DB, containers)

**Files:**
- Modify: `CAD-Back/package.json` (scripts `dev`/`start`: `-p 4180` → `-p 4280`; `name` y `description`)
- Modify: `CAD-Back/.env` (`DATABASE_URL`, `PUBLIC_BASE_URL`)
- Modify: `CAD-Back/docker-compose.yml` (puertos, container_name, `POSTGRES_DB`, credenciales)
- Modify: `CAD-Back/prisma/schema.prisma` (comentario de cabecera)
- Modify: `CAD-Back/prisma/seed.ts` y `CAD-Back/src/**` (strings "Ciudadanía Digital" / `cdj`)

**Interfaces:**
- Produces: back que levanta en `:4280` contra Postgres `:5433` DB `cad`.

- [ ] **Step 1: Reemplazar puerto del back en package.json**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back
sed -i '' 's/-p 4180/-p 4280/g' package.json
sed -i '' 's/"name": "cdj-back"/"name": "cad-back"/' package.json
sed -i '' 's#API REST para Ciudadanía Digital Jalisco#API REST para Cursos Alfa Digital#' package.json
```

- [ ] **Step 2: Reescribir .env con DB y puerto nuevos**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back
sed -i '' 's#postgresql://cdj:cdj_dev@127.0.0.1:5432/cdj#postgresql://cad:cad_dev@127.0.0.1:5433/cad#' .env
sed -i '' 's#http://127.0.0.1:4180#http://127.0.0.1:4280#g' .env
```

- [ ] **Step 3: Reescribir docker-compose (puertos, containers, credenciales)**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back
sed -i '' -e 's/cdj_db_local/cad_db_local/g' -e 's/cdj_api_local/cad_api_local/g' \
  -e 's/cdj_studio_local/cad_studio_local/g' -e 's/cdj_pgadmin/cad_pgadmin/g' \
  -e 's/POSTGRES_DB: cdj/POSTGRES_DB: cad/' \
  -e 's/POSTGRES_USER: cdj/POSTGRES_USER: cad/' \
  -e 's/POSTGRES_PASSWORD: cdj_dev/POSTGRES_PASSWORD: cad_dev/' \
  -e 's#postgresql://cdj:cdj_dev@db:5432/cdj#postgresql://cad:cad_dev@db:5432/cad#g' \
  -e 's/"5432:5432"/"5433:5432"/' -e 's/"4180:4180"/"4280:4280"/' docker-compose.yml
```

Nota: si `docker-compose.yml` define `POSTGRES_USER`/`POSTGRES_PASSWORD` con otros nombres exactos, ajustar el sed tras leer el archivo. Verificar en el Step siguiente.

- [ ] **Step 4: Reemplazar strings de marca en seed y código del back**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back
grep -rl 'Ciudadanía Digital Jalisco' src prisma 2>/dev/null | xargs -I{} sed -i '' 's/Ciudadanía Digital Jalisco/Cursos Alfa Digital/g' {} 2>/dev/null || true
grep -rl 'Ciudadanía Digital' src prisma 2>/dev/null | xargs -I{} sed -i '' 's/Ciudadanía Digital/Cursos Alfa Digital/g' {} 2>/dev/null || true
```

- [ ] **Step 5: Verificar que no quedan puertos viejos ni DB vieja**

Run:
```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back && \
grep -rnE '4180|5432:5432|cdj_dev|/cdj\?|POSTGRES_DB: cdj' . --include='*.json' --include='*.yml' --include='.env' 2>/dev/null
```
Expected: sin resultados (exit 1 / vacío). Si algo aparece, corregir a mano.

- [ ] **Step 6: Levantar Postgres y back para validar arranque**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back
npm install
npm run db:up
npm run db:generate && npm run db:migrate && npm run db:seed
npm run dev &
sleep 6
curl -s http://localhost:4280/api/health
```
Expected: `db:up` crea container `cad_db_local` en `:5433`; `curl` a `/api/health` responde 200/JSON OK. Detener el `npm run dev` (`kill %1`) tras verificar.

- [ ] **Step 7: Commit**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "chore(back): rebrand a CAD — puerto 4280, db cad:5433, strings de marca"
```

---

### Task 3: Rebrand del frontend (strings de marca, prefijos cdj, API base)

**Files:**
- Modify: `CAD-Front/package.json` (`name`)
- Modify: `CAD-Front/src/app/core/services/api.config.ts` (`API_BASE` puerto, keys localStorage `cdj_*` → `cad_*`)
- Modify: `CAD-Front/src/app/app.routes.ts` (títulos "· Ciudadanía Digital" → "· Cursos Alfa Digital")
- Modify: `CAD-Front/src/index.html` (`<title>`)
- Modify: todos los archivos del front con el string "Ciudadanía Digital"
- Rename: `CAD-Front/src/app/shared/cdj-logo/` → `cad-logo/` (carpeta, archivos, selector, clase)

**Interfaces:**
- Consumes: árbol `CAD-Front` de Task 1.
- Produces: front sin strings "Ciudadanía Digital"/`cdj` visibles; `API_BASE` apunta a `:4280/api`.

- [ ] **Step 1: Cambiar puerto del API y keys de localStorage**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front
sed -i '' "s#http://localhost:4180/api#http://localhost:4280/api#" src/app/core/services/api.config.ts
sed -i '' -e "s/cdj_api_base_v1/cad_api_base_v1/g" -e "s/cdj_admin_token_v1/cad_admin_token_v1/g" \
  $(grep -rl 'cdj_api_base_v1\|cdj_admin_token_v1' src)
```

- [ ] **Step 2: Reemplazar strings de marca en todo el front**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front
grep -rl 'Ciudadanía Digital' src 2>/dev/null | xargs -I{} sed -i '' 's/Ciudadanía Digital/Cursos Alfa Digital/g' {}
sed -i '' 's/"name": "cdj-front"/"name": "cad-front"/' package.json
```

- [ ] **Step 3: Renombrar el componente de logo cdj-logo → cad-logo**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front/src/app/shared
git mv cdj-logo cad-logo 2>/dev/null || mv cdj-logo cad-logo
cd cad-logo
for f in cdj-logo*; do mv "$f" "${f/cdj-logo/cad-logo}"; done
# Actualizar selector, clase y refs internas
sed -i '' -e 's/cdj-logo/cad-logo/g' -e 's/CdjLogo/CadLogo/g' *.ts *.html 2>/dev/null
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front
grep -rl 'cdj-logo\|CdjLogo' src | xargs -I{} sed -i '' -e 's/cdj-logo/cad-logo/g' -e 's/CdjLogo/CadLogo/g' {}
```

- [ ] **Step 4: Verificar que no quedan referencias viejas**

Run:
```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && \
grep -rnE 'Ciudadanía Digital|cdj-logo|CdjLogo|4180|cdj_api_base_v1' src index.html 2>/dev/null
```
Expected: vacío. Cualquier hit se corrige a mano.

- [ ] **Step 5: Instalar deps y compilar el front**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front
yarn install
yarn build
```
Expected: build de Angular termina sin errores.

- [ ] **Step 6: Commit**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "chore(front): rebrand a CAD — strings, api base :4280, logo cad-logo"
```

---

### Task 4: ProgressService (progreso de lecciones en localStorage) — TDD

**Files:**
- Create: `CAD-Front/src/app/core/services/progress.service.ts`
- Test: `CAD-Front/src/app/core/services/progress.service.spec.ts`

**Interfaces:**
- Produces:
  - `lessonId(unitIndex: number, lessonIndex: number): string` → `"<unitIndex>.<lessonIndex>"`
  - `isLessonDone(slug: string, lessonId: string): boolean`
  - `toggleLesson(slug: string, lessonId: string): void`
  - `completedCount(slug: string): number`
  - `courseProgress(slug: string, totalLessons: number): number` → entero 0–100
  - Persiste en localStorage key `cad_progress_v1` con forma `{ [slug: string]: string[] }`.

- [ ] **Step 1: Escribir el test que falla**

```typescript
// progress.service.spec.ts
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let svc: ProgressService;
  beforeEach(() => {
    localStorage.clear();
    svc = new ProgressService();
  });

  it('lessonId compone posición unidad.leccion', () => {
    expect(svc.lessonId(0, 2)).toBe('0.2');
  });

  it('toggle marca y desmarca una lección', () => {
    expect(svc.isLessonDone('curso-x', '0.0')).toBe(false);
    svc.toggleLesson('curso-x', '0.0');
    expect(svc.isLessonDone('curso-x', '0.0')).toBe(true);
    svc.toggleLesson('curso-x', '0.0');
    expect(svc.isLessonDone('curso-x', '0.0')).toBe(false);
  });

  it('courseProgress redondea a porcentaje entero', () => {
    svc.toggleLesson('curso-x', '0.0');
    svc.toggleLesson('curso-x', '0.1');
    expect(svc.courseProgress('curso-x', 4)).toBe(50);
    expect(svc.courseProgress('curso-x', 0)).toBe(0);
  });

  it('persiste entre instancias vía localStorage', () => {
    svc.toggleLesson('curso-x', '1.0');
    const otra = new ProgressService();
    expect(otra.isLessonDone('curso-x', '1.0')).toBe(true);
    expect(localStorage.getItem('cad_progress_v1')).toContain('curso-x');
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && yarn test --run src/app/core/services/progress.service.spec.ts`
Expected: FAIL — `Cannot find module './progress.service'`.

- [ ] **Step 3: Implementar el servicio mínimo**

```typescript
// progress.service.ts
import { Injectable } from '@angular/core';

const KEY = 'cad_progress_v1';
type Store = Record<string, string[]>;

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private read(): Store {
    if (typeof localStorage === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Store; } catch { return {}; }
  }
  private write(s: Store): void {
    if (typeof localStorage === 'undefined') return;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }

  lessonId(unitIndex: number, lessonIndex: number): string {
    return `${unitIndex}.${lessonIndex}`;
  }
  isLessonDone(slug: string, lessonId: string): boolean {
    return (this.read()[slug] ?? []).includes(lessonId);
  }
  toggleLesson(slug: string, lessonId: string): void {
    const store = this.read();
    const done = new Set(store[slug] ?? []);
    done.has(lessonId) ? done.delete(lessonId) : done.add(lessonId);
    store[slug] = [...done];
    this.write(store);
  }
  completedCount(slug: string): number {
    return (this.read()[slug] ?? []).length;
  }
  courseProgress(slug: string, totalLessons: number): number {
    if (totalLessons <= 0) return 0;
    return Math.round((this.completedCount(slug) / totalLessons) * 100);
  }
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && yarn test --run src/app/core/services/progress.service.spec.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "feat(front): ProgressService — progreso de lecciones en localStorage"
```

---

### Task 5: Vista de detalle de curso `/cursos/:slug` (layout Kaggle Learn)

**Files:**
- Create: `CAD-Front/src/app/cursos/curso-detail.ts`
- Create: `CAD-Front/src/app/cursos/curso-detail.html`
- Modify: `CAD-Front/src/app/app.routes.ts` (agregar ruta `cursos/:slug` antes del `**`)
- Modify: `CAD-Front/src/app/cursos/cursos.html` (cada card enlaza a `/cursos/<slug>`)

**Interfaces:**
- Consumes: `COURSES` de `core/data/special-sections.data`, `Course`/`CourseUnit`/`CourseLesson` de `core/models/special-sections.models`, `ProgressService` de Task 4 (`lessonId`, `isLessonDone`, `toggleLesson`, `courseProgress`).
- Produces: ruta navegable `cursos/:slug` con temario + progreso.

- [ ] **Step 1: Agregar la ruta de detalle**

En `CAD-Front/src/app/app.routes.ts`, justo después del bloque `path: 'cursos'` y antes de `{ path: '**', redirectTo: '' }`, insertar:

```typescript
  {
    path: 'cursos/:slug',
    loadComponent: () => import('./cursos/curso-detail').then((m) => m.CursoDetailComponent),
    title: 'Curso · Cursos Alfa Digital',
  },
```

- [ ] **Step 2: Crear el componente de detalle**

```typescript
// curso-detail.ts
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { COURSES } from '../core/data/special-sections.data';
import { Course } from '../core/models/special-sections.models';
import { ProgressService } from '../core/services/progress.service';

@Component({
  selector: 'app-curso-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './curso-detail.html',
})
export class CursoDetailComponent {
  private route = inject(ActivatedRoute);
  protected progress = inject(ProgressService);

  protected slug = signal<string>(this.route.snapshot.paramMap.get('slug') ?? '');
  protected course = computed<Course | undefined>(() =>
    COURSES.find((c) => c.slug === this.slug()));

  protected totalLessons = computed(() =>
    (this.course()?.syllabus ?? []).reduce((n, u) => n + u.lessons.length, 0));

  // Tick para recomputar el % tras togglear (signals no observan localStorage)
  protected tick = signal(0);
  protected percent = computed(() => {
    this.tick();
    return this.progress.courseProgress(this.slug(), this.totalLessons());
  });

  protected lid(u: number, l: number): string { return this.progress.lessonId(u, l); }
  protected done(u: number, l: number): boolean {
    this.tick();
    return this.progress.isLessonDone(this.slug(), this.lid(u, l));
  }
  protected toggle(u: number, l: number): void {
    this.progress.toggleLesson(this.slug(), this.lid(u, l));
    this.tick.update((n) => n + 1);
  }

  protected levelLabel(): string {
    const map = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' } as const;
    const c = this.course();
    return c ? map[c.level] : '';
  }
}
```

- [ ] **Step 3: Crear el template (layout Kaggle, paleta institucional)**

```html
<!-- curso-detail.html -->
@if (course(); as c) {
  <section class="mx-auto max-w-6xl px-4 py-8">
    <a routerLink="/cursos" class="text-sm text-[#E9004C] hover:underline">← Volver a cursos</a>

    <!-- Portada -->
    <header class="mt-4 rounded-2xl bg-[#E9004C] p-8 text-white">
      <div class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <span class="rounded-full bg-white/20 px-3 py-1">{{ levelLabel() }}</span>
        @if (c.durationHours) {<span class="rounded-full bg-white/20 px-3 py-1">{{ c.durationHours }}h</span>}
        @if (c.certificate) {<span class="rounded-full bg-amber-400 px-3 py-1 text-amber-950">Con constancia</span>}
      </div>
      <h1 class="mt-3 text-3xl font-bold">{{ c.title }}</h1>
      <p class="mt-2 max-w-2xl text-white/90">{{ c.shortDescription }}</p>
      @if (c.instructor) {<p class="mt-3 text-sm text-white/80">Impartido por {{ c.instructor }}</p>}
    </header>

    <div class="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
      <!-- Temario -->
      <div>
        @if (c.longDescription) {<p class="mb-6 text-slate-700">{{ c.longDescription }}</p>}
        <h2 class="mb-4 text-xl font-bold text-slate-900">Temario</h2>
        @for (unit of c.syllabus; track unit.unit; let ui = $index) {
          <div class="mb-4 overflow-hidden rounded-xl border border-slate-200">
            <div class="bg-slate-50 px-4 py-3 font-semibold text-slate-800">{{ unit.unit }}</div>
            <ul>
              @for (lesson of unit.lessons; track lesson.title; let li = $index) {
                <li class="flex items-center gap-3 border-t border-slate-100 px-4 py-3">
                  <button type="button" (click)="toggle(ui, li)"
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition"
                    [class.border-emerald-500]="done(ui, li)" [class.bg-emerald-500]="done(ui, li)"
                    [class.border-slate-300]="!done(ui, li)"
                    [attr.aria-label]="done(ui, li) ? 'Marcar como pendiente' : 'Marcar como completada'">
                    @if (done(ui, li)) {<span class="text-xs text-white">✓</span>}
                  </button>
                  <span class="flex-1 text-slate-700" [class.line-through]="done(ui, li)"
                    [class.text-slate-400]="done(ui, li)">{{ lesson.title }}</span>
                  @if (lesson.durationMin) {<span class="text-xs text-slate-400">{{ lesson.durationMin }} min</span>}
                </li>
              }
            </ul>
          </div>
        }
      </div>

      <!-- Sidebar progreso + materiales -->
      <aside class="lg:sticky lg:top-6 h-fit space-y-6">
        <div class="rounded-xl border border-slate-200 p-5">
          <div class="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>Tu progreso</span><span class="text-[#E9004C]">{{ percent() }}%</span>
          </div>
          <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div class="h-full rounded-full bg-[#E9004C] transition-all" [style.width.%]="percent()"></div>
          </div>
        </div>
        @if (c.materials.length) {
          <div class="rounded-xl border border-slate-200 p-5">
            <h3 class="mb-3 text-sm font-semibold text-slate-700">Materiales</h3>
            <ul class="space-y-2">
              @for (m of c.materials; track m.label) {
                <li><a [href]="m.url" class="text-sm text-[#E9004C] hover:underline">{{ m.label }}</a></li>
              }
            </ul>
          </div>
        }
      </aside>
    </div>
  </section>
} @else {
  <section class="mx-auto max-w-3xl px-4 py-20 text-center">
    <p class="text-slate-600">Curso no encontrado.</p>
    <a routerLink="/cursos" class="mt-4 inline-block text-[#E9004C] hover:underline">Ver todos los cursos</a>
  </section>
}
```

- [ ] **Step 4: Enlazar las cards del catálogo al detalle**

En `CAD-Front/src/app/cursos/cursos.html`, hacer que el contenedor de cada card de curso sea un `routerLink`. Buscar el elemento que itera los cursos filtrados (`@for (course of filtered(); ...)`) y añadir al elemento clickeable de la card:

```html
[routerLink]="['/cursos', course.slug]"
```

(añadir `class="cursor-pointer"` si no lo tiene). `RouterLink` ya está importado en `cursos.ts`.

- [ ] **Step 5: Compilar y verificar que arranca**

Run:
```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && yarn build
```
Expected: build sin errores. (La validación visual se hace en Task 7.)

- [ ] **Step 6: Commit**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "feat(front): detalle de curso /cursos/:slug con temario y progreso"
```

---

### Task 6: Reskin estilo Kaggle del catálogo y home (paleta institucional)

**Files:**
- Modify: `CAD-Front/src/app/cursos/cursos.html` (cards: cover, badges nivel/duración, micro-barra de progreso)
- Modify: `CAD-Front/src/app/inicio/inicio.html` (reorientar foco a cursos: hero + grid de cursos protagonista)

**Interfaces:**
- Consumes: `ProgressService` (`courseProgress`) y `COURSES`.

- [ ] **Step 1: Inyectar ProgressService en CursosComponent para micro-progreso**

En `CAD-Front/src/app/cursos/cursos.ts`, agregar import y propiedad:

```typescript
import { inject } from '@angular/core';
import { ProgressService } from '../core/services/progress.service';
// dentro de la clase CursosComponent:
protected progress = inject(ProgressService);
protected coursePercent(c: Course): number {
  const total = (c.syllabus ?? []).reduce((n, u) => n + u.lessons.length, 0);
  return this.progress.courseProgress(c.slug, total);
}
```

- [ ] **Step 2: Reskin de las cards del catálogo**

En `cursos.html`, dentro de cada card de curso (el `@for (course of filtered())`), asegurar que muestre estilo Kaggle Learn con la paleta institucional: cover arriba, badge de nivel (rojo `#E9004C`), duración, y una micro-barra de progreso al pie:

```html
<div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
  <div class="h-full rounded-full bg-[#E9004C]" [style.width.%]="coursePercent(course)"></div>
</div>
```

Y los badges de nivel deben usar fondo `bg-[#E9004C] text-white` y los de "constancia" `bg-amber-400 text-amber-950`. Mantener los filtros existentes intactos.

- [ ] **Step 3: Reorientar el home a cursos**

En `inicio.html`, asegurar que tras el hero el primer bloque protagonista sea el grid/CTA de cursos (enlace a `/cursos`), con la paleta rojo/amarillo. No borrar las demás secciones; solo subir cursos como foco principal (reordenar para que cursos aparezca primero después del hero).

- [ ] **Step 4: Compilar**

Run: `cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && yarn build`
Expected: build sin errores.

- [ ] **Step 5: Commit**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "feat(front): reskin catálogo + home estilo Kaggle con paleta institucional"
```

---

### Task 7: Verificación visual end-to-end

**Files:** ninguno (validación).

- [ ] **Step 1: Levantar back y front**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Back && npm run db:up && npm run dev &
cd /Users/mac/Desktop/CursosAlfaDigital/CAD-Front && yarn start &
sleep 8
```
Expected: back en `:4280`, front en `:4200` (default `ng serve`).

- [ ] **Step 2: Validar en navegador (usar /verify o Playwright MCP)**

Verificar:
1. Home enfocado en cursos, marca "Cursos Alfa Digital", sin "Ciudadanía Digital".
2. `/cursos` muestra catálogo estilo Kaggle con paleta rojo/amarillo y filtros funcionando.
3. Click en una card lleva a `/cursos/<slug>` con temario.
4. Marcar lecciones actualiza la barra de progreso; recargar la página conserva el progreso (localStorage `cad_progress_v1`).
5. No hay choque de puertos con CDJ (si CDJ corre en paralelo, ambos responden).

- [ ] **Step 3: Commit final / cierre**

```bash
cd /Users/mac/Desktop/CursosAlfaDigital
git add -A && git commit -m "chore: verificación visual Cursos Alfa Digital" --allow-empty
```

---

## Self-Review

**Spec coverage:**
- Estructura copia limpia + git nuevo → Task 1 ✓
- Rebrand total back (strings/puertos/DB/containers) → Task 2 ✓
- Rebrand total front (strings/cdj/api base/logo) → Task 3 ✓
- Coexistencia puertos 4280/5433 → Tasks 2, 7 ✓
- Progreso localStorage sin login → Task 4 (ProgressService) ✓
- Detalle de curso `/cursos/:slug` con temario → Task 5 ✓
- Reskin catálogo + home estilo Kaggle, paleta institucional → Task 6 ✓
- Verificación visual + criterios de éxito → Task 7 ✓
- Fuera de alcance (cuentas usuario, API de cursos, certificados reales) → respetado (no aparece en tareas) ✓

**Placeholder scan:** Sin TODO/TBD. Código completo en cada paso. Los sed de docker-compose llevan nota de verificación porque dependen de nombres exactos en el archivo.

**Type consistency:** `ProgressService` define `lessonId/isLessonDone/toggleLesson/completedCount/courseProgress` (Task 4) y se consumen con esas mismas firmas en Tasks 5 y 6. `Course`/`CourseUnit`/`CourseLesson` provienen del modelo existente.
