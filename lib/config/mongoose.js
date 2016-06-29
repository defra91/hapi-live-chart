'use strict';

const Mongoose = require('mongoose');
const Env = require('./env');

module.exports.connect = function(cb) {
    Mongoose.connect(Env.db);
    const db = Mongoose.connection;

    db.on('error', (err) => {
        console.log('Error while connecting to db', err);
        cb(err);
    });

    db.once('open', () => {
        console.log('Connection with database succeded!');
        cb(null, db);
    });
};
