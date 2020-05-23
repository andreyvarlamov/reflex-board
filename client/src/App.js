import React from "react";
import "./App.css";

import ReflexNavbar from "./components/ReflexNavbar";
import ReflexMainArea from "./components/ReflexMainArea";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { reflex } from "./theme";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        <ReflexNavbar />
        <ReflexMainArea />
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
