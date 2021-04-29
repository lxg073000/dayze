import React from "react";
import { withRouter, Link } from "react-router-dom";
import LinkedInListMini from "../nav/linked_in_list_mini";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
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
    ////debugger;

    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    // isLinkedGoogleAccount:                           true//this.state.isLinkedGoogleAccount///////////////////

    this.props.signup(user);
  }

  

  renderErrors() {
    if (
      this.state.errors.username ||
      this.state.errors.password ||
      this.state.errors.email
    ) {
      let space = document.getElementsByClassName("signup-form-background");
      //debugger
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
          src="https://images.unsplash.com/photo-1531588972149-aa60049701fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        ></img>
        <div className="white"></div>

        <div className="session-row">
          <div className="logo">
            <h1 className="session-title">
              Sign Up
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
              <div className="signup-form-background">
                <div className="ssec email-c">
                  <input
                    className="signup-form-field"
                    type="text"
                    value={this.state.email}
                    onChange={this.update("email")}
                    placeholder="Email"
                  />
                </div>
                <div className="ssec username-c">
                  <input
                    className="signup-form-field"
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>
                <div className="ssec password-c">
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
                    Sign Up
                  </button>
                </div>
              </div>
              {this.renderErrors()}
            </form>
          </div>

          <div className="session-nav-div">
            <ul className="splash-navs">
              <li onClick={this.props.guestLogin}>Continue as Guest</li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              {/* <span className="contacts">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/lxg073000/dayze/wiki"
                >
                  <i className="fab fa-github"></i>
                </a>

                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/school/app-academy/"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </span> */}
            </ul>
            <LinkedInListMini className="hide" />
          </div>
        </div>

        <div className="white"></div>
      </div>
    );
  }
}
export default withRouter(SignupForm);
