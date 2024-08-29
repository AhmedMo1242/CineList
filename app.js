const path = require('path');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// Create an instance of the express application
const app = express();
app.use(bodyParser.json()); // application/json

const authRoutes = require('./routes/lists');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Specify a port number for the server
const port=5000;

app.use('/lists', authRoutes);


// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



