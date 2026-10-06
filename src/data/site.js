// Las rutas de /public ("/assets/...") se adaptan a la dirección de la web
// (en GitHub Pages la web vive en /Port2026/). Escríbelas siempre empezando por "/".
const withBase = (path) => (path?.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path)

// Cambia aquí tus textos y enlaces
const email = 'friaslevi97@gmail.com'

export const site = {
  name: 'Levi',
  logo: 'LV',
  role: 'UX/UI Designer',
  location: 'LIMA, PERÚ',
  email,
  cv: withBase('/cv.pdf'), // pon tu CV en /public/cv.pdf
  // Color de la chaqueta del personaje (null = negro original). Ej: '#2f5bea'
  jacketColor: '#2f5bea',

  // Portada
  heroTitle: 'UX/UI DESIGN',
  // Frase visible en la portada
  tagline: 'Diseño productos digitales claros, útiles y medibles.',
  // Etiqueta con punto verde en la portada (pon null para quitarla)
  status: 'Disponible para proyectos',
  // Lo que leen los lectores de pantalla en el mouse que baja a los casos
  exploreLabel: 'Bajar a los casos de estudio',

  // Cabecera de cada sección: número y nombre pequeños, título grande y entradilla
  sections: {
    work: {
      label: 'Trabajo seleccionado',
      title: 'Casos de estudio',
      intro: 'Proyectos donde el diseño movió métricas. Haz clic en uno para ver cómo lo hice.',
    },
    process: {
      label: 'Proceso',
      title: 'Cómo trabajo',
      intro: 'Mi receta para pasar de una idea a un producto que la gente usa de verdad.',
    },
    about: { label: 'Perfil', title: 'Sobre mí' },
    // El pie de la página
    contact: {
      label: 'Contacto',
      title: 'Hablemos',
      intro: '¿Tienes una idea en mente? Escríbeme y lo vemos juntos.',
    },
  },

  socials: [
    { label: 'Gmail', icon: 'gmail', href: `mailto:${email}` },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/josue-frias-aquino-5955a9256' },
  ],

  // Cuéntalo con tus palabras: tu historia y el tipo de equipo que buscas
  about:
    'Soy diseñador UX/UI en Lima. Me encanta convertir problemas enredados en productos fáciles de usar: hablo con usuarios, ordeno la información, prototipo y valido antes de pasar a desarrollo.',

  // Datos curiosos de "Sobre mí". Iconos: coffee, music, pin, search, map, pencil, check
  facts: [
    { icon: 'coffee', text: 'Funciono a café' },
    { icon: 'music', text: 'Diseño con música' },
    { icon: 'pin', text: 'Desde Lima, Perú' },
  ],

  // Notas cortas junto a las secciones (pon null para quitar una)
  notes: {
    work: '¡haz clic en uno!',
    about: 'este soy yo',
    contact: 'escríbeme, no muerdo :)',
  },

  skills: ['UX Research', 'Arquitectura de información', 'Wireframes', 'UI Design', 'Design Systems', 'Prototipado', 'Testing de usabilidad', 'Accesibilidad'],
  tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Miro', 'Protopie', 'Webflow'],
}

// Pasos del proceso de diseño
export const process = [
  { step: '01', icon: 'search', title: 'Descubrir', text: 'Entrevistas, benchmark y análisis de datos para entender el problema real.' },
  { step: '02', icon: 'map', title: 'Definir', text: 'User personas, journeys y arquitectura de información para priorizar.' },
  { step: '03', icon: 'pencil', title: 'Diseñar', text: 'Wireframes, UI y design system, iterando con el equipo.' },
  { step: '04', icon: 'check', title: 'Validar', text: 'Prototipos y tests de usabilidad antes de pasar a desarrollo.' },
]

// Pantallas del carrusel 3D de la portada.
// `type: 'web'` dibuja una pantalla apaisada con barra de navegador; sin `type` es de móvil.
// Pon tus capturas de apps/webs en /public/assets/img/ y añade `image: '/assets/img/x.webp'`
// (móvil: vertical, unos 9:19,5 · web: apaisada, unos 16:10).
// Sin imagen se dibuja una pantalla de ejemplo con el título.
export const screens = [
  { title: 'Inicio de Levi, gestor de finanzas', image: '/assets/img/gestor-finanzas-movil.webp' },
  { title: 'Web de SISE', type: 'web', image: '/assets/img/sise-web.webp' },
  { title: 'Food App, bienvenida', image: '/assets/img/food-app.webp' },
  { title: 'Coinpay, crear cuenta', image: '/assets/img/coinpay.webp' },
  { title: 'Raven, pronósticos para flora y fauna', type: 'web', image: '/assets/img/raven.webp' },
  { title: 'Fresh Go, inicio', image: '/assets/img/fresh-go.webp' },
  { title: 'Exacta Express, inicio de sesión', type: 'web', image: '/assets/img/exacta-express.webp' },
  { title: 'Aspen, bienvenida', image: '/assets/img/aspen.webp' },
]

// Casos de estudio, en el orden de la pila. `cover` (imagen) o `video` en /public/assets/.
// Sin portada se muestra un móvil o un navegador de ejemplo (`type: 'web'`) sobre el color del caso.
// `tags`: etiquetas cortas que se ven en la tarjeta (tipo de proyecto, plataforma...).
// Solo hacen falta título, año, rol y resumen: lo demás (duration, tools, description, problem,
// process, gallery, stack, metrics) es opcional y, si no lo pones, esa parte no sale en el caso.
export const projects = [
  {
    title: 'Gestor de finanzas personales',
    tags: ['App móvil', 'SaaS'],
    client: 'Proyecto personal',
    year: '2026',
    role: 'UX/UI Designer y Developer',
    color: 'var(--ink)',
    cover: '/assets/img/gestor-finanzas.webp',
    // Más imágenes del caso (salen en el caso abierto, debajo del texto)
    gallery: ['/assets/img/gestor-finanzas-foto.webp'],
    summary: 'Tus finanzas pueden sentirse más simples.',
    // Qué es el producto (sale en el caso abierto, en "El proyecto")
    description:
      'Levi es una plataforma de finanzas personales para registrar ingresos y gastos, organizar movimientos por categorías y controlar presupuestos. Muestra tu saldo, gráficos y comparaciones mensuales para ayudarte a entender en qué se va tu dinero.',
    // Con qué está hecho (sale en el caso abierto, en "Stack")
    stack: [
      { label: 'Frontend', value: 'React 19 con JavaScript/JSX y Vite 8' },
      { label: 'Interfaz', value: 'Tailwind CSS 4 y HeroUI 3' },
      { label: 'Estado', value: 'Zustand' },
      { label: 'Gráficos', value: 'Recharts' },
      { label: 'Animaciones e íconos', value: 'Framer Motion y Lucide React' },
      { label: 'Backend', value: 'Supabase: PostgreSQL, Auth y políticas RLS' },
      { label: 'Despliegue', value: 'Vercel, con el código en GitHub' },
      { label: 'IA', value: 'Codex' },
    ],
  },
  {
    title: 'Dashboard SaaS',
    type: 'web',
    tags: ['Web app', 'Data viz'],
    client: 'Proyecto de ejemplo',
    year: '2025',
    role: 'Product Designer',
    duration: '4 meses',
    tools: 'Figma · FigJam',
    color: 'var(--pop)',
    summary: 'Panel de analítica para equipos de ventas.',
    problem: 'Los usuarios no encontraban los datos clave entre demasiados gráficos.',
    process: [
      'Card sorting con 12 usuarios para priorizar métricas.',
      'Nuevo layout por tareas y design system con 40 componentes.',
      'Test de usabilidad con prototipo de alta fidelidad.',
    ],
    metrics: [
      { value: '4.6/5', label: 'satisfacción (SUS)' },
      { value: '-30%', label: 'tickets de soporte' },
    ],
  },
  {
    title: 'E-commerce',
    tags: ['E-commerce', 'Móvil'],
    client: 'Proyecto de ejemplo',
    year: '2025',
    role: 'UX/UI Designer',
    duration: '2 meses',
    tools: 'Figma · Hotjar',
    color: 'var(--ink)',
    summary: 'Optimización del checkout móvil de una tienda online.',
    problem: 'Alta tasa de abandono del carrito en móvil.',
    process: [
      'Análisis de mapas de calor y grabaciones de sesión.',
      'Checkout en una sola página con pago exprés.',
      'Test A/B frente al flujo anterior.',
    ],
    metrics: [{ value: '+18%', label: 'conversión móvil' }],
  },
  {
    title: 'Design System',
    type: 'web',
    tags: ['Design System', 'Accesibilidad'],
    client: 'Proyecto de ejemplo',
    year: '2024',
    role: 'UI Designer',
    duration: '6 meses',
    tools: 'Figma · Storybook',
    color: 'var(--brand-soft)',
    summary: 'Sistema de diseño accesible para 3 productos.',
    problem: 'Cada producto tenía estilos distintos y el desarrollo era lento.',
    process: [
      'Auditoría de interfaces y tokens de color, tipografía y espaciado.',
      'Librería de componentes con criterios WCAG AA.',
      'Documentación y handoff con el equipo de desarrollo.',
    ],
    metrics: [{ value: '2x', label: 'velocidad de entrega' }],
  },
]

// Aplica la dirección de la web a las imágenes y videos de pantallas y casos
screens.forEach((s) => { s.image = withBase(s.image) })
projects.forEach((p) => {
  p.cover = withBase(p.cover)
  p.video = withBase(p.video)
  p.gallery = p.gallery?.map(withBase)
})

// Nombre del caso para su enlace propio: "App de salud" -> "app-de-salud" (tusitio.com/#caso/app-de-salud)
export const caseSlug = (p) =>
  p.title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
