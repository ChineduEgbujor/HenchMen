const connection = require('../db');

// controllers/managerController.js
const generateReport = (req, res) => {
    // Extract start and end dates from request body
    const { startDate, endDate } = req.body;
  
    // Execute the SQL query
    const query = `
      SELECT
          COUNT(r.reservation_id) AS total_reservations,
          SUM(f.ticket_price) AS total_revenue,
          f.destination_city,
          COUNT(r.reservation_id) AS reservations_per_destination
      FROM
          Reservations r
      JOIN
          Flights f ON r.flight_id = f.flight_id
      WHERE
          r.reservation_date BETWEEN ? AND ?
      GROUP BY
          f.destination_city
      ORDER BY
          reservations_per_destination DESC
      LIMIT 3;
    `;
  
    connection.query(query, [startDate, endDate], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error generating report' });
        return;
      }
  
      // Send the results as JSON response
      res.json(results);
    });
  };
  
  const authenticateManager = (req, res) => {
    // Authentication logic goes here
    const { email, password } = req.body;

    connection.query('SELECT * FROM Managers WHERE email = ?', [email], async (error, results) => {
        if (error || results.length === 0 ) {
            return res.status(401).send('Authentication failed');
        }
        

        // Extract relevant user data
      //  const { customer_id, first_name } = results[0];
        

        // Send back response with customer_id and name
        res.status(200).json({ message: 'Authentication successful' });
        
    });
  };
  
  module.exports = { generateReport, authenticateManager };
  