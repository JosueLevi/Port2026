// Uso: node gen-character.mjs RUTA/A/Josue.svg  -> escribe src/data/characterArt.js
import fs from 'node:fs'
const svg = fs.readFileSync(process.argv[2], 'utf8')
const paths = [...svg.matchAll(/\bd="([^"]+)" fill="([^"]+)"/g)].map((m) => [m[1], m[2]])
if (paths.length !== 58) throw new Error(`Se esperaban 58 trazados y hay ${paths.length}`)
const tone = { black: 'ink', '#FBF4E9': 'light', '#353331': 'shade' }
const head = new Set([6, 9, 21, 25, 33, 35, 36, 39])
const short = (d) => d.replace(/(\d+\.\d{2})\d+/g, '$1')
const W = 351, H = 515
const jacket = '76.7,64.3 116.6,61.2 125.8,88.8 144.2,102.9 195.1,102.9 203.7,73.5 211.7,61.2 220.9,91.9 245.5,122.5 276.1,153.1 303.8,183.7 311.1,214.3 308.0,241.9 270.0,247.4 220.9,233.9 171.8,227.8 153.4,223.5 122.7,226.6 116,246 90,249 60,249 32,248 24,244 21,232 21,212 24,190 30,168 40,150 50,137 58.3,122.5 68.7,91.9'
const body = [], hd = []
paths.slice(1).forEach(([d, f], i) => (head.has(i + 2) ? hd : body).push(`    ['${tone[f]}', '${short(d)}'],`))
const out = [
  '// Ilustración vectorial del personaje (de Josue.svg), separada en capas para animarla.',
  '// ink = negro, light = crema, shade = gris. Coordenadas en un lienzo de 351 x 515.',
  'export const characterArt = {',
  "  viewBox: '0 0 351 515',",
  '  // Silueta negra completa (se dibuja en el cuerpo y en la cabeza)',
  `  base: '${short(paths[0][0])}',`,
  '  // Zona de la cabeza que se mueve; headClip es un poco más grande para tapar huecos',
  "  headArea: '105,-20 212,-20 212,82 194,98 171,99 171,114 160,127 149,127 130,101 105,79',",
  "  headClip: '101,-30 216,-30 216,84 197,101 174,102 174,115 161,130 148,130 127,103 101,82',",
  '  // Zona de la sudadera (incluida la manga izquierda) que se pinta con site.jacketColor',
  `  jacketArea: '${jacket}',`,
  '  body: [', ...body, '  ],',
  '  head: [', ...hd, '  ],',
  '}', '',
]
fs.writeFileSync('src/data/characterArt.js', out.join('\n'))
console.log('OK: src/data/characterArt.js', body.length, 'trazos de cuerpo,', hd.length, 'de cabeza')
