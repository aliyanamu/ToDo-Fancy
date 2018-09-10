const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userScheme = new Schema({
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
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userScheme)
module.exports = User