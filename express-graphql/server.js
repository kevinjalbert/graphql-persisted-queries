const { GraphQLServer } = require('graphql-yoga')

const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { persistedQueriesMiddleware } = require('./persistedQueriesMiddleware')

const server = new GraphQLServer({ typeDefs, resolvers })
const options = {
  port: 5000,
  getEndpoint: true,
  endpoint: '/graphql',
  playground: '/playground',
}

server.express.get('/graphql', persistedQueriesMiddleware)
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)

