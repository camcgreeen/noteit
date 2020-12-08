import { Link, withRouter } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import "./Dashboard.scss";
const firebase = require("firebase");

class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      timestamp: null,
      email: null,
      showSaveNotification: false,
    };
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <div className="notes-screen">
          {this.state.showSaveNotification && (
            // <h5 className="save">Saving...</h5>
            <div class="lds-ring save">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <Link to="/dashboard">
            <svg
              className="app-btn app-btn--back"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="17.5" />
              <path d="M16.2635 23.7318C16.6153 24.0894 17.1857 24.0893 17.5374 23.7318C17.8893 23.374 17.8893 22.7941 17.5372 22.4362L14.0759 18.9164L24.0993 18.9154C24.5968 18.9153 25 18.5053 25 17.9992C24.9999 17.4933 24.5967 17.0834 24.0992 17.0834L14.0754 17.0844L17.5376 13.5638C17.8894 13.2061 17.8894 12.6259 17.5376 12.2683C17.3616 12.0895 17.1312 12 16.9006 12C16.6701 12 16.4396 12.0895 16.2637 12.2682L11.2639 17.3525C11.0949 17.5242 11 17.7571 11 18.0001C11.0001 18.2432 11.095 18.476 11.264 18.6481L16.2635 23.7318Z" />
            </svg>
          </Link>
          <input
            placeholder="Give your note a title"
            className="app-input app-input__title"
            value={this.state.title ? this.state.title : ""}
            onChange={(e) => this.updateTitle(e.target.value)}
          ></input>
          <h4 className="modified">
            Last modified: {this.convertTimestampToDate(this.state.timestamp)}
          </h4>
          <ReactQuill
            className="editor"
            placeholder="Got an idea? Write about it!"
            theme="snow"
            value={this.state.text}
            onChange={this.updateBody}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "code-block",
            ]}
            // modules={{
            //   toolbar: [
            //     { header: [1, 2, false] },
            //     "bold",
            //     "italic",
            //     "underline",
            //     "link",
            //     "code-block",
            //     { list: "ordered" },
            //     { list: "bullet" },
            //   ],
            // }}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                ["link", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["color", "image"],
              ],
            }}
          ></ReactQuill>
          {/* <button class="delete" onClick={this.deleteNote}>
            Delete note
          </button> */}
          <svg
            class="delete"
            onClick={this.deleteNote}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
              d="M13.1722 27.2238C13.1722 27.6689 13.3574 28.0958 13.6871 28.4105C14.0169 28.7253 14.4641 28.9021 14.9304 28.9021H25.4799C25.9462 28.9021 26.3934 28.7253 26.7231 28.4105C27.0529 28.0958 27.2381 27.6689 27.2381 27.2238V15.4755H13.1722V27.2238ZM23.1355 18.2727C23.1355 18.1244 23.1973 17.9821 23.3072 17.8771C23.4171 17.7722 23.5662 17.7133 23.7216 17.7133C23.8771 17.7133 24.0261 17.7722 24.136 17.8771C24.2459 17.9821 24.3077 18.1244 24.3077 18.2727V26.1049C24.3077 26.2533 24.2459 26.3956 24.136 26.5005C24.0261 26.6054 23.8771 26.6643 23.7216 26.6643C23.5662 26.6643 23.4171 26.6054 23.3072 26.5005C23.1973 26.3956 23.1355 26.2533 23.1355 26.1049V18.2727ZM19.619 18.2727C19.619 18.1244 19.6808 17.9821 19.7907 17.8771C19.9006 17.7722 20.0497 17.7133 20.2051 17.7133C20.3606 17.7133 20.5096 17.7722 20.6196 17.8771C20.7295 17.9821 20.7912 18.1244 20.7912 18.2727V26.1049C20.7912 26.2533 20.7295 26.3956 20.6196 26.5005C20.5096 26.6054 20.3606 26.6643 20.2051 26.6643C20.0497 26.6643 19.9006 26.6054 19.7907 26.5005C19.6808 26.3956 19.619 26.2533 19.619 26.1049V18.2727ZM16.1026 18.2727C16.1026 18.1244 16.1643 17.9821 16.2742 17.8771C16.3841 17.7722 16.5332 17.7133 16.6886 17.7133C16.8441 17.7133 16.9932 17.7722 17.1031 17.8771C17.213 17.9821 17.2747 18.1244 17.2747 18.2727V26.1049C17.2747 26.2533 17.213 26.3956 17.1031 26.5005C16.9932 26.6054 16.8441 26.6643 16.6886 26.6643C16.5332 26.6643 16.3841 26.6054 16.2742 26.5005C16.1643 26.3956 16.1026 26.2533 16.1026 26.1049V18.2727ZM27.8242 12.1189H23.4286L23.0842 11.465C23.0113 11.3253 22.899 11.2077 22.7598 11.1255C22.6207 11.0434 22.4603 10.9999 22.2967 11H18.1099C17.9467 10.9994 17.7866 11.0427 17.6479 11.125C17.5093 11.2072 17.3977 11.3251 17.326 11.465L16.9817 12.1189H12.5861C12.4306 12.1189 12.2816 12.1778 12.1717 12.2827C12.0617 12.3877 12 12.53 12 12.6783V13.7972C12 13.9456 12.0617 14.0879 12.1717 14.1928C12.2816 14.2977 12.4306 14.3566 12.5861 14.3566H27.8242C27.9796 14.3566 28.1287 14.2977 28.2386 14.1928C28.3485 14.0879 28.4103 13.9456 28.4103 13.7972V12.6783C28.4103 12.53 28.3485 12.3877 28.2386 12.2827C28.1287 12.1778 27.9796 12.1189 27.8242 12.1189V12.1189Z"
              fill="#2E2E2E"
            />
          </svg>
        </div>
        <Navbar email={this.state.email} />
      </>
    );
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState(
        {
          title: this.props.location.state.title,
          text: this.props.location.state.text,
          timestamp: this.props.location.state.timestamp,
          email: this.props.location.state.email,
          index: this.props.location.state.index,
          backgroundColor: this.props.location.state.backgroundColor,
        }
        // },
        // () => console.log("Note state ", this.state)
      );
    }, 100);
  };

  componentDidUpdate = () => {
    // console.log(this.state);
  };

  deleteNote = async () => {
    if (
      window.confirm(`Are you sure you want to delete ${this.state.title}?`)
    ) {
      if (this.state.email) {
        let notesAfterDeletion;
        await firebase
          .firestore()
          .collection("notes")
          .doc(this.state.email)
          .get()
          .then(async (res) => {
            const data = res.data();
            const notes = data.savedNotes;
            notesAfterDeletion = [...notes];
            notesAfterDeletion.splice(this.state.index, 1);
          });

        // console.log("notesAfterDeletion =", notesAfterDeletion);

        await firebase
          .firestore()
          .collection("notes")
          .doc(this.state.email)
          .set({
            savedNotes: [...notesAfterDeletion],
          });
        this.props.history.push({
          pathname: `/dashboard`,
        });
      }
    }
  };

  updateBody = async (val) => {
    await this.setState({ text: val });
    // console.log("body", this.state.text);
    this.updateNote();
  };
  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    // console.log("title", this.state.title);
    this.updateNote();
  };
  // make this a helper function and import it for Note and Overview
  convertTimestampToDate = (timestamp) => {
    const date = Date(timestamp);
    // return date;
    const dateArray = date.split(" ");
    const dateFormatted = [dateArray[1], dateArray[2], dateArray[3]].join(" ");
    return dateFormatted;
  };

  updateNote = debounce(async () => {
    console.log("updating note on database");
    if (this.state.email) {
      this.setState({ showSaveNotification: true });
      setTimeout(() => this.setState({ showSaveNotification: false }), 1500);
      console.log("updating note from email", this.state.email);
      let editedNotes;
      await firebase
        .firestore()
        .collection("notes")
        .doc(this.state.email)
        .get()
        .then(async (res) => {
          const data = res.data();
          const notes = data.savedNotes;
          editedNotes = [...notes];
          editedNotes[this.state.index].title = this.state.title;
          editedNotes[this.state.index].body = this.state.text;
          editedNotes[this.state.index].timestamp = Date.now();
          editedNotes[
            this.state.index
          ].backgroundColor = this.state.backgroundColor;
        });

      console.log("editedNotes =", editedNotes);

      firebase
        .firestore()
        .collection("notes")
        .doc(this.state.email)
        .set({
          savedNotes: [...editedNotes],
        });
    }
  }, 500);
  //   update = debounce(() => {
  //     this.props.noteUpdate(this.state.id, {
  //       title: this.state.title,
  //       body: this.state.text,
  //     });
  //   }, 1500);
}

export default withRouter(Note);
