import { ApolloServer, gql } from 'apollo-server-micro'
import { readFileSync } from 'fs'
import Cors from 'micro-cors'
import { Db, MongoClient } from 'mongodb'
import { resolve } from 'path'

import { resolvers } from '../../backend/apollo/resolvers'
import { typeDefs } from '../../backend/apollo/type-defs'
import { auth } from '../../backend/firebase/admin'

let db: Db

const apolloServer = new ApolloServer({
  typeDefs: gql(
    readFileSync(resolve(process.cwd(), './graphql/schema.graphql')).toString()
  ),
  resolvers,
  // csrfPrevention: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (!token) throw new Error('you must be logged in')

    const { uid } = await auth.verifyIdToken(token)

    if (!db) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI as string, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          serverApi: '1',
        })
        await client.connect()
        db = client.db('todo')
      } catch (e) {
        console.log(e)
      }
    }

    return {
      userID: uid,
      db,
    }
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
