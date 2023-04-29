import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAuthUser } from "../../../helper/storage";
import "../../../css/add_qual.css";

const Update_Qual = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/qualifications/${id}`, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        setDescription(res.data.description);
      })
      .catch((err) => {
        alert("Failed to fetch qualification details. Please try again later.");
        navigate("/qualification");
      });
  }, [id, auth.token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:4000/qualifications/update/${id}`,
        { description },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        alert("Qualification updated successfully.");
        navigate("/qualification");
      })
      .catch((err) => {
        alert("Failed to update qualification. Please try again later.");
      });
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="login-container">
      <h3 className="pb-3">Update Qualification Form</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label className="form-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            rows={5}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <div className="button-group">
          <Button className="btn btn-primary" type="submit" id="add">
            Update
          </Button>
          <Link to="/qualification" className="btn btn-secondary mx-2">
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Update_Qual;
