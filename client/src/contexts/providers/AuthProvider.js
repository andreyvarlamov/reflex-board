import React, { useReducer, useEffect, useState, useContext } from "react";

import { AuthContext, ErrorContext } from "..";

import { loadUser, register, login, logout } from "../actions/authActions";

import AuthReducer from "../reducers/authReducer";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { returnErrors } = useContext(ErrorContext);

  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (once) {
      loadUser(dispatch, returnErrors);
      setOnce(false);
    }
    // eslint-disable-next-line
  }, [once]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        loadUser: () => {
          loadUser(dispatch, returnErrors);
        },
        register: data => {
          register(dispatch, returnErrors, data);
        },
        login: data => {
          login(dispatch, returnErrors, data);
        },
        logout: () => {
          logout(dispatch);
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
