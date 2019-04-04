'use strict'; 

module.exports = {
   server: {
    name: 'meals-service',
    version: '1.0.0',
    port: process.env.PORT || 3000
   },
   meals_api: 'https://www.themealdb.com/api/json/v1/1/'
}