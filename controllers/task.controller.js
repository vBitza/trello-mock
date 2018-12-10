const Task = require('../models/task');
const userUtilities = require('../utilities/user');

exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.getTasksByBoardId = getTasksByBoardId;

async function createTask(req, res) {
    let createdBy = await userUtilities.getUserById(req.body.userId);

    Task.create({
        title: req.body.taskTitle,
        createdBy: createdBy,
        description: req.body.taskDescription,
        status: req.body.taskStatus,
        boardId: req.headers.board
    }, function(err, task) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem creating the task.');
        } else {
            return res.status(200).send(task);
        }
    });
};

function getTasksByBoardId (req, res) {
    Task.find({boardId: req.headers.board}, function(err, tasks) {
        if(err) {
            console.log(err);
            return res.status(500).send('There was a problem with getting the tasks.');
        } else {
            return res.status(200).send(tasks);
        }
    });
};


async function updateTask(req, res) {
    console.log(req.body)
    Task.findOne({_id: req.body._id}, function(err, task) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem wih updating the task.');
        } else {
            task.set({title:req.body.taskTitle, description:req.body.taskDescription, status:req.body.taskStatus})
            task.save();
            res.status(200).send(task);
        }
    });
};

function deleteTask(req, res) {
    console.log(req.body)
    Task.deleteOne({_id: req.body.taskId}, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was a problem with deleeting the task.');
        } else {
            return res.status(200).send('Task succesfully deleted.');
        }
    });
};
