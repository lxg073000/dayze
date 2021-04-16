import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class grid extends Component {
  render() {
    return (
      <div className="single-grid">
        <div className="white"></div>
        <div className="letterbox"></div>
        <div className="splash-row">
          <div className="blur">
            <div className="grid-bg"></div>
          </div>
          <div className="logo">
            <p className="splash-logo">Dayze</p>
            <p className="tagline">we'll remember when.</p>
          </div>
          <ul className="hub-navs">
            <li>
              <Link to="./login">Log In</Link>
            </li>
            <li>
              <Link to="./signup">Sign Up</Link>
            </li>
            <li>
              <Link to="./user">Continue As Guest</Link>
            </li>
            <span className="contacts">
              <i className="fab fa-github"></i>
              <i className="fab fa-facebook-square"></i>
              <i className="fab fa-linkedin"></i>
            </span>
          </ul>
        </div>
        <div className="letterbox"></div>
        <div className="white"></div>
      </div>
    );
  }
}
