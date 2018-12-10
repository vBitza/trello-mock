const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Object,
        required: true
    },
    members: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Team', schema)
