import React, { Component } from "react";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import JoiSchemas from "../joiSchemas";
import Formatting from "../formatting";

function mapStateToProps(state) {
  console.log("mapstatetoprops");
  return { currentUser: state.currentUser };
}

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        name: this.props.currentUser.name,
        emailAddress: this.props.currentUser.emailAddress,
        password: "",
        confirmPassword: "",
      },
      errors: {},
      loading: false,
    };

    //push to login page if not logged in
    if (this.props.currentUser.emailAddress === undefined)
      this.props.history.push("/login");
  }

  handleChange = (e) => {
    console.log();
    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let { account, errors } = this.state;
    console.log("state before submit", account);

    //are we updating the password?
    let schema, object;
    if (account.password === "" && account.confirmPassword === "") {
      schema = JoiSchemas.updateUserSchema();
      object = { name: account.name, emailAddress: account.emailAddress };
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

    //axios call

    this.setState({ loading: false });
  };

  render() {
    console.log("PROPS:", this.props);
    const { account, errors, loading } = this.state;
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <h4>My Account</h4>
        </div>
        <div className="d-flex justify-content-around">
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
            </Form>
          </div>
          <div className="my-account-box border border-primary rounded p-2">
            <h5 className="mb-0">My Job Applications</h5>
            <div className="my-account-description">
              Job applications and their status
            </div>
          </div>
          {/* <div className="border border-primary rounded">Account Details</div> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
