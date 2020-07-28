import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class NavBar extends Component {
  render() {
    console.log("navbar:", this.props);
    return (
      <div>
        <nav className="nav-dark">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-tiny-link" to="/fake">
                Maryland.gov
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/fake">
                Phone Directory
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/fake">
                Site Agencies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/fake">
                Online Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/jobs">
                Job Postings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-image-bar d-flex justify-content-end align-items-center">
          {/* {this.props.currentUser.administrator === true && ( */}
          <div
            className="border rounded mr-3 pl-1 pr-1"
            style={{ backgroundColor: "white", width: 150, height: 100 }}
          >
            <div className="badge badge-dark container">Your Account</div>
            <br />
            <ul className="nav flex-column">
              {
                //ADMINISTRATORS
                this.props.currentUser.administrator && (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link to="/applications" className="my-account-link">
                        Job Applications
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link to="/applications/new" className="my-account-link">
                        New Application
                      </Link>
                    </li> */}
                  </React.Fragment>
                )
              }
              {
                //NON-ADMINISTRATORS
                this.props.currentUser.administrator === false && (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link className="my-account-link" to="/applications">
                        My Applications
                      </Link>
                    </li>
                  </React.Fragment>
                )
              }
              {
                //ALL LOGGED IN USERS
                this.props.currentUser.token !== undefined && (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link className="my-account-link" to="/account">
                        Account Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="my-account-link" to="/logout">
                        Logout
                      </Link>
                    </li>
                  </React.Fragment>
                )
              }
              {
                //LOGGED OUT USER
                this.props.currentUser.token === undefined && (
                  <React.Fragment>
                    <span className="" style={{ fontSize: 12 }}>
                      You are not logged in
                    </span>
                    <li className="nav-item">
                      <Link to="/login" className="my-account-link">
                        Log in
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login/create" className="my-account-link">
                        Register
                      </Link>
                    </li>
                  </React.Fragment>
                )
              }
            </ul>
          </div>
          {/* )} */}
        </div>
        <nav style={{ backgroundColor: "#920807", paddingTop: 4 }}>
          <ul className="nav nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link active">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake" className="nav-link nav-small-link">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake" className="nav-link nav-small-link">
                PRETRIAL DETENTION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake" className="nav-link nav-small-link">
                CORRECTIONS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake" className="nav-link nav-small-link">
                PAROLE & PROBATION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fake" className="nav-link nav-small-link">
                REHABILITATION
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
