import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Joi from "@hapi/joi";

class LoginBox extends Component {
  state = {
    loginInfo: {
      emailAddress: "rtheil@codirt.com",
      password: "E#dha7ktz8cwypwm",
    },
  };

  loginSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8),
    saveInfo: Joi.boolean(),
  });

  handleLoginSubmit = (e) => {
    //const { loginInfo } = this.state;
    e.preventDefault();
    //CALL API AND SEND USER/PASS
    console.log("submit login clicked", this.state.loginInfo);
  };

  forgotSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  handleForgotSubmit = (e) => {
    //const { loginInfo } = this.state;
    e.preventDefault();
    console.log("submit forgot password clicked", this.state.loginInfo);
  };

  createSchema = Joi.object({
    accountName: Joi.string().min(5).max(30).required(),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{8,}$/)
      .message(
        "Password must be at least 8 characters long, and have at least one uppercate letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: Joi.string().min(8).required(),
  });

  handleCreateSubmit = (e) => {
    const { loginInfo } = this.state;
    e.preventDefault();
    console.log("submit create account clicked", this.state.loginInfo);
    const results = this.createSchema.validate(loginInfo, { abortEarly: true });
    console.log("Joi errors:", results.error.details);
  };

  handleChange = (e) => {
    const loginInfo = { ...this.state.loginInfo };
    loginInfo[e.currentTarget.id] = e.currentTarget.value;
    console.log("new state:", loginInfo);
    this.setState({ loginInfo });
  };

  loginForm = () => {
    const { loginInfo } = this.state;
    return (
      <React.Fragment>
        <strong>Log in to your account</strong>
        <Form onSubmit={this.handleLoginSubmit} className="mt-2">
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={loginInfo.password}
            />
            <Form.Text>
              <Link to="/login/create">Create an account</Link> -{" "}
              <Link to="/login/forgot">Forgot my password</Link>
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Save my login info"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  forgotForm = () => {
    const { loginInfo } = this.state;
    return (
      <React.Fragment>
        <strong>Forgot Password</strong>
        <Form onSubmit={this.handleForgotSubmit} className="mt-2">
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  createForm = () => {
    const { loginInfo } = this.state;
    return (
      <React.Fragment>
        <strong>Create Account</strong>
        <Form onSubmit={this.handleCreateSubmit} className="mt-2">
          <Form.Group controlId="accountName">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              onChange={this.handleChange}
              value={loginInfo.accountName}
            />
          </Form.Group>
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={loginInfo.password}
            />
            <Form.Text>Minimum 8 characters</Form.Text>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={loginInfo.confirmPassword}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="border border-secondary rounded d-flex justify-content-center container-fluid m-3"
          style={{ width: 400 }}
        >
          <div className="container text-left pb-3">
            <Router>
              <Switch>
                <Route path="/login/forgot" component={this.forgotForm} />
                <Route path="/login/create" component={this.createForm} />
                <Route path="/login" component={this.loginForm} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginBox;
