import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";
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
            src="https://svgshare.com/i/Rq0.svg"
            alt=""
          />
        </Link>
        <h1 className="h1-form">Log in</h1>
        <form onSubmit={(e) => this.submitLogin(e)}>
          <input
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
          <button
            type="submit"
            className="btn btn--demo"
            onClick={this.createAndLoginDemoUser}
          >
            Log in as a demo user
          </button>
          <button type="submit" className="btn btn--log-in">
            Log in
          </button>
        </form>
        <h4 className="h4-form">
          No email or password is required to log in as a demo user
        </h4>
        <h5 className="h5-form">
          Don't have an account? <Link to="/signup">Sign up</Link>
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

  createAndLoginDemoUser = async () => {};

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
          console.log(err);
        }
      );
  };
}

export default Login;
