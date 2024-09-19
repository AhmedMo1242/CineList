const Utils = require('../utils/user');

/**
 * Controller function to handle user sign-up requests.
 * 
 * @route POST /signup
 * @param {Object} req - The request object containing user details in the body.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password for the user's account.
 * @param {Object} res - The response object used to send the sign-up status or an error message.
 * @returns {void}
 */
exports.signUpController = async function (req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log(email + username + password);

    // Call the SignUp function from utils
    const result = await Utils.SignUp(email, username, password);

    if (result.success) {
        res.status(201).json({ message: 'User created successfully', user: result.user });
    } else {
        res.status(400).json({ message: result.message });
    }
};

/**
 * Controller function to handle user login requests.
 * 
 * @route POST /login
 * @param {Object} req - The request object containing login credentials in the body.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password for the user's account.
 * @param {Object} res - The response object used to send the login status, token, or an error message.
 * @returns {void}
 */
exports.LoginController = async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const result = await Utils.Login(username, password);
    
    if (result.success) {
        // Respond with the token and user data
        res.status(200).json({ message: 'User logged in successfully', token: result.token, user: result.user });
    } else {
        res.status(400).json({ message: result.message });
    }
};
