import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Status from "./components/Status";
import Restaurants from "./components/Restaurants";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle, faTimesCircle);

function App() {
  return (
    <div className="App">
      <Status></Status>
      <br/>
      <strong>Restaurants:</strong><br/>
      <Restaurants></Restaurants>
    </div>
  );
}

export default App;
