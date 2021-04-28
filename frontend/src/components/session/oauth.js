import React, { Component } from "react";

export default class oauth extends Component {
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
    this.handleDeny = this.handleDeny.bind(this);
  }

  componentDidMount() {}

  // handleConfirm() {
  //   this.props.updateTokens(this.props.currentUser.id, this.state.tokens);
  //   this.props.close();
  // }

  handleDeny() {
    document.getElementById("oauth-modal").classList.add("hide");
    // this.props.close();
    // this.props.noSync();
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
          <div>
            <a rel="noreferrer" target="_blank" href="localhost5000/auth">
              <p className="sync-confirm-btn">Sync My Account</p>
            </a>
            <p className="sync-deny-btn" onClick={this.handleDeny}>
              Sync Later
            </p>
          </div>
        </div>
      </div>
    );
  }
}
