import React, { useContext, useState } from "react";
import {
  Typography,
  makeStyles,
  Paper,
  Input,
  ClickAwayListener,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { BoardContext } from "../contexts";

const useStyles = makeStyles(theme => ({
  boardCard: {
    width: "150px",
    minHeight: "150px",
    padding: "1.5rem",
    margin: "0.5rem 0.5rem",
    borderRadius: "5px",
    display: "flex",
    "&:hover": {
      background: theme.palette.reflexGrey.light,
      cursor: "pointer",
    },
    position: "relative",
    flexDirection: "column",
  },
  boardDetailText: {
    width: "100%",
    flexGrow: "1",
    textAlign: "center",
    margin: "auto",
    overflowWrap: "break-word",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boardDetailAuthor: {
    width: "100%",
    textAlign: "center",
    margin: "0.5rem auto auto",
    overflowWrap: "break-word",
    color: "#505050",
    fontWeight: "normal",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newBoardInput: {
    textAlign: "center",
  },
  newBoardInputWrapper: {
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    color: "#AAAAAA",
    "&:hover": {
      padding: "3px",
      color: "#505050",
      backgroundColor: "#AAAAAA",
      borderRadius: "50%",
    },
  },
}));

function BoardCard(props) {
  const classes = useStyles();

  const { newBoard, canDelete, author } = props;

  const NewBoardCard = () => {
    const [title, setTitle] = useState("");

    const { addBoard } = useContext(BoardContext);

    const submitForm = () => {
      if (title) addBoard({ title });
    };

    return (
      <ClickAwayListener
        onClickAway={submitForm}
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
      >
        <Paper className={classes.boardCard} onClick={props.onClick}>
          <Input
            classes={{ input: classes.newBoardInput }}
            className={classes.newBoardInputWrapper}
            multiline
            disableUnderline
            placeholder={"+ Add board"}
            onKeyPress={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitForm();
              }
            }}
            onChange={e => setTitle(e.target.value)}
            value={title}
          ></Input>
        </Paper>
      </ClickAwayListener>
    );
  };

  return newBoard ? (
    <NewBoardCard />
  ) : (
    <Paper className={classes.boardCard} onClick={props.onClick}>
      {canDelete ? (
        <DeleteIcon
          className={classes.deleteButton}
          onClick={e => {
            e.stopPropagation();
            props.onDelete();
          }}
        />
      ) : null}
      <Typography className={classes.boardDetailText} variant="subtitle1">
        {props.title}
      </Typography>
      {author ? (
        <Typography className={classes.boardDetailAuthor} variant="subtitle2">
          {"by " + props.author.firstName + " " + props.author.lastName}
        </Typography>
      ) : null}
    </Paper>
  );
}

export default BoardCard;
