import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "./index.css";
import App from "./App";
import { client } from "./graphql/client";
const appClient = client();
ReactDOM.render(
  <ApolloProvider client={appClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
