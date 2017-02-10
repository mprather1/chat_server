var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var db = require("../db").init;

chai.use(chaiHttp);

describe("Clear conversations...", function(done) {
  
  before(function(done){
    db.none('TRUNCATE conversations RESTART IDENTITY');
    db.none('TRUNCATE users RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from conversations')
    .then(function(data){
      expect(data).to.deep.equal([]);
    }).then(done, done)
  });
});

describe('Conversations', function() {
  
  var users;
  
  before(function(done){
    db.none('insert into users(first_name, last_name, username, password, avatar)' + 'values($1, $2, $3, $4, $5)', ['first_name', 'last_name', 'username', 'password', 'avatar']);
    done();
  });
  
  beforeEach(function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(err, res) {
      users = res.body;
      done()
    })
  })
  
  it('should add a SINGLE conversation on users/:userID/conversation POST', function(done){
    chai.request(server)
    .post('/api/users/' + users[0].id + '/conversations')
    .send({ 'title': 'title', '_user': users[0].id })
    .end(function(err, res){
      expect(res).to.have.status(200)
      expect(res.body).to.have.status('success')
      done()
  })
  })
  
  it('should list ALL conversations on users/:userID/conversations GET', function(done){
    chai.request(server)
    .get('/api/users/' + users[0].id + '/conversations')
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('_user');
      expect(res.body[0]._user).to.equal(users[0].id)
      done();        
    })
  });
  
  it('should update a SINGLE conversation on /users/:userID/conversations/:id PUT', function(done) {
    chai.request(server)
    .get('/api/users/' + users[0].id + '/conversations')
    .end(function(error, response){
      chai.request(server)
      .put('/api/users/' + users[0].id + '/conversations/' + response.body[0].id)
      .send({'title' : 'newTitle'})
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.status('success');
        done()
      })
    })

  });
  
  it('should list a SINGLE conversation on /users/:userID/conversation/:id GET', function(done) {
    chai.request(server)
    .get('/api/users/' + users[0].id + '/conversations')
    .end(function(errors, response) {
      chai.request(server)
      .get('/api/users/' + users[0].id + '/conversations/' + response.body[0].id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('_user')
        expect(res.body).to.have.property('title');
        expect(res.body.title).to.equal('newTitle');
        expect(res.body._user).to.equal(users[0].id);
        done();
      });
    });
  });
   
  it('should delete a SINGLE conversation on /users/:userID/conversations/:id DELETE', function(done) {
    chai.request(server)
    .get('/api/users/' + users[0].id + '/conversations')
    .end(function(errors, response) {
      chai.request(server)
      .delete('/api/users/' + users[0].id + '/conversations/' + response.body[0].id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.status('success');
        done();
      })
    })
  })  
})