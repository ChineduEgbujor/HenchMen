import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "./AuthContext"; // Import useAuth hook
import "./LoginForm.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: credentials.email,
        password: credentials.password,
      });
      console.log("User logged in:", response.data);
      login(response.data); // Set user state upon successful login
      navigate("/home", { state: { customerId: response.data.customer_id } });
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="login-background">
        <Container className="login-container">
          <Row>
            <Col md={6} className="login-form-col">
              <h1 className="text-center">The Henchmen Airline Reservation</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-4">
              <footer>© 2024 The Henchmen Airlines. All rights reserved.</footer>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
