import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/app/api/graphql/schema";
import { resolvers } from "@/app/api/graphql/resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = startServerAndCreateNextHandler(apolloServer);
export const GET = handler;
export const POST = handler;
