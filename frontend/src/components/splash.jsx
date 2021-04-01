import React from "react";
import { Link } from "react-router-dom";

export default function splash() {
  return (
    <div>
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
                <Link to="./login">Log In</Link>
              </li>
              <li>
                <Link to="./login">Sign Up</Link>
              </li>
              <li>
                <Link to="./login">Continue As Guest</Link>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  );
}
