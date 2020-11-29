import { Link } from "react-router-dom";
import React from "react";
import "./Dashboard.scss";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <nav>
        <div className="profile">
          <div className="profile__picture">
            <p className="profile__picture__initial">C</p>
          </div>
          <button className="profile__logout">Log out</button>
        </div>
        <Link to="/dashboard">
          <img
            className="logo"
            src="https://svgshare.com/i/RpE.svg"
            alt="Note-It logo"
          />
        </Link>
        <a
          href="https://github.com/camcgreen/noteit"
          target="_blank"
          rel="noreferrer"
        >
          <img className="github" src="https://svgshare.com/i/Rpx.svg" alt="" />
        </a>
      </nav>
    );
  }
}

export default Navbar;
