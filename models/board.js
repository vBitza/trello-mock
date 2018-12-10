const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Object,
        required: true
    },
    team: {
        type: String
    },
    members: {
        type: Array,
        required: true
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('Board', schema)
