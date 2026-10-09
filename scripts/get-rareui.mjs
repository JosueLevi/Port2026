// Descarga componentes de Rare UI (https://rareui.com) en src/components/ui.
// Uso: node scripts/get-rareui.mjs animated-counter scroll-progress
import fs from 'node:fs'
const base = 'https://raw.githubusercontent.com/swamimalode07/rare-ui/main'
const header = '// Componente de Rare UI (https://rareui.com). Copyright (c) 2026 Swami Malode.\n// Licencia: MIT + Commons Clause + Attribution, ver LICENSE-rareui.txt en esta carpeta.\n'
const get = async (path) => {
  const res = await fetch(`${base}/${path}`)
  if (!res.ok) throw new Error(`No se pudo descargar ${path} (${res.status})`)
  return res.text()
}
fs.mkdirSync('src/components/ui', { recursive: true })
fs.mkdirSync('src/lib', { recursive: true })
fs.writeFileSync('src/lib/utils.ts', await get('lib/utils.ts'))
fs.writeFileSync('src/components/ui/LICENSE-rareui.txt', await get('LICENSE'))
for (const name of process.argv.slice(2)) {
  fs.writeFileSync(`src/components/ui/${name}.tsx`, header + (await get(`components/ui/${name}.tsx`)))
  console.log('OK', name)
}
