import React from "react";
import { Switch, Route } from "react-router-dom";
import ForgotForm from "../forms/forgotForm";
import LoginForm from "../forms/loginForm";
import RegisterForm from "../forms/registerForm";

export default function LoginPage() {
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
