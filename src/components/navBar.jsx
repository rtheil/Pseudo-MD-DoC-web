import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="nav-dark">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-tiny-link" to="/">
                Maryland.gov
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/">
                Phone Directory
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/">
                Site Agencies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/">
                Online Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-tiny-link" to="/applications">
                Job Postings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-image-bar"></div>
        <nav style={{ backgroundColor: "#920807", paddingTop: 4 }}>
          <ul className="nav nav-fill">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link active">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link">
                PRETRIAL DETENTION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link">
                CORRECTIONS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link">
                PAROLE & PROBATION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link nav-small-link">
                REHABILITATION
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
