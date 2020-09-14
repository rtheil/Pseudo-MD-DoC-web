import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../../services/userService";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import Formatting from "../../formatting";
import JoiSchemas from "../../joiSchemas";
import LoadingMessage from "../loadingMessage";
import logger from "../../services/logService";

export default function ForgotForm({ match }) {
  const [forgotInfo, setForgotInfo] = useState({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [forgotForm, setForgotForm] = useState({
    formVisible: true,
    successMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const forgotPasswordSuccessMessage = (
    <>
      <strong>Thank you</strong>
      <br />
      <br /> If the email address you entered is registered to an account, you
      will receive an email with instructions on how to reset your password.
    </>
  );
  const resetPasswordSuccessMessage = (
    <>
      <strong>Thank you</strong>
      <br />
      <br /> Your password has been reset successfully. Please proceed log in.
    </>
  );

  const token = match.params.token;

  useEffect(() => {
    const fetchData = async () => {
      if (token !== undefined) {
        setLoading(true);
        setForgotForm((prev) => {
          return { ...prev, formVisible: false };
        });
        logger.log(token);
        const isGood = await verifyResetToken(token);
        if (!isGood) {
          setErrors({ forgotError: "Invalid Password Reset Token" });
          setForgotForm((prevForgotForm) => {
            return { ...prevForgotForm, formVisible: false };
          });
        } else
          setForgotForm((prev) => {
            return { ...prev, formVisible: true };
          });
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleForgotChange = (e) => {
    const { id, value } = e.target;
    setForgotInfo({ ...forgotInfo, [id]: value });
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    let forgotStatus, successMessage;
    if (forgotInfo.token !== "") {
      //TOKEN EXISTS, ASK API TO UPDATE PASSWORD
      successMessage = resetPasswordSuccessMessage;

      //Validate with JOI
      const newPassword = {
        password: forgotInfo.password,
        confirmPassword: forgotInfo.confirmPassword,
      };
      const joiErrors = Formatting.formatJoiValidation(
        JoiSchemas.resetPasswordSchema(),
        newPassword
      );
      if (joiErrors.confirmPassword !== undefined)
        joiErrors.confirmPassword = "Passwords do not match";
      logger.log(joiErrors);
      if (joiErrors.count > 0) return setErrors(joiErrors);

      setLoading(true);

      //Submit to API
      forgotStatus = await resetPassword({
        token: forgotInfo.token,
        password: forgotInfo.password,
      });
    } else {
      //No token, ask API to send password email
      successMessage = forgotPasswordSuccessMessage;

      //Validate with JOI
      const joiErrors = Formatting.formatJoiValidation(
        JoiSchemas.emailAddress,
        {
          emailAddress: forgotInfo.emailAddress,
        }
      );
      logger.log(joiErrors);
      if (joiErrors.count > 0) return setErrors(joiErrors);

      setLoading(true);

      //Submit to API
      forgotStatus = await forgotPassword({
        emailAddress: forgotInfo.emailAddress,
      });
    }

    //PROCESS RESPONSE
    if (forgotStatus.status === 200) {
      setForgotForm({ formVisible: false, successMessage: successMessage });
    } else {
      setErrors({ forgotError: forgotStatus.error });
    }

    setLoading(false);
  };

  if (token !== undefined) {
    logger.log("token:", token);
    forgotInfo.token = token;
    return (
      <>
        {!forgotForm.formVisible && loading && <LoadingMessage />}
        {!forgotForm.formVisible && forgotForm.successMessage !== "" && (
          <Alert variant="success" className="mt-3">
            {forgotForm.successMessage}
          </Alert>
        )}
        {forgotForm.formVisible && (
          <>
            <strong>Reset Password</strong>
            <Form onSubmit={handleForgotSubmit} className="mt-2">
              <TextInput
                type="password"
                name="password"
                label="New Password"
                text="Minimum 8 characters"
                onChange={handleForgotChange}
                value={forgotInfo.password}
                as="div"
                error={errors.password}
              />
              <TextInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleForgotChange}
                value={forgotInfo.confirmPassword}
                as="div"
                error={errors.confirmPassword}
              />
              <Form.Control
                type="hidden"
                name="token"
                onChange={handleForgotChange}
                value={forgotInfo.token}
              />
              <SubmitButton text="Submit" loading={loading} />
            </Form>
          </>
        )}
        {errors.forgotError && errors.forgotError !== "" && (
          <Alert variant="danger" className="mt-3">
            {errors.forgotError}
          </Alert>
        )}
      </>
    );
  } else {
    logger.log(forgotInfo);
    return (
      <>
        {!forgotForm.formVisible && forgotForm.successMessage !== "" && (
          <Alert variant="success" className="mt-3">
            {forgotForm.successMessage}
          </Alert>
        )}
        {forgotForm.formVisible && (
          <>
            <strong>Forgot Password</strong>
            <Form onSubmit={handleForgotSubmit} className="mt-2">
              <TextInput
                type="email"
                name="emailAddress"
                label="Email Address"
                onChange={handleForgotChange}
                value={forgotInfo.emailAddress}
                as="div"
                error={errors.emailAddress}
              />
              <SubmitButton text="Submit" loading={loading} />
            </Form>
          </>
        )}
        {errors.forgotError && errors.forgotError !== "" && (
          <Alert variant="danger" className="mt-3">
            {errors.forgotError}
          </Alert>
        )}
      </>
    );
  }
}
