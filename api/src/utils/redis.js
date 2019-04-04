'use strict';

const Redis = require('ioredis');
const config = require('config/redis');

const redis = new Redis(config.url);

const cacheMeal = (meal, noOfIngredients) => {
    return redis.set(transformToKey(meal), noOfIngredients);
}

const getMeal = (mealId) => {
    return redis.get(transformToKey(mealId));
}

const transformToKey = (mealId) => {
    return `meal-${mealId}`;
}

module.exports = {
    cacheMeal,
    getMeal
}