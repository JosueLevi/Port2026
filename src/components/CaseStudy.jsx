import { buttonVariants } from '@heroui/react'
import { projects } from '../data/site.js'
import Metric from './Metric.jsx'
import { DeviceMock } from './Mocks.jsx'
import ScreensSlider from './ScreensSlider.jsx'

const pad = (n) => String(n).padStart(2, '0')

// Puntos con nombre y texto, sobre una línea fina: usuarios, componentes, decisiones de diseño y siguientes pasos
function Points({ items }) {
  return (
    <dl className="case__points">
      {items.map((item) => (
        <div key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.text}</dd>
        </div>
      ))}
    </dl>
  )
}

// Caso de estudio como página propia: ocupa el lugar del inicio (que se oculta) entre el menú y el pie
export default function CaseStudy({ index, onClose, onNavigate }) {
  const p = projects[index]
  const total = projects.length
  const prevIndex = (index - 1 + total) % total
  const nextIndex = (index + 1) % total
  // Datos del caso bajo la cabecera; los que falten en site.js no se muestran
  const facts = [['Rol', p.role], ['Plataforma', p.platform], ['Duración', p.duration], ['Herramientas', p.tools]].filter(([, value]) => value)
  // Texto de "Proceso": el del flujo, o uno propio si el caso no tiene imagen de flujo
  const processCaption = p.flow?.caption || p.processCaption

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
          {p.cover ? (
            <img src={p.cover} alt={`Pantallas de ${p.title}`} style={p.coverPosition ? { objectPosition: p.coverPosition } : undefined} />
          ) : (
            <DeviceMock type={p.type} title={p.title} />
          )}
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
            {/* Un texto o varios párrafos */}
            {[].concat(p.problem).map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        )}

        {p.users?.length > 0 && (
          <section>
            <h2>Usuarios</h2>
            <Points items={p.users} />
          </section>
        )}

        {(p.process?.length > 0 || p.flow) && (
          <section>
            <h2>Proceso</h2>
            {processCaption && <p>{processCaption}</p>}
            {/* Pasos sueltos en lista; si tienen nombre y texto, numerados y en fila a todo lo ancho */}
            {p.process?.length > 0 &&
              (typeof p.process[0] === 'string' ? (
                <ol className="case__process">
                  {p.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : (
                <ol className="case__steps">
                  {p.process.map((step) => (
                    <li key={step.title}>
                      <strong>{step.title}</strong>
                      <span>{step.text}</span>
                    </li>
                  ))}
                </ol>
              ))}
            {/* El flujo va a todo lo ancho; en celular y tablet se cambia por su versión vertical */}
            {p.flow && (
              <picture className="case__flow">
                {p.flow.mobile && <source media="(max-width: 1000px)" srcSet={p.flow.mobile} />}
                <img src={p.flow.src} alt={p.flow.alt} loading="lazy" />
              </picture>
            )}
          </section>
        )}

        {/* Pantallas principales en un carrusel, cada una con su texto debajo */}
        {p.screens?.length > 0 && (
          <section>
            <h2>Pantallas</h2>
            {/* key: al pasar a otro caso, el carrusel empieza de nuevo en la primera pantalla */}
            <ScreensSlider key={p.title} screens={p.screens} title={p.title} />
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

        {/* Video de presentación: con controles y sin reproducirse solo, porque tiene música */}
        {p.promo && (
          <section>
            <h2>La app en acción</h2>
            {p.promo.caption && <p>{p.promo.caption}</p>}
            <video className="case__promo" src={p.promo.src} poster={p.promo.poster} width={1920} height={1080} controls playsInline preload="metadata" />
          </section>
        )}

        {/* Sistema de diseño: texto, paleta de colores, logos y grupos de componentes */}
        {p.designSystem && (
          <section>
            <h2>Sistema de diseño</h2>
            {p.designSystem.caption && <p>{p.designSystem.caption}</p>}
            {p.designSystem.colors?.length > 0 && (
              <ul className="case__colors" aria-label="Paleta de colores">
                {p.designSystem.colors.map((c) => (
                  <li key={c.value}>
                    <span style={{ background: c.value }} />
                    <strong>{c.name}</strong>
                    <code>{c.value}</code>
                  </li>
                ))}
              </ul>
            )}
            {p.designSystem.logos?.length > 0 && (
              <div className="case__logos">
                {p.designSystem.logos.map((l) => (
                  <div key={l.src} style={l.background ? { background: l.background, borderColor: l.background } : undefined}>
                    <img src={l.src} alt={l.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
            {p.designSystem.components?.length > 0 && <Points items={p.designSystem.components} />}
          </section>
        )}

        {p.decisions?.length > 0 && (
          <section>
            <h2>Decisiones de diseño</h2>
            <Points items={p.decisions} />
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
            <h2>{p.metricsTitle ?? 'Resultado'}</h2>
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

        {p.next?.length > 0 && (
          <section>
            <h2>Siguientes pasos</h2>
            <Points items={p.next} />
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
