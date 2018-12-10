const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    boardId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', schema)
