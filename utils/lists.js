const { del } = require("request");
const { MovieListsSchema, MovieLists } = require("../models/list");
const mongoose = require('mongoose');

exports.AddList = async function AddList(movieListData) {
    /**
     * Adds a new movie list to the database.
     *
     * @param {Object} movieListData - The data for the new movie list.
     * @param {string} movieListData.id - The ID of the movie list.
     * @param {Array} movieListData.movies - An array of movies in the list.
     * @returns {Object} - An object containing the success status, message, and the saved movie list.
     */
    try {
        // Create a new MovieLists document
        const newMovieList = new MovieLists(movieListData);

        // Save the document to MongoDB
        await newMovieList.save();

        // Return a success message or the saved document
        return { success: true, message: 'Movie list saved successfully', data: newMovieList };
    } catch (err) {
        // Handle any errors that occur during the save operation
        console.error('Error saving movie list:', err);
        throw new Error('Error saving movie list');
    }
};


exports.FindList = async function FindList(id_movie) {
    /**
     * Finds a movie list by its ID.
     *
     * @param {string} id_movie - The ID of the movie list to find.
     * @returns {Promise<Array>} - A promise that resolves to an array of movie lists matching the given ID.
     */
    try {
        const results = await MovieLists.find({ id: id_movie }).exec();
        return results;
    } catch (error) {
        console.error('Error finding movie list:', error);
        throw error;
    }
};

/**
 * Deletes a movie list from the database by its ID.
 *
 * @param {string} id_movie - The ID of the movie list to delete.
 * @returns {Object} - An object containing the success status and a message.
 * @throws {Error} - Throws an error if the deletion fails.
 */
exports.DeleteList = async function DeleteList(id_movie) {
    try {
        // Find the list to ensure it exists before attempting to delete it
        const delete_post = await exports.FindList(id_movie);
        if (delete_post && delete_post.length > 0) {
            // Delete the list by its ID
            await MovieLists.deleteOne({ id: id_movie });

            // Return a success message or any relevant result
            return { success: true, message: 'Movie list deleted successfully' };
        } else {
            // If the list does not exist, return an error message
            return { success: false, message: 'Movie list not found' };
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error deleting movie list:', error);
        throw new Error('Server error');
    }
};

/**
 * Combines all movie lists from the database and returns the movies that appear in all lists.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of movies that appear in all lists.
 * @throws {Error} - Throws an error if the combining process fails.
 */
exports.CombineLists = async function CombineLists() {
    try {
        // Fetch all movie lists from MongoDB
        const lists = await MovieLists.find({}).exec();

        if (lists.length === 0) {
            return []; // Return an empty array if no lists are found
        }

        // Initialize combined_movies with the movies from the first list
        let combined_movies = lists[0].movies;

        // Iterate over the remaining lists and filter movies that are present in all lists
        for (let i = 1; i < lists.length; i++) {
            combined_movies = combined_movies.filter(movie => 
                lists[i].movies.includes(movie)
            );
        }

        // Return the list of movies that appear in all the lists
        return [...new Set(combined_movies)];
    } catch (error) {
        console.error('Error combining movie lists:', error);
        throw new Error('Error combining movie lists');
    }
};
