import React from "react";
import { Link } from "react-router-dom";

export default function splash() {
  return (
    <div className="splash-page-container">
      <div className="blurry">
        <div className="splashfill"></div>
      </div>
      <div className="splash-contents">
        <div className="logo">
          <p className="logo-text">Dayze</p>
          <p className="tagline">we'll remember when.</p>
        </div>
        <div className="session-nav">
          <ul className="nav-items">
            <li>
              <Link to="./login">Log In</Link>
            </li>
            <li>
              <Link to="./signup">Sign Up</Link>
            </li>
            <li>
              <Link to="./user">Continue As Guest</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
