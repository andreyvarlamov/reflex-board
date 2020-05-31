import axios from "axios";

import {
  GET_BOARD,
  BOARD_LOADING,
  ADD_CARD,
  UPDATE_CARD,
  ADD_CARD_LOCAL,
  UPDATE_CARD_LOCAL,
  DELETE_CARD,
} from ".";

//TEMP
const boardId = "5ec35ca37ce40e6643243748";

export const fetchBoard = dispatch => {
  dispatch({ type: BOARD_LOADING });
  axios
    .get("/api/boards/" + boardId)
    .then(res => dispatch({ type: GET_BOARD, payload: res.data }))
    .catch(err => console.log(err));
};

export const addCard = (dispatch, card) => {
  dispatch({ type: ADD_CARD_LOCAL, payload: card });
  const { title, status } = card;
  axios
    .post("/api/cards", { title, status, boardId })
    .then(res => dispatch({ type: ADD_CARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const updateCard = (dispatch, card) => {
  dispatch({ type: UPDATE_CARD_LOCAL, payload: card });
  const cardId = card._id;
  axios
    .patch("/api/cards/" + cardId, card)
    .then(res => dispatch({ type: UPDATE_CARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const deleteCard = (dispatch, cardId) => {
  axios.delete("/api/cards/" + cardId).then(res => {
    if (res.data.success) dispatch({ type: DELETE_CARD, payload: cardId });
    else throw new Error("Error when deleting a card. Reload the page");
  });
};
