import React, { Component } from "react";
import TextInput from "./formElements/textInput";
import SubmitButton from "./formElements/submitButton";
import { Form, Alert, Row, Container, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import JoiSchemas from "../joiSchemas";
import Formatting from "../formatting";
import { getApplications } from "../services/applicationService";
import { Link } from "react-router-dom";
import { update } from "../services/userService";
import LoadingMessage from "./loadingMessage";

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
        administrator: this.props.currentUser.administrator,
      },
      updateMessage: {
        visible: false,
        message: "Account info updated successfully",
      },
      errors: {},
      loading: true,
    };

    //push to login page if not logged in
    if (this.props.currentUser.emailAddress === undefined)
      this.props.history.push("/login");
  }

  async componentDidMount() {
    const { currentUser } = this.props;
    //get my applications
    const applications = await getApplications(
      currentUser.token,
      currentUser.id
    );
    if (applications.error !== undefined) return;
    this.setState({ applications, loading: false });
    console.log(applications);
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
    console.log("updatedUser", updatedUser);
    if (updatedUser.error === undefined) {
      let { updateMessage } = this.state;
      updateMessage.visible = true;
      this.setState({ updateMessage });
    }

    this.setState({ loading: false });
  };

  render() {
    console.log("PROPS:", this.props);
    const {
      account,
      errors,
      loading,
      applications,
      updateMessage,
    } = this.state;
    return (
      <div className="container">
        <div className="d-flex justify-content-center border-bottom border-dark mb-4">
          <h4 className="">My Account</h4>
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
              {updateMessage.visible && (
                <Alert variant="success" className="m-1 mt-3">
                  {updateMessage.message}
                </Alert>
              )}
            </Form>
          </div>
          <div className="my-account-applications border border-primary rounded p-2">
            <h5 className="mb-0">My Job Applications</h5>
            <div className="my-account-description">
              Job applications and their status
            </div>
            <Container>
              <Row className="font-weight-bold mb-2">
                <Col xs="2">App #</Col>
                <Col>Date </Col>
                <Col>Status</Col>
                <Col>Actions</Col>
              </Row>
              {!applications && <LoadingMessage />}
              {applications &&
                applications.map((app) => (
                  <Row
                    className="border-bottom border-dark pb-1 mb-2"
                    key={app.id}
                  >
                    <Col xs="2">{app.id}</Col>
                    <Col>{Formatting.formatDate(app.dateReceived)}</Col>
                    <Col className="bg-warning">N/A</Col>
                    <Col className="d-flex">
                      <Link
                        to={"/applications/" + app.id}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                      &nbsp;
                      <Button variant="danger" size="sm">
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
