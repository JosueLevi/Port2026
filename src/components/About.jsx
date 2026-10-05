import { motion } from 'framer-motion'
import { site } from '../data/site.js'

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <motion.img
        src={site.character}
        alt=""
        className="about__character"
        initial={{ rotate: -6, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h2 id="about-title" className="section-title">Sobre mí</h2>
        <p className="about__text">{site.about}</p>

        <div className="about__lists">
          <div>
            <h3>Habilidades</h3>
            <ul className="tags">
              {site.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Herramientas</h3>
            <ul className="tags">
              {site.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <a className="button" href={site.cv} download>Descargar CV ↓</a>
      </motion.div>
    </section>
  )
}
