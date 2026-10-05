import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { external, socialIcons } from './Icons.jsx'
import { Sparkle } from './Doodles.jsx'

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
    <footer id="contact" className="contact">
      <Sparkle className="contact__sparkle contact__sparkle--1" />
      <Sparkle className="contact__sparkle contact__sparkle--2" />
      <Sparkle className="contact__sparkle contact__sparkle--3" />

      <p className="contact__lead">{site.contactLead}</p>
      <a className="contact__mail" href={`mailto:${site.email}`}>{site.email}</a>
      {site.notes?.contact && (
        <p className="note note--contact" aria-hidden="true">{site.notes.contact}</p>
      )}

      <div className="contact__actions">
        <button type="button" className="sticker-button sticker-button--pop" onClick={copy}>
          {copied ? '¡Copiado!' : 'Copiar correo'}
        </button>
        {site.socials.map((s) => {
          const Icon = socialIcons[s.icon]
          return (
            <a key={s.label} className="sticker-button" href={s.href} {...external(s.href)}>
              {Icon && <Icon />}
              {s.label}
            </a>
          )
        })}
        <span className="sr-only" role="status">{copied ? 'Correo copiado' : ''}</span>
      </div>

      <small>© {new Date().getFullYear()} {site.name} · {site.role}</small>
      <small className="contact__credits">
        Componentes animados: <a href="https://rareui.com" target="_blank" rel="noreferrer">Rare UI</a>
      </small>
    </footer>
  )
}
