const users = [
  {
    _id: 'a7a814cb-4e68-4b10-b43a-8a74b5be5076',
    name: 'John Doe'
  },
  {
    _id: 'f6a080ed-2a78-4e7e-9a14-ae96f9e9c86e',
    name: 'Jane Smith'
  },
  {
    _id: 'd794e4a4-b440-4802-8e7e-f8ab4fc7c5e1',
    name: 'Michael Johnson'
  },
  {
    _id: '5b6384d4-8224-442e-9d3e-4578dcd4889f',
    name: 'Emma Davis'
  },
  {
    _id: 'c193a056-446e-44e5-bea1-6eea87552154',
    name: 'David Anderson'
  },
  {
    _id: '73e03e48-95d3-4e2b-8d25-5b19ae193d6b',
    name: 'Olivia Martin'
  },
  {
    _id: 'cb6fb041-fd6d-4b14-8721-90cbbcf0d676',
    name: 'Sophia Thompson'
  },
  {
    _id: '82829da2-7757-4a6d-a092-19f125097753',
    name: 'Ethan Clark'
  },
  {
    _id: '889c1b02-c82f-4e72-84e7-028f0ebc3c79',
    name: 'Isabella Wilson'
  },
  {
    _id: '8a9491b8-b045-4dd4-bb62-0d46431b7873',
    name: 'James Taylor'
  }
]

class UsersModel {
  static async getAll () {
    return users
  }

  static async createUser () {
    return users
  }
}

export default UsersModel
