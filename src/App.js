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
import Jobs from "./components/jobs";
import AllFake from "./components/allFake";
import Footer from "./components/footer";
import LoginBox from "./components/loginBox";

class App extends Component {
  state = {};

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
            <div className="Site container">
              <NavBar />
              <Switch>
                <Route path="/fake" component={AllFake} />
                <Route path="/login" component={LoginBox} />
                <Route path="/applications/new" component={Application} />
                <Route path="/applications/:Id" component={Application} />
                <Route path="/applications" component={Applications} />
                <Route path="/jobs" component={Jobs} />
                <Route path="/404" />
                <Route path="/" component={Home} />
                <Redirect to="/404" />
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
