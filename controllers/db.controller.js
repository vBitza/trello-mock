const mongoose = require('mongoose');

exports.initConnection = initConnection;
const db = {
    name: 'Atks',
    port: 27017,
    host: 'localhost'
}

function initConnection() {

    let dbUrl = `mongodb://${ db.host }:${ db.port }/${ db.name }`;

    return new Promise((resolve, reject) => {
        connectToMongo();

        function connectToMongo() {
            mongoose.connect(dbUrl).then(() => {
                console.log(`Connection to mongoDB on ${ dbUrl } established`);

                resolve();
            }).catch(error => {
                console.log(`Error connecting to ${ dbUrl }`);
                console.log(error);
            });
        }
    });
}

