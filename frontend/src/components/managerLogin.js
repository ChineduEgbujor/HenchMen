// ManagerLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import './managerLogin.css';
import { useNavigate } from 'react-router-dom';

const ManagerLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to backend for authentication
      const response = await axios.post('http://localhost:5000/manager/login', {
        email: credentials.email,
        password: credentials.password,
      });
      // Pass login status to parent component
      //onLogin(response.data);
      console.log("User logged in:", response.data);
      navigate('/manager-dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="managerLogin">
      <div className="manager-container">
        <h2>Manager Login</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label className="input-label">
            Email
            <input type="text" name="email" value={credentials.email} onChange={handleChange} />
          </label>
          <label className="input-label">
            Password
            <input type="password" name="password" value={credentials.password} onChange={handleChange} />
          </label>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
