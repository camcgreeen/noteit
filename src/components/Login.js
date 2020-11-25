import { Link } from "react-router-dom";
import React from "react";
import "./Login.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="login">
          <h1>Log in</h1>
          <form onSubmit={console.log("form submitted")}>
            <input type="text" placeholder="Email" class="input input--email" />
            <input
              type="password"
              placeholder="Password"
              class="input input--email"
            />
            <div className="buttons">
              <button type="submit" class="btn btn--demo">
                Log in as a demo user
              </button>
              <button type="submit" class="btn btn--log-in">
                Log in
              </button>
            </div>
          </form>
          <h4>No email or password is required to log in as a demo user</h4>
          <h5>
            Don't have an account? <a>Sign up</a>
          </h5>
        </div>
        <img src="https://svgshare.com/i/Rmr.svg" alt="log in image" />
      </div>
    );
  }
}

export default Login;
