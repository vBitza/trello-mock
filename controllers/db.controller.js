const mongoose = require('mongoose');
const {config} = require('../config');

exports.initConnection = initConnection;


function initConnection() {

    let dbUrl = `mongodb://${ config.db.host }:${ config.db.port }/${ config.db.name }`;

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

