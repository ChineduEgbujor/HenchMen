import React from 'react';
import logo from '../assets/images/logo.png'; // Make sure the path is correct
import './Header.css';

const Header = () => {
  return (
    <div className="head">
    <header>
      <a href="/home" className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <nav className="header-nav"> 
        <ul>
          <a href="/login">Login</a>
          <a href="/register">Sign Up</a>
          <a href="/view-flights">View Flights</a>
          <a href="/manager">Admin</a>
        </ul>
      </nav>
    </header>
    </div>
  );
};

export default Header;
