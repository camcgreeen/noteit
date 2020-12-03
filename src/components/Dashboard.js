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
      notes: null,
    };
  }

  render() {
    return (
      <>
        <Navbar email={this.state.email} nickname={this.state.nickname} />
        {
          // this.state.showNote ? <Note /> : <Overview />
        }
        <Overview notes={this.state.notes} email={this.state.email} />
      </>
    );
  }

  componentDidMount = () => {
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

        await firebase
          .firestore()
          .collection("notes")
          .doc(_usr.email)
          .onSnapshot(async (res) => {
            const data = res.data();
            const notes = data.savedNotes;
            // const notes = res.docs.map((_doc) => _doc.data());
            // console.log(notes);
            await this.setState(() => ({
              notes,
            }));
            console.log(this.state.notes);
          });
      }
    });
  };
}

export default withRouter(Dashboard);
