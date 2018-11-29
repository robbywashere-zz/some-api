import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import { ApolloLink } from "apollo-link";

const API_KEY = "8fffc5fb976a4d2bafd9c4fc5acc443d";
const restLink = new RestLink({
  uri: "https://newsapi.org/v2/",
  customFetch: async (request, params) => {
    let url = new URL(request.toString());
    url.searchParams.append("apiKey", API_KEY);
    return fetch(url.toString(), params);
  }
});

const cache = new InMemoryCache();

export const client = () =>
  new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([restLink]),
    cache
  });
