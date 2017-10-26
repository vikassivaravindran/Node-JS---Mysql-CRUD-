var chai = require('chai');
var chaiHttp = require('chai-http');
//var server = require('../app');
var should = chai.should(); 

chai.use(chaiHttp);

 describe('/GET CustomerList', function() {
      it('it should GET all the customers', function(done) {
        chai.request('http://localhost:8081')
            .get('/Customer')
            .end(function(err, res) {
                res.should.have.status(200);
   //             res.body.should.be.a('array');
   //             res.body.length.should.be.eql(0);
              done();
            });
      });
  });
