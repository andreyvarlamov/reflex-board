import React, { useState, useContext } from "react";

import { makeStyles, Typography, Button } from "@material-ui/core";

import ReflexCard from "./ReflexCard";
import CardDetailDialog from "./dialogs/CardDetailDialog";

// Contexts
import { BoardContext } from "../contexts";

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
}));

function ReflexMainArea() {
  const classes = useStyles();

  // Contexts
  const { board } = useContext(BoardContext);

  // States
  const [editing, setEditing] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [chosenCardId, setChosenCardId] = useState("");

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

  // Handlers
  const handleCardClick = id => {
    setChosenCardId(id);
    setDetailOpen(true);
  };

  return (
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
                  <div key={card._id} className={classes.cardItem}>
                    <ReflexCard card={card} handleCardClick={handleCardClick} />
                  </div>
                ))}
              {editing === column ? newCardComponent(column) : null}
              {editing !== column
                ? addButtonComponent(column)
                : cancelButtonComponent()}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ReflexMainArea;
