// backend/models/Flight.js
const db = require('../db');

/**
 * Represents a Flight object and provides methods to interact with flight data in the database.
 */
class Flight {

    /**
     * Retrieves all flights from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves with an array of flight objects.
     * @throws {Error} If an error occurs while fetching flights from the database.
     */
    static getAllFlights() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Flights', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    /**
     * Retrieves a flight from the database by its ID.
     * @param {number} id - The ID of the flight to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves with the flight object if found, or null if not found.
     * @throws {Error} If an error occurs while fetching the flight from the database.
     */
    static getFlightById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Flights WHERE flight_id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(results[0]);
            });
        });
    }

    /**
     * Creates a new flight in the database.
     * @param {Object} flightData - The data of the flight to create.
     * @returns {Promise<number>} A promise that resolves with the ID of the created flight.
     * @throws {Error} If an error occurs while creating the flight in the database.
     */
    static createFlight(flightData) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Flights SET ?', flightData, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    }

    /**
     * Updates an existing flight in the database.
     * @param {number} id - The ID of the flight to update.
     * @param {Object} flightData - The updated data of the flight.
     * @returns {Promise<boolean>} A promise that resolves with true if the flight was successfully updated, false otherwise.
     * @throws {Error} If an error occurs while updating the flight in the database.
     */
    static updateFlight(flightData, id) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Flights SET available_seats = ? WHERE flight_id = ?', [flightData, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }

    /**
     * Deletes a flight from the database by its ID.
     * @param {number} id - The ID of the flight to delete.
     * @returns {Promise<boolean>} A promise that resolves with true if the flight was successfully deleted, false otherwise.
     * @throws {Error} If an error occurs while deleting the flight from the database.
     */
    static deleteFlight(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM Flights WHERE flight_id = ?', [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }

    
/**
 * Searches for flights based on the provided criteria.
 *
 * @param {Object} options - The search options.
 * @param {string} options.from - The departure city.
 * @param {string} options.to - The destination city.
 * @param {string} options.departureDate - The departure date.
 * @param {string} options.returnDate - The return date (optional, only for round trips).
 * @param {number} options.passengers - The number of passengers.
 * @param {string} options.tripType - The type of trip ('one_way' or 'round_trip').
 * @returns {Promise<Array>} A promise that resolves to an array of flight objects matching the search criteria.
 * @throws {Error} If there is an error executing the database query.
 */
static searchFlights({ from, to, departureDate, returnDate, passengers, tripType }) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM Flights WHERE departure_city = ? AND destination_city = ? AND departure_date = ? AND available_seats >= ?`;
        let queryParams = [from, to, departureDate, passengers];

        if (tripType === 'round_trip') {
            query += " AND return_date = ?";
            queryParams.push(returnDate);
        }

        db.query(query, queryParams, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

/**
 * Generates a seat number for a given flight.
 *
 * @param {number} flightId - The ID of the flight.
 * @returns {string} The generated seat number.
 */
static generateSeatNumber(flightId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS numReservations FROM Flights WHERE flight_id = ?', [flightId], (err, results) => {
            if (err) {
                return reject(err);
            } 
            resolve(results.values)
       
        
});



    // try {
    //     // Retrieve the total number of reservations for the given flight
    //     const rows = await db.query('SELECT COUNT(*) AS numReservations FROM Flights WHERE flight_id = ?', [flightId]);
       
    //     const numReservations = rows.values[0];
    //     console.log("this has type ",typeof numReservations)
        

    //     // Calculate the next seat number based on the total number of reservations
    //     const nextSeatNumber = numReservations + 1;
    //     console.log("next seat number is", nextSeatNumber);

    //     // Assuming seat numbers are in the format "A1", "A2", "A3", ...
    //     const seatNumber = String.fromCharCode(65 + Math.floor(nextSeatNumber / 6)) + (nextSeatNumber % 6 + 1);
    //     console.log("seat number is", seatNumber);

    //     return seatNumber;
    // } catch (error) {
    //     console.error('Error generating seat number:', error);
    //     throw error; // Rethrow the error for further handling
    // }
});
}

}

module.exports = Flight;
