'use strict';

const server = require('src/server')
const request = require('supertest')(server);
const { expect } = require('chai');

describe('GET /', function() {
    it('returns a json response', function(done) {
        request.get('/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('returns a status and message property', function(done) {
        request.get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.status).to.equal('success');
                expect(response.body.message).to.equal(':)');
                done();
            })
    });
});

describe('GET /meals', function() {
    it('returns an error when meals query param is absent', function(done) {
        request.get('/meals')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.status).to.equal('error');
                expect(response.body.message).to.equal('Missing required query param');
                done();
            });
    });

    it('returns error when query param isnt an array', function(done) {
        request.get('/meals')
            .query('meals=nonarray')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.status).to.equal('error');
                expect(response.body.message).to.equal('Invalid type for query param. Must be an array.');
                done();
            })
            .catch(error => {
                done(error)
            })
    });

    it('returns id of meals needing least amount of ingredients', done => {
        request.get('/meals')
            .query({meals: [52772, 52809, 52795]})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.status).to.equal('success');
                expect(response.body.data.mealId).to.equal('52772');
                done();
            })
            .catch(error => {
                done(error)
            })
    }).timeout(0)
});