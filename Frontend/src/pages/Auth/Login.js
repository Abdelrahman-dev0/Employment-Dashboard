import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import axios from "axios";
import { setAuthUser, getAuthUser } from "../../helper/storage";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import image from "./logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = async (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      });
      setLogin({ ...login, loading: false, err: [] });
      setAuthUser(res.data);
      const auth = getAuthUser();
      if (auth.type === 1) {
        navigate("/job");
      } else {
        navigate("/view");
      }
    } catch (errors) {
      setLogin({
        ...login,
        loading: false,
        err: errors.response.data.errors,
      });
    }
  };

  return (
    <div className="login-container">
      {login.err &&
        login.err.map((error, index) => {
          return (
            <Alert key={index} variant="danger" className="p-2">
              {error.msg}
            </Alert>
          );
        })}

      <Form className="form" onSubmit={LoginFun}>
        <img src={image} alt="logo" />
        <div className="form-header text-center">
          <h1>Login</h1>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        {login.error && <div className="error">{login.error}</div>}
        <Button
          className="text-center w-50"
          variant="primary"
          type="submit"
          disabled={login.loading === true}
        >
          Login
        </Button>
        <div className="not mt-3">
          If you don't have an account,
          <Link to={"/register"}>Register Now</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
