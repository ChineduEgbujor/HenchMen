import React from 'react';
import './FlightItem.css';

const FlightItem = ({ flight }) => {
  const {
    flight_id,
    departure_city,
    departure_time,
    destination_city,
    arrival_time,
    available_seats,
    ticket_price,
    travel_duration,
    flight_type
  } = flight;

  const handleClick = () => {
    // Handle flight selection here, e.g., navigate to flight details page
  };

  const formattedDepartureTime = new Date(departure_time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });
  
  const formattedArrivalTime = new Date(arrival_time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <div className='flight-Item'>
    <button
      id={`FLIGHTS_DETAILS_AND_FARES-index-${flight_id}`}
      data-test-id="select-link"
      data-stid={`FLIGHTS_DETAILS_AND_FARES-index-${flight_id}`}
      className="uitk-card-link"
      onClick={handleClick}
    >
      <span className="is-visually-hidden">
        Select and show fare information for {flight_type} flight, departing at {formattedDepartureTime} from {departure_city}, 
        arriving at {formattedArrivalTime} in {destination_city}, Priced at ${ticket_price.toFixed(2)} Roundtrip per traveler. 
        {travel_duration}, {available_seats} available seats.
      </span>
    </button>
    </div>
  );
};

export default FlightItem;
