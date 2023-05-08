import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuthUser } from "../../../helper/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faSpinner,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const UpdateJob = () => {
  const auth = getAuthUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position: "",
    description: "",
    offer: "",
    max_candidate_number: "",
    qualifications: [],
  });

  const [qualifications, setQualifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch job details and qualifications on component mount
    axios
      .get(`http://localhost:4000/jobs/${id}`, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        const qualifications = res.data.qualifications.map((q) => q.id);
        setFormData({
          position: res.data.position,
          description: res.data.description,
          offer: res.data.offer,
          max_candidate_number: res.data.max_candidate_number,
          qualifications: qualifications,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Failed to fetch job details.");
        setIsLoading(false);
      });

    axios
      .get("http://localhost:4000/qualifications/all")
      .then((res) => {
        setQualifications(res.data.qualifications);
      })
      .catch((err) => {
        setErrorMessage("Failed to fetch qualifications.");
      });
  }, [id, auth.token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const id = parseInt(name); // Parse id as an integer
    let newQualifications = [...formData.qualifications];
    if (checked) {
      if (newQualifications.includes(id)) {
        // The selected qualification already exists in the qualifications array
        alert("You have already selected this qualification.");
      } else {
        newQualifications.push(id);
      }
    } else {
      newQualifications = newQualifications.filter((q) => q !== id);
    }
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const handleCancel = () => {
    navigate("/Job");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const uniqueQualifications = [];
    const uniqueIds = new Set();

    // Remove any null or undefined qualifications from the form data
    formData.qualifications = formData.qualifications.filter((q) => q);

    // Check for duplicate qualifications
    for (let i = 0; i < formData.qualifications.length; i++) {
      const qualification = formData.qualifications[i];
      if (
        qualification &&
        qualification.id &&
        uniqueIds.has(qualification.id)
      ) {
        setIsLoading(false);
        alert("Please select each qualification only once.");
        return;
      } else {
        if (qualification && qualification.id) {
          uniqueIds.add(qualification.id);
        }
        uniqueQualifications.push(qualification);
      }
    }

    formData.qualifications = uniqueQualifications;

    axios
      .put(`http://localhost:4000/jobs/update/${id}`, formData, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        navigate("/Job");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("Failed to update job.");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="form-container">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <FontAwesomeIcon icon={faEdit} className="me-2 fs-4" />
        <h2 className="m-0">Edit Job</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="position" className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            placeholder="Enter position"
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
            placeholder="Enter job description"
          />
        </Form.Group>

        <Form.Group controlId="offer" className="mb-3">
          <Form.Label>Offer</Form.Label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <Form.Control
              type="number"
              name="offer"
              min="0"
              step="0.01"
              value={formData.offer}
              onChange={handleInputChange}
              required
              placeholder="Enter offer amount"
            />
          </div>
        </Form.Group>

        <Form.Group controlId="max_candidate_number" className="mb-3">
          <Form.Label>Max Candidate Number</Form.Label>
          <Form.Control
            type="number"
            name="max_candidate_number"
            min="1"
            value={formData.max_candidate_number}
            onChange={handleInputChange}
            required
            placeholder="Enter maximum number of candidates"
          />
        </Form.Group>

        <Form.Group controlId="qualifications" className="mb-3">
          <Form.Label className="mb-3">Qualifications</Form.Label>
          {qualifications ? (
            <div className="card p-4">
              <div className="d-flex flex-wrap">
                {qualifications.map((q) => (
                  <Form.Check
                    key={q.id}
                    type="checkbox"
                    name={q.id}
                    label={q.description}
                    checked={formData.qualifications.includes(q.id)}
                    onChange={handleCheckboxChange}
                    className="mb-3 me-4"
                    style={{ minWidth: "250px" }}
                    id={`qualification-${q.id}`}
                    custom
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} pulse />
              <span className="ms-2">Loading qualifications...</span>
            </div>
          )}
        </Form.Group>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="secondary" onClick={handleCancel} className="me-2">
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            {isLoading && (
              <FontAwesomeIcon icon={faSpinner} pulse className="me-2" />
            )}
            Update Job
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateJob;
