import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import Routee from './pages/Router'
import HomePage from "./pages/HomePage";


ReactDOM.render(
  <Router>
    <HomePage/>
  </Router>,

  document.getElementById("root")
);
