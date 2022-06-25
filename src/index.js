import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./containers/App";
import client from "./utils/apolloClient";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);
