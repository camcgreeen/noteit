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
        {/* <button className="logout" onClick={this.logOut}>
          Log out
        </button> */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logout"
          onClick={this.logOut}
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="#2E2E2E"
          />
          <path
            d="M10 13.3775V26.8767C10 28.7368 11.5174 30.2543 13.3775 30.2543H24.2879C26.1479 30.2543 27.6654 28.7368 27.6654 26.8767V24.6903C27.6654 24.3205 27.3662 24.0213 26.9964 24.0213C26.6266 24.0213 26.3274 24.3205 26.3274 24.6903V26.8767C26.3274 28.0026 25.4083 28.9217 24.2824 28.9217H13.3775C12.2517 28.9217 11.3325 28.0026 11.3325 26.8767V13.3775C11.3325 12.2517 12.2517 11.3325 13.3775 11.3325H24.2879C25.4137 11.3325 26.3329 12.2517 26.3329 13.3775V15.5639C26.3329 15.9338 26.632 16.2329 27.0018 16.2329C27.3717 16.2329 27.6708 15.9338 27.6708 15.5639V13.3775C27.6708 11.5174 26.1534 10 24.2933 10H13.3775C11.5174 10 10 11.512 10 13.3775Z"
            fill="#2E2E2E"
          />
          <path
            d="M30.9612 25.1576C31.0917 25.2882 31.2603 25.3534 31.4344 25.3534C31.6084 25.3534 31.777 25.2882 31.9075 25.1576L36.4707 20.5944C36.7318 20.3334 36.7318 19.9146 36.4707 19.6535L31.9075 15.0903C31.6465 14.8293 31.2277 14.8293 30.9666 15.0903C30.7056 15.3514 30.7056 15.7702 30.9666 16.0313L34.3931 19.4577H21.8892C21.5194 19.4577 21.2202 19.7569 21.2202 20.1267C21.2202 20.4965 21.5194 20.7957 21.8892 20.7957H34.3877L30.9612 24.2222C30.7001 24.4778 30.7001 24.902 30.9612 25.1576Z"
            fill="#2E2E2E"
          />
        </svg>
      </nav>
    );
  }

  logOut = () => {
    // console.log("SIGNING OUT of account", this.state.email);
    firebase.auth().signOut();
  };
}

export default Navbar;
