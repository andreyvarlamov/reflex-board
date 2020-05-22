import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  makeStyles,
  Input,
  ClickAwayListener,
  Select,
  MenuItem,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable handle="#dialog-title" cancel={'[class*="draggableCancel"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    cursor: "move",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.palette.columnColor,
    paddingTop: "12px",
    paddingBottom: "12px",
  },

  titleInput: theme.typography.h6,
  detailInput: {
    ...theme.typography.body1,
  },
  selectorTextStyle: {
    ...theme.typography.subtitle1,
    fontStyle: "italic",
  },
}));

// TODO Fix bug where select dropdown doesnt show up if there is no description

function CardDetailDialog(props) {
  const classes = useStyles();

  const {
    open,
    handleClose,
    card,
    statusDictionary,
    cardEditCallback,
    forceUpdate,
  } = props;

  const initialCardEditing = {
    title: false,
    description: false,
    status: false,
  };

  const initialCardData = {
    title: card.title,
    description: card.description,
    status: card.status,
  };

  useEffect(() => {
    // console.log("CardDetailDialog use effect");
    // console.log(initialCardData);
    setCardData(initialCardData);
    setCardEditing(initialCardEditing);
  }, [forceUpdate]);

  const [cardEditing, setCardEditing] = useState(initialCardEditing);
  const [cardData, setCardData] = useState(initialCardData);

  const handleCardSave = () => {
    if (cardData.title) {
      cardEditCallback({ ...cardData, _id: card._id });
      setCardEditing({ title: false, description: false, status: false });
    }
  };
  // TODO Fix the description multiline input and paragraph matching
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className={classes.dialogTitle} id="dialog-title">
          <DescriptionIcon color="disabled" style={{ marginTop: "0.5rem" }} />
        </DialogTitle>
        <DialogContent
          style={{ paddingTop: "20px" }}
          className="draggableCancel"
        >
          {cardEditing.title ? (
            <ClickAwayListener
              onClickAway={handleCardSave}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              <Input
                fullWidth
                autoFocus
                value={cardData.title}
                multiline
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCardSave();
                  }
                }}
                onChange={e => {
                  const targetValue = e.target.value;
                  setCardData(prevData => ({
                    ...prevData,
                    title: targetValue,
                  }));
                }}
                classes={{ input: classes.titleInput }}
                onFocus={e => {
                  e.preventDefault();
                  const { target } = e;
                  target.setSelectionRange(
                    target.value.length,
                    target.value.length
                  );
                }}
              ></Input>
            </ClickAwayListener>
          ) : (
            <Typography
              variant="h6"
              onClick={() => setCardEditing(prev => ({ ...prev, title: true }))}
            >
              {cardData.title}
            </Typography>
          )}
          {cardEditing.status ? (
            <ClickAwayListener
              onClickAway={() => {
                console.log("Click away");
                handleCardSave();
              }}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              <Select
                value={cardData.status}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                classes={{ select: classes.selectorTextStyle }}
                onChange={e => {
                  const targetValue = e.target.value;
                  setCardData(prevData => ({
                    ...prevData,
                    status: targetValue,
                  }));
                }}
              >
                {statusDictionary.map((status, index) => (
                  <MenuItem value={index} key={index}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </ClickAwayListener>
          ) : (
            <Typography
              variant="subtitle1"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              onClick={() =>
                setCardEditing(prev => ({ ...prev, status: true }))
              }
            >
              <em>{statusDictionary[cardData.status]}</em>
            </Typography>
          )}
          {cardEditing.description ? (
            <ClickAwayListener
              onClickAway={() => {
                console.log("Click away");
                handleCardSave();
              }}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              <Input
                fullWidth
                value={cardData.description}
                multiline
                autoFocus
                rows="3"
                onChange={e => {
                  const targetValue = e.target.value;
                  setCardData(prevData => ({
                    ...prevData,
                    description: targetValue,
                  }));
                }}
                onClick={() =>
                  setCardEditing(prev => ({ ...prev, description: true }))
                }
                classes={{
                  input: classes.detailInput,
                }}
                onFocus={e => {
                  e.preventDefault();
                  const { target } = e;
                  target.setSelectionRange(
                    target.value.length,
                    target.value.length
                  );
                }}
                placeholder="Add a description..."
              ></Input>
            </ClickAwayListener>
          ) : (
            <Typography
              onClick={() =>
                setCardEditing(prev => ({ ...prev, description: true }))
              }
              style={{ whiteSpace: "pre-wrap" }}
              variant="body1"
            >
              {cardData.description}
            </Typography>
          )}
          {/* Show fake input if description is empty */}
          {!cardData.description && !cardEditing.description ? (
            <Input
              fullWidth
              placeholder="Add a description..."
              multiline
              rows="3"
              onClick={() =>
                setCardEditing(prev => ({ ...prev, description: true }))
              }
              classes={{
                input: classes.detailInput,
              }}
            ></Input>
          ) : null}
        </DialogContent>
        <DialogActions className="draggableCancel">
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CardDetailDialog;
