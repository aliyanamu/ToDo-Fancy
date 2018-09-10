const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    description:  String,
    eventDate: Date,
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoScheme)
module.exports = Todo