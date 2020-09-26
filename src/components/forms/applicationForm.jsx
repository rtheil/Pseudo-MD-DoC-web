import React from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import TextInput from "../formElements/textInput";
import SelectInput from "../formElements/selectInput";
import ButtonInput from "../formElements/buttonInput";
import SubmitButton from "../formElements/submitButton";
import logger from "../../services/logService";

const MultiMessage = () => (
  <span className="" style={{ fontSize: 10 }}>
    {" "}
    Fill fields and click + button to add to application
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
    <Container className="mb-5">
      <Form onSubmit={handleSubmit}>
        <Row className="pl-3 p-1 mt-2 app-section-bar">
          Personal Information
        </Row>
        <Row xs={1} lg={3}>
          <TextInput
            name="firstName"
            onChange={handleChange}
            label="First Name"
            value={newApplication.firstName}
            error={errors.firstName}
            as={Form.Col}
          />
          <TextInput
            name="middleInitial"
            onChange={handleChange}
            label="MI"
            value={newApplication.middleInitial}
            error={errors.middleInitial}
            as={Form.Col}
          />
          <TextInput
            name="lastName"
            onChange={handleChange}
            label="Last Name"
            value={newApplication.lastName}
            error={errors.lastName}
            as={Form.Col}
          />
        </Row>
        <Row>
          <TextInput
            name="address"
            onChange={handleChange}
            label="Street Address"
            value={newApplication.address}
            error={errors.address}
            as={Form.Col}
          />
          <TextInput
            name="city"
            onChange={handleChange}
            label="City"
            value={newApplication.city}
            error={errors.city}
            as={Form.Col}
          />
          <TextInput
            name="state"
            onChange={handleChange}
            label="State"
            value={newApplication.state}
            error={errors.state}
            as={Form.Col}
          />
          <TextInput
            name="zipCode"
            onChange={handleChange}
            label="Zip"
            value={newApplication.zipCode}
            error={errors.zipCode}
            as={Form.Col}
          />
        </Row>
        <Row>
          <TextInput
            name="homePhone"
            onChange={handleChange}
            label="Home Phone"
            value={newApplication.homePhone}
            error={errors.homePhone}
            size="5"
            as={Col}
          />
          <TextInput
            name="cellPhone"
            onChange={handleChange}
            label="Cell Phone"
            value={newApplication.cellPhone}
            error={errors.cellPhone}
            size="5"
            as={Col}
          />
        </Row>
        <Row>
          <TextInput
            name="socialSecurityNumber"
            onChange={handleChange}
            label="SSN"
            value={newApplication.socialSecurityNumber}
            error={errors.socialSecurityNumber}
            size="2"
            as={Col}
          />
          <SelectInput
            name="isUsCitizen"
            label="Are you a US citizen?"
            value={newApplication.isUsCitizen}
            onChange={handleChange}
            error={errors.isUsCitizen}
            as={Col}
          />
          <SelectInput
            name="hasFelony"
            label="Do you have a felony conviction?"
            value={newApplication.hasFelony}
            onChange={handleChange}
            error={errors.hasFelony}
            as={Col}
          />
          <SelectInput
            name="willDrugTest"
            label="Will you take a drug test?"
            value={newApplication.willDrugTest}
            onChange={handleChange}
            error={errors.willDrugTest}
            as={Col}
          />
        </Row>
        <Row className="p-1 mt-2 app-section-bar row-cols-1">
          Employment History
          {errors.employment && (
            <Alert variant="danger" className="p-0 m-0">
              {errors.employment}
            </Alert>
          )}
          <MultiMessage />
        </Row>
        <Row>
          <Col sm={1}>
            <ButtonInput
              name="addEmployment"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="sm"
              onClick={handleAddEmployment}
            />
          </Col>
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
            error={errors.position}
          />
        </Row>
        {state.newApplication.employment !== undefined &&
          state.newApplication.employment.map((item, i) => {
            return (
              <Row key={item.employerName + i} className="">
                <Col className="">
                  <ButtonInput
                    name="deleteEmployment"
                    text="&nbsp;X&nbsp;"
                    label=""
                    variant="danger"
                    size="sm"
                    onClick={handleRemoveEmployment}
                    idx={i}
                  ></ButtonInput>
                </Col>
                <Col className="col-sm-3">{item.employerName}</Col>
                <Col className="col-sm-2">{item.startDate}</Col>
                <Col className="col-sm-2">{item.endDate}</Col>
                <Col className="col-sm-2">{item.phone}</Col>
                <Col className="col-sm-2">{item.position}</Col>
              </Row>
            );
          })}
        <Row className="p-1 mt-2 app-section-bar row-cols-1">
          Education
          {errors.education && (
            <Alert variant="danger" className="p-0 m-0">
              {errors.education}
            </Alert>
          )}
          <MultiMessage />
        </Row>
        <Row>
          <Col sm={1}>
            <ButtonInput
              name="addEducation"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="sm"
              onClick={handleAddEducation}
            />
          </Col>
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
            error={errors.degree}
          />
          <div className="container-lg">
            {state.newApplication.education !== undefined &&
              state.newApplication.education.map((item, i) => {
                return (
                  <Row key={item.schoolName + i} className="">
                    <Col sm={1} className="">
                      <ButtonInput
                        name="deleteEducation"
                        text="&nbsp;X&nbsp;"
                        label=""
                        variant="danger"
                        size="sm"
                        onClick={handleRemoveEducation}
                        idx={i}
                      ></ButtonInput>
                    </Col>
                    <Col className="col">{item.schoolName}</Col>
                    <Col className="col">{item.startDate}</Col>
                    <Col className="col">{item.endDate}</Col>
                    <Col className="col">{item.degree}</Col>
                  </Row>
                );
              })}
          </div>
        </Row>
        <Row className="p-1 mt-2 app-section-bar row-cols-1">
          References
          {errors.references && (
            <Alert variant="danger" className="p-0 m-0">
              {errors.references}
            </Alert>
          )}
          <MultiMessage />
        </Row>
        <Row>
          <Col sm={1}>
            <ButtonInput
              name="addReference"
              text="&nbsp;+&nbsp;"
              label="&nbsp;"
              variant="success"
              size="sm"
              onClick={handleAddReference}
            />
          </Col>
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
            error={errors.referencePhoneNumber}
          />
          <TextInput
            name="referenceRelation"
            onChange={handleChange}
            label="Relation"
            value={newApplication.referenceRelation}
            error={errors.relation}
          />
        </Row>
        {state.newApplication.references !== undefined &&
          state.newApplication.references.map((item, i) => {
            return (
              <Row key={item.referenceName + "_" + i} className="">
                <Col sm={1} className="">
                  <ButtonInput
                    name="deleteReference"
                    text="&nbsp;X&nbsp;"
                    label=""
                    variant="danger"
                    size="sm"
                    onClick={handleRemoveReference}
                    idx={i}
                  ></ButtonInput>
                </Col>
                <Col className="col">{item.name}</Col>
                <Col className="col">{item.phoneNumber}</Col>
                <Col className="col">{item.relation}</Col>
              </Row>
            );
          })}
        <Row className="p-1 mt-2 mb-2 app-section-bar row-cols-1">
          Review and Submit
        </Row>
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
        {errors && errors.addApp && (
          <Alert variant="danger" className="mt-2">
            <strong>Error:</strong> {errors.addApp}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default ApplicationForm;
