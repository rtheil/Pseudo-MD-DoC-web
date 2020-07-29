import React, { Component } from "react";
import { connect } from "react-redux";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { login } from "../services/userService";
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        emailAddress: "rtheil@codirt.co",
        password: "r5Y@m6#Bj3XS7ttY",
      },
      loginButton: { disabled: false, text: "Submit", spinner: false },
      validated: false,
      errors: {},
    };
    const { match } = this.props;
    console.log("match:", match);
    //LOG USER OUT
    if (match.path === "/logout") {
      this.handleLogout();
    }
    this.handleLogin();
  }

  componentDidUpdate() {
    this.handleLogin();
  }

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
    let { validated } = this.state;
    e.preventDefault();

    //CHANGE BUTTON
    this.buttonLoading(true);

    //FAKE DELAY
    setTimeout(async () => {
      //CALL USER SERVICE
      const currentUser = await login(this.state.loginInfo);
      //console.log("post-login currentUser:", currentUser);
      if (currentUser.token === undefined) {
        let errors = { loginError: "Incorrect Email or Password" };
        this.setState({ errors });
        this.buttonLoading(false);
      }
      //UPDATE REDUX
      else this.props.setUser(currentUser);
    }, 0);
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

  buttonLoading(loading) {
    let { loginButton } = this.state;
    loginButton.disabled = loading;
    loginButton.spinner = loading;
    if (loading) loginButton.text = " Loading...";
    else loginButton.text = "Submit";
    this.setState({ loginButton });
  }

  render() {
    const { loginInfo, errors, loginButton, validated } = this.state;
    console.log("loginForm props.currentUser:", this.props.currentUser);
    return (
      <React.Fragment>
        <strong>Log in to your account</strong>
        <Form
          noValidate
          validated={validated}
          onSubmit={this.handleLoginSubmit}
          className="mt-2"
        >
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            onChange={this.handleLoginChange}
            value={loginInfo.emailAddress}
            col="div"
            error={errors.loginError}
            required={true}
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
            <Link to="/login/register">Create an account</Link> -{" "}
            <Link to="/login/forgot">Forgot my password</Link>
          </Form.Text>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
