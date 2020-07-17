import React, { Component } from "react";
import Home from "./components/home";
import Applications from "./components/applications";
import Application from "./components/application";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/navBar";

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
      <div>
        <Router>
          <div className="App">
            <NavBar />
            {/* <NavBar /> */}
            <Switch>
              <Route path="/applications/new" component={Application} />
              <Route path="/applications/:Id" component={Application} />
              <Route path="/applications" component={Applications} />
              <Route path="/404" />
              <Route path="/" component={Home} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
