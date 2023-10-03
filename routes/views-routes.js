import { Router } from 'express'
import path from 'path'
import { ViewsController } from '../controllers/views.js'

export const createViewsRouter = ({ model }) => {
  const ViewsRouter = Router()
  const viewsController = new ViewsController({ model })

  ViewsRouter.get('/', (req, res) => {
    const viewsURL = res.locals.viewsURL
    res.sendFile(path.join(viewsURL, 'index.html'))
  })

  ViewsRouter.get('/group/:id', viewsController.getGroup)

  return ViewsRouter
}
