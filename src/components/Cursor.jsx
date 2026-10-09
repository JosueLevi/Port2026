import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Punto que sigue al ratón. Sobre un elemento con data-cursor="Texto" se convierte
// en un círculo amarillo con ese texto (p. ej. "Ver caso" en las tarjetas de proyectos).
// view: al cambiar de vista (inicio o un caso) el texto se borra, aunque el ratón no se haya movido
export default function Cursor({ view }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [label, setLabel] = useState('')

  useEffect(() => {
    const read = (el) => setLabel(el?.closest?.('[data-cursor]')?.dataset.cursor ?? '')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => read(e.target)
    // Si el texto cambia con el ratón quieto encima (p. ej. la pantalla que asomaba en el carrusel
    // pasa a ser la actual), se vuelve a leer lo que hay bajo el ratón
    const changed = new MutationObserver(() => read(document.elementFromPoint(x.get(), y.get())))
    changed.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['data-cursor'] })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      changed.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  useEffect(() => setLabel(''), [view])

  return (
    <motion.div className={label ? 'cursor cursor--label' : 'cursor'} style={{ x: sx, y: sy }} aria-hidden="true">
      {label && <span>{label}</span>}
    </motion.div>
  )
}
