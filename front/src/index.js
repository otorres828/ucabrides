import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
  ,document.getElementById("root")
);

serviceWorkerRegistration.register();
