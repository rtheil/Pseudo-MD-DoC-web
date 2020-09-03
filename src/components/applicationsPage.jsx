import React, { Component, Fragment } from "react";
//import axios from "axios";
import ApplicationPage from "./applicationPage";
import { Link } from "react-router-dom";
//import config from "react-global-configuration";
import { connect } from "react-redux";
import LoadingMessage from "./loadingMessage";
import {
  getApplications,
  getApplicationStatuses,
  deleteApplication,
} from "../services/applicationService";
import Formatting from "../formatting";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import TextInput from "./formElements/textInput";
import SelectInput from "./formElements/SelectInput";
import ConfirmDialog from "./formElements/confirmDialog";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationsPage extends Component {
  state = {
    applications: [],
    filteredApplications: [],
    applicationStatuses: [],
    applicationFilters: {
      statusFilter: 0,
      nameFilter: "",
      startDateFilter: "",
      endDateFilter: "",
    },
    applicationid: null,
    errors: {},
    loading: true,
    appDeleteId: null,
  };

  async componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser.id === undefined) return this.props.history.push("/login");
    if (!currentUser.administrator) return this.props.history.push("/account");

    const getApps = await getApplications(currentUser.token);
    if (getApps.status === 200) {
      //success
      this.setState({
        applications: getApps.data,
        filteredApplications: getApps.data,
      });
    } else {
      //error
      this.setState({ errors: getApps.error });
    }

    const getAppStatuses = await getApplicationStatuses(currentUser.token);
    if (getAppStatuses.status === 200) {
      let newAppStatuses = [{ value: 0, text: "All" }];
      getAppStatuses.data.forEach((status) => {
        newAppStatuses.push({ value: status.id, text: status.status });
      });
      this.setState({ applicationStatuses: newAppStatuses });
    } else {
      //error
    }

    this.setState({ loading: false });
  }

  handleFilterChange = (e) => {
    const applicationFilters = { ...this.state.applicationFilters };
    let filteredApplications = [...this.state.applications];

    //are we just refreshing filters?
    if (e.target !== null) {
      console.log("Filter value", e.target.value);
      applicationFilters[e.target.id] = e.target.value;
    }

    //status filter
    if (parseInt(applicationFilters.statusFilter) !== 0) {
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.applicationStatus.id === parseInt(applicationFilters.statusFilter)
      );
    }

    //name filter
    if (applicationFilters.nameFilter !== "") {
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.firstName
            .toLowerCase()
            .includes(applicationFilters.nameFilter.toLowerCase()) ||
          app.lastName
            .toLowerCase()
            .includes(applicationFilters.nameFilter.toLowerCase())
      );
    }

    //date filter
    if (applicationFilters.startDateFilter !== "") {
      const startDateFilter = Date.parse(applicationFilters.startDateFilter);
      //console.log("start date filter", startDateFilter);
      filteredApplications = filteredApplications.filter(
        (app) => Date.parse(app.dateReceived) >= startDateFilter
      );
    }
    if (applicationFilters.endDateFilter !== "") {
      let endDateFilter =
        Date.parse(applicationFilters.endDateFilter) + 172800000; //wtf?

      console.log("end date filter", endDateFilter);
      filteredApplications = filteredApplications.filter(
        (app) => Date.parse(app.dateReceived) <= endDateFilter
      );
    }

    this.setState({ filteredApplications, applicationFilters });
    //this.setState({ applicationFilters });
  };

  handleVerifyDelete = (e) => {
    this.setState({ appDeleteId: e.target.id });
  };

  handleCancelDelete = (e) => {
    this.setState({ appDeleteId: null });
  };

  handleDelete = async (e) => {
    console.log("handleDelete e:", e.currentTarget);
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
      console.log(applications);
    } else {
      errors.deleteError = deletedApplication.error;
    }
    this.setState({ errors, applications });
    this.handleFilterChange(e);
  };

  render() {
    if (this.state.applicationid !== null)
      return <ApplicationPage appId={this.state.applicationid} />;
    else if (this.state.applications.length === 0)
      return <LoadingMessage message="Loading..." />;
    const { filteredApplications } = this.state;
    //ALL APPLICATIONS
    return (
      <Container>
        <Row className="pt-1">
          <Col>
            <h3>All Employment Applications</h3>
          </Col>
          <Col className="pt-1 text-right">
            <Link
              to="/applications/new"
              className="btn btn-success btn-sm mb-2"
            >
              + New Application
            </Link>
          </Col>
        </Row>
        <Alert variant="secondary" className="">
          <strong>Filters</strong>
          <Row>
            <Col>
              <TextInput
                name="nameFilter"
                label="Name Filter"
                onChange={this.handleFilterChange}
              />
            </Col>
            <Col>
              <SelectInput
                name="statusFilter"
                label="Application Status"
                options={this.state.applicationStatuses}
                onChange={this.handleFilterChange}
              />
            </Col>
            <Col>
              <TextInput
                name="startDateFilter"
                label="Newer Than"
                type="date"
                onChange={this.handleFilterChange}
              />
            </Col>
            <Col>
              <TextInput
                name="endDateFilter"
                label="Older Than"
                type="date"
                onChange={this.handleFilterChange}
              />
            </Col>
          </Row>
        </Alert>

        <Container>
          <Row className="bg-dark text-white font-weight-bold mb-1">
            <Col>Name</Col>
            <Col>Date Received</Col>
            <Col>City, State</Col>
            <Col sm={3}>App Status</Col>
            <Col>Actions</Col>
          </Row>
          {filteredApplications.map((app) => {
            const appStatus = Formatting.formatApplicationStatus(
              app.applicationStatus
            );
            return (
              <Fragment key={app.id}>
                <Row className="border-top border-dark pb-1 pt-1">
                  <Col>
                    {app.firstName} {app.lastName}
                  </Col>
                  <Col>{Formatting.formatDate(app.dateReceived)}</Col>
                  <Col>
                    {app.city}, {app.state}
                  </Col>
                  <Col
                    sm={3}
                    className={
                      "text-center bg-" +
                      appStatus.color +
                      " text-" +
                      appStatus.textColor
                    }
                  >
                    {app.applicationStatus.status}
                  </Col>
                  <Col>
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
                {parseInt(this.state.appDeleteId) === app.id && (
                  <Row className="pt-1">
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
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ApplicationsPage);
