import { Link } from "react-router-dom";
import React from "react";

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="new-note">
          <h1 className="new-note__h1">Notes</h1>
          <svg
            className="new-note__btn-add"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="17.5" fill="white" stroke="#2E2E2E" />
            <line
              x1="18"
              y1="12"
              x2="18"
              y2="24"
              stroke="#2E2E2E"
              stroke-width="2"
            />
            <line
              x1="24"
              y1="18"
              x2="12"
              y2="18"
              stroke="#2E2E2E"
              stroke-width="2"
            />
          </svg>
          <div className="new-note__colours">
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--orange"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--beige"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--pink"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--purple"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--blue"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--green"></div>
            <div className="new-note__colours new-note__colours__circle new-note__colours__circle--yellow"></div>
          </div>
        </div>
        <ul className="notes">
          {
            // iterate through a notes array where all the raw info is stored and render it like that when doing this properly
          }
          <li className="notes notes__note notes__note--1">
            <div className="notes__note__container">
              <p className="notes__note__container__title">
                The beginning of screenless design: UI jobs to be taken over by
                Solution Architect
              </p>
              <p className="notes__note__container__date">May 20, 2020</p>
            </div>
          </li>
          <li className="notes__note notes__note--2"></li>
          <li className="notes__note notes__note--3"></li>
          <li className="notes__note notes__note--4"></li>
          <li className="notes__note notes__note--5"></li>
          <li className="notes__note notes__note--6"></li>
          <li className="notes__note notes__note--7"></li>
          <li className="notes__note notes__note--8"></li>
        </ul>
      </>
    );
  }
}

export default Overview;
