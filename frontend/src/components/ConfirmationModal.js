// ConfirmationModal.js

import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ flight, passengers, onCancel, onConfirm }) => {
  return (
    <div className="confirm">
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Booking</h2>
        <p>Please review your booking details before confirming:</p>
        <div className="flight-details">
          <p>
            <strong>Flight Number:</strong> {flight.flight_number}
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
        <p>Passengers: {passengers}</p>
        <div className="button-container">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmationModal;
