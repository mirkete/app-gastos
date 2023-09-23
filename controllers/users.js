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
    const result = await this.usersModel.getAll()
    if (!result.success) {
      return res.status(500).json(result.error)
    }
    res.json(result.data)
  }

  create = async (operation, { req, res }) => {
    const result = await this.usersModel[operation](req.body)

    if (!result.success) {
      if (result.error.type === 'VALIDATION ERROR') {
        return res.status(400).json(result.error)
      }

      return res.status(500).json(result.error)
    }
    res.status(201).json(result.data)
  }

  createUser = async (req, res) => {
    return this.create('createUser', { req, res })
  }

  createTeam = async (req, res) => {
    return this.create('createTeam', { req, res })
  }

  joinTeam = async (req, res) => {
    const result = await this.usersModel.joinTeam(req.body)
    if (!result.success) {
      if (result.error.type === 'VALIDATION ERROR') {
        return res.status(400).json(result.error)
      }
      return res.status(500).json(result.error)
    }
    res.status(201).json(result.data)
  }

  deleteTeam = (req, res) => {
    // llamar al modelo
    res.status(200).send(this.model)
  }
}
