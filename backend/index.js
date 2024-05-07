require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('./db');
const bookingRoutes = require('./routes/bookingRoute');
const app = express();
const port = 5000;
const cors = require('cors');
const flightRoutes = require('./routes/flightRoute');
const managerRoutes = require('./routes/managerRoute');


app.use(cors());
app.use(express.json());

//flight
app.use('/flights', flightRoutes);

//booking
app.use('/bookings', bookingRoutes);

//manager
app.use('/manager', managerRoutes);

// Register User
app.post('/register', async (req, res) => {
    //console.log(req.body);
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 8);

    

    // Prepare the SQL query to insert the new user data into the database
    const query = 'INSERT INTO Customers (first_name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?)';
    const values = [firstName, lastName, email, hashedPassword, phoneNumber];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error registering the user:", error);
            return res.status(500).send('Error registering the user');
        }
        //console.log('User registered:', results.insertId); // Output the ID of the new user
        res.status(201).send('User registered');
    });
});

// Login User
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM Customers WHERE email = ?', [email], async (error, results) => {
        if (error || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send('Authentication failed');
        }
        

        // Extract relevant user data
        const { customer_id, first_name } = results[0];
        

        // Send back response with customer_id and name
        res.status(200).json({ customer_id, first_name, message: 'Authentication successful' });
        
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
