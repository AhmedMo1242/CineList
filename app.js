const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const {CombineLists,CreateList,lists,DeleteList}  = require('./models/list');

// Create an instance of the express application
const app=express();
app.use(bodyParser.json()); // application/json

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


// Create a route and a handler for GET /posts
app.get('/posts', (req, res) => {
  // Send the posts array as a JSON response
  res.status(200).json(lists);
});

// Create a route and a handler for GET /posts/:id
app.get('/posts/:id', (req, res) => {
  // Get the id parameter from the request
  const id = req.params.id;

  // Find the post with the given id in the posts array
  const post = lists.find((p) => p.id == id);

  // If the post exists, send it as a JSON response
  if (post) {
    res.json(post);
    
  } else {
    // If the post does not exist, send a 404 status code and a message
    res.status(404).send('Post not found');
  }
});

// Create a route and a handler for GET /posts/:id
app.delete('/posts/:id', (req, res) => {
  // Get the id parameter from the request
  const id = req.params.id;

  // Find the post with the given id in the posts array
  const post = lists.find((p) => p.id == id);

  // If the post exists, send it as a JSON response
  if (post) {
    res.json(post);
    DeleteList(post);
  } else {
    // If the post does not exist, send a 404 status code and a message
    res.status(404).send('Post not found');
  }
});

// Create a route and a handler for POST /posts
app.post('/posts', (req, res) => {
  // To handle the request body, we need to use a middleware called express.json
  // This middleware parses the request body as JSON and adds it to the req object
  app.use(express.json());

  // Get the data from the request body
  const data = req.body;
  console.log(data);
  // Validate the data
  if (data.movies) {
    // If the data is valid, create a new post object with a new id
    const newId = lists.length + 1;
    const newPost = new CreateList(newId, data.movies);
    lists.push(newPost);
    console.log(lists);
    // Add the new post to the posts array
    // Send a 201 status code and the new post as a JSON response
    res.status(201).json(newPost);
  } else {
    // If the data is invalid, send a 400 status code and a message
    res.status(400).send('Invalid data');
  }
});



app.get('/combined', (req, res) => {
  // Send the posts array as a JSON response
  console.log("f");
  console.log(lists);
  res.status(200).json(CombineLists(lists));
});

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



