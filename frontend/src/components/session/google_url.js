/*  
* The Dayze app is able to use google calendar api to sync itself with a user's
calendar.  The use of reading and writing another person's Google calendar 
requires app verification from Google.  Due to time constraints, we are able to 
only sync calendars for authorized test users.

Because of this, in the code below, the link to the Google authentication page 
is replaced with a link to the Dayze github wiki.
*/



import { calendar } from "googleapis/build/src/apis/calendar";
import React, { Component } from "react";
import { useStore } from "react-redux"

export default class googleUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: {
        token1: null,
        token2: null,
        token3: null,
      },
    };
  }


  render() {
    return (
      <div id="oauth-modal" className="oauth-modal-container">
        <div className="oauth-modal">
          <h1>Link Your Google Calendar?</h1>
          <h2>
            Dayze powered by Google allows you to sync all your events in{" "}
            <strong>three easy steps!</strong>
          </h2>
          <ul>
            <li>Follow the link</li>
            <li>Sign Into your Google Account</li>
            <li>Allow Permissions</li>
          </ul>
          <div className="google-URL-grid">
            <a
              className="sync-confirm-btn"
              href = {'https://github.com/lxg073000/dayze/wiki'}
              // href={this.props.currentUser.googleUrl}     //See above * for comments.
              onClick={() =>
                document
                  .getElementsByClassName("oauth-modal-container")[0]
                  .classList.add("hide")
              }
            >
              Continue to Google Authenticate
            </a>
            <i className="fas fa-times" onClick={this.props.closeModal}></i>
          </div>
        </div>
      </div>
    );
  }
}
