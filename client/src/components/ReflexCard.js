import React, { useState } from "react";
import { Paper, Typography, Input, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DescriptionIcon from "@material-ui/icons/Description";

import CardDetailDialog from "./dialogs/CardDetailDialog";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1rem",
    width: "100%",
    overflowWrap: "break-word",
    "&:hover": {
      background: theme.palette.cardColor.hover,
      cursor: "pointer",
    },
  },
  cardTitle: {
    // width: "250px",
    lineHeight: "1.6em",
  },
}));

function ReflexCard(props) {
  const classes = useStyles();

  const [detailOpen, setDetailOpen] = useState(false);

  const { card, statusDictionary, cardEditCallback } = props;

  return (
    <React.Fragment>
      <CardDetailDialog
        open={detailOpen}
        handleClose={() => {
          setDetailOpen(false);
        }}
        card={card}
        statusDictionary={statusDictionary}
        cardEditCallback={cardEditCallback}
      />
      <Paper className={classes.wrapper} onClick={() => setDetailOpen(true)}>
        <div style={{ padding: "6px 0 7px" }}>
          <Typography className={classes.cardTitle} variant="body1">
            {card.title}
          </Typography>
          {card.description ? (
            <DescriptionIcon color="disabled" style={{ marginTop: "0.5rem" }} />
          ) : null}
        </div>
      </Paper>
    </React.Fragment>
  );
}

function ReflexCardNew(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const { column, newCardCallback } = props;

  const submitCard = e => {
    e.preventDefault();
    newCardCallback(column, title);
  };

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={submitCard}>
        <Paper className={classes.wrapper}>
          {/* TODO Fix too much padding */}
          <form noValidate autoComplete="off" onSubmit={submitCard}>
            <Input
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
                  submitCard(e);
                }
              }}
              style={{ lineHeight: "1.6em" }}
            />
          </form>
        </Paper>
      </ClickAwayListener>
    </React.Fragment>
  );
}

export { ReflexCard, ReflexCardNew };
