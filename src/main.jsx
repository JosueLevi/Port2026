import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// Tipografía (ver --font-* en styles.css): Archivo Black para los títulos,
// Barlow para los textos e Instrument Serif en cursiva para los acentos
import '@fontsource/archivo-black/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/instrument-serif/400-italic.css'
import './tailwind.css'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
