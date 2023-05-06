import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../../css/Home.css";
import { Link, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../../helper/storage";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/job.css";
import {
  faPlus,
  faBriefcase,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Job = () => {
  const auth = getAuthUser();
  const [jobs, setJobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setJobs({ ...jobs, loading: true });
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => {
        console.log(res.data);
        setJobs({
          ...jobs,
          results: res.data.jobs,
          loading: false,
          err: null,
        });
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

  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`http://localhost:4000/jobs/delete/${id}`, {
          headers: {
            token: `${auth.token}`,
          },
        })
        .then((res) => {
          setJobs({ ...jobs, reload: jobs.reload + 1 });
          alert("Job deleted successfully.");
        })
        .catch((err) => {
          alert("Failed to delete job. Please try again later.");
        });
    }
  };

  return (
    <>
      {jobs.loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!jobs.loading && jobs.error && (
        <p className="text-center">Error fetching jobs: {jobs.error}</p>
      )}

      {!jobs.loading &&
        !jobs.error &&
        jobs.results &&
        jobs.results.length === 0 && (
          <p className="text-center">No jobs found.</p>
        )}

      {!jobs.loading &&
        !jobs.error &&
        jobs.results &&
        jobs.results.length > 0 && (
          <div className="container my-4">
            <div className="d-flex justify-content-between mb-4">
              <h2 className="text-center m-1">Manage Jobs :</h2>
              <Link to="Add" className="btn btn-success m-1">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add New Job
              </Link>
            </div>

            <div className="row">
              {jobs.results.map((job) => (
                <div className="col-sm-6 col-md-4 mb-4" key={job.id}>
                  <div className="card border-0 shadow">
                    <div className="card-img-top bg-light p-3 d-flex justify-content-center align-items-center">
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        size="4x"
                        className="color-change"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{job.position}</h5>
                      <p className="card-text">{job.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Offer:</strong> {job.offer}
                      </li>
                      <li className="list-group-item">
                        <strong>Candidates:</strong> {job.max_candidate_number}
                      </li>
                      <li className="list-group-item">
                        <strong>Qualifications:</strong>
                        <ul className="list-unstyled mb-0">
                          {job.qualifications.map((qualification, index) => (
                            <li key={index} className="text-muted">
                              {qualification}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <Link
                        to={`update/${job.id}`}
                        className="btn btn-outline-primary"
                      >
                        <FontAwesomeIcon icon={faEdit} className="me-2" />
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(e) => {
                          deleteJob(job.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default Job;
