import React from "react";
import { Link } from "react-router-dom";
import Formatting from "../formatting";
import LoadingMessage from "./loadingMessage";

const ApplicationView = ({ application }) => {
  console.log("app top:", application);
  //const formatting = new Formatting();
  if (application.id === undefined)
    return <LoadingMessage message="Loading Application..." />;
  return (
    <div className="container">
      {" "}
      <h2>Job Application</h2>
      <Link to="/applications">Back to Applications list</Link>
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
              {Formatting.formatPhoneNumber(application.homePhone)}
              <br />
              {Formatting.formatPhoneNumber(application.cellPhone)}
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
            <td>{application.user.emailAddress}</td>
            <td>{Formatting.formatSsn(application.socialSecurityNumber)}</td>
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
          {application.employment !== undefined ? (
            application.employment.map((emp) => (
              <tr key={"emp" + emp.id}>
                <td>{emp.employerName}</td>
                <td>{Formatting.formatDate(emp.startDate)}</td>
                <td>
                  {emp.endDate === null
                    ? "Still Employed"
                    : Formatting.formatDate(emp.endDate)}
                </td>
                <td>{Formatting.formatPhoneNumber(emp.phone)}</td>
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
            <th>Degree</th>
          </tr>
        </thead>
        <tbody>
          {application.education !== undefined ? (
            application.education.map((edu) => (
              <tr key={"edu" + edu.id}>
                <td>{edu.schoolName}</td>
                <td>{Formatting.formatDate(edu.startDate)}</td>
                <td>
                  {edu.endDate === null
                    ? "Incomplete"
                    : Formatting.formatDate(edu.endDate)}
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
          {application.references !== undefined ? (
            application.references.map((ref) => (
              <tr key={"ref" + ref.id}>
                <td>{ref.name}</td>
                <td>{Formatting.formatPhoneNumber(ref.phoneNumber)}</td>
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
};

export default ApplicationView;
