
import React from 'react';
import './Homepage.css';
import Header from './Header'; // Import the Header component
import FlightSearchForm from './FlightSearchForm'; // Import the FlightSearchForm component

const HomePage = () => {
  
  return (
    <div className="homie">
    <div className="homepage">
      <Header /> {/* Use the Header component */}
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Discover Your Next Adventure</h2>
            <p>Find the best deals for your next trip</p>
            <FlightSearchForm />
          </div>
        
        </section>
        <section className="features">
          <div className="feature">
            <h3>Easy Booking Process</h3>
            <p>Book your flight tickets in just a few clicks</p>
          </div>
          <div className="feature">
            <h3>24/7 Customer Support</h3>
            <p>Our customer support team is always ready to assist you</p>
          </div>
          <div className="feature">
            <h3>Secure Payment</h3>
            <p>Your payments are secure with us</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Airline Reservation System. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default HomePage;