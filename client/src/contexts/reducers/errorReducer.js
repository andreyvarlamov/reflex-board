import { GET_ERRORS, CLEAR_ERRORS } from "../actions";

export default (state, action) => {
  // console.log("DEBUG: Error Reducer action type - " + action.type);
  // console.log(action);
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg.msg,
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
