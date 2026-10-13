import { useRef } from 'react'
import { useInView } from 'framer-motion'
import AnimatedCounter from '@/components/ui/animated-counter'

// Convierte textos como "+35%", "-50%", "4.6/5" o "2x" en un número que sube
// animado (contador de Rare UI) cuando entra en pantalla. Si el texto no tiene
// número, se muestra tal cual.
export default function Metric({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const m = /^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/.exec(value)
  if (!m) return <span>{value}</span>

  const [, before, num, after] = m
  const decimals = num.split(/[.,]/)[1]?.length ?? 0
  const target = Number(num.replace(',', '.'))
  // El contador pinta el prefijo y el sufijo en cajas aparte, donde un espacio al borde se pierde
  // ("8 de 8" salía "8de 8"): se cambia por un espacio que no se pierde
  const keepSpaces = (text) => text.replace(/^ +| +$/g, (s) => ' '.repeat(s.length))

  return (
    <span ref={ref}>
      <AnimatedCounter
        value={inView ? target : 0}
        decimals={decimals}
        duration={1.1}
        prefix={keepSpaces(before.replace('-', '−')) || undefined}
        suffix={keepSpaces(after) || undefined}
      />
    </span>
  )
}
