import { NextApiResponse, NextApiRequest } from "next"
import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from "../../backend/apollo/type-defs"
import { resolvers } from "../../backend/apollo/resolvers"

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  async context({ req }) {
    const token = req.headers.authorization || '';
    console.log({token})

    // TODO: verify token with Firebase Admin SDK
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = apolloServer.start();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
