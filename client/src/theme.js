import { responsiveFontSizes, createMuiTheme } from "@material-ui/core";

const reflexTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#95ffff",
      main: "#5ce1e6",
      dark: "#02afb4",
      contrastText: "#000000",
    },
    secondary: {
      light: "#5475e0",
      main: "#004aad",
      dark: "#00247d",
      contrastText: "#ffffff",
    },
    reflexGrey: {
      main: "#e0e0e0",
      light: "#f5f5f5",
    },
    danger: "#ff5252",
  },
});

export const reflex = responsiveFontSizes(reflexTheme);
