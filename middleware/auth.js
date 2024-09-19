const jwt = require('jsonwebtoken');
const User = require('../models/user');  
require('dotenv').config();

/**
 * Middleware function to verify JSON Web Token (JWT) and authenticate users.
 * 
 * This middleware checks the `Authorization` header for a token, verifies it using the JWT_SECRET,
 * and attaches the decoded user information to the request object. If the token is missing or invalid,
 * it sends an appropriate error response.
 * 
 * @param {Object} req - The request object. This function adds the `user` property to it if the token is valid.
 * @param {Object} res - The response object used to send an error message if the token is missing or invalid.
 * @param {Function} next - The next middleware function to be executed if the token is valid.
 * @returns {void} - Calls `next()` to proceed to the next middleware or sends a response if the token is invalid.
 */
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = verifyToken;
