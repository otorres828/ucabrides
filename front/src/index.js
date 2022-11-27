import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider maxSnack={1} autoHideDuration={1000}>
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
);

serviceWorkerRegistration.register();
