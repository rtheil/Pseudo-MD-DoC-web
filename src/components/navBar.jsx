import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function NavBar(props) {
  const { currentUser } = props;
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
      <Navbar
        expand="md"
        className="font-weight-bold pt-0 pb-0 navbar-dark"
        style={{ backgroundColor: "#920807" }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav1 navbar-dark">
          <span className="navbar-toggler-icon"></span>
          <span className="text-white"> Main Menu</span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav1">
          <Nav fill className="nav container mr-auto">
            <Nav.Item>
              <Link to="/" className="nav-small-link">
                HOME
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fake" className="nav-small-link">
                ABOUT
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fake" className="nav-small-link">
                PRETRIAL DETENTION
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fake" className="nav-small-link">
                CORRECTIONS
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fake" className="nav-small-link">
                PAROLE & PROBATION
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fake" className="nav-small-link">
                REHABILITATION
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default connect(mapStateToProps)(NavBar);
