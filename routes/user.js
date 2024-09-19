// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const  UserController  = require('../controllers/user'); // Adjust the path as needed

// POST route for user sign up
router.post('/signup', UserController.signUpController);

module.exports = router;