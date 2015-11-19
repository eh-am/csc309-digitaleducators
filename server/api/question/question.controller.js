'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions
exports.index = function(req, res) {
  Question
    .find({})
    .populate('author') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { return handleError(res, err); }
      return res.status(200).json(questions);
    });

  // Question.find(function (err, questions) {

  // });
};

// Get a single question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    return res.json(question);
  });
};

// Creates a new question in the DB.
exports.create = function(req, res) {

  // lodash merge
  // merge two objects into one
  var question = new Question( _.merge({ 
    author: req.user._id
  }, req.body));

  question.save(function (err, comment){
    if(err) { return handleError(res, err); }
    return res.status(201).json(question);
  });
  
};

// Updates an existing question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, question) {
    if (err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    var updated = _.merge(question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(question);
    });
  });
};

// Deletes a question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, question) {
    if(err) { return handleError(res, err); }
    if(!question) { return res.status(404).send('Not Found'); }
    question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}