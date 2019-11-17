import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Status from "./components/Status";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faTimesCircle,
  faUtensils,
  faClock
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle, faTimesCircle, faUtensils, faClock);

function App() {
  return (
    <div className="App">
      <Status></Status>
      <Main></Main>
    </div>
  );
}

export default App;
