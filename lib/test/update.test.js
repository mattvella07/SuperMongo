const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('POST /api/update/:DBName/:ColName/:Criteria/:UpdatedItem/:Options', function() {
    it('should update the specified record', function(done) {
        server
            .post('/api/update/sampleDB/sampleCol/{test: 1}/{test: 2}/{}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('object');
                done();
            });
    });
});