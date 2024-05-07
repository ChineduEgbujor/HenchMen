/**
 * @fileoverview This file contains the controller functions for managing bookings.
 * @module controllers/bookingController
 */

const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

/**
 * Retrieves all bookings.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing all bookings.
 */
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAllBookings();
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Retrieves a booking by its ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the booking details.
 */
exports.getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Creates a new booking.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the ID of the newly created booking.
 */
exports.createBooking = async (req, res) => {
    const bookingData = req.body;
    try {
        const newBookingId = await Booking.createBooking(bookingData);
        res.status(201).json({ id: newBookingId, message: 'Booking created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// exports.bookFlight = async (req, res) => {
//     const { flightId, numPassengers } = req.body;
  
//     try {
//       // Retrieve current flight details from the database
//       const flightDetails = await Flight.getFlightById(flightId);
  
//       if (!flightDetails) {
//         return res.status(404).json({ error: 'Flight not found' });
//       }
  
//       const currentAvailableSeats = flightDetails.available_seats;
//       const newAvailableSeats = currentAvailableSeats - numPassengers;
  
//       if (newAvailableSeats < 0) {
//         return res.status(400).json({ error: 'Not enough seats available' });
//       }
//       const flightData = newAvailableSeats;
  
//       // Update the database with new available seats count
//       await Flight.updateFlight(flightData, flightId);
  
//       // Respond with success message or updated flight details
//       res.status(200).json({ message: 'Booking successful' });
//     } catch (error) {
//       console.error('Error booking flight:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.bookFlight = async (req, res) => {
    const { flightId, numPassengers, customerId } = req.body;
    console.log("customer id is", customerId);

    try {
        // Get flight details
        const flight = await Flight.getFlightById(flightId);

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        const currentAvailableSeats = flight.available_seats;
        const newAvailableSeats = currentAvailableSeats - numPassengers;

        if (newAvailableSeats < 0) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }

        // Start transaction
       // const connection = await db.getConnection();

        try {
           // await connection.beginTransaction();

            // Update available seats
            await Flight.updateFlight(newAvailableSeats, flightId);

            

            // Insert reservation
            const reservationData = {
                customer_id: customerId,
                flight_id: flightId,
                seat_number: generateSeatNumber(), // Call a function to generate seat number
                confirmation_code: generateConfirmationCode(flightId, customerId) // Call a function to generate confirmation code   
            };

            console.log("seat number is", reservationData.seat_number);

            const newReservation = await Booking.createBooking(reservationData);

            //await connection.commit();

            res.status(200).json({ message: 'Booking successful', reservationId: newReservation.id });
        } catch (error) {
           // await connection.rollback();
            console.error('Error booking flight:', error);
            res.status(500).json({ error: 'Internal server error' });
        } 
        // finally {
        //     connection.release();
        // }
    } catch (error) {
        console.error('Error booking flight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Updates a booking by its ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response indicating the success of the update operation.
 */
exports.updateBooking = async (req, res) => {
    const { id } = req.params;
    const bookingData = req.body;
    try {
        const updated = await Booking.updateBooking(id, bookingData);
        if (!updated) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Deletes a booking by its ID.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response indicating the success of the delete operation.
 */
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Booking.deleteBooking(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

function generateConfirmationCode(flightId, customerId) {
    // Generate a random confirmation code using flight ID, customer ID, and reservation ID
    const reservationId = Math.floor(Math.random() * 1000000); // Assuming reservation ID is generated randomly
    const confirmationCode = `${flightId}-${customerId}-${reservationId}`;
    return confirmationCode;
}

function generateSeatNumber() {
    // Generate a random seat number
    const seatNumber = Math.floor(Math.random() * 100) + 1;
    return seatNumber;
}
