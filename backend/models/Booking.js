// backend/models/Booking.js

const db = require('../db');

/**
 * Represents a Booking in the airline system.
 */
class Booking {
    /**
     * Retrieves all bookings from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of booking objects.
     * @throws {Error} If there is an error retrieving the bookings.
     */
    static getAllBookings() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Reservations', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    /**
     * Retrieves a booking by its ID from the database.
     * @param {number} id - The ID of the booking.
     * @returns {Promise<Object|null>} A promise that resolves to the booking object, or null if not found.
     * @throws {Error} If there is an error retrieving the booking.
     */
    // static getBookingById(customerId) {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT * FROM Reservations WHERE customer_id = ?', [customerId], (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             if (results.length === 0) {
    //                 return resolve(null);
    //             }
    //             resolve(results[0]);
    //         });
    //     });
    // }

    static getBookingById(customerId) {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT f.flight_id, f.departure_city, f.destination_city, r.seat_number, r.confirmation_code, r.reservation_id
                FROM Reservations r
                JOIN Flights f ON r.flight_id = f.flight_id
                WHERE r.customer_id = ?`, [customerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
    

    /**
     * Creates a new booking in the database.
     * @param {Object} bookingData - The data for the new booking.
     * @returns {Promise<number>} A promise that resolves to the ID of the newly created booking.
     * @throws {Error} If there is an error creating the booking.
     */
    static createBooking(bookingData) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Reservations SET ?', bookingData, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            });
        });
    }

    /**
     * Updates a booking in the database.
     * @param {number} id - The ID of the booking to update.
     * @param {Object} bookingData - The updated data for the booking.
     * @returns {Promise<boolean>} A promise that resolves to true if the booking was updated successfully, or false otherwise.
     * @throws {Error} If there is an error updating the booking.
     */
    static updateBooking(id, bookingData) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Reservations SET ? WHERE reservation_id = ?', [bookingData, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }

    /**
     * Deletes a booking from the database.
     * @param {number} id - The ID of the booking to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the booking was deleted successfully, or false otherwise.
     * @throws {Error} If there is an error deleting the booking.
     */
    static deleteBooking(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM Reservations WHERE reservation_id = ?', [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }
}

module.exports = Booking;
