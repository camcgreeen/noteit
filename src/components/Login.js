import { Link } from "react-router-dom";
import React from "react";
import "./LogIn.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Link to="/login">
          <img src="https://svgshare.com/i/RnJ.svg" alt="" />
        </Link>
        <h1>Log in</h1>
        <form onSubmit={console.log("form submitted")}>
          <input type="text" placeholder="Email" class="input input--email" />
          <input
            type="password"
            placeholder="Password"
            class="input input--password"
          />
          <button type="submit" class="btn btn--demo">
            Log in as a demo user
          </button>
          <button type="submit" class="btn btn--log-in">
            Log in
          </button>
        </form>
        <h4>No email or password is required to log in as a demo user</h4>
        <h5>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </h5>
      </div>
    );
  }
}

export default Login;
