'use strict';

const { get } = require('controllers/meals');

module.exports = function(server) {
    server.get('/meals', get);
    server.get('/', (req, res, next) => {
        res.send(200, {status: 'success', message: ':)'});
        return next();
    });
}