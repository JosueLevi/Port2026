import { site } from '../data/site.js'
import { Sparkle } from './Doodles.jsx'

// Repite la lista hasta tener al menos `min` palabras, para que la cinta no deje huecos
const fill = (list, min = 16) => Array.from({ length: Math.ceil(min / list.length) }, () => list).flat()

function Tape({ words, className }) {
  const row = (copy) => (
    <div className="tape__row" key={copy}>
      {words.map((w, i) => (
        <span key={i}>
          {w}
          <Sparkle />
        </span>
      ))}
    </div>
  )
  // Dos copias seguidas: al llegar a la mitad, vuelve al principio sin que se note
  return (
    <div className={`tape ${className}`}>
      <div className="tape__track">{[row(0), row(1)]}</div>
    </div>
  )
}

/** Dos cintas cruzadas con tus habilidades y herramientas, que se deslizan sin parar. */
export default function Marquee() {
  return (
    <div className="tapes" aria-hidden="true">
      <Tape words={fill(site.skills)} className="tape--pop" />
      <Tape words={fill(site.tools)} className="tape--brand" />
    </div>
  )
}
