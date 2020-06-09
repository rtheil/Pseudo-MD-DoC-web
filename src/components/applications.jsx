import React, { Component } from "react";
import axios from "axios";

class Applications extends Component {
  state = {
    applications: [],
  };

  async componentDidMount() {
    const { data: applications } = await axios.get(
      "https://localhost:44311/api/Applications"
    );
    this.setState({ applications });
  }

  handleViewApplication = (application) => {
    console.log(application);
  };

  render() {
    if (this.state.applications.length === 0) return <p>No applications</p>;
    return (
      <div>
        <h2>Employment Applications</h2>
        <table className="table">
          <thead>
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
                  {app.firstName} {app.LastName}
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
