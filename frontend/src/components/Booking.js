import React from 'react';
import './Booking.css';
import Logout from './logout'; // Import the Logout component


const Booking = () => {
    return (
        <div className="booking">
            <div className="booking-container">
                <h1>Thanks for flying with us!</h1>
                <p>We appreciate your choice and look forward to serving you on board.</p>
                <Logout /> {/* Render the Logout component */}
            </div>
        </div>
    );
}

export default Booking;
