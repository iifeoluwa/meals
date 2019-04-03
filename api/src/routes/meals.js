'use strict';

const MealsController = require('../controllers/meals');

module.exports = function(server) {
    server.get('/meals', MealsController.get);
}