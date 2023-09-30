import { Router } from 'express'

export const createViewsRouter = () => {
  const ViewsRouter = Router()

  ViewsRouter.get('/', (req, res) => {
    const viewsURL = res.locals.viewsURL
    res.sendFile(viewsURL + '/cosa.html')
  })

  ViewsRouter.get('/cosa', (req, res) => {
    const viewsURL = res.locals.viewsURL
    res.sendFile(viewsURL + '/cosa.html')
  })

  ViewsRouter.get('/group/:id', (req, res) => {
    const viewsURL = res.locals.viewsURL
    res.sendFile(viewsURL + '/group-page.html')
  })

  return ViewsRouter
}
