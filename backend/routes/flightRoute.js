// backend/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightControllers');

// Existing CRUD routes
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);
router.post('/', flightController.createFlight);
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

// Add a new route for searching flights
router.post('/search', flightController.searchFlights);

module.exports = router;
