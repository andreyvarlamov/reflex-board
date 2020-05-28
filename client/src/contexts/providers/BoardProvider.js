import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";

import { BoardContext } from "..";

import {
  GET_BOARD,
  BOARD_LOADING,
  ADD_CARD,
  UPDATE_CARD,
  ADD_CARD_LOCAL,
  UPDATE_CARD_LOCAL,
  DELETE_CARD,
} from "../actions";
import BoardReducer from "../reducers/BoardReducer";

const initialState = {
  board: {},
  prevBoard: {},
  loading: true,
};

function BoardProvider(props) {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  //TEMP
  const boardId = "5ec35ca37ce40e6643243748";

  const fetchBoard = () => {
    dispatch({ type: BOARD_LOADING });
    axios
      .get("/api/boards/" + boardId)
      .then(res => dispatch({ type: GET_BOARD, payload: res.data }))
      .catch(err => console.log(err));
  };

  const addCard = card => {
    dispatch({ type: ADD_CARD_LOCAL, payload: card });
    const { title, status } = card;
    axios
      .post("/api/cards", { title, status, boardId })
      .then(res => dispatch({ type: ADD_CARD, payload: res.data }))
      .catch(err => console.log("ERR: " + err));
  };

  const updateCard = card => {
    dispatch({ type: UPDATE_CARD_LOCAL, payload: card });
    const cardId = card._id;
    axios
      .patch("/api/cards/" + cardId, card)
      .then(res => dispatch({ type: UPDATE_CARD, payload: res.data }))
      .catch(err => console.log("ERR: " + err));
  };

  const deleteCard = cardId => {
    axios.delete("/api/cards/" + cardId).then(res => {
      if (res.data.success) dispatch({ type: DELETE_CARD, payload: cardId });
      else throw new Error("Error when deleting a card. Reload the page");
    });
  };

  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (once) {
      dispatch({ type: BOARD_LOADING });
      axios
        .get("/api/boards/" + boardId)
        .then(res => dispatch({ type: GET_BOARD, payload: res.data }))
        .catch(err => console.log(err));
      setOnce(false);
    }
  }, [once, state]);

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        loading: state.loading,
        fetchBoard: fetchBoard,
        addCard: addCard,
        updateCard: updateCard,
        deleteCard: deleteCard,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
