import { site } from '../data/site.js'

export default function Contact() {
  return (
    <footer id="contact" className="contact">
      <p>¿Tienes un producto que mejorar?</p>
      <a className="contact__mail" href={`mailto:${site.email}`}>{site.email}</a>
      <div className="contact__socials">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>
      <small>© {new Date().getFullYear()} {site.name} · {site.role}</small>
      <small className="contact__credits">
        Componentes animados: <a href="https://rareui.com" target="_blank" rel="noreferrer">Rare UI</a>
      </small>
    </footer>
  )
}
