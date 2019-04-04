'use strict';

const restify = require('restify');

const config = require('config');
const router = require('routes/meals');

const server = restify.createServer({
    name: config.server.name,
    version: config.server.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: false}));

server.listen(config.server.port, function() {
    /**
     * Register routes for requests handling
     */
    router(server);

    console.log('%s listening at %s', server.name, server.url);
});