import { createServer } from 'node:http'

function obtenerPuerto ({ desiredPort }) {
  const server = createServer()
  return new Promise((resolve, reject) => {
    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log('El puerto esta en uso. En su lugar, se usara uno por defecto')
        resolve(obtenerPuerto(0))
      }
    })
  })
}

export default obtenerPuerto
