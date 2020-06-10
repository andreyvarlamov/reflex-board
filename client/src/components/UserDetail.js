import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import BoardCard from "./BoardCard";

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
  boardsWrapper: {
    marginLeft: "50px",
    marginRight: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

const ConfirmDeleteDialog = props => {
  const { open, handleClose } = props;

  const closeDialog = confirm => {
    handleClose(confirm);
  };

  return (
    <Dialog open={open} onClose={() => closeDialog(false)} fullWidth>
      <DialogTitle>Delete the board?</DialogTitle>

      <DialogContent>
        This action will delete the board and all the cards contained in it. It
        cannot be undone. Continue?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => closeDialog(true)}>
          Yes
        </Button>
        <Button autoFocus onClick={() => closeDialog(false)}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function UserDetail() {
  const classes = useStyles();

  const history = useHistory();

  const { user, isLoading } = useContext(AuthContext);
  const { deleteBoard } = useContext(BoardContext);

  const [boardId, setBoardId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState("");

  useEffect(() => {
    if (boardId !== "") history.push("/board/" + boardId);
    // eslint-disable-next-line
  }, [boardId]);

  return (
    <React.Fragment>
      <ConfirmDeleteDialog
        open={dialogOpen}
        handleClose={confirm => {
          if (confirm) deleteBoard(boardToDelete);

          setBoardToDelete("");
          setDialogOpen(false);
        }}
      />
      {!isLoading && user.boards ? (
        <React.Fragment>
          <Typography variant="h4" className={classes.greeting}>
            Hello, {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h5" className={classes.h5Label}>
            Your Boards:
          </Typography>
          <div className={classes.boardsWrapper}>
            {user.boards.map((board, index) => (
              <BoardCard
                key={index}
                title={board.title}
                onClick={() => setBoardId(board._id)}
                onDelete={() => {
                  setBoardToDelete(board._id);
                  setDialogOpen(true);
                }}
                canDelete
              />
            ))}
            <BoardCard newBoard />
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default UserDetail;
