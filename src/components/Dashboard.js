import { Link, withRouter } from "react-router-dom";
import React from "react";
import ReactQuill from "react-quill";
import Navbar from "./Navbar";
import Note from "./Note";
import Overview from "./Overview";
import "./Dashboard.scss";
const firebase = require("firebase");

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      // showNote: false,
      email: null,
      nickname: null,
    };
  }

  render() {
    return (
      <>
        <Navbar email={this.state.email} nickname={this.state.nickname} />
        {
          // this.state.showNote ? <Note /> : <Overview />
        }
        <Overview email={this.state.email} />
      </>
    );
  }

  componentDidMount = () => {
    setTimeout(() => {
      console.log("dashboard mounted");
      firebase.auth().onAuthStateChanged(async (_usr) => {
        if (!_usr) {
          this.props.history.push("/login");
        } else {
          console.log(_usr);
          firebase
            .firestore()
            .collection("users")
            .doc(_usr.email)
            .get()
            .then((doc) => {
              const userData = doc.data();
              this.setState({
                email: userData.email,
                nickname: userData.nickname,
              });
            });
        }
      });
    }, 500);
  };
}

export default withRouter(Dashboard);
