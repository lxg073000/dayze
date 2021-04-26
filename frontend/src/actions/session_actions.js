import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveUserSignIn = (currentUser) => ({
  type: RECEIVE_USER_SIGN_IN,
  currentUser,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const signup = (user) => (dispatch) => {
  //debugger

  return APIUtil.signup(user).then(
    (user) => {
      return dispatch(receiveUserSignIn(user));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );
};

export const login = (user) => (dispatch) => {
  ////debugger;
  return APIUtil.login(user)
    .then((res) => {
      //debugger
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};
export const guestLogin = (
  user = { username: "GuestUser", password: "1234567890asdfghjkl" }
) => (dispatch) => {
  ////debugger;
  return APIUtil.guestUser(user)
    .then((res) => {
      //debugger
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

// export const logout = () => (dispatch) =>
// APIUtil.setAuthToken(false).then(

// )
//   localStorage.removeItem("jwtToken");
//   dispatch(logoutUser());
// ;
