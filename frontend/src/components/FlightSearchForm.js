import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightSearchForm.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ConfirmationModal from './ConfirmationModal'; // Import the confirmation modal component

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tripType, setTripType] = useState('round_trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null); // To store the selected flight details
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the visibility of the confirmation modal

  useEffect(() => {
    // Retrieve form data from localStorage on component mount
    const formData = JSON.parse(localStorage.getItem('flightFormData'));
    if (formData) {
      setTripType(formData.tripType);
      setFrom(formData.from);
      setTo(formData.to);
      setDepartureDate(formData.departureDate);
      setReturnDate(formData.returnDate);
      setPassengers(formData.passengers);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = {
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      passengers
    };

    try {
      const response = await axios.post('http://localhost:5000/flights/search', formData);
      setIsLoading(false);
      setFlights(response.data);

      // Store form data in localStorage after successful search
      localStorage.setItem('flightFormData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error searching flights:', error);
      setIsLoading(false);
      setError('Failed to fetch flights. Please try again.');
    }
  };

  const handleBookNow = (flight) => {
    if(!user){
      // User is not logged in, redirect to login
      // Store current URL in localStorage to redirect back after login
      
      navigate('/login');

    } 

    setSelectedFlight(flight); // Set the selected flight details
    setShowConfirmation(true); // Show the confirmation modal
  };

  const confirmBooking = async () => {
    setShowConfirmation(false); // Close the confirmation modal
    try {
      const response = await axios.post('http://localhost:5000/bookings/book-flight', {
        flightId: selectedFlight.flight_id,
        numPassengers: passengers,
        customerId: user.customer_id
      });

      console.log('Booking response:', response.data);
      navigate('/booking'); // Navigate to the booking page
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  };

  return (
    <div className="container">
      <h2>Flight</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className="input-group">
          <label htmlFor="trip-type">Trip Type:</label>
          <select
            id="trip-type"
            name="trip_type"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="round_trip">Round Trip</option>
            <option value="one_way">One Way</option>
            <option value="multi_city">Multi-City</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Enter departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            name="to"
            placeholder="Enter destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="departure-date">Departure Date:</label>
          <input
            type="date"
            id="departure-date"
            name="departure_date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        {tripType === 'round_trip' && (
          <div className="input-group">
            <label htmlFor="return-date">Return Date:</label>
            <input
              type="date"
              id="return-date"
              name="return_date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="passengers">Passengers:</label>
          <select
            id="passengers"
            name="passengers"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4">4 Passengers</option>
            <option value="5">5 Passengers</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {/* Flight list */}
      {flights && flights.length > 0 && (
        <div className="flight-list">
          <h3>Available Flights</h3>
          {flights.map((flight) => (
            <div key={flight.flight_id} className="flight-item">
              {/* Flight details */}
              <div className="flight-details">
          <p>
            <strong>Flight Number:</strong> {flight.flight_id}
          </p>
          <p>
            <strong>Departure:</strong> {flight.departure_city} - {flight.departure_time}
          </p>
          <p>
            <strong>Arrival:</strong> {flight.destination_city} - {flight.arrival_time}
          </p>
          <p>
            <strong>Departure Date:</strong> {new Date(flight.departure_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Available Seats:</strong> {flight.available_seats}
          </p>
          <p>
            <strong>Ticket Price:</strong> ${flight.ticket_price}
          </p>
        </div>
              <button className="book-button" onClick={() => handleBookNow(flight)}>Book Now</button>
            </div>
          ))}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Confirmation modal */}
      {showConfirmation && (
        <ConfirmationModal
          flight={selectedFlight}
          passengers={passengers}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default FlightSearchForm;
