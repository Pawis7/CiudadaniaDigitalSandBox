# Requerimientos Técnicos — Plataforma Ciudadanía Digital

**Dirigido a:** Secretaría — Área de TI · **Elaborado por:** Equipo de desarrollo
**Fecha:** 2026-06-29 · **Versión:** 1.1

> Portal web **estático**: solo sirve archivos. Los videos se reproducen directamente desde
> **YouTube**, por lo que el almacenamiento, el ancho de banda y el streaming corren por su cuenta.
> La huella de infraestructura es **mínima**.

---

## Servidor de frontend — recurso a asignar

| Entrega | Recurso a solicitar |
|---------|---------------------|
| **Hosting estático / bucket + CDN** *(recomendado)* | **2 GB de almacenamiento** |
| **Máquina virtual** *(solo si TI entrega máquinas)* | **1 vCPU · 1 GB RAM · 10 GB de disco** |

> El sitio compilado pesa **< 200 MB**; el resto es margen de crecimiento.

---

## Lo que se necesita

| # | Recurso | Detalle |
|---|---------|---------|
| 1 | **Hosting estático + CDN** | Sirve el portal compilado. 2 GB de almacenamiento. |
| 2 | **Dominio / subdominio** | URL pública institucional (`.gob.mx`). |
| 3 | **Certificado SSL/TLS** | HTTPS obligatorio. Gratis y automático. |
| 4 | **Acceso a DNS** | Registros A / CNAME al hosting. |
| 5 | **Repositorio Git** | Versiona el portal y sus contenidos. |
| 6 | **Canal de YouTube** | Videos públicos o no listados. Ya existente. |

---

## Lo que NO se necesita

✕ Base de datos · ✕ Backend / API 24-7 · ✕ VM con CPU/RAM dedicada ·
✕ Almacenamiento de video · ✕ Ancho de banda de streaming · ✕ Cuentas de usuario

---

**Stack:** Angular 21 · Tailwind CSS · salida estática (`ng build` → `dist/`).
