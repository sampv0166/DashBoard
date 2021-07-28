import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Public from "./Public";
import Private from "./Private";
import Auth from "./Auth";
import HomePage from "./HomePage";

const Routee = () => {
  return (
    <Switch>
      <Route exact path="/public" component={Public} />
      <PrivateRoute path="/private" component={Private} />
      <PrivateRoute path="/" component={Private} />
    </Switch>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        console.log('ok')
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

export default Routee;
