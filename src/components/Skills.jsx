import { motion } from 'framer-motion'
import { competencies, projects, caseSlug, site } from '../data/site.js'
import SectionHead from './SectionHead.jsx'

/**
 * Competencias en práctica: cada una con su evidencia y enlaces a los casos donde se ve.
 * Los textos salen de `competencies` en site.js.
 */
export default function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <SectionHead id="skills-title" number="03" section={site.sections.skills} />
      <ul className="skills__list">
        {competencies.map((c, i) => {
          // Solo enlaza a casos que existen (los borradores no salen en la web)
          const cases = (c.cases ?? []).filter((title) => projects.some((p) => p.title === title))
          return (
            <motion.li
              key={c.title}
              className="skills__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
            >
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              {cases.length > 0 && (
                <p className="skills__cases">
                  <span>Se ve en</span>
                  {cases.map((title) => (
                    <a key={title} href={`#caso/${caseSlug({ title })}`}>{title} →</a>
                  ))}
                </p>
              )}
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
