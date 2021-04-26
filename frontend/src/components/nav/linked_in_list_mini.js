import React from "react";

export default function linked_in_list_mini() {
  return (
    <div
      onClick={() =>
        document.getElementById("linkedIn-mini").classList.toggle("hide")
      }
      id="linkedIn-mini"
      className="hide linkedIn-mini"
    >
      <div className="credit">Developed By</div>
      <ul className="group-links-mini">
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
