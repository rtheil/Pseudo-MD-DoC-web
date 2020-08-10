import React, { Component } from "react";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import { Form, Alert } from "react-bootstrap";
import JoiSchemas from "../../joiSchemas";
import Formatting from "../../formatting";
import { update } from "../../services/userService";

class AccountDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        name: this.props.currentUser.name,
        emailAddress: this.props.currentUser.emailAddress,
        password: "",
        confirmPassword: "",
        administrator: this.props.currentUser.administrator,
      },
      updateMessage: {
        visible: false,
        message: "Account info updated successfully",
      },
      errors: {},
      loading: false,
    };
  }
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let { account, errors, updateMessage } = this.state;
    console.log("state before submit", account);

    //are we updating the password?
    let schema, object;
    if (account.password === "" && account.confirmPassword === "") {
      schema = JoiSchemas.updateUserSchema();
      object = {
        name: account.name,
        emailAddress: account.emailAddress,
      };
    } else {
      schema = JoiSchemas.registerUserSchema();
      object = account;
    }

    //verify first
    errors = Formatting.formatJoiValidation(schema, object);
    console.log(errors);
    if (errors.count > 0) return;
    console.log("VALIDATED");

    // change button
    this.setState({ loading: true });

    //map to update object
    let updateObject = {
      name: account.name,
      emailAddress: account.emailAddress,
      password: account.password,
    };

    //call user service to update
    const updatedUser = await update(this.props.currentUser, updateObject);
    console.log("updatedUser");
    if (updatedUser.status === 200) {
      //SUCCESS
      updateMessage.visible = true;
    } else {
      //ERROR
      errors.updateError = updatedUser.error;
    }
    console.log("updateMessage:", updateMessage);
    this.setState({ loading: false, updateMessage, errors });
  };

  render() {
    const { account, errors, loading, updateMessage } = this.state;
    return (
      <div className="my-account-box border border-primary rounded p-2">
        <h5 className="mb-0">Account Details</h5>
        <div className="my-account-description">
          Update your email address or password here
        </div>
        <Form noValidate onSubmit={this.handleSubmit}>
          <TextInput
            type="text"
            name="name"
            label="Your Name"
            onChange={this.handleChange}
            value={account.name}
            col="div"
            error={errors.name}
          />
          <TextInput
            name="emailAddress"
            onChange={this.handleChange}
            label="Email Address"
            value={account.emailAddress}
            error={errors.emailAddress}
            col="div"
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            text="Minimum 8 characters"
            onChange={this.handleChange}
            value={account.password}
            col="div"
            error={errors.password}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            onChange={this.handleChange}
            value={account.confirmPassword}
            col="div"
            error={errors.confirmPassword}
          />
          <SubmitButton text="Submit" loading={loading} />
          {updateMessage.visible && (
            <Alert variant="success" className="m-1 mt-3">
              {updateMessage.message}
            </Alert>
          )}
          {errors.updateError && (
            <Alert variant="danger" className="m-1 mt-3">
              {errors.updateError}
            </Alert>
          )}
        </Form>
      </div>
    );
  }
}

export default AccountDetailsForm;
