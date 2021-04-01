import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class splash extends Component {
  render() {
    return (
      <div>
        <div className="blurry">
          <div className="splashfill"></div>
        </div>
        <div className="page-container">
          <nav className="nav"></nav>
          <div className="banner">
            <p className="logo-text">Dayze</p>
            <p className="tagline">we'll remember when.</p>
          </div>
          <div className="blurry"></div>
          <footer className="splash-nav">
            <ul className="nav-items">
              <li>
                <Link to="./login">LOG IN</Link>
              </li>
              <li>
                <Link to="./login">SIGN UP</Link>
              </li>
              <li>
                <Link to="./login">CONTINUE AS GUEST</Link>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}
