import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../../helper/storage";
import axios from "axios";
import "../../../css/add_app.css";

const Add_App = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:4000/applicants/create",
        { name, email, phone, password },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        alert("Applicant created successfully.");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        navigate("/applicant");
      })
      .catch((err) => {
        alert("Failed to create applicant. Please try again later.");
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCancel = () => {
    navigate("/applicant");
  };

  return (
    <div className="app-container">
      <h3 className="pb-3">Add New Applicant </h3>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required="required"
            placeholder="Enter Name "
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            required="required"
            placeholder="Enter Email "
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required="required"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            required="required"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" id="add">
            Add
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Add_App;
