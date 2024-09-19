const { MovieLists } = require("../models/list");
const User = require("../models/user"); 
const jwt = require('jsonwebtoken');

/**
 * Adds a new movie list to the database.
 *
 * @param {Object} movieListData - The data for the new movie list.
 * @param {string} movieListData.id - The ID of the movie list.
 * @param {Array} movieListData.movies - An array of movies in the list.
 * @param {ObjectId} movieListData.user - The ID of the user who owns the list.
 * @returns {Object} - Contains success status, message, and the saved movie list or an error message.
 */
exports.AddList = async function AddList(movieListData) {
    try {
        const existingList = await MovieLists.findOne({
            id: movieListData.id,
            site: movieListData.site
        }).exec();

        if (existingList) {
            return { success: false, message: 'Movie list with the same ID and site already exists' };
        }

        const newMovieList = new MovieLists(movieListData);
        await newMovieList.save();

        return { success: true, message: 'Movie list saved successfully', data: newMovieList };
    } catch (err) {
        console.error('Error saving movie list:', err);
        throw new Error('Error saving movie list');
    }
};

/**
 * Finds a movie list by its ID and user.
 *
 * @param {Object} query - Query parameters to find the movie list.
 * @param {string} query.id - The ID of the movie list.
 * @param {ObjectId} query.user - The ID of the user who owns the list.
 * @returns {Promise<Array>} - A promise that resolves to an array of matching movie lists.
 */
exports.FindList = async function FindList({ id, user }) {
    try {
        return await MovieLists.find({ id, user }).exec();
    } catch (error) {
        console.error('Error finding movie list:', error);
        throw error;
    }
};

/**
 * Deletes a movie list by its ID and user.
 *
 * @param {Object} query - Query parameters to delete the movie list.
 * @param {string} query.id - The ID of the movie list.
 * @param {ObjectId} query.user - The ID of the user who owns the list.
 * @returns {Object} - Contains success status and a message.
 * @throws {Error} - Throws an error if deletion fails.
 */
exports.DeleteList = async function DeleteList({ id, user }) {
    try {
        const delete_post = await exports.FindList({ id, user });
        if (delete_post && delete_post.length > 0) {
            await MovieLists.deleteOne({ id, user });
            return { success: true, message: 'Movie list deleted successfully' };
        } else {
            return { success: false, message: 'Movie list not found' };
        }
    } catch (error) {
        console.error('Error deleting movie list:', error);
        throw new Error('Server error');
    }
};

/**
 * Combines movie lists for a user and returns movies appearing in all lists.
 *
 * @param {ObjectId} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of movies appearing in all lists.
 * @throws {Error} - Throws an error if the process fails.
 */
exports.CombineListsForUser = async function CombineListsForUser(userId) {
    try {
        const lists = await MovieLists.find({ user: userId }).exec();

        if (lists.length === 0) {
            return [];
        }

        let combined_movies = lists[0].movies;

        for (let i = 1; i < lists.length; i++) {
            combined_movies = combined_movies.filter(movie => lists[i].movies.includes(movie));
        }

        return [...new Set(combined_movies)];
    } catch (error) {
        console.error('Error combining movie lists:', error);
        throw new Error('Error combining movie lists');
    }
};

/**
 * Deletes all movie lists for users with expired tokens.
 *
 * @returns {Promise<void>}
 */
exports.deleteExpiredLists = async function deleteExpiredLists() {
    try {
        const users = await User.find();  // Fetch all users

        for (const user of users) {
            const token = user.token;
            if (!token) continue;

            const decoded = jwt.decode(token, { complete: true });

            if (decoded && decoded.payload.exp < Date.now() / 1000) {
                await MovieLists.deleteMany({ user: user._id });
                console.log(`Deleted movie lists for user ${user._id} due to expired token.`);
                await User.findByIdAndUpdate(user._id, { $unset: { token: "" } });
            }
        }
    } catch (error) {
        console.error('Error checking for expired tokens:', error);
    }
};
