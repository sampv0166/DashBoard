import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import DashboardOverview from "./dashboard/DashboardOverview";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import UserScreen from "./examples/UserScreen";
import AddNewUserScreen from "./examples/AddNewUserScreen";
import AddProductScreen from "./examples/AddProductScreen";

const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <main className="content">
        <Navbar />

        <Route
          exact
          path="/"
          render={({ match }) => <DashboardOverview match={match} />}
        ></Route>
        <Route
          exact
          path="/users"
          render={({ match }) => <UserScreen match={match} />}
        ></Route>

        <Route
          exact
          path="/addnewuser"
          render={({ match }) => <AddNewUserScreen match={match} />}
        ></Route>

        <Route
          exact
          path="/addnewproduct"
          render={({ match }) => <AddProductScreen match={match} />}
        ></Route>
      </main>
    </div>
  );
};

export default HomePage;
