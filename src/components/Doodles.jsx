// Iconos de línea, con el mismo contorno negro que el personaje.
// Son decorativos: los lectores de pantalla los ignoran.

// Iconos para los pasos del proceso y los datos curiosos.
// Usa el nombre en site.js: coffee, music, ball, pin, search, map, pencil, check
const icons = {
  coffee: (
    <>
      <path className="fill-paper" d="M6 13h16v7a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6Z" />
      <path d="M22 15h1.5a3 3 0 0 1 0 6H22" />
      <path d="M11 3.5c-1.6 2 1.6 3 0 5M16.5 3.5c-1.6 2 1.6 3 0 5" />
    </>
  ),
  music: (
    <>
      <path d="M6 19v-3a10 10 0 0 1 20 0v3" />
      <path className="fill-ink" d="M5 18h4.5v9H7a2 2 0 0 1-2-2ZM27 18h-4.5v9H25a2 2 0 0 0 2-2Z" />
    </>
  ),
  ball: (
    <>
      <circle className="fill-paper" cx="16" cy="16" r="11" />
      <path d="M5 16h22M16 5v22" />
      <path d="M8.2 8.2a11 11 0 0 1 0 15.6M23.8 8.2a11 11 0 0 0 0 15.6" />
    </>
  ),
  pin: (
    <>
      <path className="fill-paper" d="M16 29s-9-8.4-9-15a9 9 0 0 1 18 0c0 6.6-9 15-9 15Z" />
      <circle className="fill-ink" cx="16" cy="14" r="3" />
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
      <path className="fill-paper" d="M7 25.5 8.6 19 21 6.6a2.6 2.6 0 0 1 3.7 3.7L12.4 22.6Z" />
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
