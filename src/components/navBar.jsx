import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function NavBar(props) {
  console.log("navbar props:", props);
  const currentUser = { ...props.currentUser };
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
        <div
          className="border rounded mr-3 pl-1 pr-1"
          style={{ backgroundColor: "white", width: 150, height: 100 }}
        >
          <div className="badge badge-dark container">Your Account</div>
          <br />
          <ul className="nav flex-column">
            {
              //ADMINISTRATORS
              currentUser.administrator && (
                <>
                  <li className="nav-item">
                    <Link to="/applications" className="my-account-link">
                      All Applications
                    </Link>
                  </li>
                </>
              )
            }
            {
              //ALL LOGGED IN USERS
              currentUser.token !== undefined && (
                <>
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
                </>
              )
            }
            {
              //LOGGED OUT USER
              currentUser.token === undefined && (
                <>
                  <span className="" style={{ fontSize: 12 }}>
                    You are not logged in
                  </span>
                  <li className="nav-item">
                    <Link to="/login" className="my-account-link">
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login/register" className="my-account-link">
                      Register
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
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

export default connect(mapStateToProps)(NavBar);
