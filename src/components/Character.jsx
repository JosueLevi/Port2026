import { useEffect, useId, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { site } from '../data/site.js'
import { characterArt as art } from '../data/characterArt.js'

const ease = [0.22, 1, 0.36, 1]

// Las partes claras de la silla ('white') no se pintan: quedan transparentes (ver la máscara de abajo)
const fills = { ink: 'var(--char-ink)', light: 'var(--char-light)', shade: 'var(--char-shade)' }
const pts = (list) => list.trim().split(/\s+/).map((p) => p.split(',').map(Number))
const toPath = (list) => 'M' + pts(list).map((p) => p.join(' ')).join('L') + 'Z'

/**
 * Dibujo del personaje en capas: cuerpo, sudadera (color de site.jacketColor) y la cabeza,
 * que se mueve al ritmo. Se usa en la portada y en "Sobre mí".
 */
export function CharacterArt({ className = 'character__art' }) {
  const uid = useId().replace(/:/g, '')
  const id = (name) => `${name}-${uid}`
  return (
    <svg className={className} viewBox={art.viewBox} aria-hidden="true">
      <defs>
        <clipPath id={id('body')}>
          <path d={`M-50 -50H401V565H-50Z${toPath(art.headArea)}`} clipRule="evenodd" />
        </clipPath>
        <clipPath id={id('head')}>
          <polygon points={art.headClip} />
        </clipPath>
        <clipPath id={id('jacket')}>
          <polygon points={art.jacketArea} />
        </clipPath>
        <filter id={id('inset')}>
          <feMorphology operator="erode" radius="1.6" />
        </filter>
        {/* Huecos de la silla: se repite el orden de pintado y lo que acaba en una parte
            clara de la silla queda en negro (oculto), así se ve lo que hay detrás */}
        <mask id={id('chair')} maskUnits="userSpaceOnUse" x="-50" y="-50" width="451" height="615">
          <rect x="-50" y="-50" width="451" height="615" fill="#fff" />
          {art.body.map(([tone, d], i) => (
            <path key={i} d={d} fill={tone === 'white' ? '#000' : '#fff'} />
          ))}
        </mask>
      </defs>

      {/* Cuerpo (sin la cabeza) */}
      <g clipPath={`url(#${id('body')})`}>
        <g mask={`url(#${id('chair')})`}>
          <path d={art.base} fill={fills.ink} />
          {/* Sudadera del color elegido, encogida un poco para dejar el contorno negro */}
          {site.jacketColor && (
            <g filter={`url(#${id('inset')})`}>
              <path d={art.base} fill={site.jacketColor} clipPath={`url(#${id('jacket')})`} />
            </g>
          )}
          {art.body.map(([tone, d], i) => fills[tone] && <path key={i} d={d} fill={fills[tone]} />)}
        </g>
      </g>

      {/* Cabeza, que se mueve al ritmo */}
      <g className="character__head" clipPath={`url(#${id('head')})`}>
        <path d={art.base} fill={fills.ink} />
        {art.head.map(([tone, d], i) => (
          <path key={i} d={d} fill={fills[tone]} />
        ))}
      </g>
    </svg>
  )
}

const greetings = [`¡Hola! Soy ${site.name} 👋`, 'Diseño productos claros y medibles', 'Mira mis casos de estudio ↓']

/**
 * Personaje con vida: respira, mueve la cabeza al ritmo de la música, el café humea,
 * salen notas de los auriculares, se inclina hacia el cursor y saluda.
 * Es un SVG vectorial en capas: cuerpo, sudadera (color de site.jacketColor) y la cabeza, que se mueve.
 */
export default function Character() {
  const [hover, setHover] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [greeting, setGreeting] = useState(0)
  // Al entrar en la web saluda solo y pasa por los tres mensajes; si lo tocas, se detiene
  const [auto, setAuto] = useState(false)
  const autoTimers = useRef([])
  const stopAuto = () => {
    autoTimers.current.forEach(clearTimeout)
    autoTimers.current = []
    setAuto(false)
  }

  useEffect(() => {
    const at = (ms, fn) => setTimeout(fn, ms)
    autoTimers.current = [
      at(1600, () => setAuto(true)),
      at(5000, () => setGreeting(1)),
      at(8400, () => setGreeting(2)),
      at(11800, () => {
        setAuto(false)
        setGreeting(0)
      }),
    ]
    return () => autoTimers.current.forEach(clearTimeout)
  }, [])

  // Inclinación hacia el cursor, con muelle para que sea suave
  const rotate = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 })
  const x = useSpring(useMotionValue(0), { stiffness: 60, damping: 15 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = (e) => {
      const dx = e.clientX / window.innerWidth - 0.5 // -0.5..0.5
      rotate.set(dx * 3)
      x.set(dx * 14)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [rotate, x])

  // Cada clic muestra el siguiente saludo
  const greet = () => {
    if (clicked || auto) setGreeting((g) => (g + 1) % greetings.length)
    stopAuto()
    setClicked(true)
  }

  const show = hover || clicked || auto

  return (
    <motion.div
      className="character"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease }}
    >
      <motion.div className="character__lean" style={{ rotate, x }}>
        {/* Respiración: se estira un poco desde los pies */}
        <motion.button
          type="button"
          className="character__breath"
          aria-label={`Saludar a ${site.name}`}
          animate={{ scaleY: [1, 1.012, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={() => {
            setHover(false)
            setClicked(false)
          }}
          onClick={greet}
          onBlur={() => setClicked(false)}
        >
          <CharacterArt />

          {/* Vapor del café */}
          <svg className="character__steam" viewBox="0 0 60 80" aria-hidden="true">
            <path d="M 15 75 C 5 60 25 50 15 35 C 8 25 20 15 15 5" />
            <path d="M 30 75 C 20 60 40 50 30 35 C 23 25 35 15 30 5" />
            <path d="M 45 75 C 35 60 55 50 45 35 C 38 25 50 15 45 5" />
          </svg>

          {/* Notas que salen de los auriculares */}
          <span className="character__notes" aria-hidden="true">
            <span>♪</span>
            <span>♫</span>
            <span>♪</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Saludo al entrar, al pasar el ratón o al hacer clic (el automático no se lee en voz alta) */}
      <motion.p
        className="character__bubble"
        role="status"
        aria-live={auto ? 'off' : 'polite'}
        initial={false}
        animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        {show ? greetings[greeting] : ''}
      </motion.p>
    </motion.div>
  )
}
