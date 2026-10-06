import { projects } from '../data/site.js'
import Metric from './Metric.jsx'
import { DeviceMock } from './Mocks.jsx'

const pad = (n) => String(n).padStart(2, '0')

// Caso de estudio como página propia: ocupa el lugar del inicio (que se oculta) entre el menú y el pie
export default function CaseStudy({ index, onClose, onNavigate }) {
  const p = projects[index]
  const total = projects.length
  const prevIndex = (index - 1 + total) % total
  const nextIndex = (index + 1) % total
  // Datos del caso bajo la cabecera; los que falten en site.js no se muestran
  const facts = [['Rol', p.role], ['Duración', p.duration], ['Herramientas', p.tools]].filter(([, value]) => value)

  return (
    <main className="case">
      <article aria-labelledby="case-title">
        {/* Arriba, como en las secciones del inicio: volver a Proyectos y el número del caso sobre una línea fina */}
        <p className="section-meta">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
          >
            ← Proyectos
          </a>
          <span>Caso {pad(index + 1)} / {pad(total)}</span>
        </p>

        {/* Título a la izquierda y resumen a la derecha, alineados por abajo */}
        <header className="case__head">
          <div>
            <p className="case__eyebrow">{[p.client, p.year].filter(Boolean).join(' · ')}</p>
            <h1 id="case-title" className="case__title" tabIndex={-1}>{p.title}</h1>
          </div>
          <p className="case__summary">{p.summary}</p>
        </header>

        {facts.length > 0 && (
          <dl className="case__facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="case__cover" style={{ background: p.color }}>
          {p.cover ? <img src={p.cover} alt={`Pantallas de ${p.title}`} /> : <DeviceMock type={p.type} title={p.title} />}
        </div>

        {/* Cada parte sale solo si el caso la tiene en site.js */}
        {p.description && (
          <section>
            <h2>El proyecto</h2>
            <p>{p.description}</p>
          </section>
        )}

        {p.problem && (
          <section>
            <h2>El problema</h2>
            <p>{p.problem}</p>
          </section>
        )}

        {p.process?.length > 0 && (
          <section>
            <h2>Proceso</h2>
            <ol className="case__process">
              {p.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {p.gallery?.length > 0 && (
          <div className="case__gallery">
            {p.gallery.map((src) => (
              <img key={src} src={src} alt={`Pantallas de ${p.title}`} loading="lazy" />
            ))}
          </div>
        )}

        {p.stack?.length > 0 && (
          <section>
            <h2>Stack</h2>
            <dl className="case__stack">
              {p.stack.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {p.metrics?.length > 0 && (
          <section>
            <h2>Resultado</h2>
            <div className="case__metrics">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <strong><Metric value={m.value} /></strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Al final, los otros casos; debajo viene el pie con el contacto */}
        {total > 1 && (
          <nav className="case__nav" aria-label="Otros casos de estudio">
            <button onClick={() => onNavigate(prevIndex)}>
              <span aria-hidden="true">←</span>
              <span>Caso anterior<strong>{projects[prevIndex].title}</strong></span>
            </button>
            <button onClick={() => onNavigate(nextIndex)}>
              <span>Siguiente caso<strong>{projects[nextIndex].title}</strong></span>
              <span aria-hidden="true">→</span>
            </button>
          </nav>
        )}
      </article>
    </main>
  )
}
