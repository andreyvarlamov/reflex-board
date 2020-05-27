import {
  GET_BOARD,
  BOARD_LOADING,
  ADD_CARD,
  UPDATE_CARD,
  ADD_CARD_LOCAL,
  UPDATE_CARD_LOCAL,
} from "../actions";

const updateCards = (prevCards, updatedCard) => {
  const foundIndex = prevCards.findIndex(
    foundCard => foundCard._id === updatedCard._id
  );
  prevCards[foundIndex] = updatedCard;
  return prevCards;
};

// TODO implement DELETE_CARD action type
export default (state, action) => {
  switch (action.type) {
    case GET_BOARD:
      return {
        ...state,
        board: action.payload,
        prevBoard: action.payload,
        loading: false,
      };
    case BOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CARD:
      return {
        ...state,
        board: {
          ...state.prevBoard,
          cards: [...state.prevBoard.cards, action.payload],
        },
        prevBoard: {
          ...state.prevBoard,
          cards: [...state.prevBoard.cards, action.payload],
        },
      };
    case UPDATE_CARD:
      return {
        ...state,
        board: {
          ...state.prevBoard,
          cards: updateCards(state.prevBoard.cards, action.payload),
        },
        prevBoard: {
          ...state.prevBoard,
          cards: updateCards(state.prevBoard.cards, action.payload),
        },
      };
    case ADD_CARD_LOCAL:
      return {
        ...state,
        prevBoard: state.board,
        board: {
          ...state.board,
          cards: [...state.board.cards, action.payload],
        },
      };
    case UPDATE_CARD_LOCAL:
      return {
        ...state,
        prevBoard: state.board,
        board: {
          ...state.board,
          cards: updateCards(state.board.cards, action.payload),
        },
      };
    default:
      throw new Error(`Board Reducer: Invalid Action Type (${action.type})`);
  }
};
