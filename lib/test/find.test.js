const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('GET /api/find/:DBName/:ColName/:Query/:Projection/:Options', function() {
    it('should return all data based on specified parameters', function(done) {
        server
            .get('/api/find/sampleDB/sampleCol/{}/{}/{}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('array');
                done();
            });
    });
});

describe('GET /api/findOne/:DBName/:ColName/:Query/:Projection/:Options', function() {
    it('should return one record based on specified parameters', function(done) {
        server
            .get('/api/findOne/sampleDB/sampleCol/{}/{}/{}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                done();
            });
    });
});

describe('GET /api/count/:DBName/:ColName/:Query/:Options', function() {
    it('should return the number of records based on specified parameters', function(done) {
        server
            .get('/api/count/sampleDB/sampleCol/{}/{}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('number');
                done();
            });
    });
});

describe('GET /api/distinct/:DBName/:ColName/:Field/:Query', function() {
    it('should return the distinct values for a specified key', function(done) {
        server
            .get('/api/distinct/sampleDB/sampleCol/{}/{}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('array');
                done();
            });
     });
});
