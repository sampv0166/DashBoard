import React from "react";
import { Route } from "react-router-dom";
import Signin from "./examples/Signin";
import SignIn from "./examples/Signin";
import HomePage from "./HomePage";

const Private = () => {
  return (
    <Route
      exact
      path="/private"
      render={({ match }) => <HomePage match={match} />}
    ></Route>

  );
};

export default Private;
