'use strict';

const MESSAGES = require('src/config/messages');

/**
 * Perform basic sanity checks for the required `meals` query parameter
 * @param {*} req Restify request object 
 * @param {*} res Restify response object
 * @param {*} next 
 */
const verifyQueryString = (req, res, next) => {
    if(!req.query.hasOwnProperty('meals')) {
        res.send(400, {status: 'error', message: MESSAGES.MISSING_PARAM});
        return next(false);
    }

    if(!Array.isArray(req.query.meals)) {
        res.send(400, {status: 'error', message: MESSAGES.INVALID_PARAM_TYPE});
        return next(false);
    }

    if(req.query.meals.length === 1) {
        res.send(200, {status: 'success', data: {mealId: req.query.meals[0]}});
    }

    return next();
}

module.exports = verifyQueryString;