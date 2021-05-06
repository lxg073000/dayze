import React from "react";
import { withRouter, Link } from "react-router-dom";
import LinkedInListMini from "../nav/linked_in_list_mini";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/user");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(user);
  }

  renderErrors() {
    if (
      this.state.errors.username ||
      this.state.errors.password ||
      this.state.errors.email
    ) {
      let space = document.getElementsByClassName("login-form-background");
      space[0].style.marginTop = 0;
      return (
        <div className="errors-signup">
          <ul>
            {Object.keys(this.state.errors).map((error, i) => (
              <li key={`error-${i}`}>{this.state.errors[error]}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="session-grid">
        <img
          alt="bg-img"
          className="background-img1 dark"
          src="assets/login.jpg"
        ></img>

        <div className="session-row">
          <div className="logo">
            <h1 className="session-title">
              Log In
              <p className="form-tagline">
                Clear your mind, even when your schedule isn't.
              </p>
            </h1>
          </div>

          <div className="signup-form-shell">
            <form
              className="signup-form-container"
              onSubmit={this.handleSubmit}
            >
              <div className="login-form-background">
                <div className="lsec username-c">
                  <input
                    className="signup-form-field"
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>
                <div className="lsec password-c">
                  <input
                    className="signup-form-field"
                    type="password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    placeholder="Password"
                  />
                </div>
                <div className="submit-c">
                  <button type="submit" className="session-form-btn">
                    Log In
                  </button>
                </div>
              </div>
              {this.renderErrors()}
            </form>
          </div>

          <div className="session-nav-div">
            <ul className="splash-navs">
              <li onClick={this.props.guestRegister}>Continue as Guest</li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
            <LinkedInListMini className="hide" />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(LoginForm);
