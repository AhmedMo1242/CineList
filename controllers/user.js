const Utils = require('../utils/user');

// Controller function to handle sign up requests
exports.signUpController = async function (req, res) {
    const email= req.body.email;
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