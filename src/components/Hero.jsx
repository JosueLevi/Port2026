import { motion } from 'framer-motion'
import { site } from '../data/site.js'
import Ring from './Ring.jsx'
import Character from './Character.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ onOpenProject }) {
  return (
    <section id="top" className="hero">
      {/* Presentación visible: quién eres y qué haces */}
      <motion.div className="hero__intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
        <h1>Hola, soy {site.name} · {site.role}</h1>
        <p>{site.tagline}</p>
      </motion.div>

      <Ring onOpenProject={onOpenProject} />

      {/* Título curvado: el texto sigue una curva y la perspectiva lo agranda hacia la derecha */}
      <div className="hero__title">
      <motion.svg
        viewBox="0 0 1000 220"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        aria-hidden="true"
      >
        <path id="title-curve" d="M 10 190 Q 520 175 990 120" fill="none" />
        <text textLength="975" lengthAdjust="spacingAndGlyphs">
          <textPath href="#title-curve">{site.heroTitle}</textPath>
        </text>
      </motion.svg>
      </div>

      {/* Textos curvos debajo del carrusel */}
      <svg className="hero__captions" viewBox="0 0 1000 120" aria-hidden="true">
        <path id="caption-curve" d="M 0 110 Q 500 -10 1000 110" fill="none" />
        <text>
          <textPath href="#caption-curve" startOffset="18%" textAnchor="middle">{site.captionLeft}</textPath>
        </text>
        <text>
          <textPath href="#caption-curve" startOffset="82%" textAnchor="middle">{site.captionRight}</textPath>
        </text>
      </svg>

      <div className="hero__character">
        <Character />
      </div>

      <a href="#work" className="hero__explore">
        {site.exploreLabel}
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
