const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');

router.post('/createTask', isAuthenticated, taskController.createTask);
router.put('/updateTask', isAuthenticated, taskController.updateTask);
router.delete('/deleteTask', isAuthenticated, taskController.deleteTask);
router.get('/getTasksByBoardId', isAuthenticated, taskController.getTasksByBoardId);

module.exports = router;
