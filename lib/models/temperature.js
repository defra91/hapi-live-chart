'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Temperature', new Schema({
    value: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
}));
