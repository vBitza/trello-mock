const http = require('http');
const port = 3000;
const app = require('./app.js');
const dbController = require('./controllers/db.controller');

const server = http.Server(app);

dbController.initConnection().then(() => {
    server.listen(port, function() {
        console.log(`Server listening on port: ${port}`);
    });
}).catch(error => {
    console.log(`App crashed:${ error }`);
})
