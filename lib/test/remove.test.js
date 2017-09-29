const supertest = require('supertest'),
      expect = require('expect');
      server = supertest.agent('http://localhost:3000');

describe('POST /api/remove/:DBName/:ColName/:ItemToDelete/:JustOne', function() {
    it('should remove data from the specified collection', function(done) {
        server
            .post('/api/remove/sampleDB/sampleCol/{}/{single: true}')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.status).toEqual(200);
                expect(res.body).toBeA('object');
                done();
            });
    });
});
