import { motion } from 'framer-motion'
import { Chip } from '@heroui/react'
import { process } from '../data/site.js'
import { LineIcon, Sparkle } from './Doodles.jsx'

// Un color por paso (colores del tema de HeroUI, ver :root en styles.css)
const stepColors = ['accent', 'warning', 'success', 'danger']
// Fondo suave de cada tarjeta
const tones = ['var(--brand-soft)', 'var(--pop-soft)', 'var(--success-soft)', 'var(--danger-soft)']

export default function Process() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="section-head">
        <div className="section-head__title">
          <h2 id="process-title" className="section-title">Cómo trabajo</h2>
          <Sparkle className="section-title__sparkle" />
        </div>
        <p className="section-intro">Mi receta para pasar de una idea a un producto que la gente usa de verdad.</p>
      </div>
      <ol className="process__list">
        {process.map((s, i) => (
          <motion.li
            key={s.step}
            className="process__card"
            style={{ '--tone': tones[i % tones.length] }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="process__top">
              <Chip className="process__step" color={stepColors[i % stepColors.length]} variant="primary">{s.step}</Chip>
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
