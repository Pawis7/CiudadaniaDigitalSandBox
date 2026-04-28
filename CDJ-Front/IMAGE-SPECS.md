# Especificaciones de imágenes — Ciudadanía Digital

Tamaños recomendados (en px) para que los diseñadores entreguen archivos listos para mapear sin recortes feos. Todas en formato **WebP** o **JPG** optimizado, < 250 KB cada una. Para logos y gráficos usar **PNG transparente** o **SVG**.

| Slot                | Recomendado     | Aspect | Notas |
|---------------------|-----------------|--------|-------|
| `hero-main`         | **1600 × 1200** | 4:3    | Cara visible: tercio derecho. Lado izquierdo se cubre con gradiente blanco en mobile/lg. |
| `category-{slug}`   | **800 × 960**   | 5:6    | Vertical. Cara visible en tercio inferior (allí va el título sobreimpreso). 4 imágenes. |
| `series-cover-{id}` | **1600 × 1000** | 16:10  | La portada va detrás del título de la serie. Sin texto en la imagen. |
| `feature-{id}`      | **400 × 400**   | 1:1    | Recorte cuadrado, fondo neutro. Va dentro de la card como mini-thumbnail. |
| `cta-banner`        | **1920 × 900**  | 64:30  | Atmosférica. Se oscurece al 30% y se le aplica overlay azul/violeta/rosa. |
| `logo-square`       | **512 × 512**   | 1:1    | PNG/SVG. Fondo transparente. Visible sobre claro y oscuro. |
| `pillar-{id}`       | **400 × 400**   | 1:1    | Opcional, hoy son iconos. Si se sustituyen por foto, este es el tamaño. |
| `og-share`          | **1200 × 630**  | 1.91:1 | Para compartir en redes (Open Graph). |

## Reglas para diseñadores

1. **Espacio seguro**: dejar 12% de margen en todos los lados sin elementos críticos.
2. **Texto en imagen**: NO. El texto va sobreimpreso desde el código para internacionalización futura.
3. **Color**: paleta del sitio — teal `#0F766E`, violet `#8B80C1`, pink `#F2746B`, slate `#0F172A`. Si la foto es muy saturada, llega un overlay duotone desde CSS.
4. **Personas**: contacto visual, sonrisa natural, sin estereotipos. Diversidad real (edad, género, fenotipo).
5. **Tecnología**: dispositivos modernos pero sin marcas visibles.

## Cómo cambiar imágenes desde la UI (sin tocar código)

1. En el header presiona el botón **"Editar"** (ícono lápiz).
2. Cada imagen mostrará un botón **"Modificar"**.
3. Click → seleccionar archivo desde tu máquina.
4. La imagen queda guardada en tu navegador (`localStorage`). Útil para previsualizar versiones.
5. **"Restablecer"** vuelve a la imagen original.
6. **"Restablecer todas"** (icono ⟳ en header) limpia todos los overrides.

> Cuando esté listo el back, este mismo botón va a subir el archivo al servidor.
