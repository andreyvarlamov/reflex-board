import React, { useReducer, useEffect, useState, useContext } from "react";

import { BoardContext, AuthContext } from "..";

import {
  fetchBoard,
  addBoard,
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

  const { loadUser } = useContext(AuthContext);

  // const [once, setOnce] = useState(true);
  // useEffect(() => {
  //   if (once) {
  //     fetchBoard(dispatch);
  //     setOnce(false);
  //   }
  // }, [once, state]);

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        loading: state.loading,
        fetchBoard: boardId => {
          fetchBoard(dispatch, boardId);
        },
        addBoard: board => {
          addBoard(dispatch, board, loadUser);
        },
        addCard: card => {
          addCard(dispatch, state.board._id, card);
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
