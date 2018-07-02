const typeDefs = `
  type Query {
    companies: [Company]!
    consoles(afterYear: Int, beforeYear: Int): [Console]!
  }

  type Company {
    id: ID!
    name: String!
    consoles: [Console]!
  }

  type Console {
    id: ID!
    name: String!
    releaseYear: Int!
    company: Company!
  }

`

module.exports = { typeDefs }

