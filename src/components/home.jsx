import React, { Component } from "react";
import NavBar from "./navBar";

class Home extends Component {
  /*constructor(props) {
    super(props);
    console.log(this.props);
  }*/

  handleClick = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick} className="btn btn-sm">
          TEST
        </button>
        <NavBar loadApplications={this.props.loadApplications} />
      </div>
    );
  }
}
/*
      <div style={{ maxWidth: 800 }}>
        <NavBar />
        <div className="row">
          <div className="col-sm">Top Links</div>
          <div className="col-sm">Division of Correction</div>
          <div className="col-sm">Contact Info</div>
        </div>
        <div className="nav-dark">{this.props.foo}</div>
      </div>
*/
export default Home;
