import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Index,
} from "react-router-dom";

// components
import ReflexNavbar from "./ReflexNavbar";
import ReflexBoardCanvas from "./ReflexBoardCanvas";
import Login from "./Login";
import Register from "./Register";
import UserDetail from "./UserDetail";

import { AuthContext } from "../contexts";

function ReflexApp() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <ReflexNavbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/board/:boardId">
          <ReflexBoardCanvas />
        </Route>
        <Route path="/">
          {isAuthenticated ? <UserDetail /> : null}
          {/* Separated 2 cases, so that login doesn't show up if isAuthenticated is null (not loaded yet) */}
          {isAuthenticated === false ? <Login /> : null}
        </Route>
      </Switch>
    </Router>
  );
}

export default ReflexApp;
