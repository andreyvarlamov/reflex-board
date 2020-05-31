import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "..";

import { loadUser, register, login, logout } from "../actions/authActions";

import AuthReducer from "../reducers/authReducer";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const [once, setOnce] = useState(true);
  useEffect(() => {
    if (once) {
      loadUser(state, dispatch);
      setOnce(false);
    }
  }, [once, state]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        loadUser: () => {
          loadUser(state, dispatch);
        },
        register: data => {
          register(state, dispatch, data);
        },
        login: data => {
          login(state, dispatch, data);
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
