import React, { Component } from "react";
import NavBar from "./navBar";

class Home extends Component {
  state = {};
  render() {
    return (
      <div style={{ maxWidth: 800 }}>
        <NavBar />
        <div className="row">
          <div className="col-sm">Top Links</div>
          <div className="col-sm">Division of Correction</div>
          <div className="col-sm">Contact Info</div>
        </div>
        <div className="nav-dark">BOTTOM</div>
      </div>
    );
  }
}

export default Home;
