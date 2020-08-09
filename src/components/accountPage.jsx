import React, { Component } from "react";
import { connect } from "react-redux";
import JoiSchemas from "../joiSchemas";
import Formatting from "../formatting";
import { getApplications } from "../services/applicationService";
import { update } from "../services/userService";
import AccountDetailsForm from "./forms/accountDetailsForm";
import MyApplications from "./myApplications";
import { Container, Row, Col } from "react-bootstrap";

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
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col className="text-center border-bottom border-dark mb-4">
              <h4>My Account</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={5} className="border-right border-dark">
              <AccountDetailsForm
                account={account}
                errors={errors}
                loading={loading}
                updateMessage={updateMessage}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </Col>
            {/* <Col />
            <Col /> */}
            <Col lg={7}>
              <MyApplications applications={applications} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
