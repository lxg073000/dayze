import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_NEW_USER,
  RECEIVE_GOOGLELINK,
  REMOVE_GOOGLELINK,
  RECEIVE_IS_LINKED_GOOGLE_ACCOUNT,
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.isGuestUser) {
        action.currentUser.isFirstGuestSignIn = true;
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
        isSignedIn: true,
        };
      }

    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_NEW_USER:
      let u = action.user;
      u.id = u._id;
      return {
        ...state,
        isSignedIn: true,
        user: {
          username: u.username,
          isLinkedGoogleAccount: u.isLinkedGoogleAccount,
          email: u.email,
          id: u.id,
          _id: u.id,
          googleUrl: u.googleUrl,
        },
      };
    case RECEIVE_GOOGLELINK:
      return {
        ...state,
        user: Object.assign({}, state.user, { googleUrl: action.url }),
      };
    case REMOVE_GOOGLELINK:
      return {
        ...state,
        user: Object.assign({}, state.user, {
          googleUrl: null,
          isLinkedGoogleAccount: false,
        }),
      };
    case RECEIVE_IS_LINKED_GOOGLE_ACCOUNT:
      return {
        ...state,
        user: Object.assign({}, state.user, {
          isLinkedGoogleAccount: action.value,
        }),
      };
    default:
      return state;
  }
};

export default sessionAPIReducer;
