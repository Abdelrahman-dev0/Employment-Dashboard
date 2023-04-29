import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import Errorpage from "./pages/error/Errorpage";
import Job from "./pages/Admin/jobs/Job";
import Applicant from "./pages/Admin/applicants/Applicant";
import Qualification from "./pages/Admin/qualifications/Qualification";
import Request from "./pages/Admin/requests/Request";
import Add_App from "./pages/Admin/applicants/Add_App";
import Update_App from "./pages/Admin/applicants/Update_App";
import Add_Qual from "./pages/Admin/qualifications/Add_Qual";
import Update_Qual from "./pages/Admin/qualifications/Update_Qual";
import Add_Job from "./pages/Admin/jobs/Add_Job";
import Update_Job from "./pages/Admin/jobs/Update_Job";
import View from "./pages/Applicant/View";
import History from "./pages/Applicant/History";
import RequestsHistory from "./pages/Admin/requests/ReuestsHistory";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import Applicants from "./middleware/Applicants";
import AppliedJobs from "./pages/Applicant/AppliedJobs";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        element: <Applicants />,
        children: [
          {
            path: "/view",
            element: <View />,
          },

          {
            path: "/history",
            element: <History />,
          },

          {
            path: "/appliedJobs",
            element: <AppliedJobs />,
          },
        ],
      },

      {
        path: "/job",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Job />,
          },

          { path: "add", element: <Add_Job /> },

          {
            path: "update/:id",
            element: <Update_Job />,
          },
        ],
      },
      {
        path: "/applicant",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Applicant />,
          },

          { path: "add", element: <Add_App /> },
          {
            path: "update/:id",
            element: <Update_App />,
          },
        ],
      },
      {
        path: "/qualification",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Qualification />,
          },

          {
            path: "update/:id",
            element: <Update_Qual />,
          },

          { path: "add", element: <Add_Qual /> },
        ],
      },
      {
        path: "/request",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Request />,
          },
        ],
      },
      {
        path: "RequestsHistory",
        element: <RequestsHistory />,
      },
      {
        path: "*",
        element: <Errorpage />,
      },
    ],
  },
  {
    element: <Guest />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
    ],
  },
]);
