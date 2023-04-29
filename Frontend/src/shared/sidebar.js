import React from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import Nav from "react-bootstrap/Nav";
import { BsGear } from "react-icons/bs";
import { BsPersonFillGear } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { MdWork } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { getAuthUser } from "../helper/storage";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const auth = getAuthUser();

  return (
    <>
      <Nav className="flex-column">
        <Link
          className="header"
          to={auth && auth.type === 1 ? "/job" : "/View"}
        >
          <p className="logo">
            E<span className="logo-highlight">mployment</span>
          </p>
        </Link>
        <hr />
        {/* Admin Routes */}
        {auth && auth.type === 1 && (
          <div className="sidebar-group">
            <div className="sidebar-group-header">
              <BsShieldLockFill className="sidebar-group-icon" />
              Admin
            </div>
            <Link className="nav-link" to={"/job"}>
              <BsGear className="icon" />
              <span className="nav-link-label">Jobs</span>
            </Link>
            <Link className="nav-link" to={"/applicant"}>
              <BsPersonFillGear className="icon" />
              <span className="nav-link-label">Applicants</span>
            </Link>
            <Link className="nav-link" to={"/qualification"}>
              <TbCertificate className="icon" />
              <span className="nav-link-label">Qualifications</span>
            </Link>
            <Link className="nav-link" to={"/request"}>
              <VscGitPullRequestNewChanges className="icon" />
              <span className="nav-link-label">Requests</span>
            </Link>
            <Link className="nav-link" to={"/RequestsHistory"}>
              <MdWorkHistory className="icon" />
              <span className="nav-link-label">Request History</span>
            </Link>
          </div>
        )}

        {/* Applicant Routes */}

        {auth && auth.type === 0 && (
          <>
            <div className="sidebar-group">
              <div className="sidebar-group-header">
                <FaUser className="sidebar-group-icon" />
                Applicant
              </div>
              <Link className="nav-link" to={"/View"}>
                <MdWork className="icon" />
                <span className="nav-link-label">Jobs</span>
              </Link>
              <Link className="nav-link" to={"/History"}>
                <FaHistory className="icon" />
                <span className="nav-link-label">History</span>
              </Link>
              <Link className="nav-link" to={"/AppliedJobs"}>
                <MdWorkHistory className="icon" />
                <span className="nav-link-label">Requests</span>
              </Link>
            </div>
          </>
        )}

        <hr />
        <p className="text-muted">All rights reserved &copy; 2023</p>
      </Nav>
    </>
  );
};

export default Sidebar;
