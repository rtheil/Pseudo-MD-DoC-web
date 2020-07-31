import React, { Component } from "react";
//import LoginBox from "./loginBox";
import { Switch, Route } from "react-router-dom";
import ForgotForm from "./forgotForm";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
//import { useHistory } from "react-router-dom";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="border border-secondary rounded d-flex justify-content-center container-fluid m-3 pt-1"
          style={{ width: 400 }}
        >
          <div className="container text-left pb-3">
            <Switch>
              <Route path="/login/forgot/:token" component={ForgotForm} />
              <Route path="/login/forgot" component={ForgotForm} />
              <Route path="/login/register/:token" component={RegisterForm} />
              <Route path="/login/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={LoginForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
