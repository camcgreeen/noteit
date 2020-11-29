import { Link } from "react-router-dom";
import React from "react";
import ReactQuill from "react-quill";
import Navbar from "./Navbar";
import Note from "./Note";
import Overview from "./Overview";
import "./Dashboard.scss";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
    };
  }

  render() {
    return (
      <>
        <Navbar />
        {/* <div className="main-container">
          {this.state.showNote ? <Note /> : <Overview />}
        </div> */}
        {this.state.showNote ? <Note /> : <Overview />}
        {/* <nav>
          <div className="profile-picture"></div>
          <Link to="/dashboard">
            <img src="https://svgshare.com/i/Ro9.svg" alt="Note-It logo" />
          </Link>
          <a
            href="https://github.com/camcgreen/noteit"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://svgshare.com/i/RpP.svg" alt="" />
          </a>
        </nav> */}
      </>
    );
  }
}

export default Dashboard;
