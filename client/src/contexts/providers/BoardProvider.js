import React, { useReducer, useEffect, useState, useContext } from "react";

import { BoardContext, AuthContext } from "..";

import {
  fetchBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  addCard,
  updateCard,
  deleteCard,
  fetchAllBoards,
} from "../actions/boardActions";

import BoardReducer from "../reducers/boardReducer";

const initialState = {
  board: {},
  prevBoard: {},
  loading: true,
  allBoards: [],
  allBoardsLoading: true,
};

function BoardProvider(props) {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const { loadUser } = useContext(AuthContext);

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        loading: state.loading,
        allBoards: state.allBoards,
        allBoardsLoading: state.allBoardsLoading,
        fetchBoard: boardId => {
          fetchBoard(dispatch, boardId);
        },
        fetchAllBoards: () => {
          fetchAllBoards(dispatch);
        },
        addBoard: board => {
          addBoard(dispatch, board, loadUser);
        },
        deleteBoard: boardId => {
          deleteBoard(dispatch, boardId, loadUser);
        },
        updateBoard: board => {
          updateBoard(dispatch, board);
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
