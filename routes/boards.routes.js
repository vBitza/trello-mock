const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../controllers/user.controller');
const boardController = require('../controllers/board.controller');

router.post('/createBoard', isAuthenticated, boardController.createBoard);
router.get('/getBoard', isAuthenticated, boardController.getBoard);
router.put('/addUserToBoard', isAuthenticated, boardController.addUserToBoard);
router.delete('/deleteBoard', isAuthenticated, boardController.deleteBoard);
router.get('/getUserBoards', isAuthenticated, boardController.getUserBoards);

module.exports = router;
