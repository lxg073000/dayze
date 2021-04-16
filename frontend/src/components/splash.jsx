import React from "react";
import { Link } from "react-router-dom";

export default function splash() {
  return (
    <div className="single-grid">
      <img
        alt="bg-img"
        className="background-img1"
        src="https://post.healthline.com/wp-content/uploads/2020/08/tired_young_man-1200x628-facebook-1200x628.jpg"
      ></img>
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
        <ul className="splash-navs">
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
      <div className="letterbox"></div>
      <div className="white"></div>
    </div>
  );
}
