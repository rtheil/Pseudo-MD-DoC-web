import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import TextInput from "./textInput";
import YesNoSelect from "./yesNoSelect";
import Joi from "@hapi/joi";
import ButtonInput from "./buttonInput";
import ApplicationView from "./applicationView";
import Formatting from "../formatting";

const apiUrl = "https://md-doc-api.azurewebsites.net/api";
//const apiUrl = "https://localhost:5001/api";

class Application extends Component {
  state = {
    application: {},
    errors: {},
    newApplication: {
      //INFO
      firstName: "Steve",
      middleInitial: "R",
      lastName: "Smith",
      eMailAddress: "test@test.com",
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
      employmentHistory: [],
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

  NewApplication = () => {
    const { newApplication, errors } = this.state;
    console.log("error:", errors.error);
    console.log("state", this.state);
    return (
      <div className="container-lg mb-5">
        <Form onSubmit={this.handleSubmit}>
          <div className="p-1 mt-2 app-section-bar">Personal Information</div>
          <Form.Row>
            <TextInput
              name="firstName"
              onChange={this.handleChange}
              label="First Name"
              value={newApplication.firstName}
              error={errors.firstName}
            />
            <TextInput
              name="middleInitial"
              onChange={this.handleChange}
              label="MI"
              value={newApplication.middleInitial}
              error={errors.middleInitial}
              size="1"
            />
            <TextInput
              name="lastName"
              onChange={this.handleChange}
              label="Last Name"
              value={newApplication.lastName}
              error={errors.lastName}
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="address"
              onChange={this.handleChange}
              label="Street Address"
              value={newApplication.address}
              error={errors.address}
            />
            <TextInput
              name="city"
              onChange={this.handleChange}
              label="City"
              size="2"
              value={newApplication.city}
              error={errors.city}
            />
            <TextInput
              name="state"
              onChange={this.handleChange}
              label="State"
              value={newApplication.state}
              error={errors.state}
              size="1"
            />
            <TextInput
              name="zipCode"
              onChange={this.handleChange}
              label="Zip"
              size="1"
              value={newApplication.zipCode}
              error={errors.zipCode}
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="homePhone"
              onChange={this.handleChange}
              label="Home Phone"
              value={newApplication.homePhone}
              error={errors.homePhone}
              size="5"
            />
            <TextInput
              name="cellPhone"
              onChange={this.handleChange}
              label="Cell Phone"
              value={newApplication.cellPhone}
              error={errors.cellPhone}
              size="5"
            />
          </Form.Row>
          <Form.Row>
            <TextInput
              name="socialSecurityNumber"
              onChange={this.handleChange}
              label="SSN"
              value={newApplication.socialSecurityNumber}
              error={errors.socialSecurityNumber}
              size="2"
            />
            <YesNoSelect
              name="isUsCitizen"
              label="US Citizen?"
              value={newApplication.isUsCitizen}
              onChange={this.handleChange}
            />
            <YesNoSelect
              name="hasFelony"
              label="Felony Conviction"
              value={newApplication.hasFelony}
              onChange={this.handleChange}
            />
            <YesNoSelect
              name="willDrugTest"
              label="Drug Test?"
              value={newApplication.willDrugTest}
              onChange={this.handleChange}
            />
          </Form.Row>
          <div className="p-1 mt-2 app-section-bar">Employment History</div>
          <Form.Row>
            <ButtonInput
              name="addEmployment"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="auto"
              onClick={this.handleAddEmployment}
            />
            <TextInput
              onChange={this.handleChange}
              label="Employer Name"
              name="employerName"
              value={newApplication.employerName}
              size="3"
              error={errors.employerName}
            />
            <TextInput
              onChange={this.handleChange}
              label="Start Date"
              name="employerStartDate"
              type="date"
              value={newApplication.employerStartDate}
              size="2"
              error={errors.employerStartDate}
            />
            <TextInput
              onChange={this.handleChange}
              label="End Date"
              name="employerEndDate"
              type="date"
              value={newApplication.employerEndDate}
              size="2"
              error={errors.employerEndDate}
            />
            <TextInput
              onChange={this.handleChange}
              label="Phone Number"
              name="employerPhoneNumber"
              value={newApplication.employerPhoneNumber}
              size="2"
              error={errors.employerPhoneNumber}
            />
            <TextInput
              onChange={this.handleChange}
              label="Job Title"
              name="employerJobTitle"
              value={newApplication.employerJobTitle}
              size="2"
              error={errors.employerJobTitle}
            />
          </Form.Row>
          <div className="container-lg">
            {this.state.newApplication.employmentHistory !== undefined &&
              this.state.newApplication.employmentHistory.map((item, i) => {
                return (
                  <div key={item.employerName + i} className="row mb-1">
                    <div className="ml-1 pl-1">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={this.handleRemoveEmployment}
                        idx={i}
                      >
                        &nbsp;-&nbsp;
                      </Button>
                    </div>
                    <div className="col">{item.employerName}</div>
                    <div className="col">{item.startDate}</div>
                    <div className="col">{item.endDate}</div>
                    <div className="col">{item.phone}</div>
                    <div className="col">{item.position}</div>
                  </div>
                );
              })}
          </div>
          <div className="p-1 mt-2 app-section-bar">Education</div>
          <Form.Row>
            <ButtonInput
              name="addEducation"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="auto"
              onClick={this.handleAddEducation}
            />
            <TextInput
              name="schoolName"
              onChange={this.handleChange}
              label="School Name"
              value={newApplication.schoolName}
              error={errors.schoolName}
            />
            <TextInput
              name="schoolStartDate"
              onChange={this.handleChange}
              label="Start Date"
              type="date"
              value={newApplication.schoolStartDate}
              error={errors.schoolStartDate}
            />
            <TextInput
              name="schoolEndDate"
              onChange={this.handleChange}
              label="End Date"
              type="date"
              value={newApplication.schoolEndDate}
              error={errors.schoolEndDate}
            />
            <TextInput
              name="schoolDegree"
              onChange={this.handleChange}
              label="Degree"
              value={newApplication.schoolDegree}
              error={errors.schoolDegree}
            />
            <div className="container-lg">
              {this.state.newApplication.education !== undefined &&
                this.state.newApplication.education.map((item, i) => {
                  return (
                    <div key={item.schoolName + i} className="row mb-1">
                      <div className="ml-1 pl-1">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.handleRemoveEducation}
                          idx={i}
                        >
                          &nbsp;-&nbsp;
                        </Button>
                      </div>
                      <div className="col">{item.schoolName}</div>
                      <div className="col">{item.startDate}</div>
                      <div className="col">{item.endDate}</div>
                      <div className="col">{item.degree}</div>
                    </div>
                  );
                })}
            </div>
          </Form.Row>
          <div className="p-1 mt-2 app-section-bar">References</div>
          <Form.Row>
            <ButtonInput
              name="addReference"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="auto"
              onClick={this.handleAddReference}
            />
            <TextInput
              name="referenceName"
              onChange={this.handleChange}
              label="Name"
              value={newApplication.referenceName}
              error={errors.referenceName}
            />
            <TextInput
              name="referencePhoneNumber"
              onChange={this.handleChange}
              label="Phone Number"
              value={newApplication.referencePhoneNumber}
              error={errors.referencePhoneNumber}
            />
            <TextInput
              name="referenceRelation"
              onChange={this.handleChange}
              label="Relation"
              value={newApplication.referenceRelation}
              error={errors.referenceRelation}
            />
            <div className="container-lg">
              {this.state.newApplication.references !== undefined &&
                this.state.newApplication.references.map((item, i) => {
                  return (
                    <div
                      key={item.referenceName + "_" + i}
                      className="row mb-1"
                    >
                      <div className="ml-1 pl-1">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.handleRemoveReference}
                          idx={i}
                        >
                          &nbsp;-&nbsp;
                        </Button>
                      </div>
                      <div className="col">{item.name}</div>
                      <div className="col">{item.phoneNumber}</div>
                      <div className="col">{item.relation}</div>
                    </div>
                  );
                })}
            </div>
          </Form.Row>
          <div className="p-1 mt-2 mb-2 app-section-bar">Review and Submit</div>
          <Button variant="success" type="submit">
            Submit Application
          </Button>
        </Form>
      </div>
    );
  };

  appSchema = Joi.object({
    firstName: Joi.string().required().min(2),
    middleInitial: Joi.string().required().max(1),
    lastName: Joi.string().required().min(2),
    address: Joi.string().required().min(5),
    city: Joi.string().required().min(2),
    state: Joi.string().required().min(2).max(2),
    zipCode: Joi.string().required().min(5).max(5),
    homePhone: Joi.string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
      .message("Invalid Phone Number"),
    cellPhone: Joi.string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
      .message("Invalid Phone Number"),
    socialSecurityNumber: Joi.string()
      .regex(/^\d{3}-\d{2}-\d{4}$/)
      .message("Invalid SSN"),
    isUsCitizen: Joi.boolean(),
    hasFelony: Joi.boolean(),
    willDrugTest: Joi.boolean(),
    employmentHistory: Joi.array().min(1).required(),
    education: Joi.array().min(1).required(),
    references: Joi.array().min(1).required(),
  });

  employmentSchema = Joi.object({
    employerName: Joi.string().required().min(3),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    phone: Joi.string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
      .message("Invalid Phone Number"),
    position: Joi.string().required().min(5),
  });

  educationSchema = Joi.object({
    schoolName: Joi.string().required().min(3),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    degree: Joi.string().required().min(3),
  });

  referenceSchema = Joi.object({
    name: Joi.string().required().min(3),
    phoneNumber: Joi.string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
      .message("Invalid Phone Number"),
    relation: Joi.string().required().min(3),
  });

  async loadApplication() {
    console.log(this.props.match.params.Id);
    if (this.props.match.params.Id !== undefined) {
      const url = apiUrl + "/Applications/" + this.props.match.params.Id;
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

  handleValidate = (schema, item) => {
    //VALIDATE
    const results = schema.validate(item, {
      abortEarly: true,
    });

    //IF ERRORS, LOOP
    const errors = {};
    if (results.error)
      for (let item of results.error.details) {
        /*eslint no-useless-escape: "off"*/
        let pattern = /\"\w+\" /gm;
        let msg = item.message.replace(pattern, "");
        msg = msg.charAt(0).toUpperCase() + msg.slice(1);
        msg = msg.replace("Is not allowed to", "Can't");
        errors[item.path[0]] = msg;
        //item.message.replace(/\"\w+\" /gm, "");

        console.log(item.path[0], item.message.replace(pattern, ""));
      }

    return errors;
  };

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
    const errors = this.handleValidate(this.employmentSchema, employerItem);
    console.log("employer add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (Object.keys(errors).length === 0)
      newApplication.employmentHistory.push(employerItem);

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
    newApplication.employmentHistory = newApplication.employment.splice(
      target.idx,
      1
    );
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
    const errors = this.handleValidate(this.educationSchema, educationItem);
    console.log("education add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (Object.keys(errors).length === 0)
      newApplication.education.push(educationItem);
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
    const errors = this.handleValidate(this.referenceSchema, referenceItem);
    console.log("Reference add errors", errors);
    //console.log(errors.error.details);

    //ADD TO LOCAL ARRAY
    if (Object.keys(errors).length === 0)
      newApplication.references.push(referenceItem);
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
      employmentHistory: newApplication.employmentHistory,
      education: newApplication.education,
      references: newApplication.references,
    };

    // //CHECK PERSONAL INFO
    const errors = this.handleValidate(this.appSchema, appItem);
    console.log("validate errors", errors);
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;

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

    await axios
      .post(apiUrl + "/Applications", newApplication)
      .then((response) => {
        console.log("server response:", response);
        if (response.status === 201) {
          console.log("STATUS 201: ", response);
          //const {id} = response.data;
          console.log("applicationId:", response.data.id);
          //<Redirect to={"/applications/new/"+id}/>
          this.props.history.push("/applications/" + response.data.id);
        }
      })
      .catch((error) => {
        console.log("post error:", error.response.data.errors);
      });
  };

  render() {
    //console.log(this.props.match.params);
    return (
      <div>
        {this.props.match.params.Id !== undefined ? (
          <ApplicationView application={this.state.application} />
        ) : (
          <this.NewApplication />
        )}
      </div>
    );
  }
}

export default Application;
