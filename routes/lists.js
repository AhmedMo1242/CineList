const express = require('express');
const listController = require('../controllers/lists');

const router = express.Router();

  
  // Create a route and a handler for GET /posts/:id
  router.get('/:id', listController.getList);
  
  // Create a route and a handler for GET /posts/:id
  router.delete('/:id', listController.deleteList);
  
  // Create a route and a handler for POST /posts
  router.post('/', listController.addList);
  
  
  
  router.get('/', listController.getMovies);
  
//   // The API key and list ID should be stored securely, for example in environment variables
//   const TMDB_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjEzMzU3MzRlZGIzOGVhMzdlYzhiMTY2MjRmNzA2NSIsIm5iZiI6MTcyNDMwNzk4Ny4xOTA3OTgsInN1YiI6IjY0ODNkYzk0YmYzMWYyNTA1NzA1ZDlhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtyuRuWUlB0wWtsk8aN6pwQM7AAK2OWHMMsrX8xUVO0';
  
//   // Define the route
//   app.get('/movies/list/:list_id', (req, res) => {
//     const listId = req.params.list_id; // Get the list ID from the URL parameter
  
//     const options = {
//         method: 'GET',
//         url: `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=1`,
//         headers: {
//             accept: 'application/json',
//             Authorization: TMDB_AUTH_TOKEN
//         }
//     };
  
//     request(options, function (error, response, body) {
//         if (error) {
//             res.status(500).send('Error occurred: ' + error.message);
//             return;
//         }
  
//         // Send the API response back to the client
//         body = JSON.parse(body);
//         console.log(body["items"][0]['title']);
//         res.status(200).json(body);});
//   });

module.exports = router ;
