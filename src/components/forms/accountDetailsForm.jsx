import React, { useState } from "react";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import { Form, Alert } from "react-bootstrap";
import JoiSchemas from "../../joiSchemas";
import Formatting from "../../formatting";
import { update } from "../../services/userService";
import logger from "../../services/logService";

export default function AccountDetailsForm({ currentUser }) {
  const [account, setAccount] = useState({
    name: currentUser.name,
    emailAddress: currentUser.emailAddress,
    password: "",
    confirmPassword: "",
    administrator: currentUser.administrator,
  });

  const [updateMessage, setUpdateMessage] = useState({
    visible: false,
    message: "Account info updated successfully",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    //logger.log("change", e.target);
    const { id, value } = e.target;
    //account[e.currentTarget.id] = e.currentTarget.value;
    setAccount({ ...account, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logger.log("state before submit", account);

    //are we updating the password?
    let schema, object;
    if (account.password === "" && account.confirmPassword === "") {
      schema = JoiSchemas.updateUserSchema();
      object = {
        name: account.name,
        emailAddress: account.emailAddress,
      };
    } else {
      schema = JoiSchemas.registerUserSchema();
      object = account;
    }

    //verify first
    const joiErrors = Formatting.formatJoiValidation(schema, object);
    logger.log(joiErrors);
    if (joiErrors.count > 0) return setErrors(joiErrors);
    logger.log("VALIDATED");

    //change button to loading
    setLoading(true);

    //map to update object
    let updateObject = {
      name: account.name,
      emailAddress: account.emailAddress,
      password: account.password,
    };

    //call user service to update
    const updatedUser = await update(currentUser, updateObject);
    logger.log("updatedUser");
    if (updatedUser.status === 200) {
      //SUCCESS
      setUpdateMessage((prevUpdateMessage) => {
        return { ...prevUpdateMessage, visible: true };
      });
    } else {
      //ERROR
      errors.updateError = updatedUser.error;
      setErrors(errors);
    }
    logger.log("updateMessage:", updateMessage);
    setLoading(false);
  };

  return (
    <div className="my-account-box border border-primary rounded p-2">
      <h5 className="mb-0">Account Details</h5>
      <div className="my-account-description">
        Update your email address or password here
      </div>
      <Form noValidate onSubmit={handleSubmit}>
        <TextInput
          type="text"
          name="name"
          label="Your Name"
          onChange={handleChange}
          value={account.name}
          as="div"
          error={errors.name}
        />
        <TextInput
          name="emailAddress"
          onChange={handleChange}
          label="Email Address"
          value={account.emailAddress}
          error={errors.emailAddress}
          as="div"
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          text="Minimum 8 characters"
          onChange={handleChange}
          value={account.password}
          as="div"
          error={errors.password}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleChange}
          value={account.confirmPassword}
          as="div"
          error={errors.confirmPassword}
        />
        <SubmitButton text="Submit" loading={loading} />
        {updateMessage.visible && (
          <Alert variant="success" className="m-1 mt-3">
            {updateMessage.message}
          </Alert>
        )}
        {errors.updateError && (
          <Alert variant="danger" className="m-1 mt-3">
            {errors.updateError}
          </Alert>
        )}
      </Form>
    </div>
  );
}
