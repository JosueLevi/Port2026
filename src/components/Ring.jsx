import { useEffect, useRef } from 'react'
import { screens } from '../data/site.js'

// Ancho de cada tipo de pantalla, en anchos de pantalla de móvil
const WIDTH = { mobile: 1, web: 2.2 }
const kind = (s) => (s.type === 'web' ? 'web' : 'mobile')

// Se repiten las pantallas hasta llenar el anillo (unas 24 pantallas de móvil)
const MIN_WIDTH = 24
const cardsData = []
for (let total = 0; total < MIN_WIDTH || cardsData.length < screens.length; ) {
  const s = screens[cardsData.length % screens.length]
  cardsData.push(s)
  total += WIDTH[kind(s)]
}

// Ángulo del centro de cada pantalla: las web ocupan más hueco que las de móvil
const totalWidth = cardsData.reduce((t, s) => t + WIDTH[kind(s)], 0)
let acc = 0
const angles = cardsData.map((s) => {
  const w = WIDTH[kind(s)]
  const a = ((acc + w / 2) / totalWidth) * 360
  acc += w
  return a
})

// Pantalla de móvil de ejemplo para cuando aún no hay captura
function MockScreen({ title }) {
  return (
    <div className="mock">
      <div className="mock__bar" />
      <div className="mock__avatar" />
      <p className="mock__title">{title}</p>
      <div className="mock__line" />
      <div className="mock__line mock__line--short" />
      <div className="mock__block" />
      <div className="mock__line" />
      <div className="mock__line mock__line--short" />
      <div className="mock__button" />
    </div>
  )
}

// Aplicación web de ejemplo: menú lateral, título y bloques de contenido
function MockWeb({ title }) {
  return (
    <div className="mockweb">
      <div className="mockweb__side">
        <div className="mock__avatar" />
        <div className="mock__line" />
        <div className="mock__line mock__line--short" />
        <div className="mock__line" />
        <div className="mock__line mock__line--short" />
      </div>
      <div className="mockweb__main">
        <p className="mock__title">{title}</p>
        <div className="mockweb__cards">
          <div className="mock__block" />
          <div className="mock__block" />
          <div className="mock__block" />
        </div>
        <div className="mock__block mockweb__chart" />
      </div>
    </div>
  )
}

// Barra de navegador que enmarca las pantallas web
function BrowserBar() {
  return (
    <div className="browser">
      <span /><span /><span />
      <div className="browser__url" />
    </div>
  )
}

/**
 * Carrusel 3D: las pantallas se colocan en un cilindro que gira solo,
 * se acelera con el scroll y se puede arrastrar. Las que quedan a los lados
 * se desenfocan y se aclaran. Un clic en una pantalla abre su caso de estudio.
 */
export default function Ring({ onOpenProject }) {
  const ringRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ring = ringRef.current
    const stage = ring.parentElement
    const cards = cardRefs.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let angle = 0
    let velocity = 0
    let dragging = false
    let lastX = 0
    let downX = 0
    let lastScroll = window.scrollY
    let id = null

    // Radio según el ancho de las tarjetas, para que queden casi pegadas
    const mobileWidth = () => cards.find((c) => c.dataset.type === 'mobile')?.offsetWidth ?? cards[0].offsetWidth / WIDTH.web
    const radius = () => (totalWidth * mobileWidth() * 1.3) / (2 * Math.PI)

    const layout = () => {
      const r = radius()
      cards.forEach((c, i) => {
        c.style.transform = `rotateY(${angles[i]}deg) translateZ(${r}px)`
      })
    }

    const tick = () => {
      // Scroll → impulso
      const y = window.scrollY
      velocity += (y - lastScroll) * 0.02
      lastScroll = y

      if (!dragging) angle -= reduce ? 0 : 0.06
      angle += velocity
      velocity *= 0.92

      ring.style.transform = `translateZ(${-radius()}px) rotateX(-4deg) rotateY(${angle}deg)`

      // Desenfoque según lo lejos que esté cada pantalla del centro
      cards.forEach((c, i) => {
        const a = (((angles[i] + angle) % 360) + 540) % 360 - 180 // -180..180
        const off = Math.min(Math.abs(a) / 90, 1) // 0 delante, 1 al lado
        c.style.filter = `grayscale(1) blur(${(off * off * 6).toFixed(2)}px)`
        c.style.opacity = (1 - off * 0.55).toFixed(2)
      })

      id = requestAnimationFrame(tick)
    }

    const start = () => {
      if (id === null) {
        lastScroll = window.scrollY
        id = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      if (id !== null) cancelAnimationFrame(id)
      id = null
    }

    const down = (e) => {
      dragging = true
      lastX = e.clientX
      downX = e.clientX
    }
    const move = (e) => {
      if (!dragging) return
      velocity = (e.clientX - lastX) * 0.08
      lastX = e.clientX
    }
    const up = (e) => {
      if (!dragging) return
      dragging = false
      // Si casi no se movió, es un clic: abre el caso de estudio de esa pantalla
      if (Math.abs(e.clientX - downX) < 6) {
        const card = e.target.closest?.('[data-project]')
        if (card && onOpenProject) onOpenProject(Number(card.dataset.project))
      }
    }

    // Solo se anima mientras el carrusel está a la vista
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))

    layout()
    start()
    io.observe(stage)
    window.addEventListener('resize', layout)
    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', layout)
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [onOpenProject])

  return (
    <div className="ring-stage" aria-hidden="true">
      <div className="ring" ref={ringRef}>
        {cardsData.map((s, i) => (
          <div
            className={`ring__card ring__card--${kind(s)}`}
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            data-project={s.project}
            data-type={kind(s)}
          >
            {kind(s) === 'web' && <BrowserBar />}
            {s.image ? (
              <img src={s.image} alt={s.title} draggable="false" />
            ) : kind(s) === 'web' ? (
              <MockWeb title={s.title} />
            ) : (
              <MockScreen title={s.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
