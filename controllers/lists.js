const Utils = require('../utils/lists');
const axios = require('axios');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const TMDB_AUTH_TOKEN = process.env.TMDB_AUTH_TOKEN;

/**
 * Handler to retrieve a specific list by its ID.
 * 
 * @route GET /lists/:id
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {string} req.params.id - The ID of the list to retrieve.
 * @param {Object} req.user - The user information attached by the `verifyToken` middleware.
 * @param {Object} res - The response object used to send the list data or an error message.
 * @returns {void}
 */
exports.getList = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId; // User info from verifyToken middleware

        // Fetch the list associated with the user
        const post = await Utils.FindList({ id: id, user: userId });

        if (post && post.length > 0) {
            res.json(post);
        } else {
            res.status(404).send('List not found');
        }
    } catch (error) {
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
 * @param {Object} req.user - The user information attached by the `verifyToken` middleware.
 * @param {Object} res - The response object used to confirm deletion or send an error message.
 * @returns {void}
 */
exports.deleteList = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;  // User info from verifyToken middleware

        const result = await Utils.DeleteList({ id: id, user: userId });

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
 * @param {Object} req.user - The user information attached by the `verifyToken` middleware.
 * @param {Object} res - The response object used to send the created list data or an error message.
 * @returns {void}
 */
exports.addList = async (req, res) => {
    const listId = req.body.id;
    let list_temp = [];
    const userId = req.user.userId;  // User info from verifyToken middleware
    let options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=1`,
        headers: {
            accept: 'application/json',
            Authorization: TMDB_AUTH_TOKEN
        }
    };

    try {
        let response = await axios(options);

        for (let i = 0; i < response.data['total_pages']; i++) {
            if (i !== 0) {
                options.url = `https://api.themoviedb.org/3/list/${listId}?language=en-US&page=${i + 1}`;
                response = await axios(options);
            }
            for (let j = 0; j < response.data['items'].length; j++) {
                list_temp.push(response.data['items'][j]['title']);
            }
        }
        const result = await Utils.AddList({
            Id_Site: 'XYZ123',
            id: listId,
            site: 'TMDB',
            movies: list_temp,
            user: userId  // Associate list with user
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
 * @param {Object} req.user - The user information attached by the `verifyToken` middleware.
 * @param {Object} res - The response object used to send the combined movie data or an error message.
 * @returns {void}
 */
exports.getMovies = async (req, res) => {
    try {
        const userId = req.user.userId;  // User info from verifyToken middleware

        // Fetch movies that appear in all lists for the logged-in user
        const movies = await Utils.CombineListsForUser(userId);

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Server error');
    }
};
