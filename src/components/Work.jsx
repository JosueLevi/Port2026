import { motion } from 'framer-motion'
import { projects } from '../data/site.js'

function Media({ p }) {
  if (p.video)
    return <video src={p.video} poster={p.cover} autoPlay muted loop playsInline />
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" />
  return <div className="card__placeholder" style={{ background: p.color }} />
}

export default function Work({ onOpenProject }) {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title" className="section-title">Casos de estudio</h2>
        <p className="section-intro">
          Proyectos donde el diseño movió métricas. Haz clic para ver el proceso completo.
        </p>
      </div>
      <div className="work__grid">
        {projects.map((p, i) => (
          <motion.article
            className="card"
            key={p.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="card__button"
              onClick={() => onOpenProject(i)}
              aria-label={`Ver caso de estudio: ${p.title}`}
            >
              <div className="card__media">
                <Media p={p} />
                {p.metrics?.[0] && (
                  <span className="card__metric">
                    <strong>{p.metrics[0].value}</strong> {p.metrics[0].label}
                  </span>
                )}
              </div>
              <div className="card__meta">
                <h3>{p.title}</h3>
                <span>{p.role} · {p.year}</span>
              </div>
              <p className="card__summary">{p.summary}</p>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
