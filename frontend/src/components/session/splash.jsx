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
    // debugger;
    document.getElementById("linkedIn-btn").classList.toggle("activated");
    document.getElementById("linkedIn-mini").classList.toggle("hide");

    this.setState({
      linkedIn: !this.state.linkedIn,
    });
    console.log(this.state.linkedIn);
  }
  render() {
    return (
      <div className="splash-shell">
        <img
          alt="bg-img"
          className="background-img1"
          src="https://post.healthline.com/wp-content/uploads/2020/08/tired_young_man-1200x628-facebook-1200x628.jpg"
        ></img>
        <div className="gradient"></div>
        <div className="splash-main">
          <div className="gradient highlight"></div>
          <div className="tagline"></div>
          <div className="splash-section">
            <h1 className="splash-logo">Dayze</h1>
          </div>
        </div>
        <span>
          <ul className="splash-navs">
            <li>
              <Link to="./login">Log In</Link>
            </li>
            <li>
              <Link to="./signup">Sign Up</Link>
            </li>
            <li onClick={this.props.guestLogin}>Continue As Guest</li>
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
      </div>
    );
  }
}
