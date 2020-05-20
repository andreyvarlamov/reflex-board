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
  },
});

export const reflex = responsiveFontSizes(reflexTheme);
