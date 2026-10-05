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
- **Pantallas del carrusel 3D:** lista `screens` en `src/data/site.js` (añade `image` con tus capturas)
- **Título y textos curvos de la portada:** `heroTitle`, `captionLeft`, `captionRight` en `src/data/site.js`
- **Personaje:** `public/assets/img/personaje.png` (fondo transparente)
- **Personaje del hero (vector):** los colores son variables CSS (`--char-ink`, `--char-light`) en `.character` de `src/styles.css`; el color de la sudadera es `jacketColor` en `src/data/site.js`; `src/data/characterArt.js` se regenera con `node scripts/gen-character.mjs public/assets/img/personaje.svg`.
- **Imágenes y videos de proyectos:** `public/assets/img/` y `public/assets/video/`, y añade `image: '/assets/img/x.webp'` o `video: '/assets/video/x.mp4'` al proyecto en `site.js`
- **Colores y tipografía:** variables al inicio de `src/styles.css` (fuentes Archivo Black, Montserrat e Inter, incluidas vía @fontsource)

> **Ojo:** las métricas de los casos de estudio de ejemplo (`metrics` en `site.js`) son inventadas. Cámbialas por datos reales de tus proyectos o elimínalas antes de publicar.

## Secciones
`Hero` (carrusel 3D de pantallas que gira solo, con el scroll y arrastrando; título curvado; personaje al centro; botón Explore) · `Work` (grid de proyectos con aparición al hacer scroll) · `About` · `Contact`.
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
