import { useEffect, useRef, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

// Pantallas del caso en un carrusel: una grande, un pedazo de la siguiente y cada una con su texto debajo.
// La primera vez que se ve, las pantallas se corren un poco de lado y vuelven, como pista de que se deslizan.
// Para pasar: las flechas sobre las pantallas, un clic en la que asoma (el cursor dice "Siguiente" o "Anterior"),
// la barra de progreso de abajo (un tramo por pantalla), el dedo, el trackpad o el teclado (con el foco en las pantallas).
export default function ScreensSlider({ screens, title }) {
  const slider = useRef(null)
  const track = useRef(null)
  const frame = useRef(0)
  const [current, setCurrent] = useState(0)
  const [hint, setHint] = useState(false)
  const last = screens.length - 1

  // Las flechas van a media altura de la imagen, que cambia con el ancho de la ventana
  useEffect(() => {
    const img = track.current.querySelector('img')
    const place = () => slider.current?.style.setProperty('--arrow-y', `${img.offsetHeight / 2}px`)
    const observer = new ResizeObserver(place)
    observer.observe(img)
    return () => observer.disconnect()
  }, [])

  // La primera vez que el carrusel se ve, las pantallas se corren un poco a la izquierda y vuelven,
  // para que se note que se deslizan de lado (sin esto si la persona prefiere menos movimiento)
  useEffect(() => {
    if (last === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const seen = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      seen.disconnect()
      setHint(true)
    }, { threshold: 0.5 })
    seen.observe(track.current)
    return () => seen.disconnect()
  }, [last])

  // La pantalla a la vista es la que está más cerca del borde izquierdo; al final de la fila, la última
  const update = () => {
    setHint(false)
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
      <div ref={slider} className="slider">
        {/* data-lenis-prevent-horizontal: el deslizamiento de lado lo hace el navegador y no el scroll suave de la página */}
        <div
          ref={track}
          className={hint ? 'case__screens is-hinting' : 'case__screens'}
          onScroll={update}
          // La pista se quita al terminar, o antes si la persona toca el carrusel (o lo mueve: ver update)
          onAnimationEnd={() => setHint(false)}
          onPointerDown={() => setHint(false)}
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label={`Pantallas de ${title}`}
          data-lenis-prevent-horizontal
        >
          {screens.map((s, i) => (
            // La que asoma lleva a ella con un clic (con el teclado se usan las flechas o la barra de progreso)
            <figure
              key={s.src}
              data-cursor={i > current ? 'Siguiente' : i < current ? 'Anterior' : undefined}
              onClick={i === current ? undefined : () => go(i)}
            >
              <img src={s.src} alt={s.alt ?? s.title} loading="lazy" />
              <figcaption>
                <strong>{s.title}.</strong> {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        {last > 0 && (
          <>
            <button type="button" className="slider__arrow slider__arrow--prev" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Pantalla anterior">
              ←
            </button>
            <button type="button" className="slider__arrow slider__arrow--next" onClick={() => go(current + 1)} disabled={current === last} aria-label="Pantalla siguiente">
              →
            </button>
          </>
        )}
      </div>
      {last > 0 && (
        <div className="slider__progress">
          <ol>
            {screens.map((s, i) => (
              <li key={s.src}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Pantalla ${i + 1} de ${screens.length}: ${s.title}`}
                  aria-current={i === current ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>
          <span className="slider__count" aria-hidden="true">
            {pad(current + 1)} / {pad(screens.length)}
          </span>
        </div>
      )}
    </>
  )
}
