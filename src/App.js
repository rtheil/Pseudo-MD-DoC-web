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
import LoginPage from "./components/loginPage";
import { connect } from "react-redux";
import AccountPage from "./components/accountPage";

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (userObj) => {
      dispatch({ type: "SET_USER", payload: userObj });
    },
  };
}

class App extends Component {
  state = {};

  componentDidMount = () => {};

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state);
  };

  loadApplications = () => {
    this.setState({ mode: "applications" });
    console.log("SET STATE TO APPLICATION");
  };

  render() {
    //console.log("App.js props:", this.props.currentUser);
    return (
      <div>
        <Router>
          <div className="App">
            <div className="Site container pl-0 pr-0">
              <NavBar />
              <Switch>
                <Route path="/fake" component={AllFake} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LoginPage} />
                <Route path="/account" component={AccountPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
