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
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => setLabel(e.target.closest?.('[data-cursor]')?.dataset.cursor ?? '')
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
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
