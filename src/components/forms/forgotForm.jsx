import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../../services/userService";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import Formatting from "../../formatting";
import JoiSchemas from "../../joiSchemas";

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
    errors: {},
    loading: false,
  };

  async componentDidMount() {
    const token = this.props.match.params.token;
    if (token !== undefined) {
      console.log(token);
      const isGood = await verifyResetToken(token);
      if (!isGood) {
        let { errors, forgotForm } = this.state;
        forgotForm.formVisible = false;
        errors.forgotError = "Invalid Password Reset Token";
        this.setState({ errors, forgotForm });
      }
    }
  }

  handleForgotChange = (e) => {
    let { forgotInfo } = this.state;
    forgotInfo[e.currentTarget.id] = e.currentTarget.value;
    //console.log("handleForgotChange", forgotInfo);
    this.setState({ forgotInfo });
  };

  handleForgotSubmit = async (e) => {
    const { forgotInfo, forgotForm, errors } = this.state;
    e.preventDefault();
    console.log("submit forgot password clicked", forgotInfo);
    this.setState({ loading: true });
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
        JoiSchemas.resetPasswordSchema(),
        newPassword
      );
      if (errors.confirmPassword !== undefined)
        errors.confirmPassword = "Passwords do not match";
      console.log(errors);
      if (errors.count > 0) {
        this.setState({ errors, loading: false });
        return;
      }

      //Submit to API
      forgotStatus = await resetPassword({
        token: forgotInfo.token,
        password: forgotInfo.password,
      });
    } else {
      //No token, ask API to send password email
      forgotForm.successMessage = forgotPasswordSuccessMessage;

      //Validate with JOI
      const errors = Formatting.formatJoiValidation(JoiSchemas.emailAddress, {
        emailAddress: forgotInfo.emailAddress,
      });
      console.log(errors);
      if (errors.count > 0) {
        this.setState({ errors, loading: false });
        return;
      }

      //Submit to API
      forgotStatus = await forgotPassword({
        emailAddress: forgotInfo.emailAddress,
      });
    }

    //PROCESS RESPONSE
    if (forgotStatus.status === 200) {
      forgotForm.formVisible = false;
      errors.forgotError = "";
    } else {
      errors.forgotError = forgotStatus.error;
    }

    this.setState({ loading: false, errors, forgotForm });
  };

  render() {
    const { loading, forgotInfo, errors, forgotForm } = this.state;
    const token = this.props.match.params.token;

    if (token !== undefined) {
      console.log("token:", token);
      forgotInfo.token = token;
      return (
        <React.Fragment>
          {!forgotForm.formVisible && forgotForm.successMessage !== "" && (
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
                <SubmitButton text="Submit" loading={loading} />
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
          {!forgotForm.formVisible && forgotForm.successMessage !== "" && (
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
                <SubmitButton text="Submit" loading={loading} />
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
