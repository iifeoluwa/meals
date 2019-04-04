'use strict';

const MealsController = require('../controllers/meals');

module.exports = function(server) {
    server.get('/meals', MealsController.get);
    server.get('/', (req, res, next) => {
        res.send(200, {status: 'success', message: ':)'});
        return next();
    });
}