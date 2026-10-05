import Accent from './Accent.jsx'

/** Número y nombre de la sección, pequeños y sobre una línea fina */
export function SectionMeta({ number, label }) {
  return (
    <p className="section-meta">
      <span>{number}</span>
      <span>{label}</span>
    </p>
  )
}

/**
 * Cabecera de sección: número y nombre, título grande (con su palabra en cursiva)
 * y, a la derecha, la entradilla y lo que se pase como hijos (p. ej. una nota).
 * Los textos salen de site.sections en site.js.
 */
export default function SectionHead({ id, number, section, count, children }) {
  return (
    <header className="section-head">
      <SectionMeta number={number} label={section.label} />
      <div className="section-head__main">
        <h2 id={id} className="section-title">
          <Accent text={section.title} />
          {count && <sup className="section-title__count">({count})</sup>}
        </h2>
        {(section.intro || children) && (
          <div className="section-head__aside">
            {section.intro && <p className="section-intro">{section.intro}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
