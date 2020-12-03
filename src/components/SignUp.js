import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";
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
            src="https://svgshare.com/i/Rq0.svg"
            alt=""
          />
        </Link>
        <h1 className="h1-form">Sign up</h1>
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
          <input
            type="text"
            placeholder="Nickname"
            className="input input--nickname"
            onChange={(e) => this.userTyping("nickname", e)}
          />
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

    // this is the firebase authentication bit
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        (authRes) => {
          // console.log(authRes.user);
          // authRes.user
          //   .sendEmailVerification()
          //   .then((verification) => {
          //     console.log("authRes", authRes);
          //     console.log("verification", verification);
          //     console.log("Email verification link sent to");
          //   })
          //   .catch((err) => console.log(err));
          const userObj = {
            email: authRes.user.email,
            nickname: this.state.nickname,
          };
          // this is the bit where we add the user to our database
          // this is separate to firebase authentication bit
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email.toLowerCase())
            .set(userObj)
            .then(
              () => {
                // this routes us to the dashboard once we've successfully signed up
                this.props.history.push("/dashboard");
              },
              (dbError) => {
                console.log(dbError);
                this.setState({ signupError: "Failed to add user" });
              }
            );
        },
        (authError) => {
          console.log(authError);
          this.setState({ signupError: authError.message });
        }
      );
  };
}

export default SignUp;
