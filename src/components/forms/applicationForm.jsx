import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import TextInput from "../formElements/textInput";
import SelectInput from "../formElements/selectInput";
import ButtonInput from "../formElements/buttonInput";
import SubmitButton from "../formElements/submitButton";
import logger from "../../services/logService";

const MultiMessage = () => (
  <span className="" style={{ fontSize: 10 }}>
    {" "}
    - Fill fields and click + button to add to application
  </span>
);

const ApplicationForm = ({
  state,
  handleSubmit,
  handleChange,
  handleAddEmployment,
  handleRemoveEmployment,
  handleAddEducation,
  handleRemoveEducation,
  handleAddReference,
  handleRemoveReference,
}) => {
  const { newApplication, errors, loading } = state;
  logger.log("error:", errors.error);
  logger.log("state", state);
  return (
    <div className="container-lg mb-5">
      <Form onSubmit={handleSubmit}>
        <div className="p-1 mt-2 app-section-bar">Personal Information</div>
        <Form.Row>
          <TextInput
            name="firstName"
            onChange={handleChange}
            label="First Name"
            value={newApplication.firstName}
            error={errors.firstName}
          />
          <TextInput
            name="middleInitial"
            onChange={handleChange}
            label="MI"
            value={newApplication.middleInitial}
            error={errors.middleInitial}
            size="1"
          />
          <TextInput
            name="lastName"
            onChange={handleChange}
            label="Last Name"
            value={newApplication.lastName}
            error={errors.lastName}
          />
        </Form.Row>
        <Form.Row>
          <TextInput
            name="address"
            onChange={handleChange}
            label="Street Address"
            value={newApplication.address}
            error={errors.address}
          />
          <TextInput
            name="city"
            onChange={handleChange}
            label="City"
            size="2"
            value={newApplication.city}
            error={errors.city}
          />
          <TextInput
            name="state"
            onChange={handleChange}
            label="State"
            value={newApplication.state}
            error={errors.state}
            size="1"
          />
          <TextInput
            name="zipCode"
            onChange={handleChange}
            label="Zip"
            size="1"
            value={newApplication.zipCode}
            error={errors.zipCode}
          />
        </Form.Row>
        <Form.Row>
          <TextInput
            name="homePhone"
            onChange={handleChange}
            label="Home Phone"
            value={newApplication.homePhone}
            error={errors.homePhone}
            size="5"
          />
          <TextInput
            name="cellPhone"
            onChange={handleChange}
            label="Cell Phone"
            value={newApplication.cellPhone}
            error={errors.cellPhone}
            size="5"
          />
        </Form.Row>
        <Form.Row>
          <TextInput
            name="socialSecurityNumber"
            onChange={handleChange}
            label="SSN"
            value={newApplication.socialSecurityNumber}
            error={errors.socialSecurityNumber}
            size="2"
          />
          <SelectInput
            name="isUsCitizen"
            label="US Citizen?"
            value={newApplication.isUsCitizen}
            onChange={handleChange}
          />
          <SelectInput
            name="hasFelony"
            label="Felony Conviction"
            value={newApplication.hasFelony}
            onChange={handleChange}
          />
          <SelectInput
            name="willDrugTest"
            label="Drug Test?"
            value={newApplication.willDrugTest}
            onChange={handleChange}
          />
        </Form.Row>
        <div className="p-1 mt-2 app-section-bar">
          Employment History
          {errors.employment && (
            <span className="ml-3 pl-1 pr-1 rounded form-head-error">
              {errors.employment}
            </span>
          )}
          <MultiMessage />
        </div>
        <Form.Row>
          <ButtonInput
            name="addEmployment"
            text="&nbsp;+&nbsp;"
            label="&nbsp;"
            variant="success"
            size="auto"
            onClick={handleAddEmployment}
          />
          <TextInput
            onChange={handleChange}
            label="Employer Name"
            name="employerName"
            value={newApplication.employerName}
            size="3"
            error={errors.employerName}
          />
          <TextInput
            onChange={handleChange}
            label="Start Date"
            name="employerStartDate"
            type="date"
            value={newApplication.employerStartDate}
            size="2"
            error={errors.employerStartDate}
          />
          <TextInput
            onChange={handleChange}
            label="End Date"
            name="employerEndDate"
            type="date"
            value={newApplication.employerEndDate}
            size="2"
            error={errors.employerEndDate}
          />
          <TextInput
            onChange={handleChange}
            label="Phone Number"
            name="employerPhoneNumber"
            value={newApplication.employerPhoneNumber}
            size="2"
            error={errors.employerPhoneNumber}
          />
          <TextInput
            onChange={handleChange}
            label="Job Title"
            name="employerJobTitle"
            value={newApplication.employerJobTitle}
            size="2"
            error={errors.employerJobTitle}
          />
        </Form.Row>
        <div className="container-lg">
          {state.newApplication.employment !== undefined &&
            state.newApplication.employment.map((item, i) => {
              return (
                <div key={item.employerName + i} className="row mb-1">
                  <div className="ml-1 pl-1">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleRemoveEmployment}
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
        <div className="p-1 mt-2 app-section-bar">
          Education
          {errors.education && (
            <span className="ml-3 pl-1 pr-1 rounded form-head-error">
              {errors.education}
            </span>
          )}
          <MultiMessage />
        </div>
        <Form.Row>
          <ButtonInput
            name="addEducation"
            text="&nbsp;+&nbsp;"
            label="&nbsp;"
            variant="success"
            size="auto"
            onClick={handleAddEducation}
          />
          <TextInput
            name="schoolName"
            onChange={handleChange}
            label="School Name"
            value={newApplication.schoolName}
            error={errors.schoolName}
          />
          <TextInput
            name="schoolStartDate"
            onChange={handleChange}
            label="Start Date"
            type="date"
            value={newApplication.schoolStartDate}
            error={errors.schoolStartDate}
          />
          <TextInput
            name="schoolEndDate"
            onChange={handleChange}
            label="End Date"
            type="date"
            value={newApplication.schoolEndDate}
            error={errors.schoolEndDate}
          />
          <TextInput
            name="schoolDegree"
            onChange={handleChange}
            label="Degree"
            value={newApplication.schoolDegree}
            error={errors.schoolDegree}
          />
          <div className="container-lg">
            {state.newApplication.education !== undefined &&
              state.newApplication.education.map((item, i) => {
                return (
                  <div key={item.schoolName + i} className="row mb-1">
                    <div className="ml-1 pl-1">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleRemoveEducation}
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
        <div className="p-1 mt-2 app-section-bar">
          References
          {errors.references && (
            <span className="ml-3 pl-1 pr-1 rounded form-head-error">
              {errors.references}
            </span>
          )}
          <MultiMessage />
        </div>
        <Form.Row>
          <ButtonInput
            name="addReference"
            text="&nbsp;+&nbsp;"
            label="&nbsp;"
            variant="success"
            size="auto"
            onClick={handleAddReference}
          />
          <TextInput
            name="referenceName"
            onChange={handleChange}
            label="Name"
            value={newApplication.referenceName}
            error={errors.name}
          />
          <TextInput
            name="referencePhoneNumber"
            onChange={handleChange}
            label="Phone Number"
            value={newApplication.referencePhoneNumber}
            error={errors.phoneNumber}
          />
          <TextInput
            name="referenceRelation"
            onChange={handleChange}
            label="Relation"
            value={newApplication.referenceRelation}
            error={errors.relation}
          />
          <div className="container-lg">
            {state.newApplication.references !== undefined &&
              state.newApplication.references.map((item, i) => {
                return (
                  <div key={item.referenceName + "_" + i} className="row mb-1">
                    <div className="ml-1 pl-1">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleRemoveReference}
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
        {errors.count > 0 && (
          <Alert variant="danger">
            <strong>One or more errors</strong>
            <br />
            {Object.keys(errors).map((error, i) => {
              return (
                <React.Fragment key={i}>
                  {error !== "count" && (
                    <>
                      -{errors[error]}
                      <br />
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </Alert>
        )}
        <SubmitButton text="Submit" loading={loading} />
      </Form>
    </div>
  );
};

export default ApplicationForm;
