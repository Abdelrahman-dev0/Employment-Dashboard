import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuthUser } from "../../../helper/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const Update_Job = () => {
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
        setFormData({
          position: res.data.position,
          description: res.data.description,
          offer: res.data.offer,
          max_candidate_number: res.data.max_candidate_number,
          qualifications: res.data.qualifications.map((q) => q.id),
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
        setQualifications(res.data);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="form-control"
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="offer">Offer</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="number"
              id="offer"
              name="offer"
              min="0"
              step="0.01"
              value={formData.offer}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="max_candidate_number">Max Candidate Number</label>
          <input
            type="number"
            id="max_candidate_number"
            name="max_candidate_number"
            min="1"
            value={formData.max_candidate_number}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {isLoading ? (
          <p>Loading qualifications...</p>
        ) : (
          <div className="form-group">
            <label>Qualifications</label>
            {qualifications
              ? qualifications.map((q) => (
                  <div key={q.id} className="form-check">
                    <input
                      type="checkbox"
                      name={q.id}
                      checked={formData.qualifications.includes(q.id)}
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                    />
                    <label htmlFor={q.id} className="form-check-label">
                      {q.description}
                    </label>
                  </div>
                ))
              : null}
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faCheck} className="icon-margin-right" />
            Update Job
          </button>

          <Button variant="secondary" onClick={handleCancel}>
            <FontAwesomeIcon icon={faTimes} className="icon-margin-right" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Update_Job;
