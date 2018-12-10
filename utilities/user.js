const User = require('../models/user');
const async = require('async');
exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.addUserToTeam = addUserToTeam;
exports.removeTeamFromUser = removeTeamFromUser;
exports.addUserToBoard = addUserToBoard;
exports.removeBoardFromUser = removeBoardFromUser;

function getUserById(userId) {
    return User.findOne({_id: userId});
}

function getUserByEmail(email) {
    return User.findOne({email: email});
}

async function addUserToTeam(userId, teamId) {
    let user = await getUserById(userId);
    let teamsArray = user.teams;

    teamsArray.push(teamId);

    user.set({teams: teamsArray});
    user.save(function (err) {
        if (err) {
            return err;
        } else {
            return true;
        }
    });
}

async function removeTeamFromUser(userId, teamId) {
    let user = await getUserById(userId);
    let teamsArray = user.teams;

    teamsArray.splice(teamsArray.indexOf(teamId), 1);

    user.set({teams: teamsArray});
    user.save(function (err) {
        if (err) {
            return err;
        } else {
            return true;
        };
    });
}

async function addUserToBoard(userId, boardId) {
    let user = await getUserById(userId);
    user.boards.push(boardId);

    user.save(function (err) {
        if (err) {
            return err;
        } else {
            return true;
        }
    });
}

async function removeBoardFromUser(userId, boardId) {
    let user = await getUserById(userId);
    let boardsArray = user.boards;

    boardsArray.splice(boardsArray.indexOf(boardId), 1);

    user.set({boards: boardsArray});
    user.save(function (err) {
        if (err) {
            return err;
        } else {
            return true;
        };
    });
}


