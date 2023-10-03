import { Router } from 'express'
import { UsersController } from '../controllers/Users.js'

export const createUsersRouter = ({ usersModel }) => {
  const UsersRouter = Router()

  const usersController = new UsersController()
  usersController.usersModel = usersModel
  UsersRouter.get('/', usersController.getAll)
  UsersRouter.get('/get-balance/:_id', usersController.getBalance)
  UsersRouter.get('/teams', usersController.getTeams)
  UsersRouter.get('/teams/:id', usersController.getOneTeam)
  UsersRouter.get('/user-teams/:_id', usersController.getTeams)
  UsersRouter.post('/get-multiple-balances', usersController.getMultipleBalances)
  UsersRouter.post('/create-user', usersController.createUser)
  UsersRouter.post('/create-team', usersController.createTeam)
  UsersRouter.post('/join-team', usersController.joinTeam)

  return UsersRouter
}
