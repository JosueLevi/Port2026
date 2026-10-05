import { motion } from 'framer-motion'
import { process } from '../data/site.js'

export default function Process() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="section-head">
        <h2 id="process-title" className="section-title">Cómo trabajo</h2>
      </div>
      <ol className="process__list">
        {process.map((s, i) => (
          <motion.li
            key={s.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <span className="process__step">{s.step}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
