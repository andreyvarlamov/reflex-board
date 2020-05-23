import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { makeStyles, Typography, Button } from "@material-ui/core";

import ReflexCard from "./ReflexCard";
import CardDetailDialog from "./dialogs/CardDetailDialog";

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

  // TEMP LOCAL SETUP -----------------------------------------------------
  const cards = [
    {
      _id: uuid(),
      title: "Start doing stuff",
      description: "Start doing stuff",
      status: 0,
    },
    {
      _id: uuid(),
      title: "Start doing other stuff",
      description: "Start doing other stuff",
      status: 0,
    },
    {
      _id: uuid(),
      title: "Keep doing stuff",
      description: "Keep doing stuff",
      status: 1,
    },
    {
      _id: uuid(),
      title: "Now test it hahahahahah",
      description: "Now test it hahahahahah",
      status: 2,
    },
    {
      _id: uuid(),
      title: "Also test this",
      description: "Also test this",
      status: 2,
    },
    {
      _id: uuid(),
      title: "And this is done",
      description: "And this is done",
      status: 3,
    },
  ];

  const initialBoard = {
    title: "Board Title",
    cards,
    statusDictionary: [
      "To Do",
      "In Progress",
      "In Testing",
      "Done",
      "Super Done",
      "Actually Done",
    ],
  };
  // END TEMP LOCAL SETUP -----------------------------------------------------

  // States
  const [board, setBoard] = useState(initialBoard);
  const [editing, setEditing] = useState(-1);
  // Used to force update on AppMainArea when a card is edited (map and filter on board.cards doesn't rerun and update ReflexCard prop)
  const [forceUpdate, setForceUpdate] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);

  const dummyCard = { title: "", description: "", status: 0 };
  const [chosenCard, setChosenCard] = useState(dummyCard);

  // Callbacks
  const newCardCallback = (column, cardTitle) => {
    if (cardTitle) {
      setBoard(board => {
        board.cards.push({ _id: uuid(), title: cardTitle, status: column });
        return board;
      });
    }
    setEditing(-1);
  };

  const cardEditCallback = card => {
    setBoard(board => {
      const foundIndex = board.cards.findIndex(
        foundCard => foundCard._id === card._id
      );
      board.cards[foundIndex] = { ...board.cards[foundIndex], ...card };
      return board;
    });
    setChosenCard(board.cards.find(foundCard => foundCard._id === card._id));
    // Used to force update on AppMainArea when a card is edited
    setForceUpdate(Math.random());
  };

  // Inner components
  const newCardComponent = column => (
    <div className={classes.cardItem}>
      <ReflexCard newCard column={column} newCardCallback={newCardCallback} />
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
    setChosenCard(board.cards.find(card => card._id === id));
    setDetailOpen(true);
    setForceUpdate(Math.random());
  };

  return (
    <React.Fragment>
      <CardDetailDialog
        open={detailOpen}
        handleClose={() => {
          setDetailOpen(false);
          setChosenCard(dummyCard);
        }}
        card={chosenCard}
        statusDictionary={board.statusDictionary}
        cardEditCallback={cardEditCallback}
        forceUpdate={forceUpdate}
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
