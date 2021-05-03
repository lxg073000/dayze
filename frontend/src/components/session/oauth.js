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
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    debugger;
  }

  handleConfirm() {
    // this.props.close();
    debugger;
    return this.props.handleSubmit();
  }

  handleDeny() {
    // this.props.close();
    return this.props.handleSubmit();
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
            <p className="sync-confirm-btn" onClick={this.handleConfirm}>
              Sync My Account
            </p>
            <p className="sync-deny-btn" onClick={this.handleDeny}>
              Sync Later
            </p>
          </div>
        </div>
      </div>
    );
  }
}
