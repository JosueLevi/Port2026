import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import { Pin, socialIcons } from './Icons.jsx'

const tabs = [
  { label: 'WORK', href: '#work', id: 'work' },
  { label: 'PROCESS', href: '#process', id: 'process' },
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
]

export default function Nav() {
  const [active, setActive] = useState('work')

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

  return (
    <header className="nav">
      <div className="nav__left">
        <a href="#top" className="nav__logo" aria-label={site.name}>{site.logo}</a>
        <span className="nav__location"><Pin /> {site.location}</span>
      </div>

      <nav className="nav__tabs" aria-label="Secciones">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={t.href}
            className={active === t.id ? 'is-active' : ''}
            aria-current={active === t.id ? 'true' : undefined}
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
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
              <Icon />
            </a>
          )
        })}
      </div>
    </header>
  )
}
