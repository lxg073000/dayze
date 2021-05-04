import React from "react";

export default function notification() {
  let urlParams = new URLSearchParams(window.location.search);
  let [desc, title, date] = urlParams.values();
  
  return (
    <div className="notifcations-shell">
      Notification.
      <h1>{title}</h1>
      <h2>{date}</h2>
      <p>{desc}</p>
    </div>
  )
}
