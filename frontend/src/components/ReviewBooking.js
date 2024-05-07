import React from 'react';
import { Link } from 'react-router-dom';

const ReviewBooking = ({ formData, flights, handleCancel }) => {
  return (
    <div className="container">
      <h2>Review Your Booking</h2>
      <div>
        <p><strong>From:</strong> {formData.from}</p>
        <p><strong>To:</strong> {formData.to}</p>
        <p><strong>Departure Date:</strong> {formData.departureDate}</p>
        {formData.tripType === 'round_trip' && <p><strong>Return Date:</strong> {formData.returnDate}</p>}
        <p><strong>Passengers:</strong> {formData.passengers}</p>
      </div>
      <h3>Available Flights</h3>
      <div className="flight-list">
        {flights.map((flight) => (
          <div key={flight.flight_id} className="flight-item">
            <div className="flight-details">
              <p><strong>Flight Number:</strong> {flight.flight_number}</p>
              <p><strong>Departure:</strong> {flight.departure_city} - {flight.departure_time}</p>
              <p><strong>Arrival:</strong> {flight.destination_city} - {flight.arrival_time}</p>
              <p><strong>Departure Date:</strong> {new Date(flight.departure_date).toLocaleDateString()}</p>
              <p><strong>Available Seats:</strong> {flight.available_seats}</p>
              <p><strong>Ticket Price:</strong> ${flight.ticket_price}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default ReviewBooking;
