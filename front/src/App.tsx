import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import { onError } from "apollo-link-error";
import AuthRoute from "./utils/AuthRoute";
import SignupOrLogin from "./pages/SignupOrLogin";
import Cookies from "js-cookie";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import SingleArticle from "./pages/SingleArticle";

function App() {
  const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
    credentials: "include",
  });

  /* const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((graphQLError) => {
        // Prevent wrong client state by reloading
        // if (graphQLError.message === "Forbidden resource") {
        //   window.location.reload();
        // }

        if (graphQLError.extensions?.exception?.status === 401) {
          authManager.logout({ sync: true });
          window.location.reload();
        }
      });
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }); */

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = Cookies.get("accessToken");
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const apolloClient = new ApolloClient({
    //link: logoutLink.concat(authLink.concat(httpLink)),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    //errorPolicy: "all",
    //connectToDevTools: process.env.REACT_APP_NODE_ENV === "development",
  });

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/connexion" element={<SignupOrLogin />} />
          <Route element={<AuthRoute />}>
            <Route element={<Home />} path="/" />
            <Route element={<AdminDashBoard />} path="/admin" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
