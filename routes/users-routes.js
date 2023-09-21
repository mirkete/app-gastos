import { Router } from 'express'
import { UsersController } from '../controllers/Users.js'

export const createProductRouter = ({ usersModel }) => {
  const ProductsRouter = Router()

  const usersController = new UsersController()
  usersController.usersModel = usersModel

  ProductsRouter.get('/', usersController.getAll)

  return ProductsRouter
}
