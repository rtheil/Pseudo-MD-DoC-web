import React, { Component } from "react";
import axios from "axios";
import Application from "./application";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import config from "react-global-configuration";

//const apiUrl = config.get("api.url");
//console.log("config:", config.serialize());

class Applications extends Component {
  state = {
    applications: [],
    applicationid: null,
  };

  async componentDidMount() {
    const { data: applications } = await axios
      .get(config.get("api.url") + "/Applications")
      .catch((error) => {
        console.log(error.message);
      });
    this.setState({ applications });
    //console.log(this.state);
  }

  render() {
    if (this.state.applicationid !== null)
      return <Application appId={this.state.applicationid} />;
    else if (this.state.applications.length === 0)
      return (
        <React.Fragment>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          &nbsp;Loading data
        </React.Fragment>
      );

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
                <td>{app.dateReceived}</td>
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

export default Applications;
