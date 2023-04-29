import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { getAuthUser } from "../../../helper/storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../../css/add_app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const Update_App = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [applicant, setApplicant] = useState({
    loading: true,
    data: {},
    error: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/applicants/${id}`, {
        headers: {
          token: `${auth.token}`,
        },
      })
      .then((res) => {
        setApplicant({
          ...applicant,
          data: res.data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        setApplicant({
          ...applicant,
          loading: false,
          error: "Something went wrong. Please try again later!",
        });
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicant({
      ...applicant,
      data: {
        ...applicant.data,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/applicants/update/${id}`, applicant.data, {
        headers: {
          token: `${auth.token}`,
        },
      })
      .then((res) => {
        alert("Applicant updated successfully.");
        navigate(`/applicant`);
      })
      .catch((err) => {
        alert("Failed to update applicant. Please try again later.");
      });
  };

  const handleCancel = () => {
    navigate(`/applicant`);
  };

  return (
    <div className="login-container">
      {applicant.loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!applicant.loading && (
        <div>
          <h3 className="pb-3">Update Applicant </h3>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required="required"
                placeholder="Enter Name "
                name="name"
                value={applicant.data.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                required="required"
                placeholder="Enter Email "
                name="email"
                value={applicant.data.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required="required"
                placeholder="Enter Phone "
                name="phone"
                value={applicant.data.phone || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={applicant.data.password || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <button className="btn btn-primary" type="submit" id="add">
              <FontAwesomeIcon icon={faCheck} className="icon-margin-right" />
              Update
            </button>
            <Button
              variant="secondary"
              className="ms-auto"
              onClick={handleCancel}
              id="cancel"
            >
              <FontAwesomeIcon icon={faTimes} className="icon-margin-right" />
              Cancel
            </Button>
          </Form>
        </div>
      )}
      {applicant.error && (
        <div className="text-center text-danger mt-3">{applicant.error}</div>
      )}
    </div>
  );
};

export default Update_App;
