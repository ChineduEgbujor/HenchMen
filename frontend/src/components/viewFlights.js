import React, { useState, useEffect } from 'react';
import './viewFlights.css';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewFlights = () => {
    const [reservations, setReservations] = useState([]);
    // const navigate = useNavigate();
    // const { user } = useAuth();

    
    //console.log("user id is", user.customer_id);

    

    useEffect(() => {
        
            fetchReservations();
        
    }); // Fetch reservations when user is available
    

    const fetchReservations = async () => {

        try {
            const response = await axios.get(`http://localhost:5000/bookings/1`);
            // Check if response.data is an object
            if (typeof response.data === 'object') {
                // Transform object data into an array
                const flatReservations = response.data.flat();
                //const reservationArray = [response.data];
                setReservations(flatReservations);
                //console.log("reservations are", reservations)
            } else {
                console.error('Error: Response data is not an object');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };
    
    

    const cancelReservation = async (reservationId) => {
        try {
            await axios.delete(`/api/reservations/${reservationId}`);
            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
        } catch (error) {
            console.error('Error canceling reservation:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="heading">My Flight Reservations</h2>
            <div className="reservations">
                {reservations.length === 0 ? (
                    <p className="no-reservations">No reservations found.</p>
                ) : (
                    <ul className="reservation-list">
                        {reservations.map(reservation => (
    <li key={reservation.reservation_id} className="reservation-item">
        <p className="flight">Flight: {reservation.flight_id}</p>
        <p className="departure">Departure: {reservation.departure_city}</p>
        <p className="destination">Destination: {reservation.destination_city}</p>
        <p className="seat">Seat: {reservation.seat_number}</p>
        <p className="confirmation-code">Confirmation Code: {reservation.confirmation_code}</p>
        <button className="cancel-button" onClick={() => cancelReservation(reservation.id)}>Cancel</button>
    </li>
))}

                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewFlights;
