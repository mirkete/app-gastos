import fs from 'node:fs/promises'

async function readHTML (url) {
  const html = await fs.readFile(url, { encoding: 'utf8' }) ?? '<h1>Ha habido un eror! Prueba recargando la pagina</h1>'
  return html
}

export { readHTML }
