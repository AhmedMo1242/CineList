const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// Create an instance of the express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json()); // application/json

const authRoutes = require('./routes/lists');

/**
 * Middleware to handle Cross-Origin Resource Sharing (CORS) settings.
 * This allows the server to accept requests from any origin and supports various HTTP methods.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/CineList'; // Local MongoDB connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));



// Specify a port number for the server
const port = 5000;

/**
 * Route Middleware
 * Routes all requests starting with '/lists' to the routes defined in the 'authRoutes' module.
 */
app.use('/lists', authRoutes);

/**
 * Start the server and listen on the specified port.
 * Logs a message to the console once the server is up and running.
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
