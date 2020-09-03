import React, { Component, Fragment } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import LoadingMessage from "./loadingMessage";
import Formatting from "../formatting";
import { Link } from "react-router-dom";
import {
  deleteApplication,
  getApplications,
} from "../services/applicationService";
import ConfirmDialog from "./formElements/confirmDialog";
import logger from "../services/logService";

class MyApplications extends Component {
  constructor(props) {
    super(props);
    logger.log("constructor props:", props);
    this.state = { applications: [], errors: {}, appDelete: {} };
  }

  async componentDidMount() {
    const { currentUser } = this.props;

    //get my applications
    const getApps = await getApplications(currentUser.token, currentUser.id);
    if (getApps.status === 200) {
      this.setState({ applications: getApps.data });
    } else {
      this.setState({ errors: getApps.error });
    }
  }

  handleDelete = async (e) => {
    logger.log("handleDelete e:", e.currentTarget);
    let applications = [...this.state.applications];
    const errors = { ...this.state.applications };
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
      logger.log(applications);
    } else {
      errors.deleteError = deletedApplication.error;
    }
    this.setState({ errors, applications });
  };

  handleVerifyDelete = (e) => {
    //logger.log("handleVerifyDelete e:", e.currentTarget);
    let appDelete = { id: e.currentTarget.id };
    this.setState({ appDelete });
  };

  handleCancelDelete = (e) => {
    this.setState({ appDelete: {} });
  };

  render() {
    const { applications, appDelete } = this.state;
    //logger.log("appDelete.id:" + appDelete.id);
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
          {!applications.length > 0 && <LoadingMessage />}
          {applications.length > 0 &&
            applications.map((app) => {
              const appStatus = Formatting.formatApplicationStatus(
                app.applicationStatus
              );
              return (
                <Fragment key={app.id}>
                  <Row className="border-top border-dark pb-1 pt-1">
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
                        <ConfirmDialog
                          message="Are you sure you want to delete this application?"
                          handleYes={this.handleDelete}
                          handleNo={this.handleCancelDelete}
                          id={app.id}
                        />
                      </Col>
                    </Row>
                  )}
                </Fragment>
              );
            })}
        </Container>
      </div>
    );
  }
}

export default MyApplications;
