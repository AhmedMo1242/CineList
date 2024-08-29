/**
 * Creates a new list object with a specified ID and an array of movies.
 *
 * @param {number} id - The unique identifier for the list.
 * @param {Array} movies - An array of movie objects or IDs to be included in the list.
 * @returns {Object} A new list object containing the provided ID and movies.
 */
 function CreateList(id, movies) {
    return {
        id: id,
        movies: movies
    };
}

/**
 * An array to store multiple list objects.
 * This array can be used to manage and manipulate different lists.
 */
const lists = [];

module.exports = { CreateList, lists };
