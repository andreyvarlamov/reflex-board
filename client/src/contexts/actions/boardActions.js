import axios from "axios";

import {
  GET_BOARD,
  BOARD_LOADING,
  GET_ALL_BOARDS,
  ALL_BOARDS_LOADING,
  ADD_BOARD,
  DELETE_BOARD,
  ADD_CARD,
  UPDATE_CARD,
  ADD_CARD_LOCAL,
  UPDATE_CARD_LOCAL,
  DELETE_CARD,
  UPDATE_BOARD,
} from ".";

import { tokenConfig } from "./authActions";

export const fetchBoard = (dispatch, boardId) => {
  dispatch({ type: BOARD_LOADING });
  axios
    .get("/api/boards/" + boardId)
    .then(res => dispatch({ type: GET_BOARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const fetchAllBoards = dispatch => {
  dispatch({ type: ALL_BOARDS_LOADING });
  axios
    .get("/api/boards")
    .then(res => dispatch({ type: GET_ALL_BOARDS, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const addBoard = (dispatch, board, loadUser) => {
  axios
    .post("/api/boards", board, tokenConfig())
    .then(res => {
      dispatch({ type: ADD_BOARD, payload: res.data });
      loadUser();
    })
    .catch(err => console.log("ERR: " + err));
};

export const deleteBoard = (dispatch, boardId, loadUser) => {
  axios.delete("/api/boards/" + boardId, tokenConfig()).then(res => {
    if (res.data.success) {
      dispatch({ type: DELETE_BOARD, payload: boardId });
      loadUser();
    } else throw new Error("Error when deleting a board. Reload the page");
  });
};

export const updateBoard = (dispatch, board) => {
  const boardId = board._id;
  axios
    .patch("/api/boards/" + boardId, board, tokenConfig())
    .then(res => dispatch({ type: UPDATE_BOARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const addCard = (dispatch, boardId, card) => {
  dispatch({ type: ADD_CARD_LOCAL, payload: card });
  const { title, status } = card;
  axios
    .post("/api/cards", { title, status, boardId }, tokenConfig())
    .then(res => dispatch({ type: ADD_CARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const updateCard = (dispatch, card) => {
  dispatch({ type: UPDATE_CARD_LOCAL, payload: card });
  const cardId = card._id;
  axios
    .patch("/api/cards/" + cardId, card, tokenConfig())
    .then(res => dispatch({ type: UPDATE_CARD, payload: res.data }))
    .catch(err => console.log("ERR: " + err));
};

export const deleteCard = (dispatch, cardId) => {
  axios.delete("/api/cards/" + cardId, tokenConfig()).then(res => {
    if (res.data.success) dispatch({ type: DELETE_CARD, payload: cardId });
    else throw new Error("Error when deleting a card. Reload the page");
  });
};
