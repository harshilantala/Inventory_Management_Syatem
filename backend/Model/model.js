const mongoose = require('mongoose');
const validator = require('validator');
require('../db/db')

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [128, 'Password cannot exceed 128 characters'],
        unique: true
    }
});

const User = mongoose.model('User', loginSchema);

module.exports = User;
