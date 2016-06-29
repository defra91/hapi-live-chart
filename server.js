'use strict';

const Hapi = require('hapi');

const Env = require('./lib/config/env');

const Server = new Hapi.Server();

Server.connection({
    port: Env.port,
    routes: {
        cors: true
    }
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

            let io = require('socket.io')(Server.listener);

            io.on('connection', function(socket) {
                console.log('Somebody connected');
                io.sockets.emit('user connected');
                socket.on('temperature-logged', function(doc) {
                    io.emit('temperature-logged', doc);
                });
            });
        });
    });
});
