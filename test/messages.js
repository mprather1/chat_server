var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var db = require("../db").init;


chai.use(chaiHttp);

describe("Clear messages...", function(done) {
  
  before(function(done){
    db.none('TRUNCATE messages RESTART IDENTITY');
    db.none('TRUNCATE users RESTART IDENTITY');
    db.none('TRUNCATE conversations RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from messages')
    .then(function(data){
      expect(data).to.deep.equal([]);
      }).then(done, done);
  });
});

describe('Messages', function(){
  
  var users;
  var conversations;
  
  before(function(done){
    db.none('insert into users(first_name, last_name, username, password, avatar)' + 'values($1, $2, $3, $4, $5)', ['first_name', 'last_name', 'username', 'password', 'avatar']);    
    db.none('insert into conversations(title, _user)' + 'values($1,  ARRAY[$2])', ['test', 1]);
    done();
  });
  
  beforeEach(function(done){
    chai.request(server)
    .get('/api/users')
    .end(function(error, response) {
      users = response.body
      chai.request(server)
      .get('/api/users/' + users[0].id + '/conversations')
      .end(function(err, res) {
        conversations = res.body
        done();
      })
    })
  })
  
  it('should add a SINGLE message on /conversations/messages POST', function(done) {
    chai.request(server)
    .get('/api/users')
    .end(function(error, response){
      chai.request(server)
      .post('/api/conversations/' + conversations[0].id + '/messages')
      .send({ 'content': 'content', 'author': 1, 'time': new Date(), 'avatar_img': '/avatar/img.img' })
      .end(function(err, res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.status('success')
        done();
      })
    })
  });
  
  it('should list ALL messages on conversations/:conversationID/messages GET', function(done){
    chai.request(server)
    .get('/api/conversations/' + conversations[0].id + '/messages')
    .end(function(err, res){
      expect(res).to.have.status(200)
      expect(res.body[0]).to.have.property('id')
      expect(res.body[0]).to.have.property('content')
      expect(res.body[0]).to.have.property('author')
      expect(res.body[0]).to.have.property('time')
      expect(res.body[0]).to.have.property('avatar_img')
      expect(res.body[0]).to.have.property('_conversation')
      expect(res.body[0]._conversation).to.equal(conversations[0].id)
      done();
    })
  });
  
  it('should update a single message on /conversations/:conversationID/messages PUT', function(done) {
    chai.request(server)
    .get('/api/conversations/' + conversations[0].id + '/messages')
    .end(function(error, response) {
      chai.request(server)
      .put('/api/conversations/' + conversations[0].id + '/messages/' + response.body[0].id)
      .send({'content': 'testt'})
      .end(function(err, res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })
  
  it('should list a SINGLE message on /message/:id GET', function(done) {
    chai.request(server)
    .get('/api/conversations/' + conversations[0].id + '/messages' )
    .end(function(error, response) {
      chai.request(server)
      .get('/api/conversations/' + conversations[0].id + '/messages/' + response.body[0].id)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('content')
        expect(res.body.content).to.equal('testt')
        expect(res.body).to.have.property('author')
        expect(res.body).to.have.property('time')
        expect(res.body).to.have.property('avatar_img')
        expect(res.body).to.have.property('_conversation')
        expect(res.body._conversation).to.equal(conversations[0].id)        
        done()
      })
    })
  });
  
  it('should delete a single message at /conversations/:conversationID/messages DELETE', function(done) {
    chai.request(server)
    .get('/api/conversations/' + conversations[0].id + '/messages')
    .end(function(error, response) {
      chai.request(server)
      .delete('/api/conversations/' + conversations[0].id + '/messages/' + response.body[0].id)
      .end(function(err, res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.status('success')
        done()
      })
    })
  })
   
});