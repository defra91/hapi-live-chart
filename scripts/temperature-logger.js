'use strict';

var request = require('request');

setInterval(function() {
    console.log('Logging temperature...');
    request({
        url: 'http://127.0.0.1:3000/temperature',
        headers: {
            'Accept': 'application/json'
        },
        body: {
            value: Math.random() * 36
        },
        json: true,
        method: 'POST'
    }, (err) => {
        if (err) {
            console.log('Error while logging temperature');
            throw err;
        }
        console.log('Temperature successfully logged');
    });
}, 500);
