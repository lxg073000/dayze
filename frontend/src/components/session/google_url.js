import React, { Component } from "react";

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

    // this.handleTokens = this.handleTokens.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
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
              href={this.props.currentUser.googleUrl}
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
