import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import "../../css/Home.css";

import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/storage";

const Home = () => {
  const [jobs, setJobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setJobs({ ...jobs, loading: true });
    const user = getAuthUser(); // get the authenticated user from localStorage
    axios
      .get(`http://localhost:4000/jobs`)
      .then((res) => {
        console.log(res.data);
        setJobs({ ...jobs, results: res.data.jobs, loading: false, err: null });
      })
      .catch((err) => {
        setJobs({
          ...jobs,
          loading: false,
          err: "Something went wrong. Please try again later!",
        });
        console.log(jobs);
      });
  }, [jobs.reload]);
  return (
    <div className="job-content">
      {/* Loader */}
      {jobs.loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading.....</span>
          </Spinner>
        </div>
      )}

      {!jobs.loading && jobs.results.length === 0 && <p>No jobs found.</p>}

      {jobs.loading === false && jobs.err == null && (
        <>
          <div className="content">
            {/* List of Jobs */}
            <div className="card-deck">
              {jobs.results.map((job, index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{job.position}</h5>
                    <p className="card-text">{job.description}</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Offer:</strong> {job.offer}
                      </li>
                      <li className="list-group-item">
                        <strong>Number Of Candidates:</strong>{" "}
                        {job.max_candidate_number}
                      </li>
                      <li className="list-group-item">
                        <strong>Qualifications:</strong>
                      </li>
                      <ul className="list-group">
                        {job.qualifications.map((qualification, index) => (
                          <li className="list-group-item" key={index}>
                            {qualification}
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
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

export default Home;
