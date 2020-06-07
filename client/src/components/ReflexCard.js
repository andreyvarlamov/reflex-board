import React, { useState, useContext } from "react";

import { Paper, Typography, Input, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DescriptionIcon from "@material-ui/icons/Description";

import { BoardContext } from "../contexts";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1rem",
    width: "100%",
    overflowWrap: "break-word",
    borderRadius: "5px",
    "&:hover": {
      background: theme.palette.reflexGrey.light,
      cursor: "pointer",
    },
  },
  cardTitle: {
    lineHeight: "1.6em",
  },
  descriptionIcon: {
    marginTop: "0.5rem",
  },
  contentContainer: {
    padding: "6px 0 6px",
  },
  cardInput: {
    lineHeight: "1.6em",
  },
}));

function ReflexCard(props) {
  const classes = useStyles();

  const { newCard } = props;

  const [title, setTitle] = useState("");

  const { addCard } = useContext(BoardContext);

  const cardComponent = () => {
    const { card, handleCardClick } = props;
    return (
      <Paper
        className={classes.wrapper}
        onClick={() => handleCardClick(card._id)}
      >
        <div className={classes.contentContainer}>
          <Typography className={classes.cardTitle} variant="body1">
            {card.title}
          </Typography>
          {card.description ? (
            <DescriptionIcon
              className={classes.descriptionIcon}
              color="disabled"
            />
          ) : null}
        </div>
      </Paper>
    );
  };

  const newCardComponent = () => {
    const { status, callback } = props;

    const submitCard = () => {
      if (title !== "") {
        addCard({
          status,
          title,
        });
        callback();
      }
    };

    const cardInputComponent = () => (
      <Input
        className={classes.cardInput}
        placeholder="Enter title"
        fullWidth
        disableUnderline
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        multiline
        onKeyPress={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitCard();
          }
        }}
      />
    );

    return (
      <ClickAwayListener
        onClickAway={submitCard}
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
      >
        <Paper className={classes.wrapper}>
          <form noValidate autoComplete="off">
            {cardInputComponent()}
          </form>
        </Paper>
      </ClickAwayListener>
    );
  };

  return (
    <React.Fragment>
      {newCard ? newCardComponent() : cardComponent()}
    </React.Fragment>
  );
}

export default ReflexCard;
