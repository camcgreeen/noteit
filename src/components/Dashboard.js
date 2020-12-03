import { Link, withRouter } from "react-router-dom";
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
        {
          // this.state.showNote ? <Note /> : <Overview />
        }
        <Overview />
      </>
    );
  }
}

export default withRouter(Dashboard);
