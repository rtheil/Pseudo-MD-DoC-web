import React from "react";
import HomePage from "./components/homePage";
import ApplicationsPage from "./components/applicationsPage";
import ApplicationPage from "./components/applicationPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/navBar";
import JobsPage from "./components/jobsPage";
import AllFake from "./components/allFake";
import Footer from "./components/footer";
import LoginPage from "./components/loginPage";
import { connect } from "react-redux";
import AccountPage from "./components/accountPage";
import Testing from "./components/testing";

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

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <div className="Site container pl-0 pr-0">
            <NavBar />
            <Switch>
              <Route path="/testing" component={Testing} />
              <Route path="/fake" component={AllFake} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LoginPage} />
              <Route path="/account" component={AccountPage} />
              <Route path="/applications/new" component={ApplicationPage} />
              <Route path="/applications/:Id" component={ApplicationPage} />
              <Route path="/applications" component={ApplicationsPage} />
              <Route path="/jobs" component={JobsPage} />
              <Route path="/404" />
              <Route path="/" component={HomePage} />
              <Redirect to="/404" />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
