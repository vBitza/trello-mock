const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');
const hash = 'WebToLearn';
const express = require('express')

exports.login = login;
exports.tasks = tasks;
exports.register = register;
exports.getUserById = getUserById;
exports.isAuthenticated = isAuthenticated;

function register (req, res) {
    if(!validator.validate(req.body.email)) {
        return res.status(500).send('Invalid email format.');
    }
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({email: req.body.email}, function(err, user){
        if(err) {
            return res.status(500).send('Internal server error.');
        } else {
            if(user) {
                return res.status(500).send('An user with this email already exists.');
            } else {
               User.create({
                    username: req.body.username,
                    password: hashedPassword,
                    email: req.body.email
               }, function(err, user) {
                    if(err) {
                        return res.status(500).send('There was a problem with registering the user.');
                    } else {
                        return res.status(200).send('User succesfully registered.');
                    }
               });
            }
        }
    });
}

function login (req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if(err) {
            return res.status(500).send('Error');
        } else {
            if(!user) {
                return res.status(500).send('User doesn\'t exist.');
            } else {
                let validatePassword = bcrypt.compareSync(req.body.password, user.password);
                if(!validatePassword) {
                    return res.status(401).send('Wrong password.');
                } else {
                    let token = jwt.sign({id: user._id}, hash, {
                        expiresIn: 86400
                    });
                    res.status(200).send(token);
                }
            }
        }
    })
}

function getUserById(req, res) {
    User.findOne({_id: req.body.userId}, function(err, user) {
        if(err) {
            console.log(err)
                return res.status(500).send('Internal server error');
        } else {
                res.status(200).send(user);
        }
    });
}

function tasks(req, res) {
     res.header('Access-Control-Allow-Origin', "*");
     res.status(200).send({
        succes: 'true',
        message: 'completed',
        tasks: 'test'
    })
};

function isAuthenticated (req, res, next) {
    if(req.headers.token) {
        try {
            let decoded = jwt.verify(req.headers.token, hash);
            if(decoded) {
                User.findOne({_id: decoded.id}, function(err, user) {
                    if(err) {
                        console.log(err)
                        return res.status(500).send('Internal server error');
                    } else {
                        req.body.userId = decoded.id;
                        return next();
                    }
                });
            } else {
                res.status(403).send('Not authorized.');
                // res.redirect('/login');
            }
        } catch (e) {
            res.status(403).send('Not authorized.');
            // return res.redirect('/login.html');
        }
    }
};




