import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionAPIReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      ////debugger;
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
        isSignedIn: true,
      };

    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_USER_SIGN_IN:
      //debugger;
      
      let u = action.currentUser.data;
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
          googleUrl: u.googleUrl
          
        },
      };
    default:
      return state;
  }
};

export default sessionAPIReducer;
