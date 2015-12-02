'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Question = require('./question.model');
var User = require('../user/user.model');


var question = new Question({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

var author = new User({
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'  
});

var helper = new User({
  name: 'Fake User 2',
  email: 'test@test.com',
  password: 'password'  
});

var helper2 = new User({
  name: 'Fake User 2',
  email: 'test@test.com',
  password: 'password'  
});

var question = new Question({
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin velit elit, euismod quis facilisis quis, pellentesque ac libero. Vivamus id turpis in justo hendrerit imperdiet vel et velit. Donec porta, est vel fermentum mattis, elit metus feugiat ex, iaculis dictum ex libero ac lectus. Maecenas eget est congue, semper quam aliquet, ultrices ipsum. Curabitur neque odio, dignissim sit amet ultricies sed, semper sed libero. Proin posuere tristique neque, et scelerisque tellus porta in. Vivamus nisl nunc, sodales in suscipit quis, condimentum ac risus. Mauris sagittis molestie nulla quis posuere. Suspendisse tristique quis elit ac ullamcorper. Phasellus quis metus ante. Aenean suscipit cursus felis, vitae consectetur elit elementum ut. Duis varius luctus libero congue laoreet. Ut vel nibh semper, varius lectus nec, tincidunt dui. Aenean sed tempus ipsum, sit amet bibendum mauris.",
});

describe('Question Model', function() {
  before(function(done) {
    // remove all questions before testing
    Question.remove().exec().then(function() {
      done();
    });

    helper.save(function (err, doc){
      helper = doc;
    });

    helper2.save(function (err, doc){
      helper2 = doc;
    });

    author.save(function (err, doc){
      author = doc;
    });

  });

  after(function(done){
    Question.remove().exec().then(function() {
      User.remove().exec().then(function(){
        done();
      });
    });
  });


  afterEach(function(done) {
    Question.remove().exec().then(function() {
      done();
    });
    question.status = "open";
  });

  it('should begin with no questions', function(done) {
    Question.find({}, function(err, questions) {
      questions.should.have.length(0);
      done();
    });
  });

  it('should fail when saving without an author', function(done) {
    question.helper = helper;

    question.save(function(err) {
      should.exist(err);
      done();
    });
  });


  it('should fail when saving without an author', function(done) {
    question.helper = helper;

    question.save(function(err) {
      should.exist(err);
      done();
    });
  });


  it('should save successfully', function(done) {
    question.helper = helper;
    question.author = author;

    question.save(function(err) {
      should.not.exist(err);
      done();
    });
  });


  it('should fail when saving with an invalid status', function(done) {
    question.helper = helper;
    question.author = author;
    question.status = 'INVALID TAG';

    question.save(function(err) {
      should.exist(err);
      done();

    });
  });

  // it('should apply successfully to help a person', function(done) {
  //   var helper2_id = helper1._id;

  //   question.applicants = new Array().concat([
  //     {
  //       price: 10,
  //       user : helper2helper2_id,
  //     }
  //   ]);

  //   question.save(function(err){
  //     should.not.exist(err);
  //     done();
  //   });
  // });
  
});