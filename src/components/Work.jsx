import { motion } from 'framer-motion'
import { projects, site } from '../data/site.js'
import Metric from './Metric.jsx'
import { DeviceMock } from './Mocks.jsx'
import SectionHead from './SectionHead.jsx'

function Media({ p }) {
  if (p.video)
    return <video src={p.video} poster={p.cover} autoPlay muted loop playsInline />
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" />
  return (
    <div className="card__placeholder" style={{ background: p.color }}>
      <DeviceMock type={p.type} title={p.title} />
    </div>
  )
}

export default function Work({ onOpenProject }) {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <SectionHead id="work-title" number="01" section={site.sections.work} count={String(projects.length).padStart(2, '0')}>
        {site.notes?.work && <p className="note" aria-hidden="true">{site.notes.work}</p>}
      </SectionHead>
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
              data-cursor="Ver caso"
            >
              <div className="card__media">
                <Media p={p} />
                <span className="card__number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {p.metrics?.[0] && (
                  <span className="card__metric">
                    <strong><Metric value={p.metrics[0].value} /></strong> {p.metrics[0].label}
                  </span>
                )}
              </div>
              <div className="card__meta">
                <h3>{p.title}</h3>
                <span>{p.role} · {p.year}</span>
              </div>
              <p className="card__summary">{p.summary}</p>
              {p.tags?.length > 0 && (
                <span className="card__tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              )}
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
