import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { external } from './Icons.jsx'
import SectionHead from './SectionHead.jsx'

// Enlaces a las secciones que se repiten en el pie
const links = [
  { label: 'Inicio', href: '#top' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Proceso', href: '#process' },
  { label: 'Sobre mí', href: '#about' },
]

export default function Contact() {
  // Botón para copiar el correo, con aviso de "¡Copiado!" durante dos segundos
  const [copied, setCopied] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <SectionHead id="contact-title" number="04" section={site.sections.contact}>
        {site.notes?.contact && <p className="note note--contact" aria-hidden="true">{site.notes.contact}</p>}
      </SectionHead>

      {/* Llamada principal: el correo en grande y, al lado, el botón para copiarlo */}
      <div className="contact__cta">
        <a className="contact__mail" href={`mailto:${site.email}`}>
          {site.email}
          <span className="contact__arrow" aria-hidden="true">↗</span>
        </a>
        <button type="button" className="pill-button pill-button--pop" onClick={copy}>
          {copied ? '¡Copiado!' : 'Copiar correo'}
        </button>
        <span className="sr-only" role="status">{copied ? 'Correo copiado' : ''}</span>
      </div>

      {/* Columnas: secciones, redes y dónde estás */}
      <div className="contact__columns">
        <nav aria-label="Secciones del pie">
          <h3>Secciones</h3>
          <ul>
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3>Redes</h3>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}><a href={s.href} {...external(s.href)}>{s.label} <span aria-hidden="true">↗</span></a></li>
            ))}
          </ul>
        </div>
        <div className="contact__place">
          <h3>Ubicación</h3>
          <p>{site.location}</p>
          {site.status && (
            <p className="contact__status">
              <span className="status__dot" aria-hidden="true" />
              {site.status}
            </p>
          )}
        </div>
        <a className="pill-button contact__top" href="#top">Volver arriba <span aria-hidden="true">↑</span></a>
      </div>

      <div className="contact__bottom">
        <small>© {new Date().getFullYear()} {site.name} · {site.role}</small>
        <small className="contact__credits">
          Componentes animados: <a href="https://rareui.com" target="_blank" rel="noreferrer">Rare UI</a>
        </small>
      </div>
    </footer>
  )
}
