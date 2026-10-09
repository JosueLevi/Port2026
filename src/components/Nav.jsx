import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { Pin, external, socialIcons } from './Icons.jsx'
import Logo from './Logo.jsx'

const tabs = [
  { label: 'PROYECTOS', href: '#work', id: 'work' },
  { label: 'PROCESO', href: '#process', id: 'process' },
  { label: 'SOBRE MÍ', href: '#about', id: 'about' },
  { label: 'CONTACTO', href: '#contact', id: 'contact' },
]

// current: pestaña que se marca sí o sí (p. ej. Proyectos dentro de un caso)
export default function Nav({ current }) {
  const [active, setActive] = useState('work')
  const shown = current ?? active
  const ref = useRef(null)
  const [onFooter, setOnFooter] = useState(false)

  // Marca la pestaña de la sección que se está viendo
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    tabs.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Sobre el pie, que es negro, el menú también se pone negro: desde que el borde de arriba del pie llega al menú
  // (con un píxel de margen, por los decimales de las medidas)
  useEffect(() => {
    const footer = document.getElementById('contact')
    if (!footer) return
    const check = () => setOnFooter(footer.getBoundingClientRect().top - ref.current.getBoundingClientRect().bottom < 1)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    // También cuando cambia el alto de la página sin hacer scroll (al abrir un caso, al cargar imágenes…)
    const ro = new ResizeObserver(check)
    ro.observe(document.documentElement)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      ro.disconnect()
    }
  }, [])

  return (
    <header ref={ref} className={onFooter ? 'nav nav--dark' : 'nav'}>
      <div className="nav__left">
        <a href="#top" className="nav__logo" aria-label={site.name}><Logo /></a>
        <span className="nav__location"><Pin /> {site.location}</span>
      </div>

      <nav className="nav__tabs" aria-label="Secciones">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={t.href}
            className={shown === t.id ? 'is-active' : ''}
            aria-current={shown === t.id ? 'true' : undefined}
          >
            {t.label}
          </a>
        ))}
      </nav>

      <div className="nav__right">
        <a href={`mailto:${site.email}`} className="nav__mail">{site.email}</a>
        {site.socials.map((s) => {
          const Icon = socialIcons[s.icon]
          return (
            <a key={s.label} href={s.href} {...external(s.href)} aria-label={s.label}>
              <Icon />
            </a>
          )
        })}
      </div>
    </header>
  )
}
