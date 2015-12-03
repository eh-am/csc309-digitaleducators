'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Review = require('./review.model');
var User = require('../user/user.model');

// Get list of reviews
exports.index = function(req, res) {
  Review
    .find({})
    .populate('user', 'name')
    .populate('reviewer', 'name')
    .sort('-date')
    .exec(function(err, reviews){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(reviews);
    });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  Review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }

    // User.findById(req.body.user, function (err, user) {
    //   if(err) { return handleError(res, err); }
    //   if(!user) { return res.status(404).send('Not Found'); }
    //   user.reviews.push(review._id);
    //   user.save(function (err) {
    //     if (err) { return handleError(res, err); }
    //   });
    // });

    // User.findById(req.body.reviewer, function (err, user) {
    //   if(err) { return handleError(res, err); }
    //   if(!user) { return res.status(404).send('Not Found'); }
    //   user.reviewsWritten.push(review._id);
    //   user.save(function (err) {
    //     if (err) { return handleError(res, err); }
    //   });
    // });

    return res.status(201).json(review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get reviews for one user, sort by most recent first
exports.showUserReviews = function(req, res){
  Review
    .find({ 'user' : mongoose.Types.ObjectId(req.params.id)})
    .populate('user', 'name')
    .populate('reviewer', 'name')
    .sort('-date')
    .exec(function(err, reviews){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(reviews);
    });
};

// Get statistics for all users
exports.showStatistics = function(req, res){
  Review
  .aggregate(
  { $group: {
    _id: '$user',
    numReviews: { $sum: 1 },
    avgRating: { $avg: '$rating' } }
  })
  .exec(function(err, reviews){
    if(err) { console.log(err); return handleError(res, err); }
    return res.status(200).json(reviews);
  });
};

// Get statistics for one user
exports.showUserStatistics = function(req, res){
  Review
    .aggregate([
    { $match: { 
      user: mongoose.Types.ObjectId(req.params.id) }
    },
    { $group: {
      _id: '$user',
      numReviews: { $sum: 1 },
      avgRating: { $avg: '$rating' } }
    }
    ])
    .exec(function(err, reviews){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(reviews);
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}