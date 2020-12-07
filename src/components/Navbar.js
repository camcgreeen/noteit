import { Link } from "react-router-dom";
import React from "react";
import "./Dashboard.scss";
const firebase = require("firebase");

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <nav>
        {/* <div className="profile">
          <div className="profile__picture">
            <p className="profile__picture__initial">
              {this.props.nickname !== null
                ? this.props.nickname.split("")[0].toUpperCase()
                : "D"}
            </p>
          </div> */}
        {/* <button className="profile__logout" onClick={this.logOut}>
          Log out
        </button> */}
        {/* </div> */}
        {/* <Link to="/dashboard">
          <img
            className="logo"
            src="https://svgshare.com/i/RpE.svg"
            alt="Note-It logo"
          />
        </Link> */}
        <a
          href="https://github.com/camcgreen/noteit"
          target="_blank"
          rel="noreferrer"
        >
          <img className="github" src="https://svgshare.com/i/S4c.svg" alt="" />
        </a>
        <h5 className="cam">
          Built by{" "}
          <a
            href="mailto:c.c.green@outlook.com"
            target="_blank"
            rel="noreferrer"
            className="cam__link"
          >
            Cam Green
          </a>
        </h5>
        <button className="logout" onClick={this.logOut}>
          Log out
        </button>
      </nav>
    );
  }

  logOut = () => {
    // console.log("SIGNING OUT of account", this.state.email);
    firebase.auth().signOut();
  };
}

export default Navbar;
