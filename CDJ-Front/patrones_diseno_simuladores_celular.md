# 📱 Patrones de Diseño para Simuladores de Celular
### *Guía de Estructura de Dispositivo, Plantillas y Layouts (Desktop & Mobile)*

Este documento establece las especificaciones de diseño y la estructura técnica (HTML/CSS) para los simuladores basados en dispositivos móviles en la plataforma. Su propósito es asegurar la consistencia del chasis y la interactividad del "teléfono" tanto en pantallas móviles como en escritorio, separando el contenedor de hardware del contenido interno de las pantallas.

---

## 🎨 1. Concepto y Filosofía de Diseño
El simulador representa un chasis de celular moderno de alta gama (inspirado en un acabado de titanio y bordes curvos orgánicos) que encuadra las dinámicas interactivas (chats, feeds, portadas, alertas). 

### Regla de Oro: Separación de Capas
1. **El Contenedor (Chasis):** Es constante e inmutable. Contiene los botones físicos externos, la Isla Dinámica, la barra de estado superior y la barra de inicio inferior.
2. **Las Pantallas Internas:** Son dinámicas y modulares (se renderizan mediante directivas condicionales de Angular o enrutamiento dentro de `.screen`). La primera pantalla de cada simulador es la **Portada** o **Inbox**, seguida por los chats/juegos y finalizando con la pantalla de resultados.

---

## 🏗️ 2. Estructura HTML de la Plantilla Base (El Esqueleto)

Cualquier simulador de celular debe seguir esta jerarquía exacta de elementos HTML:

```html
<!-- Contenedor Principal (Flex Layout responsivo) -->
<div class="sim-layout">

  <!-- ─── WRAPPER DEL CELULAR ─── -->
  <div class="phone-wrap">
    <div class="phone">

      <!-- Botones de Hardware Externos (Chasis) -->
      <div class="hw-vol-top"></div>
      <div class="hw-vol-bot"></div>
      <div class="hw-power"></div>
      <div class="hw-action"></div>

      <!-- Pantalla Segura (Contenedor de Contenido) -->
      <div class="screen">

        <!-- Isla Dinámica (Hardware de Cámara) -->
        <div class="dynamic-island"></div>

        <!-- Barra de Estado (Reloj, Señal, WiFi, Batería) -->
        <div class="statusbar light">
          <span class="statusbar-time">18:02</span>
          <div class="icons">
            <!-- Señal Móvil -->
            <div class="signal">
              <span class="b b1"></span>
              <span class="b b2"></span>
              <span class="b b3"></span>
              <span class="b b4"></span>
            </div>
            <!-- WiFi Icono SVG -->
            <svg class="wifi" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-linecap="round">
              <path d="M1 3.5c4-3.3 10-3.3 14 0"/>
              <path d="M3.5 6.2c2.5-2 6.5-2 9 0"/>
              <path d="M6 9c1-0.8 3-0.8 4 0"/>
              <circle cx="8" cy="11.2" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
            <!-- Batería -->
            <div class="battery">
              <div class="batt-level"></div>
            </div>
          </div>
        </div>

        <!-- ─── PANTALLA DE CONTENIDO (DINÁMICO) ─── -->
        <div class="screen-content">
          <!-- Aquí se renderizan la Portada, el Chat o las pantallas del juego -->
        </div>
        <!-- ──────────────────────────────────────── -->

      </div><!-- /screen -->

      <!-- Barra de Inicio (Home Indicator del Sistema) -->
      <div class="home-bar"></div>

    </div><!-- /phone -->
  </div><!-- /phone-wrap -->

  <!-- ─── ASIDE: PANEL DEL TUTOR/COACH (Solo visible en Desktop) ─── -->
  <aside class="coach-side">
    <div class="coach-head">
      <h2>🧠 Tu detector</h2>
      <p>Retroalimentación en tiempo real sobre tus decisiones.</p>
    </div>
    <div class="alert-stack">
      <!-- Mensajes explicativos del Coach -->
    </div>
  </aside>

</div><!-- /sim-layout -->
```

---

## 🎨 3. Estilos Base del Chasis (CSS)

El chasis del teléfono no debe verse afectado por el diseño del juego o el chat interior. Los siguientes estilos CSS definen la carcasa de titanio y la disposición responsiva:

```css
/* Variables y Fuentes */
:host {
  --titanium-gradient: linear-gradient(145deg, #a8a8a8 0%, #6e6e73 10%, #3a3a3c 30%, #1c1c1e 50%, #3a3a3c 70%, #6e6e73 90%, #a8a8a8 100%);
  --phone-width: 360px;
  --phone-max-height: 660px;
  --font-system: ui-rounded, "SF Pro Rounded", system-ui, sans-serif;
  display: block;
}

/* 1. Responsividad Global (Desktop vs Mobile) */
.sim-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
}

/* En pantallas pequeñas, el celular toma el protagonismo y el coach se oculta/adapta */
@media (max-width: 768px) {
  .sim-layout {
    flex-direction: column;
    align-items: center;
  }
  .coach-side {
    display: none; /* En móvil, la retroalimentación se muestra como overlay flotante en la pantalla del celular */
  }
}

/* 2. El Chasis del Celular */
.phone {
  width: var(--phone-width);
  max-width: 92vw;
  background: var(--titanium-gradient);
  border-radius: 50px;
  padding: 12px;
  position: relative;
  box-shadow:
    0 0 0 0.5px rgba(255,255,255,.12) inset,
    0 0 0 1px rgba(0,0,0,.6),
    0 24px 60px rgba(0,0,0,.55),
    0 4px 12px rgba(0,0,0,.35);
}

/* Botones de Hardware (Absolutos al chasis) */
.hw-vol-top, .hw-vol-bot, .hw-action, .hw-power {
  position: absolute;
  width: 3.5px;
  background: linear-gradient(to right, #5a5a5e, #8e8e93);
  border-radius: 2px;
}
.hw-action { left: -3.5px; top: 80px; height: 28px; }
.hw-vol-top { left: -3.5px; top: 118px; height: 34px; }
.hw-vol-bot { left: -3.5px; top: 164px; height: 34px; }
.hw-power { right: -3.5px; top: 130px; height: 72px; background: linear-gradient(to left, #5a5a5e, #8e8e93); }

/* 3. La Pantalla (Screen) */
.screen {
  background: #000; /* Fondo por defecto antes de cargar pantallas */
  border-radius: 40px;
  overflow: hidden;
  height: min(calc(100vh - 32px), var(--phone-max-height));
  min-height: 480px;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

/* Reflejo del Cristal Superior */
.screen::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 50%; height: 100%;
  background: linear-gradient(115deg, rgba(255,255,255,.06) 0%, transparent 60%);
  pointer-events: none;
  z-index: 99;
  border-radius: 40px 0 0 40px;
}

/* 4. Isla Dinámica */
.dynamic-island {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 118px;
  height: 34px;
  background: #000;
  border-radius: 20px;
  z-index: 30;
  box-shadow: 0 0 0 0.5px rgba(255,255,255,.06), inset 0 0 8px rgba(0,0,0,.8);
}

/* 5. Barra de Inicio */
.home-bar {
  width: 36%;
  height: 5px;
  background: rgba(255,255,255,.28);
  border-radius: 10px;
  margin: 8px auto 0;
}
```

---

## ⚡ 4. Comportamiento Responsivo (Desktop vs Mobile)

> [!IMPORTANT]
> **No confundir el chasis del celular con su contenido.** El chasis mantiene su relación de aspecto, tamaño de pantalla y posición independientemente de la resolución física del monitor o celular del usuario real.

### Visualización en Escritorio (Desktop)
*   Se utiliza un contenedor horizontal de dos columnas (`.sim-layout`).
*   **Izquierda/Derecha:** El celular `.phone` está en un lado, y el panel lateral `.coach-side` (de unos `320px` a `400px` de ancho) está en el otro. Esto balancea la interfaz y evita que el simulador se sienta vacío en una pantalla ancha.

### Visualización en Móvil (Mobile)
*   El panel lateral `.coach-side` se oculta completamente mediante media-queries.
*   Para evitar perder los comentarios del coach/tutor, los comentarios del coach se transforman en una ventana modal o un panel flotante inferior (`.mobile-feedback-panel`) **que se renderiza de forma absoluta dentro de la pantalla del celular simulado (`.screen`)**.
*   Esto asegura una inmersión completa sin romper la metáfora de estar usando un teléfono real.

---

## 🎰 5. Próximo Paso: La Portada Gamer/Casino (Simulador de Fraudes)

Una vez asegurada la estructura del celular, el diseño de la **Portada** del *Simulador de Fraudes* se basará en un estilo **animado/gamer tipo anuncio de casino**.

### Elementos Clave del Estilo Visual:
1. **Fondo Energético:** Un patrón de rayos solares o degradado radial vibrante en tonos verdes, con efectos de destellos (sunburst).
2. **Tipografía Cómic 3D:**
   *   Títulos gigantes y curvos, con volumen 3D y colores de alto contraste (amarillos, rosas, cianes).
   *   Contornos negros super gruesos y sombras proyectadas paralelas.
3. **Detalles y Decoración:**
   *   Pequeñas estrellas amarillas brillantes de 4 o 5 puntas alrededor del título.
   *   Icono central con estilo de sticker amigable (un control de videojuegos púrpura con contorno blanco y destellos).
4. **Botones de Llamado a la Acción (CTA):**
   *   Formas redondeadas tipo cápsula con bordes gruesos negros.
   *   Estilo burbuja/glossy (brillo superior tridimensional).
   *   Botón principal destacado con textos en mayúsculas extra-gruesas ("ENTRAR AL FEED").

---

*Esta plantilla técnica asegura que el comportamiento responsivo del dispositivo esté aislado de los experimentos visuales y temáticos que realicemos dentro de la pantalla.*
