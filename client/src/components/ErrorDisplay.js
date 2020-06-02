import React from "react";

import { Paper, Typography, makeStyles } from "@material-ui/core";

import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles(theme => ({
  errorPaper: {
    backgroundColor: theme.palette.danger,
    padding: theme.spacing(2),
    color: theme.palette.reflexGrey.light,
    display: "flex",
  },
  errorIcon: {
    marginRight: theme.spacing(1),
  },
  errorMsg: {
    flexGrow: 1,
  },
}));

function ErrorDisplay(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.errorPaper} elevation={0}>
      <ErrorIcon className={classes.errorIcon} />
      <Typography className={classes.errorMsg}>{props.msg}</Typography>
    </Paper>
  );
}

export default ErrorDisplay;
