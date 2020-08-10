import React, { Component } from "react";
import axios from "axios";
import ApplicationView from "./applicationView";
import Formatting from "../formatting";
import config from "react-global-configuration";
import { connect } from "react-redux";
import ApplicationForm from "./forms/applicationForm";
import JoiSchemas from "../joiSchemas";
import {
  getApplicationById,
  addApplication,
} from "../services/applicationService";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class ApplicationPage extends Component {
  state = {
    application: {},
    errors: {},
    loading: false,
    newApplication: {
      userId: this.props.currentUser.id,
      ApplicationStatusId: 1,

      //INFO
      firstName: "Steve",
      middleInitial: "R",
      lastName: "Smith",
      address: "123 Cherry Street",
      city: "Langley Falls",
      state: "VA",
      zipCode: "00001",
      homePhone: "(123) 456-7890",
      cellPhone: "(123) 456-7890",
      socialSecurityNumber: "123-45-6789",
      isUsCitizen: true,
      hasFelony: false,
      willDrugTest: true,

      //EMPLOYMENT
      employment: [],
      employerName: "My Employer",
      employerStartDate: "2020-01-01",
      employerEndDate: "2020-10-31",
      employerPhoneNumber: "(123) 456-7890",
      employerJobTitle: "Job Expert",

      //EDUCATION
      education: [],
      schoolName: "University",
      schoolStartDate: "1997-01-01",
      schoolEndDate: "2001-05-01",
      schoolDegree: "Bachelor Degree",

      //REFERENCES
      references: [],
      referenceName: "My Brother",
      referencePhoneNumber: "(123) 456-7890",
      referenceRelation: "Friend",
    },
  };

  componentDidMount() {
    this.loadApplication();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      this.loadApplication();
    }
  }

  async loadApplication() {
    console.log(this.props.match.params.Id);
    if (this.props.match.params.Id !== undefined) {
      console.log("LOADING");
      let getApp = await getApplicationById(
        this.props.currentUser.token,
        this.props.match.params.Id
      );
      console.log(getApp);
      if (getApp.status === 200) {
        console.log("SUCCESS");
        const application = getApp.data;
        this.setState({ application });
      } else {
        const errors = { getApp: getApp.error };
        this.setState({ errors });
      }
    }
  }

  handleAddEmployment = (e) => {
    let newApplication = { ...this.state.newApplication };

    //SET UP EMPLOYMENT OBJECT
    let employerItem = {
      employerName: newApplication.employerName,
      startDate: newApplication.employerStartDate,
      endDate: newApplication.employerEndDate,
      phone: newApplication.employerPhoneNumber,
      position: newApplication.employerJobTitle,
    };

    //VALIDATE FIRST
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.employmentSchema,
      employerItem
    );
    console.log("employer add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (errors.count === 0) newApplication.employment.push(employerItem);

    //REMOVE FROM STATE TO EMPTY FIELDS (UNCOMMENT FOR PRODUCTION)
    // newApplication.employerName = "";
    // newApplication.employerStartDate = "";
    // newApplication.employerEndDate = "";
    // newApplication.employerPhoneNumber = "";
    // newApplication.employerJobTitle = "";

    //SET THE STATE
    this.setState({ newApplication, errors });
    //console.log(newApplication);
  };

  handleRemoveEmployment = ({ target }) => {
    console.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.employment = newApplication.employment.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleAddEducation = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL EDUCATION ITEM
    let educationItem = {
      schoolName: newApplication.schoolName,
      startDate: newApplication.schoolStartDate,
      endDate: newApplication.schoolEndDate,
      degree: newApplication.schoolDegree,
    };

    //VALIDATE FIRST
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.educationSchema,
      educationItem
    );
    console.log("education add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (errors.count === 0) newApplication.education.push(educationItem);

    //REMOVE FROM STATE (UNCOMMENT FOR PRODUCTION)
    // newApplication.schoolName = "";
    // newApplication.schoolStartDate = "";
    // newApplication.schoolEndDate = "";
    // newApplication.schoolDegree = "";

    //SET STATE
    this.setState({ newApplication, errors });
    //console.log(newApplication);
  };

  handleRemoveEducation = ({ target }) => {
    console.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.education = newApplication.education.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleAddReference = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL REFERENCE ITEM
    let referenceItem = {
      name: newApplication.referenceName,
      phoneNumber: newApplication.referencePhoneNumber,
      relation: newApplication.referenceRelation,
    };

    //VALIDATE FIRST
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.referenceSchema,
      referenceItem
    );
    console.log("Reference add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (errors.count === 0) newApplication.references.push(referenceItem);

    //REMOVE FROM STATE (UNCOMMENT FOR PRODUCTION)
    // newApplication.referenceName = "";
    // newApplication.referencePhoneNumber = "";
    // newApplication.referenceRelation = "";

    //SET STATE
    this.setState({ newApplication, errors });
    //console.log(newApplication);
  };

  handleRemoveReference = ({ target }) => {
    console.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.references = newApplication.references.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleChange = (e) => {
    console.log("handleChange", e);
    const newApplication = { ...this.state.newApplication };
    if (e.currentTarget.id.includes("Phone"))
      newApplication[e.currentTarget.id] = Formatting.formatPhoneNumber(
        e.currentTarget.value,
        false
      );
    else if (e.currentTarget.id.includes("socialSecurity"))
      newApplication[e.currentTarget.id] = Formatting.formatSsn(
        e.currentTarget.value
      );
    else newApplication[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ newApplication });
  };

  handleSubmit = async (e) => {
    console.log("HANDLESUBMIT");
    e.preventDefault();
    const newApplication = { ...this.state.newApplication };

    let appItem = {
      userId: newApplication.userId,
      firstName: newApplication.firstName,
      middleInitial: newApplication.middleInitial,
      lastName: newApplication.lastName,
      address: newApplication.address,
      city: newApplication.city,
      state: newApplication.state,
      zipCode: newApplication.zipCode,
      homePhone: Formatting.formatPhoneNumber(newApplication.homePhone),
      cellPhone: Formatting.formatPhoneNumber(newApplication.cellPhone),
      socialSecurityNumber: Formatting.formatSsn(
        newApplication.socialSecurityNumber
      ),
      isUsCitizen: newApplication.isUsCitizen,
      hasFelony: newApplication.hasFelony,
      willDrugTest: newApplication.willDrugTest,
      employment: newApplication.employment,
      education: newApplication.education,
      references: newApplication.references,
    };

    // //CHECK PERSONAL INFO
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.applicationSchema,
      appItem
    );
    console.log("validate errors", errors);
    this.setState({ errors });
    if (errors.count > 0) return;

    // //CLEAN SOME ITEMS FOR API
    newApplication.homePhone = Formatting.formatPhoneNumber(
      newApplication.homePhone,
      true
    );
    newApplication.cellPhone = Formatting.formatPhoneNumber(
      newApplication.cellPhone,
      true
    );
    newApplication.socialSecurityNumber = Formatting.formatSsn(
      newApplication.socialSecurityNumber,
      true
    );

    //SUCCESS. SUBMIT THE FORM TO API.
    console.log("VALIDATE SUCCESS", newApplication);
    this.setState({ loading: true });

    const addApp = await addApplication(
      this.props.currentUser.token,
      newApplication
    );
    if (addApp.status === 201) {
      this.props.history.push("/applications/" + addApp.data.id);
    } else {
      const errors = { addApp: addApp.error };
      this.setState({ errors });
    }
    this.setState({ loading: false });
  };

  render() {
    //console.log(this.props.match.params);
    if (this.props.currentUser.token === undefined)
      this.props.history.push("/login");
    return (
      <div>
        {this.props.match.params.Id !== undefined ? (
          <ApplicationView application={this.state.application} />
        ) : (
          <ApplicationForm
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleAddEmployment={this.handleAddEmployment}
            handleRemoveEmployment={this.handleRemoveEmployment}
            handleAddEducation={this.handleAddEducation}
            handleRemoveEducation={this.handleRemoveEducation}
            handleAddReference={this.handleAddReference}
            handleRemoveReference={this.handleRemoveReference}
          />
          // <this.NewApplication />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ApplicationPage);
