import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, Switch, Route, useParams } from "react-router-dom";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../services/userService";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";

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

//STAIC VALUES
const passwordRegex = /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{8,}$/;
const passwordError =
  "Password must be at least 8 characters long, and have at least one uppercate letter, one lowercase letter, one number, and one special character.";
const forgotPasswordSuccessMessage = (
  <React.Fragment>
    <strong>Thank you</strong>
    <br />
    <br /> If the email address you entered is registered to an account, you
    will receive an email with instructions on how to reset your password.
  </React.Fragment>
);
const resetPasswordSuccessMessage = (
  <React.Fragment>
    <strong>Thank you</strong>
    <br />
    <br /> Your password has been reset successfully. Please proceed log in.
  </React.Fragment>
);

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
      forgotInfo: {
        emailAddress: "",
        password: "",
        confirmPassword: "",
        token: "",
      },
      createForm: { formVisible: true, successMessage: "" },
      forgotForm: {
        formVisible: true,
        successMessage: "",
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
    }, 0);
  };

  createSchema = Joi.object({
    name: Joi.string().min(5).max(30).required().label("Your Name"),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email Address"),
    password: Joi.string()
      .min(8)
      .regex(passwordRegex)
      .message(passwordError)
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
    if (newUser.error === undefined) {
      console.log("push to login page");
      //this.props.history.push("/login");
      let { createForm } = this.state;
      createForm.formVisible = false;
      createForm.message = "Account created successfully";
      this.setState({ createForm });
    } else {
      //SHOW AN ERROR
      let errors = { registerError: newUser.error.response.data.message };
      this.setState({ errors });
    }
    this.buttonLoading(false);
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

  forgotSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  resetSchema = Joi.object({
    password: Joi.string()
      .min(8)
      .regex(passwordRegex)
      .message(passwordError)
      .label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });

  handleForgotChange = (e) => {
    //let { forgotInfo } = this.state;
    let { forgotInfo } = this.state;
    forgotInfo[e.currentTarget.id] = e.currentTarget.value;
    console.log("handleForgotChange", forgotInfo);
    this.setState({ forgotInfo });
  };

  handleForgotSubmit = async (e) => {
    const { forgotInfo, forgotForm, errors } = this.state;
    e.preventDefault();
    console.log("submit forgot password clicked", forgotInfo);
    this.buttonLoading(true);
    let forgotStatus;
    if (forgotInfo.token !== "") {
      //TOKEN EXISTS, ASK API TO UPDATE PASSWORD
      forgotForm.successMessage = resetPasswordSuccessMessage;

      //Validate with JOI

      //Submit to API
      forgotStatus = await resetPassword(forgotInfo);
    } else {
      //No token, ask API to send password email
      forgotForm.successMessage = forgotPasswordSuccessMessage;

      //Validate with JOI

      //Submit to API
      forgotStatus = await forgotPassword(forgotInfo);
    }

    //PROCESS RESPONSE
    console.log("post-response:", forgotStatus);
    console.log(forgotStatus.error);
    if (forgotStatus.error === undefined) {
      console.log("NO ERROR");
      forgotForm.formVisible = false;
      this.setState({ forgotForm });
    } else {
      //SHOW AN ERROR
      console.log("ERROR:", forgotStatus.error);
      console.log(forgotStatus.error.response);
      if (forgotStatus.error.response === undefined)
        errors.forgotError =
          "Could not connect to server. Please try again later.";
      else errors.forgotError = forgotStatus.error.response.data.message;
      this.setState({ errors });
    }
    this.buttonLoading(false);
  };

  ErrorMessage = ({ title, error }) => {
    return (
      <Alert variant="danger" className="pt-0 pb-0 pr-0 pl-1 mt-4">
        <strong>{title}</strong>
        <br />
        {error}
      </Alert>
    );
  };

  SuccessMessage = ({ title, message, loginLink }) => {
    return (
      <Alert variant="success" className="m-1 mt-3">
        <strong>{title}</strong>
        <br />
        {message}
        {loginLink && <Link to="/login">Click here to log in</Link>}
      </Alert>
    );
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
    const { loginButton, forgotInfo, errors, forgotForm } = this.state;
    let { token } = useParams();
    if (token !== undefined) {
      console.log("token:", token);
      forgotInfo.token = token;
      //this.setState({ forgotInfo });
      return (
        <React.Fragment>
          {!forgotForm.formVisible && (
            <this.SuccessMessage
              title={forgotForm.successMessage}
              loginLink={true}
            />
          )}
          {forgotForm.formVisible && (
            <React.Fragment>
              <strong>Reset Password</strong>
              <Form onSubmit={this.handleForgotSubmit} className="mt-2">
                <TextInput
                  type="password"
                  name="password"
                  label="New Password"
                  text="Minimum 8 characters"
                  onChange={this.handleForgotChange}
                  value={forgotInfo.password}
                  col="div"
                  error={errors.password}
                />
                <TextInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={this.handleForgotChange}
                  value={forgotInfo.confirmPassword}
                  col="div"
                  error={errors.confirmPassword}
                />
                <Form.Control
                  type="hidden"
                  name="token"
                  onChange={this.handleForgotChange}
                  value={forgotInfo.token}
                />
                <SubmitButton
                  text={loginButton.text}
                  disabled={loginButton.disabled}
                  spinner={loginButton.spinner}
                />
              </Form>
            </React.Fragment>
          )}
          {errors.forgotError && errors.forgotError !== "" && (
            <this.ErrorMessage
              title="An error occurred"
              error={errors.forgotError}
            />
          )}
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {!forgotForm.formVisible && (
            <this.SuccessMessage
              title={forgotForm.successMessage}
              loginLink={false}
            />
          )}
          {forgotForm.formVisible && (
            <React.Fragment>
              <strong>Forgot Password</strong>
              <Form onSubmit={this.handleForgotSubmit} className="mt-2">
                <TextInput
                  type="email"
                  name="emailAddress"
                  label="Email Address"
                  onChange={this.handleForgotChange}
                  value={forgotInfo.emailAddress}
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
          )}
          {errors.forgotError && errors.forgotError !== "" && (
            <this.ErrorMessage
              title="An error occurred"
              error={errors.forgotError}
            />
          )}
        </React.Fragment>
      );
  };

  createForm = () => {
    const { createInfo, errors, loginButton, createForm } = this.state;
    return (
      <React.Fragment>
        {!createForm.formVisible && (
          <Alert variant="success" className="m-1 mt-3">
            <strong>{createForm.message}</strong>
            <br />
            <Link to="/login">Click here to log in</Link>
          </Alert>
        )}
        {createForm.formVisible && (
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
              {errors.registerError && errors.registerError !== "" && (
                <this.ErrorMessage
                  title="Could not create an account"
                  error={errors.registerError}
                />
              )}
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <Switch>
        <Route path="/login/forgot/:token">
          <this.forgotForm />
        </Route>
        <Route path="/login/forgot" component={this.forgotForm} />
        <Route path="/login/create" component={this.createForm} />
        <Route path="/login" component={this.loginForm} />
      </Switch>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
