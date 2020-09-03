import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import config from "react-global-configuration";

//REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";

const store = createStore(reducer);

//DEV CONFIG
config.set(
  {
    api: { url: "https://localhost:5001/api" },
    helperValues: true,
    consoleLogging: true,
  },
  { freeze: false }
);

//PROD CONFIG
config.set(
  {
    api: { url: "https://md-doc-api.azurewebsites.net/api" },
    helperValues: false,
    consoleLogging: false,
  },
  { environment: "production" }
);

if (process.env.NODE_ENV === "production")
  config.setEnvironment(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
