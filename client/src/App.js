import React from "react";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import AppMainArea from "./components/AppMainArea";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { reflex } from "./theme";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        <AppNavbar />
        <AppMainArea />
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
