// Cambia aquí tus textos y enlaces
export const site = {
  name: 'Levi',
  logo: 'LV',
  role: 'UX/UI Designer',
  location: 'TU CIUDAD, PAÍS',
  email: 'hola@tudominio.com',
  cv: '/cv.pdf', // pon tu CV en /public/cv.pdf
  character: '/assets/img/personaje.png',
  // Color de la chaqueta del personaje (null = negro original). Ej: '#2f5bea'
  jacketColor: '#2f5bea',

  // Portada
  heroTitle: 'UX/UI DESIGN',
  // Frase visible en la portada y texto del botón que baja a los casos
  tagline: 'Diseño productos digitales claros, útiles y medibles.',
  exploreLabel: 'VER CASOS',
  captionLeft: 'PRODUCT DESIGNER',
  captionRight: 'RESEARCH → UI → PROTOTIPO',

  socials: [
    { label: 'Telegram', icon: 'telegram', href: 'https://t.me/' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/' },
  ],

  about:
    'Diseñador UX/UI. Convierto problemas de negocio en productos fáciles de usar: investigo con usuarios, ordeno la información, prototipo y valido antes de pasar a desarrollo. Cambia este texto por tu historia y el tipo de equipo que buscas.',

  skills: ['UX Research', 'Arquitectura de información', 'Wireframes', 'UI Design', 'Design Systems', 'Prototipado', 'Testing de usabilidad', 'Accesibilidad'],
  tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Miro', 'Protopie', 'Webflow'],
}

// Pasos del proceso de diseño
export const process = [
  { step: '01', title: 'Descubrir', text: 'Entrevistas, benchmark y análisis de datos para entender el problema real.' },
  { step: '02', title: 'Definir', text: 'User personas, journeys y arquitectura de información para priorizar.' },
  { step: '03', title: 'Diseñar', text: 'Wireframes, UI y design system, iterando con el equipo.' },
  { step: '04', title: 'Validar', text: 'Prototipos y tests de usabilidad antes de pasar a desarrollo.' },
]

// Pantallas del carrusel 3D de la portada.
// Pon tus capturas de apps/webs en /public/assets/img/ y añade `image: '/assets/img/x.webp'`.
// `project` es el índice del caso de estudio que se abre al hacer clic (opcional).
// Sin imagen se dibuja una pantalla de ejemplo con el título.
export const screens = [
  { title: 'Onboarding', project: 0 },
  { title: 'Dashboard', project: 1 },
  { title: 'Checkout', project: 2 },
  { title: 'Perfil', project: 0 },
  { title: 'Chat', project: 1 },
  { title: 'Búsqueda', project: 2 },
  { title: 'Ajustes', project: 3 },
  { title: 'Agenda', project: 3 },
]

// Casos de estudio. `cover` (imagen) o `video` en /public/assets/.
// Sin portada se muestra un bloque de color.
export const projects = [
  {
    title: 'App de salud',
    client: 'Proyecto de ejemplo',
    year: '2026',
    role: 'UX/UI Designer',
    duration: '3 meses',
    tools: 'Figma · Maze',
    color: '#111111',
    summary: 'Rediseño del onboarding de una app de seguimiento de hábitos.',
    problem: 'El 60% de los usuarios abandonaba la app antes de terminar el registro.',
    process: [
      '8 entrevistas con usuarios y análisis del embudo de registro.',
      'Reducción del registro de 7 a 3 pasos y nueva arquitectura de información.',
      'Prototipo en Figma validado con 2 rondas de test en Maze.',
    ],
    metrics: [
      { value: '+35%', label: 'registros completados' },
      { value: '-50%', label: 'tiempo de onboarding' },
    ],
  },
  {
    title: 'Dashboard SaaS',
    client: 'Proyecto de ejemplo',
    year: '2025',
    role: 'Product Designer',
    duration: '4 meses',
    tools: 'Figma · FigJam',
    color: '#e6e6e6',
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
    client: 'Proyecto de ejemplo',
    year: '2025',
    role: 'UX/UI Designer',
    duration: '2 meses',
    tools: 'Figma · Hotjar',
    color: '#2a2a2a',
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
    client: 'Proyecto de ejemplo',
    year: '2024',
    role: 'UI Designer',
    duration: '6 meses',
    tools: 'Figma · Storybook',
    color: '#d4d4d4',
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

// Nombre del caso para su enlace propio: "App de salud" -> "app-de-salud" (tusitio.com/#caso/app-de-salud)
export const caseSlug = (p) =>
  p.title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
