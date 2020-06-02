import axios from "axios";

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
export const loadUser = (dispatch, returnErrors) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig())
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      console.log("ERR: in loadUser: " + err);
      returnErrors(err.response.data, err.response.status);
      dispatch({ type: AUTH_ERROR });
    });
};

// Register
export const register = (
  dispatch,
  returnErrors,
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
      loadUser(dispatch, returnErrors);
    })
    .catch(err => {
      console.log("ERR: in register: " + err);
      returnErrors(err.response.data, err.response.status, "REGISTER_ERROR");
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = (dispatch, returnErrors, { email, password }) => {
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

      loadUser(dispatch, returnErrors);
    })
    .catch(err => {
      console.log("ERR: in loadUser: " + err);
      returnErrors(err.response.data, err.response.status, "LOGIN_ERROR");
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logout = dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/headers and token
export const tokenConfig = () => {
  // Get token from localstorage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
