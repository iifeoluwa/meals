'use strict';

const got = require('got');
const config = require('../config');
const MEALS_ENDPOINT = `${config.meals_api}lookup.php`;

const fetchMealWithLeastIngredients = async (meals) => {
    const noOfMeals = meals.length;
    let leastAmountOfIngredients = null, mealId = null, counter = 0;

    while(counter < noOfMeals) {
        //TODO: Check cache for existing entry;
        const ingredientCount = await fetchIngredientsCount(meals[counter]);

        if(!leastAmountOfIngredients || ingredientCount < leastAmountOfIngredients) {
            mealId = meals[counter];
            leastAmountOfIngredients = ingredientCount;
        }
        
        counter++;
    }

    return mealId;
}

const fetchIngredientsCount = async (mealId) => {
    const meal = await got(`${MEALS_ENDPOINT}?i=${mealId}`);
    const mealData = JSON.parse(meal.body).meals[0];

    let ingredientCount = 0;

    for (const key in mealData) {
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