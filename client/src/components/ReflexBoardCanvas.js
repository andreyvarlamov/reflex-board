import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  makeStyles,
  Typography,
  Button,
  Input,
  ClickAwayListener,
} from "@material-ui/core";

import ReflexCard from "./ReflexCard";
import CardDetailDialog from "./CardDetailDialog";

// Contexts
import { BoardContext, AuthContext } from "../contexts";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  // boardCanvas: {
  //   position: "relative",
  //   // flexGrow: 1,
  // },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem 0 0 0",
    overflow: "auto",
    // position: "absolute",
    // top: "0",
    // bottom: "0",
    // left: "0",
    // right: "0",
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
}));

function ReflexBoardCanvas() {
  const classes = useStyles();

  // Contexts
  const { board, loading, fetchBoard } = useContext(BoardContext);
  const { loadUser } = useContext(AuthContext);

  // States
  const [editing, setEditing] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [chosenCardId, setChosenCardId] = useState("");

  // Router Params
  const { boardId } = useParams();

  useEffect(() => {
    console.log("DEBUG: Fetching Board");
    if (boardId !== "") fetchBoard(boardId);
  }, [boardId]);

  // Inner components
  const newCardComponent = column => (
    <div className={classes.cardItem}>
      <ReflexCard newCard column={column} callback={() => setEditing(-1)} />
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

    return (
      <div className={classes.cardsColumn}>
        <div className={classes.columnCardsContainer}>
          <ClickAwayListener
            onClickAway={() => {
              setStatusName("");
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

                  setStatusName("");
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

  return (
    <React.Fragment>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <React.Fragment>
          <CardDetailDialog
            open={detailOpen}
            handleClose={() => {
              setDetailOpen(false);
              setChosenCardId("");
            }}
            cardId={chosenCardId}
          />

          <Typography variant="h4" className={classes.boardTitle}>
            {board.title}
          </Typography>
          <div className={classes.cardsContainer}>
            {board.statusDictionary.map((status, column) => (
              <div key={column} className={classes.cardsColumn}>
                <div className={classes.columnCardsContainer}>
                  <Typography variant="h6" className={classes.columnTitle}>
                    {status}
                  </Typography>
                  {board.cards
                    .filter(card => card.status === column)
                    .map((card, index) => (
                      <div key={uuid()} className={classes.cardItem}>
                        <ReflexCard
                          card={card}
                          handleCardClick={handleCardClick}
                        />
                      </div>
                    ))}
                  {editing === column ? newCardComponent(column) : null}
                  {editing !== column
                    ? addButtonComponent(column)
                    : cancelButtonComponent()}
                </div>
              </div>
            ))}
            <NewStatusColumn />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ReflexBoardCanvas;
