const Utils = require('../utils/lists');
const { CreateList, lists } = require('../models/list');
const request = require('request');
const axios = require('axios');

// Store the TMDB authentication token securely, preferably in environment variables - Use Your Own Here.
const TMDB_AUTH_TOKEN = 'Bearer ';

/**
 * Handler to retrieve a specific list by its ID.
 * 
 * @route GET /lists/:id
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {string} req.params.id - The ID of the list to retrieve.
 * @param {Object} res - The response object used to send the list data or an error message.
 * @returns {void}
 */
exports.getList = async (req, res) => {
    try {
        // Get the id parameter from the request
        const id = req.params.id;

        // Wait for the promise returned by FindList to resolve
        const post = await Utils.FindList(id);
        
        // If the post exists, send it as a JSON response
        if (post && post.length > 0) {
            res.json(post);
        } else {
            // If the post does not exist, send a 404 status code and a message
            res.status(404).send('List not found');
        }
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error getting list:', error);
        res.status(500).send('Server error');
    }
};

/**
 * Handler to delete a specific list by its ID.
 * 
 * @route DELETE /lists/:id
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {string} req.params.id - The ID of the list to delete.
 * @param {Object} res - The response object used to confirm deletion or send an error message.
 * @returns {void}
 */
exports.deleteList = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Utils.DeleteList(id);

        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(404).send(result.message);
        }
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).send('Server error');
    }
};

/**
 * Handler to add a new list by fetching movie data from the TMDB API.
 * 
 * @route POST /lists
 * @param {Object} req - The request object containing the list ID in the body.
 * @param {string} req.body.id - The ID of the list to fetch from TMDB.
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

        // Iterate through all pages of the TMDB API response
        for (let i = 0; i < response.data['total_pages']; i++) {
            if (i != 0) {
                options.url = `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=${i + 1}`;
                response = await axios(options);
            }
            for (let j = 0; j < response.data['items'].length; j++) {
                list_temp.push(response.data['items'][j]['title']);
            }
        }
        
        // Add the list to the database
        const result = await Utils.AddList({
            Id_Site: 'XYZ123',
            id: listId,
            site: 'TMDB',
            movies: list_temp
        });

        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(404).send(result.message);
        }
    } catch (error) {
        console.error('Error adding list:', error);
        res.status(500).send('Server error');
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
exports.getMovies = async (req, res) => {
    try {
        // Call CombineLists and wait for the result
        const movies = await Utils.CombineLists();
        
        // Send the movies data that appear in all lists as a JSON response
        res.status(200).json(movies);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching movies:', error);
        res.status(500).send('Server error');
    }
};
