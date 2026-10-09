import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { projects, caseSlug, site } from './data/site.js'
import ScrollProgress from '@/components/ui/scroll-progress'

// Caso que indica la dirección (#caso/nombre), o null si no hay ninguno
const caseFromHash = () => {
  const m = window.location.hash.match(/^#caso\/(.+)$/)
  if (!m) return null
  const i = projects.findIndex((p) => caseSlug(p) === decodeURIComponent(m[1]))
  return i >= 0 ? i : null
}
const caseUrl = (i) => `#caso/${caseSlug(projects[i])}`
const pageUrl = () => window.location.pathname + window.location.search
const homeTitle = document.title
const inView = (el) => {
  const r = el?.getBoundingClientRect()
  return !!r && r.bottom > 0 && r.top < window.innerHeight
}

// Secciones que muestra la píldora de progreso (Rare UI)
const sections = [
  { id: 'top', label: 'Inicio' },
  { id: 'work', label: 'Casos de estudio' },
  { id: 'process', label: 'Proceso' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' },
]

export default function App() {
  const lenisRef = useRef(null)
  // Cada caso es una página propia: mientras está abierto, el inicio se oculta (sin perder dónde estabas)
  const [openProject, setOpenProject] = useState(caseFromHash)
  const current = useRef(openProject) // vista actual, para los avisos de Atrás y Adelante
  const returnY = useRef(0) // dónde estaba el inicio al abrir el caso
  const opener = useRef(null) // tarjeta que abrió el caso, para devolverle el foco al volver
  const goTo = useRef(null) // sección del inicio a la que ir al salir del caso desde el menú o el pie
  const closing = useRef(false)

  // Lenis sigue deslizando la página un momento después de mover la rueda y, mientras tanto, deshace los saltos
  // que no hace él: un caso abierto justo después acababa a media página, donde iba a parar el deslizamiento.
  // Esto lo para en seco; desde el siguiente cuadro sigue normal, desde donde haya quedado la página.
  const stopGlide = () => {
    const lenis = lenisRef.current
    if (!lenis || lenis.isStopped) return
    lenis.stop()
    requestAnimationFrame(() => lenis.start())
  }

  // Scroll suave
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    // En el inicio, los enlaces a una sección (menú, "Volver arriba"…) saltan con el navegador: antes se para
    // el deslizamiento. Dentro de un caso esos enlaces los maneja la web (más abajo).
    const onAnchor = (e) => {
      if (current.current === null && e.target.closest?.('a[href^="#"]')) stopGlide()
    }
    document.addEventListener('click', onAnchor)
    return () => {
      document.removeEventListener('click', onAnchor)
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  // Cambia entre el inicio (null) y un caso. Si el navegador sabe hacer transiciones entre vistas,
  // la imagen de la tarjeta crece hasta ser la portada del caso (y al volver, al revés); el resto se funde.
  const show = (i, { morph = true } = {}) => {
    const from = current.current
    if (from === i) return
    const card = (k) => document.querySelector(`.case-card__media[data-case="${k}"]`)
    const cover = () => document.querySelector('.case__cover')
    if (from === null) {
      returnY.current = window.scrollY
      opener.current = card(i)?.closest('.case-card')?.querySelector('button') ?? document.activeElement
    }
    current.current = i
    const update = () => flushSync(() => setOpenProject(i))
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return update()

    const named = []
    const name = (el) => {
      if (!el) return
      el.style.viewTransitionName = 'case-cover'
      named.push(el)
    }
    const unname = () => named.splice(0).forEach((el) => (el.style.viewTransitionName = ''))
    // Solo se anima la imagen si se ve en pantalla; si no (p. ej. al final del caso), todo se funde
    const opening = morph && from === null && inView(card(i))
    const closingCase = morph && i === null && inView(cover())
    if (opening) name(card(i))
    if (closingCase) name(cover())
    const transition = document.startViewTransition(() => {
      unname()
      update()
      if (opening) name(cover())
      if (closingCase && inView(card(from))) name(card(from))
    })
    transition.ready.catch(() => {}) // si otra transición la interrumpe, simplemente no se anima
    transition.finished.finally(unname)
  }

  // Abrir un caso añade un paso al historial: así Atrás (navegador o celular) vuelve al inicio, a la misma tarjeta.
  // Pasar al caso anterior o siguiente no añade pasos.
  const openCase = (i) => {
    if (window.history.state?.caso) window.history.replaceState({ caso: true }, '', caseUrl(i))
    else window.history.pushState({ caso: true }, '', caseUrl(i))
    show(i)
  }
  const closeCase = () => {
    if (closing.current) return // un doble clic en "← Proyectos" no debe retroceder dos pasos
    // Si el paso del caso lo añadimos nosotros, se deshace (como pulsar Atrás); si no, solo se quita de la dirección
    if (window.history.state?.caso) {
      closing.current = true
      return window.history.back()
    }
    window.history.replaceState(null, '', pageUrl())
    show(null)
  }

  // El navegador no recoloca el scroll al ir Atrás o Adelante: lo hace la web, que sabe dónde estabas
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Atrás y Adelante: se muestra el caso o el inicio según la dirección.
  // hasUAVisualTransition: si el celular ya animó el gesto de volver, no se anima otra vez.
  useEffect(() => {
    const sync = (e) => {
      closing.current = false
      show(caseFromHash(), { morph: !e.hasUAVisualTransition })
    }
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  // Si la web se abre con el enlace de un caso, el inicio queda un paso antes en el historial:
  // Atrás te deja en la web en vez de sacarte
  useEffect(() => {
    const i = caseFromHash()
    if (i === null || window.history.state?.caso) return
    window.history.replaceState(null, '', pageUrl())
    window.history.pushState({ caso: true }, '', caseUrl(i))
  }, [])

  // Dentro de un caso, los enlaces del menú y del pie (Proceso, Sobre mí…) vuelven al inicio y bajan a esa sección.
  // "Volver arriba" sube al principio del caso.
  useEffect(() => {
    if (openProject === null) return
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash.startsWith('#caso/')) return
      e.preventDefault()
      if (link.classList.contains('contact__top')) return lenisRef.current?.scrollTo(0)
      goTo.current = hash
      closeCase()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [openProject])

  // Al cambiar de vista: el caso empieza arriba; el inicio vuelve a donde estabas (o a la sección elegida)
  const firstView = useRef(true)
  useLayoutEffect(() => {
    if (firstView.current) {
      firstView.current = false
      return
    }
    stopGlide()
    if (openProject !== null) {
      window.scrollTo(0, 0)
    } else {
      const section = goTo.current && document.querySelector(goTo.current)
      if (section) section.scrollIntoView()
      else window.scrollTo(0, returnY.current)
    }
    lenisRef.current?.resize()
  }, [openProject])

  // Título de la pestaña y foco: en el título del caso al abrirlo, y de vuelta en la tarjeta al volver
  const firstFocus = useRef(true)
  useEffect(() => {
    document.title = openProject === null ? homeTitle : `${projects[openProject].title} · ${site.name}`
    if (firstFocus.current) {
      firstFocus.current = false
      return
    }
    if (openProject !== null) document.getElementById('case-title')?.focus({ preventScroll: true })
    else if (!goTo.current && opener.current?.isConnected) opener.current.focus({ preventScroll: true })
    if (openProject === null) {
      goTo.current = null
      opener.current = null
    }
  }, [openProject])

  const caseOpen = openProject !== null

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="skip-link"
        onClick={(e) => {
          // En un caso, saltar al contenido es ir a su título
          if (!caseOpen) return
          e.preventDefault()
          document.getElementById('case-title')?.focus()
        }}
      >
        Saltar al contenido
      </a>
      <Cursor view={openProject} />
      <Nav current={caseOpen ? 'work' : null} />
      {/* #top va en <main> y no en la portada: la portada es fija (sticky) y el navegador no sabría subir hasta ella */}
      <main id="top" hidden={caseOpen}>
        <Hero />
        {/* Hoja que sube por encima de la portada fija */}
        <div className="sheet">
          <Work onOpenProject={openCase} />
          <Process />
          <About />
        </div>
      </main>
      {caseOpen && <CaseStudy index={openProject} onClose={closeCase} onNavigate={openCase} />}
      <Contact />
      {!caseOpen && (
        // offset: la sección cuenta como activa al llegar a media pantalla (así Contacto también se marca)
        <ScrollProgress sections={sections} offset={Math.round(window.innerHeight / 2)} className="progress-pill" />
      )}
    </MotionConfig>
  )
}
