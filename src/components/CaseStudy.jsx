import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, site } from '../data/site.js'

const ease = [0.22, 1, 0.36, 1]

// Caso de estudio a pantalla completa (diálogo accesible)
export default function CaseStudy({ index, onClose, onNavigate }) {
  const p = index === null ? null : projects[index]
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const total = projects.length
  const prevIndex = index === null ? 0 : (index - 1 + total) % total
  const nextIndex = index === null ? 0 : (index + 1) % total

  // Al cambiar de caso, vuelve arriba
  useEffect(() => {
    dialogRef.current?.scrollTo(0, 0)
  }, [index])

  // Foco en el botón de cerrar, Escape para salir, Tab no sale del caso y foco de vuelta al cerrar
  useEffect(() => {
    if (!p) return
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [p, onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          ref={dialogRef}
          className="case"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.article
            ref={panelRef}
            className="case__panel"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.5, ease }}
          >
            <button ref={closeRef} className="case__close" onClick={onClose} aria-label="Cerrar caso de estudio">
              ✕
            </button>
            <p className="case__eyebrow">{p.client} · {p.year}</p>
            <h2 id="case-title" className="case__title">{p.title}</h2>
            <p className="case__summary">{p.summary}</p>

            <dl className="case__facts">
              <div>
                <dt>Rol</dt>
                <dd>{p.role}</dd>
              </div>
              <div>
                <dt>Duración</dt>
                <dd>{p.duration}</dd>
              </div>
              <div>
                <dt>Herramientas</dt>
                <dd>{p.tools}</dd>
              </div>
            </dl>

            <div className="case__cover" style={{ background: p.color }}>
              {p.cover && <img src={p.cover} alt={`Pantallas de ${p.title}`} />}
            </div>

            <section>
              <h3>El problema</h3>
              <p>{p.problem}</p>
            </section>

            <section>
              <h3>Proceso</h3>
              <ol className="case__process">
                {p.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3>Resultado</h3>
              <div className="case__metrics">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="case__cta">
              <h3>¿Hablamos?</h3>
              <p>¿Tienes un producto que mejorar? Escríbeme y lo vemos juntos.</p>
              <a className="button" href={`mailto:${site.email}`}>Escribirme</a>
            </section>

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
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
