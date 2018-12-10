const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const hash = 'WebToLearn';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/login.html', function(){
	console.log('test')
	res.sendFile(path.join(__dirname+'http-static/index.html'));
})

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/tasks', userController.tasks);
router.get('/getUser', userController.isAuthenticated, userController.getUserById)
module.exports = router;
