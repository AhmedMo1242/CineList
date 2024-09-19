const express = require('express');
const listController = require('../controllers/lists');

const router = express.Router();
const verifyToken = require('../middleware/auth');

// Apply verifyToken middleware to all routes in this router
router.use(verifyToken);

/**
 * Route to get a specific list by ID.
 * 
 * @route GET /lists/:id
 * @param {string} id - The unique identifier of the list to retrieve.
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {Object} res - The response object used to send the list data or an error message.
 */
router.get('/:id', listController.getList);

/**
 * Route to delete a specific list by ID.
 * 
 * @route DELETE /lists/:id
 * @param {string} id - The unique identifier of the list to delete.
 * @param {Object} req - The request object containing the list ID as a URL parameter.
 * @param {Object} res - The response object used to confirm deletion or send an error message.
 */
router.delete('/:id', listController.deleteList);

/**
 * Route to create a new list.
 * 
 * @route POST /lists
 * @param {Object} req - The request object containing the data to create a new list in the body.
 * @param {Object} res - The response object used to send the created list data or an error message.
 */
router.post('/', listController.addList);

/**
 * Route to get all movies from all lists.
 * 
 * @route GET /lists
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the movie data or an error message.
 */
router.get('/', listController.getMovies);

module.exports = router;
