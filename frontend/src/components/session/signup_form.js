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
    //debugger;
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    this.props.signup(user);
  }

  renderErrors() {
    if (this.state.errors.username || this.state.errors.password || this.state.errors.email) { 
      let space = document.getElementsByClassName('signup-form-background');
      debugger
      space[0].style.marginTop = 0;
      return (
        <div className='errors-signup'>
        <ul>
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>{this.state.errors[error]}</li>
          ))}
        </ul>
        </div>
      );
    } else {return}
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
            <p className="session-title">Sign Up</p>
            <p className="tagline">we'll remember when.</p>
            {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>
              <div className="signup-form-background">
                <div className="email-c">
                  <input
                    className="signup-form-field"
                    type="text"
                    value={this.state.email}
                    onChange={this.update("email")}
                    placeholder="Email"
                  />
                </div>
                <div className="username-c">
                  <input
                    className="signup-form-field"
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                </div>
                <div className="password-c">
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
            </form>
          </div>
          <div className="session-nav-div">
            <ul className="splash-navs">
              <li>
                <Link to="/user">Continue as Guest</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
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
        </div>

        <div className="white"></div>
      </div>
    );
  }
}
export default withRouter(SignupForm);
