const Utils  = require('../utils/lists');
const {CreateList,lists} = require('../models/list');
const request = require('request');
const axios = require('axios');

  // Create a handler for GET to know the Elements of A list
  exports.getList =  (req, res) => {
    // Get the id parameter from the request
    const id = req.params.id;
  
    // Find the     post with the given id in the posts array
    const post = lists.find((p) => p.id == id);
  
    // If the post exists, send it as a JSON response
    if (post) {
      res.json(post);
      
    } else {
      // If the post does not exist, send a 404 status code and a message
      res.status(404).send('Post not found');
    }
  };
  
  // Creat a handler for DELETE to delete a list
  exports.deleteList =  (req, res) => {
    // Get the id parameter from the request
    const id = req.params.id;
  
    // Find the post with the given id in the posts array
    const post = lists.find((p) => p.id == id);
  
    // If the post Doesn't exist, Delete it
    if (post) {
      res.json(post);
      Utils.DeleteList(post);
    } else {
      // If the post does not exist, send a 404 status code and a message
      res.status(404).send('Post not found');
    }
  };
  // The API key and list ID should be stored securely, for example in environment variables
  const TMDB_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjEzMzU3MzRlZGIzOGVhMzdlYzhiMTY2MjRmNzA2NSIsIm5iZiI6MTcyNDMwNzk4Ny4xOTA3OTgsInN1YiI6IjY0ODNkYzk0YmYzMWYyNTA1NzA1ZDlhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtyuRuWUlB0wWtsk8aN6pwQM7AAK2OWHMMsrX8xUVO0';
  // Create a handler for POST to add a List
  exports.addList = (req, res) => {
    // Get the data from the request body
    const listId = req.body.id; // Assuming you're sending an ID in the request body
    
    // Define the options for the TMDB API request
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=1`,
        headers: {
            accept: 'application/json',
            Authorization:  TMDB_AUTH_TOKEN // Make sure your token is properly formatted
        }
    };

    // Make the request to the TMDB API
    request(options, function (error, response, body) {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }

        // Parse the JSON response from the TMDB API
        let movies;
        try {
            movies = JSON.parse(body);
        } catch (parseError) {
            return res.status(500).send('Error parsing response from TMDB API');
        }

        // Log and send the movies data in the response
        console.log(movies);
    });
};
    //   // If the data is valid, create a new post object with a new id
    //   const newId = lists.length + 1;
    //   const newPost = new CreateList(newId, data.movies);
    //   lists.push(newPost);
    //   console.log(lists);
    //   // Add the new post to the posts array
    //   // Send a 201 status code and the new post as a JSON response
    //   res.status(201).json(newPost);
    

  
 

 // Create a handler for GET to know the movies appear in all lists we added
 exports.getMovies = (req, res) => {
    // Send the posts array as a JSON response
    console.log("f");
    console.log(lists);
    res.status(200).json(Utils.CombineLists(lists));
  };
  
 