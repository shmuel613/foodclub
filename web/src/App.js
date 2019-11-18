import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import Status from "./components/Status";
import Restaurants from "./components/Restaurants";
import Menu from "./components/Menu";
import Admin from "./components/Admin/Admin";

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
      <Router>
        <Status></Status>
        <div className="mt-15">
          <Link to="/">Home</Link> |<Link to="/menu">Menu</Link> |
          <Link to="/admin">Admin</Link>
        </div>
        <Switch>
          <Route path="/menu/:id">
            <div className="container">
              <Restaurants></Restaurants>
              <div className="status-box main mt-15">
                <Menu />
              </div>
            </div>
          </Route>
          <Route path="/menu/">
            <Restaurants></Restaurants>
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
        <div></div>
      </Router>
    </div>
  );
}

export default App;
