import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { getAuthUser } from "../../../helper/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Applicant = () => {
  const auth = getAuthUser();
  const [applicants, setApplicants] = useState({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    setApplicants({ ...applicants, loading: true });
    axios
      .get("http://localhost:4000/applicants/all", {
        headers: {
          token: `${auth.token}`,
        },
      })
      .then((res) => {
        setApplicants({
          ...applicants,
          data: res.data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        setApplicants({
          ...applicants,
          loading: false,
          error: "Something went wrong. Please try again later!",
        });
      });
  }, []);

  const deleteApplicant = (id) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      axios
        .delete(`http://localhost:4000/applicants/delete/${id}`, {
          headers: {
            token: `${auth.token}`,
          },
        })
        .then((res) => {
          setApplicants({
            ...applicants,
            data: applicants.data.filter((applicant) => applicant.id !== id),
          });
          alert("Applicant deleted successfully.");
        })
        .catch((err) => {
          alert("Failed to delete applicant. Please try again later.");
        });
    }
  };

  return (
    <div className="job-content">
      {applicants.loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!applicants.loading &&
        applicants.data &&
        applicants.data.length === 0 && <p>No applicants found.</p>}
      <div className="content">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-center m-2">Manage Applicants :</h2>
          <Link to={"Add"} className="btn btn-success m-1">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add New Applicant
          </Link>
        </div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.data.map((applicant, index) => (
              <tr key={applicant.id}>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>
                  {applicant.status === 1 ? (
                    <div
                      className="d-inline-block rounded-circle me-2"
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#4CAF50",
                      }}
                    />
                  ) : (
                    <i className="fas fa-circle text-muted me-2" />
                  )}
                  {applicant.status === 1 ? "Active" : "Inactive"}
                </td>
                <td>
                  <div className="d-flex justify-content-start align-items-center">
                    <Link
                      to={"update/" + applicant.id}
                      className="btn btn-sm btn-outline-primary me-3 flex-grow-0"
                    >
                      <BiEdit style={{ fontSize: "1.5rem" }} />
                    </Link>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger flex-grow-0"
                      onClick={(e) => {
                        deleteApplicant(applicant.id);
                      }}
                    >
                      <MdDelete style={{ fontSize: "1.5rem" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Applicant;
