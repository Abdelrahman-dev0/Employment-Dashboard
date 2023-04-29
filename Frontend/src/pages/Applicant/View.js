import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/Home.css";
import { BsSearch } from "react-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { FaSearch } from "react-bootstrap-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuthUser, setAuthUser, removeAuthUser } from "../../helper/storage";
import classNames from "classnames";
import "../../css/apply.css";

const View = () => {
  const auth = getAuthUser();
  const [jobs, setJobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  // Fetch Jobs for user
  useEffect(() => {
    const fetchJobs = async () => {
      setJobs({ ...jobs, loading: true });
      // Add authorization header to axios request
      const headers = auth ? { token: auth.token } : {};
      try {
        const res = await axios.get("http://localhost:4000/jobs/", { headers });
        const appliedJobs =
          JSON.parse(localStorage.getItem(`appliedJobs_${auth.id}`)) || [];
        const statusResponses = await Promise.all(
          appliedJobs.map((jobId) =>
            axios.get(
              `http://localhost:4000/jobs/status/${auth.id}?jobId=${jobId}`
            )
          )
        );
        const statusByJobId = {};
        statusResponses.forEach((statusResponse) => {
          statusByJobId[statusResponse.data.status[0].jobId] =
            statusResponse.data.status[0].status;
        });
        const results = res.data.jobs.map((job) => ({
          ...job,
          applied: appliedJobs.includes(job.id),
          status: statusByJobId[job.id] || "pending",
        }));
        setJobs({ ...jobs, results, loading: false, err: null });
      } catch (err) {
        setJobs({
          ...jobs,
          loading: false,
          err: "Something went wrong. Please try again later!",
        });
      }
    };
    fetchJobs();
  }, [jobs.reload]);

  let timeoutId;
  let jobStatus;

  const handleApplyForJob = async (jobId) => {
    try {
      const pollInterval = 5000;
      const res = await axios.post(
        `http://localhost:4000/jobs/apply/${auth.id}`,
        { job_id: jobId },
        { headers: { token: auth.token } }
      );
      const key = `appliedJobs_${auth.id}`;
      const appliedJobs = JSON.parse(localStorage.getItem(key)) || [];
      const newAppliedJobs = [...appliedJobs, jobId];
      localStorage.setItem(key, JSON.stringify(newAppliedJobs));

      const statusKey = `jobStatus_${auth.id}_${jobId}`;
      const oldStatus = localStorage.getItem(statusKey);
      const newStatus = "Pending";

      console.log("statusKey:", statusKey);
      console.log("oldStatus:", oldStatus);
      console.log("newStatus:", newStatus);

      localStorage.setItem(statusKey, newStatus);
      setJobs((prevJobs) => ({
        ...prevJobs,
        results: prevJobs.results.map((job) =>
          job.id === jobId ? { ...job, applied: true, status: newStatus } : job
        ),
      }));

      if (jobStatus !== "Pending") {
        timeoutId = setTimeout(
          () => checkStatus(jobId, statusKey, pollInterval),
          pollInterval
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkStatus = async (jobId, statusKey, pollInterval) => {
    try {
      const statusResponse = await axios.get(
        `http://localhost:4000/jobs/status/${auth.id}?jobId=${jobId}`,
        { headers: { token: auth.token } }
      );
      const updatedStatus = statusResponse.data.status;

      console.log("updatedStatus:", updatedStatus);

      jobStatus = updatedStatus;

      if (updatedStatus === "Accepted" || updatedStatus === "Declined") {
        localStorage.setItem(statusKey, updatedStatus);
        setJobs((prevJobs) => ({
          ...prevJobs,
          results: prevJobs.results.map((job) =>
            job.id === jobId ? { ...job, status: updatedStatus } : job
          ),
        }));
      } else {
        timeoutId = setTimeout(
          () => checkStatus(jobId, statusKey, pollInterval),
          pollInterval
        );
      }
    } catch (err) {
      console.error(err);
      timeoutId = setTimeout(
        () => checkStatus(jobId, statusKey, pollInterval),
        pollInterval
      );
    }
  };

  window.addEventListener("beforeunload", () => {
    // Clear the timeout when the user leaves the page
    clearTimeout(timeoutId);
  });

  const [search, setSearch] = useState("");
  const searchJobs = async (e) => {
    e.preventDefault();
    setJobs({ ...jobs, loading: true });
    axios
      .get(`http://localhost:4000/jobs/search/${auth.id}`, {
        params: {
          search: search,
        },
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setJobs({ ...jobs, results: res.data.jobs, loading: false, err: null });
      })
      .catch((err) => {
        setJobs({
          ...jobs,
          loading: false,
          err: "No Results Found!",
        });
      });
  };

  return (
    <div className="job-content">
      {/* Search bar */}
      <form onSubmit={searchJobs} className="mb-3">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              style={{ height: "50px" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search for jobs by position, offer or max candidate number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: "50px" }}
          />
        </div>
      </form>
      {/* Loader */}
      {jobs.loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading.....</span>
          </Spinner>
        </div>
      )}

      {!jobs.loading && jobs.results.length === 0 && <p>No jobs found.</p>}

      {/*======================================= MANAGE CARDS =================================================*/}
      {jobs.loading === false && jobs.err == null && (
        <div className="container mx-auto">
          <div className="row">
            {jobs.results &&
              jobs.results.map((job) => {
                const statusKey = `jobStatus_${auth.id}_${job.id}`;
                const statusValue = localStorage.getItem(statusKey);
                return (
                  <div className="col-md-6 mb-3" key={job.id}>
                    <div className="card bg-light shadow">
                      <div className="card-body">
                        <h5 className="card-title">{job.position}</h5>
                        <p className="card-text">{job.description}</p>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Offer: {job.offer}
                          </li>
                          <li className="list-group-item">
                            Candidates: {job.max_candidate_number}
                          </li>
                          <li className="list-group-item">
                            Qualifications: {job.qualifications.join(", ")}
                          </li>
                        </ul>
                        <div className="apply-job-container">
                          {job.max_candidate_number === 0 ? (
                            statusValue ? (
                              <div className="application-status">
                                <p className="application-status-label">
                                  {" "}
                                  Application Status:{" "}
                                </p>
                                <p className="application-status-value">
                                  <span
                                    className={`status-dot ${
                                      statusValue === "Accepted"
                                        ? "accepted"
                                        : "declined"
                                    }`}
                                  ></span>
                                  <span className="status-text">
                                    {" "}
                                    {statusValue}{" "}
                                  </span>
                                  {statusValue === "Accepted" && (
                                    <i className="fas fa-check-circle accepted-icon"></i>
                                  )}
                                  {statusValue === "Declined" && (
                                    <i className="fas fa-times-circle declined-icon"></i>
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div className="max-candidates-reached">
                                <i
                                  className="fas fa-exclamation-circle"
                                  style={{
                                    color: "#FFC107",
                                    marginRight: "10px",
                                  }}
                                ></i>
                                <span>
                                  We're sorry, but the maximum number of
                                  candidates for this position has already been
                                  reached. Please check back later for other
                                  opportunities.
                                </span>
                              </div>
                            )
                          ) : (
                            <button
                              className="apply-job-button"
                              onClick={() => handleApplyForJob(job.id)}
                              disabled={job.applied}
                              style={{
                                backgroundColor: "#1E88E5",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ marginRight: "10px" }}>
                                <i className="fas fa-paper-plane"></i>
                              </span>
                              {job.applied
                                ? "Application Submitted"
                                : "Apply for Job"}
                            </button>
                          )}
                          {job.max_candidate_number === 0 &&
                          statusValue === "Pending" ? (
                            <div className="max-candidates-reached">
                              <i
                                className="fas fa-exclamation-circle"
                                style={{
                                  color: "#FFC107",
                                  marginRight: "10px",
                                }}
                              ></i>
                              <span>
                                We're sorry, but the maximum number of
                                candidates for this position has already been
                                reached. Please check back later for other
                                opportunities.
                              </span>
                            </div>
                          ) : null}
                          {job.max_candidate_number !== 0 && statusValue ? (
                            <div className="application-status">
                              <p className="application-status-label">
                                Application Status:
                              </p>
                              <p className="application-status-value">
                                <span
                                  className={`status-dot ${
                                    statusValue === "Accepted"
                                      ? "accepted"
                                      : "declined"
                                  }`}
                                ></span>
                                <span className="status-text">
                                  {statusValue}
                                </span>
                                {statusValue === "Accepted" && (
                                  <i className="fas fa-check-circle accepted-icon"></i>
                                )}
                                {statusValue === "Declined" && (
                                  <i className="fas fa-times-circle declined-icon"></i>
                                )}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Error handling */}
      {jobs.loading === false && jobs.err != null && (
        <Alert variant="danger" className="p-2">
          {jobs.err}
        </Alert>
      )}

      {jobs.loading === false &&
        jobs.err != null &&
        jobs.results.length == 0 && (
          <Alert variant="danger" className="p-2">
            {jobs.err}
          </Alert>
        )}
    </div>
  );
};

export default View;
