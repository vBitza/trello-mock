const Team = require('../models/team');
const userUtilities = require('../utilities/user');
const teamUtilities = require('../utilities/team');

exports.createTeam = createTeam;
exports.getTeam = getTeam;
exports.addTeamMember = addTeamMember;
exports.getUserTeams = getUserTeams;
exports.deleteTeam = deleteTeam;


async function createTeam (req, res) {
    let admin = await userUtilities.getUserById(req.body.userId);

	Team.create({
		name: req.body.teamName,
		admin: {
            id: admin.id,
            name: admin.name,
        },
        members: [admin.id]
	}, function(err, team) {
        if(err) {
            console.log(err)
            return res.status(500).send('There was a problem with creating the team.');
        } else {
            userUtilities.addUserToTeam(admin.id, team.id);
            return res.status(200).send('Team succesfully created.');
        }
    })
}

function getTeam (req, res) {
    let teamId = req.body.teamId;

    Team.findOne({_id: teamId}, function (err, team) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem with finding the team.');
        } else {
            return res.status(200).send(team);
        }
    })
}

async function addTeamMember(req, res) {
    let teamId = req.body.teamId;
    let user = await userUtilities.getUserByEmail(req.body.email);

    Team.findOne({_id: teamId}, function(err, team) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem with updating the team.');
        } else {
            console.log(team)
            let membersArray = team.members;
            membersArray.push(user.id)
            team.set({members: membersArray});
            userUtilities.addUserToTeam(user.id, team.id);
            team.save(function (err) {
                if(err) {
                    res.status(500).send('There was a problem with updating the team.')
                } else {
                    res.status(200).send('Team updated sucesfully.')
                }
            })
        }
    })
}

async function getUserTeams(req, res) {
    let user = await userUtilities.getUserById(req.body.userId);
    let teams = await teamUtilities.getUserTeams(user.teams);

    console.log(teams);

    res.status(200).send(teams);

}

async function deleteTeam(req, res) {
    let team = await teamUtilities.getTeamById(req.body.teamId);
    team.members.forEach(async member => {
        await userUtilities.removeTeamFromUser(member, team.id);
    });

    Team.deleteOne({_id: team.id}, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send('There was a problem with deleting the team.');
        } else {
            return res.status(200).send('Team succesfully deleted.');
        }
    });
}
