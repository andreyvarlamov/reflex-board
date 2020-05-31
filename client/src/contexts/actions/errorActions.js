import { GET_ERRORS, CLEAR_ERRORS } from ".";

export const returnErrors = (dispatch, msg, status, id = null) => {
  dispatch({ type: GET_ERRORS, payload: { msg, status, id } });
};

export const clearErrors = dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
