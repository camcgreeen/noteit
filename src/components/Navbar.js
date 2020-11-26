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
        <div className="profile-picture">
          <p className="profile-picture profile-picture__initial">C</p>
        </div>
        <Link to="/dashboard">
          <img src="https://svgshare.com/i/RpE.svg" alt="Note-It logo" />
        </Link>
        <a
          href="https://github.com/camcgreen/noteit"
          target="_blank"
          rel="noreferrer"
        >
          <img src="https://svgshare.com/i/Rpx.svg" alt="" />
        </a>
      </nav>
    );
  }
}

export default Navbar;
