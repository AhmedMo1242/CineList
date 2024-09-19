const jwt = require('jsonwebtoken'); 
const User = require("../models/user");
const bcrypt = require('bcrypt');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Registers a new user.
 *
 * @param {string} email - The user's email address.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Object} - Contains success status and either the created user or an error message.
 */
exports.SignUp = async function SignUp(email, username, password) {
    try {
        // Check if the username or email already exists
        const existingUsername = await User.findOne({ username: username });
        const existingEmail = await User.findOne({ email: email });

        if (existingUsername) {
            return { success: false, message: 'Username already exists' };
        }

        if (existingEmail) {
            return { success: false, message: 'Email already exists' };
        }

        // Create and save the new user
        const newUser = new User({
            email: email,
            username: username,
            password: password
        });

        const savedUser = await newUser.save();
        return { success: true, user: savedUser };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user' };
    }
}

/**
 * Logs in a user and returns a JWT token.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Object} - Contains success status, a message, the JWT token, and user details or an error message.
 */
exports.Login = async function Login(username, password) {
    try {
        // Find the user by username
        const existingUser = await User.findOne({ username: username });
        
        // Check if the user exists
        if (!existingUser) {
            return { success: false, message: 'Username not found' };
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (isMatch) {
            // Generate a JWT token
            const token = jwt.sign(
                { userId: existingUser._id, username: existingUser.username }, // Payload
                JWT_SECRET, // Secret key
                { expiresIn: '15m' } // Token expiration
            );

            return { success: true, message: 'Logged in successfully', token: token, user: existingUser };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return { success: false, message: 'Error logging in user' };
    }
};
