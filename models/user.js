const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    teams: {
        type: Array
    },
    boards: {
        type: Array
    }
});

module.exports = mongoose.model('User', schema)
