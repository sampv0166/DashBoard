import React from "react";
import { Redirect, Route, useLocation ,useHistory} from "react-router-dom";


const getUser = () => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userInfoFromStorage;
};


const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const user = getUser()

  return (
    <Route {...rest}>
      {user && user.success ?
        <Component />
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default PrivateRoute;