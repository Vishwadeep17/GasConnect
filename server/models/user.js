const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);
