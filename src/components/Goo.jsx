/**
 * Filtro "gooey" (metaballs): desenfoca las formas y endurece el borde transparente, así dos formas
 * cercanas se ven fundidas como gotas. Se aplica solo a una capa de fondo; el contenido va encima, nítido.
 * Uso: <GooFilter id="x" /> una vez y `filter: url(#x)` en la capa de fondo.
 */
export default function GooFilter({ id, blur = 10 }) {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* Área amplia para que las gotas que salen de la forma no se recorten */}
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}
