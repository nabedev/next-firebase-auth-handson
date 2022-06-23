import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { Db, MongoClient } from 'mongodb'

import { resolvers } from '../../backend/apollo/resolvers'
import { typeDefs } from '../../backend/apollo/type-defs'
import { auth } from '../../backend/firebase/admin'

let db: Db

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (!token) throw new Error('you must be logged in')

    // // TODO: verify token with Firebase Admin SDK
    // console.log('👮‍♂️ verify token 👮‍♂️')
    const { uid } = await auth.verifyIdToken(token)
    if (!db) {
      try {
        const client = new MongoClient(process.env.MONGO_DB_URI as string, {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          serverApi: "1",
        })
        await client.connect()
        console.log('client connected')
        db = client.db('todo')
      } catch (e) {
        console.log(e)
      }
    }

    return {
      uid,
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
  console.log('apollo server started')

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})
