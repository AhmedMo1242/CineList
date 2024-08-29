const { lists } = require("../models/list");

/**
 * Deletes a list from the global lists array and updates the IDs of the remaining lists.
 *
 * @param {Object} List - The list object to be deleted from the global lists array.
 */
exports.DeleteList = function DeleteList(List) {
    // Find the index of the list to delete
    let deleted_idx = lists.indexOf(List);
    
    if (deleted_idx === -1) {
        console.error("List not found");
        return;
    }
    
    // Remove the list from the global lists array
    lists.splice(deleted_idx, 1);
};

/**
 * Combines multiple lists of movies and returns the movies that appear in all lists.
 *
 * @param {Array} lists - An array of list objects, each containing an array of 'movies'.
 * @returns {Array} - An array of movies that appear in all provided lists.
 */
exports.CombineLists = function CombineLists(lists) {
    if (lists.length === 0) {
        return []; // Return an empty array if no lists are provided
    }

    // Initialize combined_movies with the movies from the first list
    let combined_movies = lists[0]['movies'];

    // Iterate over the remaining lists and filter movies that are present in all lists
    for (let i = 1; i < lists.length; i++) {
        combined_movies = combined_movies.filter(movie => 
            lists[i]['movies'].includes(movie)
        );
    }

    // Return the list of movies that appear in all the lists
    return [...new Set(combined_movies)];
};
