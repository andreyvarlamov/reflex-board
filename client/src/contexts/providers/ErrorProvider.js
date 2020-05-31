import React, { useReducer, useEffect, useState } from "react";

import { ErrorContext } from "..";

import { GET_ERRORS, CLEAR_ERRORS } from "../actions";
import ErrorReducer from "../reducers/ErrorReducer";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

function ErrorProvider(props) {
  const [state, dispatch] = useReducer(ErrorReducer, initialState);

  const returnErrors = (msg, status, id = null) => {
    dispatch({ type: GET_ERRORS, payload: { msg, status, id } });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <ErrorContext.Provider
      value={{
        msg: state.message,
        status: state.status,
        id: state.id,
        returnErrors,
        clearErrors,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
