'use strict';

const got = require('got');
const config = require('src/config');
const { cacheIngredientCount, getIngredientCountFromCache } = require('src/utils/redis');

const MEALS_ENDPOINT = `${config.meals_api}lookup.php`;

const fetchMealWithLeastIngredients = async (meals) => {
    const noOfMeals = meals.length;
    let leastAmountOfIngredients = null, mealId, counter = 0;

    while(counter < noOfMeals) {
        const currentMeal = meals[counter];
        let ingredientCount = await getIngredientCountFromCache(currentMeal);
        
        if(!ingredientCount) {
            ingredientCount = await fetchIngredientsCount(currentMeal);
            cacheIngredientCount(currentMeal, ingredientCount);
        } else {
            // Cast value retrieved from cache to integer because Redis stores key-values data as string
            ingredientCount = parseInt(ingredientCount);
        }
 
        if(!leastAmountOfIngredients || ingredientCount < leastAmountOfIngredients) {
            mealId = currentMeal;
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