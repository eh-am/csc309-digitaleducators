'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of questions
exports.index = function(req, res) {
  Question
    .find({})
    .populate('author') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { return handleError(res, err); }
      return res.status(200).json(questions);
    });
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



exports.applyForHelp = function(req, res){
  Question.findById(req.body.questionId, function (err, question) {
    var applicants = [{
      user: req.user._id, 
      price: req.body.price      
    }];

    var updated = question;

    // concat the old applicants with the new one
    updated.applicants = applicants.concat(updated.applicants);
    

    updated.save(function (err) {
      if (err) { return handleError(res, err);}

      return res.status(200).json(question);
    });

  });
};

exports.myQuestions = function(req, res){
  // return the questions
  // of the logged in user
  Question
    .find({ "author" : req.user._id})
    .populate('author') // kinda like sql's join
    .populate('applicants.user') // kinda like sql's join
    .exec(function(err, questions){
      if(err) { console.log(err); return handleError(res, err); }
      return res.status(200).json(questions);
    });
}

function handleError(res, err) {
  return res.status(500).send(err);
}