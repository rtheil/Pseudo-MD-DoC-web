import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Joi from "@hapi/joi";
import Axios from "axios";
import config from "react-global-configuration";
import { connect } from "react-redux";

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

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        emailAddress: "rtheil@codirt.com",
        password: "r5Y@m6#Bj3XS7ttY",
      },
    };
  }

  loginSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8),
    saveInfo: Joi.boolean(),
  });

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.authenticate();
  };

  async authenticate() {
    //const { cookies } = this.props;
    console.log("login details:", this.state.loginInfo);
    await Axios.post(
      config.get("api.url") + "/users/authenticate",
      this.state.loginInfo
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("server response:", response);
          const currentUser = response.data;

          //LOCAL STATE
          this.setState({ currentUser });
          console.log(this.state);

          //REDUX STORE
          this.props.setUser(this.state.currentUser);
          console.log("authenticate props", this.props.currentUser);

          //MOVE ON TO HOME PAGE (CHANGE TO PREVIOUS PAGE)
          this.props.history.push("/");
        } else {
          console.log(
            "Authentication received response other than 200",
            response
          );
        }
      })
      .catch((error) => {
        console.log(error.response);
        //const { message } = error.response.data;
        const message = "";
        if (message !== undefined) console.log("Error Message:", message);
        else {
          console.log("post error:", error.response.data.errors);
          console.log(error.response.data.errors.Password[0]); //"The Password field is required."
        }
        return;
      });
    //this.goAccount();
  }

  forgotSchema = Joi.object({
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  handleForgotSubmit = (e) => {
    const { loginInfo } = this.state;
    e.preventDefault();
    console.log("submit forgot password clicked", loginInfo);
  };

  createSchema = Joi.object({
    accountName: Joi.string().min(5).max(30).required(),
    emailAddress: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{8,}$/)
      .message(
        "Password must be at least 8 characters long, and have at least one uppercate letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: Joi.string().min(8).required(),
  });

  handleCreateSubmit = (e) => {
    const { loginInfo } = this.state;
    e.preventDefault();
    console.log("submit create account clicked", this.state.loginInfo);
    const results = this.createSchema.validate(loginInfo, { abortEarly: true });
    console.log("Joi errors:", results.error.details);
  };

  handleChange = (e) => {
    const loginInfo = { ...this.state.loginInfo };
    if (e.currentTarget.type === "checkbox")
      loginInfo[e.currentTarget.id] = e.currentTarget.checked;
    else loginInfo[e.currentTarget.id] = e.currentTarget.value;
    //console.log(e.currentTarget);
    //console.log("new state:", loginInfo);
    this.setState({ loginInfo });
  };

  loginForm = () => {
    const { loginInfo } = this.state;
    console.log("loginForm props.currentUser:", this.props.currentUser);
    return (
      <React.Fragment>
        <strong>Log in to your account</strong>
        <Form onSubmit={this.handleLoginSubmit} className="mt-2">
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={loginInfo.password}
            />
            <Form.Text>
              <Link to="/login/create">Create an account</Link> -{" "}
              <Link to="/login/forgot">Forgot my password</Link>
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="saveInfo">
            <Form.Check
              type="checkbox"
              label="Save my login info"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  forgotForm = () => {
    const { loginInfo } = this.state;
    return (
      <React.Fragment>
        <strong>Forgot Password</strong>
        <Form onSubmit={this.handleForgotSubmit} className="mt-2">
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  createForm = () => {
    const { loginInfo } = this.state;
    return (
      <React.Fragment>
        <strong>Create Account</strong>
        <Form onSubmit={this.handleCreateSubmit} className="mt-2">
          <Form.Group controlId="accountName">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              onChange={this.handleChange}
              value={loginInfo.accountName}
            />
          </Form.Group>
          <Form.Group controlId="emailAddress">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={loginInfo.emailAddress}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={loginInfo.password}
            />
            <Form.Text>Minimum 8 characters</Form.Text>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={loginInfo.confirmPassword}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  };

  render() {
    const { history, match, currentUser, setUser } = this.props;
    console.log("loginBox match:", match);
    console.log("loginBox currentUser:", currentUser);
    //console.log(this.props.history);
    //LOG USER OUT
    if (match.path === "/logout") {
      setUser({});
      history.push("/");
    }
    //IF USER LOGGED IN, GO ELSEWHERE
    if (this.props.currentUser.token !== undefined) history.push("/");
    return (
      <Router>
        <Switch>
          <Route path="/login/forgot" component={this.forgotForm} />
          <Route path="/login/create" component={this.createForm} />
          <Route path="/login" component={this.loginForm} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
//export default LoginBox;
