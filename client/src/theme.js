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
    columnColor: "#e0e0e0",
    cardColor: {
      hover: "#f5f5f5",
    },
  },
});

export const reflex = responsiveFontSizes(reflexTheme);
