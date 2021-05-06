import React from "react";

export default function notification() {
  let heading = document.querySelector("Dayze");
  heading.innerText = "Dayze Notification";
  let urlParams = new URLSearchParams(window.location.search);
  let [desc, title, date, duration] = urlParams.values();
  return (
    <div className="notifcations-shell">
      <img
        alt="bg-img"
        className="background-img1 hub-dark main-bg1"
        src="/assets/mainbg.jpg"
      ></img>
      <div className="notification-container">
        <header className="notification-header"></header>
        <div className="notification-time">
          <h1>{duration} Minute Reminder</h1>
        </div>
        <div className="notification-card">
          <h1>{title}</h1>
          <p>{desc}</p>
          <h2>at {new Date(date).toLocaleTimeString()}</h2>
        </div>
      </div>
    </div>
  );
}
