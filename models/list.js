const mongoose = require('mongoose');

/**
 * Schema definition for movie lists.
 * 
 * @typedef {Object} MovieListsSchema
 * @property {string} Id_Site - The unique identifier for the movie list on the site.
 * @property {number} id - The unique ID of the movie list.
 * @property {string} site - The name of the site where the list is hosted (e.g., TMDB).
 * @property {Array<string>} movies - An array of movie titles in the list.
 * @property {mongoose.Schema.Types.ObjectId} user - Reference to the User model representing the owner of the list.
 */
const MovieListsSchema = new mongoose.Schema({
    Id_Site: { type: String, required: true },
    id: { type: Number, required: true },
    site: { type: String, required: true },
    movies: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user who owns the list
});

const MovieLists = mongoose.model('MovieLists', MovieListsSchema);

module.exports = { MovieListsSchema, MovieLists };
