import React, { Component } from "react";
import axios from "axios";

class Application extends Component {
  state = {
    application: [],
  };

  async componentDidMount() {
    const { data: application } = await axios.get(
      "https://localhost:44311/api/Applications/1"
    );
    this.setState({ application });
    //console.log(application.employmentHistory);
  }

  //FORMAT A PHONE NUMBER FROM API
  formatPhoneNumber(phoneNumber) {
    var cleaned = ("" + phoneNumber).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  //FORMAT A ZULU DATE FROM THE API
  formatDate(date) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return mo + "/" + da + "/" + ye;
  }

  //FORMAT A SOCIAL SECURITY NUMBER FROM API
  formatSsn(ssn) {
    const cleaned = "" + ssn;
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    if (match) return match[1] + "-" + match[2] + "-" + match[3];
    return "Invalid";
  }

  render() {
    const { application } = this.state;
    const { employmentHistory } = this.state.application;
    console.log(employmentHistory);
    return (
      <div>
        <h2>Job Application</h2>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City, State Zip</th>
              <th>Phones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {application.firstName} {application.middleInitial}.{" "}
                {application.lastName}
              </td>
              <td>{application.address}</td>
              <td>
                {application.city}, {application.state} {application.zip}
              </td>
              <td>
                {this.formatPhoneNumber(application.homePhone)}
                <br />
                {this.formatPhoneNumber(application.cellPhone)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>SSN</th>
              <th>US Citizen</th>
              <th>Felony</th>
              <th>Will Drug Test</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{application.eMailAddress}</td>
              <td>{this.formatSsn(application.socialSecurityNumber)}</td>
              <td>{application.isUsCitizen ? "Yes" : "No"}</td>
              <td>{application.hasFelony ? "Yes" : "No"}</td>
              <td>{application.willDrugTest ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>

        <table
          style={{ marginBottom: 0, paddingBottom: 0 }}
          className="table table-sm"
        >
          <thead className="thead-dark">
            <tr>
              <th>Employment History</th>
            </tr>
          </thead>
        </table>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Employer</th>
              <th>Start</th>
              <th>End</th>
              <th>Phone</th>
              <th>Job Title</th>
              <th>Can Contact</th>
            </tr>
          </thead>
          <tbody>
            {employmentHistory != undefined ? (
              employmentHistory.map((emp) => (
                <tr key={"emp" + emp.id}>
                  <td>{emp.employerName}</td>
                  <td>{this.formatDate(emp.startDate)}</td>
                  <td>
                    {emp.endDate === null
                      ? "Still Employed"
                      : this.formatDate(emp.endDate)}
                  </td>
                  <td>{this.formatPhoneNumber(emp.phone)}</td>
                  <td>{emp.position}</td>
                  <td>{emp.canContact ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>NONE</td>
              </tr>
            )}
          </tbody>
        </table>

        <table
          style={{ marginBottom: 0, paddingBottom: 0 }}
          className="table table-sm"
        >
          <thead className="thead-dark">
            <tr>
              <th>Education</th>
            </tr>
          </thead>
        </table>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>School Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Diploma</th>
            </tr>
          </thead>
          <tbody>
            {application.education != undefined ? (
              application.education.map((edu) => (
                <tr key={"edu" + edu.id}>
                  <td>{edu.schoolName}</td>
                  <td>{this.formatDate(edu.startDate)}</td>
                  <td>
                    {edu.endDate === null
                      ? "Incomplete"
                      : this.formatDate(edu.endDate)}
                  </td>
                  <td>{edu.degree}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>None</td>
              </tr>
            )}
          </tbody>
        </table>

        <table
          style={{ marginBottom: 0, paddingBottom: 0 }}
          className="table table-sm"
        >
          <thead className="thead-dark">
            <tr>
              <th>References</th>
            </tr>
          </thead>
        </table>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Relation</th>
            </tr>
          </thead>
          <tbody>
            {application.references != undefined ? (
              application.references.map((ref) => (
                <tr key={"ref" + ref.id}>
                  <td>{ref.name}</td>
                  <td>{this.formatPhoneNumber(ref.phoneNumber)}</td>
                  <td>{ref.relation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>None</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Application;
