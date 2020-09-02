import React, { Component } from "react";
//import axios from "axios";
import ApplicationPage from "./applicationPage";
import { Link } from "react-router-dom";
//import config from "react-global-configuration";
import { connect } from "react-redux";
import LoadingMessage from "./loadingMessage";
import {
  getApplications,
  getApplicationStatuses,
} from "../services/applicationService";
import Formatting from "../formatting";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TextInput from "./formElements/textInput";
import SelectInput from "./formElements/SelectInput";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationsPage extends Component {
  state = {
    applications: [],
    filteredApplications: [],
    applicationStatuses: [],
    applicationFilters: { statusFilter: null, nameFilter: "" },
    applicationid: null,
    errors: {},
    loading: true,
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
      let newAppStatuses = [{ value: null, text: "All" }];
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
    //console.log("FILTER", e.target);
    console.log("Filter value", e.target.value);
    const applicationFilters = { ...this.state.applicationFilters };
    let filteredApplications = [...this.state.applications];
    console.log("filteredApplications2", filteredApplications);
    applicationFilters[e.target.id] = e.target.value;

    //status filter
    if (applicationFilters.statusFilter !== null) {
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
    //if (applicationFilters.startDateFilter)

    this.setState({ filteredApplications, applicationFilters });
    //this.setState({ applicationFilters });
  };

  render() {
    if (this.state.applicationid !== null)
      return <ApplicationPage appId={this.state.applicationid} />;
    else if (this.state.applications.length === 0)
      return <LoadingMessage message="Loading Applications..." />;
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
            <Col>Three</Col>
            <Col>Four</Col>
          </Row>
        </Alert>

        <table className="table">
          <thead className="thead thead-dark">
            <tr>
              <th>Name</th>
              <th>Date Received</th>
              <th>City, State</th>
              <th>App Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td>
                  {app.firstName} {app.lastName}
                </td>
                <td>{Formatting.formatDate(app.dateReceived)}</td>
                <td>
                  {app.city}, {app.state}
                </td>
                <td>{app.applicationStatus.status}</td>
                <td>
                  <Link
                    to={"/applications/" + app.id}
                    className="btn btn-primary btn-sm mb-2"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ApplicationsPage);
