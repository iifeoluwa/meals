'use strict';

const got = require('got');
const config = require('src/config');
const { cacheIngredientCount, getIngredientCountFromCache } = require('src/utils/redis');

const MEALS_ENDPOINT = `${config.meals_api}lookup.php`;

/**
 * Gets the amount of ingredients required to make every meal and evaluates the meal 
 * with the least amount of ingredients needed.
 * @param {Array} meals An array of data containing id of every meal we're to compare.
 * @returns {Number} mealId Meal with the least ingredient count in given list.
 */
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
            // Cast value retrieved from cache to integer because Redis stores key-values pairs as string
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

/**
 * Performs request to external service, fetches the meal data, 
 * and determines the number of ingredient the meal requires.
 * @param {Number} mealId 
 * @returns {Number} ingredientCount Amount of ingredients it takes to prepare specified meal.
 */
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