'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Inbox = require('./inbox.model');
var Question = require('../question/question.model');
var User = require('../user/user.model');

var helper = new User({
  name: 'Helper User',
  email: 'helper@helper.com',
  password: 'password'  
});

var helped = new User({
  name: 'Helped User',
  email: 'helped@helped.com',
  password: 'password'  
});

var question = new Question({
  title: 'Question Title',
  text: 'Text goes here.',
  status: 'in progress'
});

var inbox = new Inbox({});

var inbox2 = new Inbox({});

var inbox3 = new Inbox({});

describe('Inbox Model', function() {
  //Remove all inboxes, create dummy users and question
  before(function(done) {
    Inbox.remove().exec().then(function() {
      done();
    });

    helper.save(function (err, doc){
      helper = doc;
    });

    helped.save(function (err, doc){
      helped = doc;
    });

    question.author = helped._id;
    question.helper = helper._id;

    question.save(function (err, doc){
      question = doc;
    });
  });

  //Cleanup
  after(function(done){
    Inbox.remove().exec().then(function() {
      User.remove().exec().then(function(){
        Question.remove().exec().then(function(){
	        done();
	    });
      });
    });
  });

  //Test cases
  it('should begin with no inboxes', function(done) {
    Inbox.find({}, function(err, inboxes) {
      inboxes.should.have.length(0);
      done();
    });
  });

   it('should fail when saving without a helper', function(done) {
    inbox.helped = helped._id;
    inbox.question = question._id;

    inbox.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a helped user', function(done) {
    inbox2.helper = helper._id;
    inbox2.question = question._id;

    inbox.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a question', function(done) {
  	inbox3.helped = helped._id;
    inbox3.helper = helper._id;

    inbox3.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should save successfully without messages', function(done) {
  	inbox3.question = question._id;

    inbox3.save(function(err) {
      Inbox.find({}, function(err, inbox){
        inbox.should.have.length(1);
      });
      
      done();
    });
  });

  it('should fail when message has no author', function(done) {
  	inbox3.messages = [{ message: 'Hello' }];

    inbox3.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should save successfully with messages', function(done) {
  	inbox3.messages = [{ message: 'Hello', author: helper._id }];

    inbox3.save(function(err) {
      Inbox.find({}, function(err, inbox){
        inbox[0].messages.should.have.length(1);
      });
      
      done();
    });
  });
});
