import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Restaurants from "./Restaurants";
import Menu from "./Menu";

export default function Main() {
  return (
    <Router>
      <div className="container">
        <Restaurants></Restaurants>
        <div className="status-box main mt-15">
          <Switch>
            {/* <Route exact path="/">
            <Home />
          </Route> */}
            <Route path="/menu/:id">
              <Menu />
            </Route>
            {/* <Route path="/admin">
            <Admin />
          </Route> */}
          </Switch>
        </div>
      </div>
      <div></div>
    </Router>
  );
}
