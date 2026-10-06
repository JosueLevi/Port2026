import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { buttonVariants } from '@heroui/react'
import { projects, site } from '../data/site.js'
import Metric from './Metric.jsx'
import { DeviceMock } from './Mocks.jsx'

const ease = [0.22, 1, 0.36, 1]

// Caso de estudio en un panel que entra por la derecha (diálogo accesible); en el celular ocupa toda la pantalla
export default function CaseStudy({ index, onClose, onNavigate }) {
  const p = index === null ? null : projects[index]
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const topRef = useRef(null)
  const [stuck, setStuck] = useState(false)
  const total = projects.length
  const prevIndex = index === null ? 0 : (index - 1 + total) % total
  const nextIndex = index === null ? 0 : (index + 1) % total
  // Datos del caso bajo el resumen; los que falten en site.js no se muestran
  const facts = p
    ? [['Rol', p.role], ['Duración', p.duration], ['Herramientas', p.tools]].filter(([, value]) => value)
    : []

  // Al abrir otro caso, vuelve arriba (al cerrar no: el panel sale tal como está)
  useEffect(() => {
    if (index === null) return
    dialogRef.current?.scrollTo(0, 0)
    setStuck(false)
  }, [index])

  // Al bajar, la × se queda arriba sobre una franja blanca (is-stuck) para no tapar el texto
  useEffect(() => {
    if (!p || !topRef.current) return
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      root: dialogRef.current,
      rootMargin: '-12px 0px 0px 0px',
    })
    io.observe(topRef.current)
    return () => io.disconnect()
  }, [p])

  // Foco en el botón de cerrar, Escape para salir, Tab no sale del caso y foco de vuelta al cerrar
  useEffect(() => {
    if (!p) return
    const previous = document.activeElement
    // preventScroll: sin él, el navegador movería el panel a la vista y no se vería entrar
    closeRef.current?.focus({ preventScroll: true })
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
      previous?.focus?.({ preventScroll: true })
    }
  }, [p, onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          ref={dialogRef}
          className={`case${stuck ? ' is-stuck' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          data-lenis-prevent
        >
          {/* Fondo oscurecido: deja ver la web a la izquierda y un clic ahí cierra el caso */}
          <motion.div
            className="case__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.article
            ref={panelRef}
            className="case__panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Marca el inicio del caso y franja que aparece detrás de la × al bajar */}
            <div ref={topRef} className="case__top" aria-hidden="true" />
            <div className="case__band" aria-hidden="true" />
            <button ref={closeRef} className="case__close" onClick={onClose} aria-label="Cerrar caso de estudio">
              ✕
            </button>
            <p className="case__eyebrow">{[p.client, p.year].filter(Boolean).join(' · ')}</p>
            <h2 id="case-title" className="case__title">{p.title}</h2>
            <p className="case__summary">{p.summary}</p>

            <dl className="case__facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="case__cover" style={{ background: p.color }}>
              {p.cover ? <img src={p.cover} alt={`Pantallas de ${p.title}`} /> : <DeviceMock type={p.type} title={p.title} />}
            </div>

            {/* Cada parte sale solo si el caso la tiene en site.js */}
            {p.description && (
              <section>
                <h3>El proyecto</h3>
                <p>{p.description}</p>
              </section>
            )}

            {p.problem && (
              <section>
                <h3>El problema</h3>
                <p>{p.problem}</p>
              </section>
            )}

            {p.process?.length > 0 && (
              <section>
                <h3>Proceso</h3>
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
                <h3>Stack</h3>
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
                <h3>Resultado</h3>
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

            <section className="case__cta">
              <h3>¿Hablamos?</h3>
              <p>¿Tienes un producto que mejorar? Escríbeme y lo vemos juntos.</p>
              <a className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} cta`} href={`mailto:${site.email}`}>Escribirme</a>
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
