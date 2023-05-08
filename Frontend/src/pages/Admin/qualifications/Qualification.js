import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEdit, BiTrash } from "react-icons/bi";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../../helper/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Qualification = () => {
  const auth = getAuthUser();
  const [qualifications, setQualifications] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setQualifications({ ...qualifications, loading: true });
    axios
      .get("http://localhost:4000/qualifications/all")
      .then((res) => {
        console.log(res.data);
        setQualifications({
          ...qualifications,
          results: res.data.qualifications,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setQualifications({
          ...qualifications,
          loading: false,
          err: "Something went wrong. Please try again later!",
        });
        console.log(qualifications);
      });
  }, [qualifications.reload]); // Reload the data when the reload state changes

  const deleteQual = (id) => {
    if (window.confirm("Are you sure you want to delete this qualification?")) {
      axios
        .delete(`http://localhost:4000/qualifications/delete/${id}`, {
          headers: {
            token: `${auth.token}`,
          },
        })
        .then((res) => {
          setQualifications({
            ...qualifications,
            reload: qualifications.reload + 1,
          });
          alert("Qualification deleted successfully.");
        })
        .catch((err) => {
          alert("Failed to delete qualification. Please try again later.");
        });
    }
  };

  return (
    <div className="job-content">
      {qualifications.loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!qualifications.loading &&
        qualifications.results &&
        qualifications.results.length === 0 && <p>No qualifications found.</p>}

      <div className="content">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-center m-2">Manage Qualifications :</h2>
          <Link to={"Add"} className="btn btn-success m-1">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add New Qualification
          </Link>
        </div>

        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {qualifications.results.map((qualification, index) => (
              <tr key={qualification._id}>
                <td>{index + 1}</td>
                <td>{qualification.description}</td>

                <td>
                  <div className="d-flex justify-content-start align-items-center">
                    <Link
                      to={`update/${qualification.id}`}
                      className="btn btn-sm btn-outline-primary me-3 flex-grow-0"
                    >
                      <BiEdit style={{ fontSize: "1.5rem" }} />
                    </Link>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger flex-grow-0"
                      onClick={() => deleteQual(qualification.id)}
                    >
                      <BiTrash style={{ fontSize: "1.5rem" }} />
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

export default Qualification;
