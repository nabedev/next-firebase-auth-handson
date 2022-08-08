import { ApolloServer, gql } from 'apollo-server-micro'
import { readFileSync } from 'fs'
import Cors from 'micro-cors'
import { Db, MongoClient } from 'mongodb'
import * as path from 'path'

import { resolvers } from '../../backend/apollo/resolvers'
import { auth } from '../../backend/firebase/admin'

let db: Db

const typeDefs = readFileSync(
  path.resolve(process.cwd(), './graphql/schema.graphql')
).toString()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (!token) throw new Error('you must be logged in')

    const { uid } = await auth.verifyIdToken(token)

    if (!db) {
      console.log(process.env.MONGODB_URI)

      const client = new MongoClient(process.env.MONGODB_URI as string, {
        serverApi: '1',
      })

      await client.connect()
      console.log('mongoDB client connected ⭐️')
      db = client.db('todo')
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
