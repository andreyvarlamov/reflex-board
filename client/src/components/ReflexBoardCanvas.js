import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  makeStyles,
  Typography,
  Button,
  Input,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import ReflexCard from "./ReflexCard";
import CardDetailDialog from "./CardDetailDialog";

// Contexts
import { BoardContext, AuthContext } from "../contexts";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  outerWrapper: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
  },
  cardsContainerWrapper: {
    position: "relative",
    flexGrow: "1",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem 0 0 0",
    overflow: "auto",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
  },
  cardsColumn: {
    minWidth: "280px",
    height: "100%",
  },
  columnCardsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0 0.5rem",
    background: theme.palette.reflexGrey.main,
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
  },
  cardItem: {
    margin: "0.5rem 0",
  },
  columnTitle: {
    textAlign: "center",
  },
  boardTitle: {
    margin: "2rem 0.5rem 1rem",
    padding: "0 1rem",
    fontWeight: "bold",
  },
  newStatusInput: {
    ...theme.typography.h6,
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: "#AAAAAA",
    "&:hover": {
      cursor: "pointer",
      padding: "3px",
      color: "#505050",
      backgroundColor: "#AAAAAA",
      borderRadius: "50%",
    },
  },
  circularProgress: {
    color: "#505050",
    margin: "auto",
  },
}));

function ReflexBoardCanvas() {
  const classes = useStyles();

  // Contexts
  const { board, loading, fetchBoard, updateBoard } = useContext(BoardContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  // States
  const [editing, setEditing] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [chosenCardId, setChosenCardId] = useState("");
  const [confirmDelStatusOpen, setConfirmDelStatusOpen] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState("");
  const [authToEdit, setAuthToEdit] = useState(false);

  // Router Params
  const { boardId } = useParams();

  useEffect(() => {
    console.log("DEBUG: Fetching Board");
    if (boardId !== "") fetchBoard(boardId);
  }, [boardId]);

  useEffect(() => {
    if (user && board)
      setAuthToEdit(isAuthenticated && user._id === board.userId);
  }, [isAuthenticated, user, board]);

  // Inner components
  const newCardComponent = status => (
    <div className={classes.cardItem}>
      <ReflexCard newCard status={status} callback={() => setEditing(-1)} />
    </div>
  );
  const addButtonComponent = column => (
    <Button
      variant="outlined"
      style={{ textAlign: "left", margin: "0.5rem 0 0" }}
      onClick={() => setEditing(column)}
    >
      + Add a New Card
    </Button>
  );
  const cancelButtonComponent = () => (
    <Button
      variant="outlined"
      style={{ textAlign: "left", margin: "0.5rem 0 0" }}
      onClick={() => setEditing(-1)}
    >
      &times; Cancel
    </Button>
  );

  const NewStatusColumn = () => {
    const [statusName, setStatusName] = useState("");

    const saveNewStatus = () => {
      if (statusName)
        updateBoard({
          _id: board._id,
          statusDictionary: [...board.statusDictionary, statusName],
        });
      setStatusName("");
    };

    return (
      <div className={classes.cardsColumn}>
        <div className={classes.columnCardsContainer}>
          <ClickAwayListener
            onClickAway={() => {
              saveNewStatus();
            }}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <Input
              disableUnderline
              multiline
              value={statusName}
              placeholder={"+ New Status"}
              onChange={e => setStatusName(e.target.value)}
              classes={{ input: classes.newStatusInput }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  saveNewStatus();
                }
              }}
            />
          </ClickAwayListener>
        </div>
      </div>
    );
  };

  // Handlers
  const handleCardClick = id => {
    setChosenCardId(id);
    setDetailOpen(true);
  };

  const handleDelStatusClose = confirm => {
    if (confirm) {
      updateBoard({
        _id: board._id,
        statusDictionary: board.statusDictionary.filter(
          fStatus => fStatus !== statusToDelete
        ),
      });
    }

    setConfirmDelStatusOpen(false);
    setStatusToDelete("");
  };

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress className={classes.circularProgress} />
      ) : (
        <React.Fragment>
          <ConfirmDeleteStatusDialog
            open={confirmDelStatusOpen}
            handleClose={handleDelStatusClose}
          />
          <CardDetailDialog
            open={detailOpen}
            handleClose={() => {
              setDetailOpen(false);
              setChosenCardId("");
            }}
            cardId={chosenCardId}
            authToEdit={authToEdit}
          />
          <div className={classes.outerWrapper}>
            <Typography variant="h4" className={classes.boardTitle}>
              {board.title}
            </Typography>
            <div className={classes.cardsContainerWrapper}>
              <div className={classes.cardsContainer}>
                {board.statusDictionary.map((status, column) => (
                  <div key={uuid()} className={classes.cardsColumn}>
                    <div className={classes.columnCardsContainer}>
                      {authToEdit ? (
                        <DeleteIcon
                          className={classes.deleteButton}
                          onClick={e => {
                            e.stopPropagation();

                            setStatusToDelete(status);

                            setConfirmDelStatusOpen(true);
                          }}
                        />
                      ) : null}
                      <Typography variant="h6" className={classes.columnTitle}>
                        {status}
                      </Typography>
                      {board.cards
                        .filter(card => card.status === status)
                        .map((card, index) => (
                          <div key={uuid()} className={classes.cardItem}>
                            <ReflexCard
                              card={card}
                              handleCardClick={handleCardClick}
                            />
                          </div>
                        ))}
                      {editing === column ? newCardComponent(status) : null}
                      {editing !== column
                        ? authToEdit
                          ? addButtonComponent(column)
                          : null
                        : cancelButtonComponent()}
                    </div>
                  </div>
                ))}
                {authToEdit ? <NewStatusColumn /> : null}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const ConfirmDeleteStatusDialog = props => {
  const { open, handleClose } = props;

  const closeDialog = confirm => {
    handleClose(confirm);
  };

  return (
    <Dialog open={open} onClose={() => closeDialog(false)} fullWidth>
      <DialogTitle>Delete the column?</DialogTitle>

      <DialogContent>
        This action will delete the column and all the cards contained in it. It
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

export default ReflexBoardCanvas;
