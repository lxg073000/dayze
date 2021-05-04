import React from "react";

export default function notification(props) {
  debugger
  return (
    <div className="notifcations-shell">
      
      Hello Notifications
      <p>Yo</p>
      {
        props.events.map(e=>{
          return <div>
            <p>INside</p>
            <p>{`${e.title}    ${e.description}`}</p>
          </div>
        })
      }

    </div>
  )
}
