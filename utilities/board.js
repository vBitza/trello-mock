const Board = require('../models/board');
const async = require('async');
exports.getBoardById = getBoardById;
exports.getUserBoards = getUserBoards;


function getBoardById(boardId) {
	console.log(boardId)
    return Board.findOne({_id: boardId});
}

function getUserBoards(boardsIds) {
    return Board.find({_id: boardsIds});
}
