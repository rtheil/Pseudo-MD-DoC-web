import React, { useState, useEffect } from "react";
import config from "react-global-configuration";
import { Form, Alert } from "react-bootstrap";
import { register, verifyRegisterToken } from "../../services/userService";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import Formatting from "../../formatting";
import JoiSchemas from "../../joiSchemas";
import LoadingMessage from "../loadingMessage";
import logger from "../../services/logService";

export default function RegisterForm({ match }) {
  const [createInfo, setCreateInfo] = useState({
    name: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [createForm, setCreateForm] = useState({
    formVisible: true,
    successMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { token } = match.params;

  useEffect(() => {
    if (config.get("helperValues")) {
      setCreateInfo({
        name: "Test Name",
        emailAddress: "test@test.com",
        password: "r5Y@m6#Bj3XS7ttY",
        confirmPassword: "r5Y@m6#Bj3XS7ttY",
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token !== undefined) {
        setLoading(true);
        const verified = await verifyRegisterToken(token);
        if (verified) {
          setCreateForm({
            formVisible: false,
            successMessage:
              "Your account has been successfully verified. You may now proceed to the login page.",
          });
        } else {
          logger.log("verified:", verified);
          setErrors({
            registerError: "Could not verify account. Invalid Token.",
          });
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleCreateChange = (e) => {
    const { id, value } = e.target;
    setCreateInfo({ ...createInfo, [id]: value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    //clear errors
    setErrors({});

    const joiErrors = Formatting.formatJoiValidation(
      JoiSchemas.registerUserSchema(),
      createInfo
    );
    if (joiErrors.confirmPassword !== undefined)
      joiErrors.confirmPassword = "Passwords do not match";
    logger.log("Joi errors:", joiErrors);

    if (joiErrors.count > 0) {
      setErrors(joiErrors);
    } else {
      setLoading(true);
      const registerInfo = { ...createInfo };
      delete registerInfo.confirmPassword;
      const newUser = await register(registerInfo);

      //check response
      if (newUser.status === 201) {
        //SUCCESS
        //createForm.formVisible = false;
        setCreateForm({
          formVisible: false,
          successMessage:
            "Account created successfully. Please check your email to verify your account.",
        });
      } else {
        setErrors({ registerError: newUser.error });
      }
    }

    //done loading
    setLoading(false);
  };

  logger.log("render errors", errors);
  return (
    <>
      {loading && token !== undefined && <LoadingMessage />}
      {!createForm.formVisible && (
        <Alert variant="success" className="m-1 mt-3">
          <strong>{createForm.successMessage}</strong>
        </Alert>
      )}
      {createForm.formVisible && token === undefined && (
        <>
          <strong>Create Account</strong>
          <Form onSubmit={handleCreateSubmit} className="mt-2">
            <TextInput
              type="text"
              name="name"
              label="Your Name"
              onChange={handleCreateChange}
              value={createInfo.name}
              as="div"
              error={errors.name}
            />
            <TextInput
              type="email"
              name="emailAddress"
              label="Email Address"
              onChange={handleCreateChange}
              value={createInfo.emailAddress}
              as="div"
              error={errors.emailAddress}
            />
            <TextInput
              type="password"
              name="password"
              label="Password"
              text="Minimum 8 characters"
              onChange={handleCreateChange}
              value={createInfo.password}
              as="div"
              error={errors.password}
            />
            <TextInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={handleCreateChange}
              value={createInfo.confirmPassword}
              as="div"
              error={errors.confirmPassword}
            />
            <SubmitButton text="Submit" loading={loading} />
          </Form>
        </>
      )}
      {errors.registerError && errors.registerError !== "" && (
        <Alert variant="danger" className="m-1 mt-3">
          <strong>Error</strong>
          <br />
          {errors.registerError}
        </Alert>
      )}
    </>
  );
}
