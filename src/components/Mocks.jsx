// Pantallas de ejemplo para cuando aún no hay capturas: se usan en el carrusel,
// en las tarjetas de los casos y en la portada de cada caso.

// Pantalla de móvil de ejemplo
export function MockScreen({ title }) {
  return (
    <div className="mock">
      <div className="mock__bar" />
      <div className="mock__avatar" />
      <p className="mock__title">{title}</p>
      <div className="mock__line" />
      <div className="mock__line mock__line--short" />
      <div className="mock__block" />
      <div className="mock__line" />
      <div className="mock__line mock__line--short" />
      <div className="mock__button" />
    </div>
  )
}

// Aplicación web de ejemplo: menú lateral, título y bloques de contenido
export function MockWeb({ title }) {
  return (
    <div className="mockweb">
      <div className="mockweb__side">
        <div className="mock__avatar" />
        <div className="mock__line" />
        <div className="mock__line mock__line--short" />
        <div className="mock__line" />
        <div className="mock__line mock__line--short" />
      </div>
      <div className="mockweb__main">
        <p className="mock__title">{title}</p>
        <div className="mockweb__cards">
          <div className="mock__block" />
          <div className="mock__block" />
          <div className="mock__block" />
        </div>
        <div className="mock__block mockweb__chart" />
      </div>
    </div>
  )
}

// Barra de navegador que enmarca las pantallas web
export function BrowserBar() {
  return (
    <div className="browser">
      <span /><span /><span />
      <div className="browser__url" />
    </div>
  )
}

// Móvil o navegador inclinado que asoma desde abajo, sobre el color del caso
export function DeviceMock({ type, title }) {
  return type === 'web' ? (
    <div className="device device--web" aria-hidden="true">
      <BrowserBar />
      <MockWeb title={title} />
    </div>
  ) : (
    <div className="device device--mobile" aria-hidden="true">
      <MockScreen title={title} />
    </div>
  )
}
