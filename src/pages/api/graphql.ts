import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from "../../apollo/type-defs"
import { resolvers } from "../../apollo/resolvers"
import { schema } from '../../apollo/schema'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  async context({ req }) {
    const token = req.headers.authorization || '';
    console.log({token})
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}


export default apolloServer.start().then(() => {
  return apolloServer.createHandler({ path: '/api/graphql' })
})
