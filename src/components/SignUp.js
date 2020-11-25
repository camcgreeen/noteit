import { Link } from "react-router-dom";
import React from "react";
import "./SignUp.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Link to="/signup">
          <img src="https://svgshare.com/i/RnJ.svg" alt="" />
        </Link>
        <h1>Sign up</h1>
        <form onSubmit={console.log("form submitted")}>
          <input type="text" placeholder="Email" class="input input--email" />
          <input
            type="password"
            placeholder="Password"
            class="input input--password"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            class="input input--password-confirmation"
          />
          <input
            type="text"
            placeholder="Nickname"
            class="input input--nickname"
          />
          <button type="submit" class="btn btn--sign-up">
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
