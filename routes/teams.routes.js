const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const {isAuthenticated} = require('../controllers/user.controller');

router.post('/createTeam', isAuthenticated, teamController.createTeam);
router.get('/getTeam', isAuthenticated, teamController.getTeam);
router.put('/addTeamMember', isAuthenticated, teamController.addTeamMember);
router.get('/getUserTeams', isAuthenticated, teamController.getUserTeams);
router.delete('/deleteTeam', isAuthenticated, teamController.deleteTeam);
module.exports = router;
