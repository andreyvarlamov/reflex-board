import React, { useContext } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

import { AuthContext } from "../contexts";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    display: "none",
    height: theme.spacing(5.5),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  loginLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

function ReflexNavbar() {
  const classes = useStyles();

  const history = useHistory();

  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link to="/">
            <img
              className={classes.logo}
              src={window.location.origin + "/reflex-logo.png"}
              alt="logo"
            />
          </Link>
          <Typography variant="h6" className={classes.title}>
            Reflex
          </Typography>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                logout();
                history.push("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" className={classes.loginLink}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ReflexNavbar;
