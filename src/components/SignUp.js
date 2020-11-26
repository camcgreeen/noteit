import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Link to="/signup">
          <img src="https://svgshare.com/i/Rns.svg" alt="" />
        </Link>
        <h1>Sign up</h1>
        <form onSubmit={console.log("form submitted")}>
          <input
            type="text"
            placeholder="Email"
            className="input input--email"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input--password"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="input input--password-confirmation"
          />
          <input
            type="text"
            placeholder="Nickname"
            className="input input--nickname"
          />
          <button type="submit" className="btn btn--sign-up">
            Sign up
          </button>
        </form>
        <h5>
          Already have an account? <Link to="/login">Log in</Link>
        </h5>
      </div>
    );
  }
}

export default SignUp;
