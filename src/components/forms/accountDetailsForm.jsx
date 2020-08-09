import React from "react";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import { Form, Alert } from "react-bootstrap";

const AccountDetailsForm = ({
  onChange,
  onSubmit,
  account,
  errors,
  loading,
  updateMessage,
}) => {
  return (
    <div className="my-account-box border border-primary rounded p-2">
      <h5 className="mb-0">Account Details</h5>
      <div className="my-account-description">
        Update your email address or password here
      </div>
      <Form noValidate onSubmit={onSubmit}>
        <TextInput
          type="text"
          name="name"
          label="Your Name"
          onChange={onChange}
          value={account.name}
          col="div"
          error={errors.name}
        />
        <TextInput
          name="emailAddress"
          onChange={onChange}
          label="Email Address"
          value={account.emailAddress}
          error={errors.emailAddress}
          col="div"
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          text="Minimum 8 characters"
          onChange={onChange}
          value={account.password}
          col="div"
          error={errors.password}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          onChange={onChange}
          value={account.confirmPassword}
          col="div"
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
};

export default AccountDetailsForm;
