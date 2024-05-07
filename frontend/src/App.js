import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Adjust the path as necessary
import Register from './components/register'; // Adjust the path as necessary
import Home from './components/home'; // Adjust the path as necessary
import Booking from './components/Booking'; // Adjust the path as necessary
import ViewFlightsPage from './components/viewFlights'; // Adjust the path as necessary
import ManagerLogin from './components/managerLogin';


import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/view-flights" element={<ViewFlightsPage />} />
        <Route path="/manager" element={<ManagerLogin />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
