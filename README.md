# The Meal Service
This repository contains a service that accepts a list of *valid* `TheMealDb.com` meal IDs, evaluates the meals and returns one that requires the least amount of ingredients to prepare.

## Instructions
To utilize this service, please ensure that you have [Docker](https://www.docker.com) installed and running on your computer. It is also recommended to perform service requests using [Postman](https://www.getpostman.com).

#### How To Run 
1. Clone this repository into a new directory.
2. Open a terminal window in the directory where the project was cloned.
3. Run `docker-compose -f "docker-compose.yml" up -d --build` to start the app.
4. Visit `localhost:3000` to access the running service.

#### The /meals endpoint
This endpoint accepts a `meals` query param that should hold an *array* of valid mealIDs. 

Sample Request: 

```
localhost:3000/meals?meals[]=52772&meals[]=52895&meals[]=52797&meals[]=52782
```

Response: 

```json
{
    "status": "success",
    "data": {
        "mealId": "52895"
    }
}
```

#### Running Tests
From the root of the app directory, run this command;

     docker-compose run --rm api-service npm run test


#
:)