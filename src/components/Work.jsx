import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { projects, site } from '../data/site.js'
import Metric from './Metric.jsx'
import { DeviceMock } from './Mocks.jsx'
import SectionHead from './SectionHead.jsx'

const pad = (n) => String(n).padStart(2, '0')

function Media({ p }) {
  if (p.video)
    return <video src={p.video} poster={p.cover} autoPlay muted loop playsInline />
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" />
  return (
    <div className="case-card__placeholder" style={{ background: p.color }}>
      <DeviceMock type={p.type} title={p.title} />
    </div>
  )
}

/**
 * Tarjeta de la pila: se queda fija arriba y la siguiente sube y se apila encima.
 * Las de atrás se achican un poco para que se vea el montón, como un mazo de cartas.
 */
function StackCard({ p, i, progress, onOpen }) {
  const n = projects.length
  const reduce = useReducedMotion()
  // Empieza a achicarse cuando la siguiente tarjeta empieza a taparla
  const start = n > 1 ? Math.min(i / (n - 1), 0.99) : 0
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (n - 1 - i) * 0.04])
  const metric = p.metrics?.[0]

  return (
    <li className="stack__item" style={{ '--i': i }}>
      <motion.article className="case-card" style={{ scale }}>
        <div className="case-card__info">
          <p className="case-card__meta">
            <span>{pad(i + 1)} / {pad(n)}</span>
            <span>{p.role} · {p.year}</span>
          </p>
          <h3 className="case-card__title">
            {/* El botón cubre toda la tarjeta (ver ::after en styles.css) */}
            <button type="button" className="case-card__button" onClick={onOpen} data-cursor="Ver caso">
              {p.title}
            </button>
          </h3>
          <p className="case-card__summary">{p.summary}</p>
          {metric && (
            <p className="case-card__metric">
              <strong><Metric value={metric.value} /></strong>
              <span>{metric.label}</span>
            </p>
          )}
          <div className="case-card__foot">
            {p.tags?.length > 0 && (
              <ul className="case-card__tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            <span className="case-card__cta" aria-hidden="true">Ver caso →</span>
          </div>
        </div>
        <div className="case-card__media">
          <Media p={p} />
        </div>
      </motion.article>
    </li>
  )
}

export default function Work({ onOpenProject }) {
  // Avance de la pila: 0 cuando la primera tarjeta llega arriba, 1 cuando se apila la última
  const stack = useRef(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <SectionHead id="work-title" number="01" section={site.sections.work} count={pad(projects.length)}>
        {site.notes?.work && <p className="note" aria-hidden="true">{site.notes.work}</p>}
      </SectionHead>
      <ol className="stack" ref={stack} style={{ '--cards': projects.length }}>
        {projects.map((p, i) => (
          <StackCard key={p.title} p={p} i={i} progress={scrollYProgress} onOpen={() => onOpenProject(i)} />
        ))}
      </ol>
    </section>
  )
}
