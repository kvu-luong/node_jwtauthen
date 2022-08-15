import "reflect-metadata";
const express = require("express");
import http from "http";
import cookieParser from "cookie-parser";

import { Request, Response, Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { buildSchema } from "type-graphql";
require("module-alias/register");

import { UserResolver } from "./grapql/UserResolver";

import UserRoute from "./routes/User.route";

const app: Express = express();
const httpServer = http.createServer(app);

// setup graphql with apollo
(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
})();

app.use(cookieParser());
app.get("/", (_req: Request, res: Response) => res.send("Hello"));
app.use("/user", UserRoute);

httpServer.listen(4000, () => {
  console.log("Server is running...");
});
