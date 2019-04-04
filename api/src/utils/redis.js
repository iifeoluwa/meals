'use strict';

const Redis = require('ioredis');
const config = require('config/redis');

const redis = new Redis(config.url);

const cacheIngredientCount = (meal, noOfIngredients) => {
    return redis.set(transformToKey(meal), noOfIngredients);
}

const getIngredientCountFromCache = (mealId) => {
    return redis.get(transformToKey(mealId));
}

const transformToKey = (mealId) => {
    return `meal-${mealId}`;
}

module.exports = {
    cacheIngredientCount,
    getIngredientCountFromCache
}