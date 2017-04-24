var supertest = require('supertest'),
    should = require('should'),
    server = supertest.agent('http://localhost:3000');

describe('Get all databases test', function() {
    it('should receive successful response', function(done) {
        server
            .get('/api/databases')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                done();
            });
    });
});

