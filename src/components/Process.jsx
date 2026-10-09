import { motion } from 'framer-motion'
import { process, site } from '../data/site.js'
import { LineIcon } from './Doodles.jsx'
import SectionHead from './SectionHead.jsx'

export default function Process() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <SectionHead id="process-title" number="02" section={site.sections.process} />
      <ol className="process__list">
        {process.map((s, i) => (
          <motion.li
            key={s.step}
            className="process__item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="process__top">
              {/* Número solo con el contorno, como el título de la portada; se rellena al pasar el ratón */}
              <span className="process__number" aria-hidden="true">{s.step}</span>
              <LineIcon name={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
