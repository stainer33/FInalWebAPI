
var chai = require('chai')
, chaiHttp = require('chai-http');
var expect = chai.expect;
var app= require('../index');

chai.use(chaiHttp);


it('login successful', function(done) {
  chai.request(app)
  .post('/login')
  .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      'email': 'ram@gmail.com',
      'password': 'ram'
    })
    
    .end(function(err, res) { 
      expect(res.status).to.equal(201)

       });
    done();
});


it('login unsuccessful', function(done) {
  chai.request(app)
  .post('/login')
  .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      'email': 'ram@gmail.com',
      'password': 'ramdfsdf'
    })
    
    .end(function(err, res) { 
      expect(res.body.status).to.equal(404)

       });
    done();
});

it('user registration', function(done) {
  chai.request(app)
  .post('/signup')
  .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      'email': 'test',
      'fullName': 'test',
      'password': 'test',
      'mobileNo': '45555',
      'address': 'test',
      'profileImg': 'jhk.jpg'
    })
    
    .end(function(err, res) { 
      expect(res.body.status).to.equal(201)

       });
    done();
});
// chai.request(app)
//   .post('/login')
//   .set('content-type', 'application/x-www-form-urlencoded')
//   .send({
//     'email': 'ram@gmail.com',
//     'password': 'ram'
//    })
//    .end(function (err, res) {
  
//     expect(res).to.have.status(201)
//   });
