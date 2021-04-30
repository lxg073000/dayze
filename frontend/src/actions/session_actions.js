import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_OAUTH_TOKENS = "RECEIVE_OAUTH_TOKENS";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_NEW_USER = "RECEIVE_NEW_USER";
export const RECEIVE_GOOGLELINK_BOOL = "RECEIVE_GOOGLELINK_BOOL";

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});
export const receiveOAuthTokens = (tokens) => ({
  type: RECEIVE_OAUTH_TOKENS,
  tokens,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const receiveNewUser = (user) => {
  return {
    type: RECEIVE_NEW_USER,
    user,
  };
};
export const receiveGoogleLinkBool = (link) => {
  return {
    type: RECEIVE_GOOGLELINK_BOOL,
    link,
  };
};

export const signup = (user) => (dispatch) => {
  debugger;

  return APIUtil.signup(user).then(
    (res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(receiveNewUser(decoded));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );
};
export const updateOAuthTokens = (user, tokens) => (dispatch) => {
  //debugger

  return APIUtil.updateOAuthTokens(user, tokens).then(
    (tokens) => {
      return dispatch(receiveOAuthTokens(tokens));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );
};

export const login = (user) => (dispatch) => {
  ////debugger;
  return APIUtil.login(user)
    .then((res) => {
      debugger;
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
  if (localStorage.jwtToken){
    APIUtil.removeAuthAndID();
  }
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export const linkGoogleCal = () => (dispatch) => {
  APIUtil.linkGoogleCal().then((bool) => {
    debugger;
    return dispatch(receiveGoogleLinkBool(bool));
  });
};

// export const logout = () => (dispatch) =>
// APIUtil.setAuthToken(false).then(

// )
//   localStorage.removeItem("jwtToken");
//   dispatch(logoutUser());
// ;
