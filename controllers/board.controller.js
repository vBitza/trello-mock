const Board = require('../models/board');
const userUtilities = require('../utilities/user');
const boardUtilities = require('../utilities/board');

exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.addUserToBoard = addUserToBoard;
exports.deleteBoard = deleteBoard;
exports.getUserBoards = getUserBoards;

async function createBoard (req, res) {
	let owner = await userUtilities.getUserById(req.body.userId);
	let members = owner.id;
    console.log(req)
	if (req.body.team) {
        let team = await teamU
		members = req.body.team.members;
	}
	Board.create({
		name: req.body.boardName,
		owner: owner,
		team: req.body.team,
		members: members,
        type: req.body.type
	}, function(err, board) {
		if (err) {
			console.log(err);
			return res.status(500).send('There was a problem with creating the board.');
		} else {
			board.members.forEach(member => {
				userUtilities.addUserToBoard(member, board.id);
			});
			return res.status(200).send('Board was succesfully created.');
		}
	})
}

async function getBoard(req, res) {
	let board = await boardUtilities.getBoardById(req.headers.board);

	if (req.body.userId == board.owner._id) {
        console.log('estsad')
		board.deletable = true;
	}

	console.log(board)
	res.status(200).send(board);
}

async function getUserBoards(req, res) {
    let user = await userUtilities.getUserById(req.body.userId);
    let boards = await boardUtilities.getUserBoards(user.boards);

    res.status(200).send(boards);
}

async function addUserToBoard(req, res) {
    console.log(req.body)
	let boardId = req.headers.board;
    let user = await userUtilities.getUserByEmail(req.body.email);

    if (user === null || undefined) {
        return res.status(500).send(`An user with this email doesn't exist.`);
    }

    Board.findOne({_id: boardId}, function(err, board) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem with updating the Board.');
        } else {
            if (board === null || undefined) {
                return res.status(500).send('There was a problem with updating the Board.');
            }

            let membersArray = board.members;

            if (membersArray.indexOf(user.id) !== -1) {
                return res.status(200).send('This user is already part of the board.');
            }

            membersArray.push(user.id)
            board.set({members: membersArray});
            userUtilities.addUserToBoard(user.id, board.id);
            board.save(function (err) {
                if(err) {
                    res.status(500).send('There was a problem with updating the Board.')
                } else {
                    res.status(200).send('Board updated sucesfully.')
                }
            })
        }
    });
}

async function deleteBoard(req, res) {
	let board = await boardUtilities.getBoardById(req.headers.board);
    board.members.forEach(async member => {
        await userUtilities.removeBoardFromUser(member, board.id);
    });

    Board.deleteOne({_id: board.id}, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send('There was a problem with deleting the board.');
        } else {
            return res.status(200).send('Team succesfully deleted.');
        }
    });
}
