import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import { validateUser } from '../../schemas/User.js'
import { validateJoinTeam, validateTeam } from '../../schemas/Team.js'

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirkito18',
  database: 'gastos',
  port: 3306
})

class ResultObject {
  constructor (success, data, type, message) {
    this.success = success ?? false
    this.data = data ?? null
    this.error = { type, message }
  }
}

class UsersModel {
  static async getAll () {
    try {
      const queryResult = await connection.execute(
        'SELECT name FROM users'
      )
      return new ResultObject(true, queryResult[0])
    } catch (err) {
      return new ResultObject(false, null, 'DATABASE ERROR', 'Cannot get products.')
    }
  }

  static async createUser (data) {
    const user = {
      _id: crypto.randomUUID(),
      ...data
    }
    const validation = validateUser(user)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid user format. Check fields')
    }

    try {
      const { _id, name } = validation.data

      await connection.execute(
        'INSERT INTO users (_id, name) ' +
        'VALUES (UUID_TO_BIN(?), ?)',
        [_id, name]
      )

      return new ResultObject(true, _id)
    } catch (e) {
      return new ResultObject(false, null, 'DATABASE ERROR', 'Cannot create user.')
    }
  }

  static async createTeam (data) {
    const team = {
      _id: crypto.randomUUID(),
      ...data
    }

    const validation = validateTeam(team)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid team format. Check fields')
    }

    try {
      const { _id, name, currency } = validation.data
      await connection.execute(
        'INSERT INTO teams (_id, name, currency) ' +
        'VALUES (UUID_TO_BIN(?), ?, ?)',
        [_id, name, currency]
      )

      return new ResultObject(true, validation.data)
    } catch (e) {
      return new ResultObject(false, null, 'DATABASE ERROR', 'Cannot create team.')
    }
  }

  static async joinTeam (data) {
    const validation = validateJoinTeam(data)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid team_id or user_id format. Check fields')
    }

    try {
      const validData = Object.values(validation.data)
      await connection.execute(
        'INSERT INTO user_teams (user_id, team_id) ' +
        'VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))',
        validData
      )

      return new ResultObject(true, validData)
    } catch (e) {
      return new ResultObject(false, null, 'DATABASE ERROR', 'Cannot join to team.')
    }
  }
}

export default UsersModel
