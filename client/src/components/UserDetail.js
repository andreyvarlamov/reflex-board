import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  List,
  ListItem,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { AuthContext, BoardContext } from "../contexts";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  greeting: {
    margin: "2rem 0.5rem 1rem",
    padding: "0 1rem",
    fontWeight: "bold",
  },
  h5Label: {
    margin: "2rem 0.5rem 1rem",
    padding: "0 1rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

function BoardCard(props) {
  return <Paper onClick={props.onClick}>{props.title}</Paper>;
}

function AddBoardForm(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const { addBoard } = useContext(BoardContext);

  const submitForm = e => {
    e.preventDefault();

    const data = { title };

    addBoard(data);

    // if (status !== "LOGIN_ERROR") history.push("/");
  };

  return (
    <React.Fragment>
      <Typography variant="h5" className={classes.h5Label}>
        Add New Board
      </Typography>
      <form className={classes.form} noValidate onSubmit={submitForm}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained">
          Add
        </Button>
      </form>
    </React.Fragment>
  );
}

function UserDetail() {
  const classes = useStyles();

  const history = useHistory();

  const { user, isLoading } = useContext(AuthContext);
  // const { fetchBoard, loading } = useContext(BoardContext);

  const [boardId, setBoardId] = useState("");

  useEffect(() => {
    if (boardId !== "") history.push("/board/" + boardId);
  }, [boardId]);

  return (
    <React.Fragment>
      {/* TODO Some weird stuff is still happening here */}
      {!isLoading && user.boards ? (
        <React.Fragment>
          <Typography variant="h4" className={classes.greeting}>
            Hello, {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h5" className={classes.h5Label}>
            Your Boards:
          </Typography>
          {user.boards.map((board, index) => (
            <BoardCard
              key={index}
              title={board.title}
              onClick={() => setBoardId(board._id)}
            />
          ))}
          <AddBoardForm />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default UserDetail;
