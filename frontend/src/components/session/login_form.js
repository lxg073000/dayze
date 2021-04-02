import React from "react";
import { withRouter, Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/tweets");
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
    debugger;

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="session-grid">
        <div className="white"></div>
        <div className="session-letterbox"></div>
        <div className="splash-row">
          <div className="blur">
            <div className="grid-bg"></div>
          </div>
          <div className="logo">
            <p className="session-title">Log In</p>
            <p className="tagline">we'll remember when.</p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-background">
                <div className="username-c">
                  <p className="user-t">Username</p>
                  <input
                    className="login-form-field"
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>
                <div className="password-c">
                  <p className="password-t">Password</p>
                  <input
                    className="login-form-field"
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
            </form>
          </div>
        </div>

        <div className="session-nav-div">
          <ul className="splash-navs">
            <li>
              <Link to="/user">Continue as Guest</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <span className="contacts">
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
                href="https://www.facebook.com/appacademyio"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.linkedin.com/school/app-academy/"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </span>
          </ul>
        </div>
        <div className="session-letterbox"></div>
        <div className="white"></div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
