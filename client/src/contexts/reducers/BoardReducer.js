import {
  GET_BOARD,
  BOARD_LOADING,
  ADD_BOARD,
  DELETE_BOARD,
  UPDATE_BOARD,
  ADD_CARD,
  UPDATE_CARD,
  ADD_CARD_LOCAL,
  UPDATE_CARD_LOCAL,
  DELETE_CARD,
  GET_ALL_BOARDS,
  ALL_BOARDS_LOADING,
} from "../actions";

const updateCards = (prevCards, updatedCard) => {
  const foundIndex = prevCards.findIndex(
    foundCard => foundCard._id === updatedCard._id
  );
  prevCards[foundIndex] = updatedCard;
  return prevCards;
};

export default (state, action) => {
  console.log("DEBUG: Board Reducer action type - " + action.type);
  console.log(action);
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
    case GET_ALL_BOARDS:
      return {
        ...state,
        allBoards: action.payload,
        allBoardsLoading: false,
      };
    case ALL_BOARDS_LOADING:
      return {
        ...state,
        allBoardsLoading: true,
      };
    case ADD_BOARD:
      return {
        ...state,
        board: null,
        prevBoard: null,
        loading: true,
      };
    case DELETE_BOARD:
      return {
        ...state,
        board: null,
        prevBoard: null,
        loading: true,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: action.payload,
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
    case DELETE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cards: state.board.cards.filter(
            foundCard => foundCard._id !== action.payload
          ),
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
