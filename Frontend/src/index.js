import React from "react";
import ReactDOM from "react-dom/client";
import { routes } from "./Routes";
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
