const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schema definition for user accounts.
 * 
 * @typedef {Object} UserSchema
 * @property {string} email - The user's email address. It must be unique and match a valid email format.
 * @property {string} username - The user's username. It must be unique.
 * @property {string} password - The user's password. It must be at least 8 characters long.
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  }
});

/**
 * Pre-save hook to hash the password before saving to the database.
 * 
 * @function
 * @param {Function} next - The next middleware function in the save pipeline.
 * @returns {void}
 * @throws {Error} - Throws an error if hashing the password fails.
 */
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
