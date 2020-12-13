import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";
import { generateRandomString, createDefaultNotes } from "../helpers";
const firebase = require("firebase");

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
    };
  }

  render() {
    return (
      <div className="container">
        <Link to="/login">
          <img
            className="logo-text"
            src="https://svgshare.com/i/S7V.svg"
            alt=""
          />
        </Link>
        <button
          type="submit"
          className="btn btn--demo"
          onClick={this.createAndLoginDemoUser}
        >
          Log in as a demo user
        </button>
        <h4 className="h4-form">
          No email or password is required to log in as a demo user
        </h4>
        <span class="separator-row">
          <span class="separator-row__horizontal-line"></span>
          <span class="separator-row__label">or</span>
          <span class="separator-row__horizontal-line"></span>
        </span>
        <form onSubmit={(e) => this.submitLogin(e)}>
          <input
            // autoFocus
            type="text"
            placeholder="Email"
            className="input input--email"
            onChange={(e) => this.userTyping("email", e)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input--password-confirmation"
            onChange={(e) => this.userTyping("password", e)}
          />
          <h4 className="error-text">
            {this.state.loginError ? this.state.loginError : null}
          </h4>
          <button type="submit" className="btn btn--log-in">
            Log in
          </button>
        </form>
        <h5 className="h5-form">
          Don't have an account?{" "}
          <Link to="/signup" className="h5-form__link">
            Sign up
          </Link>
        </h5>
      </div>
    );
  }
  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  createAndLoginDemoUser = async () => {
    const demoUser = generateRandomString(10);
    const demoEmail = `${demoUser}@gmail.com`;
    const demoPassword = "thisisademo";
    const demoNickname = "Demo";
    await this.setState({
      email: demoEmail,
      password: demoPassword,
      nickname: demoNickname,
    });
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
            .doc(this.state.email)
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
                this.setState({ loginError: "Failed to add user" });
              }
            );
        },
        (authError) => {
          this.setState({ loginError: authError.message });
        }
      );
  };

  submitLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (err) => {
          this.setState({ loginError: err.message });
        }
      );
  };
}

export default Login;
