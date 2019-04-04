'use strict';

const MealService = require('../services/meals');

const get = async (req, res, next) => {
    const mealId = await MealService.fetchMealWithLeastIngredients(req.query.meals);

    res.send(200, {status: 'success', data: {mealId: mealId}});
    return next();
}

module.exports = {
    get
};