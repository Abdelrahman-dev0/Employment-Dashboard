import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../../helper/storage";
import { Badge } from "react-bootstrap";

const RequestsHistory = () => {
  const auth = getAuthUser();
  const { id } = useParams();
  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    error: null,
  });
  console.log("requests:", requests);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/requests/history`,
          {
            headers: {
              token: auth.token,
            },
          }
        );
        console.log("response.data:", response.data);

        const applicants = response.data.requests.map((request) => ({
          name: request.name,
          email: request.email,
          position: request.position,
          status: request.status,
          requested_time: request.requested_time,
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
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (requests.error) {
    return <div className="error">{requests.error.message}</div>;
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Status</th>
            <th>Requested Time</th>
          </tr>
        </thead>
        <tbody>
          {requests.results.map((request) => (
            <tr key={request.email}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.position}</td>
              <td>
                {request.status === "Accepted" && (
                  <Badge
                    pill
                    variant="success"
                    style={{
                      fontSize: "14px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: "#28a745 !important",
                      color: "green",
                    }}
                  >
                    Accepted
                  </Badge>
                )}
                {request.status === "Declined" && (
                  <Badge
                    pill
                    variant="danger"
                    style={{
                      fontSize: "14px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: "#dc3545 !important",
                      color: "red",
                    }}
                  >
                    Declined
                  </Badge>
                )}
                {request.status === "pending" && (
                  <Badge
                    pill
                    variant="warning"
                    style={{
                      fontSize: "14px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: "#ffc107 !important",
                      color: "#212529",
                    }}
                  >
                    Pending
                  </Badge>
                )}
              </td>
              <td>{request.requested_time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style jsx>{`
        .table-responsive {
          margin-top: 20px;
          overflow-x: auto;
        }
        table {
          border-collapse: separate;
          border-spacing: 0 15px;
          width: 100%;
        }
        th,
        td {
          padding: 10px;
          text-align: left;
        }
        th {
          font-weight: bold;
          background-color: #f3f3f3;
          color: #333;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        tr:hover {
          background-color: #f8f8f8;
        }
        tbody tr:nth-of-type(odd) {
          background-color: #f8f8f8;
        }
        tbody tr:last-of-type {
          border-bottom: 2px solid #ddd;
        }
        @media screen and (max-width: 767px) {
          table {
            border-spacing: 0 10px;
          }
          th,
          td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default RequestsHistory;
