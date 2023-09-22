import express from 'express'
import obtenerPuerto from './utils/obtener-puerto.js'
import { createUsersRouter } from './routes/users-routes.js'
import UsersModel from './models/database/users.js'

const PORT = process.env.PORT ?? 3000

// Lo defino asi para usar inyeccion de dependencias por setter

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>OK</h1>')
})

app.use('/users', createUsersRouter({ usersModel: UsersModel }))

obtenerPuerto({ desiredPort: PORT })
  .then((finalPort) => {
    app.listen(finalPort, () => {
      console.log('SERVER LISTENING ON PORT ' + finalPort)
    })
  })
