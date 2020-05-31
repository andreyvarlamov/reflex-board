import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// material ui stuff
import { CssBaseline, ThemeProvider } from "@material-ui/core";

// themes
import { reflex } from "./theme";

// components
import ReflexNavbar from "./components/ReflexNavbar";
import ReflexMainArea from "./components/ReflexMainArea";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

// Context Providers
import { BoardProvider, ErrorProvider } from "./contexts/providers";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        <Router>
          <BoardProvider>
            <ErrorProvider>
              <ReflexNavbar />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/">
                  <ReflexMainArea />
                </Route>
              </Switch>
            </ErrorProvider>
          </BoardProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
