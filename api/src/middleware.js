'use strict';

/**
 * Perform basic sanity checks for the required `meals` query parameter
 * @param {*} req Restify request object 
 * @param {*} res Restify response object
 * @param {*} next 
 */
const verifyQueryString = (req, res, next) => {
    if(!req.query.hasOwnProperty('meals')) {
        res.send(400, {status: 'error', message: 'Missing required query param'});
        return next(false);
    }

    if(!Array.isArray(req.query.meals)) {
        res.send(400, {status: 'error', message: 'Invalid type for query param. Must be an array.'});
        return next(false);
    }

    return next();
}

module.exports = verifyQueryString;