import { Link } from "react-router-dom";
import React from "react";
import "./Dashboard.scss";

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: "",
    };
  }

  render() {
    const colours = [
      {
        orange: "#ffdbcd",
      },
      {
        beige: "#fff5e8",
      },
      {
        pink: "#ffe4ed",
      },
      {
        purple: "#f4e4fa",
      },
      {
        blue: "#ccf4f5",
      },
      {
        green: "#e5f9ea",
      },
      {
        yellow: "#fffdc8",
      },
    ];
    const colourItems = colours.map((colour, i) => {
      return (
        <li
          className={`new-note__colours__circle new-note__colours__circle--${
            Object.keys(colour)[0]
          } ${this.state.visible}`}
          style={
            this.state.visible === "visible"
              ? {
                  backgroundColor: colour[Object.keys(colour)[i]],
                  transition: `opacity ${(i + 1) / 12}s ease-in-out`,
                  cursor: "pointer",
                }
              : {
                  backgroundColor: colour[Object.keys(colour)[i]],
                  transition: `opacity ${(i + 1) / 12}s ease-in-out`,
                }
          }
          key={i}
          onClick={this.addNote.bind(this, colour[Object.keys(colour)[0]])}
        ></li>
      );
    });
    return (
      <div className="overview-screen">
        <div className="new-note">
          <h1 className="new-note__h1">Notes</h1>
          <svg
            // className="new-note__btn-add"
            className="app-btn app-btn--add"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.toggleColoursVisibility}
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
        </div>
        <ul className="new-note__colours">{colourItems}</ul>
        {
          //   <div className="new-note__colours visible">
          //   <div className="new-note__colours__circle new-note__colours__circle--orange"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--beige"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--pink"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--purple"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--blue"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--green"></div>
          //   <div className="new-note__colours__circle new-note__colours__circle--yellow"></div>
          // </div>
        }
        <ul className="notes">
          {
            // iterate through a notes array where all the raw info is stored and render it like that when doing this properly
          }
          <li className="notes__note notes__note--1">
            <div className="notes__note__container">
              <p className="notes__note__container__title">
                The beginning of screenless design: UI jobs to be taken over by
                Solution Architect
              </p>
              <p className="notes__note__container__date">May 20, 2020</p>
            </div>
          </li>
          <li className="notes__note notes__note--2">
            <div className="notes__note__container">
              <p className="notes__note__container__title">
                The end of screenless design that was quick
              </p>
              <p className="notes__note__container__date">May 20, 2020</p>
            </div>
          </li>
          <li className="notes__note notes__note--3">
            <div className="notes__note__container">
              <p className="notes__note__container__title">
                Joe Biden sprints into the room
              </p>
              <p className="notes__note__container__date">May 20, 2020</p>
            </div>
          </li>
          <li className="notes__note notes__note--4">
            <div className="notes__note__container">
              <p className="notes__note__container__title">
                Reeeeeeally long note name to test the text-overflow. This is a
                real ball-ache in CSS did ya know. Well ya know now. Anyway how
                are you doing these days? Been up to much? How's the wife?
              </p>
              <p className="notes__note__container__date">May 20, 2020</p>
            </div>
          </li>
          <li className="notes__note notes__note--5"></li>
          {/* <li className="notes__note notes__note--6"></li>
          <li className="notes__note notes__note--7"></li>
          <li className="notes__note notes__note--8"></li> */}
        </ul>
      </div>
    );
  }
  toggleColoursVisibility = () => {
    if (this.state.visible === "") {
      this.setState({ visible: "visible" });
    } else {
      this.setState({ visible: "" });
    }
  };
  addNote = (colour) => {
    if (this.state.visible === "visible") {
      // PUT CODE FOR ADDING A NOTE HERE (with background colour)
      console.log(colour);
    }
  };
}

export default Overview;
