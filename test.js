import test from 'node:test'
import assert from 'node:assert'
import UsersModel from './models/database/users.js'

test('Obtener balance de team', async () => {
  const expectedData = [{
    user_id: '337bedbf-c18b-46c9-87d8-81ce656413cd',
    balance: 500
  }
  ]
  const result = await UsersModel.getMultipleBalances(['337bedbf-c18b-46c9-87d8-81ce656413cd'])
  assert.deepStrictEqual(result.data, expectedData)
  // Ver por que no deja de ejecutarse.
})
