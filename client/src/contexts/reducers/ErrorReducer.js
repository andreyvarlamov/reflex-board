import { GET_ERRORS, CLEAR_ERRORS } from "../actions";

export default (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      throw new Error(`Error Reducer: Invalid Action Type (${action.type})`);
  }
};
