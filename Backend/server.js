require('dotenv').config(); // Load environment variables from .env file

// MongoDB connection
require('./config/db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./api/User');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: '*', // Allow all headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); 

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User routes
app.use('/user', UserRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port} 🦹‍♀️`);
});
