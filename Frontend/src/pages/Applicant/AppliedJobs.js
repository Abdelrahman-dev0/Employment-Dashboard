import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/storage";
import { Table, Spinner, Alert } from "react-bootstrap";

const AppliedJobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [error, setError] = useState(null);

  const getJobApplications = async () => {
    const auth = getAuthUser();
    if (!auth) {
      return null;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/jobs/status/all/${auth.id}`
      );
      return response.data.jobApplications;
    } catch (error) {
      console.log("Error retrieving job applications:", error);
      throw new Error("No applied jobs retrieved.");
    }
  };

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const applications = await getJobApplications();
        setJobApplications(applications || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobApplications();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="p-2">
        {error}
      </Alert>
    );
  }

  if (jobApplications.length === 0) {
    return (
      <div className="job-applications">
        <h5>No Job Applications Found</h5>
      </div>
    );
  }

  return (
    <div className="job-applications">
      <h5>Applied Jobs:</h5>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Position</th>
            <th>Status</th>
            <th>Request Time</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{application.position}</td>
              <td>{application.status}</td>
              <td>{new Date(application.requested_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
