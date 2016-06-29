'use strict';

const Hapi = require('hapi');

const Env = require('./lib/config/env');

const Server = new Hapi.Server();

Server.connection({
    port: Env.port
});


require('./lib/config/mongoose').connect((err) => {
    if (err) {
        throw err;
    }
    require('./lib/config/routes').init(Server);
    require('./lib/config/plugins').init(Server, (err) => {

        if (err) {
            throw err;
        }

        Server.start((err) => {
            if (err) {
                throw err;
            }
            Server.log('info', 'Server running at: ' + Server.info.uri);

            const Io = require('socket.io')(Server.listener);

            Io.on('connection', function(socket) {
                socket.emit('Oh hi!');
            });
        });
    });
});
