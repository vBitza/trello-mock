const path = require('path');
const users = require('./routes/users.routes');
const teams = require('./routes/teams.routes');
const boards = require('./routes/boards.routes');
const tasks = require('./routes/tasks.routes');

module.exports = function (app) {
    app.use('/api/v1/', users);
    app.use('/api/v1/', teams);
    app.use('/api/v1/', boards);
    app.use('/api/v1/', tasks);
}
