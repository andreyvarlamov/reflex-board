import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

import ReflexCard from "./ReflexCard";

// TODO: make the canvas extend to whole screen
const useStyles = makeStyles(theme => ({
  // boardCanvas: {
  //   position: "relative",
  //   // flexGrow: 1,
  // },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem auto 0",
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
    background: theme.palette.primary.main,
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
    margin: "1rem 0.5rem",
    padding: "0 1rem",
  },
}));

function AppMainArea() {
  const classes = useStyles();

  const cards = [
    { title: "Start doing stuff", status: 0 },
    { title: "Start doing other stuff", status: 0 },
    { title: "Keep doing stuff", status: 1 },
    { title: "Now test it", status: 2 },
    { title: "Also test this", status: 2 },
    { title: "And this is done", status: 3 },
  ];

  const initialBoard = {
    title: "My Board",
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

  const [board, setBoard] = useState(initialBoard);

  return (
    <React.Fragment>
      <Container maxWidth="xl" style={{ flexGrow: 1 }}>
        <Typography variant="h4" className={classes.boardTitle}>
          {board.title}
        </Typography>
        {/* <div className={classes.boardCanvas}> */}
        <div className={classes.cardsContainer}>
          {board.statusDictionary.map((status, column) => (
            <div key={column} className={classes.cardsColumn}>
              <div key={column} className={classes.columnCardsContainer}>
                <Typography variant="h6" className={classes.columnTitle}>
                  {status}
                </Typography>
                {board.cards
                  .filter(card => card.status === column)
                  .map((card, index) => (
                    <div key={index} className={classes.cardItem}>
                      <ReflexCard title={card.title} />
                    </div>
                  ))}
                <Button
                  variant="outlined"
                  style={{ textAlign: "left", margin: "0.5rem 0 0" }}
                >
                  + Add a New Card
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </Container>
    </React.Fragment>
  );
}

export default AppMainArea;
