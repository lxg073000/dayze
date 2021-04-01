import React from "react";
import { withRouter, Link } from "react-router-dom";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
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
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    this.props.signup(user, this.props.history);
  }

  currentPath() {
    console.log(this.props.location.pathname);
    if (this.props.location.pathname.toLowerCase() === "/signup")
      return "Sign Up";
    if (this.props.location.pathname.toLowerCase() === "/login")
      return "Log in";
  }
  swapPath() {
    console.log(this.props.location.pathname);
    if (this.props.location.pathname.toLowerCase() === "/signup")
      return "Log In";
    if (this.props.location.pathname.toLowerCase() === "/login")
      return "Sign Up";
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
      <div>
        <div className="blurry">
          <div className="splashfill"></div>
        </div>
        <div className="page-container">
          <nav className="nav"></nav>
          <div className="form-page-container">
            <div className="splash-banner">
              <p className="signup-title">{`${this.currentPath()}`}</p>
              <p className="tagline">You plan, we remember.</p>
            </div>
            <form className="session-form" onSubmit={this.handleSubmit}>
              <div className="form-div">
                <div className="signup-form">
                  <div className="form-section">
                    <p>Email</p>
                    <input
                      className="form-field"
                      type="text"
                      value={this.state.email}
                      onChange={this.update("email")}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-section">
                    <p>Username</p>
                    <input
                      className="form-field"
                      type="text"
                      value={this.state.username}
                      onChange={this.update("username")}
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-section">
                    <p>Password</p>
                    <input
                      className="form-field"
                      type="password"
                      value={this.state.password}
                      onChange={this.update("password")}
                      placeholder="Password"
                    />
                  </div>
                  <input className="submit" type="submit" value="Submit" />
                  {this.renderErrors()}
                </div>
              </div>
            </form>
            <footer className="nav footer">
              <ul className="nav-items">
                <li>Continue as Guest</li>
                <li>
                  <Link to={`/${this.swapPath().split(" ").join("")}`}>
                    {`${this.swapPath()}`}
                  </Link>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
