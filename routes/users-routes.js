import { Router } from 'express'
import { UsersController } from '../controllers/Users.js'

export const createUsersRouter = ({ usersModel }) => {
  const UsersRouter = Router()

  const usersController = new UsersController()
  usersController.usersModel = usersModel
  UsersRouter.get('/', usersController.getAll)
  UsersRouter.post('/teams', usersController.getTeams)
  UsersRouter.post('/create-user', usersController.createUser)
  UsersRouter.post('/create-team', usersController.createTeam)
  UsersRouter.post('/join-team', usersController.joinTeam)

  return UsersRouter
}
