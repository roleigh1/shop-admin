import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

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
      const response = await axios.post("http://localhost:3131/api/login", {
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
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
