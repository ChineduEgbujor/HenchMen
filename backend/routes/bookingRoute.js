const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get booking by id
router.get('/:id', bookingController.getBookingById);

//delete booking
router.delete('/:id', bookingController.deleteBooking);

router.post('/book-flight', bookingController.bookFlight);

module.exports = router;