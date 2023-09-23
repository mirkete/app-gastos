import express from 'express'
import path from 'node:path'
import UsersModel from './models/database/users.js'
import obtenerPuerto from './utils/obtener-puerto.js'
import { createUsersRouter } from './routes/users-routes.js'
import { createViewsRouter } from './routes/views-routes.js'
import { localURL } from './middlewares/localURL.js'

const PORT = process.env.PORT ?? 3000
const dirname = process.cwd()

const app = express()

app.use(express.json())
app.use(express.static(path.join(dirname, 'views')))
app.use(localURL({ viewsURL: 'views' }))

app.use('/interactions', createUsersRouter({ usersModel: UsersModel }))
app.use('/', createViewsRouter())

obtenerPuerto({ desiredPort: PORT })
  .then((finalPort) => {
    app.listen(finalPort, () => {
      console.log('SERVER LISTENING ON PORT ' + finalPort)
    })
  })
