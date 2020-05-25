import React, { useReducer, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

import { BoardContext } from "..";

// TEMP LOCAL SETUP -----------------------------------------------------

// const initialCards = [
//   {
//     _id: uuid(),
//     title: "Start doing stuff",
//     description: "Start doing stuff",
//     status: 0,
//   },
//   {
//     _id: uuid(),
//     title: "Start doing other stuff",
//     description: "Start doing other stuff",
//     status: 0,
//   },
//   {
//     _id: uuid(),
//     title: "Keep doing stuff",
//     description: "Keep doing stuff",
//     status: 1,
//   },
//   {
//     _id: uuid(),
//     title: "Now test it hahahahahah",
//     description: "Now test it hahahahahah",
//     status: 2,
//   },
//   {
//     _id: uuid(),
//     title: "Also test this",
//     description: "Also test this",
//     status: 2,
//   },
//   {
//     _id: uuid(),
//     title: "And aaaaathis is done",
//     description: "And this is done",
//     status: 3,
//   },
// ];

// const initialBoard = {
//   title: "Board Title",
//   cards: initialCards,
//   statusDictionary: [
//     "To Do",
//     "In Progress",
//     "In Testing",
//     "Done",
//     "Super Done",
//     "Actually Done",
//   ],
// };

// END TEMP LOCAL SETUP -----------------------------------------------------

const initialState = { board: {}, loading: true };

const updateCards = (prevCards, updatedCard) => {
  const foundIndex = prevCards.findIndex(
    foundCard => foundCard._id === updatedCard._id
  );
  prevCards[foundIndex] = { ...prevCards[foundIndex], ...updatedCard };
  return prevCards;
};

// TODO implement DELETE_CARD action type
const boardReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOARD":
      return {
        ...state,
        board: action.payload,
        loading: false,
      };
    case "BOARD_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ADD_CARD":
      return {
        ...state,
        board: {
          ...state.board,
          cards: [...state.board.cards, action.payload],
        },
      };
    case "UPDATE_CARD":
      return {
        ...state,
        board: {
          ...state.board,
          cards: updateCards(state.board.cards, action.payload),
        },
      };
    default:
      throw new Error(`Board Reducer: Invalid Action Type (${action.type})`);
  }
};

function BoardProvider(props) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  //TEMP
  const boardId = "5ec35ca37ce40e6643243748";

  const fetchBoard = () => {
    console.log("DEBUG: fetchBoard action called");
    dispatch({ type: "BOARD_LOADING" });
    axios
      .get("/api/" + boardId)
      .then(res => dispatch({ type: "GET_BOARD", payload: res.data }))
      .catch(err => console.log(err));
  };

  const addCard = card => {
    dispatch({ type: "ADD_CARD", payload: card });
  };

  const updateCard = card => {
    dispatch({ type: "UPDATE_CARD", payload: card });
  };

  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (once) {
      dispatch({ type: "BOARD_LOADING" });
      console.log("DEBUG: Calling axios: /api/" + boardId);
      axios
        .get("/api/" + boardId)
        .then(res => dispatch({ type: "GET_BOARD", payload: res.data }))
        .catch(err => console.log(err));
      setOnce(false);
    }
  }, [once, state]);

  return (
    <BoardContext.Provider
      value={{
        board: state.board,
        fetchBoard: fetchBoard,
        addCard: addCard,
        updateCard: updateCard,
        loading: state.loading,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
