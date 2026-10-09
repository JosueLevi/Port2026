import { useRef, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

// Pantallas del caso en un carrusel: una grande, un pedazo de la siguiente y cada una con su texto debajo.
// Se pasa con las flechas, deslizando con el dedo o el trackpad, o con el teclado (con el foco en las pantallas).
// El carrusel va a todo lo ancho de la ventana; las flechas y el contador van al lado del nombre de la parte.
export default function ScreensSlider({ screens, title }) {
  const track = useRef(null)
  const frame = useRef(0)
  const [current, setCurrent] = useState(0)
  const last = screens.length - 1

  // La pantalla a la vista es la que está más cerca del borde izquierdo; al final de la fila, la última
  const update = () => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = track.current
      if (!el) return
      const slides = [...el.children]
      const start = slides[0].offsetLeft
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2
      let near = 0
      slides.forEach((s, i) => {
        if (Math.abs(s.offsetLeft - start - el.scrollLeft) < Math.abs(slides[near].offsetLeft - start - el.scrollLeft)) near = i
      })
      setCurrent(atEnd ? last : near)
    })
  }

  const go = (i) => {
    const el = track.current
    const slides = el.children
    const target = slides[Math.max(0, Math.min(last, i))]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      {last > 0 && (
        <div className="slider__controls">
          <span className="slider__count" aria-hidden="true">
            {pad(current + 1)} / {pad(screens.length)}
          </span>
          <button type="button" className="slider__button" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Pantalla anterior">
            ←
          </button>
          <button type="button" className="slider__button" onClick={() => go(current + 1)} disabled={current === last} aria-label="Pantalla siguiente">
            →
          </button>
        </div>
      )}
      {/* data-lenis-prevent-horizontal: el deslizamiento de lado lo hace el navegador y no el scroll suave de la página */}
      <div
        ref={track}
        className="case__screens"
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Pantallas de ${title}`}
        data-lenis-prevent-horizontal
      >
        {screens.map((s) => (
          <figure key={s.src}>
            <img src={s.src} alt={s.alt ?? s.title} loading="lazy" />
            <figcaption>
              <strong>{s.title}.</strong> {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
