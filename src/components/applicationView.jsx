import React, { Component } from "react";
import Formatting from "../formatting";
import LoadingMessage from "./loadingMessage";
import { connect } from "react-redux";
import { Alert, Container, Row, Col } from "react-bootstrap";
import TextInput from "./formElements/textInput";
import SubmitButton from "./formElements/submitButton";
import { updateApplicationStatus } from "../services/applicationService";
import logger from "../services/logService";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: props.application,
      testScore: "",
      loading: false,
    };
  }

  handleTestScoreChange = (e) => {
    let cleaned = ("" + e.currentTarget.value).replace(/\D/g, "");
    if (cleaned.length > 3) cleaned = cleaned.substring(0, 3);
    const pat = /^\d{1,3}|\s*$/;
    if (pat.test(cleaned)) this.setState({ testScore: cleaned });
  };

  handleStatusChange = async (e) => {
    this.setState({ loading: true });
    const type = e.currentTarget.name;

    let applicationStatus = {
      id: this.state.application.id,
      statusAction: type,
    };
    if (type === "submitTestScore")
      applicationStatus = {
        ...applicationStatus,
        testScore: parseInt(this.state.testScore),
      };
    const result = await updateApplicationStatus(
      this.props.currentUser.token,
      applicationStatus
    );
    if (result.status === 200) {
      this.setState({ application: result.data });
    } else {
      //ADD ERROR HANDLING
    }
    this.setState({ loading: false });
  };

  render() {
    const { currentUser } = this.props;
    const application = { ...this.state.application };
    if (application.id === undefined)
      return <LoadingMessage message="Loading..." />;

    //set some vars
    // logger.log("currentUser:", currentUser);
    logger.log("app top:", application);
    const status = application.applicationStatus.status;
    const statusId = application.applicationStatus.id;
    const { testScore, loading } = this.state;
    const appColors = Formatting.formatApplicationStatus(
      application.applicationStatus
    );
    logger.log("App Colors", appColors);

    return (
      <Container>
        <h2>Job Application</h2>
        {currentUser.administrator && (
          <>
            <Alert variant="info">
              <strong>Admin Menu</strong>
              <Container>
                <Row>
                  <Col>
                    <Alert variant="secondary">
                      <strong>Application Status</strong>: {status}
                      <br />
                      {statusId === 1 && (
                        <>
                          Applicant needs a background Check
                          <br />
                          <SubmitButton
                            variant="info"
                            text="Background Check Submitted"
                            name="backgroundCheckSubmitted"
                            onClick={this.handleStatusChange}
                            loading={loading}
                          />
                        </>
                      )}
                      {statusId === 2 && (
                        <>
                          <SubmitButton
                            variant="success"
                            text="Background Check Passed"
                            name="backgroundCheckPassed"
                            onClick={this.handleStatusChange}
                            loading={loading}
                          />{" "}
                          <SubmitButton
                            variant="danger"
                            text="Background Check Failed"
                            name="backgroundCheckFailed"
                            onClick={this.handleStatusChange}
                            loading={loading}
                          />
                        </>
                      )}
                      {statusId === 3 && (
                        <>
                          <div style={{ maxWidth: 155 }}>
                            <TextInput
                              name="testScore"
                              label="Test Score"
                              value={testScore}
                              onChange={this.handleTestScoreChange}
                              loading={loading}
                            />{" "}
                            <SubmitButton
                              variant="success"
                              text="Submit Test Score"
                              name="submitTestScore"
                              onClick={this.handleStatusChange}
                              loading={loading}
                            />{" "}
                          </div>
                        </>
                      )}
                      {statusId === 4 && (
                        <>
                          <Alert variant="danger">TEST FAILED!</Alert>
                        </>
                      )}
                    </Alert>
                  </Col>
                </Row>
              </Container>
            </Alert>
          </>
        )}
        {!currentUser.administrator && (
          <Alert variant="info">
            <strong>Application Status</strong>
            <Alert
              variant={appColors.color}
              className={"text-" + appColors.text}
            >
              {appColors.status}
            </Alert>
          </Alert>
        )}
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
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ApplicationView);
