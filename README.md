# Portfolio (React + Vite)

Portfolio de una página con tu personaje como protagonista.

## Arrancar
```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # genera /dist para subir a Vercel, Netlify, etc.
```

## Dónde cambiar cosas
- **Textos, email, redes, habilidades, herramientas, proceso y casos de estudio:** `src/data/site.js`
- **CV:** pon tu archivo en `public/cv.pdf` (lo descarga el botón de la sección About)
- **Títulos de las secciones:** `sections` en `src/data/site.js` (nombre pequeño, título y entradilla), también el «Hablemos» del pie (`contact`).
- **Toques personales:** en `src/data/site.js`, `status` (etiqueta «Disponible para proyectos» de la portada), `facts` (datos curiosos de Sobre mí), `notes` (notas cortas junto a las secciones) y, en cada caso, `tags` y `type: 'web'`. Pon `null` para quitar una nota o la etiqueta.
- **Pantallas del carrusel 3D:** lista `screens` en `src/data/site.js` (añade `image` con tus capturas)
- **Título de la portada:** `heroTitle` en `src/data/site.js`
- **Personaje (portada y Sobre mí, vectorial):** los colores son variables CSS (`--char-ink`, `--char-light` y `--char-shade`) en `.character` de `src/styles.css` y las partes claras de la silla son transparentes; el color de la sudadera es `jacketColor` en `src/data/site.js`; `src/data/characterArt.js` se regenera con `node scripts/gen-character.mjs public/assets/img/personaje.svg`.
- **Casos de estudio:** lista `projects` en `src/data/site.js`, en el orden de la pila. Solo hacen falta `title`, `year`, `role` y `summary`; `duration`, `tools`, `description`, `problem`, `process`, `stack` y `metrics` son opcionales y, si faltan, esa parte no sale en el caso.
- **Imágenes y videos de proyectos:** `public/assets/img/` y `public/assets/video/`, y añade `cover: '/assets/img/x.webp'` o `video: '/assets/video/x.mp4'` al proyecto en `site.js` (en las pantallas del carrusel es `image`). Mejor horizontales (16:9 o 16:10): en tablet y móvil la imagen va abajo de la tarjeta, en apaisado.
- **Colores y tipografía:** variables al inicio de `src/styles.css`. Hay dos fuentes, incluidas vía @fontsource: Archivo Black para los títulos (`--font-display`) y Barlow para todo lo demás (`--font-text`). Los tamaños salen de la escala `--size-*` (de `--size-label` a `--size-display`).

> **Ojo:** las métricas de los casos de estudio de ejemplo (`metrics` en `site.js`) son inventadas. Cámbialas por datos reales de tus proyectos o elimínalas antes de publicar.

## Secciones
`Hero` (carrusel 3D de pantallas que gira solo, con el scroll y arrastrando; título que se dibuja; personaje al centro; mouse que baja a los casos) · `Work` (casos en pila: cada tarjeta se queda fija y la siguiente se apila encima) · `Process` · `About` · `Contact`.
Extras: cursor personalizado (`Cursor.jsx`) y scroll suave con Lenis (`App.jsx`).

Cada caso de estudio abierto tiene su propio enlace para compartirlo, por ejemplo `tusitio.com/#caso/app-de-salud`.

## Componentes de Rare UI
El contador animado de las métricas (`src/components/Metric.jsx`) y la píldora de progreso de abajo a la derecha vienen de [Rare UI](https://rareui.com). Están en `src/components/ui` y usan Tailwind solo dentro de esa carpeta (`src/tailwind.css`), así que no cambian el resto de estilos.
- Para añadir otro: `node scripts/get-rareui.mjs nombre-del-componente` (los nombres están en rareui.com/components).
- La licencia de Rare UI exige un enlace visible a rareui.com: está en el pie de página, no lo quites.

## Publicar
- **Vercel (lo más fácil):** entra en [vercel.com](https://vercel.com) con GitHub o con tu email → "Add New Project" → importa o sube esta carpeta. Framework: **Vite**, build: `npm run build`, carpeta de salida: `dist`.
- **Netlify:** ejecuta `npm run build` y arrastra la carpeta `dist` a [app.netlify.com/drop](https://app.netlify.com/drop).

Después de publicar, pon tu dominio real en `.env` (`VITE_SITE_URL`) y vuelve a hacer el build, para que la vista previa al compartir el enlace (imagen `public/og.png`, 1200×630) funcione.
