'use strict';

const get = (req, res, next) => {
    const leastIngredients = MealService.fetchMealWithLeastIngredients(req.query.meals);

    res.send(200, {status: 'success', data: {mealId: leastIngredients}});
}

module.exports = {
    get
};