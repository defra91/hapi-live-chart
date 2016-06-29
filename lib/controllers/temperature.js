'use strict';

const Temperature = require('../models/temperature');

module.exports.getAll = function(request, reply) {
    Temperature.find({}, (err, docs) => {
        if (err) {
            return reply(new Error(err));
        }
        return reply(docs);
    });
};

module.exports.logTemperature = function(request, reply) {
    var log = new Temperature({
        value: request.payload.value,
        timestamp: new Date()
    });

    log.save((err) => {
        if (err) {
            return reply(new Error(err));
        }
        return reply({
            message: 'Temperature successfully logged'
        });
    });
};
