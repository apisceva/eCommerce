import React from "react";
import { ReactDOM } from "react-dom";
import { createRoot } from "react-dom/client";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./index.css";
import "font-awesome/css/font-awesome.css" 

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
