import React, { Component } from "react";
//import axios from "axios";
import ApplicationPage from "./applicationPage";
import { Link } from "react-router-dom";
//import config from "react-global-configuration";
import { connect } from "react-redux";
import LoadingMessage from "./loadingMessage";
import { getApplications } from "../services/applicationService";
import Formatting from "../formatting";
import { Container, Row, Col } from "react-bootstrap";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationsPage extends Component {
  state = {
    applications: [],
    applicationid: null,
    errors: {},
  };

  async componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser.id === undefined) return this.props.history.push("/login");
    if (!currentUser.administrator) return this.props.history.push("/account");

    const getApps = await getApplications(currentUser.token);
    if (getApps.status === 200) {
      //success
      this.setState({ applications: getApps.data, loading: false });
    } else {
      //error
      this.setState({ errors: getApps.error, loading: false });
    }
  }

  render() {
    if (this.state.applicationid !== null)
      return <ApplicationPage appId={this.state.applicationid} />;
    else if (this.state.applications.length === 0)
      return <LoadingMessage message="Loading Applications..." />;

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
            {this.state.applications.map((app) => (
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
