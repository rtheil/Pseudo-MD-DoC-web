import React, { Component } from "react";
import { Row, Container, Col, Button, Alert } from "react-bootstrap";
import LoadingMessage from "./loadingMessage";
import Formatting from "../formatting";
import { Link } from "react-router-dom";
import {
  deleteApplication,
  getApplications,
} from "../services/applicationService";

class MyApplications extends Component {
  constructor(props) {
    super(props);
    console.log("constructor props:", props);
    this.state = { errors: {}, appDelete: {} };
  }

  async componentDidMount() {
    const { currentUser } = this.props;
    //let { errors, applications } = this.state;
    //get my applications
    const getApps = await getApplications(currentUser.token, currentUser.id);
    if (getApps.status === 200) {
      //success
      //applications = getApps.data;
      this.setState({ applications: getApps.data, loading: false });
    } else {
      //error
      //errors.getError = getApps.error;
      this.setState({ errors: getApps.error, loading: false });
    }
  }

  handleDelete = async (e) => {
    console.log("handleDelete e:", e.currentTarget);
    let { applications, errors } = this.state;
    const applicationId = e.currentTarget.id;
    const deletedApplication = await deleteApplication(
      this.props.currentUser.token,
      applicationId
    );
    if (deletedApplication.status === 200) {
      //deleted, now update state
      applications = applications.filter((item) => {
        return parseInt(item.id) !== parseInt(applicationId);
      });
      console.log(applications);
    } else {
      errors.deleteError = deleteApplication.error;
    }
    this.setState({ loading: false, errors, applications });
  };

  handleVerifyDelete = (e) => {
    //console.log("handleVerifyDelete e:", e.currentTarget);
    let appDelete = { id: e.currentTarget.id };
    this.setState({ appDelete });
  };

  handleCancelDelete = (e) => {
    this.setState({ appDelete: {} });
  };

  render() {
    const { applications, appDelete } = this.state;
    //console.log("appDelete.id:" + appDelete.id);
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
                <React.Fragment key={app.id}>
                  <Row className="border-bottom border-dark pb-1 mb-2">
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
                      <Button
                        variant="danger"
                        size="sm"
                        id={app.id}
                        onClick={this.handleVerifyDelete}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                  {parseInt(appDelete.id) === app.id && (
                    <Row>
                      <Col className="text-right">
                        <Alert variant="danger">
                          Are you sure you want to delete this application?
                          &nbsp;&nbsp;&nbsp;
                          <Button
                            variant="success"
                            size="sm"
                            onClick={this.handleDelete}
                            id={app.id}
                            className="pl-4 pr-4"
                          >
                            Yes
                          </Button>{" "}
                          <Button
                            variant="danger"
                            size="sm"
                            className="pl-4 pr-4"
                            onClick={this.handleCancelDelete}
                          >
                            No
                          </Button>
                        </Alert>
                      </Col>
                    </Row>
                  )}
                </React.Fragment>
              );
            })}
        </Container>
      </div>
    );
  }
}

export default MyApplications;
