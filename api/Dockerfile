FROM node:10-alpine as base

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install

FROM node:10-alpine

WORKDIR /usr/src/app
COPY --from=base node_modules node_modules

COPY . .

CMD [ "npm", “run”, "start:prod" ]