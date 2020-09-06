import React, { useEffect, useState } from "react";
import config from "react-global-configuration";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { login } from "../../services/userService";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";
import logger from "../../services/logService";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (userObj) => {
      dispatch({ type: "SET_USER", payload: userObj });
    },
  };
}

function LoginForm({ history, currentUser, match, setUser }) {
  const [loginInfo, setLoginInfo] = useState({
    emailAddress: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config.get("helperValues"))
      setLoginInfo({
        emailAddress: "rtheil@codirt.com",
        password: "r5Y@m6#Bj3XS7ttY",
      });
    // const autoLogin = true;
    // if (autoLogin) handleLoginSubmit(null);
  }, []);

  useEffect(() => {
    if (match.path === "/logout") {
      handleLogout();
    }
    handleLogin();
  });

  function handleLogin() {
    if (currentUser.token !== undefined) {
      if (currentUser.administrator) history.push("/applications");
      else history.push("/account");
    }
  }

  function handleLogout() {
    setUser({});
    history.push("/");
  }

  const handleLoginChange = (e) => {
    //if (e.currentTarget.type === "checkbox")
    //loginInfo[e.currentTarget.id] = e.currentTarget.checked;

    const { id, value } = e.target;
    setLoginInfo({ ...loginInfo, [id]: value });
  };

  const handleLoginSubmit = async (e) => {
    if (e !== null) e.preventDefault();

    //CHANGE BUTTON
    setLoading(true);

    //FAKE DELAY
    setTimeout(async () => {
      //CALL USER SERVICE
      const response = await login(loginInfo);
      logger.log("post-login currentUser:", response);
      if (response.data && response.data.token) setUser(response.data);
      else {
        logger.log("login errors", response.error);
        setErrors({ loginError: response.error });
        setLoading(false);
      }
    }, 0);
  };

  return (
    <>
      <strong>Log in to your account</strong>
      <Form onSubmit={handleLoginSubmit} className="mt-2">
        <TextInput
          type="email"
          name="emailAddress"
          label="Email Address"
          onChange={handleLoginChange}
          value={loginInfo.emailAddress}
          col="div"
          required={true}
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          onChange={handleLoginChange}
          value={loginInfo.password}
          col="div"
        />
        <Form.Group controlId="saveInfo">
          <Form.Check
            type="checkbox"
            label="Save my login info"
            onChange={handleLoginChange}
          />
        </Form.Group>
        {errors.loginError && (
          <Alert variant="danger">{errors.loginError}</Alert>
        )}
        <SubmitButton text="Submit" loading={loading} />
        <Form.Text>
          <Link to="/login/register">Create an account</Link> -{" "}
          <Link to="/login/forgot">Forgot my password</Link>
        </Form.Text>
      </Form>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
