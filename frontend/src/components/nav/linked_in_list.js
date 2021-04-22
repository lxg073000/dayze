import React from "react";

export default function linked_in_list() {
  return (
    <div
      onClick={() =>
        document.getElementById("linkedIn").classList.toggle("hide")
      }
      id="linkedIn"
      className="hide linkedIn"
    >
      <ul className="group-links">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/john-c-467b21ba/"
        >
          <li>John Cigale</li>
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/raymond-wu-9a1013164/"
        >
          <li>Ray Wu</li>
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/christopher-mann-b46a0b173/"
        >
          <li>Christopher Mann</li>
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/lernardgrigsby/"
        >
          <li>Lernard Grigsby</li>
        </a>
      </ul>
    </div>
  );
}
