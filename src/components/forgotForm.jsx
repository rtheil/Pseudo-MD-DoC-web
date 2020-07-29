import React, { Component } from "react";
import Joi from "@hapi/joi";
import { Form, Alert } from "react-bootstrap";
import { forgotPassword, resetPassword } from "../services/userService";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";
import Formatting from "../formatting";

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

class ForgotForm extends Component {
  state = {
    forgotInfo: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
      token: "",
    },
    forgotForm: {
      formVisible: true,
      successMessage: "",
    },
    loginButton: { disabled: false, text: "Submit", spinner: false },
    errors: {},
  };

  buttonLoading(loading) {
    let { loginButton } = this.state;
    loginButton.disabled = loading;
    loginButton.spinner = loading;
    if (loading) loginButton.text = " Loading...";
    else loginButton.text = "Submit";
    this.setState({ loginButton });
  }

  forgotSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email Address"),
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
      const newPassword = {
        password: forgotInfo.password,
        confirmPassword: forgotInfo.confirmPassword,
      };
      const errors = Formatting.formatJoiValidation(
        this.resetSchema,
        newPassword
      );
      if (errors.confirmPassword !== undefined)
        errors.confirmPassword = "Passwords do not match";
      console.log(errors);
      this.setState({ errors });
      if (Object.keys(errors).length > 0) {
        this.buttonLoading(false);
        return;
      }

      //Submit to API
      forgotStatus = await resetPassword(forgotInfo);
    } else {
      //No token, ask API to send password email
      forgotForm.successMessage = forgotPasswordSuccessMessage;

      //Validate with JOI
      const errors = Formatting.formatJoiValidation(this.forgotSchema, {
        emailAddress: forgotInfo.emailAddress,
      });
      console.log(errors);
      this.setState({ errors });
      if (Object.keys(errors).length > 0) {
        this.buttonLoading(false);
        return;
      }

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

  render() {
    const { loginButton, forgotInfo, errors, forgotForm } = this.state;
    const token = this.props.match.params.token;
    if (token !== undefined) {
      console.log("token:", token);
      forgotInfo.token = token;
      //this.setState({ forgotInfo });
      return (
        <React.Fragment>
          {!forgotForm.formVisible && (
            <Alert variant="success" className="mt-3">
              {forgotForm.successMessage}
            </Alert>
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
            <Alert variant="danger" className="mt-3">
              {errors.forgotError}
            </Alert>
          )}
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {!forgotForm.formVisible && (
            <Alert variant="success" className="mt-3">
              {forgotForm.successMessage}
            </Alert>
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
                  error={errors.emailAddress}
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
            <Alert variant="danger" className="mt-3">
              {errors.forgotError}
            </Alert>
          )}
        </React.Fragment>
      );
  }
}

export default ForgotForm;
