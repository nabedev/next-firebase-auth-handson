import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'

import { resolvers } from '../../backend/apollo/resolvers'
import { typeDefs } from '../../backend/apollo/type-defs'
import { auth } from '../../backend/firebase/admin'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (!token) throw new Error('you must be logged in')

    // // TODO: verify token with Firebase Admin SDK
    const { uid } = await auth.verifyIdToken(token)
    console.log({ uid })
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = apolloServer.start()

const cors = Cors()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})
