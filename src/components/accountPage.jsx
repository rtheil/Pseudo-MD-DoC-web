import React from "react";
import { connect } from "react-redux";
import AccountDetailsForm from "./forms/accountDetailsForm";
import MyApplications from "./myApplications";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function AccountPage({ currentUser, history }) {
  useEffect(() => {
    if (currentUser.emailAddress === undefined) return history.push("/login");
  });

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

export default connect(mapStateToProps)(AccountPage);
