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
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Sign Up</a></li>
          <li><a href="/view-flights">View Flights</a></li>
        </ul>
      </nav>
    </header>
    </div>
  );
};

export default Header;
