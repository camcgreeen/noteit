import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Note from "./components/Note";

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={LogIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/note" component={Note}></Route>
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>{routing}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
