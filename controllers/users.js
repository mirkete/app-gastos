export class UsersController {
  // En este caso, la clase no va a tener un constructor porque vamos a implementar
  // La inyeccion de dependencias por setter

  constructor () {
    this.usersModel = null
  }

  get usersModel () {
    return this._usersModel
  }

  set usersModel (usersModel) {
    this._usersModel = usersModel
  }

  getAll = async (req, res) => {
    const data = await this.usersModel.getAll()
    res.json(data)
  }

  createUser = (req, res) => {
    // llamar al modelo
    res.status(200).send(this.model)
  }

  createTeam = (req, res) => {
    // llamar al modelo
    res.status(200).send(this.model)
  }

  deleteTeam = (req, res) => {
    // llamar al modelo
    res.status(200).send(this.model)
  }
}
