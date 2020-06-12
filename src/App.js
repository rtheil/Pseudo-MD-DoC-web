import React, { Component } from "react";
import Home from "./components/home";
import Applications from "./components/applications";
//import { render } from "@testing-library/react";

class App extends Component {
  state = {
    mode: "applications",
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state);
  };

  loadApplications = () => {
    this.setState({ mode: "applications" });
    console.log("SET STATE TO APPLICATION");
  };

  render() {
    return (
      <div className="App">
        {this.state.mode === "home" ? (
          <Home loadApplications={this.loadApplications} />
        ) : (
          ""
        )}
        {this.state.mode === "applications" ? <Applications /> : ""}
      </div>
    );
  }
}

export default App;
