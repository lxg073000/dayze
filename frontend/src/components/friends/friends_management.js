import React, { Component } from "react";

export default class friends_management extends Component {
  constructor(props) {
    super(props);
    this.state({
      users: this.props.users,
      friends: this.props.friends,
    });
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchFriends = this.fetchFriends.bind(this);
  }

  fetchUsers() {
    this.props.fetchUsers();
  }
  fetchFriends() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <div className="friends-manager-shell">
        <button className="sample-btn" onClick={this.fetchUsers}>
          Show All Users
        </button>
        <button className="sample-btn" onClick={this.fetchFriends}>
          Show All Friends
        </button>
        <ul>
          {this.state.users.map((user) => (
            <li>{`User: ${user.username}  UserID:${user.id}`}</li>
          ))}
        </ul>
        <ul>
          {this.state.friends.map((friend) => (
            <li>{`Friend: ${friend.friendname}  FriendID:${friend.id}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
