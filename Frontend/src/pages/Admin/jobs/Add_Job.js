import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { getAuthUser } from "../../../helper/storage";
import { useNavigate } from "react-router-dom";
import "../../../css/Form.css";

const AddJob = () => {
  const auth = getAuthUser();
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
    axios
      .get("http://localhost:4000/qualifications/all")
      .then((res) => {
        setQualifications(res.data.qualifications);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage("Failed to fetch qualifications.");
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let newQualifications = [...formData.qualifications];
    if (checked) {
      newQualifications.push(parseInt(name));
    } else {
      newQualifications = newQualifications.filter((q) => q !== parseInt(name));
    }
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const handleCancel = () => {
    navigate("/Job");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form validation
    if (formData.offer <= 0 || formData.max_candidate_number <= 0) {
      alert("Offer and max candidate number must be positive numbers.");
      return;
    }

    axios
      .post(
        "http://localhost:4000/jobs/create",
        {
          position: formData.position,
          description: formData.description,
          offer: formData.offer,
          max_candidate_number: formData.max_candidate_number,
          qualifications: formData.qualifications,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        alert("Job created successfully.");
        navigate("/Job");
      })
      .catch((err) => {
        alert("Failed to create job. Please try again later.");
      });
  };

  return (
    <div className="job-form">
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Job position"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Job description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="offer">Offer (USD)</label>
          <input
            type="number"
            id="offer"
            name="offer"
            min="0"
            step="0.01"
            value={formData.offer}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Job offer"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="max_candidate_number">Number Of Candidate</label>
          <input
            type="number"
            id="max_candidate_number"
            name="max_candidate_number"
            min="1"
            value={formData.max_candidate_number}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Maximum number of candidates"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label mb-3">Qualifications:</label>
          {isLoading ? (
            <p>Loading qualifications...</p>
          ) : (
            <div>
              {qualifications.map((q) => (
                <div key={q.id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    id={q.id}
                    name={q.id}
                    checked={formData.qualifications.includes(q.id)}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                  />
                  <label htmlFor={q.id} className="form-check-label">
                    {q.description}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Create Job
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
