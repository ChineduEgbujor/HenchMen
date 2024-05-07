import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth hook

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from AuthContext

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
      logout(); // Clear user state upon successful logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response.data);
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
