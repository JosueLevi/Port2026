import { useEffect, useRef, useState } from 'react'
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
import { projects, caseSlug } from './data/site.js'
import ScrollProgress from '@/components/ui/scroll-progress'

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
  const [openProject, setOpenProject] = useState(null)

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
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  // Si la dirección trae #caso/nombre (un enlace compartido), abre ese caso
  useEffect(() => {
    const m = window.location.hash.match(/^#caso\/(.+)$/)
    if (!m) return
    const i = projects.findIndex((p) => caseSlug(p) === decodeURIComponent(m[1]))
    if (i >= 0) setOpenProject(i)
  }, [])

  // Cada caso abierto tiene su propia dirección para poder compartirla
  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (openProject !== null) {
      window.history.replaceState(null, '', `#caso/${caseSlug(projects[openProject])}`)
    } else if (hash.startsWith('#caso/')) {
      window.history.replaceState(null, '', pathname + search)
    }
  }, [openProject])

  // Con un caso de estudio abierto, la página de fondo no se mueve
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    openProject === null ? lenis.start() : lenis.stop()
  }, [openProject])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="skip-link">Saltar al contenido</a>
      <Cursor />
      <Nav />
      <main>
        <Hero onOpenProject={setOpenProject} />
        {/* Hoja que sube por encima de la portada fija */}
        <div className="sheet">
          <Work onOpenProject={setOpenProject} />
          <Process />
          <About />
        </div>
      </main>
      <Contact />
      <CaseStudy index={openProject} onClose={() => setOpenProject(null)} onNavigate={setOpenProject} />
      {openProject === null && (
        <ScrollProgress sections={sections} className="progress-pill" />
      )}
    </MotionConfig>
  )
}
