import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import DashboardOverview from "./dashboard/DashboardOverview";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AddNewUserScreen from "./examples/AddNewUserScreen";
import AddProductScreen from "./examples/AddProductScreen";
import PermissionsScreen from "./examples/PermissionsScreen";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import useUserInfo from "./examples/useToken";
import UserScreen from "./components/UserScreena";
import PrivateRoute from "./examples/PrivateRoute";
import { render } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import ProductScreen from "./examples/ProductScreen";

import ProductDetailsScreen from "./examples/ProductDetailsScreen";

const HomePage = ({match}) => {
  const history = useHistory();
  const { user, setUser } = useUserInfo();

  return (
    <div>
      {user && user.success ? <Sidebar /> : ""}
      <main className="content">
        {user && user.success ? <Navbar /> : ""}

        {/* <Route
          exact
          path="/"
          render={({ match }) => <DashboardOverview match={match} />}
       ></Route>*/}

        <PrivateRoute
          exact
          path="/"
          component={DashboardOverview}
          user={user}
        />

        <PrivateRoute exact path="/users" component={UserScreen} user={user} />

        {/*  <Route
          exact
          path="/users"
          render={({ match }) => <UserScreen match={match} user={user} />}
        ></Route> */}

        <PrivateRoute
          exact
          path="/addnewuser"
          component={AddNewUserScreen}
          user={user}
        />

        {/*    <PrivateRoute
          exact
          path="/addnewuser"
          component={DashboardOverview}
          user={user}
       /> */}

        {/* <Route
          exact
          path="/addnewproduct"
          render={({ match }) => <AddProductScreen match={match} />}
       ></Route> */}

       {user && user.success ? (
        <Route
          exact
          path="/product/:id"
          render={({ match }) => <AddProductScreen match={match} />}
       ></Route>
       ) : ('')}




        <PrivateRoute
          exact
          path="/products"
          component={ProductScreen}
          user={user}
        />

       { /*  <PrivateRoute
          exact
          path="/product/:id"
          component={ProductDetailsScreen}
          user={user}
       /> */}

        <PrivateRoute
          exact
          path="/permissions/:id"
          component={PermissionsScreen}
          user={user}
        />

        <Route exact path="/register" component={Signup} user={user} />

        <Route
          exact
          path="/login"
          render={({ match, history, location }) => (
            <Signin
              match={match}
              history={history}
              location={location}
              user={user}
              setUser={setUser}
            />
          )}
        ></Route>

        {/* <Route
          exact
          path="/permissions/:id"
          render={({ match, history }) => (
            <PermissionsScreen match={match} history={history} user={user} />
          )}
          ></Route> */}
      </main>
    </div>
  );
};

export default HomePage;
