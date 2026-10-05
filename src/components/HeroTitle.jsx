import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.65, 0, 0.35, 1]
const pad = 4 // margen alrededor del texto para que el contorno no se corte

/**
 * Título de la portada, en horizontal y con Archivo Black (--title en styles.css).
 * Al cargar la página primero se dibuja el contorno de las letras y después
 * se pinta el relleno de izquierda a derecha.
 */
export default function HeroTitle({ text }) {
  const reduce = useReducedMotion()
  const textRef = useRef(null)
  const [box, setBox] = useState(null)

  // Espera a la letra del título para medir el texto y ajustar el dibujo a su tamaño
  useEffect(() => {
    let alive = true
    const fit = () => {
      if (!alive || !textRef.current) return
      const b = textRef.current.getBBox()
      setBox({ x: b.x - pad, y: b.y - pad, w: b.width + pad * 2, h: b.height + pad * 2 })
    }
    document.fonts.load('400 100px "Archivo Black"').then(fit, fit)
    return () => {
      alive = false
    }
  }, [text])

  return (
    <svg
      className="hero__title-svg"
      viewBox={box ? `${box.x} ${box.y} ${box.w} ${box.h}` : '0 -120 1000 150'}
      style={{ opacity: box ? 1 : 0 }}
      aria-hidden="true"
    >
      {box && (
        <defs>
          <clipPath id="hero-title-paint">
            {/* Franja que crece hacia la derecha: deja ver el relleno poco a poco */}
            <motion.rect
              x={box.x}
              y={box.y}
              height={box.h}
              initial={{ width: reduce ? box.w : 0 }}
              animate={{ width: box.w }}
              transition={{ delay: 1.1, duration: 1, ease }}
            />
          </clipPath>
        </defs>
      )}

      {/* Contorno, que se dibuja solo */}
      <motion.text
        ref={textRef}
        className="hero__title-outline"
        initial={{ strokeDashoffset: reduce ? 0 : 1600 }}
        animate={box ? { strokeDashoffset: 0 } : undefined}
        transition={{ duration: 1.6, ease }}
      >
        {text}
      </motion.text>

      {/* Relleno, que se pinta encima del contorno */}
      {box && (
        <text className="hero__title-fill" clipPath="url(#hero-title-paint)">
          {text}
        </text>
      )}
    </svg>
  )
}
