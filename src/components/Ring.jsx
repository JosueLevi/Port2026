import { useEffect, useRef } from 'react'
import { screens } from '../data/site.js'
import { BrowserBar, MockScreen, MockWeb } from './Mocks.jsx'

// Ancho de cada tipo de pantalla, en anchos de pantalla de móvil
const WIDTH = { mobile: 1, web: 2.2 }
const kind = (s) => (s.type === 'web' ? 'web' : 'mobile')

// Se repiten las pantallas hasta llenar el anillo (unas 24 pantallas de móvil), siempre en
// vueltas completas: así la primera y la última no son la misma pantalla, una al lado de la otra
const MIN_WIDTH = 24
const cycleWidth = screens.reduce((t, s) => t + WIDTH[kind(s)], 0)
const cycles = Math.max(1, Math.round(MIN_WIDTH / cycleWidth))
const cardsData = Array.from({ length: cycles }, () => screens).flat()

// Ángulo del centro de cada pantalla: las web ocupan más hueco que las de móvil
const totalWidth = cardsData.reduce((t, s) => t + WIDTH[kind(s)], 0)
let acc = 0
const angles = cardsData.map((s) => {
  const w = WIDTH[kind(s)]
  const a = ((acc + w / 2) / totalWidth) * 360
  acc += w
  return a
})

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
        c.style.filter = `blur(${(off * off * 6).toFixed(2)}px)`
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

    // Solo se anima mientras el carrusel está a la vista y la portada no está tapada
    let visible = true
    const update = () => (visible && window.scrollY < stage.offsetHeight ? start() : stop())
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })

    layout()
    start()
    io.observe(stage)
    window.addEventListener('resize', layout)
    window.addEventListener('scroll', update, { passive: true })
    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', layout)
      window.removeEventListener('scroll', update)
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
