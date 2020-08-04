import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { login } from "../../services/userService";
import TextInput from "../formElements/textInput";
import SubmitButton from "../formElements/submitButton";

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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        emailAddress: "rtheil@codirt.com",
        password: "r5Y@m6#Bj3XS7ttY",
      },
      errors: {},
      loading: false,
    };
    const { match } = this.props;
    console.log("match:", match);
    //LOG USER OUT
    if (match.path === "/logout") {
      this.handleLogout();
    }
    this.handleLogin();
  }

  componentDidUpdate() {
    this.handleLogin();
  }

  handleLogout() {
    const { history, setUser } = this.props;
    setUser({});
    history.push("/");
  }

  handleLogin() {
    const { history, currentUser } = this.props;
    if (currentUser.token !== undefined) history.push("/");
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();

    //CHANGE BUTTON
    this.setState({ loading: true });

    //FAKE DELAY
    setTimeout(async () => {
      //CALL USER SERVICE
      const currentUser = await login(this.state.loginInfo);
      //console.log("post-login currentUser:", currentUser);
      if (currentUser.token === undefined) {
        let errors = { loginError: "Incorrect Email or Password" };
        this.setState({ errors, loading: false });
      }
      //UPDATE REDUX
      else this.props.setUser(currentUser);
    }, 0);
  };

  handleLoginChange = (e) => {
    const loginInfo = { ...this.state.loginInfo };
    if (e.currentTarget.type === "checkbox")
      loginInfo[e.currentTarget.id] = e.currentTarget.checked;
    else loginInfo[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ loginInfo });
  };

  render() {
    const { loginInfo, errors, loading, validated } = this.state;
    console.log("loginForm props.currentUser:", this.props.currentUser);
    return (
      <React.Fragment>
        <strong>Log in to your account</strong>
        <Form
          noValidate
          validated={validated}
          onSubmit={this.handleLoginSubmit}
          className="mt-2"
        >
          <TextInput
            type="email"
            name="emailAddress"
            label="Email Address"
            onChange={this.handleLoginChange}
            value={loginInfo.emailAddress}
            col="div"
            error={errors.loginError}
            required={true}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            onChange={this.handleLoginChange}
            value={loginInfo.password}
            col="div"
          />
          <Form.Group controlId="saveInfo">
            <Form.Check
              type="checkbox"
              label="Save my login info"
              onChange={this.handleLoginChange}
            />
          </Form.Group>
          <SubmitButton text="Submit" loading={loading} />
          <Form.Text>
            <Link to="/login/register">Create an account</Link> -{" "}
            <Link to="/login/forgot">Forgot my password</Link>
          </Form.Text>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
