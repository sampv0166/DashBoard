import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import DashboardOverview from "./dashboard/DashboardOverview";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AddNewUserScreen from "./examples/AddNewUserScreen";
import AddProductScreen from "./examples/AddProductScreen";
import PermissionsScreen from "./examples/PermissionsScreen";
import Signin from "./examples/Signin";
import useUserInfo from "./examples/useToken";
import UserScreen from "./examples/UserScreen";

const HomePage = () => {
  const { user, setUser } = useUserInfo();

  if (!user) {
    return <Signin setUser={setUser} />;
  }

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
          render={({ match }) => <UserScreen match={match} user={user} />}
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
        <Route
          exact
          path="/permissions/:id"
          render={({ match, history }) => (
            <PermissionsScreen match={match} history={history} user={user} />
          )}
        ></Route>
      </main>
    </div>
  );
};

export default HomePage;
