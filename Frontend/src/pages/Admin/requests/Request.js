import React, { useEffect, useState } from "react";
import { Table, ButtonToolbar, Button } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAuthUser } from "../../../helper/storage";

const Request = () => {
  const auth = getAuthUser();
  const { id } = useParams();
  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    error: null,
  });
  console.log("requests:", requests);

  const handleAccept = async (id) => {
    console.log("Accepting request with ID:", id);
    try {
      const response = await axios.put(
        `http://localhost:4000/requests/${id}`,
        { status: "Accepted" },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log("Response data:", response.data);

      const updatedRequests = requests.results.map((request) =>
        request.id === id ? { ...request, status: "Accepted" } : request
      );

      setRequests({ ...requests, results: updatedRequests });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (id) => {
    console.log("Declining request with ID:", id);
    try {
      const response = await axios.put(
        `http://localhost:4000/requests/${id}`,
        { status: "Declined" },
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log("Response data:", response.data);

      const updatedRequests = requests.results.map((request) =>
        request.id === id ? { ...request, status: "Declined" } : request
      );

      setRequests({ ...requests, results: updatedRequests });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/requests/all`, {
          headers: {
            token: auth.token,
          },
        });
        console.log("response.data:", response.data);

        const applicants = response.data.map((applicant) => ({
          id: applicant.id,
          name: applicant.name,
          email: applicant.email,
          position: applicant.position,
          status: applicant.status,
          requested_time: applicant.requested_time_formatted,
        }));

        console.log("applicants:", applicants);
        setRequests({ ...requests, loading: false, results: applicants });
      } catch (error) {
        setRequests({ ...requests, loading: false, error });
      }
    };

    fetchData();
  }, []);

  if (requests.loading) {
    return <Spinner animation="border" />;
  }

  if (requests.error) {
    return <div>Error: {requests.error.message}</div>;
  }

  if (requests.results.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Requests</h1>
      <Table
        striped
        bordered
        hover
        style={{ tableLayout: "fixed", width: "100%", marginTop: "20px" }}
        variant="light"
      >
        {/* Define the table header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Status</th>
            <th>Requested Time</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Define the table body */}
        <tbody>
          {/* Map over the requests array and generate a row for each request */}
          {requests.results.map((request) => (
            <tr key={request.id}>
              {/* Display the request data in each column */}
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.position}</td>
              <td>{request.status}</td>
              <td>{request.requested_time}</td>
              <td>
                {/* Display different buttons or text depending on the request status */}
                {request.status === "pending" && (
                  <ButtonToolbar>
                    <Button
                      variant="success"
                      onClick={() => handleAccept(request.id)}
                      style={{ marginRight: "10px", borderRadius: "20px" }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDecline(request.id)}
                      style={{ borderRadius: "20px" }}
                    >
                      Decline
                    </Button>
                  </ButtonToolbar>
                )}
                {request.status === "Accepted" && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Accepted
                  </span>
                )}
                {request.status === "Declined" && (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Declined
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Request;
