'use strict';

const got = require('got');
const config = require('../config');
const MEALS_ENDPOINT = `${config.meals_api}lookup.php`;

const fetchMealWithLeastIngredients = async (meals) => {
    const noOfMeals = meals.length;
    let leastAmountOfIngredients = null, mealId = null;

    while(noOfMeals) {
        //TODO: Check cache for existing entry;
        const ingredientCount = await fetchMealIngredients(meals[noOfMeals]);

        if(!leastAmountOfIngredients || ingredientCount < leastAmountOfIngredients) {
            mealId = meals[noOfMeals];
            leastAmountOfIngredients= ingredientCount;
        }
        
        noOfMeals--;
    }

    return mealId;
}

const fetchIngredientsCount = async (mealId) => {
    const meal = await got(`${MEALS_ENDPOINT}?i=${mealId}`);
    const mealData = meal.meals[0];
    let ingredientCount = 0;

    for (const key in mealData[0]) {
        if (mealData.hasOwnProperty(key) && key.includes('strIngredient')) {
            if (mealData[key]) ingredientCount++;
            else break;
        } else {
            continue;
        }
    }

    return ingredientCount;
}

module.exports = {
    fetchMealWithLeastIngredients
};