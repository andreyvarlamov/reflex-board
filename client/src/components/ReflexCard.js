import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1rem",
    // borderColor: theme.palette.itemBorderColor,
    // borderWidth: theme.spacing(0.1),
    // borderStyle: "solid",
  },
  // textTitle: {
  //   ...theme.custom.fontFamily.metropolis,
  //   padding: theme.spacing(1.5, 2, 0, 2),
  //   fontWeight: 500,
  //   fontSize: "1rem",
  //   color: theme.palette.text.primary,
  //   lineHeight: theme.spacing(0.18),
  // },
  // barWrapper: {
  //   display: "flex",
  //   flexDirection: "row",
  //   padding: theme.spacing(1, 2),
  //   justifyContent: "space-between",
  // },
}));

function ReflexCard(props) {
  const classes = useStyles();

  const { title } = props;

  return (
    <React.Fragment>
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle1">{title}</Typography>
      </Paper>
    </React.Fragment>
  );
}

export default ReflexCard;
