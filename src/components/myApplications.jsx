import React from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import LoadingMessage from "./loadingMessage";
import Formatting from "../formatting";
import { Link } from "react-router-dom";

const MyApplications = ({ applications }) => {
  return (
    <div className="border border-primary rounded p-2">
      <h5 className="mb-0">My Job Applications</h5>
      <div className="my-account-description">
        Job applications and their status
      </div>
      <Container fluid>
        <Row className="font-weight-bold mb-2">
          <Col lg={1}>App#</Col>
          <Col lg={2}>Date </Col>
          <Col>Status</Col>
          <Col lg={3}>Actions</Col>
        </Row>
        {!applications && <LoadingMessage />}
        {applications &&
          applications.map((app) => {
            const appStatus = Formatting.formatApplicationStatus(
              app.applicationStatus
            );
            return (
              <Row className="border-bottom border-dark pb-1 mb-2" key={app.id}>
                <Col lg={1}>{app.id}</Col>
                <Col lg={2}>{Formatting.formatDate(app.dateReceived)}</Col>
                <Col
                  className={
                    "text-center bg-" +
                    appStatus.color +
                    " text-" +
                    appStatus.textColor
                  }
                  style={{ paddingTop: 3 }}
                >
                  {app.applicationStatus.status}
                </Col>
                <Col lg={3} className="d-flex">
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
  );
};

export default MyApplications;
