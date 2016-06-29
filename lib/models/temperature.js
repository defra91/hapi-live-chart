'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

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
    SOCKET.emit('temperature-logged', doc);
});

module.exports = Mongoose.model('Temperature', Temperature);
