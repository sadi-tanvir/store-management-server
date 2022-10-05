import express, { Express } from 'express'
import http from 'http'
import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core"
import cors from "cors"
import jwt, { JwtPayload } from "jsonwebtoken"

// database
import "./db/db"

// schema & resolvers
import Schema from "./gql/schemas/index"
import resolvers from "./gql/resolvers/index"




async function listen(port: number) {
  const app: Express = express()
  const httpServer = http.createServer(app)

  // middleware
  app.use(cors())
  const context = ({ req }: { req: any }) => {
    const { authorization } = req.headers
    if (authorization) {
      const decode: any | JwtPayload = jwt.verify(authorization, 'this is secret key')
      return {
        email: decode?.email
      }
    }
  }

  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })
  await server.start()

  server.applyMiddleware({ app })

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function main() {
  try {
    await listen(4000)
    console.log('🚀 Server is ready at http://localhost:4000/graphql')
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

void main()