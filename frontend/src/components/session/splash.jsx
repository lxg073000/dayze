import React from "react";
import LinkedInListMini from "../nav/linked_in_list_mini";
import { Link } from "react-router-dom";

export default class splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedIn: true,
    };
    this.toggleLinkedIn = this.toggleLinkedIn.bind(this);
  }

  componentDidMount() {
    // document.getElementById("root").classList.remove("layout-bug");
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/user");
    }

    this.setState({ errors: nextProps.errors });
  }
  toggleLinkedIn() {
    document.getElementById("linkedIn-btn").classList.toggle("activated");
    document.getElementById("linkedIn-mini").classList.toggle("hide");

    this.setState({
      linkedIn: !this.state.linkedIn,
    });
  }
  render() {
    return (
      <div className="splash-shell">
        <img
          alt="bg-img"
          className="splash-bg background-img1"
          src="/assets/bg3.jpg"
        ></img>
        <div className="gradient"></div>
        <div className="splash-main">
          <div className="gradient highlight"></div>
          <div className="tagline"></div>
          <div className="splash-section">
            <h1 className="splash-logo">Dayze</h1>
          </div>
        </div>
        
        <span className="splash-navs-section">
          <ul className="splash-navs">
            <li>
              <Link to="./login">Log In</Link>
            </li>
            <li>
              <Link to="./signup">Sign Up</Link>
            </li>
            <li onClick={this.props.guestRegister}>Continue As Guest</li>
            {/* <li>
              <i
                id="linkedIn-btn"
                onClick={this.toggleLinkedIn}
                className="fab fa-linkedin"
              ></i>
            </li> */}
          </ul>
          <LinkedInListMini className="hide" />
        </span>
        <div className='splash-description'>
              <h3>A better way to handle your Dayze</h3>
              <h3>Stay connected to all the important things in life by using Dayze to recieve daily event reminders</h3>
        </div>
      </div>
    );
  }
}
