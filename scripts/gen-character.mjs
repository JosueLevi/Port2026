// Uso: node scripts/gen-character.mjs public/assets/img/personaje.svg  -> escribe src/data/characterArt.js
// personaje.svg es el personaje vectorizado a detalle desde personaje.png: una silueta negra (data-part="base")
// y encima cada zona clara con su tono (data-tone) y su capa (data-layer: head, body o both)
import fs from 'node:fs'
const svg = fs.readFileSync(process.argv[2], 'utf8')
const base = svg.match(/data-part="base"[^>]*\bd="([^"]+)"/)?.[1]
if (!base) throw new Error('Falta la silueta (data-part="base")')
const parts = [...svg.matchAll(/data-tone="(\w+)" data-layer="(\w+)"[^>]*\bd="([^"]+)"/g)]
const tones = new Set(['ink', 'shoe', 'light', 'skin', 'white', 'shade'])
const body = [], hd = []
for (const [, tone, layer, d] of parts) {
  if (!tones.has(tone)) throw new Error(`Tono desconocido: ${tone}`)
  // Las zonas que cruzan el borde de la cabeza (cuello, capucha) van en las dos capas, así no queda hueco al moverse
  if (layer !== 'head') body.push(`    ['${tone}', '${d}'],`)
  if (layer !== 'body') hd.push(`    ['${tone}', '${d}'],`)
}
const jacket = '76.7,64.3 116.6,61.2 125.8,88.8 144.2,102.9 195.1,102.9 203.7,73.5 211.7,61.2 220.9,91.9 245.5,122.5 276.1,153.1 303.8,183.7 311.1,214.3 308.0,241.9 270.0,247.4 220.9,233.9 171.8,227.8 153.4,223.5 122.7,226.6 116,246 90,249 60,249 32,248 24,244 21,232 21,212 24,190 30,168 40,150 50,137 58.3,122.5 68.7,91.9'
const out = [
  '// Ilustración vectorial del personaje (de public/assets/img/personaje.svg), separada en capas para animarla.',
  '// ink = negro, shoe = zapatillas, light = crema, skin = piel, white = partes claras de la silla (transparentes), shade = gris. Lienzo de 351 x 515.',
  'export const characterArt = {',
  "  viewBox: '0 0 351 515',",
  '  // Silueta negra completa (se dibuja en el cuerpo y en la cabeza)',
  `  base: '${base}',`,
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
console.log('OK: src/data/characterArt.js', body.length, 'zonas de cuerpo,', hd.length, 'de cabeza')
