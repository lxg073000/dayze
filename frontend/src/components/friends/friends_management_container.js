import { connect } from "react-redux";
import {
  fetchUsers,
  fetchFriends,
  fetchFriend,
  addFriend,
  deleteFriend,
} from "../../actions/friends_actions";
import FriendsManagement from "./friends_management";

const mapStateToProps = (state) => {
  //debugger;
  return {
    events: Object.values(state.events.user),
    currentUser: state.session.user,
    users: state.users.all,
    friends: state.users.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFriends: () => dispatch(fetchFriends()),
    fetchFriend: () => dispatch(fetchFriend()),
    addFriend: () => dispatch(addFriend()),
    deleteFriend: () => dispatch(deleteFriend()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsManagement);
