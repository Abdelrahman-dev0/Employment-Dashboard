import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/storage";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [userName, setUserName] = useState("");
  const logout = () => {
    removeAuthUser();
    navigate("/Login");
  };
  useEffect(() => {
    if (auth) {
      setUserName(auth.name);
    }
  }, [auth]);

  return (
    <>
      <Navbar bg="black" variant="dark" className="content">
        <Container>
          {/* unAuth Routes */}
          <Nav className="me-auto">
            {/* {!auth && (
              <>
                <Link className="nav-link" to={"/Login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/Register"}>
                  Register
                </Link>
              </>
            )} */}
          </Nav>

          <Nav className="ms-auto">
            {/* Auth Routes */}
            {auth && (
              <>
                <Nav className="name">{userName}</Nav>
                <Nav.Link onClick={logout} className="logout">
                  <RiLogoutBoxRLine className="icon" />
                  <span className="nav-link-label">Logout</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
