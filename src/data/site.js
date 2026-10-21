// Las rutas de /public ("/assets/...") se adaptan a la dirección de la web
// (en GitHub Pages la web vive en /Port2026/). Escríbelas siempre empezando por "/".
const withBase = (path) => (path?.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path)

// Cambia aquí tus textos y enlaces
const email = 'friaslevi97@gmail.com'

export const site = {
  name: 'Levi',
  role: 'UX/UI Designer',
  location: 'LIMA, PERÚ',
  email,
  // CV para descargar: pon el archivo en /public/cv.pdf y aquí withBase('/cv.pdf'); con null no sale el botón
  cv: null,
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
      intro: 'Proyectos reales, del problema a la solución. Haz clic en uno para ver cómo lo hice.',
    },
    process: {
      label: 'Proceso',
      title: 'Cómo trabajo',
      intro: 'Mi receta para pasar de una idea a un producto que la gente usa de verdad.',
    },
    skills: {
      label: 'Competencias',
      title: 'En la práctica',
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
  // Versión anterior: 'Ingeniero de Sistemas con cuatro años de experiencia especializada en diseño UX/UI, con un enfoque en diseño web, desarrollo de aplicaciones y plataformas digitales. A lo largo de mi carrera, he perfeccionado mis habilidades para crear soluciones innovadoras, funcionales y altamente intuitivas, siempre orientadas a ofrecer un valor excepcional a los clientes.'
  about:
    'Ingeniero de Sistemas y diseñador UX/UI con cuatro años de experiencia. Diseño productos digitales complejos, como BackOffices logísticos, plataformas agrícolas y apps de finanzas, partiendo de investigación con usuarios: entrevistas, card sorting y pruebas con prototipos. Me muevo cómodo entre Figma y el código, y busco equipos de producto donde el diseño se decida con datos y con los usuarios.',

  // Datos curiosos de "Sobre mí". Iconos: coffee, music, ball, pin, search, map, pencil, check
  facts: [
    { icon: 'coffee', text: 'Funciono a café' },
    { icon: 'music', text: 'Diseño con música' },
    { icon: 'ball', text: 'Juego básquet' },
    { icon: 'pin', text: 'Desde Lima, Perú' },
  ],

  // Notas cortas junto a las secciones (pon null para quitar una)
  notes: {
    work: null,
    about: null,
    contact: 'escríbeme, no muerdo :)',
  },

  skills: ['UX Research', 'Arquitectura de información', 'Wireframes', 'UI Design', 'Design Systems', 'Prototipado', 'Testing de usabilidad', 'Accesibilidad (WCAG)'],
  tools: ['Figma', 'Figma Make', 'FigJam', 'Maze', 'Hotjar', 'GA4', 'Power BI', 'Notion', 'Miro', 'Protopie', 'Webflow', 'HTML', 'CSS', 'JavaScript', 'Codex', 'Claude'],
  // Cursos y certificaciones (salen en "Sobre mí", debajo de las herramientas). `year` es opcional
  certifications: [
    { title: 'UX/UI 360°', org: 'Toulouse Lautrec', year: '2026' },
    { title: 'UX Writer', org: 'Udemy', year: '2026' },
    { title: 'Google UX Design Certificate', org: 'Google', year: '2023' },
    { title: 'Product Designer', org: 'Udemy', year: '2022' },
    { title: 'Especialista en Microsoft Excel Nivel Avanzado', org: 'IDAT', year: '2022' },
    { title: 'CCNA 3', org: 'Cisco', year: '2022' },
    { title: 'CareerFoundry UX Design Certification', org: 'CareerFoundry', year: '2021' },
    { title: 'Scrum Master', year: '2021' },
  ],
}

// Competencias en práctica: cada una con dónde se ve en los casos. `cases`: títulos de casos de `projects`
// (salen como enlaces que abren el caso). Solo lo que de verdad hiciste: en una entrevista te lo van a preguntar
export const competencies = [
  {
    title: 'Figma de punta a punta',
    text: 'User flows, wireframes de baja fidelidad, prototipos navegables e interfaces de alta fidelidad, todo en Figma. Raven son 49 pantallas, y los dos prototipos se pueden abrir desde su caso.',
    cases: ['Raven', 'Talmaclick'],
  },
  {
    title: 'Design System',
    text: 'Phonesys, el sistema de diseño de Raven: estilos de color con escalas y colores de estado, tipografía, íconos, y 335 componentes con variantes (con fondo, de contorno y sin fondo) y estados para mantener la consistencia visual.',
    cases: ['Raven'],
  },
  {
    title: 'Discovery y arquitectura de información',
    text: '12 entrevistas a profundidad y un card sorting abierto con 15 usuarios para reordenar el sistema: de 9 opciones de menú con siglas internas a 3 módulos y 2 niveles.',
    cases: ['Talmaclick'],
  },
  {
    title: 'Validación con usuarios',
    text: 'Pruebas de usabilidad con prototipos en Maze, con tareas reales, para encontrar problemas antes de pasar a desarrollo y convertirlos en cambios concretos de diseño.',
  },
  {
    title: 'Analítica para encontrar oportunidades',
    text: 'Hotjar para ver mapas de calor y grabaciones de sesión, y consultas en GA4 y Power BI para medir comportamiento, abandono y eficiencia de las tareas.',
  },
  {
    title: 'Accesibilidad',
    // Solo lo verificado: contrastes medidos en las paletas de los casos
    text: 'Textos con contraste AA: el azul de Talmaclick con blanco llega a 12,9:1 y el texto de Raven sobre blanco a 13:1. Los estados nunca dependen solo del color, siempre llevan texto (WCAG 1.4.1).',
    cases: ['Raven', 'Talmaclick'],
  },
  {
    title: 'Usuario, negocio y tecnología',
    text: 'Diseño junto a Product Owner, desarrollo y negocio, y sustento cada decisión con lo que vi en la investigación. En el gestor de finanzas también hice el desarrollo, en React y Supabase.',
    cases: ['Talmaclick', 'Gestor de finanzas personales'],
  },
  {
    title: 'Plataformas transaccionales, autoservicio y móvil',
    text: 'Un BackOffice de carga aérea donde los agentes gestionan sus guías sin llamar al counter, una plataforma de pronóstico de cosecha y una app de finanzas pensada también para el celular.',
    cases: ['Talmaclick', 'Raven', 'Gestor de finanzas personales'],
  },
]

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
// Solo hacen falta título, año, rol y resumen: lo demás (live, platform, duration, tools, description, problem,
// users, process, flow, screens, mobile, promo, designSystem, decisions, gallery, stack, metrics, next, extras, credits) es opcional y, si no lo pones,
// esa parte no sale en el caso.
// `draft: true` deja el caso guardado aquí pero fuera de la web (los de ejemplo, hasta tener los reales).
export const projects = [
  {
    title: 'Gestor de finanzas personales',
    tags: ['App móvil', 'SaaS'],
    client: 'Proyecto personal',
    year: '2026',
    role: 'UX/UI Designer y Developer',
    color: 'var(--ink)',
    cover: '/assets/img/gestor-finanzas.webp',
    // Qué parte de la portada se ve en el caso abierto, que la recorta más baja (por defecto, el centro)
    coverPosition: 'top',
    // Flujo de usuario (sale en "Proceso", con el texto al lado). `mobile`: versión vertical para celular y tablet
    flow: {
      src: '/assets/img/gestor-finanzas-flujo.webp',
      mobile: '/assets/img/gestor-finanzas-flujo-movil.webp',
      alt: 'Flujo de usuario de Levi: entrar; si no tiene cuenta, crearla y confirmar el correo; iniciar sesión; llegar al Dashboard y desde ahí ir y volver a Registro de movimientos, Comparar meses y Configuración',
      caption:
        'Flujo de usuario: quien no tiene cuenta la crea y confirma su correo antes de iniciar sesión. Ya dentro, todo parte del Dashboard, desde donde se va y se vuelve a Registro de movimientos, Comparar meses y Configuración.',
    },
    // Pantallas principales (salen en "Pantallas", de dos en dos, cada una con su texto debajo)
    screens: [
      {
        src: '/assets/img/gestor-finanzas-login.webp',
        title: 'Inicio de sesión',
        caption: 'Entrar y crear cuenta comparten pantalla, con pestañas, y el tono es cercano desde el primer mensaje.',
        alt: 'Pantalla de inicio de sesión de Levi, con la ilustración a la izquierda y el formulario a la derecha',
      },
      {
        src: '/assets/img/gestor-finanzas-dashboard.webp',
        title: 'Dashboard',
        caption: 'El saldo estimado de hoy va primero y en grande. Debajo, el resumen del mes y en qué categorías se va el dinero.',
        alt: 'Dashboard de Levi con el saldo estimado, el resumen del mes y un gráfico de gastos por categoría',
      },
      {
        src: '/assets/img/gestor-finanzas-registro.webp',
        title: 'Registro',
        caption: 'Los movimientos del mes en una tabla, con buscador, filtros por tipo y los totales de lo que estás viendo.',
        alt: 'Pantalla de registro de Levi con buscador, filtros y la tabla de movimientos del mes',
      },
      {
        src: '/assets/img/gestor-finanzas-categorias.webp',
        title: 'Categorías',
        caption: 'Cada persona crea sus categorías con nombre, tipo, color e ícono, o añade las sugeridas para empezar rápido.',
        alt: 'Pantalla de categorías de Levi con el formulario para crear una y la lista de categorías',
      },
    ],
    // Versión para celular (sale en "Versión móvil": las pantallas en fila, cada una con su nombre debajo)
    mobile: {
      caption:
        'La misma app en el celular: el menú lateral pasa a una barra abajo, al alcance del pulgar, y la tabla de movimientos se convierte en tarjetas.',
      // Tamaño en píxeles de las capturas (todas iguales): guarda su lugar mientras cargan, para que la página no salte
      width: 436,
      height: 813,
      screens: [
        {
          src: '/assets/img/gestor-finanzas-movil-login.webp',
          title: 'Inicio de sesión',
          alt: 'Inicio de sesión de Levi en el celular, con la ilustración arriba y el formulario debajo',
        },
        {
          src: '/assets/img/gestor-finanzas-movil-inicio.webp',
          title: 'Inicio',
          alt: 'Inicio de Levi en el celular, con el saludo, el saldo estimado de hoy y la barra de navegación abajo',
        },
        {
          src: '/assets/img/gestor-finanzas-movil-registro.webp',
          title: 'Registro',
          alt: 'Registro de Levi en el celular, con el buscador, los filtros y los movimientos del mes en tarjetas',
        },
        {
          src: '/assets/img/gestor-finanzas-movil-ajustes.webp',
          title: 'Ajustes',
          alt: 'Ajustes de Levi en el celular, con el formulario para crear una categoría',
        },
      ],
    },
    // Video de presentación (sale en "La app en acción", después de la versión móvil; con controles, porque tiene música).
    // `poster`: la imagen que se ve antes de darle a reproducir
    promo: {
      src: '/assets/video/gestor-finanzas-presentacion.mp4',
      poster: '/assets/img/gestor-finanzas-presentacion.webp',
      caption:
        'Video de presentación de 22 segundos, con música. Muestra el problema que resuelve Levi y sus tres funciones clave: registrar movimientos, ponerle límite a cada categoría y ver en qué se va el dinero.',
    },
    summary: 'Tus finanzas pueden sentirse más simples.',
    // App publicada (sale en el caso abierto, debajo del resumen; se abre en otra pestaña)
    live: { url: 'https://gestor-de-gastos-gamma.vercel.app/', label: 'Visitar la app' },
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
    title: 'Raven',
    type: 'web',
    tags: ['Web app', 'Agrotech'],
    year: '2025',
    role: 'UX/UI Designer',
    // Sale en los datos de arriba del caso, junto al rol y las herramientas
    platform: 'Web de escritorio',
    tools: 'Figma',
    color: 'var(--ink)',
    cover: '/assets/img/raven-portada.webp',
    coverPosition: 'top',
    summary: 'Pronosticar la cosecha antes de cosecharla.',
    live: {
      url: 'https://www.figma.com/proto/EWnc3bpTzEjx9qcsd1tWUf/Raven-Phr?node-id=1-10559&starting-point-node-id=1%3A10559',
      label: 'Ver prototipo en Figma',
    },
    description:
      'Raven es una plataforma web para que las empresas agrícolas proyecten cuántas toneladas van a cosechar en una campaña, frente por frente y semana a semana, a partir de los datos que levantan en campo.',
    // Puede ir en varios párrafos
    problem: [
      'Planificar una cosecha implica cruzar muchos datos: cuántos frentes hay en cada fundo, cuántas semanas dura la campaña, qué módulos se recogen y cuánto pesa lo que sale de cada uno. Esa información llega desde distintas fuentes, como conteos, muestreos y registros de caída, y en distintos formatos.',
      'El objetivo de Raven es convertir esos datos en una proyección de tonelaje que el equipo pueda revisar, ajustar y comparar contra su meta, sin perder de vista de dónde sale cada número.',
    ],
    // Quién lo usa (sale en "Usuarios")
    users: [
      { title: 'Planificación de cosecha', text: 'Arma las simulaciones, define frentes y semanas, y ajusta el tonelaje hasta llegar a la meta de la campaña.' },
      { title: 'Operaciones de campo', text: 'Sube los archivos de conteo, caída y muestreo, y revisa si fueron validados y procesados.' },
      { title: 'Jefaturas', text: 'Revisan el avance de cada simulación contra su meta en TN y deciden qué frente necesita atención.' },
    ],
    // Pasos del flujo con nombre y texto (salen en "Proceso", numerados y en fila); `processCaption` va antes
    processCaption:
      'Del inicio de sesión al plan de cosecha, en seis pasos. En paralelo, el módulo de datos alimenta las simulaciones: ahí se cargan los archivos de caída, conteo, muestreo destructivo y no destructivo, y proyección de caída.',
    process: [
      { title: 'Ingreso', text: 'Usuario y contraseña, con recuperación de acceso.' },
      { title: 'Entorno', text: 'Se elige la empresa y la campaña con la que se va a trabajar.' },
      { title: 'Simulación', text: 'Se crea o abre una simulación y se elige el fundo.' },
      { title: 'Tonelaje', text: 'Se proyectan las toneladas por frente y por semana.' },
      { title: 'Corte', text: 'Se ajusta la simulación por calibre y modelo.' },
      { title: 'Planeamiento', text: 'Se ordena la recolección en el tiempo, frente por frente.' },
    ],
    screens: [
      {
        src: '/assets/img/raven-entorno.webp',
        title: 'Entorno operativo',
        caption: 'Antes de ver cualquier dato, la persona elige con qué empresa y campaña va a trabajar. Así todo lo que viene después se lee en ese contexto.',
        alt: 'Pantalla de entorno operativo con el saludo, la selección de empresa y campaña, y una ilustración de granja',
      },
      {
        src: '/assets/img/raven-simulaciones.webp',
        title: 'Simulaciones',
        caption: 'La tabla resume cada simulación en una fila: fecha, frentes, semanas y pañas. Las dos columnas que más importan son el estado del tonelaje y la barra de avance hacia la meta.',
        alt: 'Tabla de simulaciones con el estado del tonelaje y una barra de avance hacia la meta en cada fila',
      },
      {
        src: '/assets/img/raven-tonelaje.webp',
        title: 'Tonelaje',
        caption: 'Con cuatro datos (frentes, número de semanas, semana inicial y final) se genera una tabla editable. Cada frente es una fila y cada semana una columna, de Sem. 51 a Sem. 12.',
        alt: 'Tabla editable de tonelaje con un frente por fila, una semana por columna y los totales en verde',
      },
      {
        src: '/assets/img/raven-planeamiento.webp',
        title: 'Planeamiento',
        caption: 'Una línea de tiempo ordena la recolección. Cada frente muestra su último recojo, los módulos que le tocan y cómo se acumula el peso hasta su meta.',
        alt: 'Planeamiento con una línea de tiempo, los módulos de cada frente, indicadores circulares de meta y un gráfico de barras por módulo',
      },
      {
        src: '/assets/img/raven-datos.webp',
        title: 'Datos de campo',
        caption: 'Cada archivo que se sube pasa por dos controles: validación y procesamiento. La tabla muestra ambos estados por separado, así es fácil ver qué falta y qué falló.',
        alt: 'Tabla de archivos de proyección de caída con su estado de validación y de procesamiento',
      },
    ],
    // Video sin sonido: con controles, como el del primer caso
    promo: {
      src: '/assets/video/raven-recorrido.mp4',
      poster: '/assets/img/raven-recorrido.webp',
      caption: 'Veamos cómo funciona Raven.',
    },
    // Sistema de diseño (sale después del video): texto, paleta y grupos de componentes. También acepta
    // `logos: [{ src, alt, background }]`, en fila debajo de la paleta (`background`: color detrás del logo; si no, blanco)
    designSystem: {
      caption:
        'La paleta sale del propio producto: el verde de las hojas como color principal y los tonos de la palta en el logo. Los colores de estado se reservan para alertas y errores.',
      colors: [
        { name: 'Primario', value: '#35A645' },
        { name: 'Primario oscuro', value: '#1C5925' },
        { name: 'Primario suave', value: '#E4F6E7' },
        { name: 'Alerta', value: '#F0AF23' },
        { name: 'Error', value: '#EA3B3B' },
        { name: 'Texto', value: '#313131' },
      ],
      components: [
        { title: 'Navegación', text: 'Barra lateral de íconos, migas de pan y pasos de simulación.' },
        { title: 'Entradas', text: 'Campos con etiqueta, selectores, calendarios y filtros.' },
        { title: 'Datos', text: 'Tablas paginadas, barras de meta e indicadores circulares.' },
        { title: 'Feedback', text: 'Toasts, cargadores, confirmaciones y etiquetas de estado.' },
      ],
      // Láminas del sistema de diseño en Figma (salen al final, una al lado de otra; en el celular, una debajo de otra)
      sheets: [
        { src: '/assets/img/raven-ds-colores.webp', title: 'Colores', alt: 'Lámina de colores de Phonesys: escalas de 50 a 900 del verde primario, el verde azulado y el naranja secundarios, grises, colores de estado y sombras' },
        { src: '/assets/img/raven-ds-tipografia.webp', title: 'Tipografía', alt: 'Lámina de tipografía de Phonesys con la escala de títulos, de Title y H1 a Small' },
        { src: '/assets/img/raven-ds-componentes.webp', title: 'Botones, íconos y combos', alt: 'Lámina de componentes de Phonesys: botones con fondo, de contorno y sin fondo en sus estados, la librería de íconos y los combos con sus variaciones' },
      ],
    },
    // Decisiones de diseño (salen después del sistema de diseño, de dos en dos)
    decisions: [
      { title: 'Contexto primero', text: 'Empresa y campaña se eligen al entrar y se mantienen visibles en el título de cada pantalla, por ejemplo “Simulaciones Arato II”.' },
      { title: 'La meta siempre a la vista', text: 'Cada vista que trabaja con toneladas muestra la meta y cuánto falta, para que nadie tenga que calcularlo.' },
      { title: 'Un paso a la vez', text: 'La simulación se divide en tonelaje, corte y planeamiento, con navegación propia y botones de volver y siguiente.' },
      { title: 'Estados que no dependen del color', text: 'Toda etiqueta de estado lleva texto, y las acciones que no aplican se muestran desactivadas en lugar de esconderse.' },
    ],
    // Cifras con otro nombre en lugar de "Resultado"; la primera también sale en la tarjeta del inicio
    metricsTitle: 'Alcance',
    metrics: [
      { value: '49', label: 'pantallas' },
      { value: '335', label: 'componentes' },
    ],
  },
  {
    title: 'Talmaclick',
    type: 'web',
    tags: ['BackOffice', 'Carga aérea'],
    client: 'Talma',
    year: '2025',
    role: 'UX Designer y UX Researcher',
    platform: 'Web responsive',
    duration: '5 meses',
    tools: 'Figma',
    color: 'var(--ink)',
    cover: '/assets/img/talmaclick-portada.webp',
    screens: [
      {
        src: '/assets/img/talmaclick-inicio.webp',
        title: 'Inicio',
        caption: 'Un saludo con el nombre de la persona, el tipo de cambio del día, accesos rápidos y las novedades del servicio de carga en tarjetas.',
        alt: 'Inicio de Talmaclick con el saludo, el tipo de cambio, los accesos rápidos y tarjetas de Facturación y Citas y Track de carga',
      },
      {
        src: '/assets/img/talmaclick-vuelos.webp',
        title: 'Avance de vuelos',
        caption: 'Cada vuelo de exportación en una fila, con barras de avance para confirmación de AWBs, paletizaje y despacho, y su estado con texto y color.',
        alt: 'Tabla de avance de vuelos de exportación con barras amarillas, verdes y azules de avance y etiquetas de estado En curso, Cerrado y Despachado',
      },
      {
        src: '/assets/img/talmaclick-validaciones.webp',
        title: 'Gestión de validaciones',
        caption: 'Las validaciones se agrupan en un menú lateral y cada una tiene sus filtros y su tabla, con el estado de cada documento a la vista.',
        alt: 'Gestión de validaciones con el menú de Restricción SENASA, los filtros de DAM afectadas y una tabla con estados En revisión y Rechazado',
      },
      {
        src: '/assets/img/talmaclick-reclamos.webp',
        title: 'Quejas y reclamos',
        caption: 'Filtros por categoría, estado, fecha y número de caso, y una lista donde cada reclamo muestra su estado y su PDF.',
        alt: 'Registro de quejas y reclamos con filtros arriba y una lista de casos con estados como Cerrado, Recibido, Abierto y Con respuesta',
      },
      {
        src: '/assets/img/talmaclick-track.webp',
        title: 'Track sin resultados',
        caption: 'Cuando una búsqueda no encuentra la carga, un mensaje claro explica qué pasó y cómo seguir, en lugar de una tabla vacía.',
        alt: 'Búsqueda de tracking de exportaciones con el panel de filtros y un mensaje que dice que el track no ha sido encontrado',
      },
      {
        src: '/assets/img/talmaclick-arquitectura.webp',
        title: 'Arquitectura de la información',
        caption: 'De 9 opciones con siglas internas a 3 módulos y 2 niveles, ordenados por lo que llega, lo que sale y lo que requiere atención.',
        alt: 'Antes: 9 opciones de menú con siglas operativas. Después: Talmaclick BackOffice con los módulos Notificaciones, Importación y Exportación',
      },
      {
        src: '/assets/img/talmaclick-responsive.webp',
        title: 'Diseño responsive',
        caption: 'En pantallas pequeñas la tabla pasa a tarjetas y la barra lateral a una navegación inferior.',
        alt: 'Esquema del sistema en desktop de 1440 px, tablet de 1024 px y móvil de 390 px',
      },
    ],
    summary: 'De un sistema que exigía capacitación a uno que se entiende al usarlo.',
    live: {
      url: 'https://www.figma.com/proto/7me53Xz44z08Sp76tqrKQP/Talmaclick-1.5-COPIA?page-id=1%3A2&node-id=335-7214&starting-point-node-id=335%3A7439',
      label: 'Ver prototipo en Figma',
    },
    description:
      'Talmaclick es la plataforma digital del servicio de carga de Talma. Su BackOffice es la herramienta diaria con la que operadores de carga y agentes gestionan la importación y exportación de carga aérea. La versión 1.5 es la versión final del rediseño completo de ese sistema, hecho junto al Product Owner, UI, desarrollo y negocio.',
    problem: [
      'El sistema anterior había crecido por acumulación de funciones. Funcionaba, pero cada tarea dependía de saber dónde estaba cada opción: encontrar el estado de una guía tomaba 7 minutos, porque su información estaba repartida en tres pantallas, y el menú principal tenía 9 opciones con nombres técnicos que los agentes externos no reconocían.',
      'El 40 % de las consultas a soporte eran dudas de uso del sistema, no incidencias reales de la carga. La pregunta de diseño fue: ¿cómo podríamos lograr que operadores y agentes gestionen su carga de forma rápida y sin errores, sin depender de una capacitación previa?',
    ],
    users: [
      {
        title: 'Carlos, operador de carga',
        text: 'Trabaja en el almacén de importación, de pie y con poco tiempo entre tareas. Necesita registrar recepciones e inspecciones rápido desde la tablet, sin volver a la PC solo para cambiar el estado de una guía.',
      },
      {
        title: 'Lucía, agente de carga',
        text: 'Trabaja en una agencia de carga internacional y sigue varias guías al día desde el escritorio. Necesita saber al instante si la carga de su cliente está lista para retirar y qué documento falta, sin llamar al counter.',
      },
    ],
    processCaption:
      'Cinco meses, siempre con el usuario en el centro. Hice 12 entrevistas a profundidad (6 operadores y 6 agentes, de unos 45 minutos y en su puesto de trabajo cuando fue posible) y salieron cuatro hallazgos: la información de una guía estaba fragmentada, el lenguaje era interno y no del usuario, el estado de la carga no era visible y no todos trabajan frente a un escritorio. Con un card sorting abierto con 15 usuarios pasamos de 9 opciones en el menú a 3 módulos (Notificaciones, Importación y Exportación), con un máximo de dos niveles.',
    process: [
      { title: 'Descubrir', text: 'Mes 1. Entrevistas a usuarios finales y observación del sistema actual.' },
      { title: 'Definir', text: 'Mes 2. Síntesis de hallazgos, perfiles de usuario y prioridades.' },
      { title: 'Estructurar', text: 'Meses 2 y 3. Card sorting y nueva arquitectura de la información.' },
      { title: 'Diseñar y validar', text: 'Meses 3 y 4. Wireframes, prototipo y dos rondas de pruebas de usabilidad.' },
      { title: 'Adaptar', text: 'Mes 5. Diseño responsive y entrega de la versión 1.5.' },
    ],
    decisions: [
      { title: 'Toda la guía en una sola pantalla', text: 'El detalle de la guía reúne su resumen, el estado, una línea de tiempo del proceso, los documentos y la acción principal. Así se ve qué pasó, qué falta y cuál es el siguiente paso sin llamar al counter.' },
      { title: 'Búsqueda única por guía', text: 'El número de guía (AWB) es el punto de entrada para todo, como ya lo usaban los usuarios.' },
      { title: 'Estados con color y texto', text: 'Cada estado combina etiqueta, color y contraste suficiente; nunca depende solo del color.' },
      { title: 'Lenguaje del usuario', text: 'Reemplazamos las siglas internas por términos validados con agentes y operadores.' },
      { title: 'Del escritorio al almacén', text: 'Tres puntos de quiebre: tabla completa en escritorio (1440 px), tarjetas táctiles en tablet (1024 px) y consulta rápida en el celular (390 px), con la barra lateral convertida en navegación inferior.' },
    ],
    // Recorrido de producto de 20 segundos, sin sonido
    promo: {
      src: '/assets/video/talmaclick-recorrido.mp4',
      poster: '/assets/img/talmaclick-recorrido.webp',
      caption: 'Veamos cómo funciona Talmaclick.',
    },
    // Colores medidos en las pantallas del producto
    designSystem: {
      caption:
        'La paleta sale de la marca Talma: el azul como color principal en la barra lateral y los botones, y el verde del logo para destacar y confirmar. El amarillo se reserva para el avance, y los estados siempre llevan texto además de color.',
      colors: [
        { name: 'Azul Talma', value: '#002D74' },
        { name: 'Verde Talma', value: '#76BC21' },
        { name: 'Amarillo avance', value: '#FFCC00' },
        { name: 'Azul destacado', value: '#0068F3' },
        { name: 'Fondo', value: '#F2F3F8' },
        { name: 'Blanco', value: '#FFFFFF' },
      ],
      components: [
        { title: 'Navegación', text: 'Barra lateral de íconos con notificaciones, menús de sección y accesos rápidos.' },
        { title: 'Entradas', text: 'Filtros con etiqueta, selectores, calendarios y buscador por número de guía.' },
        { title: 'Datos', text: 'Tablas y listas en tarjetas, barras de avance y paginación.' },
        { title: 'Feedback', text: 'Etiquetas de estado, mensajes sin resultados con ilustración y modales de confirmación.' },
      ],
    },
  },
  {
    title: 'Lotus Exige 240',
    type: 'web',
    tags: ['Web 3D', 'Front-end'],
    client: 'Proyecto personal',
    year: '2026',
    role: 'Diseño y desarrollo front-end',
    platform: 'Web responsive',
    tools: 'HTML · CSS · JavaScript · Three.js',
    color: 'var(--ink)',
    cover: '/assets/img/lotus-portada.webp',
    summary: 'Puro instinto: un deportivo contado como una experiencia, no como una ficha técnica.',
    live: { url: 'https://josuelevi.github.io/lotus-exige-3d/', label: 'Ver la web' },
    description:
      'Una web de storytelling en dos tiempos: un recorrido guiado por el diseño del Lotus Exige 240 y, al final, un visor 3D para explorarlo libremente. Una experiencia ligera y completa que combina narrativa, diseño editorial y 3D interactivo en una web estática que se publica sola con cada cambio.',
    problem:
      'Presentar un coche deportivo en la web de forma que se sienta como una experiencia y no como una ficha técnica. El objetivo era contar el diseño del Lotus Exige 240 paso a paso y, al final, dejar que el usuario lo explore libremente en 3D, sin que la web se vuelva pesada ni difícil de usar.',
    processCaption: 'Una web de storytelling en dos tiempos.',
    process: [
      {
        title: 'Recorrido guiado',
        text: 'El coche entra desde el borde de la pantalla con las ruedas girando y frena suavemente. A partir de ahí, seis capítulos ligados al scroll mueven la cámara alrededor del modelo para mostrar sus rasgos clave: la silueta baja, las tomas de aire, el alerón trasero y el habitáculo.',
      },
      {
        title: 'Exploración libre',
        text: 'En el último capítulo se activa un visor interactivo dentro de un “estudio nocturno” donde el usuario puede girar el coche, elegir vistas predefinidas (frente, perfil, trasera, interior), cambiar el color, abrir las puertas, hacer zoom y tocar puntos interactivos que explican cada detalle.',
      },
    ],
    screens: [
      { src: '/assets/img/lotus-silueta.webp', title: 'La silueta', caption: 'Cada capítulo tiene un título y una frase; el 3D es el protagonista.', alt: 'Capítulo “Pegado al asfalto”: el Exige de perfil sobre fondo claro' },
      { src: '/assets/img/lotus-tomas-de-aire.webp', title: 'Tomas de aire', caption: 'Los capítulos alternan fondo claro y oscuro para marcar el ritmo del recorrido.', alt: 'Capítulo “El aire tiene forma”: el Exige sobre fondo oscuro' },
      { src: '/assets/img/lotus-trasera.webp', title: 'La parte trasera', caption: 'La cámara se mueve con el scroll hasta el alerón y los pilotos circulares.', alt: 'Capítulo “Imposible confundirlo”: la parte trasera del Exige con su alerón' },
      { src: '/assets/img/lotus-habitaculo.webp', title: 'El habitáculo', caption: 'Las puertas se abren para mirar dentro y descubrir el espacio del conductor.', alt: 'Capítulo “Tu sitio. Tu instinto.”: el Exige con las puertas abiertas' },
      { src: '/assets/img/lotus-visor.webp', title: 'Visor 3D', caption: 'En el estudio nocturno se elige vista, color, puertas y zoom, y los puntos explican cada detalle.', alt: 'Visor activado con puntos de Interior, Alerón y Tomas de aire, y el panel de vistas' },
    ],
    decisions: [
      { title: 'Tipografía con carácter', text: 'Barlow Condensed Black Italic para los titulares grandes, inclinados y rápidos, como el propio coche; Montserrat para la marca.' },
      { title: 'Paleta mínima', text: 'Blanco, negro y un rojo de acento (#ff0e49). Los capítulos alternan fondo claro y oscuro para marcar el ritmo del recorrido, y el estudio final usa luz suave, un halo rojo y un reflejo tenue bajo el coche.' },
      { title: 'Textos cortos', text: 'Cada capítulo tiene un título y una frase. El 3D es el protagonista; el texto solo lo acompaña.' },
      { title: 'Honestidad en el contenido', text: 'Se describen solo rasgos visibles del modelo, sin inventar potencia, año ni equipamiento, y los colores alternativos se indican como ilustrativos.' },
    ],
    // Partes con nombre propio: cada una sale con su título y sus puntos (nombre y texto)
    extras: [
      {
        title: 'Desarrollo',
        items: [
          { title: 'Sin frameworks ni build', text: 'HTML, CSS y JavaScript puro con un import map. Three.js, el decodificador Draco, las fuentes y el modelo se sirven desde el propio proyecto, sin depender de CDNs.' },
          { title: 'Escena 3D con Three.js', text: 'Modelo GLB comprimido con Draco (~1,7 MB), iluminación de entorno (RoomEnvironment), tone mapping ACES y sombras suaves. Las puertas se abren rotando sus bisagras sobre el eje correcto de cada pieza.' },
          { title: 'Cámara guiada por scroll', text: 'Cada capítulo define una pose de cámara y la web interpola entre ellas según el avance del scroll.' },
          { title: 'Rendimiento', text: 'La escena solo se vuelve a dibujar cuando algo cambia, la resolución de render tiene un límite (más bajo en móvil) y el mapa de sombras se actualiza únicamente cuando el coche o las puertas se mueven.' },
          { title: 'Despliegue automático', text: 'Un flujo de GitHub Actions comprueba el JavaScript y los archivos principales, versiona app.js y design.css para evitar problemas de caché y publica la carpeta dist/ en GitHub Pages.' },
        ],
      },
      {
        title: 'Accesibilidad y casos límite',
        items: [
          { title: 'Teclado', text: 'Flechas para girar, + / − para zoom y Esc para salir del visor.' },
          { title: 'Movimiento reducido', text: 'Respeta la preferencia de movimiento reducido del sistema y permite saltar o repetir la animación de entrada.' },
          { title: 'Si algo falla', text: 'Si WebGL no está disponible o falla, se muestra una imagen alternativa del coche y el recorrido sigue funcionando. Sin JavaScript, el contenido sigue siendo legible.' },
          { title: 'Adaptable', text: 'Diseño adaptable a escritorio, tablet y móvil, con textos de ayuda distintos para ratón y pantalla táctil.' },
        ],
      },
      {
        title: 'Aprendizajes',
        items: [
          { title: 'Luz, cámara y encuadre', text: 'Que el 3D se vea bien depende tanto de la luz, la cámara y el encuadre como del modelo en sí.' },
          { title: 'Renderizar solo cuando hace falta', text: 'Marca una gran diferencia en batería y fluidez, sobre todo en móvil.' },
          { title: 'Pensar en los fallos desde el principio', text: 'Qué pasa sin WebGL, sin JS o con movimiento reducido: así la experiencia es sólida para todos.' },
        ],
      },
    ],
    stack: [
      { label: 'Frontend', value: 'HTML, CSS y JavaScript (módulos ES)' },
      { label: '3D', value: 'Three.js y Draco' },
      { label: 'Publicación', value: 'GitHub Pages con GitHub Actions' },
    ],
    // Créditos al final del caso
    credits: [
      { label: 'Modelo 3D', text: '“AC - Lotus Exige 240 FREE” de David & 3D (Sketchfab)', url: 'https://sketchfab.com/DavidAnd3D' },
      { label: 'Librería', text: 'Three.js (MIT)' },
      { label: 'Fuentes', text: 'Barlow Condensed y Montserrat (OFL)' },
      { label: 'Nota', text: 'Proyecto conceptual independiente, sin relación oficial con Lotus.' },
    ],
  },
  {
    title: 'Design System',
    draft: true,
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
].filter((p) => !p.draft)

// Aplica la dirección de la web a las imágenes y videos de pantallas y casos
screens.forEach((s) => { s.image = withBase(s.image) })
projects.forEach((p) => {
  p.cover = withBase(p.cover)
  p.video = withBase(p.video)
  p.gallery = p.gallery?.map(withBase)
  if (p.flow) {
    p.flow.src = withBase(p.flow.src)
    p.flow.mobile = withBase(p.flow.mobile)
  }
  p.screens?.forEach((s) => { s.src = withBase(s.src) })
  p.mobile?.screens?.forEach((s) => { s.src = withBase(s.src) })
  if (p.promo) {
    p.promo.src = withBase(p.promo.src)
    p.promo.poster = withBase(p.promo.poster)
  }
  p.designSystem?.logos?.forEach((l) => { l.src = withBase(l.src) })
  p.designSystem?.sheets?.forEach((l) => { l.src = withBase(l.src) })
})

// Nombre del caso para su enlace propio: "App de salud" -> "app-de-salud" (tusitio.com/#caso/app-de-salud)
export const caseSlug = (p) =>
  p.title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
