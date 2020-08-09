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
  render() {
    console.log("PROPS:", this.props);
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
                currentUser={this.props.currentUser}
                history={this.props.history}
              />
            </Col>
            <Col lg={7}>
              <MyApplications currentUser={this.props.currentUser} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(AccountPage);
