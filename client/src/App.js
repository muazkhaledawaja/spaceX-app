import "./App.css";
import logo from './images/logo.jpg'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import LaunchTable from "./components/LaunchTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
       <img
            src={logo}
            alt="SpaceX"
            style={{
              width: 600,
              display: "block",
              margin: "auto",
            }}
          />
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Launches />} />
            <Route exact path="/t" element={<LaunchTable />} />
            <Route exact path="/Launch/:flight_number" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
