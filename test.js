import test from 'node:test'
import assert from 'node:assert'
import { UsersModel, finishConnection } from './models/database/users.js'

test('Obtener balance de team', async () => {
  const expectedData = [{
    user_id: '337bedbf-c18b-46c9-87d8-81ce656413cd',
    balance: 500
  }]

  const result = await UsersModel.getMultipleBalances(['337bedbf-c18b-46c9-87d8-81ce656413cd'])

  assert.deepStrictEqual(result.data, expectedData)
  // Ver por que no deja de ejecutarse.
})

test('Obtener team', async () => {
  const expectedData = {
    name: 'Test team',
    currency: 'ARS',
    _id: 'a9912254-b74d-493f-88ec-fc77758513f0',
    users: [{ _id: '337bedbf-c18b-46c9-87d8-81ce656413cd', name: 'Test user', balance: 500 }]
  }

  const result = await UsersModel.getOneTeam('a9912254-b74d-493f-88ec-fc77758513f0')

  assert.deepStrictEqual(result.data, expectedData)
}).then(() => {
  finishConnection()
})
