// backend/controllers/flightController.js

const Flight = require('../models/Flight');

/**
 * Get all flights
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The list of flights
 */
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.getAllFlights();
        res.json(flights);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Search for flights based on search criteria
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.searchFlights = async (req, res) => {
    try {
        const { from, to, departureDate, returnDate, passengers, tripType } = req.body;
        console.log(req.body)
        const results = await Flight.searchFlights({ from, to, departureDate, returnDate, passengers, tripType });
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching flights:', error);
        res.status(500).json({
            message: "Failed to process search request",
            error: error.message
        });
    }
};

/**
 * Get flight by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The flight with the specified ID
 */
exports.getFlightById = async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await Flight.getFlightById(id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json(flight);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Create a new flight
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The ID of the newly created flight
 */
exports.createFlight = async (req, res) => {
    const flightData = req.body;
    try {
        const newFlightId = await Flight.createFlight(flightData);
        res.status(201).json({ id: newFlightId, message: 'Flight created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Update a flight
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - A success message indicating that the flight was updated successfully
 */
exports.updateFlight = async (req, res) => {
    const { id } = req.params;
    const flightData = req.body;
    try {
        const updated = await Flight.updateFlight(id, flightData);
        if (!updated) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json({ message: 'Flight updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Delete a flight
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - A success message indicating that the flight was deleted successfully
 */
exports.deleteFlight = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Flight.deleteFlight(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json({ message: 'Flight deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
//module.exports = flightController;