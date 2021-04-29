import React from "react";

export default function authorized() {
  return (
    <div className="authorized">
      your google calendar is now linked!
      <button onClick={() => window.close()}>Back to Dayzed</button>
    </div>
  );
}
