const User = require("../models/user");

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
