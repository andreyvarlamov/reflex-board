import React from "react";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { reflex } from "./theme";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        <AppNavbar />
      </ThemeProvider>
    </div>
  );
}

export default App;
