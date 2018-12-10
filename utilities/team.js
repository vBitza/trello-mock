const Team = require('../models/team');
const async = require('async');

exports.getUserTeams = getUserTeams;
exports.getTeamById = getTeamById;

function getTeamById(teamId) {
    return Team.findOne({_id: teamId});
}

function getUserTeams(teamsIds) {
    return Team.find({_id: teamsIds});
}
