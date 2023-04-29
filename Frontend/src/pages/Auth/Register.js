import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { useNavigate } from "react-router-dom";
import image from "./logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        name: register.name,
        email: register.email,
        phone: register.phone,
        password: register.password,
      })
      .then((res) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(res.data);
        navigate("/");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="login-container">
      {register.err &&
        register.err.map((error, index) => {
          return (
            <Alert key={index} variant="danger" className="p-2">
              {error.msg}
            </Alert>
          );
        })}

      <img src={image} alt="logo" />
      <h1>Registration</h1>

      <Form className="form" onSubmit={RegisterFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required="required"
            placeholder="Enter name"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            required="required"
            placeholder="Enter email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            required="required"
            placeholder="Enter phone number"
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            required="required"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>
        {register.error && <div className="error">{register.error}</div>}
        <Button
          className="btn btn-dark w-50"
          variant="primary"
          type="submit"
          disabled={register.loading === true}
        >
          Register
        </Button>
        <Button
          className="btn btn-secondary w-50 mt-3"
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default Register;
