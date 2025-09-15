// src/server.ts
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { resolvers } from "./resolvers"; // <- named import
import { typeDefs } from "./schema"; // <- named import

async function bootstrap() {
  const app = express();
  app.use(cors(), bodyParser.json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
