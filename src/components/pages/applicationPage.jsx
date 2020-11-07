import React, { Component } from "react";
import config from "react-global-configuration";
import ApplicationView from "../applicationView";
import Formatting from "../../formatting";
import { connect } from "react-redux";
import ApplicationForm from "../forms/applicationForm";
import JoiSchemas from "../../joiSchemas";
import {
  getApplicationById,
  addApplication,
} from "../../services/applicationService";
import logger from "../../services/logService";

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
      //      ApplicationStatusId: 1,

      //INFO
      firstName: "",
      middleInitial: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      homePhone: "",
      cellPhone: "",
      socialSecurityNumber: "",
      isUsCitizen: undefined,
      hasFelony: undefined,
      willDrugTest: undefined,

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
      schoolDegree: "",

      //REFERENCES
      references: [],
      referenceName: "",
      referencePhoneNumber: "",
      referenceRelation: "",
    },
  };

  componentDidMount() {
    this.loadApplication();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadApplication();
    }
  }

  async loadApplication() {
    //logger.log(this.props.match.params.Id);
    if (this.props.match.params.Id !== undefined) {
      logger.log("LOADING");
      let getApp = await getApplicationById(
        this.props.currentUser.token,
        this.props.match.params.Id
      );
      logger.log(getApp);
      if (getApp.status === 200) {
        logger.log("SUCCESS");
        const application = getApp.data;
        this.setState({ application });
      } else {
        const errors = { getApp: getApp.error };
        this.setState({ errors });
      }
    } else {
      if (config.get("helperValues")) {
        //logger.log("LOAD TESTING VALUES");
        const newApplication = {
          userId: this.props.currentUser.id,
          //ApplicationStatusId: 1,

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
        };
        this.setState({ newApplication });
      }
    }
  }

  handleAddEmployment = (e) => {
    let newApplication = { ...this.state.newApplication };

    //SET UP EMPLOYMENT OBJECT
    let employerItem = {
      employerName: newApplication.employerName,
      employerStartDate: newApplication.employerStartDate,
      employerEndDate: newApplication.employerEndDate,
      employerPhoneNumber: newApplication.employerPhoneNumber,
      position: newApplication.employerJobTitle,
    };

    //VALIDATE FIRST
    let errors = Formatting.formatJoiValidation(
      JoiSchemas.employmentSchema,
      employerItem
    );
    logger.log("employer add errors", errors);

    //check date range
    if (
      new Date(newApplication.employerStartDate) >
      new Date(newApplication.employerEndDate)
    ) {
      logger.log("start greater than end");
      errors = {
        employerStartDate: "Start date must be less than end date",
        ...errors,
      };
      errors.count++;
    }

    //ADD TO LOCAL ARRAY
    employerItem = {
      employerName: newApplication.employerName,
      startDate: newApplication.employerStartDate,
      endDate: newApplication.employerEndDate,
      phone: newApplication.employerPhoneNumber,
      position: newApplication.employerJobTitle,
    };
    if (errors.count === 0) {
      newApplication.employment.push(employerItem);

      //empty the fields
      if (!config.get("helperValues")) {
        newApplication.employerName = "";
        newApplication.employerStartDate = "";
        newApplication.employerEndDate = "";
        newApplication.employerPhoneNumber = "";
        newApplication.employerJobTitle = "";
      }
    }

    //SET THE STATE
    this.setState({ newApplication, errors });
    //logger.log(newApplication);
  };

  handleRemoveEmployment = ({ target }) => {
    logger.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.employment = newApplication.employment.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleAddEducation = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL EDUCATION ITEM
    let educationItem = {
      schoolName: newApplication.schoolName,
      schoolStartDate: newApplication.schoolStartDate,
      schoolEndDate: newApplication.schoolEndDate,
      degree: newApplication.schoolDegree,
    };

    //VALIDATE FIRST
    let errors = Formatting.formatJoiValidation(
      JoiSchemas.educationSchema,
      educationItem
    );
    logger.log("education add errors", errors);

    //check date range
    if (
      new Date(newApplication.schoolStartDate) >
      new Date(newApplication.schoolEndDate)
    ) {
      logger.log("start greater than end");
      errors = {
        schoolStartDate: "Start date must be less than end date",
        ...errors,
      };
      errors.count++;
    }

    //ADD TO LOCAL ARRAY
    educationItem = {
      schoolName: newApplication.schoolName,
      startDate: newApplication.schoolStartDate,
      endDate: newApplication.schoolEndDate,
      degree: newApplication.schoolDegree,
    };
    if (errors.count === 0) {
      newApplication.education.push(educationItem);

      //empty the fields
      if (!config.get("helperValues")) {
        newApplication.schoolName = "";
        newApplication.schoolStartDate = "";
        newApplication.schoolEndDate = "";
        newApplication.schoolDegree = "";
      }
    }
    //SET STATE
    this.setState({ newApplication, errors });
    //logger.log(newApplication);
  };

  handleRemoveEducation = ({ target }) => {
    logger.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.education = newApplication.education.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleAddReference = (e) => {
    let newApplication = { ...this.state.newApplication };

    //LOCAL REFERENCE ITEM
    let referenceItem = {
      name: newApplication.referenceName,
      referencePhoneNumber: newApplication.referencePhoneNumber,
      relation: newApplication.referenceRelation,
    };

    //VALIDATE FIRST
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.referenceSchema,
      referenceItem
    );
    logger.log("Reference add errors", errors);
    //logger.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    referenceItem = {
      name: newApplication.referenceName,
      phoneNumber: newApplication.referencePhoneNumber,
      relation: newApplication.referenceRelation,
    };
    if (errors.count === 0) {
      newApplication.references.push(referenceItem);

      //empty the fields
      if (!config.get("helperValues")) {
        newApplication.referenceName = "";
        newApplication.referencePhoneNumber = "";
        newApplication.referenceRelation = "";
      }
    }

    //SET STATE
    this.setState({ newApplication, errors });
    //logger.log(newApplication);
  };

  handleRemoveReference = ({ target }) => {
    logger.log(target);
    let newApplication = { ...this.state.newApplication };
    newApplication.references = newApplication.references.splice(target.idx, 1);
    this.setState(newApplication);
  };

  handleChange = (e) => {
    logger.log("handleChange", e.currentTarget);
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
    else if (e.currentTarget.type === "date") {
      logger.log("date change");
      newApplication[e.currentTarget.id] = Formatting.formatInputDate(
        e.currentTarget.value,
        false
      );
    } else newApplication[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ newApplication });
  };

  handleSubmit = async (e) => {
    logger.log("HANDLESUBMIT");
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
    logger.log("appItem:", appItem);
    logger.log("newApplication:", newApplication);

    // //CHECK PERSONAL INFO
    const errors = Formatting.formatJoiValidation(
      JoiSchemas.applicationSchema,
      appItem,
      false
    );
    logger.log("validate errors", errors);
    this.setState({ errors });
    if (errors.count > 0) return;

    //prepare some items for API
    appItem.homePhone = Formatting.formatPhoneNumber(appItem.homePhone, true);
    appItem.cellPhone = Formatting.formatPhoneNumber(appItem.cellPhone, true);
    appItem.socialSecurityNumber = Formatting.formatSsn(
      appItem.socialSecurityNumber,
      true
    );
    appItem.isUsCitizen = appItem.isUsCitizen === "true";
    appItem.hasFelony = appItem.hasFelony === "true";
    appItem.willDrugTest = appItem.willDrugTest === "true";

    //SUCCESS. SUBMIT THE FORM TO API.
    logger.log("VALIDATE SUCCESS", newApplication);
    this.setState({ loading: true });

    const addApp = await addApplication(this.props.currentUser.token, appItem);
    if (addApp.status === 201) {
      this.props.history.push("/applications/" + addApp.data.id);
    } else {
      const errors = { addApp: addApp.error };
      this.setState({ errors });
    }
    this.setState({ loading: false });
  };

  render() {
    //logger.log("app:", this.state.application);
    const { application } = this.state;
    if (this.props.currentUser.token === undefined)
      this.props.history.push("/login");
    return (
      <div>
        {this.props.match.params.Id !== undefined ? (
          <>{application.id && <ApplicationView application={application} />}</>
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
