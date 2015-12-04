'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Review = require('./review.model');
var User = require('../user/user.model');

var reviewed = new User({
  name: 'Reviewer',
  email: 'reviewer@reviewer.com',
  password: 'password'  
});

var reviewedBy = new User({
  name: 'Reviewed By',
  email: 'reviewedby@reviewedby.com',
  password: 'password'  
});

var review = new Review({
  rating: 3,
  review: 'Review goes here.'
});

var review2 = new Review({
  rating: 2,
  review: 'Review goes here, version 2.'
});

var review3 = new Review({
  review: 'Review goes here, version 3.'
});

var review4 = new Review({
  rating: 5
});

describe('Review Model', function() {
  //Remove all reviews, create dummy users
  before(function(done) {
    Review.remove().exec().then(function() {
      done();
    });

    reviewed.save(function (err, doc){
      reviewed = doc;
    });

    reviewedBy.save(function (err, doc){
      reviewedBy = doc;
    });
  });

  //Cleanup
  after(function(done){
    Review.remove().exec().then(function() {
      User.remove().exec().then(function(){
        done();
      });
    });
  });

  it('should begin with no reviews', function(done) {
    Review.find({}, function(err, reviews) {
      reviews.should.have.length(0);
      done();
    });
  });

  it('should fail when saving without a reviewed user', function(done) {
    review.reviewer = reviewedBy._id;

    review.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a reviewer', function(done) {
    review2.user = reviewed._id;

    review2.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without a rating', function(done) {
    review3.user = reviewed._id;
    review3.reviewer = reviewedBy._id;

    review3.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving is below 0', function(done) {
    review3.rating = -1;

    review3.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving is above 5', function(done) {
    review3.rating = 6;
    
    review3.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without review', function(done) {
    review4.user = reviewed._id;
    review4.reviewer = reviewedBy._id;

    review4.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should save successfully', function(done) {
    review4.review = 'New review.';

    review4.save(function(err) {
      Review.find({}, function(err, review){
        review.should.have.length(1);
      });
      
      done();
    });
  });
});