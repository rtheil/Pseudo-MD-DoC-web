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
//console.log("index.js store:", store.getState());

//DEV CONFIG
config.set({ api: { url: "https://localhost:5001/api" } }, { freeze: false });

//PROD CONFIG
config.set(
  { api: { url: "https://md-doc-api.azurewebsites.net/api" } },
  { environment: "production" }
);

//UNCOMMENT FOR PRODUCTION
//config.setEnvironment("production");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
