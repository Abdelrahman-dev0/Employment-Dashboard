import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuthUser } from "../../../helper/storage";
import { useNavigate } from "react-router-dom";
import "../../../css/add_qual.css";

const Add_Qual = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:4000/qualifications/create",
        { description },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        alert("Qualification created successfully.");
        setDescription("");
        navigate("/qualification");
      })
      .catch((err) => {
        alert("Failed to create qualification. Please try again later.");
      });
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/qualification");
  };

  return (
    <div className="login-container">
      <h3 className="pb-3">Add New Qualification Form</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          {/* <Form.Label className="form-label">Description</Form.Label> */}
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
            Add
          </Button>
          <Button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Add_Qual;
