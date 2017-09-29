const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('POST /api/insert/:DBName/:ColName/:NewItem', function() {
    it('should insert the data into the specified collection', function(done) {
        server
            .post('/api/insert/sampleDB/sampleCol/{test: 1}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('object');
                done();
            });
    });
});
