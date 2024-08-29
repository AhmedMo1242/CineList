const Utils = require('../utils/lists');
const { CreateList, lists } = require('../models/list');
const request = require('request');
const axios = require('axios');

// Store the TMDB authentication token securely, preferably in environment variables - Use Your Own Here.
const TMDB_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjEzMzU3MzRlZGIzOGVhMzdlYzhiMTY2MjRmNzA2NSIsIm5iZiI6MTcyNDMwNzk4Ny4xOTA3OTgsInN1YiI6IjY0ODNkYzk0YmYzMWYyNTA1NzA1ZDlhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtyuRuWUlB0wWtsk8aN6pwQM7AAK2OWHMMsrX8xUVO0';

/**
 * Handler to retrieve a specific list by ID.
 * 
 * @route GET /lists/:id
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {Object} res - The response object used to send the list data or an error message.
 * @returns {void}
 */
exports.getList = (req, res) => {
    // Get the id parameter from the request
    const id = req.params.id;

    // Find the post with the given id in the lists array
    const post = lists.find((p) => p.id == id);

    // If the post exists, send it as a JSON response
    if (post) {
        res.json(post);
    } else {
        // If the post does not exist, send a 404 status code and a message
        res.status(404).send('Post not found');
    }
};

/**
 * Handler to delete a specific list by ID.
 * 
 * @route DELETE /lists/:id
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {Object} res - The response object used to confirm deletion or send an error message.
 * @returns {void}
 */
exports.deleteList = (req, res) => {
    // Get the id parameter from the request
    const id = req.params.id;

    // Find the post with the given id in the lists array
    const post = lists.find((p) => p.id == id);

    // If the post exists, delete it
    if (post) {
        res.json(post);
        Utils.DeleteList(post);
    } else {
        // If the post does not exist, send a 404 status code and a message
        res.status(404).send('Post not found');
    }
};

/**
 * Handler to add a new list by fetching movie data from the TMDB API.
 * 
 * @route POST /lists
 * @param {Object} req - The request object containing the list ID in the body.
 * @param {Object} res - The response object used to send the created list data or an error message.
 * @returns {void}
 */
exports.addList = async (req, res) => {
    // Get the data from the request body
    const listId = req.body.id; // Assuming you're sending an ID in the request body
    let list_temp = [];
    
    // Define the options for the TMDB API request
    let options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=1`,
        headers: {
            accept: 'application/json',
            Authorization: TMDB_AUTH_TOKEN 
        }
    };

    try {
        // Make the request to the TMDB API using axios
        let response = await axios(options);

        
        for (let i = 0; i < response.data['total_pages']; i++) {
            if (i != 0) {
                options = {
                    method: 'GET',
                    url: `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=${i + 1}`,
                    headers: {
                        accept: 'application/json',
                        Authorization: TMDB_AUTH_TOKEN 
                    }
                };
                response = await axios(options);
            }
            for (let j = 0; j < response.data['items'].length; j++) {
                list_temp.push(response.data['items'][j]['title']);
            }
        }
        lists.push(CreateList(listId, list_temp));
        res.status(201).json(lists);
    } catch (error) {
        // Handle any errors that occurred during the request
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response from TMDB API:', error.response.data);
            res.status(error.response.status).send('Error occurred: ' + error.response.data.status_message);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            res.status(500).send('No response from TMDB API');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
            res.status(500).send('Error occurred: ' + error.message);
        }
    }
};

/**
 * Handler to retrieve movies that appear in all lists.
 * 
 * @route GET /lists/movies
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the combined movie data or an error message.
 * @returns {void}
 */
exports.getMovies = (req, res) => {
    // Send the movies data that appear in all lists as a JSON response
    res.status(200).json(Utils.CombineLists(lists));
};
