import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

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
  Divider,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    cursor: "grab",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.palette.reflexGrey.main,
    backgroundColor: theme.palette.reflexGrey.light,
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  dialogTitleIcon: {
    marginTop: "0.5rem",
  },
  dialogPaper: {
    minHeight: "50vh",
    maxHeight: "80vh",
  },
  dialogContent: {
    paddingTop: "20px",
  },
  dialogActions: {
    cursor: "grab",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: theme.palette.reflexGrey.main,
    backgroundColor: theme.palette.reflexGrey.light,
    paddingTop: "12px",
    paddingBottom: "12px",
    marginTop: "20px",
  },
  titleInput: {
    ...theme.typography.h5,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.reflexGrey.main,
    borderRadius: "5px",
    backgroundColor: theme.palette.reflexGrey.light,
    padding: "0.5rem",
  },
  descriptionInput: {
    ...theme.typography.body1,
    marginTop: "0rem",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.reflexGrey.main,
    backgroundColor: theme.palette.reflexGrey.light,
    borderRadius: "5px",
    padding: "0.5rem",
  },
  descriptionContainer: {
    maxHeight: "26.2em",
    overflow: "auto",
  },
  descriptionLabel: {
    marginTop: "1rem",
    marginBottom: "0.7rem",
    fontWeight: "bold",
  },
  descriptionText: {
    whiteSpace: "pre-wrap",
    display: "inline",
  },
  statusSelector: {
    marginTop: "0.15rem",
    marginBottom: "0.65rem",
  },
  selectorTextStyle: {
    ...theme.typography.subtitle1,
    fontStyle: "italic",
  },
  statusText: {
    fontStyle: "italic",
    color: theme.palette.info.main,
    display: "inline",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  statusTextWrapper: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
}));

function DraggablePaper(props) {
  return (
    <Draggable
      handle={'[class*="draggableHandle"]'}
      cancel={'[class*="draggableCancel"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

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

  // TODO get rid of this useEffect and replace it with proper solution
  // TODO make this useeffect call handlecardsave upon changed cardData; this will also involve separating the editing close from data callback
  useEffect(() => {
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

  const cardInput = (inputValue, inputClass, enterDisabled, dataField) => {
    return (
      <ClickAwayListener
        onClickAway={handleCardSave}
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
      >
        <Input
          fullWidth
          autoFocus
          value={inputValue}
          multiline
          rowsMax={dataField === "description" ? 15 : null}
          rows={dataField === "description" ? 3 : null}
          onKeyPress={
            enterDisabled
              ? e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCardSave();
                  }
                }
              : null
          }
          onChange={e => {
            const targetValue = e.target.value;
            setCardData(prevData => ({
              ...prevData,
              [dataField]: targetValue,
            }));
          }}
          classes={{ input: inputClass }}
          onFocus={e => {
            e.preventDefault();
            const { target } = e;
            target.setSelectionRange(target.value.length, target.value.length);
          }}
          disableUnderline
        />
      </ClickAwayListener>
    );
  };

  return (
    <React.Fragment>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        PaperComponent={DraggablePaper}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className={`${classes.dialogTitle} draggableHandle`}>
          <DescriptionIcon
            className={classes.dialogTitleIcon}
            color="disabled"
          />
        </DialogTitle>

        <DialogContent className={`${classes.dialogContent} draggableCancel`}>
          {/* Title  ----------------------------------------------------------------------------- */}
          {cardEditing.title ? (
            cardInput(cardData.title, classes.titleInput, true, "title")
          ) : (
            <Typography
              variant="h5"
              onClick={() => setCardEditing(prev => ({ ...prev, title: true }))}
            >
              {cardData.title}
            </Typography>
          )}

          {/* Status ----------------------------------------------------------------------------- */}
          {cardEditing.status ? (
            <ClickAwayListener
              onClickAway={handleCardSave}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              {/* TODO open selector immediately upon click, stop editing upon closing select */}
              <Select
                className={classes.statusSelector}
                value={cardData.status}
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
            <div className={classes.statusTextWrapper}>
              <Typography
                className={classes.statusText}
                variant="subtitle1"
                onClick={() =>
                  setCardEditing(prev => ({ ...prev, status: true }))
                }
              >
                {statusDictionary[cardData.status]}
              </Typography>
            </div>
          )}
          {/* Description ----------------------------------------------------------------------------- */}
          <Divider />
          <Typography className={classes.descriptionLabel} variant="h6">
            Description
          </Typography>
          {cardEditing.description ? (
            cardInput(
              cardData.description,
              classes.descriptionInput,
              false,
              "description"
            )
          ) : (
            <div className={classes.descriptionContainer}>
              <Typography
                className={classes.descriptionText}
                onClick={() =>
                  setCardEditing(prev => ({ ...prev, description: true }))
                }
                variant="body1"
              >
                {cardData.description}
              </Typography>
            </div>
          )}
          {/* Show fake input if description is empty */}
          {!cardData.description && !cardEditing.description ? (
            <Input
              disableUnderline
              fullWidth
              placeholder="Add a description..."
              multiline
              rows="3"
              onClick={() =>
                setCardEditing(prev => ({ ...prev, description: true }))
              }
              classes={{
                input: classes.descriptionInput,
              }}
            ></Input>
          ) : null}
        </DialogContent>

        <DialogActions className={`${classes.dialogActions} draggableHandle`}>
          <Button className="draggableCancel" autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CardDetailDialog;
