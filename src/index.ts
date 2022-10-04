import express, { Express } from 'express'
import http from 'http'
import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core"

// database
import "./db/db"

// schema & resolvers
import Schema from "./gql/schemas/index"
import resolvers from "./gql/resolvers/index"




async function listen(port: number) {
  const app: Express = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers,
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