'use strict';

const Redis = require('ioredis');
const config = require('src/config/redis');

const redis = new Redis(config.url);

/**
 * Persists the amount of ingredient required to make a meal to Redis cache.
 * @param {Number} meal id of meal whose ingredient count is to be cached.
 * @param {Number} noOfIngredients 
 */
const cacheIngredientCount = (meal, noOfIngredients) => {
    return redis.set(transformToKey(meal), noOfIngredients);
}

/**
 * Fetch the amount of ingredient required to make a meal from cache.
 * @param {Number} mealId
 * @returns {Promise<String|null>}
 */
const getIngredientCountFromCache = (mealId) => {
    return redis.get(transformToKey(mealId));
}


/**
 * Basic transformation of numeric `mealId` value to string key which is used for
 * storage and retrieval from cache.
 * @param {Number} mealId 
 * @returns {String}
 */
const transformToKey = (mealId) => {
    return `meal-${mealId}`;
}

module.exports = {
    cacheIngredientCount,
    getIngredientCountFromCache
}