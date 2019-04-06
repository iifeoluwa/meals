'use strict';

const { get } = require('src/controllers/meals');
const validateQueryString = require('src/middleware');

module.exports = function(server) {
    server.get('/meals', validateQueryString, get);
    server.get('/', (req, res, next) => {
        res.send(200, {status: 'success', message: ':)'});
        return next();
    });
}