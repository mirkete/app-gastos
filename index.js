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
app.use(express.static(path.join(dirname, 'web')))
app.set('view engine', 'ejs')
app.use(localURL({ viewsURL: 'web' }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
// hacer bien el middleware
// fijarme porque no dejaba poner headers desde el controller

app.use('/users', createUsersRouter({ usersModel: UsersModel }))
app.use('/', createViewsRouter({ model: UsersModel }))

obtenerPuerto({ desiredPort: PORT })
  .then((finalPort) => {
    app.listen(finalPort, () => {
      console.log('SERVER LISTENING ON PORT ' + finalPort)
    })
  })
