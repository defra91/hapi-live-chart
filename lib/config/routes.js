'use strict';

const TemperatureController = require('../controllers/temperature');

module.exports.init = function(server) {

    server.route([{
        method: 'GET',
        path: '/temperature',
        handler: TemperatureController.getAll
    }, {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello from api');
        }
    }, {
        method: 'POST',
        path: '/temperature',
        handler: TemperatureController.logTemperature
    }]);
};
