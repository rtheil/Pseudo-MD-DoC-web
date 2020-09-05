import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import config from "react-global-configuration";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
