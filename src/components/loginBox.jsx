import React, { Component } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Joi from "@hapi/joi";
//import Axios from "axios";
//import config from "react-global-configuration";
import { connect } from "react-redux";
import { login, register } from "../services/userService";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";
//import NavbarCollapse from "react-bootstrap/NavbarCollapse";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (userObj) => {
      dispatch({ type: "SET_USER", payload: userObj });
    },
  };
}

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        emailAddress: "rtheil@codirt.com",
        password: "r5Y@m6#Bj3XS7ttY",
      },
      createInfo: {
        name: "Test Name",
        emailAddress: "test@test.com",
        password: "r5Y@m6#Bj3XS7ttY",
        confirmPassword: "r5Y@m6#Bj3XS7ttY",
      },
      loginButton: { disabled: false, text: "Submit", spinner: false },
      loginError: "",
      errors: {},
    };
    const { match } = this.props;
    //LOG USER OUT
    if (match.path === "/logout") {
      this.handleLogout();
    }
    this.handleLogin();
  }

  componentDidUpdate() {
    this.handleLogin();
  }

  buttonLoading(loading) {
    let { loginButton } = this.state;
    loginButton.disabled = loading;
    loginButton.spinner = loading;
    if (loading) loginButton.text = " Loading...";
    else loginButton.text = "Submit";
    this.setState({ loginButton });
  }

  handleValidate = (schema, item) => {
    //VALIDATE
    const results = schema.validate(item, {
      abortEarly: true,
    });

    //IF ERRORS, LOOP
    const errors = {};
    if (results.error)
      for (let item of results.error.details) {
        /*eslint no-useless-escape: "off"*/
        //let pattern = /\"\w+\" /gm;
        errors[item.path[0]] = item.message;
        //console.log(item.path[0], item.message.replace(pattern, ""));
      }

    return errors;
  };

  handleLogout() {
    const { history, setUser } = this.props;
    setUser({});
    history.push("/");
  }

  handleLogin() {
    const { history, currentUser } = this.props;
    if (currentUser.token !== undefined) history.push("/");
  }

  loginSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8),
    saveInfo: Joi.boolean(),
  });

  handleLoginSubmit = async (e) => {
    e.preventDefault();

    //CHANGE BUTTON
    this.buttonLoading(true);

    //FAKE DELAY
    setTimeout(async () => {
      //CALL USER SERVICE
      const currentUser = await login(this.state.loginInfo);
      //console.log("post-login currentUser:", currentUser);
      if (currentUser.token === undefined) {
        this.setState({ loginError: "Incorrect Email or Password" });
        this.buttonLoading(false);
      }
      //UPDATE REDUX
      else this.props.setUser(currentUser);
    }, 1000);
  };

  forgotSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  handleForgotSubmit = (e) => {
    const { loginInfo } = this.state;
    e.preventDefault();
    console.log("submit forgot password clicked", loginInfo);
  };

  createSchema = Joi.object({
    name: Joi.string().min(5).max(30).required().label("Your Name"),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email Address"),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{8,}$/)
      .message(
        "Password must be at least 8 characters long, and have at least one uppercate letter, one lowercase letter, one number, and one special character."
      )
      .label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });

  handleCreateSubmit = async (e) => {
    const { createInfo } = this.state;
    e.preventDefault();
    console.log("submit create account clicked", this.state.createInfo);
    //const results = this.createSchema.validate(createInfo, { abortEarly: true });
    let errors = this.handleValidate(this.createSchema, createInfo);
    if (errors.confirmPassword !== undefined)
      errors.confirmPassword = "Passwords do not match";
    console.log("Joi errors:", errors);
    this.setState({ errors });

    //IF ERRORS, STOP
    if (Object.keys(errors).length > 0) return;
    this.buttonLoading(true);
    const registerInfo = { ...createInfo };
    delete registerInfo.confirmPassword;
    const newUser = await register(registerInfo);
    console.log("Create user error:", newUser.error);
    if (newUser.error === undefined) this.props.history.push("/login");
  };

  handleLoginChange = (e) => {
    const loginInfo = { ...this.state.loginInfo };
    if (e.currentTarget.type === "checkbox")
      loginInfo[e.currentTarget.id] = e.currentTarget.checked;
    else loginInfo[e.currentTarget.id] = e.currentTarget.value;
    //console.log(e.currentTarget);
    //console.log("new state:", loginInfo);
    this.setState({ loginInfo });
  };

  handleCreateChange = (e) => {
    const createInfo = { ...this.state.createInfo };
    createInfo[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ createInfo });
  };

  handleForgotChange = (e) => {
    //const createInfo = { ...this.state.createInfo };
    //createInfo[e.currentTarget.id] = e.currentTarget.value;
    //this.setState({ createInfo });
  };

  loginForm = () => {
    const { loginInfo, loginError, loginButton } = this.state;
    console.log("loginForm props.currentUser:", this.props.currentUser);
    return (
      <React.Fragment>
        <strong>Log in to your account</strong>
        <Form onSubmit={this.handleLoginSubmit} className="mt-2">
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            onChange={this.handleLoginChange}
            value={loginInfo.emailAddress}
            col="div"
            error={loginError}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            onChange={this.handleLoginChange}
            value={loginInfo.password}
            col="div"
          />
          <Form.Group controlId="saveInfo">
            <Form.Check
              type="checkbox"
              label="Save my login info"
              onChange={this.handleLoginChange}
            />
          </Form.Group>
          <SubmitButton
            text={loginButton.text}
            disabled={loginButton.disabled}
            spinner={loginButton.spinner}
          />
          <Form.Text>
            <Link to="/login/create">Create an account</Link> -{" "}
            <Link to="/login/forgot">Forgot my password</Link>
          </Form.Text>
        </Form>
      </React.Fragment>
    );
  };

  forgotForm = () => {
    const { loginInfo, loginButton } = this.state;
    return (
      <React.Fragment>
        <strong>Forgot Password</strong>
        <Form onSubmit={this.handleForgotSubmit} className="mt-2">
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            onChange={this.handleForgotChange}
            value={loginInfo.emailAddress}
            col="div"
            // error={loginError}
          />
          <SubmitButton
            text={loginButton.text}
            disabled={loginButton.disabled}
            spinner={loginButton.spinner}
          />
        </Form>
      </React.Fragment>
    );
  };

  createForm = () => {
    const { createInfo, errors, loginButton } = this.state;
    return (
      <React.Fragment>
        <strong>Create Account</strong>
        <Form onSubmit={this.handleCreateSubmit} className="mt-2">
          <TextInput
            type="text"
            name="name"
            label="Your Name"
            onChange={this.handleCreateChange}
            value={createInfo.name}
            col="div"
            error={errors.name}
          />
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            onChange={this.handleCreateChange}
            value={createInfo.emailAddress}
            col="div"
            error={errors.emailAddress}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            text="Minimum 8 characters"
            onChange={this.handleCreateChange}
            value={createInfo.password}
            col="div"
            error={errors.password}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            onChange={this.handleCreateChange}
            value={createInfo.confirmPassword}
            col="div"
            error={errors.confirmPassword}
          />
          <SubmitButton
            text={loginButton.text}
            disabled={loginButton.disabled}
            spinner={loginButton.spinner}
          />
        </Form>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login/forgot" component={this.forgotForm} />
          <Route path="/login/create" component={this.createForm} />
          <Route path="/login" component={this.loginForm} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
