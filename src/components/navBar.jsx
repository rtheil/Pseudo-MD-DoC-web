import React, { Component } from "react";

class NavBar extends Component {
  /*constructor(props) {
    super(props);
    console.log(this.props);
  }*/
  //state = { data: [{ test: "test" }] };

  logState() {
    //console.log(this.state);
  }

  render() {
    return (
      <div>
        <nav className="nav-dark">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-tiny-link" href="/">
                Maryland.gov
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-tiny-link" href="/">
                Phone Directory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-tiny-link" href="/">
                Site Agencies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-tiny-link" href="/">
                Online Services
              </a>
            </li>
            <li className="nav-item">
              <button
                onClick={this.props.loadApplications}
                className="btn btn-secondary btn-sm"
              >
                Job Postings
              </button>
            </li>
          </ul>
        </nav>
        <div className="nav-image-bar"></div>
        <nav style={{ backgroundColor: "#920807", paddingTop: 4 }}>
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link active">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link">
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link">
                PRETRIAL DETENTION
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link">
                CORRECTIONS
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link">
                PAROLE & PROBATION
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link nav-small-link">
                REHABILITATION
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
