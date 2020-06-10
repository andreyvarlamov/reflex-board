import React from "react";

// material ui stuff
import { CssBaseline, ThemeProvider } from "@material-ui/core";

// themes
import { reflex } from "./theme";

// Context Providers
import { BoardProvider, ErrorProvider } from "./contexts/providers";
import AuthProvider from "./contexts/providers/AuthProvider";

// components
import ReflexApp from "./components/ReflexApp";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={reflex}>
        <ErrorProvider>
          <AuthProvider>
            <BoardProvider>
              <ReflexApp />
            </BoardProvider>
          </AuthProvider>
        </ErrorProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
