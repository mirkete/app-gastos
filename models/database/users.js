import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import { validateUser, validateUUID, validateUUIDs } from '../../schemas/User.js'
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

  static async getTeams (data) {
    const validation = validateUUID(data)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid UUID.')
    }

    try {
      const { _id } = validation.data
      const queryResult = await connection.execute(
        'SELECT BIN_TO_UUID(team_id) AS team_id from user_teams ' +
        'WHERE user_id = UUID_TO_BIN(?)',
        [_id]
      )
      const teamIds = queryResult[0].map((obj) => {
        return obj.team_id
      })
      const teamsQueryResult = await connection.execute(
        'SELECT name, currency, BIN_TO_UUID(_id) AS _id from teams ' +
        'WHERE BIN_TO_UUID(_id) IN (' + connection.escape(teamIds) + ')'
      )
      const teams = teamsQueryResult[0]

      return new ResultObject(true, teams)
    } catch (e) {
      return new ResultObject(false, null, 'DATABASE ERROR', 'No se ha podido realizar la solicitud')
    }
  }

  static async getBalance (data) {
    const validation = validateUUID(data)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid UUID.')
    }

    try {
      const { _id } = validation.data
      const queryResult = await connection.execute(
        'SELECT BIN_TO_UUID(team_id) AS team_id, balance FROM user_balance ' +
        'WHERE BIN_TO_UUID(user_id) = ?;',
        [_id]
      )

      let totalBalance = 0
      if (queryResult[0].length > 0) {
        totalBalance = queryResult[0].reduce((acc, current) => {
          return (acc += current.balance)
        }, 0)
      }

      const balances = {
        totalBalance,
        team_balances: queryResult[0]
      }

      return new ResultObject(true, balances)
    } catch (e) {
      return new ResultObject(false, null, e, 'Ha ocurrido un error')
    }
  }

  static async getMultipleBalances (data) {
    const validation = validateUUIDs(data)
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid UUIDs')
    }

    try {
      const queryResult = await connection.execute(
        'SELECT BIN_TO_UUID(user_id) AS user_id, SUM(balance) AS balance FROM user_balance ' +
        `WHERE BIN_TO_UUID(user_id) IN (${connection.escape(validation.data)}) ` +
        'GROUP BY user_id'
      )

      return new ResultObject(true, queryResult[0])
    } catch (e) {
      return new ResultObject(false, null, e, 'No se pudo obtener el balance')
    }
  }

  static async getOneTeam (data) {
    const validation = validateUUID({ _id: data })
    if (!validation.success) {
      return new ResultObject(false, null, 'VALIDATION ERROR', 'Invalid UUID.')
    }
    try {
      const { _id: teamId } = validation.data
      const teamQueryResult = await connection.execute(
        'SELECT name, currency, BIN_TO_UUID(teams._id) AS _id, SUM(ABS(balance)) AS total_team_billings FROM teams ' +
        'INNER JOIN user_balance ON user_balance.team_id = teams._id ' +
        'WHERE BIN_TO_UUID(_id) = ? ' +
        'GROUP BY teams._id',
        [teamId]
      )
      if (teamQueryResult[0].length === 0) {
        throw new Error('GROUP-NOT-FOUND')
      }

      const teamUserIdsQueryResult = await connection.execute(
        'SELECT BIN_TO_UUID(user_id) AS _id FROM user_teams ' +
        'WHERE BIN_TO_UUID(team_id) = ?',
        [teamId]
      )
      if (teamUserIdsQueryResult[0].length === 0) {
        throw new Error('EMPTY-GROUP')
      }

      const userIds = teamUserIdsQueryResult[0].map((el) => {
        return el._id
      })

      const teamUsers = await connection.execute(
        'SELECT name, BIN_TO_UUID(_id) AS _id, SUM(balance) AS total_balance FROM users ' +
        'LEFT JOIN user_balance ON user_balance.user_id = users._id ' +
        'WHERE BIN_TO_UUID(_id) IN (' + connection.escape(userIds) + ')' +
        'GROUP BY users._id'
      )

      const teamInfo = {
        ...teamQueryResult[0][0],
        users: teamUsers[0]
      }

      return new ResultObject(true, teamInfo)
    } catch (e) {
      if (e.message === 'GROUP-NOT-FOUND' || e.message === 'EMPTY-GROUP') {
        return new ResultObject(false, null, 'QUERY ERROR', e.message)
      }
      return new ResultObject(false, null, 'DATABASE ERROR', e)
    }
  }
}

async function finishConnection () {
  await connection.end()
}

export { UsersModel, finishConnection }
