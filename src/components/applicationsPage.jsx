import React, { Component } from "react";
//import axios from "axios";
import ApplicationPage from "./applicationPage";
import { Link } from "react-router-dom";
//import config from "react-global-configuration";
import { connect } from "react-redux";
import LoadingMessage from "./loadingMessage";
import { getApplications } from "../services/applicationService";
import Formatting from "../formatting";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationsPage extends Component {
  state = {
    applications: [],
    applicationid: null,
  };

  async componentDidMount() {
    const { currentUser } = this.props;
    let { errors, applications } = this.state;
    if (currentUser.id === undefined) return this.props.history.push("/login");

    const getApps = await getApplications(currentUser.token);
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

  render() {
    if (this.state.applicationid !== null)
      return <ApplicationPage appId={this.state.applicationid} />;
    else if (this.state.applications.length === 0)
      return <LoadingMessage message="Loading Applications..." />;

    //ALL APPLICATIONS
    return (
      <div className="container">
        <h2>Employment Applications</h2>
        <Link to="/applications/new" className="btn btn-success btn-sm mb-2">
          + New Application
        </Link>
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
                <td>{app.applicationStatus}</td>
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(ApplicationsPage);