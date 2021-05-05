import React from "react";

export default function notification() {
  let urlParams = new URLSearchParams(window.location.search);
  let [desc, title, date] = urlParams.values();

  return (
    <div className="notifcations-shell">
      <img
        className="notification-bg"
        alt="alarm-bg"
        src="https://images.unsplash.com/photo-1501622549218-2c3ef86627cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
      ></img>
      <h1>{title}</h1>
      <h2>{date}</h2>
      <p>{desc}</p>
    </div>
  );
}
