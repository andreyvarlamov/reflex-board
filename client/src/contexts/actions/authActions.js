import axios from "axios";

import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./";

// Check token and load user
export const loadUser = (state, dispatch) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(state))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      returnErrors(dispatch, err.response.data, err.response.status);
      // dispatch({ type: AUTH_ERROR });
    });
};

// Register
export const register = (
  state,
  dispatch,
  { firstName, lastName, email, password, password2 }
) => {
  // Req Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Req Body
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    password2,
  });

  // Send out request
  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.token);
      loadUser(state, dispatch);
    })
    .catch(err => {
      returnErrors(
        dispatch,
        err.response.data,
        err.response.status,
        "REGISTER_ERROR"
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = (state, dispatch, { email, password }) => {
  // Req Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Req Body
  const body = JSON.stringify({ email, password });

  // Send out request
  axios
    .post("/api/auth", body, config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // TODO Fix this
      console.log("DEBUG: Setting local Storage: token - " + res.data.token);
      localStorage.setItem("token", res.data.token);
      loadUser(state, dispatch);
    })
    .catch(err => {
      dispatch(
        returnErrors(
          dispatch,
          err.response.data,
          err.response.status,
          "LOGIN_ERROR"
        )
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logout = dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/headers and token
export const tokenConfig = state => {
  // Get token from localstorage
  const token = state.token;

  console.log(token);

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  console.log(config);

  return config;
};
