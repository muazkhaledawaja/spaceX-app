import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Launches />} />
            <Route exact path="/Launch/:flight_number" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
