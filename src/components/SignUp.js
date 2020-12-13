import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";
import createDefaultNotes from "../helpers";
const firebase = require("firebase");

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      nickname: null,
      signupError: "",
    };
  }

  render() {
    return (
      <div className="container">
        <Link to="/signup">
          <img
            className="logo-text"
            src="https://svgshare.com/i/S7V.svg"
            alt=""
          />
        </Link>

        <form onSubmit={(e) => this.submitSignup(e)}>
          <input
            autoFocus
            type="text"
            placeholder="Email"
            className="input input--email"
            onChange={(e) => this.userTyping("email", e)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input--password"
            onChange={(e) => this.userTyping("password", e)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="input input--password-confirmation"
            onChange={(e) => this.userTyping("passwordConfirmation", e)}
          />
          <h4 className="error-text">
            {this.state.signupError ? this.state.signupError : null}
          </h4>
          <button type="submit" className="btn btn--sign-up">
            Sign up
          </button>
        </form>
        <h5 className="h5-form">
          Already have an account? <Link to="/login">Log in</Link>
        </h5>
      </div>
    );
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: e.target.value });
        break;
      case "nickname":
        this.setState({ nickname: e.target.value });
        break;
      default:
        break;
    }
  };

  submitSignup = (e) => {
    e.preventDefault();

    if (!this.formIsValid()) {
      this.setState({ signupError: "Passwords do not match!" });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
            nickname: this.state.nickname,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email.toLowerCase())
            .set(userObj)
            .then(
              async () => {
                const defaultNotes = createDefaultNotes();

                await firebase
                  .firestore()
                  .collection("notes")
                  .doc(this.state.email)
                  .set({
                    savedNotes: [...defaultNotes],
                  });
                this.props.history.push("/dashboard");
              },
              (dbError) => {
                this.setState({ signupError: "Failed to add user" });
              }
            );
        },
        (authError) => {
          this.setState({ signupError: authError.message });
        }
      );
  };
}

export default SignUp;
