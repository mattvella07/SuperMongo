const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('GET /api/collections/:DBName', function() {
    it('should return the collections for a specified database name ', function(done) {
        server
            .get('/api/collections/sampleDB')
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

describe('POST /api/addCollection/:DBName/:ColName', function() {
    it('should add the specified collection', function(done) {
        server
            .post('/api/addCollection/sampleDB/sampleCol')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('object');
                done();
            });
    });
});

describe('POST /api/renameCollection/:DBName/:ColName/:NewColName', function() {
    it('should rename the specified collection', function(done) {
        server
            .post('/api/renameCollection/sampleDB/sampleCol/sampleCol2')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('object');
                done();
            });
    });
});

describe('POST /api/dropCollection/:DBName/:ColName', function() {
    it('should drop the specified collection', function(done) {
        server
            .post('/api/dropCollection/sampleDB/sampleCol2')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('boolean');
                done();
            });
    });
});