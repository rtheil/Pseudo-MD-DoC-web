import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { register, verifyRegisterToken } from "../services/userService";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";
import Formatting from "../formatting";
import JoiSchemas from "../joiSchemas";

class RegisterForm extends Component {
  state = {
    createInfo: {
      name: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
    createForm: { formVisible: true, successMessage: "" },
    errors: {},
    loading: false,
  };

  async componentDidMount() {
    //set helpful development values to state
    // const { createInfo } = this.state;
    // createInfo.name = "Test Name";
    // createInfo.emailAddress = "test@test.com";
    // createInfo.password = "r5Y@m6#Bj3XS7ttY";
    // createInfo.confirmPassword = "r5Y@m6#Bj3XS7ttY";
    //this.setState({ createInfo });

    console.log("didMount:", this.props.match);
    const { token } = this.props.match.params;
    if (token !== undefined) {
      const verified = await verifyRegisterToken(token);
      //const verified = true; //fake it
      if (verified) {
        let { createForm } = this.state;
        createForm.formVisible = false;
        createForm.successMessage =
          "Your account has been successfully verified. You may now proceed to the login page.";
        this.setState({ createForm });
      }
    }
  }

  handleCreateSubmit = async (e) => {
    this.setState({ errors: {} });
    let { createInfo, errors } = this.state;
    e.preventDefault();
    console.log("submit create account clicked", this.state.createInfo);
    errors = Formatting.formatJoiValidation(
      JoiSchemas.registerUserSchema(),
      createInfo
    );
    if (errors.confirmPassword !== undefined)
      errors.confirmPassword = "Passwords do not match";
    console.log("Joi errors:", errors);
    this.setState({ errors });

    //IF ERRORS, STOP
    if (errors.count > 0) return;
    this.setState({ loading: true });
    const registerInfo = { ...createInfo };
    delete registerInfo.confirmPassword;
    const newUser = await register(registerInfo);
    console.log("Create user error:", newUser.error);
    if (newUser.error === undefined) {
      console.log("push to login page");
      //this.props.history.push("/login");
      let { createForm } = this.state;
      createForm.formVisible = false;
      createForm.successMessage =
        "Account created successfully. Please check your email to verify your account.";
      this.setState({ createForm });
    } else {
      //SHOW AN ERROR
      if (newUser.error.response === undefined)
        errors.registerError =
          "Could not connect to server. Please try again later.";
      else errors.registerError = newUser.error.response.data.message;
      this.setState({ errors });
    }
    this.setState({ loading: false });
  };

  handleCreateChange = (e) => {
    const createInfo = { ...this.state.createInfo };
    createInfo[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ createInfo });
  };

  render() {
    const { createInfo, errors, loading, createForm } = this.state;
    return (
      <React.Fragment>
        {!createForm.formVisible && (
          <Alert variant="success" className="m-1 mt-3">
            <strong>{createForm.successMessage}</strong>
            {/* <br />
            <Link to="/login">Click here to log in</Link> */}
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
              <SubmitButton text="Submit" loading={loading} />
              {errors.registerError && errors.registerError !== "" && (
                <Alert variant="danger" className="m-1 mt-3">
                  <strong>Could not create an account</strong>
                  <br />
                  {errors.registerError}
                </Alert>
              )}
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default RegisterForm;
