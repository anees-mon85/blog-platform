"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";

export const Provider = ({ children }: { children: any }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
