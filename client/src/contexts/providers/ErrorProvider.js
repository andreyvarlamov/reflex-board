import React, { useReducer, useEffect, useState } from "react";

import { ErrorContext } from "..";

import ErrorReducer from "../reducers/errorReducer";

import { returnErrors, clearErrors } from "../actions/errorActions";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

function ErrorProvider(props) {
  const [state, dispatch] = useReducer(ErrorReducer, initialState);

  return (
    <ErrorContext.Provider
      value={{
        msg: state.message,
        status: state.status,
        id: state.id,
        returnErrors: (msg, status, id = null) => {
          returnErrors(dispatch, msg, status, id);
        },
        clearErrors: () => {
          clearErrors(dispatch);
        },
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
