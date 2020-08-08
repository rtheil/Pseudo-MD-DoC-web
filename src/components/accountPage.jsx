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
    let { errors, applications } = this.state;
    //get my applications
    const getApps = await getApplications(currentUser.token, currentUser.id);
    if (getApps.status === 200) {
      //success
      applications = getApps.data;
      this.setState({ applications, loading: false });
    } else {
      //error
      errors.getError = getApps.error;
      this.setState({ errors, loading: false });
    }
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
              {errors.updateError && (
                <Alert variant="danger" className="m-1 mt-3">
                  {errors.updateError}
                </Alert>
              )}
            </Form>
          </div>
          <div className="border border-primary rounded p-2">
            <h5 className="mb-0">My Job Applications</h5>
            <div className="my-account-description">
              Job applications and their status
            </div>
            <Container fluid>
              <Row className="font-weight-bold mb-2">
                <Col lg={1}>App #</Col>
                <Col lg={true}>Date </Col>
                <Col lg={5}>Status</Col>
                <Col lg={true}>Actions</Col>
              </Row>
              {!applications && <LoadingMessage />}
              {applications &&
                applications.map((app) => {
                  const appStatus = Formatting.formatApplicationStatus(
                    app.applicationStatus
                  );
                  return (
                    <Row
                      className="border-bottom border-dark pb-1 mb-2"
                      key={app.id}
                    >
                      <Col lg={1}>{app.id}</Col>
                      <Col lg={true}>
                        {Formatting.formatDate(app.dateReceived)}
                      </Col>
                      <Col
                        lg={5}
                        className={
                          "bg-" +
                          appStatus.color +
                          " text-" +
                          appStatus.textColor
                        }
                      >
                        {app.applicationStatus.status}
                      </Col>
                      <Col lg={true} className="d-flex">
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
                  );
                })}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
