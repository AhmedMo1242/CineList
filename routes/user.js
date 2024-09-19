const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user'); 

/**
 * @module authRoutes
 * @description Routes for user authentication.
 */

/**
 * POST /signup - Create a new user.
 * @param {Object} req - Request object with user details.
 * @param {Object} res - Response object with result of the operation.
 */
router.post('/signup', UserController.signUpController);

/**
 * POST /login - Authenticate user and return token.
 * @param {Object} req - Request object with login credentials.
 * @param {Object} res - Response object with authentication result.
 */
router.post('/login', UserController.LoginController);

module.exports = router;
