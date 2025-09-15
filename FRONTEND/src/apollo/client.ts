import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql", // ajusta el puerto si tu backend es otro
  }),
  cache: new InMemoryCache(),
});

export default client;
