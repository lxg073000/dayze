import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_OAUTH_TOKENS = "RECEIVE_OAUTH_TOKENS";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_NEW_USER = "RECEIVE_NEW_USER";
export const RECEIVE_GOOGLELINK = "RECEIVE_GOOGLELINK";
export const REMOVE_GOOGLELINK = "REMOVE_GOOGLELINK";
export const RECEIVE_IS_LINKED_GOOGLE_ACCOUNT =
  "RECEIVE_IS_LINKED_GOOGLE_ACCOUNT";

export const receiveCurrentUser = (currentUser, isGuestUser = false) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
  isGuestUser
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
export const receiveGoogleLinkBool = (url) => {
  return {
    type: RECEIVE_GOOGLELINK,
    url: url,
  };
};
export const removeGoogleLink = () => {
  return {
    type: REMOVE_GOOGLELINK,
  };
};

export const receiveIsLinkedGoogleAccount = (bool) => {
  return {
    type: RECEIVE_IS_LINKED_GOOGLE_ACCOUNT,
    value: bool,
  };
};

export const signup = (user) => (dispatch) => {
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

  return APIUtil.updateOAuthTokens(user, tokens).then(
    (tokens) => {
      return dispatch(receiveOAuthTokens(tokens));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );
};

export const login = (user) => (dispatch) => {
  return APIUtil.login(user)
    .then((res) => {
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
export const guestRegister = ()=>{
  return (dispatch) => {
    let user = { password: "1234567890asdfghjkl" };
    let name = "GuestUser" + Math.round(Math.random()*1000000).toString();
    user.username =  name;
    user.email = name + '@gmail.com';
    return APIUtil.guestUser(user)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded, true)); //second arg to show it is guest user
      })
      .catch((err) => {
        dispatch(receiveErrors(err.response.data));
      });
  }
};

export const logout = () => (dispatch) => {
  if (localStorage.jwtToken) {
    APIUtil.removeAuthAndID();
  }
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export const linkGoogleCal = () => (dispatch) => {
  APIUtil.linkGoogleCal().then((res) => {
    return dispatch(receiveGoogleLinkBool(res.data));
  });
};
