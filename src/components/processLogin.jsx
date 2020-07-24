import React from "react";
import { useHistory } from "react-router-dom";

function ProcessLogin(currentUser, goTo) {
  let history = useHistory();
  history.push(goTo);
  return <React.Fragment />;
}

export default ProcessLogin;
