# 📖 Patrones de Diseño para Audiocuentos Ilustrados
### *Guía de Estructura de Páginas, Layout de Doble Página Responsiva y Audio (Desktop & Mobile)*

Este documento establece las especificaciones de diseño y la estructura técnica (HTML/CSS/TS) para la creación de **Audiocuentos Ilustrados** en la plataforma de Ciudadanía Digital Jalisco (orientado al segmento Preescolar de 3 a 6 años). Su objetivo es garantizar un formato de libro interactivo sin scroll vertical, con audio sincronizado y alta responsividad.

---

## 🎨 1. Concepto y Filosofía de Diseño
El audiocuento ilustrado emula un **libro físico premium** adaptado a pantallas digitales. Su diseño inspira calidez, utilizando texturas sutiles, bordes redondeados y un sistema tipográfico enfocado en la lectura fluida.

### Reglas Clave de Diseño:
1. **Cero Scroll Vertical (Desktop & Mobile):** Todo el contenido de la escena (ilustración, narración, diálogos y controles) debe encajar perfectamente en la altura visible del viewport.
2. **Layout de Doble Página en Escritorio:** Se divide en 2 secciones horizontales simétricas (Página Izquierda: Ilustraciones CSS animadas; Página Derecha: Título, texto y diálogos).
3. **Layout Vertical 50/50 en Mobile:** En pantallas táctiles (`≤640px`), las páginas se apilan verticalmente de forma automática (Mitad superior: Ilustración; Mitad inferior: Contenido de lectura con scroll interno independiente si el texto supera la altura).
4. **Diseño de Carta Flotante (Modal):** El contenedor principal no cubre toda la pantalla en escritorio; se centra como una tarjeta elegante con sombras profundas sobre el fondo institucional.

---

## 🏗️ 2. Estructura HTML Base (El Esqueleto)

Cualquier audiocuento debe seguir esta estructura exacta de etiquetas semánticas y clases (`ac-*`):

```html
<div class="ac-root">
  <div class="ac-shell">

    <!-- ═══ HEADER: Control de Audio y Marca ═══ -->
    <header class="ac-header">
      <div class="ac-brand">
        <div class="ac-mark">B</div>
        <div class="ac-brand-text">
          <span class="ac-brand-name">Ciudadanía Digital Jalisco</span>
          <span class="ac-brand-sub">Colección Preescolar · Audiocuento</span>
        </div>
      </div>
      <div class="ac-controls">
        <button (click)="toggleVoice()" class="ac-btn" [class.ac-btn--active]="voiceOn()">
          <span class="ac-btn-icon">{{ voiceOn() ? '🔊' : '🔇' }}</span>
          {{ voiceOn() ? 'Voz' : 'Silencio' }}
        </button>
        <button (click)="readPageManual()" class="ac-btn">
          <span class="ac-btn-icon">↻</span> Leer
        </button>
        <button (click)="readAllBook()" class="ac-btn ac-btn--highlight">
          <span class="ac-btn-icon">🎧</span> Cuento
        </button>
      </div>
    </header>

    <!-- ═══ MAIN STAGE: Páginas del Libro ═══ -->
    <main class="ac-stage">

      <!-- ──── PORTADA (Página 0) ──── -->
      <section class="ac-spread ac-cover" [class.ac-spread--visible]="cur() === 0">
        <div class="ac-cover-inner">
          <!-- Parte izquierda: Ilustración o arte principal -->
          <div class="ac-cover-art">
            <div class="ac-sky">
              <!-- Elementos decorativos absolutos -->
              <div class="ac-ground"></div>
            </div>
          </div>
          <!-- Parte derecha: Textos de introducción -->
          <div class="ac-cover-text">
            <span class="ac-kicker">3 a 6 años</span>
            <h1 class="ac-title">Título del Cuento</h1>
            <p class="ac-subtitle">Breve sinopsis del cuento...</p>
            <button (click)="startBook()" class="ac-start-btn">📖 Abrir el cuento</button>
          </div>
        </div>
      </section>

      <!-- ──── ESCENAS ESTÁNDAR (Páginas 1 a N) ──── -->
      <section class="ac-spread" [class.ac-spread--visible]="cur() === 1">
        <!-- Lado Izquierdo: Ilustración -->
        <div class="ac-page ac-page--left">
          <div class="ac-sky">
            <!-- Stickers, personajes (Bit, Data, etc.) y fondos -->
            <div class="ac-ground"></div>
          </div>
          <div class="ac-page-num">1</div>
        </div>

        <!-- Lomo o Unión del Libro -->
        <div class="ac-spine"></div>

        <!-- Lado Derecho: Texto y Diálogos -->
        <div class="ac-page ac-page--right">
          <h2 class="ac-scene-title">Título de la Escena</h2>
          <div class="ac-story">
            <p>Narración descriptiva del cuento...</p>
          </div>
          <div class="ac-dialogue">
            <!-- Burbujas de diálogo estilo chat/historieta -->
            <div class="ac-bubble">
              <div class="ac-avatar">🤖</div>
              <div class="ac-bubble-body">
                <strong>Bit</strong>
                <p>Diálogo escrito del personaje...</p>
              </div>
            </div>
          </div>
          <div class="ac-refrain">Estribillo o moraleja final repetible... 💗</div>
          <div class="ac-page-num">2</div>
        </div>
      </section>

      <!-- ──── PÁGINA FINAL DE ÉXITO ──── -->
      <section class="ac-spread ac-end-screen" [class.ac-spread--visible]="cur() === 6">
        <div class="ac-end-inner">
          <div class="ac-end-icon">🏆</div>
          <h2 class="ac-end-title">¡Cuento Completado!</h2>
          <p class="ac-end-subtitle">Felicitaciones...</p>
          <div class="ac-end-actions">
            <button (click)="goToPage(0)" class="ac-btn-restart">🔄 Volver a Leer</button>
            <button (click)="closeBook()" class="ac-btn-close">🚪 Cerrar Cuento</button>
          </div>
        </div>
      </section>

    </main>

    <!-- ═══ FOOTER: Progreso e Indicador de Páginas ═══ -->
    <footer class="ac-footer">
      <button [disabled]="cur() === 0" (click)="prevPage()" class="ac-nav-btn">← Anterior</button>

      <div class="ac-progress">
        <div class="ac-progress-dots">
          <!-- Dots dinámicos por página -->
          <button (click)="goToPage(0)" class="ac-dot" [class.ac-dot--active]="cur() === 0"></button>
          <!-- ... -->
        </div>
        <span class="ac-page-label">Páginas 1–2</span>
      </div>

      <button (click)="nextPage()" class="ac-nav-btn ac-nav-btn--next">
        {{ cur() === 6 ? 'Cerrar' : 'Siguiente' }} →
      </button>
    </footer>

  </div>
</div>
```

---

## 🎨 3. Estilos CSS Relevantes (El Chasis Visual)

El estilo visual utiliza gradientes suaves de fondo y tamaños de letra dinámicos basados en la anchura del contenedor (`clamp` con variables `vw`).

```css
/* Centrado del libro sobre el modal de fondo oscuro */
.ac-root {
  --warm-0: #fffcf5;
  --warm-1: #fdf6e3;
  --ink:    #2c1f0e;
  display: contents; /* Deja que el contenedor hijo (.ac-shell) se posicione en el modal */
}

/* Tarjeta flotante en Escritorio */
.ac-shell {
  width: min(1060px, 96vw);
  height: min(88vh, 820px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.4rem;
  background: linear-gradient(160deg, #f0e8d4 0%, #fdf5e1 45%, #ede0c4 100%);
  box-shadow: 0 48px 120px rgba(0,0,0,.45), 0 16px 48px rgba(0,0,0,.25);
}

/* Escalado de Tipografía en Escritorio */
.ac-scene-title {
  font-family: Georgia, serif;
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
}
.ac-story {
  font-family: Georgia, serif;
  font-size: clamp(.9rem, 1.7vw, 1.2rem);
  line-height: 1.52;
}
.ac-bubble-body p {
  font-family: Georgia, serif;
  font-size: clamp(.8rem, 1.45vw, 1.05rem);
}

/* ──────────────── RESPONSIVIDAD (MOBILE) ──────────────── */
@media (max-width: 640px) {
  /* Caja modal adaptada a pantallas táctiles */
  .ac-shell {
    width: min(96vw, 600px);
    height: min(92dvh, 820px);
    border-radius: 1.3rem;
  }

  /* Split vertical: Ilustración arriba (50% de alto), Texto abajo (50%) */
  .ac-spread {
    inset: .4rem .55rem;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2px 1fr; /* 50% arriba, 2px división, 50% abajo */
  }

  .ac-page--left  { grid-row: 1; grid-column: 1; }
  .ac-page--right { grid-row: 3; grid-column: 1; overflow-y: auto; } /* Scroll interno del texto si se requiere */

  /* El lomo del libro se convierte en una línea divisoria horizontal */
  .ac-spine {
    grid-row: 2;
    grid-column: 1;
    background: linear-gradient(90deg, transparent 0%, rgba(180,140,80,.4) 50%, transparent 100%);
  }

  /* Ajuste de fuentes móviles para evitar desbordes */
  .ac-scene-title { font-size: 1.05rem; }
  .ac-story       { font-size: .85rem; line-height: 1.45; }
  .ac-bubble-body p { font-size: .82rem; line-height: 1.38; }
  .ac-nav-btn      { font-size: .82rem; padding: .48rem 1rem; }
}
```

---

## ⚙️ 4. Lógica TypeScript e Integración de Audio (La Voz)

El controlador Angular gestiona el cambio de páginas y coordina el sintetizador de voz del navegador (`window.speechSynthesis`).

### Estructura de Datos para Diálogos (`.data.ts`):
Las narraciones y diálogos se estructuran en arreglos de diálogos con propiedades de control de la voz (`pause`, `rate`, `pitch`):

```typescript
export interface NarrationSegment {
  text: string;
  pause?: number; // ms de espera antes de la siguiente oración
  rate?: number;  // velocidad (0.82 estándar)
  pitch?: number; // tono de la voz (1.08 estándar)
}

export const NATURAL_NARRATIONS: NarrationSegment[][] = [
  [
    { text: "Bit brincaba de alegría.", pause: 560, rate: 0.8 },
    { text: "¡Mira, Data! Es Tuercas.", pause: 620, rate: 0.82 }
  ]
];
```

### Funciones Críticas en el Componente Angular:

1. **Selección Automática de Voces en Español (Naturales):**
   ```typescript
   private loadVoices(): void {
     if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
     const voices = window.speechSynthesis.getVoices();
     const spanish = voices.filter(v => /^es[-_]/i.test(v.lang) || /español|spanish/i.test(v.name));
     
     // Prioridad a voces con mejor acento natural de América Latina/España
     const preferred = [
       "Google español de México",
       "Google español latinoamericano",
       "Microsoft Dalia",
       "Paulina"
     ];
     this.preferredVoice = preferred
       .map(name => spanish.find(v => v.name.toLowerCase().includes(name.toLowerCase())))
       .find(Boolean) || spanish[0] || voices[0];
   }
   ```

2. **Limpieza de Emojis para la Lectura de Voz:**
   Para evitar que la síntesis de voz intente pronunciar emojis de los diálogos:
   ```typescript
   private clean(t: string): string {
     return String(t || "").replace(/[🤖🐦☁️👧⭐💗💔⚠️✓✕🐾✨🎨💬🛡️🏆🚪🔄]/g, "").trim();
   }
   ```

3. **Cierre Controlado del Widget Modal (Traspaso al Padre):**
   El componente busca y simula un clic en el botón de cerrar del contenedor del modal:
   ```typescript
   closeBook(): void {
     this.stopAudio();
     if (typeof document !== 'undefined') {
       const closeBtn = document.querySelector('.widget-modal-overlay button[aria-label="Cerrar"]');
       if (closeBtn) {
         (closeBtn as HTMLElement).click();
       }
     }
   }
   ```
