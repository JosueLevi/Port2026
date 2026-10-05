import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../data/site.js'
import Ring from './Ring.jsx'
import Character from './Character.jsx'
import HeroTitle from './HeroTitle.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ onOpenProject }) {
  // La portada se queda fija: al bajar, las demás secciones suben por encima
  // y la portada se aleja y oscurece un poco (0 = arriba, 1 = ya tapada)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const covered = useTransform(scrollY, (y) => Math.min(Math.max(y / window.innerHeight, 0), 1))
  const scale = useTransform(covered, [0, 1], [1, reduce ? 1 : 0.92])
  const radius = useTransform(covered, [0, 1], [0, reduce ? 0 : 32])
  const shade = useTransform(covered, [0, 1], [0, 0.2])

  return (
    <motion.section id="top" className="hero" style={{ scale, borderRadius: radius }}>
      {/* Presentación visible: quién eres y qué haces */}
      <motion.div className="hero__intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
        {site.status && (
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            {site.status}
          </p>
        )}
        <h1>Hola, soy {site.name} · {site.role}</h1>
        <p>{site.tagline}</p>
      </motion.div>

      <Ring onOpenProject={onOpenProject} />

      {/* Título horizontal: primero se dibuja el contorno y luego se pinta el relleno */}
      <div className="hero__title">
        <HeroTitle text={site.heroTitle} />
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
      <motion.div className="hero__shade" style={{ opacity: shade }} aria-hidden="true" />
    </motion.section>
  )
}
