import React from "react";

// material ui stuff
import { CssBaseline, ThemeProvider } from "@material-ui/core";

// themes
import { reflex } from "./theme";

// components
import ReflexNavbar from "./components/ReflexNavbar";
import ReflexMainArea from "./components/ReflexMainArea";

// Context Providers
import { BoardProvider } from "./contexts/providers";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        <BoardProvider>
          <ReflexNavbar />
          <ReflexMainArea />
        </BoardProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
