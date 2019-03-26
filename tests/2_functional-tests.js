/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

   suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: 'Title'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, '_id');
            assert.property(res.body, 'title');
            assert.property(res.body, 'comments');
            assert.equal(res.body.title, 'Title');
            assert.isArray(res.body.comments);
            assert.lengthOf(res.body.comments, 0);
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
         .post('/api/books')
         .send({
         })
         .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, 'title is empty!');
           done();
         });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          testid = res.body[0]._id;
          done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/123')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/5c9a27cd45d8481b2c56a01b')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, '_id');
          assert.property(res.body, 'title');
          assert.property(res.body, 'comments');
          assert.equal(res.body._id, '5c9a27cd45d8481b2c56a01b');
          assert.equal(res.body.title, 'book123');
          assert.isArray(res.body.comments);
          done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
          chai.request(server)
          .post('/api/books/'+testid)
          .send({
            comment: 'this is comment'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, '_id');
            assert.property(res.body, 'title');
            assert.property(res.body, 'comments');
            assert.equal(res.body._id, testid);
            assert.equal(res.body.title, 'book123');
            assert.isArray(res.body.comments);
            assert.include(res.body.comments, 'this is comment', 'comments contains "this is comment" value');
            done();
          });
      });
      
    });

  });

});
