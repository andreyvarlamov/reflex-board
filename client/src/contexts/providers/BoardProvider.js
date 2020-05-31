import React, { useReducer, useEffect, useState } from "react";

import { BoardContext } from "..";

import {
  fetchBoard,
  addCard,
  updateCard,
  deleteCard,
} from "../actions/boardActions";

import BoardReducer from "../reducers/boardReducer";

const initialState = {
  board: {},
  prevBoard: {},
  loading: true,
};

function BoardProvider(props) {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (once) {
      fetchBoard(dispatch);
      setOnce(false);
    }
  }, [once, state]);

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        loading: state.loading,
        fetchBoard: () => {
          fetchBoard(dispatch);
        },
        addCard: card => {
          addCard(dispatch, card);
        },
        updateCard: card => {
          updateCard(dispatch, card);
        },
        deleteCard: cardId => {
          deleteCard(dispatch, cardId);
        },
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
