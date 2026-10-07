import { buttonVariants } from '@heroui/react'
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
          <div className="case__intro">
            <p className="case__summary">{p.summary}</p>
            {/* Botón a la app o web publicada, si el caso la tiene */}
            {p.live && (
              <a className={`${buttonVariants({ size: 'lg' })} cta`} href={p.live.url} target="_blank" rel="noreferrer">
                {p.live.label ?? 'Ver en vivo'} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (se abre en otra pestaña)</span>
              </a>
            )}
          </div>
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

        {(p.process?.length > 0 || p.flow) && (
          <section>
            <h2>Proceso</h2>
            {p.flow?.caption && <p>{p.flow.caption}</p>}
            {p.process?.length > 0 && (
              <ol className="case__process">
                {p.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
            {/* El flujo va a todo lo ancho; en celular y tablet se cambia por su versión vertical */}
            {p.flow && (
              <picture className="case__flow">
                {p.flow.mobile && <source media="(max-width: 1000px)" srcSet={p.flow.mobile} />}
                <img src={p.flow.src} alt={p.flow.alt} loading="lazy" />
              </picture>
            )}
          </section>
        )}

        {/* Pantallas principales, de dos en dos, cada una con su texto debajo */}
        {p.screens?.length > 0 && (
          <section>
            <h2>Pantallas</h2>
            <div className="case__screens">
              {p.screens.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.alt ?? s.title} loading="lazy" />
                  <figcaption>
                    <strong>{s.title}.</strong> {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Versión para celular: las pantallas en fila (de dos en dos en el celular), cada una con su nombre debajo */}
        {p.mobile?.screens?.length > 0 && (
          <section>
            <h2>Versión móvil</h2>
            {p.mobile.caption && <p>{p.mobile.caption}</p>}
            <div className="case__phones">
              {p.mobile.screens.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.alt ?? s.title} width={p.mobile.width} height={p.mobile.height} loading="lazy" />
                  <figcaption>{s.title}</figcaption>
                </figure>
              ))}
            </div>
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
