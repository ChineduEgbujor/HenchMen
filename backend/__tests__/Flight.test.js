// Import the Flight model
const Flight = require('../models/Flight');

// Mocking the db object
const db = {
  query: jest.fn(),
};

describe('Flight Model', () => {
  // Test suite for getAllFlights method
  describe('getAllFlights', () => {
    it('should retrieve all flights from the database', async () => {
      // Mocking the query result
      db.query.mockResolvedValueOnce([/* mock flight data */]);
      // Act
      const flights = await Flight.getAllFlights();
      // Assert
      expect(flights).toHaveLength(5); // Adjust this based on your mock data
    });

    // it('should throw an error if an error occurs while fetching flights', async () => {
    //   // Mocking the query to throw an error
      
    //   db.query.mockImplementationOnce((query, callback) => {
    //     callback(new Error('Database error'), null);
    //   });
    //   // Act and Assert
    //   await expect(Flight.getAllFlights()).rejects.toThrow('Database error');
    // });
  });

  // Test suite for getFlightById method
  describe('getFlightById', () => {
    it('should retrieve a flight by its ID', async () => {
      // Mocking the query result
      db.query.mockResolvedValueOnce([/* mock flight data */]);
      // Act
      const flight = await Flight.getFlightById(1); // Assuming flight with ID 1 exists
      // Assert
      expect(flight).toBeDefined(); // Adjust this based on your mock data
    });

    it('should return null if no flight is found for the given ID', async () => {
      // Mocking the query result to return an empty array
      db.query.mockResolvedValueOnce([]);
      // Act
      const flight = await Flight.getFlightById(10); // Assuming flight with ID 1 doesn't exist
      // Assert
      expect(flight).toBeNull();
    });

    // it('should throw an error if an error occurs while fetching the flight', async () => {
    //   // Mocking the query to throw an error
    //   db.query.mockImplementationOnce((query, params, callback) => {
    //     callback(new Error('Database error'), null);
    //   });
    //   // Act and Assert
    //   await expect(Flight.getFlightById(1)).rejects.toThrow('Database error');
    // });
  });
});

// Export the mocked db object for use in other test files
module.exports = db;
