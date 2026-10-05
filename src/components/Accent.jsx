import { Fragment } from 'react'

/**
 * Texto con acento: "Casos de *estudio*" se muestra como Casos de <em>estudio</em>.
 * Lo que va entre asteriscos usa la letra de acento (Instrument Serif en cursiva, ver styles.css).
 */
export default function Accent({ text }) {
  if (!text) return null
  return text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>))
}
