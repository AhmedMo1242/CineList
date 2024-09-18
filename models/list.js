const mongoose = require('mongoose');

// Define the schema for movie lists
/**
 * Schema for storing movie lists.
 * 
 * @typedef {Object} MovieListsSchema
 * @property {string} Id_Site - The unique identifier for the site where the list is sourced from.
 * @property {number} id - The unique identifier for the movie list.
 * @property {string} site - The name of the site or source of the movie list.
 * @property {Array<string>} movies - An array of movie titles included in the list.
 */
const MovieListsSchema = new mongoose.Schema({
    Id_Site: { type: String, required: true },    // 'Id_Site' as a string
    id: { type: Number, required: true },         // 'id' as a number
    site: { type: String, required: true },       // 'site' as a string
    movies: [{ type: String }]                    // 'movies' as an array of strings (list of movie titles, for example)
});

// Create the model for the schema
/**
 * Model representing a collection of movie lists.
 * 
 * @typedef {mongoose.Model} MovieLists
 */
const MovieLists = mongoose.model('MovieLists', MovieListsSchema);

module.exports = { MovieListsSchema, MovieLists };
