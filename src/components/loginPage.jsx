import React, { Component } from "react";
import LoginBox from "./loginBox";
//import { useHistory } from "react-router-dom";

class LoginPage extends Component {
  state = {};
  render() {
    //console.log("loginPage history", this.props.history);
    return (
      <div className="d-flex justify-content-center">
        <div
          className="border border-secondary rounded d-flex justify-content-center container-fluid m-3"
          style={{ width: 400 }}
        >
          <div className="container text-left pb-3">
            <LoginBox history={this.props.history} match={this.props.match} />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
