import React, { Component } from "react";
import { connect } from "react-redux";
import AccountDetailsForm from "./forms/accountDetailsForm";
import MyApplications from "./myApplications";
import { Container, Row, Col } from "react-bootstrap";

function mapStateToProps(state) {
  console.log("mapstatetoprops");
  return { currentUser: state.currentUser };
}

class AccountPage extends Component {
  componentDidMount() {
    //push to login page if not logged in
    if (this.props.currentUser.emailAddress === undefined)
      return this.props.history.push("/login");
  }
  render() {
    console.log("PROPS:", this.props);
    const { currentUser, history } = this.props;
    return (
      <>
        <Container fluid>
          <Row>
            <Col className="text-center border-bottom border-dark mb-4">
              <h4>My Account</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={5} className="border-right border-dark">
              <AccountDetailsForm currentUser={currentUser} history={history} />
            </Col>
            <Col lg={7}>
              <MyApplications currentUser={currentUser} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
