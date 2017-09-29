const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('GET /api/databases', function() {
    it('should return all the databases', function(done) {
        server
            .get('/api/databases')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('array');
                expect(res.body.length).toBeGreaterThan(0);
                expect(res.body[0]).toBeA('object');
                done();
            });
    });
});
