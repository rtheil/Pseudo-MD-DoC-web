import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import TextInput from "./textInput";

class Application extends Component {
  state = {
    application: {},
    newApplication: {
      //INFO
      firstName: "",
      mi: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      city: "",
      state: "",
      zip: "",
      homePhone: "",
      cellPhone: "",
      ssn: "",
      isCitizen: false,
      hasFelony: false,
      willDrugTest: false,

      //EMPLOYMENT
      employment: [],
      employerName: "",
      employerStartDate: "",
      employerEndDate: "",
      employerPhoneNumber: "",
      employerJobTitle: "",

      //EDUCATION
      education: [],
      schoolName: "",
      schoolStartDate: "",
      schoolEndDate: "",
      schoolDiploma: "",

      //REFERENCES
      references: [],
      referenceName: "",
      referencePhoneNumber: "",
      referenceRelation: "",
    },
  };

  async loadApplication() {
    console.log(this.props.match.params.Id);
    if (this.props.match.params.Id !== undefined) {
      const url =
        "https://md-doc-api.azurewebsites.net/api/Applications/" +
        this.props.match.params.Id;
      const { data: application } = await axios.get(url);
      this.setState({ application });
      //console.log(this.props);
    }
  }

  componentDidMount() {
    this.loadApplication();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      this.loadApplication();
    }
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

  ApplicationView = () => {
    const { application } = this.state;
    const { employmentHistory } = this.state.application;
    return (
      <div>
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
            {employmentHistory !== undefined ? (
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
            {application.education !== undefined ? (
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
            {application.references !== undefined ? (
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
  };

  NewApplication = () => {
    const { newApplication } = this.state;

    return (
      <div className="container-lg mb-5">
        <Form>
          <div
            className="p-1 mt-2"
            style={{ backgroundColor: "#333333", color: "white" }}
          >
            <h4>Personal Information</h4>
          </div>
          <Form.Row>
            <TextInput
              name="firstName"
              onChange={this.handleChange}
              label="First Name"
              value={newApplication.firstName}
            />
            <TextInput
              name="mi"
              onChange={this.handleChange}
              label="MI"
              value={newApplication.mi}
              size="1"
            />
            <TextInput
              name="lastName"
              onChange={this.handleChange}
              label="Last Name"
              value={newApplication.lastName}
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="emailAddress"
              onChange={this.handleChange}
              label="Email Address"
              value={newApplication.eMailAddress}
              type="email"
            />
            <TextInput
              name="password"
              onChange={this.handleChange}
              label="Password"
              value={newApplication.password}
              type="password"
              size="3"
            />
            <TextInput
              name="confirmPassword"
              onChange={this.handleChange}
              label="Confirm Password"
              value={newApplication.confirmPassword}
              type="password"
              size="3"
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="city"
              onChange={this.handleChange}
              label="City"
              value={newApplication.city}
            />
            <TextInput
              name="state"
              onChange={this.handleChange}
              label="State"
              value={newApplication.state}
              size="2"
            />
            <TextInput
              name="zip"
              onChange={this.handleChange}
              label="Zip"
              value={newApplication.zip}
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="homePhone"
              onChange={this.handleChange}
              label="Home Phone"
              size="5"
            />
            <TextInput
              name="cellPhone"
              onChange={this.handleChange}
              label="Cell Phone"
              value={newApplication.cellPhone}
              size="5"
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="ssn"
              onChange={this.handleChange}
              label="SSN"
              value={newApplication.ssn}
              size="2"
            />
            <Form.Group as={Col}>
              <Form.Label>US Citizen?</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                sm="1"
                id="isCitizen"
                custom
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Felony Conviction?</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="hasFelony"
                custom
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Drug Test?</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="willDrugTest"
                custom
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <div
            className="p-1"
            style={{ backgroundColor: "#333333", color: "white" }}
          >
            Employment History
          </div>
          <Form.Row>
            <TextInput
              onChange={this.handleChange}
              label="Employer Name"
              name="employerName"
              value={newApplication.employerName}
              size="2"
            />
            <TextInput
              onChange={this.handleChange}
              label="Start Date"
              name="employerStartDate"
              value={newApplication.employerStartDate}
              size="2"
            />
            <TextInput
              onChange={this.handleChange}
              label="End Date"
              name="employerEndDate"
              value={newApplication.employerEndDate}
              size="2"
            />
            <TextInput
              onChange={this.handleChange}
              label="Phone Number"
              name="employerPhoneNumber"
              value={newApplication.employerPhoneNumber}
              size="2"
            />
            <TextInput
              onChange={this.handleChange}
              label="Job Title"
              name="employerJobTitle"
              value={newApplication.employerJobTitle}
              size="2"
            />
            <Button
              variant="success"
              className="mt-4 mb-4"
              onClick={this.handleAddEmployment}
            >
              +
            </Button>
          </Form.Row>
          <div className="container-lg">
            {this.state.newApplication.employment !== undefined &&
              this.state.newApplication.employment.map((item, i) => {
                return (
                  <div key={item.employerName + i} className="row">
                    <div className="col">{item.employerName}</div>
                    <div className="col">{item.startDate}</div>
                    <div className="col">{item.endDate}</div>
                    <div className="col">{item.phoneNumber}</div>
                    <div className="col">{item.jobTitle}</div>
                  </div>
                );
              })}
          </div>
          <div
            className="p-1"
            style={{ backgroundColor: "#333333", color: "white" }}
          >
            Education
          </div>
          <Form.Row>
            <TextInput
              name="schoolName"
              onChange={this.handleChange}
              label="School Name"
              value={newApplication.schoolName}
            />
            <TextInput
              name="schoolStartDate"
              onChange={this.handleChange}
              label="Start Date"
              value={newApplication.schoolStartDate}
            />
            <TextInput
              name="schoolEndDate"
              onChange={this.handleChange}
              label="End Date"
              value={newApplication.schoolEndDate}
            />
            <TextInput
              name="schoolDiploma"
              onChange={this.handleChange}
              label="Diploma"
              value={newApplication.schoolDiploma}
            />
            <Button
              variant="success"
              className="mt-4 mb-4"
              onClick={this.handleAddEducation}
            >
              +
            </Button>
          </Form.Row>
          <div
            className="p-1"
            style={{ backgroundColor: "#333333", color: "white" }}
          >
            References
          </div>
          <Form.Row>
            <TextInput
              name="referenceName"
              onChange={this.handleChange}
              label="Name"
              value={newApplication.referenceName}
            />
            <TextInput
              name="referencePhoneNumber"
              onChange={this.handleChange}
              label="Phone Number"
              value={newApplication.referencePhoneNumber}
            />
            <TextInput
              name="referenceRelation"
              onChange={this.handleChange}
              label="Relation"
              value={newApplication.referenceRelation}
            />
            <Button
              variant="success"
              className="mt-4 mb-4"
              onClick={this.handleAddReference}
            >
              +
            </Button>
          </Form.Row>
          <Button variant="success" type="submit">
            Submit Application
          </Button>
        </Form>
      </div>
    );
  };

  handleAddEmployment = (e) => {
    let newApplication = { ...this.state.newApplication };

    //SET UP EMPLOYMENT OBJECT
    let employerItem = {
      employerName: newApplication.employerName,
      startDate: newApplication.employerStartDate,
      endDate: newApplication.employerEndDate,
      phoneNumber: newApplication.employerPhoneNumber,
      jobTitle: newApplication.employerJobTitle,
    };
    console.log(employerItem);

    //ADD TO LOCAL ARRAY
    newApplication.employment.push(employerItem);

    //REMOVE FROM STATE TO EMPTY FIELDS
    newApplication.employerName = "";
    newApplication.employerStartDate = "";
    newApplication.employerEndDate = "";
    newApplication.employerPhoneNumber = "";
    newApplication.employerJobTitle = "";

    //SET THE STATE
    this.setState({ newApplication });
    console.log(newApplication);
  };

  handleAddEducation = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL EDUCATION ITEM
    let educationItem = {
      schoolName: newApplication.schoolName,
      startDate: newApplication.schoolStartDate,
      endDate: newApplication.schoolEndDate,
      Diploma: newApplication.schoolDiploma,
    };
    console.log(educationItem);
    //ADD TO LOCAL ARRAY
    newApplication.education.push(educationItem);
    //REMOVE FROM STATE
    newApplication.schoolName = "";
    newApplication.schoolStartDate = "";
    newApplication.schoolEndDate = "";
    newApplication.schoolDiploma = "";

    //SET STATE
    this.setState({ newApplication });
    console.log(newApplication);
  };

  handleAddReference = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL REFERENCE ITEM
    let referenceItem = {
      referenceName: newApplication.referenceName,
      referencePhoneNumber: newApplication.referencePhoneNumber,
      referenceRelation: newApplication.referenceRelation,
    };
    newApplication.references.push(referenceItem);

    //SET STATE
    this.setState({ newApplication });
    console.log(newApplication);
  };

  handleChange = (e) => {
    const newApplication = { ...this.state.newApplication };
    newApplication[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ newApplication });
    //console.log(e.currentTarget.id, e.currentTarget.value);
    //console.log(e.currentTarget);
  };

  render() {
    //console.log(this.props.match.params);
    return (
      <div>
        {this.props.match.params.Id !== undefined ? (
          <this.ApplicationView />
        ) : (
          <this.NewApplication />
        )}
      </div>
    );
  }
}

export default Application;
