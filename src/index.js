
// Import required modules
const express = require('express');
const multer = require('multer');
const { dbConnect } = require('../config/dbConnection'); // Import custom database connection function
const User = require('../models/User'); // Import User model



// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();


// Define port and hostname from environment variables or use defaults
const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || 'localhost';



const app = express(); // Create an Express application

// Connect to the database
dbConnect();


// Middleware to parse JSON request bodies
app.use(express.json());


// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define filename with timestamp
    }
});

const upload = multer({ storage: storage }); // Create multer instance with the defined storage configuration




// Route to handle POST requests for creating a user
app.post('/api/v1/users', upload.single('photo'), async (req, res) => {
    try {
        const { username, email, password } = req.body; // Extract user details from request body

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,
            photo: req.file ? req.file.path : null // Save file path if a file is uploaded
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message and user data
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors and respond with error message
        res.status(400).json({ error: error.message });
    }
});





// Route to handle GET requests for fetching all users
app.get('/api/v1/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json(users);
    } catch (error) {
        // Handle errors and respond with error message
        res.status(500).json({ error: error.message });
    }
});





// Start the server and listen on the specified port and hostname
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});




