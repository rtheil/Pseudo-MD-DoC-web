import React, { Component } from "react";
import axios from "axios";
import Application from "./application";

class Applications extends Component {
  state = {
    applications: [],
    applicationid: null,
  };

  async componentDidMount() {
    const { data: applications } = await axios
      .get("https://md-doc-api.azurewebsites.net/api/Applications")
      .catch((error) => {
        console.log(error.message);
      });
    this.setState({ applications });
    console.log(this.state);
  }

  handleViewApplication = (application) => {
    this.setState({ applicationid: application.id });
    console.log(application);
  };

  handleViewApplications = (application) => {
    this.setState({ applicationid: null });
    console.log(application);
  };

  render() {
    if (this.state.applicationid !== null)
      return (
        <Application
          appId={this.state.applicationid}
          viewApplications={this.handleViewApplications}
        />
      );
    else if (this.state.applications.length === 0)
      return <p>No applications</p>;

    //ALL APPLICATIONS
    return (
      <div>
        <h2>Employment Applications</h2>
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
                <td>XX/XX/XXXX</td>
                <td>
                  {app.city}, {app.state}
                </td>
                <td>{app.applicationStatus}</td>
                <td>
                  <button
                    onClick={() => this.handleViewApplication(app)}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Applications;
