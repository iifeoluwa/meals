'use strict';

const { fetchMealWithLeastIngredients } = require('src/services/meals');
const messages = require('src/config/messages');

const get = async (req, res, next) => {
    try {
        const mealId = await fetchMealWithLeastIngredients(req.query.meals);
        res.send(200, {status: 'success', data: {mealId: mealId}});
    } catch (error) {
        // TODO: Implement logger to properly log errors to be investigated.
        res.send(500, { status: 'error', message: messages.ERROR });
    }
    
    return next();
}

module.exports = {
    get
};