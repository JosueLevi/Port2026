import { motion } from 'framer-motion'

// Garabatos dibujados a mano, con el mismo contorno negro que el personaje.
// Son decorativos: los lectores de pantalla los ignoran.

// Al entrar en pantalla, el trazo se dibuja solo
const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
}

// Estrella de cuatro puntas
export function Sparkle({ className = '' }) {
  return (
    <svg className={`doodle sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.9 5.6 3.1 8.6 10.5 10.5-7.4 1.9-9.6 4.9-10.5 10.5-.9-5.6-3.1-8.6-10.5-10.5C8.9 10.1 11.1 7.1 12 1.5Z" />
    </svg>
  )
}

// Subrayado ondulado (amarillo con borde negro)
export function Squiggle({ className = '' }) {
  const d = 'M4 12 C 22 3, 38 20, 58 11 S 94 3, 114 11 S 154 20, 174 10 S 192 6, 196 9'
  return (
    <svg className={`doodle squiggle ${className}`} viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={d} className="squiggle__edge" {...draw} />
      <motion.path d={d} className="squiggle__fill" {...draw} />
    </svg>
  )
}

// Flecha curva, apunta hacia abajo a la derecha (gírala con CSS si hace falta)
export function Arrow({ className = '' }) {
  return (
    <svg className={`doodle arrow ${className}`} viewBox="0 0 80 72" aria-hidden="true">
      <motion.path d="M6 8 C 30 3, 58 14, 64 54" {...draw} />
      <motion.path d="M50 44 L 64 58 L 74 39" {...draw} transition={{ ...draw.transition, delay: 0.7, duration: 0.3 }} />
    </svg>
  )
}

// Iconos de línea para los pasos del proceso y los datos curiosos.
// Usa el nombre en site.js: coffee, music, pin, search, map, pencil, check
const icons = {
  coffee: (
    <>
      <path className="fill-pop" d="M6 13h16v7a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6Z" />
      <path d="M22 15h1.5a3 3 0 0 1 0 6H22" />
      <path d="M11 3.5c-1.6 2 1.6 3 0 5M16.5 3.5c-1.6 2 1.6 3 0 5" />
    </>
  ),
  music: (
    <>
      <path d="M6 19v-3a10 10 0 0 1 20 0v3" />
      <path className="fill-brand" d="M5 18h4.5v9H7a2 2 0 0 1-2-2ZM27 18h-4.5v9H25a2 2 0 0 0 2-2Z" />
    </>
  ),
  pin: (
    <>
      <path className="fill-danger" d="M16 29s-9-8.4-9-15a9 9 0 0 1 18 0c0 6.6-9 15-9 15Z" />
      <circle className="fill-paper" cx="16" cy="14" r="3.4" />
    </>
  ),
  search: (
    <>
      <circle className="fill-paper" cx="14" cy="14" r="8.5" />
      <path d="M20.5 20.5 27 27" />
    </>
  ),
  map: (
    <>
      <path className="fill-paper" d="M5 8.5 12 5.5l8 3 7-3v18.5l-7 3-8-3-7 3Z" />
      <path d="M12 5.5V24M20 8.5V27" />
    </>
  ),
  pencil: (
    <>
      <path className="fill-pop" d="M7 25.5 8.6 19 21 6.6a2.6 2.6 0 0 1 3.7 3.7L12.4 22.6Z" />
      <path d="M19 8.6l3.7 3.7" />
    </>
  ),
  check: (
    <>
      <circle className="fill-paper" cx="16" cy="16" r="11" />
      <path d="M10.5 16.5l4 4 7-8.5" />
    </>
  ),
}

export function LineIcon({ name, className = '' }) {
  if (!icons[name]) return null
  return (
    <svg className={`line-icon ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}
