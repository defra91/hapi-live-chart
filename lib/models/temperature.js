'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const io = require('socket.io-client');
const socket = io.connect('http://127.0.0.1:3000');

const Temperature = new Schema({
    value: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

Temperature.post('save', function(doc) {
    console.log('Somebody logged temperature', doc);
    socket.emit('temperature-logged', doc);
});

module.exports = Mongoose.model('Temperature', Temperature);
