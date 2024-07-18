import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";
import { POST_LOGIN } from "../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;
export function FormSignIn({ onTokenReceived }) {
  const [toggle, setToggle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setToggle("");
    }
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${api_Host}${POST_LOGIN}`, {
        username: email,
        password: password,
      });

      const retrievedToken = response.data.token;

      onTokenReceived(retrievedToken);
      console.log("Login successful", response.data);
      navigate("/home");
    } catch (error) {
      console.log("Login failed", error);
      setToggle("wrong username or password");
    }
  };

  const handleToggle = (event) => {
    event.preventDefault();
    if (email.length === 0 && password.length === 0) {
      setToggle("Please enter login data");
    } else {
      handleLogin();
    }
  };

  return (
    <Container
 
      className="h-screen flex items-center justify-center"
    >
      <Row className="row">
        <Col>
          <div className="top">
            <h2>Sign In</h2>
          </div>
          <div className="body">
            <form>
              <span>{toggle}</span>
              <label htmlFor="email">User</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="email"
              />
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="pw"
              />
              <button onClick={handleToggle}>Login</button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
FormSignIn.propTypes = {
  onTokenReceived: PropTypes.func.isRequired,
};
